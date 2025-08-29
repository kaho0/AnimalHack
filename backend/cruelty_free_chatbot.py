# -*- coding: utf-8 -*-
"""Cruelty-Free Shopping RAG with Gemini API"""

# Install required packages
# !pip install sentence-transformers faiss-cpu pandas tqdm google-generativeai

# ------------------------------
# 1️⃣ Import libraries
# ------------------------------
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import pickle
import google.generativeai as genai
import os
from typing import List, Dict, Any, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ------------------------------
# 2️⃣ Configure Gemini API
# ------------------------------
def setup_gemini(api_key: str):
    """Configure Gemini API with the provided key"""
    try:
        genai.configure(api_key=api_key)
        gemini = genai.GenerativeModel("gemini-2.0-flash-exp")
        logger.info("✅ Gemini API configured successfully")
        return gemini
    except Exception as e:
        logger.error(f"❌ Failed to configure Gemini API: {e}")
        raise

# ------------------------------
# 3️⃣ Load dataset
# ------------------------------
def load_dataset(csv_path: str):
    """Load the CSV dataset"""
    try:
        df = pd.read_csv(csv_path)
        logger.info(f"✅ Loaded {len(df)} products from CSV")
        return df
    except Exception as e:
        logger.error(f"❌ Failed to load CSV data: {e}")
        raise

# ------------------------------
# 4️⃣ Build text chunks
# ------------------------------
def build_chunks(df: pd.DataFrame):
    """Build text chunks from the dataframe"""
    chunks = []
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
        chunks.append({"text": text, "metadata": row.to_dict()})
    
    logger.info(f"✅ Created {len(chunks)} text chunks")
    return chunks

# ------------------------------
# 5️⃣ Generate embeddings
# ------------------------------
def generate_embeddings(chunks: List[Dict]):
    """Generate embeddings for the text chunks"""
    try:
        embed_model = SentenceTransformer("all-MiniLM-L6-v2")
        texts = [c['text'] for c in chunks]
        embeddings = embed_model.encode(texts, show_progress_bar=True).astype("float32")
        logger.info(f"✅ Generated {len(embeddings)} embeddings")
        return embed_model, embeddings
    except Exception as e:
        logger.error(f"❌ Failed to generate embeddings: {e}")
        raise

# ------------------------------
# 6️⃣ Build FAISS index
# ------------------------------
def build_faiss_index(embeddings: np.ndarray):
    """Build FAISS index from embeddings"""
    try:
        dimension = embeddings.shape[1]
        index = faiss.IndexFlatL2(dimension)
        index.add(embeddings)
        logger.info(f"✅ Built FAISS index with {len(embeddings)} embeddings")
        return index
    except Exception as e:
        logger.error(f"❌ Failed to build FAISS index: {e}")
        raise

# ------------------------------
# 7️⃣ Save and load index & metadata
# ------------------------------
def save_index_and_metadata(index: faiss.Index, chunks: List[Dict], 
                           index_path: str = "faiss_animal_products.index", 
                           metadata_path: str = "metadata.pkl"):
    """Save the FAISS index and metadata"""
    try:
        faiss.write_index(index, index_path)
        with open(metadata_path, "wb") as f:
            pickle.dump(chunks, f)
        logger.info("✅ FAISS index and metadata saved")
    except Exception as e:
        logger.error(f"❌ Failed to save index: {e}")

def load_index_and_metadata(index_path: str = "faiss_animal_products.index", 
                           metadata_path: str = "metadata.pkl"):
    """Load previously saved FAISS index and metadata"""
    try:
        index = faiss.read_index(index_path)
        with open(metadata_path, "rb") as f:
            chunks = pickle.load(f)
        logger.info("✅ FAISS index and metadata loaded")
        return index, chunks
    except Exception as e:
        logger.error(f"❌ Failed to load index: {e}")
        raise

