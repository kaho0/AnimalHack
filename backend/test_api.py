import requests
import json

def test_chatbot():
    url = "http://localhost:8000/api/chatbot/chat"
    
    # Test data
    data = {
        "message": "Tell me about products that use ostrich leather"
    }
    
    try:
        response = requests.post(url, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"\n✅ Success! Answer: {result.get('response', 'No response')[:200]}...")
        else:
            print(f"❌ Error: {response.text}")
            
    except Exception as e:
        print(f"❌ Exception: {e}")

if __name__ == "__main__":
    test_chatbot() 