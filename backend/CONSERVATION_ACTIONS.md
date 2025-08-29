# Conservation Actions API Endpoints

This document describes the conservation actions endpoints that have been added to the OneEarth IUCN Proxy.

## Endpoints

### 1. Get All Conservation Actions

**GET** `/api/conservation_actions`

Returns a list of all available conservation actions from the IUCN Red List API.

**Response:** List of conservation action objects with codes, titles, and descriptions.

**Example:**

```bash
curl http://localhost:8000/api/conservation_actions
```

### 2. Get Conservation Action by Code

**GET** `/api/conservation_actions/{code}`

Returns detailed information about a specific conservation action by its code.

**Parameters:**

- `code` (string): The conservation action code (e.g., "1.1", "2.1", etc.)

**Response:** Conservation action object with full details.

**Example:**

```bash
curl http://localhost:8000/api/conservation_actions/1.1
```

## Frontend Usage

The frontend includes a `ConservationActions` component that demonstrates how to use these endpoints:

```typescript
import { iucnClient } from "@/lib/iucnClient";

// Get all conservation actions
const actions = await iucnClient.getConservationActions();

// Get a specific conservation action
const action = await iucnClient.getConservationActionByCode("1.1");
```

## Testing

You can test the endpoints using the provided test script:

```bash
cd backend
python test_conservation_actions.py
```

Make sure the backend server is running on `http://localhost:8000` before running the test.

## IUCN API Documentation

These endpoints proxy to the IUCN Red List API v4:

- [Conservation Actions Documentation](https://apiv3.iucnredlist.org/api/v3/docs)

## Notes

- The endpoints require a valid `IUCN_API_TOKEN` to be set in the backend environment
- All responses are proxied directly from the IUCN API
- The frontend component includes error handling and loading states
- Conservation action codes follow IUCN's standardized numbering system
