#!/usr/bin/env python3
"""
Test script for conservation actions endpoints
"""
import asyncio
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "http://localhost:8000"

async def test_conservation_actions():
    """Test the conservation actions endpoints"""
    async with httpx.AsyncClient() as client:
        print("Testing conservation actions endpoints...")
        
        # Test GET /api/conservation_actions
        print("\n1. Testing GET /api/conservation_actions")
        try:
            response = await client.get(f"{BASE_URL}/api/conservation_actions")
            print(f"Status: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"Response: {data}")
            else:
                print(f"Error: {response.text}")
        except Exception as e:
            print(f"Exception: {e}")
        
        # Test GET /api/conservation_actions/{code} with a sample code
        print("\n2. Testing GET /api/conservation_actions/1.1")
        try:
            response = await client.get(f"{BASE_URL}/api/conservation_actions/1.1")
            print(f"Status: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"Response: {data}")
            else:
                print(f"Error: {response.text}")
        except Exception as e:
            print(f"Exception: {e}")

if __name__ == "__main__":
    asyncio.run(test_conservation_actions()) 