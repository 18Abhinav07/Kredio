const fs = require("fs");
const path = require("path");

const chunksDir = path.resolve(__dirname, "../.next/static/chunks");

if (!fs.existsSync(chunksDir)) {
  console.error("[fix-chunks] .next/static/chunks not found.");
  process.exit(1);
}

const files = fs.readdirSync(chunksDir).filter(f => f.endsWith(".js"));
console.log(`[fix-chunks] Scanning ${files.length} chunks...`);

// Exact bytes confirmed from hex dump of your chunk:
// `proving\00`  =  60 70 72 6f 76 69 6e 67 5c 30 30 60
// Replace with:
// `proving\u00000`  =  60 70 72 6f 76 69 6e 67 5c 75 30 30 30 30 30 60
// \u0000 is a valid unicode escape; SWC never re-processes built output.

const TARGET      = "`proving\\00`";          // backtick + proving + \00 + backtick
const REPLACEMENT = "`proving\\u00000`";       // backtick + proving + \u0000 + 0 + backtick

let patched = 0;

for (const filename of files) {
  const filepath = path.join(chunksDir, filename);
  const content = fs.readFileSync(filepath, "latin1"); // latin1 preserves raw bytes
  if (!content.includes(TARGET)) continue;
  fs.writeFileSync(filepath, content.split(TARGET).join(REPLACEMENT), "latin1");
  console.log(`[fix-chunks] ✅ Patched: ${filename}`);
  patched++;
}

console.log(patched > 0
  ? `[fix-chunks] Done. ${patched} chunk(s) patched.`
  : "[fix-chunks] No octal pattern found — chunks are clean."
);
