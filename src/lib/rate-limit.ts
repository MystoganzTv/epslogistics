/**
 * Ventana deslizante en memoria.
 *
 * LIMITACION CONOCIDA: en serverless cada instancia tiene su propia memoria,
 * asi que un atacante repartido entre instancias supera el limite. Frena el
 * caso real —un bot o una persona machacando el boton— sin anadir Redis ni
 * KV a un sitio que no tiene base de datos. Si algun dia llega spam en serio,
 * el reemplazo natural es Vercel Firewall o Upstash.
 */
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const MAX_KEYS = 5_000;

const hits = new Map<string, number[]>();

export function allowRequest(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  // Barrido perezoso: sin esto el Map crece sin limite en una instancia larga.
  if (hits.size > MAX_KEYS) {
    for (const [k, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    }
  }

  return true;
}

/** Primera IP de x-forwarded-for; Vercel la pone siempre. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
