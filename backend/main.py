import os
from typing import Optional

import httpx
import markdown
from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from starlette.datastructures import MutableHeaders
from starlette.middleware import Middleware
from dotenv import load_dotenv

# Import the cruelty-free chatbot
from cruelty_free_chatbot import CrueltyFreeChatbot

load_dotenv()

IUCN_BASE_URL = "https://api.iucnredlist.org"
IUCN_TOKEN = os.getenv("IUCN_API_TOKEN", "").strip()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

if not IUCN_TOKEN:
	# We still start, but requests will fail with 500 until configured
	print("[WARN] IUCN_API_TOKEN not set. Set it in backend/.env")

if not GEMINI_API_KEY:
	print("[WARN] GEMINI_API_KEY not set. Set it in backend/.env")

allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "*")
ALLOWED_ORIGINS = [o.strip() for o in allowed_origins_env.split(",") if o.strip()] or ["*"]

app = FastAPI(title="AnimalHack IUCN Proxy & Cruelty-Free Shopping Assistant")

app.add_middleware(
	CORSMiddleware,
	allow_origins=ALLOWED_ORIGINS,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"]
)

client: Optional[httpx.AsyncClient] = None
chatbot: Optional[CrueltyFreeChatbot] = None

@app.on_event("startup")
async def on_startup() -> None:
	global client, chatbot
	client = httpx.AsyncClient(base_url=IUCN_BASE_URL, timeout=30.0)
	
			# Initialize the cruelty-free chatbot if API key is available
	if GEMINI_API_KEY:
		try:
			print(f"[DEBUG] Initializing chatbot with API key: {GEMINI_API_KEY[:10]}...")
			csv_path = "luxury_animal_products_vegan_alternatives.csv"
			chatbot = CrueltyFreeChatbot(csv_path, GEMINI_API_KEY)
			print("[INFO] Cruelty-free chatbot initialized successfully")
		except Exception as e:
			print(f"[WARN] Failed to initialize cruelty-free chatbot: {e}")
			import traceback
			traceback.print_exc()
			chatbot = None
	else:
		print("[WARN] GEMINI_API_KEY not set, cruelty-free chatbot disabled")

@app.on_event("shutdown")
async def on_shutdown() -> None:
	global client
	if client is not None:
		await client.aclose()
		client = None

@app.get("/health")
async def health() -> dict:
	return {"ok": True}

async def forward(method: str, path: str, request: Request) -> Response:
	if client is None:
		raise HTTPException(status_code=500, detail="HTTP client not ready")
	if not IUCN_TOKEN:
		raise HTTPException(status_code=500, detail="IUCN_API_TOKEN not configured on server")

	# Build upstream request
	headers = {"Accept": "application/json", "Authorization": IUCN_TOKEN}
	# Preserve If-None-Match etc. if present
	for h in ("If-None-Match", "If-Modified-Since"):
		if h in request.headers:
			headers[h] = request.headers[h]

	url = f"/api/v4/{path.lstrip('/')}"

	# Only pass through body for non-GET
	content = await request.body() if method != "GET" else None

	upstream = await client.request(
		method=method,
		url=url,
		params=dict(request.query_params),
		headers=headers,
		content=content,
	)

	# Return raw response preserving content-type and status
	media_type = upstream.headers.get("content-type", "application/json")
	return Response(content=upstream.content, status_code=upstream.status_code, media_type=media_type)

# Generic proxy routes for IUCN v4
@app.api_route("/api/v4/{full_path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE"])
async def proxy(full_path: str, request: Request) -> Response:
	return await forward(request.method, full_path, request)

# Convenience example endpoints
@app.get("/api/assessment/{assessment_id}")
async def get_assessment(assessment_id: int, request: Request) -> Response:
	return await forward("GET", f"assessment/{assessment_id}", request)

@app.get("/api/taxa/scientific_name")
async def taxa_scientific_name(request: Request) -> Response:
	return await forward("GET", "taxa/scientific_name", request)

