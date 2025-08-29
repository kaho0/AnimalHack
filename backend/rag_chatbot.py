# -*- coding: utf-8 -*-
"""Improved Cruelty-Free Shopping RAG with Gemini API"""

import os
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import pickle
import google.generativeai as genai
from typing import List, Dict, Any
import logging

# ------------------------------
# 1️⃣ Setup logging
# ------------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ------------------------------
# 2️⃣ Configuration
# ------------------------------
class Config:
    """Configuration class for the RAG system"""
    
    # Load API key from environment variable (more secure)
    GEN_API_KEY = os.getenv("GEMINI_API_KEY")
    
    # Model configuration
    EMBEDDING_MODEL = "all-MiniLM-L6-v2"
    GEMINI_MODEL = "gemini-2.5-flash"
    
    # RAG parameters
    TOP_K_CHUNKS = 5
    CHUNK_TEMPLATE = """
Product: {product_name} ({category})
Materials from animals: {animal_materials}
Animal cruelty flag: {cruelty_flag}
Cruelty Note: {cruelty_note}
Price: ${price}
Vegan Alternative: {vegan_alternative}
Vegan Material: {vegan_material}
Vegan Price: ${vegan_price}
Why choose vegan: {why_vegan}
"""

# ------------------------------
# 3️⃣ Data Processor
# ------------------------------
class DataProcessor:
    """Handles data loading and chunking"""
    
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.df = None
        self.chunks = []
        
    def load_data(self) -> bool:
        """Load CSV data with error handling"""
        try:
            self.df = pd.read_csv(self.csv_path)
            logger.info(f"✅ Loaded {len(self.df)} products from CSV")
            return True
        except FileNotFoundError:
            logger.error(f"❌ CSV file not found: {self.csv_path}")
            return False
        except Exception as e:
            logger.error(f"❌ Error loading CSV: {e}")
            return False
    
    def create_chunks(self) -> List[Dict[str, Any]]:
        """Create text chunks from dataframe rows"""
        if self.df is None:
            logger.error("❌ No data loaded. Call load_data() first.")
            return []
        
        chunks = []
        for _, row in self.df.iterrows():
            try:
                text = Config.CHUNK_TEMPLATE.format(
                    product_name=row.get('Product Name', 'Unknown'),
                    category=row.get('Category', 'Unknown'),
                    animal_materials=row.get('Animal Materials Used', 'Unknown'),
                    cruelty_flag=row.get('Animal Cruelty Flag', 'Unknown'),
                    cruelty_note=row.get('Cruelty Note', 'Unknown'),
                    price=row.get('Estimated Price', 'Unknown'),
                    vegan_alternative=row.get('Vegan Alternative', 'Unknown'),
                    vegan_material=row.get('Material', 'Unknown'),
                    vegan_price=row.get('Price', 'Unknown'),
                    why_vegan=row.get('Why Choose Vegan', 'Unknown')
                )
                chunks.append({"text": text, "metadata": row.to_dict()})
            except Exception as e:
                logger.warning(f"⚠️ Error processing row: {e}")
                continue
        
        self.chunks = chunks
        logger.info(f"✅ Created {len(chunks)} text chunks")
        return chunks

