import { build } from "esbuild";

await build({
    entryPoints: ["index.js"],
    bundle: true,
    platform: "node",
    format: "cjs",
    outfile: "dist/index.cjs",
    external: [],
});

console.log("CJS build complete → dist/index.cjs");