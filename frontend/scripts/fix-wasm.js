// scripts/fix-wasm.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const target = "`proving${'\\0'}0`";
const replacement = "`proving${'\\u0000'}0`";

// Find all copies of the offending file
const result = execSync(
    `find node_modules/@polkadot -name "bundle-polkadot-util-crypto.js" 2>/dev/null`,
    { encoding: "utf8" }
).trim();

if (!result) {
    console.log("[fix-wasm] No bundle files found.");
    process.exit(0);
}

const files = result.split("\n").filter(Boolean);
let patchedCount = 0;

for (const file of files) {
    const content = fs.readFileSync(file, "utf8");

    if (!content.includes(target)) {
        console.log(`[fix-wasm] Already patched or not affected: ${file}`);
        continue;
    }

    fs.writeFileSync(file, content.replace(target, replacement));
    console.log(`[fix-wasm] Patched: ${file}`);
    patchedCount++;
}

console.log(`[fix-wasm] Done. ${patchedCount} file(s) patched.`);