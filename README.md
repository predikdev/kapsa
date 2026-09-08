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

- `client.ts` — browser klient (Client Components), publishable klíč
- `server.ts` — server klient (Server Components, Route Handlers), publishable klíč
- `middleware.ts` — obnova session, napojeno v `src/proxy.ts`
- `admin.ts` — server-only klient se service_role klíčem, obchází RLS; dokud appka nemá přihlašování, čte se přes něj `transactions` na hlavní stránce

Proměnné v `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — tajný klíč z Project Settings → API, **bez** `NEXT_PUBLIC_` prefixu (nesmí jít do prohlížeče)

### Schéma

Migrace jsou v `supabase/migrations/`. Dokud není napojené CLI (`supabase link`), spusť SQL ručně v Supabase Dashboardu → SQL Editor.
