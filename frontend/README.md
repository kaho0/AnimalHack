# OneEarth Web (Next.js + Tailwind)

## Quickstart

1. Install deps

```bash
cd frontend/web
npm install
```

2. Configure API base URL (optional)

Create `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

3. Run dev server

```bash
npm run dev
```

Open http://localhost:3000

## Notes

- Theme colors and styles live in `tailwind.config.ts` and `src/app/globals.css`.
- The IUCN proxy client is in `src/lib/iucnClient.ts`.
