#!/usr/bin/env python3
"""Simple test script to verify chatbot initialization"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_chatbot_init():
    """Test if the chatbot can be initialized"""
    try:
        print("🔍 Testing chatbot initialization...")
        
        # Check if API key is set
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            print("❌ GEMINI_API_KEY not found in environment")
            print("💡 Create a .env file with your Gemini API key")
            return False
        
        print(f"✅ Found API key: {api_key[:10]}...")
        
        # Check if CSV file exists
        csv_path = "luxury_animal_products_vegan_alternatives.csv"
        if not os.path.exists(csv_path):
            print(f"❌ CSV file not found: {csv_path}")
            return False
        
        print(f"✅ Found CSV file: {csv_path}")
        
        # Try to import and initialize
        try:
            from cruelty_free_chatbot import CrueltyFreeChatbot
            print("✅ Successfully imported CrueltyFreeChatbot")
            
            chatbot = CrueltyFreeChatbot(csv_path, api_key)
            print("✅ Chatbot initialized successfully!")
            
            # Test a simple query
            test_query = "What are vegan alternatives to leather?"
            print(f"🧪 Testing query: {test_query}")
            
            response = chatbot.answer_query(test_query)
            print(f"✅ Got response: {response[:100]}...")
            
            return True
            
        except ImportError as e:
            print(f"❌ Import error: {e}")
            return False
        except Exception as e:
            print(f"❌ Initialization error: {e}")
            import traceback
            traceback.print_exc()
            return False
            
    except Exception as e:
        print(f"❌ Test failed: {e}")
        return False

if __name__ == "__main__":
    success = test_chatbot_init()
    if success:
        print("\n🎉 Chatbot test passed! You're ready to go!")
    else:
        print("\n💥 Chatbot test failed. Check the errors above.") 