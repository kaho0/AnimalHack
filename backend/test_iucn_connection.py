#!/usr/bin/env python3
"""
Test script to verify IUCN API connection
"""
import os
import asyncio
import httpx
from dotenv import load_dotenv

load_dotenv()

IUCN_BASE_URL = "https://api.iucnredlist.org"
IUCN_TOKEN = os.getenv("IUCN_API_TOKEN", "UUogE4adTvw6XFk2e6bi17Q1fz91v5sXCDDW").strip()

async def test_conservation_actions():
    """Test the conservation actions endpoint"""
    async with httpx.AsyncClient() as client:
        headers = {
            "Accept": "application/json",
            "Authorization": IUCN_TOKEN
        }
        
        # Test the main conservation actions endpoint
        print("Testing conservation actions endpoint...")
        response = await client.get(
            f"{IUCN_BASE_URL}/api/v4/conservation_actions",
            headers=headers
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success! Found {len(data.get('conservation_actions', []))} conservation actions")
            
            # Show first few actions
            actions = data.get('conservation_actions', [])[:5]
            for action in actions:
                print(f"  - {action['code']}: {action['description']['en']}")
        else:
            print(f"❌ Failed with status {response.status_code}")
            print(f"Response: {response.text}")
            
        # Test a specific conservation action
        print("\nTesting specific conservation action (6_3)...")
        response2 = await client.get(
            f"{IUCN_BASE_URL}/api/v4/conservation_actions/6_3",
            headers=headers
        )
        
        if response2.status_code == 200:
            data2 = response2.json()
            action = data2.get('conservation_action', {})
            assessments = data2.get('assessments', [])
            print(f"✅ Success! Found conservation action: {action['code']}: {action['description']['en']}")
            print(f"  - Number of assessments: {len(assessments)}")
            
            if assessments:
                first_assessment = assessments[0]
                print(f"  - First assessment: {first_assessment['taxon_scientific_name']} ({first_assessment['red_list_category_code']})")
        else:
            print(f"❌ Failed with status {response2.status_code}")
            print(f"Response: {response2.text}")

if __name__ == "__main__":
    print("Testing IUCN API connection...")
    print(f"Using token: {IUCN_TOKEN[:10]}...")
    print()
    
    asyncio.run(test_conservation_actions()) 