# ------------------------------
# 8️⃣ RAG functions
# ------------------------------
def retrieve_chunks(query: str, embed_model: SentenceTransformer, 
                   index: faiss.Index, chunks: List[Dict], top_k: int = 5):
    """Retrieve relevant chunks for a query"""
    try:
        vec = embed_model.encode([query]).astype("float32")
        D, I = index.search(vec, top_k)
        return [chunks[i] for i in I[0]]
    except Exception as e:
        logger.error(f"❌ Failed to retrieve chunks: {e}")
        return []

def answer_with_rag(query: str, embed_model: SentenceTransformer, 
                   index: faiss.Index, chunks: List[Dict], gemini):
    """Answer a query using RAG"""
    try:
        top_chunks = retrieve_chunks(query, embed_model, index, chunks)
        if not top_chunks:
            return "I couldn't find relevant information to answer your question. Please try rephrasing or ask about specific products or materials."
        
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

        response = gemini.generate_content(prompt)
        return response.text
    except Exception as e:
        logger.error(f"❌ Failed to generate answer: {e}")
        return f"I encountered an error while processing your request: {str(e)}"

# ------------------------------
# 9️⃣ Main chatbot class
# ------------------------------
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
        self._setup()
    
    def _setup(self):
        """Setup all components"""
        try:
            # Setup Gemini
            self.gemini = setup_gemini(self.gemini_api_key)
            
            # Load dataset
            df = load_dataset(self.csv_path)
            
            # Build chunks
            self.chunks = build_chunks(df)
            
            # Generate embeddings
            self.embed_model, embeddings = generate_embeddings(self.chunks)
            
            # Build FAISS index
            self.index = build_faiss_index(embeddings)
            
            # Save for later use
            save_index_and_metadata(self.index, self.chunks)
            
        except Exception as e:
            logger.error(f"❌ Setup failed: {e}")
            raise
    
    def answer_query(self, query: str) -> str:
        """Answer a user query using RAG"""
        return answer_with_rag(query, self.embed_model, self.index, self.chunks, self.gemini)
    
    def get_product_suggestions(self, category: Optional[str] = None, max_price: Optional[float] = None) -> List[Dict[str, Any]]:
        """Get product suggestions based on filters"""
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

# ------------------------------
# 🔟 Interactive chat
# ------------------------------
def interactive_chat(chatbot: CrueltyFreeChatbot):
    """Run interactive chat session"""
    print("🤖 Cruelty-Free Shopping Assistant")
    print("Ask me about products, animal materials, or vegan alternatives!")
    print("Type 'exit' to quit\n")
    
    while True:
        try:
            user_query = input("❓ Ask about a product: ")
            if user_query.lower() in ['exit', 'quit', 'bye']:
                print("👋 Thanks for using the cruelty-free shopping assistant!")
                break
            
            if not user_query.strip():
                continue
                
            print("\n🤖 Thinking...")
            answer = chatbot.answer_query(user_query)
            print(f"\n📌 Answer:\n{answer}\n")
            print("-" * 80)
            
        except KeyboardInterrupt:
            print("\n\n👋 Chat session ended. Goodbye!")
            break
        except Exception as e:
            print(f"\n❌ Error: {e}")
            print("Please try again or type 'exit' to quit.\n")

# ------------------------------
# 🚀 Main execution
# ------------------------------
if __name__ == "__main__":
    import os
    from dotenv import load_dotenv
    
    # Load environment variables
    load_dotenv()
    
    # Get API key from environment
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        print("❌ GEMINI_API_KEY not set in environment variables")
        print("Please set your Gemini API key in the .env file")
        exit(1)
    
    # Initialize chatbot
    csv_path = "luxury_animal_products_vegan_alternatives.csv"
    
    try:
        chatbot = CrueltyFreeChatbot(csv_path, gemini_api_key)
        print("✅ Chatbot initialized successfully!")
        
        # Start interactive chat
        interactive_chat(chatbot)
        
    except Exception as e:
        print(f"❌ Failed to initialize chatbot: {e}")
        exit(1) 