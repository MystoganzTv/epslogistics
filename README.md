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
| Resend | 6 | envio del correo de cotizacion |
| Zod | 4 | validacion compartida del formulario |
| d3-geo | 3 | proyeccion del mapa de cobertura |

## Arranque

```bash
npm install
cp .env.example .env.local     # rellenar con las claves de Supabase
npm run dev
```

Scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `db:geo`.

Sin `RESEND_API_KEY` el sitio funciona: el formulario valida y muestra el
mensaje de error de envio. Solo el correo queda sin salir.

## Estructura

```
src/
  app/
    (marketing)/       home, services, coverage, about, why-eps,
                       contact, quote, privacy, terms
    actions/quote.ts   server action del formulario
    sitemap.ts, robots.ts
  components/
    brand/             wordmark EPS
    layout/            header y footer
    sections/          bloques reutilizados entre paginas
    ui/                button, card, field, icon, eyebrow, map-legend
    coverage-map.tsx   mapa de lanes (SSR + refinado en cliente)
    quote-form.tsx     formulario publico
  data/us-contiguous.json  geometria de los 48 estados (generada)
  lib/
    site.ts            TODO el contenido y los datos de contacto
    icons.ts           paths SVG del diseno
    quote-schema.ts    esquema Zod compartido
    email.ts           render y envio del correo de cotizacion
docs/                  esquema SQL sin usar, para cuando haga falta una BD
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

## El formulario de cotizacion

No hay base de datos. El formulario valida con Zod en el servidor y manda un
correo con Resend a `QUOTE_TO_EMAIL`, con `replyTo` puesto al email de quien
cotiza — responder en Gmail contesta directo al cliente. La bandeja de entrada
es el sistema de registro.

Para activarlo:

1. Crear cuenta en [resend.com](https://resend.com) y generar una API key.
2. Ponerla en `RESEND_API_KEY` (local en `.env.local`, en produccion en las
   variables de entorno de Vercel).
3. Mientras el dominio no este verificado, dejar `QUOTE_FROM_EMAIL` con
   `onboarding@resend.dev`. Ese remitente de pruebas **solo puede enviar al
   correo de la propia cuenta de Resend** — para que llegue a
   `info@eps-logistics.com` hay que verificar el dominio en Resend > Domains y
   cambiar el remitente a algo como `quotes@eps-logistics.com`.

El render del correo esta separado del envio (`renderQuoteEmail`), asi que se
puede previsualizar sin mandar nada.

Cuando el volumen justifique guardar historial, `docs/quote-requests-schema.sql`
tiene el esquema Postgres con RLS ya pensado.

## Pendiente

- [ ] Cuenta de Resend + `RESEND_API_KEY` en Vercel
- [ ] Verificar eps-logistics.com en Resend y cambiar el remitente
- [ ] Rate limiting en la server action — el honeypot solo frena bots basicos
- [ ] Redactar `privacy` y `terms` de verdad; los actuales son placeholders
- [ ] Fotos: las del canvas son renders. Sustituir por fotos reales del camion
- [ ] Confirmar el telefono (`(305) 610-2811`, area de Miami) y el dominio