# ------------------------------
# 4️⃣ Embedding Manager
# ------------------------------
class EmbeddingManager:
    """Manages text embeddings and FAISS index"""
    
    def __init__(self, model_name: str = Config.EMBEDDING_MODEL):
        self.model_name = model_name
        self.embed_model = None
        self.index = None
        
    def load_model(self):
        """Load the sentence transformer model"""
        try:
            self.embed_model = SentenceTransformer(self.model_name)
            logger.info(f"✅ Loaded embedding model: {self.model_name}")
        except Exception as e:
            logger.error(f"❌ Error loading embedding model: {e}")
            raise
    
    def create_embeddings(self, texts: List[str]) -> np.ndarray:
        """Generate embeddings for texts"""
        if self.embed_model is None:
            raise ValueError("Embedding model not loaded. Call load_model() first.")
        
        try:
            embeddings = self.embed_model.encode(texts, show_progress_bar=True).astype("float32")
            logger.info(f"✅ Generated embeddings for {len(texts)} texts")
            return embeddings
        except Exception as e:
            logger.error(f"❌ Error generating embeddings: {e}")
            raise
    
    def build_index(self, embeddings: np.ndarray) -> faiss.Index:
        """Build FAISS index from embeddings"""
        try:
            dimension = embeddings.shape[1]
            index = faiss.IndexFlatL2(dimension)
            index.add(embeddings)
            self.index = index
            logger.info(f"✅ Built FAISS index with dimension {dimension}")
            return index
        except Exception as e:
            logger.error(f"❌ Error building FAISS index: {e}")
            raise
    
    def save_index(self, filepath: str):
        """Save FAISS index to file"""
        if self.index is None:
            raise ValueError("No index to save. Call build_index() first.")
        
        try:
            faiss.write_index(self.index, filepath)
            logger.info(f"✅ Saved FAISS index to {filepath}")
        except Exception as e:
            logger.error(f"❌ Error saving index: {e}")
            raise
    
    def load_index(self, filepath: str):
        """Load FAISS index from file"""
        try:
            self.index = faiss.read_index(filepath)
            logger.info(f"✅ Loaded FAISS index from {filepath}")
        except Exception as e:
            logger.error(f"❌ Error loading index: {e}")
            raise
    
    def search(self, query_vector: np.ndarray, top_k: int = Config.TOP_K_CHUNKS):
        """Search index for similar vectors"""
        if self.index is None:
            raise ValueError("No index loaded. Call load_index() first.")
        
        try:
            D, I = self.index.search(query_vector, top_k)
            return D, I
        except Exception as e:
            logger.error(f"❌ Error searching index: {e}")
            raise

# ------------------------------
# 5️⃣ Gemini Manager
# ------------------------------
class GeminiManager:
    """Manages Gemini API interactions"""
    
    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("Gemini API key is required")
        
        self.api_key = api_key
        self.model = None
        self._configure()
    
    def _configure(self):
        """Configure Gemini API"""
        try:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel(Config.GEMINI_MODEL)
            logger.info(f"✅ Configured Gemini API with model: {Config.GEMINI_MODEL}")
        except Exception as e:
            logger.error(f"❌ Error configuring Gemini API: {e}")
            raise
    
    def generate_response(self, prompt: str) -> str:
        """Generate response using Gemini"""
        if self.model is None:
            raise ValueError("Gemini model not configured")
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            logger.error(f"❌ Error generating Gemini response: {e}")
            return f"Sorry, I encountered an error: {str(e)}"