@app.get("/api/conservation_actions")
async def get_conservation_actions(request: Request) -> Response:
	return await forward("GET", "conservation_actions", request)

@app.get("/api/conservation_actions/{code}")
async def get_conservation_action_by_code(code: str, request: Request) -> Response:
	return await forward("GET", f"conservation_actions/{code}", request)

@app.get("/api/use_and_trade")
async def get_use_and_trade(request: Request) -> Response:
	return await forward("GET", "use_and_trade", request)

@app.get("/api/use_and_trade/{code}")
async def get_use_and_trade_by_code(code: str, request: Request) -> Response:
	return await forward("GET", f"use_and_trade/{code}", request)

# New endpoints for the cruelty-free shopping chatbot
@app.post("/api/chatbot/query")
async def chatbot_query(request: dict):
	"""
	Query the cruelty-free shopping chatbot
	"""
	if not chatbot:
		raise HTTPException(status_code=503, detail="Cruelty-free chatbot not available. Please check GEMINI_API_KEY configuration.")

	try:
		query = request.get("query", "").strip()
		if not query:
			raise HTTPException(status_code=400, detail="Query is required")

		answer_md = chatbot.answer_query(query)  # Markdown response
		answer_html = markdown.markdown(answer_md, extensions=['extra'], output_format='html5')  # Convert to HTML

		return {
			"answer_markdown": answer_md,
			"answer_html": answer_html,
			"query": query
		}

	except Exception as e:
		raise HTTPException(status_code=500, detail=f"Failed to process query: {str(e)}")

@app.get("/api/chatbot/suggestions")
async def get_product_suggestions(category: Optional[str] = None, max_price: Optional[float] = None):
	"""
	Get product suggestions based on filters
	
	Query parameters:
	- category: Product category (e.g., "Handbags", "Footwear")
	- max_price: Maximum price filter
	"""
	if not chatbot:
		raise HTTPException(status_code=503, detail="Cruelty-free chatbot not available. Please check GEMINI_API_KEY configuration.")
	
	try:
		suggestions = chatbot.get_product_suggestions(category=category, max_price=max_price)
		return {"suggestions": suggestions, "filters": {"category": category, "max_price": max_price}}
		
	except Exception as e:
		raise HTTPException(status_code=500, detail=f"Failed to get suggestions: {str(e)}")

@app.get("/api/chatbot/categories")
async def get_categories():
	"""Get all available product categories"""
	if not chatbot:
		raise HTTPException(status_code=503, detail="Cruelty-free chatbot not available. Please check GEMINI_API_KEY configuration.")
	
	try:
		categories = set()
		for chunk in chatbot.chunks:
			categories.add(chunk['metadata']['Category'])
		
		return {"categories": sorted(list(categories))}
		
	except Exception as e:
		raise HTTPException(status_code=500, detail=f"Failed to get categories: {str(e)}")

@app.post("/api/chatbot/chat")
async def chatbot_chat(request: dict):
	"""
	Interactive chat endpoint for the cruelty-free shopping assistant
	"""
	if not chatbot:
		raise HTTPException(status_code=503, detail="Cruelty-free chatbot not available. Please check GEMINI_API_KEY configuration.")

	try:
		message = request.get("message", "").strip()
		if not message:
			raise HTTPException(status_code=400, detail="Message is required")

		answer_md = chatbot.answer_query(message)  # Markdown response
		answer_html = markdown.markdown(answer_md, extensions=['extra'], output_format='html5')  # Convert to HTML

		return {
			"response_markdown": answer_md,
			"response_html": answer_html,
			"message": message,
			"timestamp": "2024-01-01T00:00:00Z"
		}

	except Exception as e:
		print(f"[ERROR] Chatbot error: {str(e)}")
		raise HTTPException(status_code=500, detail=f"Failed to process chat message: {str(e)}")

if __name__ == "__main__":
	import uvicorn
	port = int(os.getenv("PORT", "8000"))
	uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True) 