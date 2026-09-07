# Deploy — EPS Logistics

## 1. Subir a Vercel

Desde la carpeta del proyecto, en tu Terminal:

```bash
cd ~/Developer/EPSLogistics
npx vercel login      # abre el navegador para autenticarte
npx vercel            # primer deploy (preview). Acepta los valores por defecto.
npx vercel --prod     # deploy a produccion
```

Vercel detecta Next.js solo: no hace falta configurar build command ni output.
El proyecto no tiene base de datos, asi que no hay nada mas que conectar.

Si prefieres el flujo por Git: crea el repo en GitHub, `git remote add origin
<url>`, `git push -u origin main`, y luego importa el repo desde
vercel.com/new. Cada push a `main` redespliega solo.

## 2. Resend (para que el formulario mande el correo)

1. Crear cuenta en [resend.com](https://resend.com).
2. **API Keys > Create API Key**, permiso *Sending access*. Copiar la key
   (`re_...`) — solo se muestra una vez.
3. En Vercel: **Settings > Environment Variables**, anadir para Production,
   Preview y Development:

   | Variable | Valor |
   |---|---|
   | `RESEND_API_KEY` | la key `re_...` |
   | `QUOTE_TO_EMAIL` | a donde llegan las cotizaciones |
   | `QUOTE_FROM_EMAIL` | `EPS Logistics <onboarding@resend.dev>` |
   | `NEXT_PUBLIC_SITE_URL` | la URL de Vercel, y luego el dominio real |

4. Redesplegar (`npx vercel --prod`) para que tome las variables.

### Importante mientras no haya dominio verificado

El remitente de pruebas `onboarding@resend.dev` **solo puede enviar al correo
de tu propia cuenta de Resend**. Cualquier otro destinatario devuelve un 403.

Asi que hasta comprar y verificar eps-logistics.com:

```
QUOTE_TO_EMAIL=<el correo con el que abriste la cuenta de Resend>
```

## 3. Dominio

El dominio ya esta conectado en Vercel:

- `eps-logistics.com` redirige (308) a `www.eps-logistics.com`
- `www.eps-logistics.com` es produccion
- `epslogistics.vercel.app` sigue apuntando a produccion

Falta verificarlo en Resend para poder enviar desde el.

1. **Resend > Domains > Add Domain**: anadir `eps-logistics.com` y crear los
   registros DNS que pida (SPF, DKIM y DMARC). Al verificarse, cambiar:

   ```
   QUOTE_FROM_EMAIL=EPS Logistics <quotes@eps-logistics.com>
   QUOTE_TO_EMAIL=info@eps-logistics.com
   NEXT_PUBLIC_SITE_URL=https://www.eps-logistics.com
   ```

3. Redesplegar y mandar una cotizacion de prueba desde el formulario.

## Comprobacion final

- El correo llega y **Responder** contesta al cliente, no a Resend
  (`replyTo` va al email de quien cotiza)
- `https://<dominio>/sitemap.xml` y `/robots.txt` responden
- El mapa de cobertura se ve en `/coverage` con JavaScript desactivado
  (se renderiza en el servidor)
