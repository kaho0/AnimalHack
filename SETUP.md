# IUCN Conservation Actions Setup Guide

## Overview

This project integrates with the IUCN Red List API to display conservation actions and their associated species assessments. The system includes:

- **Backend**: FastAPI server that proxies IUCN API requests
- **Frontend**: Next.js application with React components for displaying conservation data
- **API Integration**: Direct connection to IUCN Red List API v4

## Setup Instructions

### 1. Backend Setup

First, navigate to the backend directory and set up your environment:

```bash
cd backend

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Environment Configuration

Create a `.env` file in the `backend/` directory with the following content:

```env
# IUCN Red List API Token
IUCN_API_TOKEN=UUogE4adTvw6XFk2e6bi17Q1fz91v5sXCDDW

# Server Configuration
PORT=8000

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

**Note**: The IUCN API token provided in the example is already included above. You can use this for testing.

### 3. Test IUCN API Connection

Before starting the server, test the API connection:

```bash
cd backend
python test_iucn_connection.py
```

You should see output like:

```
Testing IUCN API connection...
Using token: UUogE4adTvw6XFk2e6bi17Q1fz91v5sXCDDW...

Testing conservation actions endpoint...
✅ Success! Found 67 conservation actions
  - 1: Land/water protection
  - 1_1: Site/area protection
  - 1_2: Resource & habitat protection
  - 2: Land/water management
  - 2_1: Site/area management
```

### 4. Start Backend Server

```bash
cd backend
python main.py
```

The server will start on `http://localhost:8000`

### 5. Frontend Setup

In a new terminal, navigate to the frontend directory:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Features

### Conservation Actions List

- Displays all available conservation action codes and descriptions
- Hierarchical organization (e.g., 1, 1_1, 1_2, 2, 2_1, etc.)
- Click any action to view detailed information

### Conservation Action Details

- Shows the conservation action description
- Lists all species assessments associated with that action
- Displays IUCN Red List categories with color coding:
  - **CR** (Critically Endangered) - Red
  - **EN** (Endangered) - Orange
  - **VU** (Vulnerable) - Yellow
  - **NT** (Near Threatened) - Blue
  - **LC** (Least Concern) - Green
  - **DD** (Data Deficient) - Gray
  - **NE** (Not Evaluated) - Light Gray

### Species Assessment Information

- Scientific name
- Red List category
- Publication year
- Assessment ID and SIS Taxon ID
- Direct links to IUCN Red List pages
- Scope information (Global, Regional, etc.)

## API Endpoints

The backend provides these endpoints:

- `GET /api/conservation_actions` - List all conservation actions
- `GET /api/conservation_actions/{code}` - Get details for a specific action code
- `GET /api/v4/{path}` - Proxy to any IUCN API v4 endpoint

## Troubleshooting

### Common Issues

1. **"IUCN_API_TOKEN not configured" error**

   - Make sure you created the `.env` file in the backend directory
   - Verify the token is correct and not surrounded by quotes

2. **CORS errors in frontend**

   - Check that the backend is running on port 8000
   - Verify ALLOWED_ORIGINS includes your frontend URL

3. **API connection failures**

   - Run `python test_iucn_connection.py` to verify API connectivity
   - Check your internet connection
   - Verify the IUCN API token is valid

4. **Frontend build errors**
   - Make sure you're using Node.js 18+
   - Try deleting `node_modules` and running `npm install` again

### Getting Help

If you encounter issues:

1. Check the browser console for frontend errors
2. Check the backend terminal for server errors
3. Verify all environment variables are set correctly
4. Test the IUCN API connection directly

## Data Structure

The IUCN API returns conservation actions in this format:

```json
{
  "conservation_actions": [
    {
      "description": {
        "en": "Land/water protection"
      },
      "code": "1"
    }
  ]
}
```

And detailed action information includes:

```json
{
  "conservation_action": {
    "description": { "en": "Market forces" },
    "code": "6_3"
  },
  "assessments": [
    {
      "taxon_scientific_name": "Heosemys annandalii",
      "red_list_category_code": "CR",
      "year_published": "2021",
      "url": "https://www.iucnredlist.org/species/10041/495907"
    }
  ]
}
```

This structure is automatically handled by the frontend components to provide a rich, interactive experience for exploring conservation data.
