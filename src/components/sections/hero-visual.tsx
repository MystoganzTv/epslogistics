import { HUBS } from "@/lib/site";

/**
 * Panel del hero: las lanes reales que corre EPS, dibujadas como un ramal que
 * sale de Virginia. Responde la primera pregunta de cualquier shipper —
 * "corres mi lane?" — y sale de los mismos datos que alimentan el mapa.
 */
export function HeroVisual() {
  return (
    <div className="animate-eps-in relative overflow-hidden rounded-[20px] border border-white/12 bg-abyss shadow-[0_30px_70px_rgba(0,0,0,0.42)]">
      {/* Textura: la inclinacion del simbolo, muy atenuada. */}
      <svg
        viewBox="0 0 600 520"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="hero-glow" cx="78%" cy="12%" r="72%">
            <stop offset="0%" stopColor="#2c7bf2" stopOpacity={0.3} />
            <stop offset="60%" stopColor="#1e63d6" stopOpacity={0.07} />
            <stop offset="100%" stopColor="#071527" stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width="600" height="520" fill="#071527" />
        {[-40, 90, 220, 350, 480].map((y) => (
          <polygon
            key={y}
            points={`-140,${y + 152} 740,${y - 152} 740,${y - 124} -140,${y + 180}`}
            fill="#12365f"
            opacity={0.35}
          />
        ))}
        <rect width="600" height="520" fill="url(#hero-glow)" />
      </svg>

      <div className="relative px-7 pb-6 pt-7">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-bright opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-brand-bright" />
            </span>
            <span className="font-display text-[11.5px] font-bold uppercase tracking-[0.18em] text-white">
              Virginia
            </span>
            <span className="font-display text-[11.5px] font-bold uppercase tracking-[0.18em] text-onDark-soft">
              — home base
            </span>
          </div>
          <span className="rounded-full border border-white/20 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-[#cfddef]">
            Both ways
          </span>
        </div>

        <ul className="relative mt-5">
          {/* Espina del ramal. */}
          <span
            aria-hidden
            className="absolute bottom-4 left-[5px] top-0 w-px bg-gradient-to-b from-brand-bright/70 to-brand-bright/10"
          />
          {HUBS.map((hub) => {
            const [city, state] = hub.name.split(", ");
            const core = hub.tier === 1;
            return (
              <li
                key={hub.name}
                className="relative flex items-center gap-3 py-[7px] pl-6"
              >
                <span
                  aria-hidden
                  className={`absolute left-0 size-[11px] rounded-full border-2 ${
                    core
                      ? "border-brand-bright bg-abyss"
                      : "border-brand-soft/50 bg-abyss"
                  }`}
                />
                <span
                  className={`text-[15px] font-semibold ${core ? "text-white" : "text-onDark-strong"}`}
                >
                  {city}
                </span>
                <span className="font-display text-xs font-bold tracking-[0.1em] text-onDark-soft">
                  {state}
                </span>
                <span
                  className={`ml-auto font-display text-[10px] font-bold uppercase tracking-[0.14em] ${
                    core ? "text-brand-soft" : "text-onDark-soft"
                  }`}
                >
                  {core ? "Core" : "Extended"}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
          <div>
            <p className="font-script text-[27px] font-semibold leading-[1.05] text-white">
              More Than Freight
              <br />— Progress.
            </p>
            <svg
              width="112"
              height="12"
              viewBox="0 0 150 16"
              fill="none"
              className="mt-0.5 block"
              aria-hidden
            >
              <path
                d="M4 11C40 3 100 3 146 8"
                stroke="#3B8BFF"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="max-w-[150px] text-right text-[12.5px] leading-[1.45] text-onDark-soft">
            Outbound and inbound. We quote both directions.
          </p>
        </div>
      </div>
    </div>
  );
}
