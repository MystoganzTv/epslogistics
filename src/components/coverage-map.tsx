"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";
import type { Feature, MultiPolygon } from "geojson";
import usContiguous from "@/data/us-contiguous.json";
import { HUBS, VIRGINIA } from "@/lib/site";

const US = usContiguous as Feature<MultiPolygon>;

type Point = [number, number];

const DEFAULT_WIDTH = 640;
/** Separacion minima entre etiquetas del mismo lado, en unidades del viewBox. */
const LABEL_GAP = 15;

/** Punto de una curva cuadratica en t, sin tocar el DOM. */
function quadAt(p0: Point, c: Point, p1: Point, t: number): Point {
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0],
    u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1],
  ];
}

/** Longitud aproximada por muestreo — suficiente para el stroke-dasharray. */
function quadLength(p0: Point, c: Point, p1: Point, steps = 24) {
  let len = 0;
  let prev = p0;
  for (let i = 1; i <= steps; i++) {
    const cur = quadAt(p0, c, p1, i / steps);
    len += Math.hypot(cur[0] - prev[0], cur[1] - prev[1]);
    prev = cur;
  }
  return len;
}

/**
 * Empuja las etiquetas hacia abajo hasta que ninguna se solape con la
 * anterior. Se procesan de arriba a abajo y por lados independientes.
 */
function declutter(items: { y: number }[]) {
  const sorted = [...items].sort((a, b) => a.y - b.y);
  for (let i = 1; i < sorted.length; i++) {
    const gap = sorted[i].y - sorted[i - 1].y;
    if (gap < LABEL_GAP) sorted[i].y = sorted[i - 1].y + LABEL_GAP;
  }
}

export function CoverageMap({
  className,
  labels = true,
}: {
  className?: string;
  /** En espacios pequenos las etiquetas aprietan: mejor el mapa limpio. */
  labels?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
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
  /** Debajo de este ancho las etiquetas no caben: se muestran solo las core. */
  const dense = w >= 620;
  const showLabels = labels;

  const model = useMemo(() => {
    const projection = geoAlbersUsa().fitExtent(
      [
        [6, 8],
        [w - 6, h - 8],
      ],
      US,
    );
    const outline = geoPath(projection)(US) ?? "";
    const va = (projection(VIRGINIA) ?? [w * 0.72, h * 0.42]) as Point;

    const lanes = HUBS.map((hub) => {
      const p = projection(hub.coords) as Point | null;
      if (!p) return null;
      const bow = Math.abs(p[0] - va[0]) * 0.1 + Math.abs(p[1] - va[1]) * 0.06;
      const c: Point = [
        (va[0] + p[0]) / 2,
        (va[1] + p[1]) / 2 + (p[1] > va[1] ? bow : -bow),
      ];
      return {
        name: hub.name,
        city: hub.name.split(",")[0],
        tier: hub.tier,
        point: p,
        d: `M${va[0]},${va[1]} Q${c[0]},${c[1]} ${p[0]},${p[1]}`,
        length: quadLength(va, c, p),
      };
    }).filter((l): l is NonNullable<typeof l> => l !== null);

    // Las etiquetas salen hacia fuera: a la izquierda si el destino esta al
    // oeste de Virginia, a la derecha si esta al este.
    const cityLabels = lanes
      .filter(() => showLabels)
      .filter((l) => dense || l.tier === 1)
      .map((l) => ({
        city: l.city,
        tier: l.tier,
        left: l.point[0] < va[0],
        x: l.point[0] + (l.point[0] < va[0] ? -8 : 8),
        y: l.point[1] + 3.5,
      }));

    declutter(cityLabels.filter((l) => l.left));
    declutter(cityLabels.filter((l) => !l.left));

    const fontSize = Math.max(11, Math.min(16, w * 0.026));
    const flip = va[0] + 13 + fontSize * 0.68 * 8 > w - 8;

    return { outline, va, lanes, labels: cityLabels, fontSize, flip };
  }, [w, h, dense, showLabels]);

  const labelSize = Math.max(8.5, Math.min(11.5, w * 0.0165));

  return (
    <div ref={ref} className={className}>
      <svg
        width="100%"
        viewBox={`0 0 ${w} ${h}`}
        className="block"
        role="img"
        aria-label="Map of EPS Logistics freight lanes. Every lane runs in both directions between Virginia and the East Coast, Southeast, Great Lakes, Midwest and Southern United States."
      >
        <defs>
          <radialGradient
            id="eps-glow"
            gradientUnits="userSpaceOnUse"
            cx={model.va[0]}
            cy={model.va[1]}
            r={w * 0.42}
          >
            <stop offset="0%" stopColor="#2C7BF2" stopOpacity={0.42} />
            <stop offset="42%" stopColor="#1E63D6" stopOpacity={0.18} />
            <stop offset="78%" stopColor="#1E63D6" stopOpacity={0.05} />
            <stop offset="100%" stopColor="#1E63D6" stopOpacity={0} />
          </radialGradient>
          <clipPath id="eps-clip">
            <path d={model.outline} />
          </clipPath>
        </defs>

        <rect width={w} height={h} fill="#071527" />
        <path d={model.outline} fill="#16304f" />
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
          strokeWidth={1.1}
          strokeOpacity={0.6}
        />

        {/* Lanes. La direccion la cuenta la leyenda, no 36 flechas. */}
        <g fill="none" strokeLinecap="round">
          {model.lanes.map((lane, i) => (
            <path
              key={lane.name}
              d={lane.d}
              stroke={lane.tier === 1 ? "#CFE2FF" : "#7FAEEA"}
              strokeWidth={lane.tier === 1 ? 1.2 : 0.9}
              strokeOpacity={lane.tier === 1 ? 0.75 : 0.5}
              strokeDasharray={lane.length}
              strokeDashoffset={lane.length}
              style={{
                animation: `eps-dash 1s ease ${0.1 + i * 0.04}s forwards`,
              }}
            />
          ))}
        </g>

        <g>
          {model.lanes.map((lane) => (
            <circle
              key={lane.name}
              cx={lane.point[0]}
              cy={lane.point[1]}
              r={lane.tier === 1 ? 3.2 : 2.6}
              fill={lane.tier === 1 ? "#fff" : "#BFD8F7"}
            />
          ))}
        </g>

        <g fontFamily="var(--font-display)" fontWeight={600}>
          {model.labels.map((l) => (
            <text
              key={l.city}
              x={l.x}
              y={l.y}
              textAnchor={l.left ? "end" : "start"}
              fontSize={labelSize}
              letterSpacing="0.02em"
              fill={l.tier === 1 ? "#F1F7FF" : "#B9D2F2"}
              paintOrder="stroke"
              stroke="#0B1E33"
              strokeWidth={2.6}
              strokeOpacity={0.7}
            >
              {l.city}
            </text>
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
