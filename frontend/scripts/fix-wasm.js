// scripts/fix-wasm.js
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const TARGET      = "`proving${String.fromCharCode(0)}0`"; // catch if agent reverts
const TARGET2     = "`proving${'\\0'}0`";                  // original form
const REPLACEMENT = '"proving\\x000"';

console.log("[fix-wasm] Searching for the octal string in @scure/sr25519...");

function findJsFiles(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file === ".git" || file === "node_modules") continue;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        findJsFiles(fullPath, fileList);
      } else if (file.endsWith(".js") || file.endsWith(".ts")) {
        fileList.push(fullPath);
      }
    }
  } catch (e) {
    // Ignore permissions or missing dirs
  }
  return fileList;
}

let files = [];
const scurePath = path.join(root, "node_modules", "@scure", "sr25519");
if (fs.existsSync(scurePath)) {
  files = files.concat(findJsFiles(scurePath));
}

let patched = 0;
for (const fullPath of files) {
  let c = fs.readFileSync(fullPath, "utf8");
  if (c.includes(REPLACEMENT)) { 
    console.log(`[fix-wasm] Already clean: ${fullPath.replace(root + '/', '')}`); 
    continue; 
  }
  if (c.includes(TARGET)) {
    fs.writeFileSync(fullPath, c.replace(TARGET, REPLACEMENT));
    console.log(`[fix-wasm] ✅ Patched (fromCharCode): ${fullPath.replace(root + '/', '')}`); 
    patched++; 
    continue;
  }
  if (c.includes(TARGET2)) {
    fs.writeFileSync(fullPath, c.replace(TARGET2, REPLACEMENT));
    console.log(`[fix-wasm] ✅ Patched (original): ${fullPath.replace(root + '/', '')}`); 
    patched++;
  }
}

console.log(`[fix-wasm] Done. ${patched} file(s) patched.`);
process.exit(0);