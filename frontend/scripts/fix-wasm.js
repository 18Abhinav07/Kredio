// scripts/fix-wasm.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const target = "`proving${'\\0'}0`";
const replacement = "`proving${'\\u0000'}0`";

console.log("[fix-wasm] Searching for all copies of bundle-polkadot-util-crypto.js...");

let files = [];
try {
    const result = execSync(
        `find node_modules/@polkadot -name "bundle-polkadot-util-crypto.js"`,
        { encoding: "utf8" }
    ).trim();
    files = result.split("\n").filter(Boolean);
} catch (e) {
    console.log("[fix-wasm] find command failed or no files found. Skipping.");
    process.exit(0); // Always exit 0 — never block npm install
}

console.log(`[fix-wasm] Found ${files.length} file(s).`);

let patchedCount = 0;

for (const file of files) {
    try {
        const content = fs.readFileSync(file, "utf8");

        if (!content.includes(target)) {
            console.log(`[fix-wasm] Already patched: ${file}`);
            continue;
        }

        fs.writeFileSync(file, content.replace(target, replacement));
        console.log(`[fix-wasm] Patched: ${file}`);
        patchedCount++;
    } catch (e) {
        console.log(`[fix-wasm] Error processing ${file}: ${e.message}`);
        // Continue — never throw
    }
}

console.log(`[fix-wasm] Done. ${patchedCount} file(s) patched.`);
process.exit(0); // Always exit 0