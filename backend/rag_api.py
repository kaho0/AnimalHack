from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
import sys

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from rag_chatbot import RAGSystem

app = FastAPI(title="Cruelty-Free Shopping RAG API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG system
rag_system = None

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    success: bool

@app.on_event("startup")
async def startup_event():
    """Initialize the RAG system on startup"""
    global rag_system
    
    # Check if API key is available
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("❌ Please set GEMINI_API_KEY environment variable")
        return
    
    try:
        # Initialize RAG system
        csv_path = "luxury_animal_products_vegan_alternatives.csv"
        rag_system = RAGSystem(csv_path)
        
        # Try to load existing index, otherwise setup new one
        if not rag_system.load_existing_index():
            print("🔄 Setting up new RAG system...")
            if not rag_system.setup():
                print("❌ Setup failed.")
                return
            print("✅ Setup complete!")
        else:
            print("✅ Loaded existing index!")
            
    except Exception as e:
        print(f"❌ Failed to initialize RAG system: {e}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "rag_system_ready": rag_system is not None}

# Frontend-compatible endpoints
@app.get("/api/chatbot/categories")
async def get_chatbot_categories():
    """Get available chatbot categories"""
    try:
        # Return some predefined categories for the frontend
        categories = [
            {"id": "general", "name": "General Questions", "description": "Ask about any cruelty-free shopping topic"},
            {"id": "products", "name": "Product Information", "description": "Learn about specific products and alternatives"},
            {"id": "materials", "name": "Animal Materials", "description": "Understand which materials come from animals"},
            {"id": "alternatives", "name": "Vegan Alternatives", "description": "Find cruelty-free alternatives to products"}
        ]
        return categories
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get categories: {str(e)}")

@app.post("/api/chatbot/chat")
async def chatbot_chat(request: ChatRequest):
    """Chat endpoint for chatbot queries"""
    if not rag_system:
        raise HTTPException(status_code=503, detail="RAG system not initialized")
    
    try:
        # Process the query using RAG
        answer = rag_system.answer_query(request.message)
        
        return {
            "response": answer,
            "success": True,
            "message": request.message
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process chat message: {str(e)}")

# Original RAG endpoints
@app.post("/api/rag/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Chat endpoint for RAG queries"""
    if not rag_system:
        raise HTTPException(status_code=503, detail="RAG system not initialized")
    
    try:
        # Process the query
        answer = rag_system.answer_query(request.message)
        
        return ChatResponse(
            response=answer,
            success=True
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process query: {str(e)}")

@app.get("/api/rag/status")
async def status():
    """Get RAG system status"""
    if not rag_system:
        return {"status": "not_initialized"}
    
    return {
        "status": "ready",
        "chunks_loaded": len(rag_system.chunks) if hasattr(rag_system, 'chunks') else 0
    }

if __name__ == "__main__":
    # Set default port to 8000 to match frontend expectations
    port = int(os.getenv("PORT", 8000))
    
    print(f"🚀 Starting RAG API server on port {port}")
    print("🌱 Make sure GEMINI_API_KEY environment variable is set")
    
    uvicorn.run(app, host="0.0.0.0", port=port) 