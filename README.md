# Kapsa

Soukromá aplikace na sledování financí.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- [Supabase](https://supabase.com) (auth + Postgres)

## Vývoj

```bash
npm install
cp .env.local.example .env.local   # doplnit Supabase klíče
npm run dev
```

Aplikace poběží na [http://localhost:3000](http://localhost:3000).

## Supabase

Klienti jsou připravení v `src/lib/supabase/`:

- `client.ts` — browser klient (Client Components)
- `server.ts` — server klient (Server Components, Route Handlers)
- `middleware.ts` — obnova session, napojeno v `src/middleware.ts`

Potřeba nastavit `NEXT_PUBLIC_SUPABASE_URL` a `NEXT_PUBLIC_SUPABASE_ANON_KEY` v `.env.local`.
