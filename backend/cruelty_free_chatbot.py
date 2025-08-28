# -*- coding: utf-8 -*-
"""Cruelty-Free Shopping RAG with Gemini API for AnimalHack"""

import os
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import pickle
import google.generativeai as genai
from typing import List, Dict, Any, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CrueltyFreeChatbot:
    """Cruelty-free shopping assistant using RAG with Gemini API"""
    
    def __init__(self, csv_path: str, gemini_api_key: str):
        """
        Initialize the chatbot
        
        Args:
            csv_path: Path to the CSV file with product data
            gemini_api_key: Gemini API key
        """
        self.csv_path = csv_path
        self.gemini_api_key = gemini_api_key
        self.embed_model = None
        self.index = None
        self.chunks = []
        self.gemini = None
        
        # Initialize components
        self._setup_gemini()
        self._load_data()
        self._build_index()
    
    def _setup_gemini(self):
        """Configure Gemini API"""
        try:
            genai.configure(api_key=self.gemini_api_key)
            # Use gemini-1.5-flash as it's more stable and widely available
            self.gemini = genai.GenerativeModel("gemini-1.5-flash")
            logger.info("✅ Gemini API configured successfully")
        except Exception as e:
            logger.error(f"❌ Failed to configure Gemini API: {e}")
            raise
    
    def _load_data(self):
        """Load and process the CSV data"""
        try:
            df = pd.read_csv(self.csv_path)
            logger.info(f"✅ Loaded {len(df)} products from CSV")
            
            # Build text chunks
            self.chunks = []
            for _, row in df.iterrows():
                text = f"""
Product: {row['Product Name']} ({row['Category']})
Materials from animals: {row['Animal Materials Used']}
Animal cruelty flag: {row['Animal Cruelty Flag']}
Cruelty Note: {row['Cruelty Note']}
Price: ${row['Estimated Price']}
Vegan Alternative: {row['Vegan Alternative']}
Vegan Material: {row['Material']}
Vegan Price: ${row['Price']}
Why choose vegan: {row['Why Choose Vegan']}
"""
                self.chunks.append({"text": text, "metadata": row.to_dict()})
            
            logger.info(f"✅ Created {len(self.chunks)} text chunks")
            
        except Exception as e:
            logger.error(f"❌ Failed to load CSV data: {e}")
            raise
    
    def _build_index(self):
        """Build FAISS index for semantic search"""
        try:
            # Initialize embedding model
            self.embed_model = SentenceTransformer("all-MiniLM-L6-v2")
            
            # Generate embeddings
            texts = [c['text'] for c in self.chunks]
            embeddings = self.embed_model.encode(texts, show_progress_bar=True).astype("float32")
            
            # Build FAISS index
            dimension = embeddings.shape[1]
            self.index = faiss.IndexFlatL2(dimension)
            self.index.add(embeddings)
            
            logger.info(f"✅ Built FAISS index with {len(embeddings)} embeddings")
            
        except Exception as e:
            logger.error(f"❌ Failed to build FAISS index: {e}")
            raise
    
    def retrieve_chunks(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """
        Retrieve relevant chunks for a query
        
        Args:
            query: User query
            top_k: Number of top results to return
            
        Returns:
            List of relevant chunks with metadata
        """
        try:
            vec = self.embed_model.encode([query]).astype("float32")
            D, I = self.index.search(vec, top_k)
            return [self.chunks[i] for i in I[0]]
        except Exception as e:
            logger.error(f"❌ Failed to retrieve chunks: {e}")
            return []
    
    def answer_query(self, query: str) -> str:
        """
        Answer a user query using RAG
        
        Args:
            query: User query about products
            
        Returns:
            Generated answer from Gemini
        """
        try:
            # Retrieve relevant chunks
            top_chunks = self.retrieve_chunks(query)
            if not top_chunks:
                return "I couldn't find relevant information to answer your question. Please try rephrasing or ask about specific products or materials."
            
            # Build context from chunks
            context = "\n".join([c['text'] for c in top_chunks])
            
            # Create prompt for Gemini
            prompt = f"""
You are a cruelty-free shopping assistant for AnimalHack.
You have information about luxury products that use animal materials and their vegan alternatives.
Use the following product information to answer the user's question clearly and helpfully.

For each relevant product, explain:
- Which animals are harmed and why
- Product price
- Vegan alternatives with materials and prices
- Why someone should choose the vegan alternative

Product Data:
{context}

User query: {query}

Provide a compassionate, informative answer that helps users make cruelty-free choices.
"""

            # Generate response
            response = self.gemini.generate_content(prompt)
            return response.text
            
        except Exception as e:
            logger.error(f"❌ Failed to generate answer: {e}")
            return f"I encountered an error while processing your request: {str(e)}"
    
    def get_product_suggestions(self, category: Optional[str] = None, max_price: Optional[float] = None) -> List[Dict[str, Any]]:
        """
        Get product suggestions based on filters
        
        Args:
            category: Product category filter
            max_price: Maximum price filter
            
        Returns:
            List of filtered products
        """
        try:
            suggestions = []
            for chunk in self.chunks:
                metadata = chunk['metadata']
                
                # Apply filters
                if category and metadata['Category'] != category:
                    continue
                    
                if max_price:
                    try:
                        price = float(str(metadata['Price']).replace('$', '').replace(',', ''))
                        if price > max_price:
                            continue
                    except (ValueError, TypeError):
                        continue
                
                suggestions.append({
                    'product_name': metadata['Product Name'],
                    'category': metadata['Category'],
                    'animal_materials': metadata['Animal Materials Used'],
                    'cruelty_flag': metadata['Animal Cruelty Flag'],
                    'vegan_alternative': metadata['Vegan Alternative'],
                    'vegan_material': metadata['Material'],
                    'vegan_price': metadata['Price'],
                    'why_vegan': metadata['Why Choose Vegan']
                })
            
            return suggestions[:10]  # Limit to 10 suggestions
            
        except Exception as e:
            logger.error(f"❌ Failed to get product suggestions: {e}")
            return []
    
    def save_index(self, index_path: str = "faiss_animal_products.index", metadata_path: str = "metadata.pkl"):
        """Save the FAISS index and metadata for later use"""
        try:
            faiss.write_index(self.index, index_path)
            with open(metadata_path, "wb") as f:
                pickle.dump(self.chunks, f)
            logger.info("✅ Index and metadata saved successfully")
        except Exception as e:
            logger.error(f"❌ Failed to save index: {e}")
    
    def load_index(self, index_path: str = "faiss_animal_products.index", metadata_path: str = "metadata.pkl"):
        """Load a previously saved FAISS index and metadata"""
        try:
            self.index = faiss.read_index(index_path)
            with open(metadata_path, "rb") as f:
                self.chunks = pickle.load(f)
            logger.info("✅ Index and metadata loaded successfully")
        except Exception as e:
            logger.error(f"❌ Failed to load index: {e}")
            raise

# Example usage and testing
if __name__ == "__main__":
    # This would be used for testing the chatbot directly
    import os
    from dotenv import load_dotenv
    
    load_dotenv()
    
    # Get API key from environment
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        print("❌ GEMINI_API_KEY not set in environment variables")
        exit(1)
    
    # Initialize chatbot
    csv_path = "luxury_animal_products_vegan_alternatives.csv"
    chatbot = CrueltyFreeChatbot(csv_path, gemini_api_key)
    
    # Test queries
    test_queries = [
        "What are some vegan alternatives to leather handbags?",
        "Tell me about products that use ostrich leather",
        "What are the most affordable vegan alternatives?",
        "How are animals harmed in the wool industry?"
    ]
    
    print("🤖 Testing Cruelty-Free Shopping Chatbot\n")
    
    for query in test_queries:
        print(f"❓ Query: {query}")
        answer = chatbot.answer_query(query)
        print(f"🤖 Answer: {answer[:200]}...")
        print("-" * 80)
        print() 