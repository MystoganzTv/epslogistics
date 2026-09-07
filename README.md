# EPS Logistics

Sitio corporativo + portal de clientes. *Delivering Opportunities Every Mile.*

## Stack

- **Next.js 16** (App Router, TypeScript, React 19)
- **Tailwind CSS v4** con tokens de marca en `src/app/globals.css`
- **Supabase** (`@supabase/ssr`) para auth y datos
- **lucide-react** para iconos

## Arranque

```bash
npm install
cp .env.example .env.local   # rellenar con las claves de Supabase
npm run dev
```

## Estructura

```
src/
  app/
    (marketing)/        Sitio publico — home, services, coverage, about, contact
    (portal)/portal/    Area de clientes (protegida por middleware)
    (auth)/login/       Login
    auth/callback/      Intercambio de codigo OAuth/magic link
    auth/signout/       Cierre de sesion (POST)
  components/
    brand/              Logo
    layout/             Header y footer del sitio publico
    ui/                 Button, Card, Container
  lib/
    supabase/           Clientes browser / server / middleware
    site.ts             Nav, copy y datos de contacto en un solo lugar
  types/database.ts     Tipos generados de Supabase (regenerar con la CLI)
  middleware.ts         Refresco de sesion + proteccion de /portal
```

## Marca

| Token | Valor | Uso |
|---|---|---|
| `navy-900` | `#021E56` | Texto, superficies oscuras |
| `electric-500` | `#0061FE` | Acento, CTAs, enlaces |

Logo en `public/eps-logistics-logo.png` (PNG transparente).

## Pendiente

- Crear tablas en Supabase (`shipments`, `quote_requests`, `profiles`) + RLS
- Regenerar `src/types/database.ts` con `npx supabase gen types typescript`
- Conectar el formulario de cotizacion a Supabase o a un endpoint
- Rellenar `src/lib/site.ts` con telefono, email, direccion y MC/DOT reales
- Sustituir el copy placeholder de services / coverage / about
