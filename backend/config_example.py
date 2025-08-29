# Configuration Example for RAG Chatbot
# Copy this file to config.py and fill in your actual values

import os

# Google Gemini API Key (required)
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY = "your_gemini_api_key_here"

# Alternative: Set as environment variable
# os.environ["GEMINI_API_KEY"] = "your_gemini_api_key_here"

# CSV file path (defaults to current directory)
CSV_PATH = "luxury_animal_products_vegan_alternatives.csv"

# Logging level
LOG_LEVEL = "INFO"

# RAG parameters
TOP_K_CHUNKS = 5
EMBEDDING_MODEL = "all-MiniLM-L6-v2"
GEMINI_MODEL = "gemini-2.5-flash" 