# ------------------------------
# 6️⃣ RAG System
# ------------------------------
class RAGSystem:
    """Main RAG system that coordinates all components"""
    
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.data_processor = DataProcessor(csv_path)
        self.embedding_manager = EmbeddingManager()
        self.gemini_manager = None
        self.chunks = []
        
        # Initialize Gemini if API key is available
        if Config.GEN_API_KEY:
            try:
                self.gemini_manager = GeminiManager(Config.GEN_API_KEY)
            except Exception as e:
                logger.warning(f"⚠️ Gemini initialization failed: {e}")
    
    def setup(self):
        """Setup the complete RAG system"""
        try:
            # Load and process data
            if not self.data_processor.load_data():
                return False
            
            self.chunks = self.data_processor.create_chunks()
            if not self.chunks:
                return False
            
            # Setup embeddings
            self.embedding_manager.load_model()
            texts = [c['text'] for c in self.chunks]
            embeddings = self.embedding_manager.create_embeddings(texts)
            
            # Build and save index
            self.embedding_manager.build_index(embeddings)
            self.embedding_manager.save_index("faiss_animal_products.index")
            
            # Save metadata
            with open("metadata.pkl", "wb") as f:
                pickle.dump(self.chunks, f)
            
            logger.info("✅ RAG system setup complete")
            return True
            
        except Exception as e:
            logger.error(f"❌ Setup failed: {e}")
            return False
    
    def load_existing_index(self):
        """Load existing FAISS index and metadata"""
        try:
            self.embedding_manager.load_index("faiss_animal_products.index")
            with open("metadata.pkl", "rb") as f:
                self.chunks = pickle.load(f)
            logger.info("✅ Loaded existing index and metadata")
            return True
        except Exception as e:
            logger.error(f"❌ Failed to load existing index: {e}")
            return False
    
    def retrieve_chunks(self, query: str, top_k: int = Config.TOP_K_CHUNKS) -> List[Dict[str, Any]]:
        """Retrieve relevant chunks for a query"""
        try:
            query_vector = self.embedding_manager.embed_model.encode([query]).astype("float32")
            D, I = self.embedding_manager.search(query_vector, top_k)
            return [self.chunks[i] for i in I[0]]
        except Exception as e:
            logger.error(f"❌ Error retrieving chunks: {e}")
            return []
    
    def answer_query(self, query: str) -> str:
        """Generate answer using RAG"""
        if not self.gemini_manager:
            return "❌ Gemini API not available. Please check your API key."
        
        try:
            top_chunks = self.retrieve_chunks(query)
            if not top_chunks:
                return "❌ No relevant information found for your query."
            
            context = "\n".join([c['text'] for c in top_chunks])
            
            prompt = f"""
You are a cruelty-free shopping assistant.
You have information about products that use animal materials and their vegan alternatives.
Use the following product information to answer the user's question clearly and helpfully.

For each relevant product:
- Which animals are harmed and why
- Product price
- Vegan alternatives with materials and prices
- Why someone should choose the vegan alternative

Product Data:
{context}

User query: {query}

Answer:
"""
            
            return self.gemini_manager.generate_response(prompt)
            
        except Exception as e:
            logger.error(f"❌ Error generating answer: {e}")
            return f"❌ Sorry, I encountered an error: {str(e)}"

# ------------------------------
# 7️⃣ Main execution
# ------------------------------
def main():
    """Main function to run the RAG system"""
    
    # Check if API key is available
    if not Config.GEN_API_KEY:
        print("❌ Please set GEMINI_API_KEY environment variable")
        print("Example: export GEMINI_API_KEY='your_api_key_here'")
        return
    
    # Initialize RAG system
    csv_path = "luxury_animal_products_vegan_alternatives.csv"
    rag_system = RAGSystem(csv_path)
    
    # Try to load existing index, otherwise setup new one
    if not rag_system.load_existing_index():
        print("🔄 Setting up new RAG system...")
        if not rag_system.setup():
            print("❌ Setup failed. Exiting.")
            return
        print("✅ Setup complete!")
    else:
        print("✅ Loaded existing index!")
    
    # Check if running in API mode (with --query argument)
    import sys
    if len(sys.argv) > 2 and sys.argv[1] == "--query":
        # API mode: process single query and exit
        query = sys.argv[2]
        print(f"🔄 Processing query: {query}")
        answer = rag_system.answer_query(query)
        print(f"\n📌 Answer:\n{answer}")
        return
    
    # Interactive chat mode
    print("\n🌱 Welcome to the Cruelty-Free Shopping Assistant!")
    print("Ask me about products or type 'exit' to quit.\n")
    
    while True:
        try:
            user_query = input("Ask about a product (or 'exit'): ").strip()
            
            if user_query.lower() == "exit":
                print("👋 Goodbye! Happy cruelty-free shopping!")
                break
            
            if not user_query:
                continue
            
            print("\n🔄 Thinking...")
            answer = rag_system.answer_query(user_query)
            print(f"\n📌 Answer:\n{answer}\n")
            
        except KeyboardInterrupt:
            print("\n\n👋 Goodbye! Happy cruelty-free shopping!")
            break
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
            continue

if __name__ == "__main__":
    main()
