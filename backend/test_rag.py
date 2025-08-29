#!/usr/bin/env python3
"""
Test script for the RAG chatbot system
Run this to verify everything is working before using the interactive version
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_imports():
    """Test that all required packages can be imported"""
    try:
        import pandas as pd
        import numpy as np
        import faiss
        from sentence_transformers import SentenceTransformer
        import google.generativeai as genai
        print("✅ All imports successful")
        return True
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False

def test_api_key():
    """Test that the Gemini API key is available"""
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
        print("✅ Gemini API key found")
        return True
    else:
        print("❌ Gemini API key not found in .env file")
        return False

def test_csv_file():
    """Test that the CSV file exists and can be read"""
    csv_path = "luxury_animal_products_vegan_alternatives.csv"
    if os.path.exists(csv_path):
        try:
            import pandas as pd
            df = pd.read_csv(csv_path)
            print(f"✅ CSV file loaded successfully with {len(df)} rows")
            return True
        except Exception as e:
            print(f"❌ Error reading CSV: {e}")
            return False
    else:
        print(f"❌ CSV file not found at {csv_path}")
        return False

def main():
    """Run all tests"""
    print("🧪 Testing RAG Chatbot System...\n")
    
    tests = [
        ("Package Imports", test_imports),
        ("API Key", test_api_key),
        ("CSV File", test_csv_file),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"Testing {test_name}...")
        if test_func():
            passed += 1
        print()
    
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! You can now run the RAG chatbot.")
        print("Run: python rag_chatbot.py")
    else:
        print("⚠️  Some tests failed. Please fix the issues before running the chatbot.")

if __name__ == "__main__":
    main() 