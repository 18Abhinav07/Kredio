// scripts/fix-wasm.js
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

console.log("[fix-wasm] Starting Babel patch on @polkadot/wasm-* packages...");

// 1. The user's original exact replacement for util-crypto
const target = "`proving${'\\0'}0`";
const replacement = "`proving${'\\u0000'}0`";

function patchUtilCrypto() {
    const { execSync } = require("child_process");
    let files = [];
    try {
        const result = execSync(`find node_modules -name "bundle-polkadot-util-crypto.js"`, { encoding: "utf8" }).trim();
        files = result.split("\n").filter(Boolean);
    } catch (e) {
        console.log("[fix-wasm] find command for util-crypto failed. Skipping.");
        return;
    }
    
    for (const file of files) {
        try {
            const content = fs.readFileSync(file, "utf8");
            if (content.includes(target)) {
                fs.writeFileSync(file, content.replace(target, replacement));
                console.log(`[fix-wasm] Patched util-crypto specific bug: ${file}`);
            }
        } catch (e) {}
    }
}

patchUtilCrypto();

// 2. Comprehensive Babel template stripping for all wasm packages
const baseDir = path.join(__dirname, "..", "node_modules", "@polkadot");
const targetPackages = [
    "wasm-crypto",
    "wasm-crypto-wasm",
    "wasm-crypto-asmjs",
    "wasm-crypto-init",
    "wasm-bridge",
    "wasm-util"
];

function walk(dir, fileList = []) {
    let files;
    try { files = fs.readdirSync(dir); } catch(e) { return fileList; }
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath, fileList);
        } else if (fullPath.endsWith(".js") || fullPath.endsWith(".mjs") || fullPath.endsWith(".cjs")) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

let transformedCount = 0;

for (const pkg of targetPackages) {
    const pkgPath = path.join(baseDir, pkg);
    if (!fs.existsSync(pkgPath)) continue;
    
    const files = walk(pkgPath);
    for (const file of files) {
        const content = fs.readFileSync(file, "utf8");
        // Only run babel if the file actually contains backticks
        if (content.includes("`")) {
            try {
                const transformed = babel.transformSync(content, {
                    filename: file,
                    plugins: ["@babel/plugin-transform-template-literals"],
                    compact: false,
                    sourceType: "unambiguous"
                });
                
                if (transformed && transformed.code && transformed.code !== content) {
                    fs.writeFileSync(file, transformed.code, "utf8");
                    transformedCount++;
                }
            } catch (err) {
                console.log(`[fix-wasm] Babel error on ${file}: ${err.message}`);
            }
        }
    }
}

console.log(`[fix-wasm] Done. Transformed ${transformedCount} files via Babel to eliminate octal escapes.`);
process.exit(0);