#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Test script for the cruelty-free shopping chatbot"""

import os
import sys
from dotenv import load_dotenv

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from cruelty_free_chatbot import CrueltyFreeChatbot

def test_chatbot():
    """Test the chatbot functionality"""
    
    # Load environment variables
    load_dotenv()
    
    # Get API key
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        print("❌ GEMINI_API_KEY not set in environment variables")
        print("Please set it in your .env file or environment")
        return False
    
    # Check if CSV file exists
    csv_path = "luxury_animal_products_vegan_alternatives.csv"
    if not os.path.exists(csv_path):
        print(f"❌ CSV file not found: {csv_path}")
        return False
    
    try:
        print("🤖 Initializing Cruelty-Free Shopping Chatbot...")
        
        # Initialize chatbot
        chatbot = CrueltyFreeChatbot(csv_path, gemini_api_key)
        
        print("✅ Chatbot initialized successfully!")
        print(f"📊 Loaded {len(chatbot.chunks)} products")
        
        # Test queries
        test_queries = [
            "What are vegan alternatives to leather handbags?",
            "Tell me about products that use ostrich leather",
            "What are the most affordable vegan alternatives?",
            "How are animals harmed in the wool industry?"
        ]
        
        print("\n🧪 Testing chatbot responses...")
        print("=" * 80)
        
        for i, query in enumerate(test_queries, 1):
            print(f"\n❓ Test {i}: {query}")
            print("-" * 60)
            
            try:
                answer = chatbot.answer_query(query)
                print(f"🤖 Answer: {answer[:300]}...")
                if len(answer) > 300:
                    print(f"   ... (truncated, full length: {len(answer)} characters)")
            except Exception as e:
                print(f"❌ Error: {e}")
        
        # Test product suggestions
        print("\n🛍️ Testing product suggestions...")
        print("=" * 80)
        
        # Test category filter
        suggestions = chatbot.get_product_suggestions(category="Handbags")
        print(f"\n📦 Handbag suggestions: {len(suggestions)} found")
        for suggestion in suggestions[:3]:
            print(f"   • {suggestion['vegan_alternative']} ({suggestion['vegan_material']}) - ${suggestion['vegan_price']}")
        
        # Test price filter
        suggestions = chatbot.get_product_suggestions(max_price=200)
        print(f"\n💰 Affordable alternatives (under $200): {len(suggestions)} found")
        for suggestion in suggestions[:3]:
            print(f"   • {suggestion['vegan_alternative']} ({suggestion['vegan_material']}) - ${suggestion['vegan_price']}")
        
        print("\n✅ All tests completed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_chatbot()
    sys.exit(0 if success else 1) 