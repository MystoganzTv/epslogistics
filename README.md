# EPS Logistics

Sitio corporativo y portal interno de **EPS Logistics** — carrier de box truck
con base en Virginia, operando bajo autoridad propia (USDOT #6997514 / MC
#66625517). *Delivering Opportunities Every Mile.*

## Stack

| Pieza | Version | Nota |
|---|---|---|
| Next.js | 16 | App Router, React 19, Turbopack |
| TypeScript | 5 | `strict` |
| Tailwind CSS | v4 | tokens de marca en `src/app/globals.css` |
| Supabase | `@supabase/ssr` | auth + Postgres con RLS |
| Zod | 4 | validacion compartida del formulario |
| d3-geo | 3 | proyeccion del mapa de cobertura |

## Arranque

```bash
npm install
cp .env.example .env.local     # rellenar con las claves de Supabase
npm run dev
```

Scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `db:push`, `db:types`,
`db:geo`.

## Estructura

```
src/
  app/
    (marketing)/       sitio publico: home, services, coverage, about,
                       why-eps, contact, quote, privacy, terms
    (portal)/portal/   bandeja interna de solicitudes de cotizacion
    (auth)/login/      acceso del staff
    auth/callback|signout/
    actions/quote.ts   server action del formulario de cotizacion
    api/               (vacio)
  components/
    brand/             wordmark EPS
    layout/            header y footer
    sections/          bloques reutilizados entre paginas
    ui/                button, card, field, icon, eyebrow, map-legend
    portal/            tabla de solicitudes
    coverage-map.tsx   mapa de lanes (SSR + refinado en cliente)
    quote-form.tsx     formulario publico
  data/us-contiguous.json  geometria de los 48 estados (generada)
  lib/
    site.ts            TODO el contenido y los datos de contacto
    icons.ts           paths SVG del diseno
    quote-schema.ts    esquema Zod compartido
    supabase/          clientes browser / server / session
  proxy.ts             refresco de sesion + guard de /portal
supabase/migrations/   esquema SQL
design/                export original del canvas (.dc.html)
```

**Todo el contenido vive en `src/lib/site.ts`.** Telefono, email, servicios,
regiones, lanes del mapa y textos de marca se cambian ahi, no en las paginas.

## Marca

| Token | Hex | Uso |
|---|---|---|
| `ink` | `#0A1A2F` | texto y secciones oscuras |
| `abyss` | `#071527` | heros oscuros |
| `deep` | `#061223` | footer |
| `brand` | `#1668E3` | acento y CTAs |
| `canvas` | `#FAFBFD` | secciones claras |

Tipografia: **Archivo** (display), **Manrope** (texto), **Caveat** (la nota
manuscrita del hero). Las tres via `next/font/google`.

## Supabase

El esquema esta en `supabase/migrations/20260907000000_init.sql`:

- **`quote_requests`** — lo que envia el formulario publico. RLS permite
  `INSERT` a `anon` solo con `status = 'new'` y `source = 'website'`; leer y
  actualizar queda restringido al staff autenticado. No hay policy de `DELETE`:
  las solicitudes se archivan.
- **`profiles`** — usuarios internos. Se crea sola con un trigger sobre
  `auth.users`. El `role` no es escribible desde el cliente (el `GRANT` solo
  expone `full_name`).

Para aplicarlo:

```bash
npx supabase link --project-ref <ref>
npm run db:push
SUPABASE_PROJECT_ID=<ref> npm run db:types   # regenera src/types/database.ts
```

Luego crea el usuario del staff en Auth > Users; el trigger crea su perfil y con
eso `/portal` ya lista las solicitudes.

## Pendiente

- [ ] Crear el proyecto de Supabase y rellenar `.env.local`
- [ ] Aplicar la migracion y regenerar los tipos
- [ ] Notificacion por email al recibir una cotizacion (hoy solo se guarda)
- [ ] Rate limiting en la server action — el honeypot solo frena bots basicos
- [ ] Redactar `privacy` y `terms` de verdad; los actuales son placeholders
- [ ] Fotos: las del canvas son renders. Sustituir por fotos reales del camion
- [ ] Confirmar el telefono (`(305) 610-2811`, area de Miami) y el dominio
