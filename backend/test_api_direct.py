#!/usr/bin/env python3
"""Test the chatbot API endpoint directly"""

import requests
import json

def test_chatbot_api():
    """Test the chatbot API endpoint"""
    url = "http://localhost:8000/api/chatbot/chat"
    for message in test_messages:
        print(f"\n🧪 Testing message: '{message}'")
        print("-" * 50)
        
        try:
            response = requests.post(url, json={"message": message})
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Status: {response.status_code}")
                print(f"📝 Response HTML: {data.get('response_html', 'N/A')[:200]}...")
                print(f"📝 Response Markdown: {data.get('response_markdown', 'N/A')[:200]}...")
            else:
                print(f"❌ Status: {response.status_code}")
                print(f"❌ Error: {response.text}")
                
        except Exception as e:
            print(f"❌ Request failed: {e}")

if __name__ == "__main__":
    print("🔍 Testing chatbot API endpoint...")
    test_chatbot_api() 