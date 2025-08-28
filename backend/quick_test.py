#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Quick test script for the cruelty-free shopping chatbot"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_chatbot_directly():
    """Test the chatbot class directly without the server"""
    
    print("🧪 Testing Cruelty-Free Chatbot Directly")
    print("=" * 50)
    
    # Check environment variable
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        print("❌ GEMINI_API_KEY not found in environment")
        print("Please create a .env file with your API key")
        return False
    
    print(f"✅ Found API key: {gemini_api_key[:10]}...")
    
    # Check CSV file
    csv_path = "luxury_animal_products_vegan_alternatives.csv"
    if not os.path.exists(csv_path):
        print(f"❌ CSV file not found: {csv_path}")
        return False
    
    print(f"✅ Found CSV file: {csv_path}")
    
    try:
        # Import and test the chatbot
        from cruelty_free_chatbot import CrueltyFreeChatbot
        
        print("🔄 Initializing chatbot...")
        chatbot = CrueltyFreeChatbot(csv_path, gemini_api_key)
        
        print("✅ Chatbot initialized successfully!")
        print(f"📊 Loaded {len(chatbot.chunks)} products")
        
        # Test a simple query
        print("\n🧪 Testing simple query...")
        test_query = "What are vegan alternatives to leather handbags?"
        print(f"Query: {test_query}")
        
        answer = chatbot.answer_query(test_query)
        print(f"✅ Answer received ({len(answer)} characters):")
        print(f"Answer: {answer[:200]}...")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_chatbot_directly()
    if success:
        print("\n🎉 Quick test passed! The chatbot is working correctly.")
    else:
        print("\n💥 Quick test failed. Check the errors above.")
    
    sys.exit(0 if success else 1) 