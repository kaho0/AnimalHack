# OneEarth IUCN Proxy (FastAPI)

## Setup

1. Create env file:

```bash
cd backend
copy .env.example .env # Windows
# then edit .env to set IUCN_API_TOKEN
```

2. Create and activate a virtual environment (recommended) and install deps:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.local.txt
```

3. Run the server:

```bash
python main.py
# or
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Usage

Your frontend calls the proxy instead of the IUCN host.

Examples:

- Get assessment by id:
  - `GET http://localhost:8000/api/assessment/266696959`
- Get taxa by scientific name:
  - `GET http://localhost:8000/api/v4/taxa/scientific_name?genus_name=Panthera&species_name=leo`
- Generic pass-through:
  - `GET http://localhost:8000/api/v4/assessment/2`

The proxy sets the `Authorization` header from `IUCN_API_TOKEN` so you never expose it in the browser.
