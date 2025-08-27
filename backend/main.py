import os
from typing import Optional

import httpx
from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from starlette.datastructures import MutableHeaders
from starlette.middleware import Middleware
from dotenv import load_dotenv

load_dotenv()

IUCN_BASE_URL = "https://api.iucnredlist.org"
IUCN_TOKEN = os.getenv("IUCN_API_TOKEN", "").strip()
if not IUCN_TOKEN:
	# We still start, but requests will fail with 500 until configured
	print("[WARN] IUCN_API_TOKEN not set. Set it in backend/.env")

allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "*")
ALLOWED_ORIGINS = [o.strip() for o in allowed_origins_env.split(",") if o.strip()] or ["*"]

app = FastAPI(title="AnimalHack IUCN Proxy")

app.add_middleware(
	CORSMiddleware,
	allow_origins=ALLOWED_ORIGINS,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"]
)

client: Optional[httpx.AsyncClient] = None

@app.on_event("startup")
async def on_startup() -> None:
	global client
	client = httpx.AsyncClient(base_url=IUCN_BASE_URL, timeout=30.0)

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

if __name__ == "__main__":
	import uvicorn
	port = int(os.getenv("PORT", "8000"))
	uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True) 