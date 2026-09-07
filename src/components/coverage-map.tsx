"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";
import type { Feature, MultiPolygon } from "geojson";
import usContiguous from "@/data/us-contiguous.json";
import { HUBS, VIRGINIA } from "@/lib/site";

const US = usContiguous as Feature<MultiPolygon>;

type Point = [number, number];

const DEFAULT_WIDTH = 640;

/** Punto y tangente de una curva cuadratica en t, sin tocar el DOM. */
function quadAt(p0: Point, c: Point, p1: Point, t: number) {
  const u = 1 - t;
  const x = u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0];
  const y = u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1];
  const dx = 2 * u * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0]);
  const dy = 2 * u * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

/** Longitud aproximada por muestreo — suficiente para el stroke-dasharray. */
function quadLength(p0: Point, c: Point, p1: Point, steps = 24) {
  let len = 0;
  let prev = quadAt(p0, c, p1, 0);
  for (let i = 1; i <= steps; i++) {
    const cur = quadAt(p0, c, p1, i / steps);
    len += Math.hypot(cur.x - prev.x, cur.y - prev.y);
    prev = cur;
  }
  return len;
}

export function CoverageMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Ancho de arranque: permite renderizar el mapa en el servidor. El
  // ResizeObserver lo corrige al hidratar; el viewBox escala, asi que el
  // ajuste no produce salto visible.
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const next = Math.round(entry.contentRect.width);
      if (next > 0) setWidth(next);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const w = Math.max(300, width);
  const h = Math.max(300, Math.round(w * 0.6));

  const model = useMemo(() => {
    const projection = geoAlbersUsa().fitExtent(
      [
        [16, 14],
        [w - 16, h - 14],
      ],
      US,
    );
    const outline = geoPath(projection)(US) ?? "";
    const va = (projection(VIRGINIA) ?? [w * 0.72, h * 0.42]) as Point;

    const lanes = HUBS.map((hub) => {
      const p = projection(hub.coords) as Point | null;
      if (!p) return null;
      const bow =
        Math.abs(p[0] - va[0]) * 0.1 + Math.abs(p[1] - va[1]) * 0.06;
      const c: Point = [
        (va[0] + p[0]) / 2,
        (va[1] + p[1]) / 2 + (p[1] > va[1] ? bow : -bow),
      ];
      // Toda lane lleva dos cabezas opuestas: la carga sale y vuelve.
      const arrowSize =
        Math.max(2.6, w * 0.006) * (hub.tier === 1 ? 1 : 0.85);
      // Separacion fija en pixeles desde el centro, no en t: si no, en las
      // lanes cortas las dos cabezas se montan una encima de la otra.
      const len = quadLength(va, c, p);
      const spread = Math.min(0.22, Math.max(0.07, 22 / Math.max(len, 1)));
      const arrows = [0.5 + spread, 0.5 - spread].map((t, i) => {
        const a = quadAt(va, c, p, t);
        return {
          d: `M${-arrowSize},${-arrowSize * 0.7} L${arrowSize * 0.9},0 L${-arrowSize},${arrowSize * 0.7} Z`,
          transform: `translate(${a.x},${a.y}) rotate(${i === 0 ? a.angle : a.angle + 180})`,
        };
      });

      return {
        name: hub.name,
        tier: hub.tier,
        point: p,
        d: `M${va[0]},${va[1]} Q${c[0]},${c[1]} ${p[0]},${p[1]}`,
        length: len,
        arrows,
      };
    }).filter((l): l is NonNullable<typeof l> => l !== null);

    const fontSize = Math.max(11, Math.min(16, w * 0.026));
    const flip = va[0] + 13 + fontSize * 0.68 * 8 > w - 8;

    return { outline, va, lanes, fontSize, flip };
  }, [w, h]);

  return (
    <div ref={ref} className={className}>
      <svg
          width="100%"
          viewBox={`0 0 ${w} ${h}`}
          className="block"
          role="img"
          aria-label="Map of EPS Logistics two-way freight lanes between Virginia and the East Coast, Southeast, Great Lakes, Midwest and Southern United States"
        >
          <defs>
            <radialGradient
              id="eps-glow"
              gradientUnits="userSpaceOnUse"
              cx={model.va[0]}
              cy={model.va[1]}
              r={w * 0.42}
            >
              <stop offset="0%" stopColor="#2C7BF2" stopOpacity={0.5} />
              <stop offset="42%" stopColor="#1E63D6" stopOpacity={0.22} />
              <stop offset="78%" stopColor="#1E63D6" stopOpacity={0.06} />
              <stop offset="100%" stopColor="#1E63D6" stopOpacity={0} />
            </radialGradient>
            <clipPath id="eps-clip">
              <path d={model.outline} />
            </clipPath>
          </defs>

          <path d={model.outline} fill="#1A3554" />
          <rect
            width={w}
            height={h}
            fill="url(#eps-glow)"
            clipPath="url(#eps-clip)"
          />
          <path
            d={model.outline}
            fill="none"
            stroke="#6C9AD0"
            strokeWidth={1.2}
            strokeOpacity={0.75}
          />

          <g fill="none" strokeLinecap="round">
            {model.lanes.map((lane, i) => (
              <path
                key={lane.name}
                d={lane.d}
                stroke={lane.tier === 2 ? "#8FBAF0" : "#D5E6FF"}
                strokeWidth={lane.tier === 2 ? 0.9 : 1.25}
                strokeOpacity={lane.tier === 2 ? 0.4 : 0.62}
                strokeDasharray={lane.length}
                strokeDashoffset={lane.length}
                style={{
                  animation: `eps-dash 1.1s ease ${0.12 + i * 0.045}s forwards`,
                }}
              />
            ))}
            {model.lanes.flatMap((lane, i) =>
              lane.arrows.map((arrow, j) => (
                <path
                  key={`${lane.name}-${j}`}
                  d={arrow.d}
                  transform={arrow.transform}
                  fill="#EAF3FF"
                  fillOpacity={lane.tier === 2 ? 0.6 : 0.85}
                  stroke="none"
                  style={{
                    opacity: 0,
                    animation: `eps-in .4s ease ${0.85 + i * 0.045}s forwards`,
                  }}
                />
              )),
            )}
          </g>

          <g>
            {model.lanes.map((lane) => (
              <circle
                key={lane.name}
                cx={lane.point[0]}
                cy={lane.point[1]}
                r={lane.tier === 2 ? 2.8 : 3.4}
                fill="#fff"
                fillOpacity={lane.tier === 2 ? 0.72 : 1}
              />
            ))}
          </g>

          <g>
            <circle
              cx={model.va[0]}
              cy={model.va[1]}
              r={5}
              fill="none"
              stroke="#66A6FF"
              strokeWidth={1.5}
              style={{ animation: "eps-pulse 2.4s ease-out infinite" }}
            />
            <circle
              cx={model.va[0]}
              cy={model.va[1]}
              r={6}
              fill="#fff"
              stroke="#1668E3"
              strokeWidth={2.5}
            />
            <text
              x={model.flip ? model.va[0] - 13 : model.va[0] + 13}
              y={model.flip ? model.va[1] + 20 : model.va[1] + 5}
              textAnchor={model.flip ? "end" : "start"}
              fontFamily="var(--font-display)"
              fontSize={model.fontSize}
              fontWeight={800}
              letterSpacing="0.06em"
              fill="#fff"
              paintOrder="stroke"
              stroke="#0B1E33"
              strokeWidth={3}
              strokeOpacity={0.65}
            >
              VIRGINIA
            </text>
          </g>
      </svg>
    </div>
  );
}
