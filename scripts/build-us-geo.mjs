/**
 * Genera src/data/us-contiguous.json: la geometria de los 48 estados
 * contiguos, sin Alaska ni Hawaii, a partir de world-atlas.
 * Correr con: node scripts/build-us-geo.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { feature } from "topojson-client";

const require = createRequire(import.meta.url);
const topoPath = require.resolve("world-atlas/countries-110m.json");
const topo = JSON.parse(readFileSync(topoPath, "utf8"));

const countries = feature(topo, topo.objects.countries);
const us = countries.features.find((f) => String(f.id) === "840");
if (!us) throw new Error("No se encontro Estados Unidos (id 840) en world-atlas");

const polys =
  us.geometry.type === "MultiPolygon"
    ? us.geometry.coordinates
    : [us.geometry.coordinates];

// Descarta los anillos cuyo centroide cae fuera del bloque contiguo.
const rings = polys.filter((poly) => {
  const pts = poly?.[0];
  if (!pts?.length || !Array.isArray(pts[0])) return true;
  const lon = pts.reduce((a, p) => a + p[0], 0) / pts.length;
  const lat = pts.reduce((a, p) => a + p[1], 0) / pts.length;
  return lon > -130 && lat < 50;
});

const out = {
  type: "Feature",
  properties: { name: "United States (contiguous)" },
  geometry: { type: "MultiPolygon", coordinates: rings },
};

writeFileSync("src/data/us-contiguous.json", JSON.stringify(out));
console.log(`OK — ${rings.length} anillos, ${JSON.stringify(out).length} bytes`);
