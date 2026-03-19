module.exports = [
"[externals]/@polkadot/api [external] (@polkadot/api, esm_import, [project]/node_modules/@polkadot/api)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@polkadot/api-ad58ff55a10b625e");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@polkadot/api [external] (@polkadot/api, cjs, [project]/node_modules/@snowbridge/api/node_modules/@polkadot/api)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@polkadot/api-74b4573c9c168046", () => require("@polkadot/api-74b4573c9c168046"));

module.exports = mod;
}),
"[project]/node_modules/@paraspell/sdk-core/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Utilities for hex, bytes, CSPRNG.
 * @module
 */ /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ /** Checks if something is Uint8Array. Be careful: nodejs Buffer will return true. */ __turbopack_context__.s([
    "abytes",
    ()=>abytes,
    "aexists",
    ()=>aexists,
    "ahash",
    ()=>ahash,
    "anumber",
    ()=>anumber,
    "aoutput",
    ()=>aoutput,
    "asyncLoop",
    ()=>asyncLoop,
    "byteSwap",
    ()=>byteSwap,
    "byteSwap32",
    ()=>byteSwap32,
    "bytesToHex",
    ()=>bytesToHex,
    "checkOpts",
    ()=>checkOpts,
    "clean",
    ()=>clean,
    "concatBytes",
    ()=>concatBytes,
    "createHasher",
    ()=>createHasher,
    "createView",
    ()=>createView,
    "hexToBytes",
    ()=>hexToBytes,
    "isBytes",
    ()=>isBytes,
    "isLE",
    ()=>isLE,
    "kdfInputToBytes",
    ()=>kdfInputToBytes,
    "nextTick",
    ()=>nextTick,
    "oidNist",
    ()=>oidNist,
    "randomBytes",
    ()=>randomBytes,
    "rotl",
    ()=>rotl,
    "rotr",
    ()=>rotr,
    "swap32IfBE",
    ()=>swap32IfBE,
    "swap8IfBE",
    ()=>swap8IfBE,
    "u32",
    ()=>u32,
    "u8",
    ()=>u8,
    "utf8ToBytes",
    ()=>utf8ToBytes
]);
function isBytes(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array';
}
function anumber(n, title = '') {
    if (!Number.isSafeInteger(n) || n < 0) {
        const prefix = title && `"${title}" `;
        throw new Error(`${prefix}expected integer >= 0, got ${n}`);
    }
}
function abytes(value, length, title = '') {
    const bytes = isBytes(value);
    const len = value?.length;
    const needsLen = length !== undefined;
    if (!bytes || needsLen && len !== length) {
        const prefix = title && `"${title}" `;
        const ofLen = needsLen ? ` of length ${length}` : '';
        const got = bytes ? `length=${len}` : `type=${typeof value}`;
        throw new Error(prefix + 'expected Uint8Array' + ofLen + ', got ' + got);
    }
    return value;
}
function ahash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function') throw new Error('Hash must wrapped by utils.createHasher');
    anumber(h.outputLen);
    anumber(h.blockLen);
}
function aexists(instance, checkFinished = true) {
    if (instance.destroyed) throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
function aoutput(out, instance) {
    abytes(out, undefined, 'digestInto() output');
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error('"digestInto() output" expected to be of length >=' + min);
    }
}
function u8(arr) {
    return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
}
function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
    for(let i = 0; i < arrays.length; i++){
        arrays[i].fill(0);
    }
}
function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
    return word << 32 - shift | word >>> shift;
}
function rotl(word, shift) {
    return word << shift | word >>> 32 - shift >>> 0;
}
const isLE = /* @__PURE__ */ (()=>new Uint8Array(new Uint32Array([
        0x11223344
    ]).buffer)[0] === 0x44)();
function byteSwap(word) {
    return word << 24 & 0xff000000 | word << 8 & 0xff0000 | word >>> 8 & 0xff00 | word >>> 24 & 0xff;
}
const swap8IfBE = isLE ? (n)=>n : (n)=>byteSwap(n);
function byteSwap32(arr) {
    for(let i = 0; i < arr.length; i++){
        arr[i] = byteSwap(arr[i]);
    }
    return arr;
}
const swap32IfBE = isLE ? (u)=>u : byteSwap32;
// Built-in hex conversion https://caniuse.com/mdn-javascript_builtins_uint8array_fromhex
const hasHexBuiltin = /* @__PURE__ */ (()=>// @ts-ignore
    typeof Uint8Array.from([]).toHex === 'function' && typeof Uint8Array.fromHex === 'function')();
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
function bytesToHex(bytes) {
    abytes(bytes);
    // @ts-ignore
    if (hasHexBuiltin) return bytes.toHex();
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        hex += hexes[bytes[i]];
    }
    return hex;
}
// We use optimized technique to convert hex string to byte array
const asciis = {
    _0: 48,
    _9: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function asciiToBase16(ch) {
    if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0; // '2' => 50-48
    if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10); // 'B' => 66-(65-10)
    if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10); // 'b' => 98-(97-10)
    return;
}
function hexToBytes(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    // @ts-ignore
    if (hasHexBuiltin) return Uint8Array.fromHex(hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2) throw new Error('hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for(let ai = 0, hi = 0; ai < al; ai++, hi += 2){
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2; // multiply first octet, e.g. 'a3' => 10*16+3 => 160 + 3 => 163
    }
    return array;
}
const nextTick = async ()=>{};
async function asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for(let i = 0; i < iters; i++){
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick) continue;
        await nextTick();
        ts += diff;
    }
}
function utf8ToBytes(str) {
    if (typeof str !== 'string') throw new Error('string expected');
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
function kdfInputToBytes(data, errorTitle = '') {
    if (typeof data === 'string') return utf8ToBytes(data);
    return abytes(data, undefined, errorTitle);
}
function concatBytes(...arrays) {
    let sum = 0;
    for(let i = 0; i < arrays.length; i++){
        const a = arrays[i];
        abytes(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for(let i = 0, pad = 0; i < arrays.length; i++){
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
function checkOpts(defaults, opts) {
    if (opts !== undefined && ({}).toString.call(opts) !== '[object Object]') throw new Error('options must be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
function createHasher(hashCons, info = {}) {
    const hashC = (msg, opts)=>hashCons(opts).update(msg).digest();
    const tmp = hashCons(undefined);
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    Object.assign(hashC, info);
    return Object.freeze(hashC);
}
function randomBytes(bytesLength = 32) {
    const cr = typeof globalThis === 'object' ? globalThis.crypto : null;
    if (typeof cr?.getRandomValues !== 'function') throw new Error('crypto.getRandomValues must be defined');
    return cr.getRandomValues(new Uint8Array(bytesLength));
}
const oidNist = (suffix)=>({
        oid: Uint8Array.from([
            0x06,
            0x09,
            0x60,
            0x86,
            0x48,
            0x01,
            0x65,
            0x03,
            0x04,
            0x02,
            suffix
        ])
    }); //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/@paraspell/sdk-core/node_modules/@noble/hashes/_blake.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BSIGMA",
    ()=>BSIGMA,
    "G1s",
    ()=>G1s,
    "G2s",
    ()=>G2s
]);
/**
 * Internal helpers for blake hash.
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paraspell/sdk-core/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)");
;
const BSIGMA = /* @__PURE__ */ Uint8Array.from([
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    14,
    10,
    4,
    8,
    9,
    15,
    13,
    6,
    1,
    12,
    0,
    2,
    11,
    7,
    5,
    3,
    11,
    8,
    12,
    0,
    5,
    2,
    15,
    13,
    10,
    14,
    3,
    6,
    7,
    1,
    9,
    4,
    7,
    9,
    3,
    1,
    13,
    12,
    11,
    14,
    2,
    6,
    5,
    10,
    4,
    0,
    15,
    8,
    9,
    0,
    5,
    7,
    2,
    4,
    10,
    15,
    14,
    1,
    11,
    12,
    6,
    8,
    3,
    13,
    2,
    12,
    6,
    10,
    0,
    11,
    8,
    3,
    4,
    13,
    7,
    5,
    15,
    14,
    1,
    9,
    12,
    5,
    1,
    15,
    14,
    13,
    4,
    10,
    0,
    7,
    6,
    3,
    9,
    2,
    8,
    11,
    13,
    11,
    7,
    14,
    12,
    1,
    3,
    9,
    5,
    0,
    15,
    4,
    8,
    6,
    2,
    10,
    6,
    15,
    14,
    9,
    11,
    3,
    0,
    8,
    12,
    2,
    13,
    7,
    1,
    4,
    10,
    5,
    10,
    2,
    8,
    4,
    7,
    6,
    1,
    5,
    15,
    11,
    9,
    14,
    3,
    12,
    13,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    14,
    10,
    4,
    8,
    9,
    15,
    13,
    6,
    1,
    12,
    0,
    2,
    11,
    7,
    5,
    3,
    // Blake1, unused in others
    11,
    8,
    12,
    0,
    5,
    2,
    15,
    13,
    10,
    14,
    3,
    6,
    7,
    1,
    9,
    4,
    7,
    9,
    3,
    1,
    13,
    12,
    11,
    14,
    2,
    6,
    5,
    10,
    4,
    0,
    15,
    8,
    9,
    0,
    5,
    7,
    2,
    4,
    10,
    15,
    14,
    1,
    11,
    12,
    6,
    8,
    3,
    13,
    2,
    12,
    6,
    10,
    0,
    11,
    8,
    3,
    4,
    13,
    7,
    5,
    15,
    14,
    1,
    9
]);
function G1s(a, b, c, d, x) {
    a = a + b + x | 0;
    d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotr"])(d ^ a, 16);
    c = c + d | 0;
    b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotr"])(b ^ c, 12);
    return {
        a,
        b,
        c,
        d
    };
}
function G2s(a, b, c, d, x) {
    a = a + b + x | 0;
    d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotr"])(d ^ a, 8);
    c = c + d | 0;
    b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotr"])(b ^ c, 7);
    return {
        a,
        b,
        c,
        d
    };
} //# sourceMappingURL=_blake.js.map
}),
"[project]/node_modules/@paraspell/sdk-core/node_modules/@noble/hashes/_md.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Chi",
    ()=>Chi,
    "HashMD",
    ()=>HashMD,
    "Maj",
    ()=>Maj,
    "SHA224_IV",
    ()=>SHA224_IV,
    "SHA256_IV",
    ()=>SHA256_IV,
    "SHA384_IV",
    ()=>SHA384_IV,
    "SHA512_IV",
    ()=>SHA512_IV
]);
/**
 * Internal Merkle-Damgard hash utils.
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paraspell/sdk-core/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)");
;
function Chi(a, b, c) {
    return a & b ^ ~a & c;
}
function Maj(a, b, c) {
    return a & b ^ a & c ^ b & c;
}
class HashMD {
    blockLen;
    outputLen;
    padOffset;
    isLE;
    // For partial updates less than block size
    buffer;
    view;
    finished = false;
    length = 0;
    pos = 0;
    destroyed = false;
    constructor(blockLen, outputLen, padOffset, isLE){
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.buffer = new Uint8Array(blockLen);
        this.view = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createView"])(this.buffer);
    }
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(data);
        const { view, buffer, blockLen } = this;
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input, cast it to view and process
            if (take === blockLen) {
                const dataView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createView"])(data);
                for(; blockLen <= len - pos; pos += blockLen)this.process(dataView, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data.length;
        this.roundClean();
        return this;
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aoutput"])(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        // append the bit '1' to the message
        buffer[pos++] = 0b10000000;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clean"])(this.buffer.subarray(pos));
        // we have less than padOffset left in buffer, so we cannot put length in
        // current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        // Pad until full block byte with zeros
        for(let i = pos; i < blockLen; i++)buffer[i] = 0;
        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
        // So we just write lowest 64 bits of that value.
        view.setBigUint64(blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createView"])(out);
        const len = this.outputLen;
        // NOTE: we do division by 4 later, which must be fused in single op with modulo by JIT
        if (len % 4) throw new Error('_sha2: outputLen must be aligned to 32bit');
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length) throw new Error('_sha2: outputLen bigger than state');
        for(let i = 0; i < outLen; i++)oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        to ||= new this.constructor();
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.destroyed = destroyed;
        to.finished = finished;
        to.length = length;
        to.pos = pos;
        if (length % blockLen) to.buffer.set(buffer);
        return to;
    }
    clone() {
        return this._cloneInto();
    }
}
const SHA256_IV = /* @__PURE__ */ Uint32Array.from([
    0x6a09e667,
    0xbb67ae85,
    0x3c6ef372,
    0xa54ff53a,
    0x510e527f,
    0x9b05688c,
    0x1f83d9ab,
    0x5be0cd19
]);
const SHA224_IV = /* @__PURE__ */ Uint32Array.from([
    0xc1059ed8,
    0x367cd507,
    0x3070dd17,
    0xf70e5939,
    0xffc00b31,
    0x68581511,
    0x64f98fa7,
    0xbefa4fa4
]);
const SHA384_IV = /* @__PURE__ */ Uint32Array.from([
    0xcbbb9d5d,
    0xc1059ed8,
    0x629a292a,
    0x367cd507,
    0x9159015a,
    0x3070dd17,
    0x152fecd8,
    0xf70e5939,
    0x67332667,
    0xffc00b31,
    0x8eb44a87,
    0x68581511,
    0xdb0c2e0d,
    0x64f98fa7,
    0x47b5481d,
    0xbefa4fa4
]);
const SHA512_IV = /* @__PURE__ */ Uint32Array.from([
    0x6a09e667,
    0xf3bcc908,
    0xbb67ae85,
    0x84caa73b,
    0x3c6ef372,
    0xfe94f82b,
    0xa54ff53a,
    0x5f1d36f1,
    0x510e527f,
    0xade682d1,
    0x9b05688c,
    0x2b3e6c1f,
    0x1f83d9ab,
    0xfb41bd6b,
    0x5be0cd19,
    0x137e2179
]); //# sourceMappingURL=_md.js.map
}),
"[project]/node_modules/@paraspell/sdk-core/node_modules/@noble/hashes/_u64.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "add",
    ()=>add,
    "add3H",
    ()=>add3H,
    "add3L",
    ()=>add3L,
    "add4H",
    ()=>add4H,
    "add4L",
    ()=>add4L,
    "add5H",
    ()=>add5H,
    "add5L",
    ()=>add5L,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fromBig",
    ()=>fromBig,
    "rotlBH",
    ()=>rotlBH,
    "rotlBL",
    ()=>rotlBL,
    "rotlSH",
    ()=>rotlSH,
    "rotlSL",
    ()=>rotlSL,
    "rotr32H",
    ()=>rotr32H,
    "rotr32L",
    ()=>rotr32L,
    "rotrBH",
    ()=>rotrBH,
    "rotrBL",
    ()=>rotrBL,
    "rotrSH",
    ()=>rotrSH,
    "rotrSL",
    ()=>rotrSL,
    "shrSH",
    ()=>shrSH,
    "shrSL",
    ()=>shrSL,
    "split",
    ()=>split,
    "toBig",
    ()=>toBig
]);
/**
 * Internal helpers for u64. BigUint64Array is too slow as per 2025, so we implement it using Uint32Array.
 * @todo re-check https://issues.chromium.org/issues/42212588
 * @module
 */ const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
    if (le) return {
        h: Number(n & U32_MASK64),
        l: Number(n >> _32n & U32_MASK64)
    };
    return {
        h: Number(n >> _32n & U32_MASK64) | 0,
        l: Number(n & U32_MASK64) | 0
    };
}
function split(lst, le = false) {
    const len = lst.length;
    let Ah = new Uint32Array(len);
    let Al = new Uint32Array(len);
    for(let i = 0; i < len; i++){
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [
            h,
            l
        ];
    }
    return [
        Ah,
        Al
    ];
}
const toBig = (h, l)=>BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
// for Shift in [0, 32)
const shrSH = (h, _l, s)=>h >>> s;
const shrSL = (h, l, s)=>h << 32 - s | l >>> s;
// Right rotate for Shift in [1, 32)
const rotrSH = (h, l, s)=>h >>> s | l << 32 - s;
const rotrSL = (h, l, s)=>h << 32 - s | l >>> s;
// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotrBH = (h, l, s)=>h << 64 - s | l >>> s - 32;
const rotrBL = (h, l, s)=>h >>> s - 32 | l << 64 - s;
// Right rotate for shift===32 (just swaps l&h)
const rotr32H = (_h, l)=>l;
const rotr32L = (h, _l)=>h;
// Left rotate for Shift in [1, 32)
const rotlSH = (h, l, s)=>h << s | l >>> 32 - s;
const rotlSL = (h, l, s)=>l << s | h >>> 32 - s;
// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotlBH = (h, l, s)=>l << s - 32 | h >>> 64 - s;
const rotlBL = (h, l, s)=>h << s - 32 | l >>> 64 - s;
// JS uses 32-bit signed integers for bitwise operations which means we cannot
// simple take carry out of low bit sum by shift, we need to use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return {
        h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
        l: l | 0
    };
}
// Addition with more than 2 elements
const add3L = (Al, Bl, Cl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch)=>Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
const add4L = (Al, Bl, Cl, Dl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh)=>Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
const add5L = (Al, Bl, Cl, Dl, El)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh)=>Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
;
// prettier-ignore
const u64 = {
    fromBig,
    split,
    toBig,
    shrSH,
    shrSL,
    rotrSH,
    rotrSL,
    rotrBH,
    rotrBL,
    rotr32H,
    rotr32L,
    rotlSH,
    rotlSL,
    rotlBH,
    rotlBL,
    add,
    add3L,
    add3H,
    add4L,
    add4H,
    add5H,
    add5L
};
const __TURBOPACK__default__export__ = u64;
 //# sourceMappingURL=_u64.js.map
}),
"[project]/node_modules/@paraspell/sdk-core/node_modules/@noble/hashes/blake2.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_BLAKE2",
    ()=>_BLAKE2,
    "_BLAKE2b",
    ()=>_BLAKE2b,
    "_BLAKE2s",
    ()=>_BLAKE2s,
    "blake2b",
    ()=>blake2b,
    "blake2s",
    ()=>blake2s,
    "compress",
    ()=>compress
]);
/**
 * blake2b (64-bit) & blake2s (8 to 32-bit) hash functions.
 * b could have been faster, but there is no fast u64 in js, so s is 1.5x faster.
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paraspell/sdk-core/node_modules/@noble/hashes/_blake.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_md$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paraspell/sdk-core/node_modules/@noble/hashes/_md.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paraspell/sdk-core/node_modules/@noble/hashes/_u64.js [app-ssr] (ecmascript)");
// prettier-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paraspell/sdk-core/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)");
;
;
;
;
// Same as SHA512_IV, but swapped endianness: LE instead of BE. iv[1] is iv[0], etc.
const B2B_IV = /* @__PURE__ */ Uint32Array.from([
    0xf3bcc908,
    0x6a09e667,
    0x84caa73b,
    0xbb67ae85,
    0xfe94f82b,
    0x3c6ef372,
    0x5f1d36f1,
    0xa54ff53a,
    0xade682d1,
    0x510e527f,
    0x2b3e6c1f,
    0x9b05688c,
    0xfb41bd6b,
    0x1f83d9ab,
    0x137e2179,
    0x5be0cd19
]);
// Temporary buffer
const BBUF = /* @__PURE__ */ new Uint32Array(32);
// Mixing function G splitted in two halfs
function G1b(a, b, c, d, msg, x) {
    // NOTE: V is LE here
    const Xl = msg[x], Xh = msg[x + 1]; // prettier-ignore
    let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1]; // prettier-ignore
    let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1]; // prettier-ignore
    let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1]; // prettier-ignore
    let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1]; // prettier-ignore
    // v[a] = (v[a] + v[b] + x) | 0;
    let ll = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["add3L"](Al, Bl, Xl);
    Ah = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["add3H"](ll, Ah, Bh, Xh);
    Al = ll | 0;
    // v[d] = rotr(v[d] ^ v[a], 32)
    ({ Dh, Dl } = {
        Dh: Dh ^ Ah,
        Dl: Dl ^ Al
    });
    ({ Dh, Dl } = {
        Dh: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotr32H"](Dh, Dl),
        Dl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotr32L"](Dh, Dl)
    });
    // v[c] = (v[c] + v[d]) | 0;
    ({ h: Ch, l: Cl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["add"](Ch, Cl, Dh, Dl));
    // v[b] = rotr(v[b] ^ v[c], 24)
    ({ Bh, Bl } = {
        Bh: Bh ^ Ch,
        Bl: Bl ^ Cl
    });
    ({ Bh, Bl } = {
        Bh: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotrSH"](Bh, Bl, 24),
        Bl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotrSL"](Bh, Bl, 24)
    });
    BBUF[2 * a] = Al, BBUF[2 * a + 1] = Ah;
    BBUF[2 * b] = Bl, BBUF[2 * b + 1] = Bh;
    BBUF[2 * c] = Cl, BBUF[2 * c + 1] = Ch;
    BBUF[2 * d] = Dl, BBUF[2 * d + 1] = Dh;
}
function G2b(a, b, c, d, msg, x) {
    // NOTE: V is LE here
    const Xl = msg[x], Xh = msg[x + 1]; // prettier-ignore
    let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1]; // prettier-ignore
    let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1]; // prettier-ignore
    let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1]; // prettier-ignore
    let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1]; // prettier-ignore
    // v[a] = (v[a] + v[b] + x) | 0;
    let ll = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["add3L"](Al, Bl, Xl);
    Ah = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["add3H"](ll, Ah, Bh, Xh);
    Al = ll | 0;
    // v[d] = rotr(v[d] ^ v[a], 16)
    ({ Dh, Dl } = {
        Dh: Dh ^ Ah,
        Dl: Dl ^ Al
    });
    ({ Dh, Dl } = {
        Dh: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotrSH"](Dh, Dl, 16),
        Dl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotrSL"](Dh, Dl, 16)
    });
    // v[c] = (v[c] + v[d]) | 0;
    ({ h: Ch, l: Cl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["add"](Ch, Cl, Dh, Dl));
    // v[b] = rotr(v[b] ^ v[c], 63)
    ({ Bh, Bl } = {
        Bh: Bh ^ Ch,
        Bl: Bl ^ Cl
    });
    ({ Bh, Bl } = {
        Bh: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotrBH"](Bh, Bl, 63),
        Bl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotrBL"](Bh, Bl, 63)
    });
    BBUF[2 * a] = Al, BBUF[2 * a + 1] = Ah;
    BBUF[2 * b] = Bl, BBUF[2 * b + 1] = Bh;
    BBUF[2 * c] = Cl, BBUF[2 * c + 1] = Ch;
    BBUF[2 * d] = Dl, BBUF[2 * d + 1] = Dh;
}
function checkBlake2Opts(outputLen, opts = {}, keyLen, saltLen, persLen) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anumber"])(keyLen);
    if (outputLen < 0 || outputLen > keyLen) throw new Error('outputLen bigger than keyLen');
    const { key, salt, personalization } = opts;
    if (key !== undefined && (key.length < 1 || key.length > keyLen)) throw new Error('"key" expected to be undefined or of length=1..' + keyLen);
    if (salt !== undefined) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(salt, saltLen, 'salt');
    if (personalization !== undefined) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(personalization, persLen, 'personalization');
}
class _BLAKE2 {
    buffer;
    buffer32;
    finished = false;
    destroyed = false;
    length = 0;
    pos = 0;
    blockLen;
    outputLen;
    constructor(blockLen, outputLen){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anumber"])(blockLen);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anumber"])(outputLen);
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.buffer = new Uint8Array(blockLen);
        this.buffer32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u32"])(this.buffer);
    }
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(data);
        // Main difference with other hashes: there is flag for last block,
        // so we cannot process current block before we know that there
        // is the next one. This significantly complicates logic and reduces ability
        // to do zero-copy processing
        const { blockLen, buffer, buffer32 } = this;
        const len = data.length;
        const offset = data.byteOffset;
        const buf = data.buffer;
        for(let pos = 0; pos < len;){
            // If buffer is full and we still have input (don't process last block, same as blake2s)
            if (this.pos === blockLen) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap32IfBE"])(buffer32);
                this.compress(buffer32, 0, false);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap32IfBE"])(buffer32);
                this.pos = 0;
            }
            const take = Math.min(blockLen - this.pos, len - pos);
            const dataOffset = offset + pos;
            // full block && aligned to 4 bytes && not last in input
            if (take === blockLen && !(dataOffset % 4) && pos + take < len) {
                const data32 = new Uint32Array(buf, dataOffset, Math.floor((len - pos) / 4));
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap32IfBE"])(data32);
                for(let pos32 = 0; pos + blockLen < len; pos32 += buffer32.length, pos += blockLen){
                    this.length += blockLen;
                    this.compress(data32, pos32, false);
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap32IfBE"])(data32);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            this.length += take;
            pos += take;
        }
        return this;
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aoutput"])(out, this);
        const { pos, buffer32 } = this;
        this.finished = true;
        // Padding
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clean"])(this.buffer.subarray(pos));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap32IfBE"])(buffer32);
        this.compress(buffer32, 0, true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap32IfBE"])(buffer32);
        const out32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u32"])(out);
        this.get().forEach((v, i)=>out32[i] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap8IfBE"])(v));
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        const { buffer, length, finished, destroyed, outputLen, pos } = this;
        to ||= new this.constructor({
            dkLen: outputLen
        });
        to.set(...this.get());
        to.buffer.set(buffer);
        to.destroyed = destroyed;
        to.finished = finished;
        to.length = length;
        to.pos = pos;
        // @ts-ignore
        to.outputLen = outputLen;
        return to;
    }
    clone() {
        return this._cloneInto();
    }
}
class _BLAKE2b extends _BLAKE2 {
    // Same as SHA-512, but LE
    v0l = B2B_IV[0] | 0;
    v0h = B2B_IV[1] | 0;
    v1l = B2B_IV[2] | 0;
    v1h = B2B_IV[3] | 0;
    v2l = B2B_IV[4] | 0;
    v2h = B2B_IV[5] | 0;
    v3l = B2B_IV[6] | 0;
    v3h = B2B_IV[7] | 0;
    v4l = B2B_IV[8] | 0;
    v4h = B2B_IV[9] | 0;
    v5l = B2B_IV[10] | 0;
    v5h = B2B_IV[11] | 0;
    v6l = B2B_IV[12] | 0;
    v6h = B2B_IV[13] | 0;
    v7l = B2B_IV[14] | 0;
    v7h = B2B_IV[15] | 0;
    constructor(opts = {}){
        const olen = opts.dkLen === undefined ? 64 : opts.dkLen;
        super(128, olen);
        checkBlake2Opts(olen, opts, 64, 16, 16);
        let { key, personalization, salt } = opts;
        let keyLength = 0;
        if (key !== undefined) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(key, undefined, 'key');
            keyLength = key.length;
        }
        this.v0l ^= this.outputLen | keyLength << 8 | 0x01 << 16 | 0x01 << 24;
        if (salt !== undefined) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(salt, undefined, 'salt');
            const slt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u32"])(salt);
            this.v4l ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap8IfBE"])(slt[0]);
            this.v4h ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap8IfBE"])(slt[1]);
            this.v5l ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap8IfBE"])(slt[2]);
            this.v5h ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap8IfBE"])(slt[3]);
        }
        if (personalization !== undefined) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(personalization, undefined, 'personalization');
            const pers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u32"])(personalization);
            this.v6l ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap8IfBE"])(pers[0]);
            this.v6h ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap8IfBE"])(pers[1]);
            this.v7l ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap8IfBE"])(pers[2]);
            this.v7h ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap8IfBE"])(pers[3]);
        }
        if (key !== undefined) {
            // Pad to blockLen and update
            const tmp = new Uint8Array(this.blockLen);
            tmp.set(key);
            this.update(tmp);
        }
    }
    // prettier-ignore
    get() {
        let { v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h } = this;
        return [
            v0l,
            v0h,
            v1l,
            v1h,
            v2l,
            v2h,
            v3l,
            v3h,
            v4l,
            v4h,
            v5l,
            v5h,
            v6l,
            v6h,
            v7l,
            v7h
        ];
    }
    // prettier-ignore
    set(v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h) {
        this.v0l = v0l | 0;
        this.v0h = v0h | 0;
        this.v1l = v1l | 0;
        this.v1h = v1h | 0;
        this.v2l = v2l | 0;
        this.v2h = v2h | 0;
        this.v3l = v3l | 0;
        this.v3h = v3h | 0;
        this.v4l = v4l | 0;
        this.v4h = v4h | 0;
        this.v5l = v5l | 0;
        this.v5h = v5h | 0;
        this.v6l = v6l | 0;
        this.v6h = v6h | 0;
        this.v7l = v7l | 0;
        this.v7h = v7h | 0;
    }
    compress(msg, offset, isLast) {
        this.get().forEach((v, i)=>BBUF[i] = v); // First half from state.
        BBUF.set(B2B_IV, 16); // Second half from IV.
        let { h, l } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromBig"](BigInt(this.length));
        BBUF[24] = B2B_IV[8] ^ l; // Low word of the offset.
        BBUF[25] = B2B_IV[9] ^ h; // High word.
        // Invert all bits for last block
        if (isLast) {
            BBUF[28] = ~BBUF[28];
            BBUF[29] = ~BBUF[29];
        }
        let j = 0;
        const s = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BSIGMA"];
        for(let i = 0; i < 12; i++){
            G1b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
            G2b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
            G1b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
            G2b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
            G1b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
            G2b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
            G1b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
            G2b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
            G1b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
            G2b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
            G1b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
            G2b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
            G1b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
            G2b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
            G1b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
            G2b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
        }
        this.v0l ^= BBUF[0] ^ BBUF[16];
        this.v0h ^= BBUF[1] ^ BBUF[17];
        this.v1l ^= BBUF[2] ^ BBUF[18];
        this.v1h ^= BBUF[3] ^ BBUF[19];
        this.v2l ^= BBUF[4] ^ BBUF[20];
        this.v2h ^= BBUF[5] ^ BBUF[21];
        this.v3l ^= BBUF[6] ^ BBUF[22];
        this.v3h ^= BBUF[7] ^ BBUF[23];
        this.v4l ^= BBUF[8] ^ BBUF[24];
        this.v4h ^= BBUF[9] ^ BBUF[25];
        this.v5l ^= BBUF[10] ^ BBUF[26];
        this.v5h ^= BBUF[11] ^ BBUF[27];
        this.v6l ^= BBUF[12] ^ BBUF[28];
        this.v6h ^= BBUF[13] ^ BBUF[29];
        this.v7l ^= BBUF[14] ^ BBUF[30];
        this.v7h ^= BBUF[15] ^ BBUF[31];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clean"])(BBUF);
    }
    destroy() {
        this.destroyed = true;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clean"])(this.buffer32);
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
const blake2b = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHasher"])((opts)=>new _BLAKE2b(opts));
function compress(s, offset, msg, rounds, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15) {
    let j = 0;
    for(let i = 0; i < rounds; i++){
        ({ a: v0, b: v4, c: v8, d: v12 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G1s"])(v0, v4, v8, v12, msg[offset + s[j++]]));
        ({ a: v0, b: v4, c: v8, d: v12 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G2s"])(v0, v4, v8, v12, msg[offset + s[j++]]));
        ({ a: v1, b: v5, c: v9, d: v13 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G1s"])(v1, v5, v9, v13, msg[offset + s[j++]]));
        ({ a: v1, b: v5, c: v9, d: v13 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G2s"])(v1, v5, v9, v13, msg[offset + s[j++]]));
        ({ a: v2, b: v6, c: v10, d: v14 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G1s"])(v2, v6, v10, v14, msg[offset + s[j++]]));
        ({ a: v2, b: v6, c: v10, d: v14 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G2s"])(v2, v6, v10, v14, msg[offset + s[j++]]));
        ({ a: v3, b: v7, c: v11, d: v15 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G1s"])(v3, v7, v11, v15, msg[offset + s[j++]]));
        ({ a: v3, b: v7, c: v11, d: v15 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G2s"])(v3, v7, v11, v15, msg[offset + s[j++]]));
        ({ a: v0, b: v5, c: v10, d: v15 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G1s"])(v0, v5, v10, v15, msg[offset + s[j++]]));
        ({ a: v0, b: v5, c: v10, d: v15 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G2s"])(v0, v5, v10, v15, msg[offset + s[j++]]));
        ({ a: v1, b: v6, c: v11, d: v12 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G1s"])(v1, v6, v11, v12, msg[offset + s[j++]]));
        ({ a: v1, b: v6, c: v11, d: v12 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G2s"])(v1, v6, v11, v12, msg[offset + s[j++]]));
        ({ a: v2, b: v7, c: v8, d: v13 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G1s"])(v2, v7, v8, v13, msg[offset + s[j++]]));
        ({ a: v2, b: v7, c: v8, d: v13 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G2s"])(v2, v7, v8, v13, msg[offset + s[j++]]));
        ({ a: v3, b: v4, c: v9, d: v14 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G1s"])(v3, v4, v9, v14, msg[offset + s[j++]]));
        ({ a: v3, b: v4, c: v9, d: v14 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G2s"])(v3, v4, v9, v14, msg[offset + s[j++]]));
    }
    return {
        v0,
        v1,
        v2,
        v3,
        v4,
        v5,
        v6,
        v7,
        v8,
        v9,
        v10,
        v11,
        v12,
        v13,
        v14,
        v15
    };
}
const B2S_IV = /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_md$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SHA256_IV"].slice();
class _BLAKE2s extends _BLAKE2 {
    // Internal state, same as SHA-256
    v0 = B2S_IV[0] | 0;
    v1 = B2S_IV[1] | 0;
    v2 = B2S_IV[2] | 0;
    v3 = B2S_IV[3] | 0;
    v4 = B2S_IV[4] | 0;
    v5 = B2S_IV[5] | 0;
    v6 = B2S_IV[6] | 0;
    v7 = B2S_IV[7] | 0;
    constructor(opts = {}){
        const olen = opts.dkLen === undefined ? 32 : opts.dkLen;
        super(64, olen);
        checkBlake2Opts(olen, opts, 32, 8, 8);
        let { key, personalization, salt } = opts;
        let keyLength = 0;
        if (key !== undefined) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(key, undefined, 'key');
            keyLength = key.length;
        }
        this.v0 ^= this.outputLen | keyLength << 8 | 0x01 << 16 | 0x01 << 24;
        if (salt !== undefined) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(salt, undefined, 'salt');
            const slt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u32"])(salt);
            this.v4 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap8IfBE"])(slt[0]);
            this.v5 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap8IfBE"])(slt[1]);
        }
        if (personalization !== undefined) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(personalization, undefined, 'personalization');
            const pers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u32"])(personalization);
            this.v6 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap8IfBE"])(pers[0]);
            this.v7 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap8IfBE"])(pers[1]);
        }
        if (key !== undefined) {
            // Pad to blockLen and update
            const tmp = new Uint8Array(this.blockLen);
            tmp.set(key);
            this.update(tmp);
        }
    }
    get() {
        const { v0, v1, v2, v3, v4, v5, v6, v7 } = this;
        return [
            v0,
            v1,
            v2,
            v3,
            v4,
            v5,
            v6,
            v7
        ];
    }
    // prettier-ignore
    set(v0, v1, v2, v3, v4, v5, v6, v7) {
        this.v0 = v0 | 0;
        this.v1 = v1 | 0;
        this.v2 = v2 | 0;
        this.v3 = v3 | 0;
        this.v4 = v4 | 0;
        this.v5 = v5 | 0;
        this.v6 = v6 | 0;
        this.v7 = v7 | 0;
    }
    compress(msg, offset, isLast) {
        const { h, l } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromBig"](BigInt(this.length));
        // prettier-ignore
        const { v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15 } = compress(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$_blake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BSIGMA"], offset, msg, 10, this.v0, this.v1, this.v2, this.v3, this.v4, this.v5, this.v6, this.v7, B2S_IV[0], B2S_IV[1], B2S_IV[2], B2S_IV[3], l ^ B2S_IV[4], h ^ B2S_IV[5], isLast ? ~B2S_IV[6] : B2S_IV[6], B2S_IV[7]);
        this.v0 ^= v0 ^ v8;
        this.v1 ^= v1 ^ v9;
        this.v2 ^= v2 ^ v10;
        this.v3 ^= v3 ^ v11;
        this.v4 ^= v4 ^ v12;
        this.v5 ^= v5 ^ v13;
        this.v6 ^= v6 ^ v14;
        this.v7 ^= v7 ^ v15;
    }
    destroy() {
        this.destroyed = true;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clean"])(this.buffer32);
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
    }
}
const blake2s = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHasher"])((opts)=>new _BLAKE2s(opts)); //# sourceMappingURL=blake2.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/hashes/_assert.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.output = exports.exists = exports.hash = exports.bytes = exports.bool = exports.number = void 0;
function number(n) {
    if (!Number.isSafeInteger(n) || n < 0) throw new Error(`Wrong positive integer: ${n}`);
}
exports.number = number;
function bool(b) {
    if (typeof b !== 'boolean') throw new Error(`Expected boolean, not ${b}`);
}
exports.bool = bool;
function bytes(b, ...lengths) {
    if (!(b instanceof Uint8Array)) throw new Error('Expected Uint8Array');
    if (lengths.length > 0 && !lengths.includes(b.length)) throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
exports.bytes = bytes;
function hash(hash) {
    if (typeof hash !== 'function' || typeof hash.create !== 'function') throw new Error('Hash should be wrapped by utils.wrapConstructor');
    number(hash.outputLen);
    number(hash.blockLen);
}
exports.hash = hash;
function exists(instance, checkFinished = true) {
    if (instance.destroyed) throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
exports.exists = exists;
function output(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
}
exports.output = output;
const assert = {
    number,
    bool,
    bytes,
    hash,
    exists,
    output
};
exports.default = assert; //# sourceMappingURL=_assert.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/hashes/_u64.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.add5L = exports.add5H = exports.add4H = exports.add4L = exports.add3H = exports.add3L = exports.add = exports.rotlBL = exports.rotlBH = exports.rotlSL = exports.rotlSH = exports.rotr32L = exports.rotr32H = exports.rotrBL = exports.rotrBH = exports.rotrSL = exports.rotrSH = exports.shrSL = exports.shrSH = exports.toBig = exports.split = exports.fromBig = void 0;
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
// We are not using BigUint64Array, because they are extremely slow as per 2022
function fromBig(n, le = false) {
    if (le) return {
        h: Number(n & U32_MASK64),
        l: Number(n >> _32n & U32_MASK64)
    };
    return {
        h: Number(n >> _32n & U32_MASK64) | 0,
        l: Number(n & U32_MASK64) | 0
    };
}
exports.fromBig = fromBig;
function split(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for(let i = 0; i < lst.length; i++){
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [
            h,
            l
        ];
    }
    return [
        Ah,
        Al
    ];
}
exports.split = split;
const toBig = (h, l)=>BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
exports.toBig = toBig;
// for Shift in [0, 32)
const shrSH = (h, _l, s)=>h >>> s;
exports.shrSH = shrSH;
const shrSL = (h, l, s)=>h << 32 - s | l >>> s;
exports.shrSL = shrSL;
// Right rotate for Shift in [1, 32)
const rotrSH = (h, l, s)=>h >>> s | l << 32 - s;
exports.rotrSH = rotrSH;
const rotrSL = (h, l, s)=>h << 32 - s | l >>> s;
exports.rotrSL = rotrSL;
// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotrBH = (h, l, s)=>h << 64 - s | l >>> s - 32;
exports.rotrBH = rotrBH;
const rotrBL = (h, l, s)=>h >>> s - 32 | l << 64 - s;
exports.rotrBL = rotrBL;
// Right rotate for shift===32 (just swaps l&h)
const rotr32H = (_h, l)=>l;
exports.rotr32H = rotr32H;
const rotr32L = (h, _l)=>h;
exports.rotr32L = rotr32L;
// Left rotate for Shift in [1, 32)
const rotlSH = (h, l, s)=>h << s | l >>> 32 - s;
exports.rotlSH = rotlSH;
const rotlSL = (h, l, s)=>l << s | h >>> 32 - s;
exports.rotlSL = rotlSL;
// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotlBH = (h, l, s)=>l << s - 32 | h >>> 64 - s;
exports.rotlBH = rotlBH;
const rotlBL = (h, l, s)=>h << s - 32 | l >>> 64 - s;
exports.rotlBL = rotlBL;
// JS uses 32-bit signed integers for bitwise operations which means we cannot
// simple take carry out of low bit sum by shift, we need to use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return {
        h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
        l: l | 0
    };
}
exports.add = add;
// Addition with more than 2 elements
const add3L = (Al, Bl, Cl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
exports.add3L = add3L;
const add3H = (low, Ah, Bh, Ch)=>Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
exports.add3H = add3H;
const add4L = (Al, Bl, Cl, Dl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
exports.add4L = add4L;
const add4H = (low, Ah, Bh, Ch, Dh)=>Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
exports.add4H = add4H;
const add5L = (Al, Bl, Cl, Dl, El)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
exports.add5L = add5L;
const add5H = (low, Ah, Bh, Ch, Dh, Eh)=>Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
exports.add5H = add5H;
// prettier-ignore
const u64 = {
    fromBig,
    split,
    toBig,
    shrSH,
    shrSL,
    rotrSH,
    rotrSL,
    rotrBH,
    rotrBL,
    rotr32H,
    rotr32L,
    rotlSH,
    rotlSL,
    rotlBH,
    rotlBL,
    add,
    add3L,
    add3H,
    add4L,
    add4H,
    add5H,
    add5L
};
exports.default = u64; //# sourceMappingURL=_u64.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/hashes/cryptoNode.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.crypto = void 0;
// We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// See utils.ts for details.
// The file will throw on node.js 14 and earlier.
// @ts-ignore
const nc = __turbopack_context__.r("[externals]/node:crypto [external] (node:crypto, cjs)");
exports.crypto = nc && typeof nc === 'object' && 'webcrypto' in nc ? nc.webcrypto : undefined; //# sourceMappingURL=cryptoNode.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.randomBytes = exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.checkOpts = exports.Hash = exports.concatBytes = exports.toBytes = exports.utf8ToBytes = exports.asyncLoop = exports.nextTick = exports.hexToBytes = exports.bytesToHex = exports.isLE = exports.rotr = exports.createView = exports.u32 = exports.u8 = void 0;
// We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// node.js versions earlier than v19 don't declare it in global scope.
// For node.js, package.json#exports field mapping rewrites import
// from `crypto` to `cryptoNode`, which imports native module.
// Makes the utils un-importable in browsers without a bundler.
// Once node.js 18 is deprecated, we can just drop the import.
const crypto_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/cryptoNode.js [app-ssr] (ecmascript)");
const u8a = (a)=>a instanceof Uint8Array;
// Cast array to different type
const u8 = (arr)=>new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
exports.u8 = u8;
const u32 = (arr)=>new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
exports.u32 = u32;
// Cast array to view
const createView = (arr)=>new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
exports.createView = createView;
// The rotate right (circular right shift) operation for uint32
const rotr = (word, shift)=>word << 32 - shift | word >>> shift;
exports.rotr = rotr;
// big-endian hardware is rare. Just in case someone still decides to run hashes:
// early-throw an error because we don't support BE yet.
exports.isLE = new Uint8Array(new Uint32Array([
    0x11223344
]).buffer)[0] === 0x44;
if (!exports.isLE) throw new Error('Non little-endian hardware is not supported');
const hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */ function bytesToHex(bytes) {
    if (!u8a(bytes)) throw new Error('Uint8Array expected');
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        hex += hexes[bytes[i]];
    }
    return hex;
}
exports.bytesToHex = bytesToHex;
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */ function hexToBytes(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    const len = hex.length;
    if (len % 2) throw new Error('padded hex string expected, got unpadded hex of length ' + len);
    const array = new Uint8Array(len / 2);
    for(let i = 0; i < array.length; i++){
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
        array[i] = byte;
    }
    return array;
}
exports.hexToBytes = hexToBytes;
// There is no setImmediate in browser and setTimeout is slow.
// call of async fn will return Promise, which will be fullfiled only on
// next scheduler queue processing step and this is exactly what we need.
const nextTick = async ()=>{};
exports.nextTick = nextTick;
// Returns control to thread each 'tick' ms to avoid blocking
async function asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for(let i = 0; i < iters; i++){
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick) continue;
        await (0, exports.nextTick)();
        ts += diff;
    }
}
exports.asyncLoop = asyncLoop;
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */ function utf8ToBytes(str) {
    if (typeof str !== 'string') throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
exports.utf8ToBytes = utf8ToBytes;
/**
 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
 * Warning: when Uint8Array is passed, it would NOT get copied.
 * Keep in mind for future mutable operations.
 */ function toBytes(data) {
    if (typeof data === 'string') data = utf8ToBytes(data);
    if (!u8a(data)) throw new Error(`expected Uint8Array, got ${typeof data}`);
    return data;
}
exports.toBytes = toBytes;
/**
 * Copies several Uint8Arrays into one.
 */ function concatBytes(...arrays) {
    const r = new Uint8Array(arrays.reduce((sum, a)=>sum + a.length, 0));
    let pad = 0; // walk through each item, ensure they have proper type
    arrays.forEach((a)=>{
        if (!u8a(a)) throw new Error('Uint8Array expected');
        r.set(a, pad);
        pad += a.length;
    });
    return r;
}
exports.concatBytes = concatBytes;
// For runtime check if class implements interface
class Hash {
    // Safe version that clones internal state
    clone() {
        return this._cloneInto();
    }
}
exports.Hash = Hash;
const toStr = {}.toString;
function checkOpts(defaults, opts) {
    if (opts !== undefined && toStr.call(opts) !== '[object Object]') throw new Error('Options should be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
exports.checkOpts = checkOpts;
function wrapConstructor(hashCons) {
    const hashC = (msg)=>hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = ()=>hashCons();
    return hashC;
}
exports.wrapConstructor = wrapConstructor;
function wrapConstructorWithOpts(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
function wrapXOFConstructorWithOpts(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
exports.wrapXOFConstructorWithOpts = wrapXOFConstructorWithOpts;
/**
 * Secure PRNG. Uses `crypto.getRandomValues`, which defers to OS.
 */ function randomBytes(bytesLength = 32) {
    if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === 'function') {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
}
exports.randomBytes = randomBytes; //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/hashes/sha3.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shake256 = exports.shake128 = exports.keccak_512 = exports.keccak_384 = exports.keccak_256 = exports.keccak_224 = exports.sha3_512 = exports.sha3_384 = exports.sha3_256 = exports.sha3_224 = exports.Keccak = exports.keccakP = void 0;
const _assert_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/_assert.js [app-ssr] (ecmascript)");
const _u64_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/_u64.js [app-ssr] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)");
// SHA3 (keccak) is based on a new design: basically, the internal state is bigger than output size.
// It's called a sponge function.
// Various per round constants calculations
const [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [
    [],
    [],
    []
];
const _0n = /* @__PURE__ */ BigInt(0);
const _1n = /* @__PURE__ */ BigInt(1);
const _2n = /* @__PURE__ */ BigInt(2);
const _7n = /* @__PURE__ */ BigInt(7);
const _256n = /* @__PURE__ */ BigInt(256);
const _0x71n = /* @__PURE__ */ BigInt(0x71);
for(let round = 0, R = _1n, x = 1, y = 0; round < 24; round++){
    // Pi
    [x, y] = [
        y,
        (2 * x + 3 * y) % 5
    ];
    SHA3_PI.push(2 * (5 * y + x));
    // Rotational
    SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
    // Iota
    let t = _0n;
    for(let j = 0; j < 7; j++){
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n) t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
    }
    _SHA3_IOTA.push(t);
}
const [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ (0, _u64_js_1.split)(_SHA3_IOTA, true);
// Left rotation (without 0, 32, 64)
const rotlH = (h, l, s)=>s > 32 ? (0, _u64_js_1.rotlBH)(h, l, s) : (0, _u64_js_1.rotlSH)(h, l, s);
const rotlL = (h, l, s)=>s > 32 ? (0, _u64_js_1.rotlBL)(h, l, s) : (0, _u64_js_1.rotlSL)(h, l, s);
// Same as keccakf1600, but allows to skip some rounds
function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    // NOTE: all indices are x2 since we store state as u32 instead of u64 (bigints to slow in js)
    for(let round = 24 - rounds; round < 24; round++){
        // Theta θ
        for(let x = 0; x < 10; x++)B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for(let x = 0; x < 10; x += 2){
            const idx1 = (x + 8) % 10;
            const idx0 = (x + 2) % 10;
            const B0 = B[idx0];
            const B1 = B[idx0 + 1];
            const Th = rotlH(B0, B1, 1) ^ B[idx1];
            const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
            for(let y = 0; y < 50; y += 10){
                s[x + y] ^= Th;
                s[x + y + 1] ^= Tl;
            }
        }
        // Rho (ρ) and Pi (π)
        let curH = s[2];
        let curL = s[3];
        for(let t = 0; t < 24; t++){
            const shift = SHA3_ROTL[t];
            const Th = rotlH(curH, curL, shift);
            const Tl = rotlL(curH, curL, shift);
            const PI = SHA3_PI[t];
            curH = s[PI];
            curL = s[PI + 1];
            s[PI] = Th;
            s[PI + 1] = Tl;
        }
        // Chi (χ)
        for(let y = 0; y < 50; y += 10){
            for(let x = 0; x < 10; x++)B[x] = s[y + x];
            for(let x = 0; x < 10; x++)s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        // Iota (ι)
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
    }
    B.fill(0);
}
exports.keccakP = keccakP;
class Keccak extends utils_js_1.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24){
        super();
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        // Can be passed from user as dkLen
        (0, _assert_js_1.number)(outputLen);
        // 1600 = 5x5 matrix of 64bit.  1600 bits === 200 bytes
        if (0 >= this.blockLen || this.blockLen >= 200) throw new Error('Sha3 supports only keccak-f1600 function');
        this.state = new Uint8Array(200);
        this.state32 = (0, utils_js_1.u32)(this.state);
    }
    keccak() {
        keccakP(this.state32, this.rounds);
        this.posOut = 0;
        this.pos = 0;
    }
    update(data) {
        (0, _assert_js_1.exists)(this);
        const { blockLen, state } = this;
        data = (0, utils_js_1.toBytes)(data);
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            for(let i = 0; i < take; i++)state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen) this.keccak();
        }
        return this;
    }
    finish() {
        if (this.finished) return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        // Do the padding
        state[pos] ^= suffix;
        if ((suffix & 0x80) !== 0 && pos === blockLen - 1) this.keccak();
        state[blockLen - 1] ^= 0x80;
        this.keccak();
    }
    writeInto(out) {
        (0, _assert_js_1.exists)(this, false);
        (0, _assert_js_1.bytes)(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for(let pos = 0, len = out.length; pos < len;){
            if (this.posOut >= blockLen) this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
        }
        return out;
    }
    xofInto(out) {
        // Sha3/Keccak usage with XOF is probably mistake, only SHAKE instances can do XOF
        if (!this.enableXOF) throw new Error('XOF is not possible for this instance');
        return this.writeInto(out);
    }
    xof(bytes) {
        (0, _assert_js_1.number)(bytes);
        return this.xofInto(new Uint8Array(bytes));
    }
    digestInto(out) {
        (0, _assert_js_1.output)(out, this);
        if (this.finished) throw new Error('digest() was already called');
        this.writeInto(out);
        this.destroy();
        return out;
    }
    digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
        this.destroyed = true;
        this.state.fill(0);
    }
    _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        // Suffix can change in cSHAKE
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
    }
}
exports.Keccak = Keccak;
const gen = (suffix, blockLen, outputLen)=>(0, utils_js_1.wrapConstructor)(()=>new Keccak(blockLen, suffix, outputLen));
exports.sha3_224 = gen(0x06, 144, 224 / 8);
/**
 * SHA3-256 hash function
 * @param message - that would be hashed
 */ exports.sha3_256 = gen(0x06, 136, 256 / 8);
exports.sha3_384 = gen(0x06, 104, 384 / 8);
exports.sha3_512 = gen(0x06, 72, 512 / 8);
exports.keccak_224 = gen(0x01, 144, 224 / 8);
/**
 * keccak-256 hash function. Different from SHA3-256.
 * @param message - that would be hashed
 */ exports.keccak_256 = gen(0x01, 136, 256 / 8);
exports.keccak_384 = gen(0x01, 104, 384 / 8);
exports.keccak_512 = gen(0x01, 72, 512 / 8);
const genShake = (suffix, blockLen, outputLen)=>(0, utils_js_1.wrapXOFConstructorWithOpts)((opts = {})=>new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));
exports.shake128 = genShake(0x1f, 168, 128 / 8);
exports.shake256 = genShake(0x1f, 136, 256 / 8); //# sourceMappingURL=sha3.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/hashes/_sha2.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SHA2 = void 0;
const _assert_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/_assert.js [app-ssr] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)");
// Polyfill for Safari 14
function setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function') return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
// Base SHA2 class (RFC 6234)
class SHA2 extends utils_js_1.Hash {
    constructor(blockLen, outputLen, padOffset, isLE){
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.buffer = new Uint8Array(blockLen);
        this.view = (0, utils_js_1.createView)(this.buffer);
    }
    update(data) {
        (0, _assert_js_1.exists)(this);
        const { view, buffer, blockLen } = this;
        data = (0, utils_js_1.toBytes)(data);
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input, cast it to view and process
            if (take === blockLen) {
                const dataView = (0, utils_js_1.createView)(data);
                for(; blockLen <= len - pos; pos += blockLen)this.process(dataView, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data.length;
        this.roundClean();
        return this;
    }
    digestInto(out) {
        (0, _assert_js_1.exists)(this);
        (0, _assert_js_1.output)(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        // append the bit '1' to the message
        buffer[pos++] = 0b10000000;
        this.buffer.subarray(pos).fill(0);
        // we have less than padOffset left in buffer, so we cannot put length in current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        // Pad until full block byte with zeros
        for(let i = pos; i < blockLen; i++)buffer[i] = 0;
        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
        // So we just write lowest 64 bits of that value.
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = (0, utils_js_1.createView)(out);
        const len = this.outputLen;
        // NOTE: we do division by 4 later, which should be fused in single op with modulo by JIT
        if (len % 4) throw new Error('_sha2: outputLen should be aligned to 32bit');
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length) throw new Error('_sha2: outputLen bigger than state');
        for(let i = 0; i < outLen; i++)oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.length = length;
        to.pos = pos;
        to.finished = finished;
        to.destroyed = destroyed;
        if (length % blockLen) to.buffer.set(buffer);
        return to;
    }
}
exports.SHA2 = SHA2; //# sourceMappingURL=_sha2.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/hashes/ripemd160.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ripemd160 = exports.RIPEMD160 = void 0;
const _sha2_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/_sha2.js [app-ssr] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)");
// https://homes.esat.kuleuven.be/~bosselae/ripemd160.html
// https://homes.esat.kuleuven.be/~bosselae/ripemd160/pdf/AB-9601/AB-9601.pdf
const Rho = /* @__PURE__ */ new Uint8Array([
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8
]);
const Id = /* @__PURE__ */ Uint8Array.from({
    length: 16
}, (_, i)=>i);
const Pi = /* @__PURE__ */ Id.map((i)=>(9 * i + 5) % 16);
let idxL = [
    Id
];
let idxR = [
    Pi
];
for(let i = 0; i < 4; i++)for (let j of [
    idxL,
    idxR
])j.push(j[i].map((k)=>Rho[k]));
const shifts = /* @__PURE__ */ [
    [
        11,
        14,
        15,
        12,
        5,
        8,
        7,
        9,
        11,
        13,
        14,
        15,
        6,
        7,
        9,
        8
    ],
    [
        12,
        13,
        11,
        15,
        6,
        9,
        9,
        7,
        12,
        15,
        11,
        13,
        7,
        8,
        7,
        7
    ],
    [
        13,
        15,
        14,
        11,
        7,
        7,
        6,
        8,
        13,
        14,
        13,
        12,
        5,
        5,
        6,
        9
    ],
    [
        14,
        11,
        12,
        14,
        8,
        6,
        5,
        5,
        15,
        12,
        15,
        14,
        9,
        9,
        8,
        6
    ],
    [
        15,
        12,
        13,
        13,
        9,
        5,
        8,
        6,
        14,
        11,
        12,
        11,
        8,
        6,
        5,
        5
    ]
].map((i)=>new Uint8Array(i));
const shiftsL = /* @__PURE__ */ idxL.map((idx, i)=>idx.map((j)=>shifts[i][j]));
const shiftsR = /* @__PURE__ */ idxR.map((idx, i)=>idx.map((j)=>shifts[i][j]));
const Kl = /* @__PURE__ */ new Uint32Array([
    0x00000000,
    0x5a827999,
    0x6ed9eba1,
    0x8f1bbcdc,
    0xa953fd4e
]);
const Kr = /* @__PURE__ */ new Uint32Array([
    0x50a28be6,
    0x5c4dd124,
    0x6d703ef3,
    0x7a6d76e9,
    0x00000000
]);
// The rotate left (circular left shift) operation for uint32
const rotl = (word, shift)=>word << shift | word >>> 32 - shift;
// It's called f() in spec.
function f(group, x, y, z) {
    if (group === 0) return x ^ y ^ z;
    else if (group === 1) return x & y | ~x & z;
    else if (group === 2) return (x | ~y) ^ z;
    else if (group === 3) return x & z | y & ~z;
    else return x ^ (y | ~z);
}
// Temporary buffer, not used to store anything between runs
const BUF = /* @__PURE__ */ new Uint32Array(16);
class RIPEMD160 extends _sha2_js_1.SHA2 {
    constructor(){
        super(64, 20, 8, true);
        this.h0 = 0x67452301 | 0;
        this.h1 = 0xefcdab89 | 0;
        this.h2 = 0x98badcfe | 0;
        this.h3 = 0x10325476 | 0;
        this.h4 = 0xc3d2e1f0 | 0;
    }
    get() {
        const { h0, h1, h2, h3, h4 } = this;
        return [
            h0,
            h1,
            h2,
            h3,
            h4
        ];
    }
    set(h0, h1, h2, h3, h4) {
        this.h0 = h0 | 0;
        this.h1 = h1 | 0;
        this.h2 = h2 | 0;
        this.h3 = h3 | 0;
        this.h4 = h4 | 0;
    }
    process(view, offset) {
        for(let i = 0; i < 16; i++, offset += 4)BUF[i] = view.getUint32(offset, true);
        // prettier-ignore
        let al = this.h0 | 0, ar = al, bl = this.h1 | 0, br = bl, cl = this.h2 | 0, cr = cl, dl = this.h3 | 0, dr = dl, el = this.h4 | 0, er = el;
        // Instead of iterating 0 to 80, we split it into 5 groups
        // And use the groups in constants, functions, etc. Much simpler
        for(let group = 0; group < 5; group++){
            const rGroup = 4 - group;
            const hbl = Kl[group], hbr = Kr[group]; // prettier-ignore
            const rl = idxL[group], rr = idxR[group]; // prettier-ignore
            const sl = shiftsL[group], sr = shiftsR[group]; // prettier-ignore
            for(let i = 0; i < 16; i++){
                const tl = rotl(al + f(group, bl, cl, dl) + BUF[rl[i]] + hbl, sl[i]) + el | 0;
                al = el, el = dl, dl = rotl(cl, 10) | 0, cl = bl, bl = tl; // prettier-ignore
            }
            // 2 loops are 10% faster
            for(let i = 0; i < 16; i++){
                const tr = rotl(ar + f(rGroup, br, cr, dr) + BUF[rr[i]] + hbr, sr[i]) + er | 0;
                ar = er, er = dr, dr = rotl(cr, 10) | 0, cr = br, br = tr; // prettier-ignore
            }
        }
        // Add the compressed chunk to the current hash value
        this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar | 0, this.h4 + al + br | 0, this.h0 + bl + cr | 0);
    }
    roundClean() {
        BUF.fill(0);
    }
    destroy() {
        this.destroyed = true;
        this.buffer.fill(0);
        this.set(0, 0, 0, 0, 0);
    }
}
exports.RIPEMD160 = RIPEMD160;
/**
 * RIPEMD-160 - a hash function from 1990s.
 * @param message - msg that would be hashed
 */ exports.ripemd160 = (0, utils_js_1.wrapConstructor)(()=>new RIPEMD160()); //# sourceMappingURL=ripemd160.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/hashes/sha256.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sha224 = exports.sha256 = void 0;
const _sha2_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/_sha2.js [app-ssr] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)");
// SHA2-256 need to try 2^128 hashes to execute birthday attack.
// BTC network is doing 2^67 hashes/sec as per early 2023.
// Choice: a ? b : c
const Chi = (a, b, c)=>a & b ^ ~a & c;
// Majority function, true if any two inpust is true
const Maj = (a, b, c)=>a & b ^ a & c ^ b & c;
// Round constants:
// first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311)
// prettier-ignore
const SHA256_K = /* @__PURE__ */ new Uint32Array([
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
]);
// Initial state (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19):
// prettier-ignore
const IV = /* @__PURE__ */ new Uint32Array([
    0x6a09e667,
    0xbb67ae85,
    0x3c6ef372,
    0xa54ff53a,
    0x510e527f,
    0x9b05688c,
    0x1f83d9ab,
    0x5be0cd19
]);
// Temporary buffer, not used to store anything between runs
// Named this way because it matches specification.
const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class SHA256 extends _sha2_js_1.SHA2 {
    constructor(){
        super(64, 32, 8, false);
        // We cannot use array here since array allows indexing by variable
        // which means optimizer/compiler cannot use registers.
        this.A = IV[0] | 0;
        this.B = IV[1] | 0;
        this.C = IV[2] | 0;
        this.D = IV[3] | 0;
        this.E = IV[4] | 0;
        this.F = IV[5] | 0;
        this.G = IV[6] | 0;
        this.H = IV[7] | 0;
    }
    get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H
        ];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
        for(let i = 0; i < 16; i++, offset += 4)SHA256_W[i] = view.getUint32(offset, false);
        for(let i = 16; i < 64; i++){
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, utils_js_1.rotr)(W15, 7) ^ (0, utils_js_1.rotr)(W15, 18) ^ W15 >>> 3;
            const s1 = (0, utils_js_1.rotr)(W2, 17) ^ (0, utils_js_1.rotr)(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
        }
        // Compression function main loop, 64 rounds
        let { A, B, C, D, E, F, G, H } = this;
        for(let i = 0; i < 64; i++){
            const sigma1 = (0, utils_js_1.rotr)(E, 6) ^ (0, utils_js_1.rotr)(E, 11) ^ (0, utils_js_1.rotr)(E, 25);
            const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = (0, utils_js_1.rotr)(A, 2) ^ (0, utils_js_1.rotr)(A, 13) ^ (0, utils_js_1.rotr)(A, 22);
            const T2 = sigma0 + Maj(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
        }
        // Add the compressed chunk to the current hash value
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        E = E + this.E | 0;
        F = F + this.F | 0;
        G = G + this.G | 0;
        H = H + this.H | 0;
        this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
        SHA256_W.fill(0);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        this.buffer.fill(0);
    }
}
// Constants from https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf
class SHA224 extends SHA256 {
    constructor(){
        super();
        this.A = 0xc1059ed8 | 0;
        this.B = 0x367cd507 | 0;
        this.C = 0x3070dd17 | 0;
        this.D = 0xf70e5939 | 0;
        this.E = 0xffc00b31 | 0;
        this.F = 0x68581511 | 0;
        this.G = 0x64f98fa7 | 0;
        this.H = 0xbefa4fa4 | 0;
        this.outputLen = 28;
    }
}
/**
 * SHA2-256 hash function
 * @param message - data that would be hashed
 */ exports.sha256 = (0, utils_js_1.wrapConstructor)(()=>new SHA256());
exports.sha224 = (0, utils_js_1.wrapConstructor)(()=>new SHA224()); //# sourceMappingURL=sha256.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/hashes/hmac.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hmac = exports.HMAC = void 0;
const _assert_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/_assert.js [app-ssr] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)");
// HMAC (RFC 2104)
class HMAC extends utils_js_1.Hash {
    constructor(hash, _key){
        super();
        this.finished = false;
        this.destroyed = false;
        (0, _assert_js_1.hash)(hash);
        const key = (0, utils_js_1.toBytes)(_key);
        this.iHash = hash.create();
        if (typeof this.iHash.update !== 'function') throw new Error('Expected instance of class which extends utils.Hash');
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        // blockLen can be bigger than outputLen
        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
        for(let i = 0; i < pad.length; i++)pad[i] ^= 0x36;
        this.iHash.update(pad);
        // By doing update (processing of first block) of outer hash here we can re-use it between multiple calls via clone
        this.oHash = hash.create();
        // Undo internal XOR && apply outer XOR
        for(let i = 0; i < pad.length; i++)pad[i] ^= 0x36 ^ 0x5c;
        this.oHash.update(pad);
        pad.fill(0);
    }
    update(buf) {
        (0, _assert_js_1.exists)(this);
        this.iHash.update(buf);
        return this;
    }
    digestInto(out) {
        (0, _assert_js_1.exists)(this);
        (0, _assert_js_1.bytes)(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
    }
    digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
    }
    _cloneInto(to) {
        // Create new instance without calling constructor since key already in state and we don't know it.
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
    }
    destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
    }
}
exports.HMAC = HMAC;
/**
 * HMAC: RFC2104 message authentication code.
 * @param hash - function that would be used e.g. sha256
 * @param key - message key
 * @param message - message data
 */ const hmac = (hash, key, message)=>new HMAC(hash, key).update(message).digest();
exports.hmac = hmac;
exports.hmac.create = (hash, key)=>new HMAC(hash, key); //# sourceMappingURL=hmac.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/hashes/pbkdf2.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pbkdf2Async = exports.pbkdf2 = void 0;
const _assert_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/_assert.js [app-ssr] (ecmascript)");
const hmac_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/hmac.js [app-ssr] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)");
// Common prologue and epilogue for sync/async functions
function pbkdf2Init(hash, _password, _salt, _opts) {
    (0, _assert_js_1.hash)(hash);
    const opts = (0, utils_js_1.checkOpts)({
        dkLen: 32,
        asyncTick: 10
    }, _opts);
    const { c, dkLen, asyncTick } = opts;
    (0, _assert_js_1.number)(c);
    (0, _assert_js_1.number)(dkLen);
    (0, _assert_js_1.number)(asyncTick);
    if (c < 1) throw new Error('PBKDF2: iterations (c) should be >= 1');
    const password = (0, utils_js_1.toBytes)(_password);
    const salt = (0, utils_js_1.toBytes)(_salt);
    // DK = PBKDF2(PRF, Password, Salt, c, dkLen);
    const DK = new Uint8Array(dkLen);
    // U1 = PRF(Password, Salt + INT_32_BE(i))
    const PRF = hmac_js_1.hmac.create(hash, password);
    const PRFSalt = PRF._cloneInto().update(salt);
    return {
        c,
        dkLen,
        asyncTick,
        DK,
        PRF,
        PRFSalt
    };
}
function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
    PRF.destroy();
    PRFSalt.destroy();
    if (prfW) prfW.destroy();
    u.fill(0);
    return DK;
}
/**
 * PBKDF2-HMAC: RFC 2898 key derivation function
 * @param hash - hash function that would be used e.g. sha256
 * @param password - password from which a derived key is generated
 * @param salt - cryptographic salt
 * @param opts - {c, dkLen} where c is work factor and dkLen is output message size
 */ function pbkdf2(hash, password, salt, opts) {
    const { c, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
    let prfW; // Working copy
    const arr = new Uint8Array(4);
    const view = (0, utils_js_1.createView)(arr);
    const u = new Uint8Array(PRF.outputLen);
    // DK = T1 + T2 + ⋯ + Tdklen/hlen
    for(let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen){
        // Ti = F(Password, Salt, c, i)
        const Ti = DK.subarray(pos, pos + PRF.outputLen);
        view.setInt32(0, ti, false);
        // F(Password, Salt, c, i) = U1 ^ U2 ^ ⋯ ^ Uc
        // U1 = PRF(Password, Salt + INT_32_BE(i))
        (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
        Ti.set(u.subarray(0, Ti.length));
        for(let ui = 1; ui < c; ui++){
            // Uc = PRF(Password, Uc−1)
            PRF._cloneInto(prfW).update(u).digestInto(u);
            for(let i = 0; i < Ti.length; i++)Ti[i] ^= u[i];
        }
    }
    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
}
exports.pbkdf2 = pbkdf2;
async function pbkdf2Async(hash, password, salt, opts) {
    const { c, dkLen, asyncTick, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
    let prfW; // Working copy
    const arr = new Uint8Array(4);
    const view = (0, utils_js_1.createView)(arr);
    const u = new Uint8Array(PRF.outputLen);
    // DK = T1 + T2 + ⋯ + Tdklen/hlen
    for(let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen){
        // Ti = F(Password, Salt, c, i)
        const Ti = DK.subarray(pos, pos + PRF.outputLen);
        view.setInt32(0, ti, false);
        // F(Password, Salt, c, i) = U1 ^ U2 ^ ⋯ ^ Uc
        // U1 = PRF(Password, Salt + INT_32_BE(i))
        (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
        Ti.set(u.subarray(0, Ti.length));
        await (0, utils_js_1.asyncLoop)(c - 1, asyncTick, ()=>{
            // Uc = PRF(Password, Uc−1)
            PRF._cloneInto(prfW).update(u).digestInto(u);
            for(let i = 0; i < Ti.length; i++)Ti[i] ^= u[i];
        });
    }
    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
}
exports.pbkdf2Async = pbkdf2Async; //# sourceMappingURL=pbkdf2.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/hashes/scrypt.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scryptAsync = exports.scrypt = void 0;
const _assert_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/_assert.js [app-ssr] (ecmascript)");
const sha256_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/sha256.js [app-ssr] (ecmascript)");
const pbkdf2_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/pbkdf2.js [app-ssr] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)");
// RFC 7914 Scrypt KDF
// Left rotate for uint32
const rotl = (a, b)=>a << b | a >>> 32 - b;
// The main Scrypt loop: uses Salsa extensively.
// Six versions of the function were tried, this is the fastest one.
// prettier-ignore
function XorAndSalsa(prev, pi, input, ii, out, oi) {
    // Based on https://cr.yp.to/salsa20.html
    // Xor blocks
    let y00 = prev[pi++] ^ input[ii++], y01 = prev[pi++] ^ input[ii++];
    let y02 = prev[pi++] ^ input[ii++], y03 = prev[pi++] ^ input[ii++];
    let y04 = prev[pi++] ^ input[ii++], y05 = prev[pi++] ^ input[ii++];
    let y06 = prev[pi++] ^ input[ii++], y07 = prev[pi++] ^ input[ii++];
    let y08 = prev[pi++] ^ input[ii++], y09 = prev[pi++] ^ input[ii++];
    let y10 = prev[pi++] ^ input[ii++], y11 = prev[pi++] ^ input[ii++];
    let y12 = prev[pi++] ^ input[ii++], y13 = prev[pi++] ^ input[ii++];
    let y14 = prev[pi++] ^ input[ii++], y15 = prev[pi++] ^ input[ii++];
    // Save state to temporary variables (salsa)
    let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
    // Main loop (salsa)
    for(let i = 0; i < 8; i += 2){
        x04 ^= rotl(x00 + x12 | 0, 7);
        x08 ^= rotl(x04 + x00 | 0, 9);
        x12 ^= rotl(x08 + x04 | 0, 13);
        x00 ^= rotl(x12 + x08 | 0, 18);
        x09 ^= rotl(x05 + x01 | 0, 7);
        x13 ^= rotl(x09 + x05 | 0, 9);
        x01 ^= rotl(x13 + x09 | 0, 13);
        x05 ^= rotl(x01 + x13 | 0, 18);
        x14 ^= rotl(x10 + x06 | 0, 7);
        x02 ^= rotl(x14 + x10 | 0, 9);
        x06 ^= rotl(x02 + x14 | 0, 13);
        x10 ^= rotl(x06 + x02 | 0, 18);
        x03 ^= rotl(x15 + x11 | 0, 7);
        x07 ^= rotl(x03 + x15 | 0, 9);
        x11 ^= rotl(x07 + x03 | 0, 13);
        x15 ^= rotl(x11 + x07 | 0, 18);
        x01 ^= rotl(x00 + x03 | 0, 7);
        x02 ^= rotl(x01 + x00 | 0, 9);
        x03 ^= rotl(x02 + x01 | 0, 13);
        x00 ^= rotl(x03 + x02 | 0, 18);
        x06 ^= rotl(x05 + x04 | 0, 7);
        x07 ^= rotl(x06 + x05 | 0, 9);
        x04 ^= rotl(x07 + x06 | 0, 13);
        x05 ^= rotl(x04 + x07 | 0, 18);
        x11 ^= rotl(x10 + x09 | 0, 7);
        x08 ^= rotl(x11 + x10 | 0, 9);
        x09 ^= rotl(x08 + x11 | 0, 13);
        x10 ^= rotl(x09 + x08 | 0, 18);
        x12 ^= rotl(x15 + x14 | 0, 7);
        x13 ^= rotl(x12 + x15 | 0, 9);
        x14 ^= rotl(x13 + x12 | 0, 13);
        x15 ^= rotl(x14 + x13 | 0, 18);
    }
    // Write output (salsa)
    out[oi++] = y00 + x00 | 0;
    out[oi++] = y01 + x01 | 0;
    out[oi++] = y02 + x02 | 0;
    out[oi++] = y03 + x03 | 0;
    out[oi++] = y04 + x04 | 0;
    out[oi++] = y05 + x05 | 0;
    out[oi++] = y06 + x06 | 0;
    out[oi++] = y07 + x07 | 0;
    out[oi++] = y08 + x08 | 0;
    out[oi++] = y09 + x09 | 0;
    out[oi++] = y10 + x10 | 0;
    out[oi++] = y11 + x11 | 0;
    out[oi++] = y12 + x12 | 0;
    out[oi++] = y13 + x13 | 0;
    out[oi++] = y14 + x14 | 0;
    out[oi++] = y15 + x15 | 0;
}
function BlockMix(input, ii, out, oi, r) {
    // The block B is r 128-byte chunks (which is equivalent of 2r 64-byte chunks)
    let head = oi + 0;
    let tail = oi + 16 * r;
    for(let i = 0; i < 16; i++)out[tail + i] = input[ii + (2 * r - 1) * 16 + i]; // X ← B[2r−1]
    for(let i = 0; i < r; i++, head += 16, ii += 16){
        // We write odd & even Yi at same time. Even: 0bXXXXX0 Odd:  0bXXXXX1
        XorAndSalsa(out, tail, input, ii, out, head); // head[i] = Salsa(blockIn[2*i] ^ tail[i-1])
        if (i > 0) tail += 16; // First iteration overwrites tmp value in tail
        XorAndSalsa(out, head, input, ii += 16, out, tail); // tail[i] = Salsa(blockIn[2*i+1] ^ head[i])
    }
}
// Common prologue and epilogue for sync/async functions
function scryptInit(password, salt, _opts) {
    // Maxmem - 1GB+1KB by default
    const opts = (0, utils_js_1.checkOpts)({
        dkLen: 32,
        asyncTick: 10,
        maxmem: 1024 ** 3 + 1024
    }, _opts);
    const { N, r, p, dkLen, asyncTick, maxmem, onProgress } = opts;
    (0, _assert_js_1.number)(N);
    (0, _assert_js_1.number)(r);
    (0, _assert_js_1.number)(p);
    (0, _assert_js_1.number)(dkLen);
    (0, _assert_js_1.number)(asyncTick);
    (0, _assert_js_1.number)(maxmem);
    if (onProgress !== undefined && typeof onProgress !== 'function') throw new Error('progressCb should be function');
    const blockSize = 128 * r;
    const blockSize32 = blockSize / 4;
    if (N <= 1 || (N & N - 1) !== 0 || N >= 2 ** (blockSize / 8) || N > 2 ** 32) {
        // NOTE: we limit N to be less than 2**32 because of 32 bit variant of Integrify function
        // There is no JS engines that allows alocate more than 4GB per single Uint8Array for now, but can change in future.
        throw new Error('Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32');
    }
    if (p < 0 || p > (2 ** 32 - 1) * 32 / blockSize) {
        throw new Error('Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)');
    }
    if (dkLen < 0 || dkLen > (2 ** 32 - 1) * 32) {
        throw new Error('Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32');
    }
    const memUsed = blockSize * (N + p);
    if (memUsed > maxmem) {
        throw new Error(`Scrypt: parameters too large, ${memUsed} (128 * r * (N + p)) > ${maxmem} (maxmem)`);
    }
    // [B0...Bp−1] ← PBKDF2HMAC-SHA256(Passphrase, Salt, 1, blockSize*ParallelizationFactor)
    // Since it has only one iteration there is no reason to use async variant
    const B = (0, pbkdf2_js_1.pbkdf2)(sha256_js_1.sha256, password, salt, {
        c: 1,
        dkLen: blockSize * p
    });
    const B32 = (0, utils_js_1.u32)(B);
    // Re-used between parallel iterations. Array(iterations) of B
    const V = (0, utils_js_1.u32)(new Uint8Array(blockSize * N));
    const tmp = (0, utils_js_1.u32)(new Uint8Array(blockSize));
    let blockMixCb = ()=>{};
    if (onProgress) {
        const totalBlockMix = 2 * N * p;
        // Invoke callback if progress changes from 10.01 to 10.02
        // Allows to draw smooth progress bar on up to 8K screen
        const callbackPer = Math.max(Math.floor(totalBlockMix / 10000), 1);
        let blockMixCnt = 0;
        blockMixCb = ()=>{
            blockMixCnt++;
            if (onProgress && (!(blockMixCnt % callbackPer) || blockMixCnt === totalBlockMix)) onProgress(blockMixCnt / totalBlockMix);
        };
    }
    return {
        N,
        r,
        p,
        dkLen,
        blockSize32,
        V,
        B32,
        B,
        tmp,
        blockMixCb,
        asyncTick
    };
}
function scryptOutput(password, dkLen, B, V, tmp) {
    const res = (0, pbkdf2_js_1.pbkdf2)(sha256_js_1.sha256, password, B, {
        c: 1,
        dkLen
    });
    B.fill(0);
    V.fill(0);
    tmp.fill(0);
    return res;
}
/**
 * Scrypt KDF from RFC 7914.
 * @param password - pass
 * @param salt - salt
 * @param opts - parameters
 * - `N` is cpu/mem work factor (power of 2 e.g. 2**18)
 * - `r` is block size (8 is common), fine-tunes sequential memory read size and performance
 * - `p` is parallelization factor (1 is common)
 * - `dkLen` is output key length in bytes e.g. 32.
 * - `asyncTick` - (default: 10) max time in ms for which async function can block execution
 * - `maxmem` - (default: `1024 ** 3 + 1024` aka 1GB+1KB). A limit that the app could use for scrypt
 * - `onProgress` - callback function that would be executed for progress report
 * @returns Derived key
 */ function scrypt(password, salt, opts) {
    const { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb } = scryptInit(password, salt, opts);
    for(let pi = 0; pi < p; pi++){
        const Pi = blockSize32 * pi;
        for(let i = 0; i < blockSize32; i++)V[i] = B32[Pi + i]; // V[0] = B[i]
        for(let i = 0, pos = 0; i < N - 1; i++){
            BlockMix(V, pos, V, pos += blockSize32, r); // V[i] = BlockMix(V[i-1]);
            blockMixCb();
        }
        BlockMix(V, (N - 1) * blockSize32, B32, Pi, r); // Process last element
        blockMixCb();
        for(let i = 0; i < N; i++){
            // First u32 of the last 64-byte block (u32 is LE)
            const j = B32[Pi + blockSize32 - 16] % N; // j = Integrify(X) % iterations
            for(let k = 0; k < blockSize32; k++)tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k]; // tmp = B ^ V[j]
            BlockMix(tmp, 0, B32, Pi, r); // B = BlockMix(B ^ V[j])
            blockMixCb();
        }
    }
    return scryptOutput(password, dkLen, B, V, tmp);
}
exports.scrypt = scrypt;
/**
 * Scrypt KDF from RFC 7914.
 */ async function scryptAsync(password, salt, opts) {
    const { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb, asyncTick } = scryptInit(password, salt, opts);
    for(let pi = 0; pi < p; pi++){
        const Pi = blockSize32 * pi;
        for(let i = 0; i < blockSize32; i++)V[i] = B32[Pi + i]; // V[0] = B[i]
        let pos = 0;
        await (0, utils_js_1.asyncLoop)(N - 1, asyncTick, ()=>{
            BlockMix(V, pos, V, pos += blockSize32, r); // V[i] = BlockMix(V[i-1]);
            blockMixCb();
        });
        BlockMix(V, (N - 1) * blockSize32, B32, Pi, r); // Process last element
        blockMixCb();
        await (0, utils_js_1.asyncLoop)(N, asyncTick, ()=>{
            // First u32 of the last 64-byte block (u32 is LE)
            const j = B32[Pi + blockSize32 - 16] % N; // j = Integrify(X) % iterations
            for(let k = 0; k < blockSize32; k++)tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k]; // tmp = B ^ V[j]
            BlockMix(tmp, 0, B32, Pi, r); // B = BlockMix(B ^ V[j])
            blockMixCb();
        });
    }
    return scryptOutput(password, dkLen, B, V, tmp);
}
exports.scryptAsync = scryptAsync; //# sourceMappingURL=scrypt.js.map
}),
"[project]/node_modules/@paraspell/sdk-common/dist/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHAINS",
    ()=>CHAINS,
    "EXTERNAL_CHAINS",
    ()=>EXTERNAL_CHAINS,
    "PARACHAINS",
    ()=>PARACHAINS,
    "Parents",
    ()=>Parents,
    "RELAYCHAINS",
    ()=>RELAYCHAINS,
    "SUBSTRATE_CHAINS",
    ()=>SUBSTRATE_CHAINS,
    "Version",
    ()=>Version,
    "deepEqual",
    ()=>_deepEqual,
    "getJunctionValue",
    ()=>getJunctionValue,
    "hasJunction",
    ()=>hasJunction,
    "isBridge",
    ()=>isBridge,
    "isExternalChain",
    ()=>isExternalChain,
    "isPrimitive",
    ()=>isPrimitive,
    "isRelayChain",
    ()=>isRelayChain,
    "isSnowbridge",
    ()=>isSnowbridge,
    "isSubstrateBridge",
    ()=>isSubstrateBridge,
    "isSystemChain",
    ()=>isSystemChain,
    "isTLocation",
    ()=>isTLocation,
    "isTrustedChain",
    ()=>isTrustedChain,
    "replaceBigInt",
    ()=>replaceBigInt
]);
/**
 * Supported Polkadot / Kusama / Westend / Paseo parachains.
 */ var PARACHAINS = [
    // Polkadot chains
    'AssetHubPolkadot',
    'Acala',
    'Ajuna',
    'Astar',
    'BifrostPolkadot',
    'BridgeHubPolkadot',
    'Centrifuge',
    'Darwinia',
    'EnergyWebX',
    'Hydration',
    'Interlay',
    'Heima',
    'Jamton',
    'Moonbeam',
    'CoretimePolkadot',
    'Collectives',
    'Crust',
    'Manta',
    'Nodle',
    'NeuroWeb',
    'Pendulum',
    'Mythos',
    'Peaq',
    'PeoplePolkadot',
    'Unique',
    'Xode',
    // Kusama chains
    'AssetHubKusama',
    'BridgeHubKusama',
    'Karura',
    'Kintsugi',
    'Moonriver',
    'CoretimeKusama',
    'Encointer',
    'Altair',
    'Basilisk',
    'BifrostKusama',
    'CrustShadow',
    'Crab',
    'Laos',
    'Quartz',
    'PeopleKusama',
    'Shiden',
    'Zeitgeist',
    // Westend testnet chains
    'AssetHubWestend',
    'BridgeHubWestend',
    'CollectivesWestend',
    'CoretimeWestend',
    'Penpal',
    'PeopleWestend',
    // Paseo testnet chains
    'AjunaPaseo',
    'AssetHubPaseo',
    'BifrostPaseo',
    'BridgeHubPaseo',
    'CoretimePaseo',
    'EnergyWebXPaseo',
    'HeimaPaseo',
    'HydrationPaseo',
    'LaosPaseo',
    'NeuroWebPaseo',
    'PeoplePaseo',
    'ZeitgeistPaseo'
];
/**
 * Relaychains.
 */ var RELAYCHAINS = [
    'Polkadot',
    'Kusama',
    'Westend',
    'Paseo'
];
/**
 * All Substrate chains (parachains + relaychains).
 */ var SUBSTRATE_CHAINS = [].concat(PARACHAINS, RELAYCHAINS);
/**
 * External chains (non-Substrate/Polkadot ecosystem chains).
 */ var EXTERNAL_CHAINS = [
    'Ethereum',
    'EthereumTestnet'
];
/**
 * All supported chains.
 */ var CHAINS = [].concat(PARACHAINS, RELAYCHAINS, EXTERNAL_CHAINS);
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
            t && (r = t);
            var n = 0, F = function() {};
            return {
                s: F,
                n: function() {
                    return n >= r.length ? {
                        done: true
                    } : {
                        done: false,
                        value: r[n++]
                    };
                },
                e: function(r) {
                    throw r;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o, a = true, u = false;
    return {
        s: function() {
            t = t.call(r);
        },
        n: function() {
            var r = t.next();
            return a = r.done, r;
        },
        e: function(r) {
            u = true, o = r;
        },
        f: function() {
            try {
                a || null == t.return || t.return();
            } finally{
                if (u) throw o;
            }
        }
    };
}
function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = true, o = false;
        try {
            if (i = (t = t.call(r)).next, 0 === l) ;
            else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = true, n = r;
        } finally{
            try {
                if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
var isTLocation = function isTLocation(value) {
    return _typeof(value) === 'object' && value !== null && 'parents' in value && 'interior' in value;
};
var Parents;
(function(Parents) {
    Parents[Parents["ZERO"] = 0] = "ZERO";
    Parents[Parents["ONE"] = 1] = "ONE";
    Parents[Parents["TWO"] = 2] = "TWO";
})(Parents || (Parents = {}));
/**
 * The XCM version.
 */ var Version;
(function(Version) {
    Version["V3"] = "V3";
    Version["V4"] = "V4";
    Version["V5"] = "V5";
})(Version || (Version = {}));
/**
 * Determines whether a given chain is a relaychain.
 *
 * @param chain - The chain to check.
 * @returns True if the chain is a relaychain; otherwise, false.
 */ var isRelayChain = function isRelayChain(chain) {
    return RELAYCHAINS.includes(chain);
};
/**
 * Determines whether a given chain is an external chain.
 *
 * @param chain - The chain to check.
 * @returns True if the chain is an external chain; otherwise, false.
 */ var isExternalChain = function isExternalChain(chain) {
    return EXTERNAL_CHAINS.includes(chain);
};
/**
 * Checks if a given chain is a system chain.
 *
 * @param chain - The chain to check.
 * @returns True if the chain is a system chain; otherwise, false.
 */ var isSystemChain = function isSystemChain(chain) {
    var systemChains = [
        'AssetHubPolkadot',
        'AssetHubKusama',
        'AssetHubWestend',
        'AssetHubPaseo',
        'BridgeHubPolkadot',
        'BridgeHubKusama',
        'BridgeHubWestend',
        'BridgeHubPaseo',
        'PeoplePolkadot',
        'PeopleKusama',
        'PeopleWestend',
        'PeoplePaseo',
        'CoretimePolkadot',
        'CoretimeKusama',
        'CoretimeWestend',
        'CoretimePaseo',
        'Collectives',
        'Encointer',
        'CollectivesWestend'
    ];
    return systemChains.includes(chain) || isRelayChain(chain);
};
var isTrustedChain = function isTrustedChain(chain) {
    var trusted = [
        'Mythos',
        'Encointer'
    ];
    var isTrustedByAh = function isTrustedByAh(chain) {
        return trusted.includes(chain);
    };
    return isTrustedByAh(chain) || isSystemChain(chain);
};
var COMPATIBLE_BRIDGES = [
    [
        'AssetHubPolkadot',
        'AssetHubKusama'
    ]
];
var isSubstrateBridge = function isSubstrateBridge(origin, destination) {
    if (isExternalChain(origin) || isExternalChain(destination)) return false;
    if (!origin.startsWith('AssetHub') || !destination.startsWith('AssetHub')) return false;
    return COMPATIBLE_BRIDGES.some(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 2), a = _ref2[0], b = _ref2[1];
        return a === origin && b === destination || b === origin && a === destination;
    });
};
var isSnowbridge = function isSnowbridge(_origin, destination) {
    return isExternalChain(destination);
};
var isBridge = function isBridge(origin, destination) {
    return isSubstrateBridge(origin, destination) || isSnowbridge(origin, destination);
};
var isPrimitive = function isPrimitive(obj) {
    return obj !== Object(obj);
};
var _deepEqual = function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (isPrimitive(obj1) && isPrimitive(obj2)) return obj1 === obj2;
    if (_typeof(obj1) !== 'object' || obj1 === null || _typeof(obj2) !== 'object' || obj2 === null) {
        return false;
    }
    if (Array.isArray(obj1) !== Array.isArray(obj2)) {
        return false;
    }
    var obj1Keys = Object.keys(obj1).map(function(key) {
        return key.toLowerCase();
    });
    var obj2Keys = Object.keys(obj2).map(function(key) {
        return key.toLowerCase();
    });
    if (obj1Keys.length !== obj2Keys.length) return false;
    var _iterator = _createForOfIteratorHelper(obj1Keys), _step;
    try {
        var _loop = function _loop() {
            var key = _step.value;
            var keyInObj2 = obj2Keys.find(function(k) {
                return k === key;
            });
            if (!keyInObj2) return {
                v: false
            };
            var obj1Value = obj1[Object.keys(obj1).find(function(k) {
                return k.toLowerCase() === key;
            })];
            var obj2Value = obj2[Object.keys(obj2).find(function(k) {
                return k.toLowerCase() === key;
            })];
            if (!_deepEqual(obj1Value, obj2Value)) return {
                v: false
            };
        }, _ret;
        for(_iterator.s(); !(_step = _iterator.n()).done;){
            _ret = _loop();
            if (_ret) return _ret.v;
        }
    } catch (err) {
        _iterator.e(err);
    } finally{
        _iterator.f();
    }
    return true;
};
var flattenJunctions = function flattenJunctions(junctions) {
    if (junctions.Here !== undefined) {
        return [];
    }
    var result = [];
    if (junctions.X1) {
        if (Array.isArray(junctions.X1)) {
            result.push.apply(result, _toConsumableArray(junctions.X1));
        } else {
            result.push(junctions.X1);
        }
    }
    if (junctions.X2) result.push.apply(result, _toConsumableArray(junctions.X2));
    if (junctions.X3) result.push.apply(result, _toConsumableArray(junctions.X3));
    if (junctions.X4) result.push.apply(result, _toConsumableArray(junctions.X4));
    if (junctions.X5) result.push.apply(result, _toConsumableArray(junctions.X5));
    if (junctions.X6) result.push.apply(result, _toConsumableArray(junctions.X6));
    if (junctions.X7) result.push.apply(result, _toConsumableArray(junctions.X7));
    if (junctions.X8) result.push.apply(result, _toConsumableArray(junctions.X8));
    return result;
};
var findMatchingJunction = function findMatchingJunction(location, junctionType) {
    if (location.interior === 'Here') {
        return undefined;
    }
    var allJunctions = flattenJunctions(location.interior);
    return allJunctions.find(function(junction) {
        var keys = Object.keys(junction);
        if (keys.length !== 1) {
            return false;
        }
        var key = keys[0];
        return key === junctionType;
    });
};
var getJunctionValue = function getJunctionValue(location, junctionType) {
    var matchingJunction = findMatchingJunction(location, junctionType);
    return matchingJunction ? matchingJunction[junctionType] : undefined;
};
var hasJunction = function hasJunction(location, junctionType, junctionValue) {
    var matchingJunction = findMatchingJunction(location, junctionType);
    if (!matchingJunction) {
        return false;
    }
    if (junctionValue === undefined) {
        return true;
    }
    var jv = matchingJunction[junctionType];
    try {
        return JSON.stringify(jv) === JSON.stringify(junctionValue);
    } catch (_unused) {
        return jv === junctionValue;
    }
};
var replaceBigInt = function replaceBigInt(_key, value) {
    return typeof value === 'bigint' ? value.toString() : value;
};
;
}),
"[project]/node_modules/@paraspell/sdk-core/node_modules/@scure/base/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base16",
    ()=>base16,
    "base32",
    ()=>base32,
    "base32crockford",
    ()=>base32crockford,
    "base32hex",
    ()=>base32hex,
    "base32hexnopad",
    ()=>base32hexnopad,
    "base32nopad",
    ()=>base32nopad,
    "base58",
    ()=>base58,
    "base58check",
    ()=>base58check,
    "base58flickr",
    ()=>base58flickr,
    "base58xmr",
    ()=>base58xmr,
    "base58xrp",
    ()=>base58xrp,
    "base64",
    ()=>base64,
    "base64nopad",
    ()=>base64nopad,
    "base64url",
    ()=>base64url,
    "base64urlnopad",
    ()=>base64urlnopad,
    "bech32",
    ()=>bech32,
    "bech32m",
    ()=>bech32m,
    "bytes",
    ()=>bytes,
    "bytesToString",
    ()=>bytesToString,
    "createBase58check",
    ()=>createBase58check,
    "hex",
    ()=>hex,
    "str",
    ()=>str,
    "stringToBytes",
    ()=>stringToBytes,
    "utf8",
    ()=>utf8,
    "utils",
    ()=>utils
]);
/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function isBytes(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array';
}
/** Asserts something is Uint8Array. */ function abytes(b) {
    if (!isBytes(b)) throw new Error('Uint8Array expected');
}
function isArrayOf(isString, arr) {
    if (!Array.isArray(arr)) return false;
    if (arr.length === 0) return true;
    if (isString) {
        return arr.every((item)=>typeof item === 'string');
    } else {
        return arr.every((item)=>Number.isSafeInteger(item));
    }
}
function afn(input) {
    if (typeof input !== 'function') throw new Error('function expected');
    return true;
}
function astr(label, input) {
    if (typeof input !== 'string') throw new Error(`${label}: string expected`);
    return true;
}
function anumber(n) {
    if (!Number.isSafeInteger(n)) throw new Error(`invalid integer: ${n}`);
}
function aArr(input) {
    if (!Array.isArray(input)) throw new Error('array expected');
}
function astrArr(label, input) {
    if (!isArrayOf(true, input)) throw new Error(`${label}: array of strings expected`);
}
function anumArr(label, input) {
    if (!isArrayOf(false, input)) throw new Error(`${label}: array of numbers expected`);
}
/**
 * @__NO_SIDE_EFFECTS__
 */ function chain(...args) {
    const id = (a)=>a;
    // Wrap call in closure so JIT can inline calls
    const wrap = (a, b)=>(c)=>a(b(c));
    // Construct chain of args[-1].encode(args[-2].encode([...]))
    const encode = args.map((x)=>x.encode).reduceRight(wrap, id);
    // Construct chain of args[0].decode(args[1].decode(...))
    const decode = args.map((x)=>x.decode).reduce(wrap, id);
    return {
        encode,
        decode
    };
}
/**
 * Encodes integer radix representation to array of strings using alphabet and back.
 * Could also be array of strings.
 * @__NO_SIDE_EFFECTS__
 */ function alphabet(letters) {
    // mapping 1 to "b"
    const lettersA = typeof letters === 'string' ? letters.split('') : letters;
    const len = lettersA.length;
    astrArr('alphabet', lettersA);
    // mapping "b" to 1
    const indexes = new Map(lettersA.map((l, i)=>[
            l,
            i
        ]));
    return {
        encode: (digits)=>{
            aArr(digits);
            return digits.map((i)=>{
                if (!Number.isSafeInteger(i) || i < 0 || i >= len) throw new Error(`alphabet.encode: digit index outside alphabet "${i}". Allowed: ${letters}`);
                return lettersA[i];
            });
        },
        decode: (input)=>{
            aArr(input);
            return input.map((letter)=>{
                astr('alphabet.decode', letter);
                const i = indexes.get(letter);
                if (i === undefined) throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
                return i;
            });
        }
    };
}
/**
 * @__NO_SIDE_EFFECTS__
 */ function join(separator = '') {
    astr('join', separator);
    return {
        encode: (from)=>{
            astrArr('join.decode', from);
            return from.join(separator);
        },
        decode: (to)=>{
            astr('join.decode', to);
            return to.split(separator);
        }
    };
}
/**
 * Pad strings array so it has integer number of bits
 * @__NO_SIDE_EFFECTS__
 */ function padding(bits, chr = '=') {
    anumber(bits);
    astr('padding', chr);
    return {
        encode (data) {
            astrArr('padding.encode', data);
            while(data.length * bits % 8)data.push(chr);
            return data;
        },
        decode (input) {
            astrArr('padding.decode', input);
            let end = input.length;
            if (end * bits % 8) throw new Error('padding: invalid, string should have whole number of bytes');
            for(; end > 0 && input[end - 1] === chr; end--){
                const last = end - 1;
                const byte = last * bits;
                if (byte % 8 === 0) throw new Error('padding: invalid, string has too much padding');
            }
            return input.slice(0, end);
        }
    };
}
/**
 * @__NO_SIDE_EFFECTS__
 */ function normalize(fn) {
    afn(fn);
    return {
        encode: (from)=>from,
        decode: (to)=>fn(to)
    };
}
/**
 * Slow: O(n^2) time complexity
 */ function convertRadix(data, from, to) {
    // base 1 is impossible
    if (from < 2) throw new Error(`convertRadix: invalid from=${from}, base cannot be less than 2`);
    if (to < 2) throw new Error(`convertRadix: invalid to=${to}, base cannot be less than 2`);
    aArr(data);
    if (!data.length) return [];
    let pos = 0;
    const res = [];
    const digits = Array.from(data, (d)=>{
        anumber(d);
        if (d < 0 || d >= from) throw new Error(`invalid integer: ${d}`);
        return d;
    });
    const dlen = digits.length;
    while(true){
        let carry = 0;
        let done = true;
        for(let i = pos; i < dlen; i++){
            const digit = digits[i];
            const fromCarry = from * carry;
            const digitBase = fromCarry + digit;
            if (!Number.isSafeInteger(digitBase) || fromCarry / from !== carry || digitBase - digit !== fromCarry) {
                throw new Error('convertRadix: carry overflow');
            }
            const div = digitBase / to;
            carry = digitBase % to;
            const rounded = Math.floor(div);
            digits[i] = rounded;
            if (!Number.isSafeInteger(rounded) || rounded * to + carry !== digitBase) throw new Error('convertRadix: carry overflow');
            if (!done) continue;
            else if (!rounded) pos = i;
            else done = false;
        }
        res.push(carry);
        if (done) break;
    }
    for(let i = 0; i < data.length - 1 && data[i] === 0; i++)res.push(0);
    return res.reverse();
}
const gcd = (a, b)=>b === 0 ? a : gcd(b, a % b);
const radix2carry = /* @__NO_SIDE_EFFECTS__ */ (from, to)=>from + (to - gcd(from, to));
const powers = /* @__PURE__ */ (()=>{
    let res = [];
    for(let i = 0; i < 40; i++)res.push(2 ** i);
    return res;
})();
/**
 * Implemented with numbers, because BigInt is 5x slower
 */ function convertRadix2(data, from, to, padding) {
    aArr(data);
    if (from <= 0 || from > 32) throw new Error(`convertRadix2: wrong from=${from}`);
    if (to <= 0 || to > 32) throw new Error(`convertRadix2: wrong to=${to}`);
    if (radix2carry(from, to) > 32) {
        throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${radix2carry(from, to)}`);
    }
    let carry = 0;
    let pos = 0; // bitwise position in current element
    const max = powers[from];
    const mask = powers[to] - 1;
    const res = [];
    for (const n of data){
        anumber(n);
        if (n >= max) throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
        carry = carry << from | n;
        if (pos + from > 32) throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
        pos += from;
        for(; pos >= to; pos -= to)res.push((carry >> pos - to & mask) >>> 0);
        const pow = powers[pos];
        if (pow === undefined) throw new Error('invalid carry');
        carry &= pow - 1; // clean carry, otherwise it will cause overflow
    }
    carry = carry << to - pos & mask;
    if (!padding && pos >= from) throw new Error('Excess padding');
    if (!padding && carry > 0) throw new Error(`Non-zero padding: ${carry}`);
    if (padding && pos > 0) res.push(carry >>> 0);
    return res;
}
/**
 * @__NO_SIDE_EFFECTS__
 */ function radix(num) {
    anumber(num);
    const _256 = 2 ** 8;
    return {
        encode: (bytes)=>{
            if (!isBytes(bytes)) throw new Error('radix.encode input should be Uint8Array');
            return convertRadix(Array.from(bytes), _256, num);
        },
        decode: (digits)=>{
            anumArr('radix.decode', digits);
            return Uint8Array.from(convertRadix(digits, num, _256));
        }
    };
}
/**
 * If both bases are power of same number (like `2**8 <-> 2**64`),
 * there is a linear algorithm. For now we have implementation for power-of-two bases only.
 * @__NO_SIDE_EFFECTS__
 */ function radix2(bits, revPadding = false) {
    anumber(bits);
    if (bits <= 0 || bits > 32) throw new Error('radix2: bits should be in (0..32]');
    if (radix2carry(8, bits) > 32 || radix2carry(bits, 8) > 32) throw new Error('radix2: carry overflow');
    return {
        encode: (bytes)=>{
            if (!isBytes(bytes)) throw new Error('radix2.encode input should be Uint8Array');
            return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
        },
        decode: (digits)=>{
            anumArr('radix2.decode', digits);
            return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
        }
    };
}
function unsafeWrapper(fn) {
    afn(fn);
    return function(...args) {
        try {
            return fn.apply(null, args);
        } catch (e) {}
    };
}
function checksum(len, fn) {
    anumber(len);
    afn(fn);
    return {
        encode (data) {
            if (!isBytes(data)) throw new Error('checksum.encode: input should be Uint8Array');
            const sum = fn(data).slice(0, len);
            const res = new Uint8Array(data.length + len);
            res.set(data);
            res.set(sum, data.length);
            return res;
        },
        decode (data) {
            if (!isBytes(data)) throw new Error('checksum.decode: input should be Uint8Array');
            const payload = data.slice(0, -len);
            const oldChecksum = data.slice(-len);
            const newChecksum = fn(payload).slice(0, len);
            for(let i = 0; i < len; i++)if (newChecksum[i] !== oldChecksum[i]) throw new Error('Invalid checksum');
            return payload;
        }
    };
}
const utils = {
    alphabet,
    chain,
    checksum,
    convertRadix,
    convertRadix2,
    radix,
    radix2,
    join,
    padding
};
const base16 = chain(radix2(4), alphabet('0123456789ABCDEF'), join(''));
const base32 = chain(radix2(5), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), padding(5), join(''));
const base32nopad = chain(radix2(5), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), join(''));
const base32hex = chain(radix2(5), alphabet('0123456789ABCDEFGHIJKLMNOPQRSTUV'), padding(5), join(''));
const base32hexnopad = chain(radix2(5), alphabet('0123456789ABCDEFGHIJKLMNOPQRSTUV'), join(''));
const base32crockford = chain(radix2(5), alphabet('0123456789ABCDEFGHJKMNPQRSTVWXYZ'), join(''), normalize((s)=>s.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1')));
// Built-in base64 conversion https://caniuse.com/mdn-javascript_builtins_uint8array_frombase64
// prettier-ignore
const hasBase64Builtin = /* @__PURE__ */ (()=>typeof Uint8Array.from([]).toBase64 === 'function' && typeof Uint8Array.fromBase64 === 'function')();
const decodeBase64Builtin = (s, isUrl)=>{
    astr('base64', s);
    const re = isUrl ? /^[A-Za-z0-9=_-]+$/ : /^[A-Za-z0-9=+/]+$/;
    const alphabet = isUrl ? 'base64url' : 'base64';
    if (s.length > 0 && !re.test(s)) throw new Error('invalid base64');
    return Uint8Array.fromBase64(s, {
        alphabet,
        lastChunkHandling: 'strict'
    });
};
const base64 = hasBase64Builtin ? {
    encode (b) {
        abytes(b);
        return b.toBase64();
    },
    decode (s) {
        return decodeBase64Builtin(s, false);
    }
} : chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'), padding(6), join(''));
const base64nopad = chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'), join(''));
const base64url = hasBase64Builtin ? {
    encode (b) {
        abytes(b);
        return b.toBase64({
            alphabet: 'base64url'
        });
    },
    decode (s) {
        return decodeBase64Builtin(s, true);
    }
} : chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'), padding(6), join(''));
const base64urlnopad = chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'), join(''));
// base58 code
// -----------
const genBase58 = /* @__NO_SIDE_EFFECTS__ */ (abc)=>chain(radix(58), alphabet(abc), join(''));
const base58 = genBase58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
const base58flickr = genBase58('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ');
const base58xrp = genBase58('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz');
// Data len (index) -> encoded block len
const XMR_BLOCK_LEN = [
    0,
    2,
    3,
    5,
    6,
    7,
    9,
    10,
    11
];
const base58xmr = {
    encode (data) {
        let res = '';
        for(let i = 0; i < data.length; i += 8){
            const block = data.subarray(i, i + 8);
            res += base58.encode(block).padStart(XMR_BLOCK_LEN[block.length], '1');
        }
        return res;
    },
    decode (str) {
        let res = [];
        for(let i = 0; i < str.length; i += 11){
            const slice = str.slice(i, i + 11);
            const blockLen = XMR_BLOCK_LEN.indexOf(slice.length);
            const block = base58.decode(slice);
            for(let j = 0; j < block.length - blockLen; j++){
                if (block[j] !== 0) throw new Error('base58xmr: wrong padding');
            }
            res = res.concat(Array.from(block.slice(block.length - blockLen)));
        }
        return Uint8Array.from(res);
    }
};
const createBase58check = (sha256)=>chain(checksum(4, (data)=>sha256(sha256(data))), base58);
const base58check = createBase58check;
const BECH_ALPHABET = chain(alphabet('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), join(''));
const POLYMOD_GENERATORS = [
    0x3b6a57b2,
    0x26508e6d,
    0x1ea119fa,
    0x3d4233dd,
    0x2a1462b3
];
function bech32Polymod(pre) {
    const b = pre >> 25;
    let chk = (pre & 0x1ffffff) << 5;
    for(let i = 0; i < POLYMOD_GENERATORS.length; i++){
        if ((b >> i & 1) === 1) chk ^= POLYMOD_GENERATORS[i];
    }
    return chk;
}
function bechChecksum(prefix, words, encodingConst = 1) {
    const len = prefix.length;
    let chk = 1;
    for(let i = 0; i < len; i++){
        const c = prefix.charCodeAt(i);
        if (c < 33 || c > 126) throw new Error(`Invalid prefix (${prefix})`);
        chk = bech32Polymod(chk) ^ c >> 5;
    }
    chk = bech32Polymod(chk);
    for(let i = 0; i < len; i++)chk = bech32Polymod(chk) ^ prefix.charCodeAt(i) & 0x1f;
    for (let v of words)chk = bech32Polymod(chk) ^ v;
    for(let i = 0; i < 6; i++)chk = bech32Polymod(chk);
    chk ^= encodingConst;
    return BECH_ALPHABET.encode(convertRadix2([
        chk % powers[30]
    ], 30, 5, false));
}
/**
 * @__NO_SIDE_EFFECTS__
 */ function genBech32(encoding) {
    const ENCODING_CONST = encoding === 'bech32' ? 1 : 0x2bc830a3;
    const _words = radix2(5);
    const fromWords = _words.decode;
    const toWords = _words.encode;
    const fromWordsUnsafe = unsafeWrapper(fromWords);
    function encode(prefix, words, limit = 90) {
        astr('bech32.encode prefix', prefix);
        if (isBytes(words)) words = Array.from(words);
        anumArr('bech32.encode', words);
        const plen = prefix.length;
        if (plen === 0) throw new TypeError(`Invalid prefix length ${plen}`);
        const actualLength = plen + 7 + words.length;
        if (limit !== false && actualLength > limit) throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
        const lowered = prefix.toLowerCase();
        const sum = bechChecksum(lowered, words, ENCODING_CONST);
        return `${lowered}1${BECH_ALPHABET.encode(words)}${sum}`;
    }
    function decode(str, limit = 90) {
        astr('bech32.decode input', str);
        const slen = str.length;
        if (slen < 8 || limit !== false && slen > limit) throw new TypeError(`invalid string length: ${slen} (${str}). Expected (8..${limit})`);
        // don't allow mixed case
        const lowered = str.toLowerCase();
        if (str !== lowered && str !== str.toUpperCase()) throw new Error(`String must be lowercase or uppercase`);
        const sepIndex = lowered.lastIndexOf('1');
        if (sepIndex === 0 || sepIndex === -1) throw new Error(`Letter "1" must be present between prefix and data only`);
        const prefix = lowered.slice(0, sepIndex);
        const data = lowered.slice(sepIndex + 1);
        if (data.length < 6) throw new Error('Data must be at least 6 characters long');
        const words = BECH_ALPHABET.decode(data).slice(0, -6);
        const sum = bechChecksum(prefix, words, ENCODING_CONST);
        if (!data.endsWith(sum)) throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
        return {
            prefix,
            words
        };
    }
    const decodeUnsafe = unsafeWrapper(decode);
    function decodeToBytes(str) {
        const { prefix, words } = decode(str, false);
        return {
            prefix,
            words,
            bytes: fromWords(words)
        };
    }
    function encodeFromBytes(prefix, bytes) {
        return encode(prefix, toWords(bytes));
    }
    return {
        encode,
        decode,
        encodeFromBytes,
        decodeToBytes,
        decodeUnsafe,
        fromWords,
        fromWordsUnsafe,
        toWords
    };
}
const bech32 = genBech32('bech32');
const bech32m = genBech32('bech32m');
const utf8 = {
    encode: (data)=>new TextDecoder().decode(data),
    decode: (str)=>new TextEncoder().encode(str)
};
// Built-in hex conversion https://caniuse.com/mdn-javascript_builtins_uint8array_fromhex
// prettier-ignore
const hasHexBuiltin = /* @__PURE__ */ (()=>typeof Uint8Array.from([]).toHex === 'function' && typeof Uint8Array.fromHex === 'function')();
// prettier-ignore
const hexBuiltin = {
    encode (data) {
        abytes(data);
        return data.toHex();
    },
    decode (s) {
        astr('hex', s);
        return Uint8Array.fromHex(s);
    }
};
const hex = hasHexBuiltin ? hexBuiltin : chain(radix2(4), alphabet('0123456789abcdef'), join(''), normalize((s)=>{
    if (typeof s !== 'string' || s.length % 2 !== 0) throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
    return s.toLowerCase();
}));
// prettier-ignore
const CODERS = {
    utf8,
    hex,
    base16,
    base32,
    base64,
    base64url,
    base58,
    base58xmr
};
const coderTypeError = 'Invalid encoding type. Available types: utf8, hex, base16, base32, base64, base64url, base58, base58xmr';
const bytesToString = (type, bytes)=>{
    if (typeof type !== 'string' || !CODERS.hasOwnProperty(type)) throw new TypeError(coderTypeError);
    if (!isBytes(bytes)) throw new TypeError('bytesToString() expects Uint8Array');
    return CODERS[type].encode(bytes);
};
const str = bytesToString; // as in python, but for bytes only
const stringToBytes = (type, str)=>{
    if (!CODERS.hasOwnProperty(type)) throw new TypeError(coderTypeError);
    if (typeof str !== 'string') throw new TypeError('stringToBytes() expects string');
    return CODERS[type].decode(str);
};
const bytes = stringToBytes; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/viem/_esm/actions/getContract.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getContract",
    ()=>getContract,
    "getEventParameters",
    ()=>getEventParameters,
    "getFunctionParameters",
    ()=>getFunctionParameters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$getAction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/getAction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$createContractEventFilter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/actions/public/createContractEventFilter.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$estimateContractGas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/actions/public/estimateContractGas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$getContractEvents$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/actions/public/getContractEvents.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$readContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/actions/public/readContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$simulateContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/actions/public/simulateContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$watchContractEvent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/actions/public/watchContractEvent.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$wallet$2f$writeContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/actions/wallet/writeContract.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
function getContract({ abi, address, client: client_ }) {
    const client = client_;
    const [publicClient, walletClient] = (()=>{
        if (!client) return [
            undefined,
            undefined
        ];
        if ('public' in client && 'wallet' in client) return [
            client.public,
            client.wallet
        ];
        if ('public' in client) return [
            client.public,
            undefined
        ];
        if ('wallet' in client) return [
            undefined,
            client.wallet
        ];
        return [
            client,
            client
        ];
    })();
    const hasPublicClient = publicClient !== undefined && publicClient !== null;
    const hasWalletClient = walletClient !== undefined && walletClient !== null;
    const contract = {};
    let hasReadFunction = false;
    let hasWriteFunction = false;
    let hasEvent = false;
    for (const item of abi){
        if (item.type === 'function') if (item.stateMutability === 'view' || item.stateMutability === 'pure') hasReadFunction = true;
        else hasWriteFunction = true;
        else if (item.type === 'event') hasEvent = true;
        // Exit early if all flags are `true`
        if (hasReadFunction && hasWriteFunction && hasEvent) break;
    }
    if (hasPublicClient) {
        if (hasReadFunction) contract.read = new Proxy({}, {
            get (_, functionName) {
                return (...parameters)=>{
                    const { args, options } = getFunctionParameters(parameters);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$getAction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAction"])(publicClient, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$readContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readContract"], 'readContract')({
                        abi,
                        address,
                        functionName,
                        args,
                        ...options
                    });
                };
            }
        });
        if (hasWriteFunction) contract.simulate = new Proxy({}, {
            get (_, functionName) {
                return (...parameters)=>{
                    const { args, options } = getFunctionParameters(parameters);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$getAction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAction"])(publicClient, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$simulateContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["simulateContract"], 'simulateContract')({
                        abi,
                        address,
                        functionName,
                        args,
                        ...options
                    });
                };
            }
        });
        if (hasEvent) {
            contract.createEventFilter = new Proxy({}, {
                get (_, eventName) {
                    return (...parameters)=>{
                        const abiEvent = abi.find((x)=>x.type === 'event' && x.name === eventName);
                        const { args, options } = getEventParameters(parameters, abiEvent);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$getAction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAction"])(publicClient, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$createContractEventFilter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContractEventFilter"], 'createContractEventFilter')({
                            abi,
                            address,
                            eventName,
                            args,
                            ...options
                        });
                    };
                }
            });
            contract.getEvents = new Proxy({}, {
                get (_, eventName) {
                    return (...parameters)=>{
                        const abiEvent = abi.find((x)=>x.type === 'event' && x.name === eventName);
                        const { args, options } = getEventParameters(parameters, abiEvent);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$getAction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAction"])(publicClient, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$getContractEvents$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContractEvents"], 'getContractEvents')({
                            abi,
                            address,
                            eventName,
                            args,
                            ...options
                        });
                    };
                }
            });
            contract.watchEvent = new Proxy({}, {
                get (_, eventName) {
                    return (...parameters)=>{
                        const abiEvent = abi.find((x)=>x.type === 'event' && x.name === eventName);
                        const { args, options } = getEventParameters(parameters, abiEvent);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$getAction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAction"])(publicClient, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$watchContractEvent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["watchContractEvent"], 'watchContractEvent')({
                            abi,
                            address,
                            eventName,
                            args,
                            ...options
                        });
                    };
                }
            });
        }
    }
    if (hasWalletClient) {
        if (hasWriteFunction) contract.write = new Proxy({}, {
            get (_, functionName) {
                return (...parameters)=>{
                    const { args, options } = getFunctionParameters(parameters);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$getAction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAction"])(walletClient, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$wallet$2f$writeContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeContract"], 'writeContract')({
                        abi,
                        address,
                        functionName,
                        args,
                        ...options
                    });
                };
            }
        });
    }
    if (hasPublicClient || hasWalletClient) {
        if (hasWriteFunction) contract.estimateGas = new Proxy({}, {
            get (_, functionName) {
                return (...parameters)=>{
                    const { args, options } = getFunctionParameters(parameters);
                    const client = publicClient ?? walletClient;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$getAction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAction"])(client, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$actions$2f$public$2f$estimateContractGas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateContractGas"], 'estimateContractGas')({
                        abi,
                        address,
                        functionName,
                        args,
                        ...options,
                        account: options.account ?? walletClient.account
                    });
                };
            }
        });
    }
    contract.address = address;
    contract.abi = abi;
    return contract;
}
function getFunctionParameters(values) {
    const hasArgs = values.length && Array.isArray(values[0]);
    const args = hasArgs ? values[0] : [];
    const options = (hasArgs ? values[1] : values[0]) ?? {};
    return {
        args,
        options
    };
}
function getEventParameters(values, abiEvent) {
    let hasArgs = false;
    // If first item is array, must be `args`
    if (Array.isArray(values[0])) hasArgs = true;
    else if (values.length === 1) {
        // if event has indexed inputs, must have `args`
        hasArgs = abiEvent.inputs.some((x)=>x.indexed);
    // If there are two items in array, must have `args`
    } else if (values.length === 2) {
        hasArgs = true;
    }
    const args = hasArgs ? values[0] : undefined;
    const options = (hasArgs ? values[1] : values[0]) ?? {};
    return {
        args,
        options
    };
} //# sourceMappingURL=getContract.js.map
}),
"[project]/node_modules/viem/_esm/clients/createPublicClient.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPublicClient",
    ()=>createPublicClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/createClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$decorators$2f$public$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/decorators/public.js [app-ssr] (ecmascript)");
;
;
function createPublicClient(parameters) {
    const { key = 'public', name = 'Public Client' } = parameters;
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])({
        ...parameters,
        key,
        name,
        type: 'publicClient'
    });
    return client.extend(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$decorators$2f$public$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publicActions"]);
} //# sourceMappingURL=createPublicClient.js.map
}),
"[project]/node_modules/viem/_esm/errors/unit.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidDecimalNumberError",
    ()=>InvalidDecimalNumberError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/errors/base.js [app-ssr] (ecmascript)");
;
class InvalidDecimalNumberError extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ value }){
        super(`Number \`${value}\` is not a valid decimal number.`, {
            name: 'InvalidDecimalNumberError'
        });
    }
} //# sourceMappingURL=unit.js.map
}),
"[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseUnits",
    ()=>parseUnits
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$unit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/errors/unit.js [app-ssr] (ecmascript)");
;
function parseUnits(value, decimals) {
    if (!/^(-?)([0-9]*)\.?([0-9]*)$/.test(value)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$unit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvalidDecimalNumberError"]({
        value
    });
    let [integer, fraction = '0'] = value.split('.');
    const negative = integer.startsWith('-');
    if (negative) integer = integer.slice(1);
    // trim trailing zeros.
    fraction = fraction.replace(/(0+)$/, '');
    // round off if the fraction is larger than the number of decimals.
    if (decimals === 0) {
        if (Math.round(Number(`.${fraction}`)) === 1) integer = `${BigInt(integer) + 1n}`;
        fraction = '';
    } else if (fraction.length > decimals) {
        const [left, unit, right] = [
            fraction.slice(0, decimals - 1),
            fraction.slice(decimals - 1, decimals),
            fraction.slice(decimals)
        ];
        const rounded = Math.round(Number(`${unit}.${right}`));
        if (rounded > 9) fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, '0');
        else fraction = `${left}${rounded}`;
        if (fraction.length > decimals) {
            fraction = fraction.slice(1);
            integer = `${BigInt(integer) + 1n}`;
        }
        fraction = fraction.slice(0, decimals);
    } else {
        fraction = fraction.padEnd(decimals, '0');
    }
    return BigInt(`${negative ? '-' : ''}${integer}${fraction}`);
} //# sourceMappingURL=parseUnits.js.map
}),
"[project]/node_modules/viem/_esm/chains/definitions/moonbeam.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "moonbeam",
    ()=>moonbeam
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$chain$2f$defineChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/chain/defineChain.js [app-ssr] (ecmascript)");
;
const moonbeam = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$chain$2f$defineChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineChain"])({
    id: 1284,
    name: 'Moonbeam',
    nativeCurrency: {
        decimals: 18,
        name: 'GLMR',
        symbol: 'GLMR'
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.api.moonbeam.network'
            ],
            webSocket: [
                'wss://wss.api.moonbeam.network'
            ]
        }
    },
    blockExplorers: {
        default: {
            name: 'Moonscan',
            url: 'https://moonscan.io',
            apiUrl: 'https://api-moonbeam.moonscan.io/api'
        }
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 609002
        }
    },
    testnet: false
}); //# sourceMappingURL=moonbeam.js.map
}),
"[project]/node_modules/viem/_esm/chains/definitions/moonriver.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "moonriver",
    ()=>moonriver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$chain$2f$defineChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/chain/defineChain.js [app-ssr] (ecmascript)");
;
const moonriver = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$chain$2f$defineChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineChain"])({
    id: 1285,
    name: 'Moonriver',
    nativeCurrency: {
        decimals: 18,
        name: 'MOVR',
        symbol: 'MOVR'
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.api.moonriver.moonbeam.network'
            ],
            webSocket: [
                'wss://wss.api.moonriver.moonbeam.network'
            ]
        }
    },
    blockExplorers: {
        default: {
            name: 'Moonscan',
            url: 'https://moonriver.moonscan.io',
            apiUrl: 'https://api-moonriver.moonscan.io/api'
        }
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 1597904
        }
    },
    testnet: false
}); //# sourceMappingURL=moonriver.js.map
}),
"[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseEther",
    ()=>parseEther
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$unit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/constants/unit.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-ssr] (ecmascript)");
;
;
function parseEther(ether, unit = 'wei') {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUnits"])(ether, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$unit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["etherUnits"][unit]);
} //# sourceMappingURL=parseEther.js.map
}),
"[project]/node_modules/@paraspell/pallets/dist/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ASSETS_PALLETS",
    ()=>ASSETS_PALLETS,
    "CROSSCHAIN_PALLETS",
    ()=>CROSSCHAIN_PALLETS,
    "OTHER_PALLETS",
    ()=>OTHER_PALLETS,
    "PALLETS",
    ()=>PALLETS,
    "getDefaultPallet",
    ()=>getDefaultPallet,
    "getNativeAssetsPallet",
    ()=>getNativeAssetsPallet,
    "getOtherAssetsPallets",
    ()=>getOtherAssetsPallets,
    "getPalletIndex",
    ()=>getPalletIndex,
    "getSupportedPallets",
    ()=>getSupportedPallets,
    "getSupportedPalletsDetails",
    ()=>getSupportedPalletsDetails
]);
var CROSSCHAIN_PALLETS = [
    'XTokens',
    'PolkadotXcm',
    'XcmPallet'
];
var ASSETS_PALLETS = [
    'Balances',
    'Tokens',
    'Currencies',
    'Assets',
    'ForeignAssets',
    'AssetManager',
    'System',
    'Fungibles',
    'OrmlTokens'
];
var OTHER_PALLETS = [
    'Utility'
];
var PALLETS = [].concat(CROSSCHAIN_PALLETS, ASSETS_PALLETS, OTHER_PALLETS);
var AssetHubPolkadot = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        },
        {
            name: "Assets",
            index: 50
        },
        {
            name: "ForeignAssets",
            index: 53
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets",
        "ForeignAssets"
    ]
};
var Acala = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "Currencies",
            index: 12
        },
        {
            name: "PolkadotXcm",
            index: 51
        },
        {
            name: "XTokens",
            index: 54
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Currencies",
        "Tokens"
    ]
};
var Astar = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 31
        },
        {
            name: "Assets",
            index: 36
        },
        {
            name: "PolkadotXcm",
            index: 51
        },
        {
            name: "XTokens",
            index: 55
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets"
    ]
};
var BifrostPolkadot = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 41
        },
        {
            name: "Tokens",
            index: 71
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Tokens",
        "Currencies"
    ]
};
var CoretimeKusama = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var Centrifuge = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 20
        },
        {
            name: "Tokens",
            index: 98
        },
        {
            name: "PolkadotXcm",
            index: 121
        },
        {
            name: "XTokens",
            index: 124
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Tokens",
        "OrmlTokens"
    ]
};
var Darwinia = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 5
        },
        {
            name: "Assets",
            index: 7
        },
        {
            name: "PolkadotXcm",
            index: 33
        },
        {
            name: "AssetManager",
            index: 45
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets",
        "AssetManager"
    ]
};
var Hydration = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 7
        },
        {
            name: "Tokens",
            index: 77
        },
        {
            name: "Currencies",
            index: 79
        },
        {
            name: "PolkadotXcm",
            index: 107
        },
        {
            name: "XTokens",
            index: 137
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Currencies",
        "Tokens"
    ]
};
var Interlay = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Tokens",
            index: 21
        },
        {
            name: "PolkadotXcm",
            index: 91
        },
        {
            name: "XTokens",
            index: 94
        }
    ],
    nativeAssets: "Tokens",
    otherAssets: [
        "Tokens"
    ]
};
var Heima = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 51
        },
        {
            name: "Assets",
            index: 56
        },
        {
            name: "AssetManager",
            index: 64
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets",
        "AssetManager"
    ]
};
var Moonbeam = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 103
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "System"
    ]
};
var AssetHubKusama = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        },
        {
            name: "Assets",
            index: 50
        },
        {
            name: "ForeignAssets",
            index: 53
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets",
        "ForeignAssets"
    ]
};
var Encointer = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var Altair = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 20
        },
        {
            name: "Tokens",
            index: 97
        },
        {
            name: "PolkadotXcm",
            index: 121
        },
        {
            name: "XTokens",
            index: 124
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Tokens",
        "OrmlTokens"
    ]
};
var Basilisk = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 2
        },
        {
            name: "PolkadotXcm",
            index: 52
        },
        {
            name: "Currencies",
            index: 150
        },
        {
            name: "Tokens",
            index: 151
        },
        {
            name: "XTokens",
            index: 154
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Currencies",
        "Tokens"
    ]
};
var BifrostKusama = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 41
        },
        {
            name: "Tokens",
            index: 71
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Tokens",
        "Currencies"
    ]
};
var CrustShadow = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 2
        },
        {
            name: "PolkadotXcm",
            index: 13
        },
        {
            name: "Assets",
            index: 124
        },
        {
            name: "XTokens",
            index: 125
        },
        {
            name: "AssetManager",
            index: 126
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets",
        "AssetManager"
    ]
};
var Crab = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 5
        },
        {
            name: "Assets",
            index: 7
        },
        {
            name: "PolkadotXcm",
            index: 33
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets"
    ]
};
var Karura = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "Currencies",
            index: 12
        },
        {
            name: "PolkadotXcm",
            index: 51
        },
        {
            name: "XTokens",
            index: 54
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Currencies",
        "Tokens"
    ]
};
var Kintsugi = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Tokens",
            index: 21
        },
        {
            name: "PolkadotXcm",
            index: 91
        },
        {
            name: "XTokens",
            index: 94
        }
    ],
    nativeAssets: "Tokens",
    otherAssets: [
        "Tokens"
    ]
};
var Moonriver = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 103
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "System"
    ]
};
var Quartz = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 30
        },
        {
            name: "XTokens",
            index: 38
        },
        {
            name: "PolkadotXcm",
            index: 51
        },
        {
            name: "ForeignAssets",
            index: 80
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "ForeignAssets"
    ]
};
var Shiden = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 31
        },
        {
            name: "Assets",
            index: 36
        },
        {
            name: "PolkadotXcm",
            index: 51
        },
        {
            name: "XTokens",
            index: 55
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets"
    ]
};
var Unique = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 30
        },
        {
            name: "XTokens",
            index: 38
        },
        {
            name: "PolkadotXcm",
            index: 51
        },
        {
            name: "ForeignAssets",
            index: 80
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "ForeignAssets"
    ]
};
var Crust = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 2
        },
        {
            name: "PolkadotXcm",
            index: 14
        },
        {
            name: "Assets",
            index: 124
        },
        {
            name: "XTokens",
            index: 125
        },
        {
            name: "AssetManager",
            index: 126
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets",
        "AssetManager"
    ]
};
var Manta = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        },
        {
            name: "XTokens",
            index: 34
        },
        {
            name: "Assets",
            index: 45
        },
        {
            name: "AssetManager",
            index: 46
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets",
        "AssetManager"
    ]
};
var Nodle = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 2
        },
        {
            name: "PolkadotXcm",
            index: 35
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var NeuroWeb = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "Assets",
            index: 14
        },
        {
            name: "ForeignAssets",
            index: 16
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets",
        "ForeignAssets"
    ]
};
var Pendulum = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 41
        },
        {
            name: "Currencies",
            index: 52
        },
        {
            name: "Tokens",
            index: 53
        },
        {
            name: "XTokens",
            index: 54
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Currencies",
        "Tokens"
    ]
};
var Zeitgeist = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "AssetManager",
            index: 40
        },
        {
            name: "PolkadotXcm",
            index: 122
        },
        {
            name: "XTokens",
            index: 126
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "AssetManager",
        "Tokens"
    ]
};
var Collectives = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var BridgeHubPolkadot = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var BridgeHubKusama = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var Mythos = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var Peaq = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 4
        },
        {
            name: "PolkadotXcm",
            index: 31
        },
        {
            name: "XTokens",
            index: 36
        },
        {
            name: "Assets",
            index: 39
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets"
    ]
};
var CoretimePolkadot = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var PeoplePolkadot = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var PeopleKusama = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var Polkadot = {
    defaultPallet: "XcmPallet",
    supportedPallets: [
        {
            name: "Balances",
            index: 5
        },
        {
            name: "XcmPallet",
            index: 99
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var Kusama = {
    defaultPallet: "XcmPallet",
    supportedPallets: [
        {
            name: "Balances",
            index: 4
        },
        {
            name: "XcmPallet",
            index: 99
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var Ajuna = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 15
        },
        {
            name: "PolkadotXcm",
            index: 31
        },
        {
            name: "XTokens",
            index: 35
        },
        {
            name: "Assets",
            index: 90
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets"
    ]
};
var Laos = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var Jamton = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "Tokens",
            index: 12
        },
        {
            name: "Currencies",
            index: 16
        },
        {
            name: "XTokens",
            index: 18
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Currencies",
        "Tokens"
    ]
};
var AssetHubWestend = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        },
        {
            name: "Assets",
            index: 50
        },
        {
            name: "ForeignAssets",
            index: 53
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets",
        "ForeignAssets"
    ]
};
var BridgeHubWestend = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var CollectivesWestend = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var CoretimeWestend = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var PeopleWestend = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var Penpal = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        },
        {
            name: "Assets",
            index: 50
        },
        {
            name: "ForeignAssets",
            index: 51
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets",
        "ForeignAssets"
    ]
};
var AssetHubPaseo = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        },
        {
            name: "Assets",
            index: 50
        },
        {
            name: "ForeignAssets",
            index: 53
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets",
        "ForeignAssets"
    ]
};
var BridgeHubPaseo = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var CoretimePaseo = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var PeoplePaseo = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "Assets",
            index: 12
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets"
    ]
};
var AjunaPaseo = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 15
        },
        {
            name: "PolkadotXcm",
            index: 31
        },
        {
            name: "XTokens",
            index: 35
        },
        {
            name: "Assets",
            index: 90
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets"
    ]
};
var BifrostPaseo = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 41
        },
        {
            name: "Tokens",
            index: 71
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Tokens",
        "Currencies"
    ]
};
var HeimaPaseo = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 51
        },
        {
            name: "Assets",
            index: 56
        },
        {
            name: "AssetManager",
            index: 64
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets",
        "AssetManager"
    ]
};
var HydrationPaseo = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 7
        },
        {
            name: "Tokens",
            index: 77
        },
        {
            name: "Currencies",
            index: 79
        },
        {
            name: "PolkadotXcm",
            index: 107
        },
        {
            name: "XTokens",
            index: 137
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Currencies",
        "Tokens"
    ]
};
var LaosPaseo = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var NeuroWebPaseo = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "Assets",
            index: 14
        },
        {
            name: "ForeignAssets",
            index: 16
        },
        {
            name: "PolkadotXcm",
            index: 31
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets",
        "ForeignAssets"
    ]
};
var ZeitgeistPaseo = {
    defaultPallet: "XTokens",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "AssetManager",
            index: 40
        },
        {
            name: "PolkadotXcm",
            index: 122
        },
        {
            name: "XTokens",
            index: 126
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "AssetManager",
        "Tokens"
    ]
};
var Westend = {
    defaultPallet: "XcmPallet",
    supportedPallets: [
        {
            name: "Balances",
            index: 4
        },
        {
            name: "XcmPallet",
            index: 99
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var Paseo = {
    defaultPallet: "XcmPallet",
    supportedPallets: [
        {
            name: "Balances",
            index: 5
        },
        {
            name: "XcmPallet",
            index: 99
        }
    ],
    nativeAssets: "Balances",
    otherAssets: []
};
var EnergyWebX = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        },
        {
            name: "Assets",
            index: 60
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets"
    ]
};
var EnergyWebXPaseo = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        },
        {
            name: "Assets",
            index: 60
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets"
    ]
};
var Xode = {
    defaultPallet: "PolkadotXcm",
    supportedPallets: [
        {
            name: "Balances",
            index: 10
        },
        {
            name: "PolkadotXcm",
            index: 31
        },
        {
            name: "Assets",
            index: 50
        }
    ],
    nativeAssets: "Balances",
    otherAssets: [
        "Assets"
    ]
};
var pallets = {
    AssetHubPolkadot: AssetHubPolkadot,
    Acala: Acala,
    Astar: Astar,
    BifrostPolkadot: BifrostPolkadot,
    CoretimeKusama: CoretimeKusama,
    Centrifuge: Centrifuge,
    Darwinia: Darwinia,
    Hydration: Hydration,
    Interlay: Interlay,
    Heima: Heima,
    Moonbeam: Moonbeam,
    AssetHubKusama: AssetHubKusama,
    Encointer: Encointer,
    Altair: Altair,
    Basilisk: Basilisk,
    BifrostKusama: BifrostKusama,
    CrustShadow: CrustShadow,
    Crab: Crab,
    Karura: Karura,
    Kintsugi: Kintsugi,
    Moonriver: Moonriver,
    Quartz: Quartz,
    Shiden: Shiden,
    Unique: Unique,
    Crust: Crust,
    Manta: Manta,
    Nodle: Nodle,
    NeuroWeb: NeuroWeb,
    Pendulum: Pendulum,
    Zeitgeist: Zeitgeist,
    Collectives: Collectives,
    BridgeHubPolkadot: BridgeHubPolkadot,
    BridgeHubKusama: BridgeHubKusama,
    Mythos: Mythos,
    Peaq: Peaq,
    CoretimePolkadot: CoretimePolkadot,
    PeoplePolkadot: PeoplePolkadot,
    PeopleKusama: PeopleKusama,
    Polkadot: Polkadot,
    Kusama: Kusama,
    Ajuna: Ajuna,
    Laos: Laos,
    Jamton: Jamton,
    AssetHubWestend: AssetHubWestend,
    BridgeHubWestend: BridgeHubWestend,
    CollectivesWestend: CollectivesWestend,
    CoretimeWestend: CoretimeWestend,
    PeopleWestend: PeopleWestend,
    Penpal: Penpal,
    AssetHubPaseo: AssetHubPaseo,
    BridgeHubPaseo: BridgeHubPaseo,
    CoretimePaseo: CoretimePaseo,
    PeoplePaseo: PeoplePaseo,
    AjunaPaseo: AjunaPaseo,
    BifrostPaseo: BifrostPaseo,
    HeimaPaseo: HeimaPaseo,
    HydrationPaseo: HydrationPaseo,
    LaosPaseo: LaosPaseo,
    NeuroWebPaseo: NeuroWebPaseo,
    ZeitgeistPaseo: ZeitgeistPaseo,
    Westend: Westend,
    Paseo: Paseo,
    EnergyWebX: EnergyWebX,
    EnergyWebXPaseo: EnergyWebXPaseo,
    Xode: Xode
};
var palletsMapJson = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    Acala: Acala,
    Ajuna: Ajuna,
    AjunaPaseo: AjunaPaseo,
    Altair: Altair,
    AssetHubKusama: AssetHubKusama,
    AssetHubPaseo: AssetHubPaseo,
    AssetHubPolkadot: AssetHubPolkadot,
    AssetHubWestend: AssetHubWestend,
    Astar: Astar,
    Basilisk: Basilisk,
    BifrostKusama: BifrostKusama,
    BifrostPaseo: BifrostPaseo,
    BifrostPolkadot: BifrostPolkadot,
    BridgeHubKusama: BridgeHubKusama,
    BridgeHubPaseo: BridgeHubPaseo,
    BridgeHubPolkadot: BridgeHubPolkadot,
    BridgeHubWestend: BridgeHubWestend,
    Centrifuge: Centrifuge,
    Collectives: Collectives,
    CollectivesWestend: CollectivesWestend,
    CoretimeKusama: CoretimeKusama,
    CoretimePaseo: CoretimePaseo,
    CoretimePolkadot: CoretimePolkadot,
    CoretimeWestend: CoretimeWestend,
    Crab: Crab,
    Crust: Crust,
    CrustShadow: CrustShadow,
    Darwinia: Darwinia,
    Encointer: Encointer,
    EnergyWebX: EnergyWebX,
    EnergyWebXPaseo: EnergyWebXPaseo,
    Heima: Heima,
    HeimaPaseo: HeimaPaseo,
    Hydration: Hydration,
    HydrationPaseo: HydrationPaseo,
    Interlay: Interlay,
    Jamton: Jamton,
    Karura: Karura,
    Kintsugi: Kintsugi,
    Kusama: Kusama,
    Laos: Laos,
    LaosPaseo: LaosPaseo,
    Manta: Manta,
    Moonbeam: Moonbeam,
    Moonriver: Moonriver,
    Mythos: Mythos,
    NeuroWeb: NeuroWeb,
    NeuroWebPaseo: NeuroWebPaseo,
    Nodle: Nodle,
    Paseo: Paseo,
    Peaq: Peaq,
    Pendulum: Pendulum,
    Penpal: Penpal,
    PeopleKusama: PeopleKusama,
    PeoplePaseo: PeoplePaseo,
    PeoplePolkadot: PeoplePolkadot,
    PeopleWestend: PeopleWestend,
    Polkadot: Polkadot,
    Quartz: Quartz,
    Shiden: Shiden,
    Unique: Unique,
    Westend: Westend,
    Xode: Xode,
    Zeitgeist: Zeitgeist,
    ZeitgeistPaseo: ZeitgeistPaseo,
    default: pallets
});
// Script that pulls XCM Pallets for selected Parachain
var palletsMap = palletsMapJson;
/**
 * Retrieves the default pallet for a specified chain.
 *
 * @param chain - The chain for which to get the default pallet.
 * @returns The default pallet associated with the chain.
 */ var getDefaultPallet = function getDefaultPallet(chain) {
    return palletsMap[chain].defaultPallet;
};
/**
 * Retrieves the list of supported pallets for a specified chain.
 *
 * @param chain - The chain for which to get supported pallets.
 * @returns An array of pallets supported by the chain.
 */ var getSupportedPallets = function getSupportedPallets(chain) {
    return palletsMap[chain].supportedPallets.map(function(pallet) {
        return pallet.name;
    });
};
var getSupportedPalletsDetails = function getSupportedPalletsDetails(chain) {
    return palletsMap[chain].supportedPallets;
};
var getPalletIndex = function getPalletIndex(chain, pallet) {
    var _palletsMap$chain$sup;
    return (_palletsMap$chain$sup = palletsMap[chain].supportedPallets.find(function(p) {
        return p.name === pallet;
    })) === null || _palletsMap$chain$sup === void 0 ? void 0 : _palletsMap$chain$sup.index;
};
var getNativeAssetsPallet = function getNativeAssetsPallet(chain) {
    return palletsMap[chain].nativeAssets;
};
var getOtherAssetsPallets = function getOtherAssetsPallets(chain) {
    return palletsMap[chain].otherAssets;
};
;
}),
"[externals]/@polkadot/util [external] (@polkadot/util, esm_import, [project]/node_modules/@polkadot/util)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@polkadot/util-48af9b0128a37947");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@polkadot/util [external] (@polkadot/util, cjs, [project]/node_modules/@polkadot/util)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@polkadot/util-48af9b0128a37947", () => require("@polkadot/util-48af9b0128a37947"));

module.exports = mod;
}),
"[externals]/@polkadot/util-crypto [external] (@polkadot/util-crypto, esm_import, [project]/node_modules/@polkadot/util-crypto)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@polkadot/util-crypto-c3ce88154edb2424");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@polkadot/util-crypto [external] (@polkadot/util-crypto, cjs, [project]/node_modules/@polkadot/util-crypto)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@polkadot/util-crypto-c3ce88154edb2424", () => require("@polkadot/util-crypto-c3ce88154edb2424"));

module.exports = mod;
}),
"[project]/node_modules/ethers/node_modules/tslib/tslib.es6.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__addDisposableResource",
    ()=>__addDisposableResource,
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldIn",
    ()=>__classPrivateFieldIn,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__disposeResources",
    ()=>__disposeResources,
    "__esDecorate",
    ()=>__esDecorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__propKey",
    ()=>__propKey,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__runInitializers",
    ()=>__runInitializers,
    "__setFunctionName",
    ()=>__setFunctionName,
    "__spread",
    ()=>__spread,
    "__spreadArray",
    ()=>__spreadArray,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while(r = env.stack.pop()){
            try {
                if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                if (r.dispose) {
                    var result = r.dispose.call(r.value);
                    if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                        fail(e);
                        return next();
                    });
                } else s |= 1;
            } catch (e) {
                fail(e);
            }
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}
const __TURBOPACK__default__export__ = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources
};
}),
"[project]/node_modules/ethers/node_modules/@noble/curves/abstract/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateObject = exports.createHmacDrbg = exports.bitMask = exports.bitSet = exports.bitGet = exports.bitLen = exports.utf8ToBytes = exports.equalBytes = exports.concatBytes = exports.ensureBytes = exports.numberToVarBytesBE = exports.numberToBytesLE = exports.numberToBytesBE = exports.bytesToNumberLE = exports.bytesToNumberBE = exports.hexToBytes = exports.hexToNumber = exports.numberToHexUnpadded = exports.bytesToHex = void 0;
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ // 100 lines of code in the file are duplicated from noble-hashes (utils).
// This is OK: `abstract` directory does not use noble-hashes.
// User may opt-in into using different hashing library. This way, noble-hashes
// won't be included into their bundle.
const _0n = BigInt(0);
const _1n = BigInt(1);
const _2n = BigInt(2);
const u8a = (a)=>a instanceof Uint8Array;
const hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */ function bytesToHex(bytes) {
    if (!u8a(bytes)) throw new Error('Uint8Array expected');
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        hex += hexes[bytes[i]];
    }
    return hex;
}
exports.bytesToHex = bytesToHex;
function numberToHexUnpadded(num) {
    const hex = num.toString(16);
    return hex.length & 1 ? `0${hex}` : hex;
}
exports.numberToHexUnpadded = numberToHexUnpadded;
function hexToNumber(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    // Big Endian
    return BigInt(hex === '' ? '0' : `0x${hex}`);
}
exports.hexToNumber = hexToNumber;
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */ function hexToBytes(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    const len = hex.length;
    if (len % 2) throw new Error('padded hex string expected, got unpadded hex of length ' + len);
    const array = new Uint8Array(len / 2);
    for(let i = 0; i < array.length; i++){
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
        array[i] = byte;
    }
    return array;
}
exports.hexToBytes = hexToBytes;
// BE: Big Endian, LE: Little Endian
function bytesToNumberBE(bytes) {
    return hexToNumber(bytesToHex(bytes));
}
exports.bytesToNumberBE = bytesToNumberBE;
function bytesToNumberLE(bytes) {
    if (!u8a(bytes)) throw new Error('Uint8Array expected');
    return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
}
exports.bytesToNumberLE = bytesToNumberLE;
function numberToBytesBE(n, len) {
    return hexToBytes(n.toString(16).padStart(len * 2, '0'));
}
exports.numberToBytesBE = numberToBytesBE;
function numberToBytesLE(n, len) {
    return numberToBytesBE(n, len).reverse();
}
exports.numberToBytesLE = numberToBytesLE;
// Unpadded, rarely used
function numberToVarBytesBE(n) {
    return hexToBytes(numberToHexUnpadded(n));
}
exports.numberToVarBytesBE = numberToVarBytesBE;
/**
 * Takes hex string or Uint8Array, converts to Uint8Array.
 * Validates output length.
 * Will throw error for other types.
 * @param title descriptive title for an error e.g. 'private key'
 * @param hex hex string or Uint8Array
 * @param expectedLength optional, will compare to result array's length
 * @returns
 */ function ensureBytes(title, hex, expectedLength) {
    let res;
    if (typeof hex === 'string') {
        try {
            res = hexToBytes(hex);
        } catch (e) {
            throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
        }
    } else if (u8a(hex)) {
        // Uint8Array.from() instead of hash.slice() because node.js Buffer
        // is instance of Uint8Array, and its slice() creates **mutable** copy
        res = Uint8Array.from(hex);
    } else {
        throw new Error(`${title} must be hex string or Uint8Array`);
    }
    const len = res.length;
    if (typeof expectedLength === 'number' && len !== expectedLength) throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
    return res;
}
exports.ensureBytes = ensureBytes;
/**
 * Copies several Uint8Arrays into one.
 */ function concatBytes(...arrays) {
    const r = new Uint8Array(arrays.reduce((sum, a)=>sum + a.length, 0));
    let pad = 0; // walk through each item, ensure they have proper type
    arrays.forEach((a)=>{
        if (!u8a(a)) throw new Error('Uint8Array expected');
        r.set(a, pad);
        pad += a.length;
    });
    return r;
}
exports.concatBytes = concatBytes;
function equalBytes(b1, b2) {
    // We don't care about timing attacks here
    if (b1.length !== b2.length) return false;
    for(let i = 0; i < b1.length; i++)if (b1[i] !== b2[i]) return false;
    return true;
}
exports.equalBytes = equalBytes;
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */ function utf8ToBytes(str) {
    if (typeof str !== 'string') throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
exports.utf8ToBytes = utf8ToBytes;
// Bit operations
/**
 * Calculates amount of bits in a bigint.
 * Same as `n.toString(2).length`
 */ function bitLen(n) {
    let len;
    for(len = 0; n > _0n; n >>= _1n, len += 1);
    return len;
}
exports.bitLen = bitLen;
/**
 * Gets single bit at position.
 * NOTE: first bit position is 0 (same as arrays)
 * Same as `!!+Array.from(n.toString(2)).reverse()[pos]`
 */ function bitGet(n, pos) {
    return n >> BigInt(pos) & _1n;
}
exports.bitGet = bitGet;
/**
 * Sets single bit at position.
 */ const bitSet = (n, pos, value)=>{
    return n | (value ? _1n : _0n) << BigInt(pos);
};
exports.bitSet = bitSet;
/**
 * Calculate mask for N bits. Not using ** operator with bigints because of old engines.
 * Same as BigInt(`0b${Array(i).fill('1').join('')}`)
 */ const bitMask = (n)=>(_2n << BigInt(n - 1)) - _1n;
exports.bitMask = bitMask;
// DRBG
const u8n = (data)=>new Uint8Array(data); // creates Uint8Array
const u8fr = (arr)=>Uint8Array.from(arr); // another shortcut
/**
 * Minimal HMAC-DRBG from NIST 800-90 for RFC6979 sigs.
 * @returns function that will call DRBG until 2nd arg returns something meaningful
 * @example
 *   const drbg = createHmacDRBG<Key>(32, 32, hmac);
 *   drbg(seed, bytesToKey); // bytesToKey must return Key or undefined
 */ function createHmacDrbg(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== 'number' || hashLen < 2) throw new Error('hashLen must be a number');
    if (typeof qByteLen !== 'number' || qByteLen < 2) throw new Error('qByteLen must be a number');
    if (typeof hmacFn !== 'function') throw new Error('hmacFn must be a function');
    // Step B, Step C: set hashLen to 8*ceil(hlen/8)
    let v = u8n(hashLen); // Minimal non-full-spec HMAC-DRBG from NIST 800-90 for RFC6979 sigs.
    let k = u8n(hashLen); // Steps B and C of RFC6979 3.2: set hashLen, in our case always same
    let i = 0; // Iterations counter, will throw when over 1000
    const reset = ()=>{
        v.fill(1);
        k.fill(0);
        i = 0;
    };
    const h = (...b)=>hmacFn(k, v, ...b); // hmac(k)(v, ...values)
    const reseed = (seed = u8n())=>{
        // HMAC-DRBG reseed() function. Steps D-G
        k = h(u8fr([
            0x00
        ]), seed); // k = hmac(k || v || 0x00 || seed)
        v = h(); // v = hmac(k || v)
        if (seed.length === 0) return;
        k = h(u8fr([
            0x01
        ]), seed); // k = hmac(k || v || 0x01 || seed)
        v = h(); // v = hmac(k || v)
    };
    const gen = ()=>{
        // HMAC-DRBG generate() function
        if (i++ >= 1000) throw new Error('drbg: tried 1000 values');
        let len = 0;
        const out = [];
        while(len < qByteLen){
            v = h();
            const sl = v.slice();
            out.push(sl);
            len += v.length;
        }
        return concatBytes(...out);
    };
    const genUntil = (seed, pred)=>{
        reset();
        reseed(seed); // Steps D-G
        let res = undefined; // Step H: grind until k is in [1..n-1]
        while(!(res = pred(gen())))reseed();
        reset();
        return res;
    };
    return genUntil;
}
exports.createHmacDrbg = createHmacDrbg;
// Validating curves and fields
const validatorFns = {
    bigint: (val)=>typeof val === 'bigint',
    function: (val)=>typeof val === 'function',
    boolean: (val)=>typeof val === 'boolean',
    string: (val)=>typeof val === 'string',
    stringOrUint8Array: (val)=>typeof val === 'string' || val instanceof Uint8Array,
    isSafeInteger: (val)=>Number.isSafeInteger(val),
    array: (val)=>Array.isArray(val),
    field: (val, object)=>object.Fp.isValid(val),
    hash: (val)=>typeof val === 'function' && Number.isSafeInteger(val.outputLen)
};
// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
function validateObject(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional)=>{
        const checkVal = validatorFns[type];
        if (typeof checkVal !== 'function') throw new Error(`Invalid validator "${type}", expected function`);
        const val = object[fieldName];
        if (isOptional && val === undefined) return;
        if (!checkVal(val, object)) {
            throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
        }
    };
    for (const [fieldName, type] of Object.entries(validators))checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))checkField(fieldName, type, true);
    return object;
}
exports.validateObject = validateObject; // validate type tests
 // const o: { a: number; b: number; c: number } = { a: 1, b: 5, c: 6 };
 // const z0 = validateObject(o, { a: 'isSafeInteger' }, { c: 'bigint' }); // Ok!
 // // Should fail type-check
 // const z1 = validateObject(o, { a: 'tmp' }, { c: 'zz' });
 // const z2 = validateObject(o, { a: 'isSafeInteger' }, { c: 'zz' });
 // const z3 = validateObject(o, { test: 'boolean', z: 'bug' });
 // const z4 = validateObject(o, { a: 'boolean', z: 'bug' });
 //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/curves/abstract/modular.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapHashToField = exports.getMinHashLength = exports.getFieldBytesLength = exports.hashToPrivateScalar = exports.FpSqrtEven = exports.FpSqrtOdd = exports.Field = exports.nLength = exports.FpIsSquare = exports.FpDiv = exports.FpInvertBatch = exports.FpPow = exports.validateField = exports.isNegativeLE = exports.FpSqrt = exports.tonelliShanks = exports.invert = exports.pow2 = exports.pow = exports.mod = void 0;
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ // Utilities for modular arithmetics and finite fields
const utils_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/utils.js [app-ssr] (ecmascript)");
// prettier-ignore
const _0n = BigInt(0), _1n = BigInt(1), _2n = BigInt(2), _3n = BigInt(3);
// prettier-ignore
const _4n = BigInt(4), _5n = BigInt(5), _8n = BigInt(8);
// prettier-ignore
const _9n = BigInt(9), _16n = BigInt(16);
// Calculates a modulo b
function mod(a, b) {
    const result = a % b;
    return result >= _0n ? result : b + result;
}
exports.mod = mod;
/**
 * Efficiently raise num to power and do modular division.
 * Unsafe in some contexts: uses ladder, so can expose bigint bits.
 * @example
 * pow(2n, 6n, 11n) // 64n % 11n == 9n
 */ // TODO: use field version && remove
function pow(num, power, modulo) {
    if (modulo <= _0n || power < _0n) throw new Error('Expected power/modulo > 0');
    if (modulo === _1n) return _0n;
    let res = _1n;
    while(power > _0n){
        if (power & _1n) res = res * num % modulo;
        num = num * num % modulo;
        power >>= _1n;
    }
    return res;
}
exports.pow = pow;
// Does x ^ (2 ^ power) mod p. pow2(30, 4) == 30 ^ (2 ^ 4)
function pow2(x, power, modulo) {
    let res = x;
    while(power-- > _0n){
        res *= res;
        res %= modulo;
    }
    return res;
}
exports.pow2 = pow2;
// Inverses number over modulo
function invert(number, modulo) {
    if (number === _0n || modulo <= _0n) {
        throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
    }
    // Euclidean GCD https://brilliant.org/wiki/extended-euclidean-algorithm/
    // Fermat's little theorem "CT-like" version inv(n) = n^(m-2) mod m is 30x slower.
    let a = mod(number, modulo);
    let b = modulo;
    // prettier-ignore
    let x = _0n, y = _1n, u = _1n, v = _0n;
    while(a !== _0n){
        // JIT applies optimization if those two lines follow each other
        const q = b / a;
        const r = b % a;
        const m = x - u * q;
        const n = y - v * q;
        // prettier-ignore
        b = a, a = r, x = u, y = v, u = m, v = n;
    }
    const gcd = b;
    if (gcd !== _1n) throw new Error('invert: does not exist');
    return mod(x, modulo);
}
exports.invert = invert;
/**
 * Tonelli-Shanks square root search algorithm.
 * 1. https://eprint.iacr.org/2012/685.pdf (page 12)
 * 2. Square Roots from 1; 24, 51, 10 to Dan Shanks
 * Will start an infinite loop if field order P is not prime.
 * @param P field order
 * @returns function that takes field Fp (created from P) and number n
 */ function tonelliShanks(P) {
    // Legendre constant: used to calculate Legendre symbol (a | p),
    // which denotes the value of a^((p-1)/2) (mod p).
    // (a | p) ≡ 1    if a is a square (mod p)
    // (a | p) ≡ -1   if a is not a square (mod p)
    // (a | p) ≡ 0    if a ≡ 0 (mod p)
    const legendreC = (P - _1n) / _2n;
    let Q, S, Z;
    // Step 1: By factoring out powers of 2 from p - 1,
    // find q and s such that p - 1 = q*(2^s) with q odd
    for(Q = P - _1n, S = 0; Q % _2n === _0n; Q /= _2n, S++);
    // Step 2: Select a non-square z such that (z | p) ≡ -1 and set c ≡ zq
    for(Z = _2n; Z < P && pow(Z, legendreC, P) !== P - _1n; Z++);
    // Fast-path
    if (S === 1) {
        const p1div4 = (P + _1n) / _4n;
        return function tonelliFast(Fp, n) {
            const root = Fp.pow(n, p1div4);
            if (!Fp.eql(Fp.sqr(root), n)) throw new Error('Cannot find square root');
            return root;
        };
    }
    // Slow-path
    const Q1div2 = (Q + _1n) / _2n;
    return function tonelliSlow(Fp, n) {
        // Step 0: Check that n is indeed a square: (n | p) should not be ≡ -1
        if (Fp.pow(n, legendreC) === Fp.neg(Fp.ONE)) throw new Error('Cannot find square root');
        let r = S;
        // TODO: will fail at Fp2/etc
        let g = Fp.pow(Fp.mul(Fp.ONE, Z), Q); // will update both x and b
        let x = Fp.pow(n, Q1div2); // first guess at the square root
        let b = Fp.pow(n, Q); // first guess at the fudge factor
        while(!Fp.eql(b, Fp.ONE)){
            if (Fp.eql(b, Fp.ZERO)) return Fp.ZERO; // https://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm (4. If t = 0, return r = 0)
            // Find m such b^(2^m)==1
            let m = 1;
            for(let t2 = Fp.sqr(b); m < r; m++){
                if (Fp.eql(t2, Fp.ONE)) break;
                t2 = Fp.sqr(t2); // t2 *= t2
            }
            // NOTE: r-m-1 can be bigger than 32, need to convert to bigint before shift, otherwise there will be overflow
            const ge = Fp.pow(g, _1n << BigInt(r - m - 1)); // ge = 2^(r-m-1)
            g = Fp.sqr(ge); // g = ge * ge
            x = Fp.mul(x, ge); // x *= ge
            b = Fp.mul(b, g); // b *= g
            r = m;
        }
        return x;
    };
}
exports.tonelliShanks = tonelliShanks;
function FpSqrt(P) {
    // NOTE: different algorithms can give different roots, it is up to user to decide which one they want.
    // For example there is FpSqrtOdd/FpSqrtEven to choice root based on oddness (used for hash-to-curve).
    // P ≡ 3 (mod 4)
    // √n = n^((P+1)/4)
    if (P % _4n === _3n) {
        // Not all roots possible!
        // const ORDER =
        //   0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn;
        // const NUM = 72057594037927816n;
        const p1div4 = (P + _1n) / _4n;
        return function sqrt3mod4(Fp, n) {
            const root = Fp.pow(n, p1div4);
            // Throw if root**2 != n
            if (!Fp.eql(Fp.sqr(root), n)) throw new Error('Cannot find square root');
            return root;
        };
    }
    // Atkin algorithm for q ≡ 5 (mod 8), https://eprint.iacr.org/2012/685.pdf (page 10)
    if (P % _8n === _5n) {
        const c1 = (P - _5n) / _8n;
        return function sqrt5mod8(Fp, n) {
            const n2 = Fp.mul(n, _2n);
            const v = Fp.pow(n2, c1);
            const nv = Fp.mul(n, v);
            const i = Fp.mul(Fp.mul(nv, _2n), v);
            const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
            if (!Fp.eql(Fp.sqr(root), n)) throw new Error('Cannot find square root');
            return root;
        };
    }
    // P ≡ 9 (mod 16)
    if (P % _16n === _9n) {
    // NOTE: tonelli is too slow for bls-Fp2 calculations even on start
    // Means we cannot use sqrt for constants at all!
    //
    // const c1 = Fp.sqrt(Fp.negate(Fp.ONE)); //  1. c1 = sqrt(-1) in F, i.e., (c1^2) == -1 in F
    // const c2 = Fp.sqrt(c1);                //  2. c2 = sqrt(c1) in F, i.e., (c2^2) == c1 in F
    // const c3 = Fp.sqrt(Fp.negate(c1));     //  3. c3 = sqrt(-c1) in F, i.e., (c3^2) == -c1 in F
    // const c4 = (P + _7n) / _16n;           //  4. c4 = (q + 7) / 16        # Integer arithmetic
    // sqrt = (x) => {
    //   let tv1 = Fp.pow(x, c4);             //  1. tv1 = x^c4
    //   let tv2 = Fp.mul(c1, tv1);           //  2. tv2 = c1 * tv1
    //   const tv3 = Fp.mul(c2, tv1);         //  3. tv3 = c2 * tv1
    //   let tv4 = Fp.mul(c3, tv1);           //  4. tv4 = c3 * tv1
    //   const e1 = Fp.equals(Fp.square(tv2), x); //  5.  e1 = (tv2^2) == x
    //   const e2 = Fp.equals(Fp.square(tv3), x); //  6.  e2 = (tv3^2) == x
    //   tv1 = Fp.cmov(tv1, tv2, e1); //  7. tv1 = CMOV(tv1, tv2, e1)  # Select tv2 if (tv2^2) == x
    //   tv2 = Fp.cmov(tv4, tv3, e2); //  8. tv2 = CMOV(tv4, tv3, e2)  # Select tv3 if (tv3^2) == x
    //   const e3 = Fp.equals(Fp.square(tv2), x); //  9.  e3 = (tv2^2) == x
    //   return Fp.cmov(tv1, tv2, e3); //  10.  z = CMOV(tv1, tv2, e3)  # Select the sqrt from tv1 and tv2
    // }
    }
    // Other cases: Tonelli-Shanks algorithm
    return tonelliShanks(P);
}
exports.FpSqrt = FpSqrt;
// Little-endian check for first LE bit (last BE bit);
const isNegativeLE = (num, modulo)=>(mod(num, modulo) & _1n) === _1n;
exports.isNegativeLE = isNegativeLE;
// prettier-ignore
const FIELD_FIELDS = [
    'create',
    'isValid',
    'is0',
    'neg',
    'inv',
    'sqrt',
    'sqr',
    'eql',
    'add',
    'sub',
    'mul',
    'pow',
    'div',
    'addN',
    'subN',
    'mulN',
    'sqrN'
];
function validateField(field) {
    const initial = {
        ORDER: 'bigint',
        MASK: 'bigint',
        BYTES: 'isSafeInteger',
        BITS: 'isSafeInteger'
    };
    const opts = FIELD_FIELDS.reduce((map, val)=>{
        map[val] = 'function';
        return map;
    }, initial);
    return (0, utils_js_1.validateObject)(field, opts);
}
exports.validateField = validateField;
// Generic field functions
/**
 * Same as `pow` but for Fp: non-constant-time.
 * Unsafe in some contexts: uses ladder, so can expose bigint bits.
 */ function FpPow(f, num, power) {
    // Should have same speed as pow for bigints
    // TODO: benchmark!
    if (power < _0n) throw new Error('Expected power > 0');
    if (power === _0n) return f.ONE;
    if (power === _1n) return num;
    let p = f.ONE;
    let d = num;
    while(power > _0n){
        if (power & _1n) p = f.mul(p, d);
        d = f.sqr(d);
        power >>= _1n;
    }
    return p;
}
exports.FpPow = FpPow;
/**
 * Efficiently invert an array of Field elements.
 * `inv(0)` will return `undefined` here: make sure to throw an error.
 */ function FpInvertBatch(f, nums) {
    const tmp = new Array(nums.length);
    // Walk from first to last, multiply them by each other MOD p
    const lastMultiplied = nums.reduce((acc, num, i)=>{
        if (f.is0(num)) return acc;
        tmp[i] = acc;
        return f.mul(acc, num);
    }, f.ONE);
    // Invert last element
    const inverted = f.inv(lastMultiplied);
    // Walk from last to first, multiply them by inverted each other MOD p
    nums.reduceRight((acc, num, i)=>{
        if (f.is0(num)) return acc;
        tmp[i] = f.mul(acc, tmp[i]);
        return f.mul(acc, num);
    }, inverted);
    return tmp;
}
exports.FpInvertBatch = FpInvertBatch;
function FpDiv(f, lhs, rhs) {
    return f.mul(lhs, typeof rhs === 'bigint' ? invert(rhs, f.ORDER) : f.inv(rhs));
}
exports.FpDiv = FpDiv;
// This function returns True whenever the value x is a square in the field F.
function FpIsSquare(f) {
    const legendreConst = (f.ORDER - _1n) / _2n; // Integer arithmetic
    return (x)=>{
        const p = f.pow(x, legendreConst);
        return f.eql(p, f.ZERO) || f.eql(p, f.ONE);
    };
}
exports.FpIsSquare = FpIsSquare;
// CURVE.n lengths
function nLength(n, nBitLength) {
    // Bit size, byte size of CURVE.n
    const _nBitLength = nBitLength !== undefined ? nBitLength : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return {
        nBitLength: _nBitLength,
        nByteLength
    };
}
exports.nLength = nLength;
/**
 * Initializes a finite field over prime. **Non-primes are not supported.**
 * Do not init in loop: slow. Very fragile: always run a benchmark on a change.
 * Major performance optimizations:
 * * a) denormalized operations like mulN instead of mul
 * * b) same object shape: never add or remove keys
 * * c) Object.freeze
 * @param ORDER prime positive bigint
 * @param bitLen how many bits the field consumes
 * @param isLE (def: false) if encoding / decoding should be in little-endian
 * @param redef optional faster redefinitions of sqrt and other methods
 */ function Field(ORDER, bitLen, isLE = false, redef = {}) {
    if (ORDER <= _0n) throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
    const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen);
    if (BYTES > 2048) throw new Error('Field lengths over 2048 bytes are not supported');
    const sqrtP = FpSqrt(ORDER);
    const f = Object.freeze({
        ORDER,
        BITS,
        BYTES,
        MASK: (0, utils_js_1.bitMask)(BITS),
        ZERO: _0n,
        ONE: _1n,
        create: (num)=>mod(num, ORDER),
        isValid: (num)=>{
            if (typeof num !== 'bigint') throw new Error(`Invalid field element: expected bigint, got ${typeof num}`);
            return _0n <= num && num < ORDER; // 0 is valid element, but it's not invertible
        },
        is0: (num)=>num === _0n,
        isOdd: (num)=>(num & _1n) === _1n,
        neg: (num)=>mod(-num, ORDER),
        eql: (lhs, rhs)=>lhs === rhs,
        sqr: (num)=>mod(num * num, ORDER),
        add: (lhs, rhs)=>mod(lhs + rhs, ORDER),
        sub: (lhs, rhs)=>mod(lhs - rhs, ORDER),
        mul: (lhs, rhs)=>mod(lhs * rhs, ORDER),
        pow: (num, power)=>FpPow(f, num, power),
        div: (lhs, rhs)=>mod(lhs * invert(rhs, ORDER), ORDER),
        // Same as above, but doesn't normalize
        sqrN: (num)=>num * num,
        addN: (lhs, rhs)=>lhs + rhs,
        subN: (lhs, rhs)=>lhs - rhs,
        mulN: (lhs, rhs)=>lhs * rhs,
        inv: (num)=>invert(num, ORDER),
        sqrt: redef.sqrt || ((n)=>sqrtP(f, n)),
        invertBatch: (lst)=>FpInvertBatch(f, lst),
        // TODO: do we really need constant cmov?
        // We don't have const-time bigints anyway, so probably will be not very useful
        cmov: (a, b, c)=>c ? b : a,
        toBytes: (num)=>isLE ? (0, utils_js_1.numberToBytesLE)(num, BYTES) : (0, utils_js_1.numberToBytesBE)(num, BYTES),
        fromBytes: (bytes)=>{
            if (bytes.length !== BYTES) throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes.length}`);
            return isLE ? (0, utils_js_1.bytesToNumberLE)(bytes) : (0, utils_js_1.bytesToNumberBE)(bytes);
        }
    });
    return Object.freeze(f);
}
exports.Field = Field;
function FpSqrtOdd(Fp, elm) {
    if (!Fp.isOdd) throw new Error(`Field doesn't have isOdd`);
    const root = Fp.sqrt(elm);
    return Fp.isOdd(root) ? root : Fp.neg(root);
}
exports.FpSqrtOdd = FpSqrtOdd;
function FpSqrtEven(Fp, elm) {
    if (!Fp.isOdd) throw new Error(`Field doesn't have isOdd`);
    const root = Fp.sqrt(elm);
    return Fp.isOdd(root) ? Fp.neg(root) : root;
}
exports.FpSqrtEven = FpSqrtEven;
/**
 * "Constant-time" private key generation utility.
 * Same as mapKeyToField, but accepts less bytes (40 instead of 48 for 32-byte field).
 * Which makes it slightly more biased, less secure.
 * @deprecated use mapKeyToField instead
 */ function hashToPrivateScalar(hash, groupOrder, isLE = false) {
    hash = (0, utils_js_1.ensureBytes)('privateHash', hash);
    const hashLen = hash.length;
    const minLen = nLength(groupOrder).nByteLength + 8;
    if (minLen < 24 || hashLen < minLen || hashLen > 1024) throw new Error(`hashToPrivateScalar: expected ${minLen}-1024 bytes of input, got ${hashLen}`);
    const num = isLE ? (0, utils_js_1.bytesToNumberLE)(hash) : (0, utils_js_1.bytesToNumberBE)(hash);
    return mod(num, groupOrder - _1n) + _1n;
}
exports.hashToPrivateScalar = hashToPrivateScalar;
/**
 * Returns total number of bytes consumed by the field element.
 * For example, 32 bytes for usual 256-bit weierstrass curve.
 * @param fieldOrder number of field elements, usually CURVE.n
 * @returns byte length of field
 */ function getFieldBytesLength(fieldOrder) {
    if (typeof fieldOrder !== 'bigint') throw new Error('field order must be bigint');
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
}
exports.getFieldBytesLength = getFieldBytesLength;
/**
 * Returns minimal amount of bytes that can be safely reduced
 * by field order.
 * Should be 2^-128 for 128-bit curve such as P256.
 * @param fieldOrder number of field elements, usually CURVE.n
 * @returns byte length of target hash
 */ function getMinHashLength(fieldOrder) {
    const length = getFieldBytesLength(fieldOrder);
    return length + Math.ceil(length / 2);
}
exports.getMinHashLength = getMinHashLength;
/**
 * "Constant-time" private key generation utility.
 * Can take (n + n/2) or more bytes of uniform input e.g. from CSPRNG or KDF
 * and convert them into private scalar, with the modulo bias being negligible.
 * Needs at least 48 bytes of input for 32-byte private key.
 * https://research.kudelskisecurity.com/2020/07/28/the-definitive-guide-to-modulo-bias-and-how-to-avoid-it/
 * FIPS 186-5, A.2 https://csrc.nist.gov/publications/detail/fips/186/5/final
 * RFC 9380, https://www.rfc-editor.org/rfc/rfc9380#section-5
 * @param hash hash output from SHA3 or a similar function
 * @param groupOrder size of subgroup - (e.g. secp256k1.CURVE.n)
 * @param isLE interpret hash bytes as LE num
 * @returns valid private scalar
 */ function mapHashToField(key, fieldOrder, isLE = false) {
    const len = key.length;
    const fieldLen = getFieldBytesLength(fieldOrder);
    const minLen = getMinHashLength(fieldOrder);
    // No small numbers: need to understand bias story. No huge numbers: easier to detect JS timings.
    if (len < 16 || len < minLen || len > 1024) throw new Error(`expected ${minLen}-1024 bytes of input, got ${len}`);
    const num = isLE ? (0, utils_js_1.bytesToNumberBE)(key) : (0, utils_js_1.bytesToNumberLE)(key);
    // `mod(x, 11)` can sometimes produce 0. `mod(x, 10) + 1` is the same, but no 0
    const reduced = mod(num, fieldOrder - _1n) + _1n;
    return isLE ? (0, utils_js_1.numberToBytesLE)(reduced, fieldLen) : (0, utils_js_1.numberToBytesBE)(reduced, fieldLen);
}
exports.mapHashToField = mapHashToField; //# sourceMappingURL=modular.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/curves/abstract/curve.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateBasic = exports.wNAF = void 0;
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ // Abelian group utilities
const modular_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/modular.js [app-ssr] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/utils.js [app-ssr] (ecmascript)");
const _0n = BigInt(0);
const _1n = BigInt(1);
// Elliptic curve multiplication of Point by scalar. Fragile.
// Scalars should always be less than curve order: this should be checked inside of a curve itself.
// Creates precomputation tables for fast multiplication:
// - private scalar is split by fixed size windows of W bits
// - every window point is collected from window's table & added to accumulator
// - since windows are different, same point inside tables won't be accessed more than once per calc
// - each multiplication is 'Math.ceil(CURVE_ORDER / 𝑊) + 1' point additions (fixed for any scalar)
// - +1 window is neccessary for wNAF
// - wNAF reduces table size: 2x less memory + 2x faster generation, but 10% slower multiplication
// TODO: Research returning 2d JS array of windows, instead of a single window. This would allow
// windows to be in different memory locations
function wNAF(c, bits) {
    const constTimeNegate = (condition, item)=>{
        const neg = item.negate();
        return condition ? neg : item;
    };
    const opts = (W)=>{
        const windows = Math.ceil(bits / W) + 1; // +1, because
        const windowSize = 2 ** (W - 1); // -1 because we skip zero
        return {
            windows,
            windowSize
        };
    };
    return {
        constTimeNegate,
        // non-const time multiplication ladder
        unsafeLadder (elm, n) {
            let p = c.ZERO;
            let d = elm;
            while(n > _0n){
                if (n & _1n) p = p.add(d);
                d = d.double();
                n >>= _1n;
            }
            return p;
        },
        /**
         * Creates a wNAF precomputation window. Used for caching.
         * Default window size is set by `utils.precompute()` and is equal to 8.
         * Number of precomputed points depends on the curve size:
         * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
         * - 𝑊 is the window size
         * - 𝑛 is the bitlength of the curve order.
         * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
         * @returns precomputed point tables flattened to a single array
         */ precomputeWindow (elm, W) {
            const { windows, windowSize } = opts(W);
            const points = [];
            let p = elm;
            let base = p;
            for(let window = 0; window < windows; window++){
                base = p;
                points.push(base);
                // =1, because we skip zero
                for(let i = 1; i < windowSize; i++){
                    base = base.add(p);
                    points.push(base);
                }
                p = base.double();
            }
            return points;
        },
        /**
         * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
         * @param W window size
         * @param precomputes precomputed tables
         * @param n scalar (we don't check here, but should be less than curve order)
         * @returns real and fake (for const-time) points
         */ wNAF (W, precomputes, n) {
            // TODO: maybe check that scalar is less than group order? wNAF behavious is undefined otherwise
            // But need to carefully remove other checks before wNAF. ORDER == bits here
            const { windows, windowSize } = opts(W);
            let p = c.ZERO;
            let f = c.BASE;
            const mask = BigInt(2 ** W - 1); // Create mask with W ones: 0b1111 for W=4 etc.
            const maxNumber = 2 ** W;
            const shiftBy = BigInt(W);
            for(let window = 0; window < windows; window++){
                const offset = window * windowSize;
                // Extract W bits.
                let wbits = Number(n & mask);
                // Shift number by W bits.
                n >>= shiftBy;
                // If the bits are bigger than max size, we'll split those.
                // +224 => 256 - 32
                if (wbits > windowSize) {
                    wbits -= maxNumber;
                    n += _1n;
                }
                // This code was first written with assumption that 'f' and 'p' will never be infinity point:
                // since each addition is multiplied by 2 ** W, it cannot cancel each other. However,
                // there is negate now: it is possible that negated element from low value
                // would be the same as high element, which will create carry into next window.
                // It's not obvious how this can fail, but still worth investigating later.
                // Check if we're onto Zero point.
                // Add random point inside current window to f.
                const offset1 = offset;
                const offset2 = offset + Math.abs(wbits) - 1; // -1 because we skip zero
                const cond1 = window % 2 !== 0;
                const cond2 = wbits < 0;
                if (wbits === 0) {
                    // The most important part for const-time getPublicKey
                    f = f.add(constTimeNegate(cond1, precomputes[offset1]));
                } else {
                    p = p.add(constTimeNegate(cond2, precomputes[offset2]));
                }
            }
            // JIT-compiler should not eliminate f here, since it will later be used in normalizeZ()
            // Even if the variable is still unused, there are some checks which will
            // throw an exception, so compiler needs to prove they won't happen, which is hard.
            // At this point there is a way to F be infinity-point even if p is not,
            // which makes it less const-time: around 1 bigint multiply.
            return {
                p,
                f
            };
        },
        wNAFCached (P, precomputesMap, n, transform) {
            // @ts-ignore
            const W = P._WINDOW_SIZE || 1;
            // Calculate precomputes on a first run, reuse them after
            let comp = precomputesMap.get(P);
            if (!comp) {
                comp = this.precomputeWindow(P, W);
                if (W !== 1) {
                    precomputesMap.set(P, transform(comp));
                }
            }
            return this.wNAF(W, comp, n);
        }
    };
}
exports.wNAF = wNAF;
function validateBasic(curve) {
    (0, modular_js_1.validateField)(curve.Fp);
    (0, utils_js_1.validateObject)(curve, {
        n: 'bigint',
        h: 'bigint',
        Gx: 'field',
        Gy: 'field'
    }, {
        nBitLength: 'isSafeInteger',
        nByteLength: 'isSafeInteger'
    });
    // Set defaults
    return Object.freeze({
        ...(0, modular_js_1.nLength)(curve.n, curve.nBitLength),
        ...curve,
        ...{
            p: curve.Fp.ORDER
        }
    });
}
exports.validateBasic = validateBasic; //# sourceMappingURL=curve.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/curves/abstract/weierstrass.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapToCurveSimpleSWU = exports.SWUFpSqrtRatio = exports.weierstrass = exports.weierstrassPoints = exports.DER = void 0;
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ // Short Weierstrass curve. The formula is: y² = x³ + ax + b
const mod = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/modular.js [app-ssr] (ecmascript)");
const ut = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/utils.js [app-ssr] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/utils.js [app-ssr] (ecmascript)");
const curve_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/curve.js [app-ssr] (ecmascript)");
function validatePointOpts(curve) {
    const opts = (0, curve_js_1.validateBasic)(curve);
    ut.validateObject(opts, {
        a: 'field',
        b: 'field'
    }, {
        allowedPrivateKeyLengths: 'array',
        wrapPrivateKey: 'boolean',
        isTorsionFree: 'function',
        clearCofactor: 'function',
        allowInfinityPoint: 'boolean',
        fromBytes: 'function',
        toBytes: 'function'
    });
    const { endo, Fp, a } = opts;
    if (endo) {
        if (!Fp.eql(a, Fp.ZERO)) {
            throw new Error('Endomorphism can only be defined for Koblitz curves that have a=0');
        }
        if (typeof endo !== 'object' || typeof endo.beta !== 'bigint' || typeof endo.splitScalar !== 'function') {
            throw new Error('Expected endomorphism with beta: bigint and splitScalar: function');
        }
    }
    return Object.freeze({
        ...opts
    });
}
// ASN.1 DER encoding utilities
const { bytesToNumberBE: b2n, hexToBytes: h2b } = ut;
exports.DER = {
    // asn.1 DER encoding utils
    Err: class DERErr extends Error {
        constructor(m = ''){
            super(m);
        }
    },
    _parseInt (data) {
        const { Err: E } = exports.DER;
        if (data.length < 2 || data[0] !== 0x02) throw new E('Invalid signature integer tag');
        const len = data[1];
        const res = data.subarray(2, len + 2);
        if (!len || res.length !== len) throw new E('Invalid signature integer: wrong length');
        // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
        // since we always use positive integers here. It must always be empty:
        // - add zero byte if exists
        // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
        if (res[0] & 0b10000000) throw new E('Invalid signature integer: negative');
        if (res[0] === 0x00 && !(res[1] & 0b10000000)) throw new E('Invalid signature integer: unnecessary leading zero');
        return {
            d: b2n(res),
            l: data.subarray(len + 2)
        }; // d is data, l is left
    },
    toSig (hex) {
        // parse DER signature
        const { Err: E } = exports.DER;
        const data = typeof hex === 'string' ? h2b(hex) : hex;
        if (!(data instanceof Uint8Array)) throw new Error('ui8a expected');
        let l = data.length;
        if (l < 2 || data[0] != 0x30) throw new E('Invalid signature tag');
        if (data[1] !== l - 2) throw new E('Invalid signature: incorrect length');
        const { d: r, l: sBytes } = exports.DER._parseInt(data.subarray(2));
        const { d: s, l: rBytesLeft } = exports.DER._parseInt(sBytes);
        if (rBytesLeft.length) throw new E('Invalid signature: left bytes after parsing');
        return {
            r,
            s
        };
    },
    hexFromSig (sig) {
        // Add leading zero if first byte has negative bit enabled. More details in '_parseInt'
        const slice = (s)=>Number.parseInt(s[0], 16) & 0b1000 ? '00' + s : s;
        const h = (num)=>{
            const hex = num.toString(16);
            return hex.length & 1 ? `0${hex}` : hex;
        };
        const s = slice(h(sig.s));
        const r = slice(h(sig.r));
        const shl = s.length / 2;
        const rhl = r.length / 2;
        const sl = h(shl);
        const rl = h(rhl);
        return `30${h(rhl + shl + 4)}02${rl}${r}02${sl}${s}`;
    }
};
// Be friendly to bad ECMAScript parsers by not using bigint literals
// prettier-ignore
const _0n = BigInt(0), _1n = BigInt(1), _2n = BigInt(2), _3n = BigInt(3), _4n = BigInt(4);
function weierstrassPoints(opts) {
    const CURVE = validatePointOpts(opts);
    const { Fp } = CURVE; // All curves has same field / group length as for now, but they can differ
    const toBytes = CURVE.toBytes || ((_c, point, _isCompressed)=>{
        const a = point.toAffine();
        return ut.concatBytes(Uint8Array.from([
            0x04
        ]), Fp.toBytes(a.x), Fp.toBytes(a.y));
    });
    const fromBytes = CURVE.fromBytes || ((bytes)=>{
        // const head = bytes[0];
        const tail = bytes.subarray(1);
        // if (head !== 0x04) throw new Error('Only non-compressed encoding is supported');
        const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
        const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
        return {
            x,
            y
        };
    });
    /**
     * y² = x³ + ax + b: Short weierstrass curve formula
     * @returns y²
     */ function weierstrassEquation(x) {
        const { a, b } = CURVE;
        const x2 = Fp.sqr(x); // x * x
        const x3 = Fp.mul(x2, x); // x2 * x
        return Fp.add(Fp.add(x3, Fp.mul(x, a)), b); // x3 + a * x + b
    }
    // Validate whether the passed curve params are valid.
    // We check if curve equation works for generator point.
    // `assertValidity()` won't work: `isTorsionFree()` is not available at this point in bls12-381.
    // ProjectivePoint class has not been initialized yet.
    if (!Fp.eql(Fp.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx))) throw new Error('bad generator point: equation left != right');
    // Valid group elements reside in range 1..n-1
    function isWithinCurveOrder(num) {
        return typeof num === 'bigint' && _0n < num && num < CURVE.n;
    }
    function assertGE(num) {
        if (!isWithinCurveOrder(num)) throw new Error('Expected valid bigint: 0 < bigint < curve.n');
    }
    // Validates if priv key is valid and converts it to bigint.
    // Supports options allowedPrivateKeyLengths and wrapPrivateKey.
    function normPrivateKeyToScalar(key) {
        const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n } = CURVE;
        if (lengths && typeof key !== 'bigint') {
            if (key instanceof Uint8Array) key = ut.bytesToHex(key);
            // Normalize to hex string, pad. E.g. P521 would norm 130-132 char hex to 132-char bytes
            if (typeof key !== 'string' || !lengths.includes(key.length)) throw new Error('Invalid key');
            key = key.padStart(nByteLength * 2, '0');
        }
        let num;
        try {
            num = typeof key === 'bigint' ? key : ut.bytesToNumberBE((0, utils_js_1.ensureBytes)('private key', key, nByteLength));
        } catch (error) {
            throw new Error(`private key must be ${nByteLength} bytes, hex or bigint, not ${typeof key}`);
        }
        if (wrapPrivateKey) num = mod.mod(num, n); // disabled by default, enabled for BLS
        assertGE(num); // num in range [1..N-1]
        return num;
    }
    const pointPrecomputes = new Map();
    function assertPrjPoint(other) {
        if (!(other instanceof Point)) throw new Error('ProjectivePoint expected');
    }
    /**
     * Projective Point works in 3d / projective (homogeneous) coordinates: (x, y, z) ∋ (x=x/z, y=y/z)
     * Default Point works in 2d / affine coordinates: (x, y)
     * We're doing calculations in projective, because its operations don't require costly inversion.
     */ class Point {
        constructor(px, py, pz){
            this.px = px;
            this.py = py;
            this.pz = pz;
            if (px == null || !Fp.isValid(px)) throw new Error('x required');
            if (py == null || !Fp.isValid(py)) throw new Error('y required');
            if (pz == null || !Fp.isValid(pz)) throw new Error('z required');
        }
        // Does not validate if the point is on-curve.
        // Use fromHex instead, or call assertValidity() later.
        static fromAffine(p) {
            const { x, y } = p || {};
            if (!p || !Fp.isValid(x) || !Fp.isValid(y)) throw new Error('invalid affine point');
            if (p instanceof Point) throw new Error('projective point not allowed');
            const is0 = (i)=>Fp.eql(i, Fp.ZERO);
            // fromAffine(x:0, y:0) would produce (x:0, y:0, z:1), but we need (x:0, y:1, z:0)
            if (is0(x) && is0(y)) return Point.ZERO;
            return new Point(x, y, Fp.ONE);
        }
        get x() {
            return this.toAffine().x;
        }
        get y() {
            return this.toAffine().y;
        }
        /**
         * Takes a bunch of Projective Points but executes only one
         * inversion on all of them. Inversion is very slow operation,
         * so this improves performance massively.
         * Optimization: converts a list of projective points to a list of identical points with Z=1.
         */ static normalizeZ(points) {
            const toInv = Fp.invertBatch(points.map((p)=>p.pz));
            return points.map((p, i)=>p.toAffine(toInv[i])).map(Point.fromAffine);
        }
        /**
         * Converts hash string or Uint8Array to Point.
         * @param hex short/long ECDSA hex
         */ static fromHex(hex) {
            const P = Point.fromAffine(fromBytes((0, utils_js_1.ensureBytes)('pointHex', hex)));
            P.assertValidity();
            return P;
        }
        // Multiplies generator point by privateKey.
        static fromPrivateKey(privateKey) {
            return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
        }
        // "Private method", don't use it directly
        _setWindowSize(windowSize) {
            this._WINDOW_SIZE = windowSize;
            pointPrecomputes.delete(this);
        }
        // A point on curve is valid if it conforms to equation.
        assertValidity() {
            if (this.is0()) {
                // (0, 1, 0) aka ZERO is invalid in most contexts.
                // In BLS, ZERO can be serialized, so we allow it.
                // (0, 0, 0) is wrong representation of ZERO and is always invalid.
                if (CURVE.allowInfinityPoint && !Fp.is0(this.py)) return;
                throw new Error('bad point: ZERO');
            }
            // Some 3rd-party test vectors require different wording between here & `fromCompressedHex`
            const { x, y } = this.toAffine();
            // Check if x, y are valid field elements
            if (!Fp.isValid(x) || !Fp.isValid(y)) throw new Error('bad point: x or y not FE');
            const left = Fp.sqr(y); // y²
            const right = weierstrassEquation(x); // x³ + ax + b
            if (!Fp.eql(left, right)) throw new Error('bad point: equation left != right');
            if (!this.isTorsionFree()) throw new Error('bad point: not in prime-order subgroup');
        }
        hasEvenY() {
            const { y } = this.toAffine();
            if (Fp.isOdd) return !Fp.isOdd(y);
            throw new Error("Field doesn't support isOdd");
        }
        /**
         * Compare one point to another.
         */ equals(other) {
            assertPrjPoint(other);
            const { px: X1, py: Y1, pz: Z1 } = this;
            const { px: X2, py: Y2, pz: Z2 } = other;
            const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
            const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
            return U1 && U2;
        }
        /**
         * Flips point to one corresponding to (x, -y) in Affine coordinates.
         */ negate() {
            return new Point(this.px, Fp.neg(this.py), this.pz);
        }
        // Renes-Costello-Batina exception-free doubling formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 3
        // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
        double() {
            const { a, b } = CURVE;
            const b3 = Fp.mul(b, _3n);
            const { px: X1, py: Y1, pz: Z1 } = this;
            let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO; // prettier-ignore
            let t0 = Fp.mul(X1, X1); // step 1
            let t1 = Fp.mul(Y1, Y1);
            let t2 = Fp.mul(Z1, Z1);
            let t3 = Fp.mul(X1, Y1);
            t3 = Fp.add(t3, t3); // step 5
            Z3 = Fp.mul(X1, Z1);
            Z3 = Fp.add(Z3, Z3);
            X3 = Fp.mul(a, Z3);
            Y3 = Fp.mul(b3, t2);
            Y3 = Fp.add(X3, Y3); // step 10
            X3 = Fp.sub(t1, Y3);
            Y3 = Fp.add(t1, Y3);
            Y3 = Fp.mul(X3, Y3);
            X3 = Fp.mul(t3, X3);
            Z3 = Fp.mul(b3, Z3); // step 15
            t2 = Fp.mul(a, t2);
            t3 = Fp.sub(t0, t2);
            t3 = Fp.mul(a, t3);
            t3 = Fp.add(t3, Z3);
            Z3 = Fp.add(t0, t0); // step 20
            t0 = Fp.add(Z3, t0);
            t0 = Fp.add(t0, t2);
            t0 = Fp.mul(t0, t3);
            Y3 = Fp.add(Y3, t0);
            t2 = Fp.mul(Y1, Z1); // step 25
            t2 = Fp.add(t2, t2);
            t0 = Fp.mul(t2, t3);
            X3 = Fp.sub(X3, t0);
            Z3 = Fp.mul(t2, t1);
            Z3 = Fp.add(Z3, Z3); // step 30
            Z3 = Fp.add(Z3, Z3);
            return new Point(X3, Y3, Z3);
        }
        // Renes-Costello-Batina exception-free addition formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 1
        // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
        add(other) {
            assertPrjPoint(other);
            const { px: X1, py: Y1, pz: Z1 } = this;
            const { px: X2, py: Y2, pz: Z2 } = other;
            let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO; // prettier-ignore
            const a = CURVE.a;
            const b3 = Fp.mul(CURVE.b, _3n);
            let t0 = Fp.mul(X1, X2); // step 1
            let t1 = Fp.mul(Y1, Y2);
            let t2 = Fp.mul(Z1, Z2);
            let t3 = Fp.add(X1, Y1);
            let t4 = Fp.add(X2, Y2); // step 5
            t3 = Fp.mul(t3, t4);
            t4 = Fp.add(t0, t1);
            t3 = Fp.sub(t3, t4);
            t4 = Fp.add(X1, Z1);
            let t5 = Fp.add(X2, Z2); // step 10
            t4 = Fp.mul(t4, t5);
            t5 = Fp.add(t0, t2);
            t4 = Fp.sub(t4, t5);
            t5 = Fp.add(Y1, Z1);
            X3 = Fp.add(Y2, Z2); // step 15
            t5 = Fp.mul(t5, X3);
            X3 = Fp.add(t1, t2);
            t5 = Fp.sub(t5, X3);
            Z3 = Fp.mul(a, t4);
            X3 = Fp.mul(b3, t2); // step 20
            Z3 = Fp.add(X3, Z3);
            X3 = Fp.sub(t1, Z3);
            Z3 = Fp.add(t1, Z3);
            Y3 = Fp.mul(X3, Z3);
            t1 = Fp.add(t0, t0); // step 25
            t1 = Fp.add(t1, t0);
            t2 = Fp.mul(a, t2);
            t4 = Fp.mul(b3, t4);
            t1 = Fp.add(t1, t2);
            t2 = Fp.sub(t0, t2); // step 30
            t2 = Fp.mul(a, t2);
            t4 = Fp.add(t4, t2);
            t0 = Fp.mul(t1, t4);
            Y3 = Fp.add(Y3, t0);
            t0 = Fp.mul(t5, t4); // step 35
            X3 = Fp.mul(t3, X3);
            X3 = Fp.sub(X3, t0);
            t0 = Fp.mul(t3, t1);
            Z3 = Fp.mul(t5, Z3);
            Z3 = Fp.add(Z3, t0); // step 40
            return new Point(X3, Y3, Z3);
        }
        subtract(other) {
            return this.add(other.negate());
        }
        is0() {
            return this.equals(Point.ZERO);
        }
        wNAF(n) {
            return wnaf.wNAFCached(this, pointPrecomputes, n, (comp)=>{
                const toInv = Fp.invertBatch(comp.map((p)=>p.pz));
                return comp.map((p, i)=>p.toAffine(toInv[i])).map(Point.fromAffine);
            });
        }
        /**
         * Non-constant-time multiplication. Uses double-and-add algorithm.
         * It's faster, but should only be used when you don't care about
         * an exposed private key e.g. sig verification, which works over *public* keys.
         */ multiplyUnsafe(n) {
            const I = Point.ZERO;
            if (n === _0n) return I;
            assertGE(n); // Will throw on 0
            if (n === _1n) return this;
            const { endo } = CURVE;
            if (!endo) return wnaf.unsafeLadder(this, n);
            // Apply endomorphism
            let { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
            let k1p = I;
            let k2p = I;
            let d = this;
            while(k1 > _0n || k2 > _0n){
                if (k1 & _1n) k1p = k1p.add(d);
                if (k2 & _1n) k2p = k2p.add(d);
                d = d.double();
                k1 >>= _1n;
                k2 >>= _1n;
            }
            if (k1neg) k1p = k1p.negate();
            if (k2neg) k2p = k2p.negate();
            k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
            return k1p.add(k2p);
        }
        /**
         * Constant time multiplication.
         * Uses wNAF method. Windowed method may be 10% faster,
         * but takes 2x longer to generate and consumes 2x memory.
         * Uses precomputes when available.
         * Uses endomorphism for Koblitz curves.
         * @param scalar by which the point would be multiplied
         * @returns New point
         */ multiply(scalar) {
            assertGE(scalar);
            let n = scalar;
            let point, fake; // Fake point is used to const-time mult
            const { endo } = CURVE;
            if (endo) {
                const { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
                let { p: k1p, f: f1p } = this.wNAF(k1);
                let { p: k2p, f: f2p } = this.wNAF(k2);
                k1p = wnaf.constTimeNegate(k1neg, k1p);
                k2p = wnaf.constTimeNegate(k2neg, k2p);
                k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
                point = k1p.add(k2p);
                fake = f1p.add(f2p);
            } else {
                const { p, f } = this.wNAF(n);
                point = p;
                fake = f;
            }
            // Normalize `z` for both points, but return only real one
            return Point.normalizeZ([
                point,
                fake
            ])[0];
        }
        /**
         * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
         * Not using Strauss-Shamir trick: precomputation tables are faster.
         * The trick could be useful if both P and Q are not G (not in our case).
         * @returns non-zero affine point
         */ multiplyAndAddUnsafe(Q, a, b) {
            const G = Point.BASE; // No Strauss-Shamir trick: we have 10% faster G precomputes
            const mul = (P, a // Select faster multiply() method
            )=>a === _0n || a === _1n || !P.equals(G) ? P.multiplyUnsafe(a) : P.multiply(a);
            const sum = mul(this, a).add(mul(Q, b));
            return sum.is0() ? undefined : sum;
        }
        // Converts Projective point to affine (x, y) coordinates.
        // Can accept precomputed Z^-1 - for example, from invertBatch.
        // (x, y, z) ∋ (x=x/z, y=y/z)
        toAffine(iz) {
            const { px: x, py: y, pz: z } = this;
            const is0 = this.is0();
            // If invZ was 0, we return zero point. However we still want to execute
            // all operations, so we replace invZ with a random number, 1.
            if (iz == null) iz = is0 ? Fp.ONE : Fp.inv(z);
            const ax = Fp.mul(x, iz);
            const ay = Fp.mul(y, iz);
            const zz = Fp.mul(z, iz);
            if (is0) return {
                x: Fp.ZERO,
                y: Fp.ZERO
            };
            if (!Fp.eql(zz, Fp.ONE)) throw new Error('invZ was invalid');
            return {
                x: ax,
                y: ay
            };
        }
        isTorsionFree() {
            const { h: cofactor, isTorsionFree } = CURVE;
            if (cofactor === _1n) return true; // No subgroups, always torsion-free
            if (isTorsionFree) return isTorsionFree(Point, this);
            throw new Error('isTorsionFree() has not been declared for the elliptic curve');
        }
        clearCofactor() {
            const { h: cofactor, clearCofactor } = CURVE;
            if (cofactor === _1n) return this; // Fast-path
            if (clearCofactor) return clearCofactor(Point, this);
            return this.multiplyUnsafe(CURVE.h);
        }
        toRawBytes(isCompressed = true) {
            this.assertValidity();
            return toBytes(Point, this, isCompressed);
        }
        toHex(isCompressed = true) {
            return ut.bytesToHex(this.toRawBytes(isCompressed));
        }
    }
    Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
    Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
    const _bits = CURVE.nBitLength;
    const wnaf = (0, curve_js_1.wNAF)(Point, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
    // Validate if generator point is on curve
    return {
        CURVE,
        ProjectivePoint: Point,
        normPrivateKeyToScalar,
        weierstrassEquation,
        isWithinCurveOrder
    };
}
exports.weierstrassPoints = weierstrassPoints;
function validateOpts(curve) {
    const opts = (0, curve_js_1.validateBasic)(curve);
    ut.validateObject(opts, {
        hash: 'hash',
        hmac: 'function',
        randomBytes: 'function'
    }, {
        bits2int: 'function',
        bits2int_modN: 'function',
        lowS: 'boolean'
    });
    return Object.freeze({
        lowS: true,
        ...opts
    });
}
function weierstrass(curveDef) {
    const CURVE = validateOpts(curveDef);
    const { Fp, n: CURVE_ORDER } = CURVE;
    const compressedLen = Fp.BYTES + 1; // e.g. 33 for 32
    const uncompressedLen = 2 * Fp.BYTES + 1; // e.g. 65 for 32
    function isValidFieldElement(num) {
        return _0n < num && num < Fp.ORDER; // 0 is banned since it's not invertible FE
    }
    function modN(a) {
        return mod.mod(a, CURVE_ORDER);
    }
    function invN(a) {
        return mod.invert(a, CURVE_ORDER);
    }
    const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
        ...CURVE,
        toBytes (_c, point, isCompressed) {
            const a = point.toAffine();
            const x = Fp.toBytes(a.x);
            const cat = ut.concatBytes;
            if (isCompressed) {
                return cat(Uint8Array.from([
                    point.hasEvenY() ? 0x02 : 0x03
                ]), x);
            } else {
                return cat(Uint8Array.from([
                    0x04
                ]), x, Fp.toBytes(a.y));
            }
        },
        fromBytes (bytes) {
            const len = bytes.length;
            const head = bytes[0];
            const tail = bytes.subarray(1);
            // this.assertValidity() is done inside of fromHex
            if (len === compressedLen && (head === 0x02 || head === 0x03)) {
                const x = ut.bytesToNumberBE(tail);
                if (!isValidFieldElement(x)) throw new Error('Point is not on curve');
                const y2 = weierstrassEquation(x); // y² = x³ + ax + b
                let y = Fp.sqrt(y2); // y = y² ^ (p+1)/4
                const isYOdd = (y & _1n) === _1n;
                // ECDSA
                const isHeadOdd = (head & 1) === 1;
                if (isHeadOdd !== isYOdd) y = Fp.neg(y);
                return {
                    x,
                    y
                };
            } else if (len === uncompressedLen && head === 0x04) {
                const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
                const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
                return {
                    x,
                    y
                };
            } else {
                throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
            }
        }
    });
    const numToNByteStr = (num)=>ut.bytesToHex(ut.numberToBytesBE(num, CURVE.nByteLength));
    function isBiggerThanHalfOrder(number) {
        const HALF = CURVE_ORDER >> _1n;
        return number > HALF;
    }
    function normalizeS(s) {
        return isBiggerThanHalfOrder(s) ? modN(-s) : s;
    }
    // slice bytes num
    const slcNum = (b, from, to)=>ut.bytesToNumberBE(b.slice(from, to));
    /**
     * ECDSA signature with its (r, s) properties. Supports DER & compact representations.
     */ class Signature {
        constructor(r, s, recovery){
            this.r = r;
            this.s = s;
            this.recovery = recovery;
            this.assertValidity();
        }
        // pair (bytes of r, bytes of s)
        static fromCompact(hex) {
            const l = CURVE.nByteLength;
            hex = (0, utils_js_1.ensureBytes)('compactSignature', hex, l * 2);
            return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
        }
        // DER encoded ECDSA signature
        // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
        static fromDER(hex) {
            const { r, s } = exports.DER.toSig((0, utils_js_1.ensureBytes)('DER', hex));
            return new Signature(r, s);
        }
        assertValidity() {
            // can use assertGE here
            if (!isWithinCurveOrder(this.r)) throw new Error('r must be 0 < r < CURVE.n');
            if (!isWithinCurveOrder(this.s)) throw new Error('s must be 0 < s < CURVE.n');
        }
        addRecoveryBit(recovery) {
            return new Signature(this.r, this.s, recovery);
        }
        recoverPublicKey(msgHash) {
            const { r, s, recovery: rec } = this;
            const h = bits2int_modN((0, utils_js_1.ensureBytes)('msgHash', msgHash)); // Truncate hash
            if (rec == null || ![
                0,
                1,
                2,
                3
            ].includes(rec)) throw new Error('recovery id invalid');
            const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
            if (radj >= Fp.ORDER) throw new Error('recovery id 2 or 3 invalid');
            const prefix = (rec & 1) === 0 ? '02' : '03';
            const R = Point.fromHex(prefix + numToNByteStr(radj));
            const ir = invN(radj); // r^-1
            const u1 = modN(-h * ir); // -hr^-1
            const u2 = modN(s * ir); // sr^-1
            const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2); // (sr^-1)R-(hr^-1)G = -(hr^-1)G + (sr^-1)
            if (!Q) throw new Error('point at infinify'); // unsafe is fine: no priv data leaked
            Q.assertValidity();
            return Q;
        }
        // Signatures should be low-s, to prevent malleability.
        hasHighS() {
            return isBiggerThanHalfOrder(this.s);
        }
        normalizeS() {
            return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
        }
        // DER-encoded
        toDERRawBytes() {
            return ut.hexToBytes(this.toDERHex());
        }
        toDERHex() {
            return exports.DER.hexFromSig({
                r: this.r,
                s: this.s
            });
        }
        // padded bytes of r, then padded bytes of s
        toCompactRawBytes() {
            return ut.hexToBytes(this.toCompactHex());
        }
        toCompactHex() {
            return numToNByteStr(this.r) + numToNByteStr(this.s);
        }
    }
    const utils = {
        isValidPrivateKey (privateKey) {
            try {
                normPrivateKeyToScalar(privateKey);
                return true;
            } catch (error) {
                return false;
            }
        },
        normPrivateKeyToScalar: normPrivateKeyToScalar,
        /**
         * Produces cryptographically secure private key from random of size
         * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
         */ randomPrivateKey: ()=>{
            const length = mod.getMinHashLength(CURVE.n);
            return mod.mapHashToField(CURVE.randomBytes(length), CURVE.n);
        },
        /**
         * Creates precompute table for an arbitrary EC point. Makes point "cached".
         * Allows to massively speed-up `point.multiply(scalar)`.
         * @returns cached point
         * @example
         * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
         * fast.multiply(privKey); // much faster ECDH now
         */ precompute (windowSize = 8, point = Point.BASE) {
            point._setWindowSize(windowSize);
            point.multiply(BigInt(3)); // 3 is arbitrary, just need any number here
            return point;
        }
    };
    /**
     * Computes public key for a private key. Checks for validity of the private key.
     * @param privateKey private key
     * @param isCompressed whether to return compact (default), or full key
     * @returns Public key, full when isCompressed=false; short when isCompressed=true
     */ function getPublicKey(privateKey, isCompressed = true) {
        return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
    }
    /**
     * Quick and dirty check for item being public key. Does not validate hex, or being on-curve.
     */ function isProbPub(item) {
        const arr = item instanceof Uint8Array;
        const str = typeof item === 'string';
        const len = (arr || str) && item.length;
        if (arr) return len === compressedLen || len === uncompressedLen;
        if (str) return len === 2 * compressedLen || len === 2 * uncompressedLen;
        if (item instanceof Point) return true;
        return false;
    }
    /**
     * ECDH (Elliptic Curve Diffie Hellman).
     * Computes shared public key from private key and public key.
     * Checks: 1) private key validity 2) shared key is on-curve.
     * Does NOT hash the result.
     * @param privateA private key
     * @param publicB different public key
     * @param isCompressed whether to return compact (default), or full key
     * @returns shared public key
     */ function getSharedSecret(privateA, publicB, isCompressed = true) {
        if (isProbPub(privateA)) throw new Error('first arg must be private key');
        if (!isProbPub(publicB)) throw new Error('second arg must be public key');
        const b = Point.fromHex(publicB); // check for being on-curve
        return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
    }
    // RFC6979: ensure ECDSA msg is X bytes and < N. RFC suggests optional truncating via bits2octets.
    // FIPS 186-4 4.6 suggests the leftmost min(nBitLen, outLen) bits, which matches bits2int.
    // bits2int can produce res>N, we can do mod(res, N) since the bitLen is the same.
    // int2octets can't be used; pads small msgs with 0: unacceptatble for trunc as per RFC vectors
    const bits2int = CURVE.bits2int || function(bytes) {
        // For curves with nBitLength % 8 !== 0: bits2octets(bits2octets(m)) !== bits2octets(m)
        // for some cases, since bytes.length * 8 is not actual bitLength.
        const num = ut.bytesToNumberBE(bytes); // check for == u8 done here
        const delta = bytes.length * 8 - CURVE.nBitLength; // truncate to nBitLength leftmost bits
        return delta > 0 ? num >> BigInt(delta) : num;
    };
    const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
        return modN(bits2int(bytes)); // can't use bytesToNumberBE here
    };
    // NOTE: pads output with zero as per spec
    const ORDER_MASK = ut.bitMask(CURVE.nBitLength);
    /**
     * Converts to bytes. Checks if num in `[0..ORDER_MASK-1]` e.g.: `[0..2^256-1]`.
     */ function int2octets(num) {
        if (typeof num !== 'bigint') throw new Error('bigint expected');
        if (!(_0n <= num && num < ORDER_MASK)) throw new Error(`bigint expected < 2^${CURVE.nBitLength}`);
        // works with order, can have different size than numToField!
        return ut.numberToBytesBE(num, CURVE.nByteLength);
    }
    // Steps A, D of RFC6979 3.2
    // Creates RFC6979 seed; converts msg/privKey to numbers.
    // Used only in sign, not in verify.
    // NOTE: we cannot assume here that msgHash has same amount of bytes as curve order, this will be wrong at least for P521.
    // Also it can be bigger for P224 + SHA256
    function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
        if ([
            'recovered',
            'canonical'
        ].some((k)=>k in opts)) throw new Error('sign() legacy options not supported');
        const { hash, randomBytes } = CURVE;
        let { lowS, prehash, extraEntropy: ent } = opts; // generates low-s sigs by default
        if (lowS == null) lowS = true; // RFC6979 3.2: we skip step A, because we already provide hash
        msgHash = (0, utils_js_1.ensureBytes)('msgHash', msgHash);
        if (prehash) msgHash = (0, utils_js_1.ensureBytes)('prehashed msgHash', hash(msgHash));
        // We can't later call bits2octets, since nested bits2int is broken for curves
        // with nBitLength % 8 !== 0. Because of that, we unwrap it here as int2octets call.
        // const bits2octets = (bits) => int2octets(bits2int_modN(bits))
        const h1int = bits2int_modN(msgHash);
        const d = normPrivateKeyToScalar(privateKey); // validate private key, convert to bigint
        const seedArgs = [
            int2octets(d),
            int2octets(h1int)
        ];
        // extraEntropy. RFC6979 3.6: additional k' (optional).
        if (ent != null) {
            // K = HMAC_K(V || 0x00 || int2octets(x) || bits2octets(h1) || k')
            const e = ent === true ? randomBytes(Fp.BYTES) : ent; // generate random bytes OR pass as-is
            seedArgs.push((0, utils_js_1.ensureBytes)('extraEntropy', e)); // check for being bytes
        }
        const seed = ut.concatBytes(...seedArgs); // Step D of RFC6979 3.2
        const m = h1int; // NOTE: no need to call bits2int second time here, it is inside truncateHash!
        // Converts signature params into point w r/s, checks result for validity.
        function k2sig(kBytes) {
            // RFC 6979 Section 3.2, step 3: k = bits2int(T)
            const k = bits2int(kBytes); // Cannot use fields methods, since it is group element
            if (!isWithinCurveOrder(k)) return; // Important: all mod() calls here must be done over N
            const ik = invN(k); // k^-1 mod n
            const q = Point.BASE.multiply(k).toAffine(); // q = Gk
            const r = modN(q.x); // r = q.x mod n
            if (r === _0n) return;
            // Can use scalar blinding b^-1(bm + bdr) where b ∈ [1,q−1] according to
            // https://tches.iacr.org/index.php/TCHES/article/view/7337/6509. We've decided against it:
            // a) dependency on CSPRNG b) 15% slowdown c) doesn't really help since bigints are not CT
            const s = modN(ik * modN(m + r * d)); // Not using blinding here
            if (s === _0n) return;
            let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n); // recovery bit (2 or 3, when q.x > n)
            let normS = s;
            if (lowS && isBiggerThanHalfOrder(s)) {
                normS = normalizeS(s); // if lowS was passed, ensure s is always
                recovery ^= 1; // // in the bottom half of N
            }
            return new Signature(r, normS, recovery); // use normS, not s
        }
        return {
            seed,
            k2sig
        };
    }
    const defaultSigOpts = {
        lowS: CURVE.lowS,
        prehash: false
    };
    const defaultVerOpts = {
        lowS: CURVE.lowS,
        prehash: false
    };
    /**
     * Signs message hash with a private key.
     * ```
     * sign(m, d, k) where
     *   (x, y) = G × k
     *   r = x mod n
     *   s = (m + dr)/k mod n
     * ```
     * @param msgHash NOT message. msg needs to be hashed to `msgHash`, or use `prehash`.
     * @param privKey private key
     * @param opts lowS for non-malleable sigs. extraEntropy for mixing randomness into k. prehash will hash first arg.
     * @returns signature with recovery param
     */ function sign(msgHash, privKey, opts = defaultSigOpts) {
        const { seed, k2sig } = prepSig(msgHash, privKey, opts); // Steps A, D of RFC6979 3.2.
        const C = CURVE;
        const drbg = ut.createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
        return drbg(seed, k2sig); // Steps B, C, D, E, F, G
    }
    // Enable precomputes. Slows down first publicKey computation by 20ms.
    Point.BASE._setWindowSize(8);
    // utils.precompute(8, ProjectivePoint.BASE)
    /**
     * Verifies a signature against message hash and public key.
     * Rejects lowS signatures by default: to override,
     * specify option `{lowS: false}`. Implements section 4.1.4 from https://www.secg.org/sec1-v2.pdf:
     *
     * ```
     * verify(r, s, h, P) where
     *   U1 = hs^-1 mod n
     *   U2 = rs^-1 mod n
     *   R = U1⋅G - U2⋅P
     *   mod(R.x, n) == r
     * ```
     */ function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
        const sg = signature;
        msgHash = (0, utils_js_1.ensureBytes)('msgHash', msgHash);
        publicKey = (0, utils_js_1.ensureBytes)('publicKey', publicKey);
        if ('strict' in opts) throw new Error('options.strict was renamed to lowS');
        const { lowS, prehash } = opts;
        let _sig = undefined;
        let P;
        try {
            if (typeof sg === 'string' || sg instanceof Uint8Array) {
                // Signature can be represented in 2 ways: compact (2*nByteLength) & DER (variable-length).
                // Since DER can also be 2*nByteLength bytes, we check for it first.
                try {
                    _sig = Signature.fromDER(sg);
                } catch (derError) {
                    if (!(derError instanceof exports.DER.Err)) throw derError;
                    _sig = Signature.fromCompact(sg);
                }
            } else if (typeof sg === 'object' && typeof sg.r === 'bigint' && typeof sg.s === 'bigint') {
                const { r, s } = sg;
                _sig = new Signature(r, s);
            } else {
                throw new Error('PARSE');
            }
            P = Point.fromHex(publicKey);
        } catch (error) {
            if (error.message === 'PARSE') throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
            return false;
        }
        if (lowS && _sig.hasHighS()) return false;
        if (prehash) msgHash = CURVE.hash(msgHash);
        const { r, s } = _sig;
        const h = bits2int_modN(msgHash); // Cannot use fields methods, since it is group element
        const is = invN(s); // s^-1
        const u1 = modN(h * is); // u1 = hs^-1 mod n
        const u2 = modN(r * is); // u2 = rs^-1 mod n
        const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine(); // R = u1⋅G + u2⋅P
        if (!R) return false;
        const v = modN(R.x);
        return v === r;
    }
    return {
        CURVE,
        getPublicKey,
        getSharedSecret,
        sign,
        verify,
        ProjectivePoint: Point,
        Signature,
        utils
    };
}
exports.weierstrass = weierstrass;
/**
 * Implementation of the Shallue and van de Woestijne method for any weierstrass curve.
 * TODO: check if there is a way to merge this with uvRatio in Edwards; move to modular.
 * b = True and y = sqrt(u / v) if (u / v) is square in F, and
 * b = False and y = sqrt(Z * (u / v)) otherwise.
 * @param Fp
 * @param Z
 * @returns
 */ function SWUFpSqrtRatio(Fp, Z) {
    // Generic implementation
    const q = Fp.ORDER;
    let l = _0n;
    for(let o = q - _1n; o % _2n === _0n; o /= _2n)l += _1n;
    const c1 = l; // 1. c1, the largest integer such that 2^c1 divides q - 1.
    // We need 2n ** c1 and 2n ** (c1-1). We can't use **; but we can use <<.
    // 2n ** c1 == 2n << (c1-1)
    const _2n_pow_c1_1 = _2n << c1 - _1n - _1n;
    const _2n_pow_c1 = _2n_pow_c1_1 * _2n;
    const c2 = (q - _1n) / _2n_pow_c1; // 2. c2 = (q - 1) / (2^c1)  # Integer arithmetic
    const c3 = (c2 - _1n) / _2n; // 3. c3 = (c2 - 1) / 2            # Integer arithmetic
    const c4 = _2n_pow_c1 - _1n; // 4. c4 = 2^c1 - 1                # Integer arithmetic
    const c5 = _2n_pow_c1_1; // 5. c5 = 2^(c1 - 1)                  # Integer arithmetic
    const c6 = Fp.pow(Z, c2); // 6. c6 = Z^c2
    const c7 = Fp.pow(Z, (c2 + _1n) / _2n); // 7. c7 = Z^((c2 + 1) / 2)
    let sqrtRatio = (u, v)=>{
        let tv1 = c6; // 1. tv1 = c6
        let tv2 = Fp.pow(v, c4); // 2. tv2 = v^c4
        let tv3 = Fp.sqr(tv2); // 3. tv3 = tv2^2
        tv3 = Fp.mul(tv3, v); // 4. tv3 = tv3 * v
        let tv5 = Fp.mul(u, tv3); // 5. tv5 = u * tv3
        tv5 = Fp.pow(tv5, c3); // 6. tv5 = tv5^c3
        tv5 = Fp.mul(tv5, tv2); // 7. tv5 = tv5 * tv2
        tv2 = Fp.mul(tv5, v); // 8. tv2 = tv5 * v
        tv3 = Fp.mul(tv5, u); // 9. tv3 = tv5 * u
        let tv4 = Fp.mul(tv3, tv2); // 10. tv4 = tv3 * tv2
        tv5 = Fp.pow(tv4, c5); // 11. tv5 = tv4^c5
        let isQR = Fp.eql(tv5, Fp.ONE); // 12. isQR = tv5 == 1
        tv2 = Fp.mul(tv3, c7); // 13. tv2 = tv3 * c7
        tv5 = Fp.mul(tv4, tv1); // 14. tv5 = tv4 * tv1
        tv3 = Fp.cmov(tv2, tv3, isQR); // 15. tv3 = CMOV(tv2, tv3, isQR)
        tv4 = Fp.cmov(tv5, tv4, isQR); // 16. tv4 = CMOV(tv5, tv4, isQR)
        // 17. for i in (c1, c1 - 1, ..., 2):
        for(let i = c1; i > _1n; i--){
            let tv5 = i - _2n; // 18.    tv5 = i - 2
            tv5 = _2n << tv5 - _1n; // 19.    tv5 = 2^tv5
            let tvv5 = Fp.pow(tv4, tv5); // 20.    tv5 = tv4^tv5
            const e1 = Fp.eql(tvv5, Fp.ONE); // 21.    e1 = tv5 == 1
            tv2 = Fp.mul(tv3, tv1); // 22.    tv2 = tv3 * tv1
            tv1 = Fp.mul(tv1, tv1); // 23.    tv1 = tv1 * tv1
            tvv5 = Fp.mul(tv4, tv1); // 24.    tv5 = tv4 * tv1
            tv3 = Fp.cmov(tv2, tv3, e1); // 25.    tv3 = CMOV(tv2, tv3, e1)
            tv4 = Fp.cmov(tvv5, tv4, e1); // 26.    tv4 = CMOV(tv5, tv4, e1)
        }
        return {
            isValid: isQR,
            value: tv3
        };
    };
    if (Fp.ORDER % _4n === _3n) {
        // sqrt_ratio_3mod4(u, v)
        const c1 = (Fp.ORDER - _3n) / _4n; // 1. c1 = (q - 3) / 4     # Integer arithmetic
        const c2 = Fp.sqrt(Fp.neg(Z)); // 2. c2 = sqrt(-Z)
        sqrtRatio = (u, v)=>{
            let tv1 = Fp.sqr(v); // 1. tv1 = v^2
            const tv2 = Fp.mul(u, v); // 2. tv2 = u * v
            tv1 = Fp.mul(tv1, tv2); // 3. tv1 = tv1 * tv2
            let y1 = Fp.pow(tv1, c1); // 4. y1 = tv1^c1
            y1 = Fp.mul(y1, tv2); // 5. y1 = y1 * tv2
            const y2 = Fp.mul(y1, c2); // 6. y2 = y1 * c2
            const tv3 = Fp.mul(Fp.sqr(y1), v); // 7. tv3 = y1^2; 8. tv3 = tv3 * v
            const isQR = Fp.eql(tv3, u); // 9. isQR = tv3 == u
            let y = Fp.cmov(y2, y1, isQR); // 10. y = CMOV(y2, y1, isQR)
            return {
                isValid: isQR,
                value: y
            }; // 11. return (isQR, y) isQR ? y : y*c2
        };
    }
    // No curves uses that
    // if (Fp.ORDER % _8n === _5n) // sqrt_ratio_5mod8
    return sqrtRatio;
}
exports.SWUFpSqrtRatio = SWUFpSqrtRatio;
/**
 * Simplified Shallue-van de Woestijne-Ulas Method
 * https://www.rfc-editor.org/rfc/rfc9380#section-6.6.2
 */ function mapToCurveSimpleSWU(Fp, opts) {
    mod.validateField(Fp);
    if (!Fp.isValid(opts.A) || !Fp.isValid(opts.B) || !Fp.isValid(opts.Z)) throw new Error('mapToCurveSimpleSWU: invalid opts');
    const sqrtRatio = SWUFpSqrtRatio(Fp, opts.Z);
    if (!Fp.isOdd) throw new Error('Fp.isOdd is not implemented!');
    // Input: u, an element of F.
    // Output: (x, y), a point on E.
    return (u)=>{
        // prettier-ignore
        let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
        tv1 = Fp.sqr(u); // 1.  tv1 = u^2
        tv1 = Fp.mul(tv1, opts.Z); // 2.  tv1 = Z * tv1
        tv2 = Fp.sqr(tv1); // 3.  tv2 = tv1^2
        tv2 = Fp.add(tv2, tv1); // 4.  tv2 = tv2 + tv1
        tv3 = Fp.add(tv2, Fp.ONE); // 5.  tv3 = tv2 + 1
        tv3 = Fp.mul(tv3, opts.B); // 6.  tv3 = B * tv3
        tv4 = Fp.cmov(opts.Z, Fp.neg(tv2), !Fp.eql(tv2, Fp.ZERO)); // 7.  tv4 = CMOV(Z, -tv2, tv2 != 0)
        tv4 = Fp.mul(tv4, opts.A); // 8.  tv4 = A * tv4
        tv2 = Fp.sqr(tv3); // 9.  tv2 = tv3^2
        tv6 = Fp.sqr(tv4); // 10. tv6 = tv4^2
        tv5 = Fp.mul(tv6, opts.A); // 11. tv5 = A * tv6
        tv2 = Fp.add(tv2, tv5); // 12. tv2 = tv2 + tv5
        tv2 = Fp.mul(tv2, tv3); // 13. tv2 = tv2 * tv3
        tv6 = Fp.mul(tv6, tv4); // 14. tv6 = tv6 * tv4
        tv5 = Fp.mul(tv6, opts.B); // 15. tv5 = B * tv6
        tv2 = Fp.add(tv2, tv5); // 16. tv2 = tv2 + tv5
        x = Fp.mul(tv1, tv3); // 17.   x = tv1 * tv3
        const { isValid, value } = sqrtRatio(tv2, tv6); // 18. (is_gx1_square, y1) = sqrt_ratio(tv2, tv6)
        y = Fp.mul(tv1, u); // 19.   y = tv1 * u  -> Z * u^3 * y1
        y = Fp.mul(y, value); // 20.   y = y * y1
        x = Fp.cmov(x, tv3, isValid); // 21.   x = CMOV(x, tv3, is_gx1_square)
        y = Fp.cmov(y, value, isValid); // 22.   y = CMOV(y, y1, is_gx1_square)
        const e1 = Fp.isOdd(u) === Fp.isOdd(y); // 23.  e1 = sgn0(u) == sgn0(y)
        y = Fp.cmov(Fp.neg(y), y, e1); // 24.   y = CMOV(-y, y, e1)
        x = Fp.div(x, tv4); // 25.   x = x / tv4
        return {
            x,
            y
        };
    };
}
exports.mapToCurveSimpleSWU = mapToCurveSimpleSWU; //# sourceMappingURL=weierstrass.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/curves/abstract/hash-to-curve.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createHasher = exports.isogenyMap = exports.hash_to_field = exports.expand_message_xof = exports.expand_message_xmd = void 0;
const modular_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/modular.js [app-ssr] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/utils.js [app-ssr] (ecmascript)");
function validateDST(dst) {
    if (dst instanceof Uint8Array) return dst;
    if (typeof dst === 'string') return (0, utils_js_1.utf8ToBytes)(dst);
    throw new Error('DST must be Uint8Array or string');
}
// Octet Stream to Integer. "spec" implementation of os2ip is 2.5x slower vs bytesToNumberBE.
const os2ip = utils_js_1.bytesToNumberBE;
// Integer to Octet Stream (numberToBytesBE)
function i2osp(value, length) {
    if (value < 0 || value >= 1 << 8 * length) {
        throw new Error(`bad I2OSP call: value=${value} length=${length}`);
    }
    const res = Array.from({
        length
    }).fill(0);
    for(let i = length - 1; i >= 0; i--){
        res[i] = value & 0xff;
        value >>>= 8;
    }
    return new Uint8Array(res);
}
function strxor(a, b) {
    const arr = new Uint8Array(a.length);
    for(let i = 0; i < a.length; i++){
        arr[i] = a[i] ^ b[i];
    }
    return arr;
}
function isBytes(item) {
    if (!(item instanceof Uint8Array)) throw new Error('Uint8Array expected');
}
function isNum(item) {
    if (!Number.isSafeInteger(item)) throw new Error('number expected');
}
// Produces a uniformly random byte string using a cryptographic hash function H that outputs b bits
// https://www.rfc-editor.org/rfc/rfc9380#section-5.3.1
function expand_message_xmd(msg, DST, lenInBytes, H) {
    isBytes(msg);
    isBytes(DST);
    isNum(lenInBytes);
    // https://www.rfc-editor.org/rfc/rfc9380#section-5.3.3
    if (DST.length > 255) DST = H((0, utils_js_1.concatBytes)((0, utils_js_1.utf8ToBytes)('H2C-OVERSIZE-DST-'), DST));
    const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
    const ell = Math.ceil(lenInBytes / b_in_bytes);
    if (ell > 255) throw new Error('Invalid xmd length');
    const DST_prime = (0, utils_js_1.concatBytes)(DST, i2osp(DST.length, 1));
    const Z_pad = i2osp(0, r_in_bytes);
    const l_i_b_str = i2osp(lenInBytes, 2); // len_in_bytes_str
    const b = new Array(ell);
    const b_0 = H((0, utils_js_1.concatBytes)(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
    b[0] = H((0, utils_js_1.concatBytes)(b_0, i2osp(1, 1), DST_prime));
    for(let i = 1; i <= ell; i++){
        const args = [
            strxor(b_0, b[i - 1]),
            i2osp(i + 1, 1),
            DST_prime
        ];
        b[i] = H((0, utils_js_1.concatBytes)(...args));
    }
    const pseudo_random_bytes = (0, utils_js_1.concatBytes)(...b);
    return pseudo_random_bytes.slice(0, lenInBytes);
}
exports.expand_message_xmd = expand_message_xmd;
// Produces a uniformly random byte string using an extendable-output function (XOF) H.
// 1. The collision resistance of H MUST be at least k bits.
// 2. H MUST be an XOF that has been proved indifferentiable from
//    a random oracle under a reasonable cryptographic assumption.
// https://www.rfc-editor.org/rfc/rfc9380#section-5.3.2
function expand_message_xof(msg, DST, lenInBytes, k, H) {
    isBytes(msg);
    isBytes(DST);
    isNum(lenInBytes);
    // https://www.rfc-editor.org/rfc/rfc9380#section-5.3.3
    // DST = H('H2C-OVERSIZE-DST-' || a_very_long_DST, Math.ceil((lenInBytes * k) / 8));
    if (DST.length > 255) {
        const dkLen = Math.ceil(2 * k / 8);
        DST = H.create({
            dkLen
        }).update((0, utils_js_1.utf8ToBytes)('H2C-OVERSIZE-DST-')).update(DST).digest();
    }
    if (lenInBytes > 65535 || DST.length > 255) throw new Error('expand_message_xof: invalid lenInBytes');
    return H.create({
        dkLen: lenInBytes
    }).update(msg).update(i2osp(lenInBytes, 2))// 2. DST_prime = DST || I2OSP(len(DST), 1)
    .update(DST).update(i2osp(DST.length, 1)).digest();
}
exports.expand_message_xof = expand_message_xof;
/**
 * Hashes arbitrary-length byte strings to a list of one or more elements of a finite field F
 * https://www.rfc-editor.org/rfc/rfc9380#section-5.2
 * @param msg a byte string containing the message to hash
 * @param count the number of elements of F to output
 * @param options `{DST: string, p: bigint, m: number, k: number, expand: 'xmd' | 'xof', hash: H}`, see above
 * @returns [u_0, ..., u_(count - 1)], a list of field elements.
 */ function hash_to_field(msg, count, options) {
    (0, utils_js_1.validateObject)(options, {
        DST: 'stringOrUint8Array',
        p: 'bigint',
        m: 'isSafeInteger',
        k: 'isSafeInteger',
        hash: 'hash'
    });
    const { p, k, m, hash, expand, DST: _DST } = options;
    isBytes(msg);
    isNum(count);
    const DST = validateDST(_DST);
    const log2p = p.toString(2).length;
    const L = Math.ceil((log2p + k) / 8); // section 5.1 of ietf draft link above
    const len_in_bytes = count * m * L;
    let prb; // pseudo_random_bytes
    if (expand === 'xmd') {
        prb = expand_message_xmd(msg, DST, len_in_bytes, hash);
    } else if (expand === 'xof') {
        prb = expand_message_xof(msg, DST, len_in_bytes, k, hash);
    } else if (expand === '_internal_pass') {
        // for internal tests only
        prb = msg;
    } else {
        throw new Error('expand must be "xmd" or "xof"');
    }
    const u = new Array(count);
    for(let i = 0; i < count; i++){
        const e = new Array(m);
        for(let j = 0; j < m; j++){
            const elm_offset = L * (j + i * m);
            const tv = prb.subarray(elm_offset, elm_offset + L);
            e[j] = (0, modular_js_1.mod)(os2ip(tv), p);
        }
        u[i] = e;
    }
    return u;
}
exports.hash_to_field = hash_to_field;
function isogenyMap(field, map) {
    // Make same order as in spec
    const COEFF = map.map((i)=>Array.from(i).reverse());
    return (x, y)=>{
        const [xNum, xDen, yNum, yDen] = COEFF.map((val)=>val.reduce((acc, i)=>field.add(field.mul(acc, x), i)));
        x = field.div(xNum, xDen); // xNum / xDen
        y = field.mul(y, field.div(yNum, yDen)); // y * (yNum / yDev)
        return {
            x,
            y
        };
    };
}
exports.isogenyMap = isogenyMap;
function createHasher(Point, mapToCurve, def) {
    if (typeof mapToCurve !== 'function') throw new Error('mapToCurve() must be defined');
    return {
        // Encodes byte string to elliptic curve.
        // hash_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
        hashToCurve (msg, options) {
            const u = hash_to_field(msg, 2, {
                ...def,
                DST: def.DST,
                ...options
            });
            const u0 = Point.fromAffine(mapToCurve(u[0]));
            const u1 = Point.fromAffine(mapToCurve(u[1]));
            const P = u0.add(u1).clearCofactor();
            P.assertValidity();
            return P;
        },
        // Encodes byte string to elliptic curve.
        // encode_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
        encodeToCurve (msg, options) {
            const u = hash_to_field(msg, 1, {
                ...def,
                DST: def.encodeDST,
                ...options
            });
            const P = Point.fromAffine(mapToCurve(u[0])).clearCofactor();
            P.assertValidity();
            return P;
        }
    };
}
exports.createHasher = createHasher; //# sourceMappingURL=hash-to-curve.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/curves/_shortw_utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCurve = exports.getHash = void 0;
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const hmac_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/hmac.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)");
const weierstrass_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/weierstrass.js [app-ssr] (ecmascript)");
// connects noble-curves to noble-hashes
function getHash(hash) {
    return {
        hash,
        hmac: (key, ...msgs)=>(0, hmac_1.hmac)(hash, key, (0, utils_1.concatBytes)(...msgs)),
        randomBytes: utils_1.randomBytes
    };
}
exports.getHash = getHash;
function createCurve(curveDef, defHash) {
    const create = (hash)=>(0, weierstrass_js_1.weierstrass)({
            ...curveDef,
            ...getHash(hash)
        });
    return Object.freeze({
        ...create(defHash),
        create
    });
}
exports.createCurve = createCurve; //# sourceMappingURL=_shortw_utils.js.map
}),
"[project]/node_modules/ethers/node_modules/@noble/curves/secp256k1.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.encodeToCurve = exports.hashToCurve = exports.schnorr = exports.secp256k1 = void 0;
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const sha256_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/sha256.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/hashes/utils.js [app-ssr] (ecmascript)");
const modular_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/modular.js [app-ssr] (ecmascript)");
const weierstrass_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/weierstrass.js [app-ssr] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/utils.js [app-ssr] (ecmascript)");
const hash_to_curve_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/abstract/hash-to-curve.js [app-ssr] (ecmascript)");
const _shortw_utils_js_1 = __turbopack_context__.r("[project]/node_modules/ethers/node_modules/@noble/curves/_shortw_utils.js [app-ssr] (ecmascript)");
const secp256k1P = BigInt('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f');
const secp256k1N = BigInt('0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141');
const _1n = BigInt(1);
const _2n = BigInt(2);
const divNearest = (a, b)=>(a + b / _2n) / b;
/**
 * √n = n^((p+1)/4) for fields p = 3 mod 4. We unwrap the loop and multiply bit-by-bit.
 * (P+1n/4n).toString(2) would produce bits [223x 1, 0, 22x 1, 4x 0, 11, 00]
 */ function sqrtMod(y) {
    const P = secp256k1P;
    // prettier-ignore
    const _3n = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
    // prettier-ignore
    const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
    const b2 = y * y * y % P; // x^3, 11
    const b3 = b2 * b2 * y % P; // x^7
    const b6 = (0, modular_js_1.pow2)(b3, _3n, P) * b3 % P;
    const b9 = (0, modular_js_1.pow2)(b6, _3n, P) * b3 % P;
    const b11 = (0, modular_js_1.pow2)(b9, _2n, P) * b2 % P;
    const b22 = (0, modular_js_1.pow2)(b11, _11n, P) * b11 % P;
    const b44 = (0, modular_js_1.pow2)(b22, _22n, P) * b22 % P;
    const b88 = (0, modular_js_1.pow2)(b44, _44n, P) * b44 % P;
    const b176 = (0, modular_js_1.pow2)(b88, _88n, P) * b88 % P;
    const b220 = (0, modular_js_1.pow2)(b176, _44n, P) * b44 % P;
    const b223 = (0, modular_js_1.pow2)(b220, _3n, P) * b3 % P;
    const t1 = (0, modular_js_1.pow2)(b223, _23n, P) * b22 % P;
    const t2 = (0, modular_js_1.pow2)(t1, _6n, P) * b2 % P;
    const root = (0, modular_js_1.pow2)(t2, _2n, P);
    if (!Fp.eql(Fp.sqr(root), y)) throw new Error('Cannot find square root');
    return root;
}
const Fp = (0, modular_js_1.Field)(secp256k1P, undefined, undefined, {
    sqrt: sqrtMod
});
exports.secp256k1 = (0, _shortw_utils_js_1.createCurve)({
    a: BigInt(0),
    b: BigInt(7),
    Fp,
    n: secp256k1N,
    // Base point (x, y) aka generator point
    Gx: BigInt('55066263022277343669578718895168534326250603453777594175500187360389116729240'),
    Gy: BigInt('32670510020758816978083085130507043184471273380659243275938904335757337482424'),
    h: BigInt(1),
    lowS: true,
    /**
     * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
     * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
     * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
     * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
     */ endo: {
        beta: BigInt('0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee'),
        splitScalar: (k)=>{
            const n = secp256k1N;
            const a1 = BigInt('0x3086d221a7d46bcde86c90e49284eb15');
            const b1 = -_1n * BigInt('0xe4437ed6010e88286f547fa90abfe4c3');
            const a2 = BigInt('0x114ca50f7a8e2f3f657c1108d9d44cfd8');
            const b2 = a1;
            const POW_2_128 = BigInt('0x100000000000000000000000000000000'); // (2n**128n).toString(16)
            const c1 = divNearest(b2 * k, n);
            const c2 = divNearest(-b1 * k, n);
            let k1 = (0, modular_js_1.mod)(k - c1 * a1 - c2 * a2, n);
            let k2 = (0, modular_js_1.mod)(-c1 * b1 - c2 * b2, n);
            const k1neg = k1 > POW_2_128;
            const k2neg = k2 > POW_2_128;
            if (k1neg) k1 = n - k1;
            if (k2neg) k2 = n - k2;
            if (k1 > POW_2_128 || k2 > POW_2_128) {
                throw new Error('splitScalar: Endomorphism failed, k=' + k);
            }
            return {
                k1neg,
                k1,
                k2neg,
                k2
            };
        }
    }
}, sha256_1.sha256);
// Schnorr signatures are superior to ECDSA from above. Below is Schnorr-specific BIP0340 code.
// https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
const _0n = BigInt(0);
const fe = (x)=>typeof x === 'bigint' && _0n < x && x < secp256k1P;
const ge = (x)=>typeof x === 'bigint' && _0n < x && x < secp256k1N;
/** An object mapping tags to their tagged hash prefix of [SHA256(tag) | SHA256(tag)] */ const TAGGED_HASH_PREFIXES = {};
function taggedHash(tag, ...messages) {
    let tagP = TAGGED_HASH_PREFIXES[tag];
    if (tagP === undefined) {
        const tagH = (0, sha256_1.sha256)(Uint8Array.from(tag, (c)=>c.charCodeAt(0)));
        tagP = (0, utils_js_1.concatBytes)(tagH, tagH);
        TAGGED_HASH_PREFIXES[tag] = tagP;
    }
    return (0, sha256_1.sha256)((0, utils_js_1.concatBytes)(tagP, ...messages));
}
// ECDSA compact points are 33-byte. Schnorr is 32: we strip first byte 0x02 or 0x03
const pointToBytes = (point)=>point.toRawBytes(true).slice(1);
const numTo32b = (n)=>(0, utils_js_1.numberToBytesBE)(n, 32);
const modP = (x)=>(0, modular_js_1.mod)(x, secp256k1P);
const modN = (x)=>(0, modular_js_1.mod)(x, secp256k1N);
const Point = exports.secp256k1.ProjectivePoint;
const GmulAdd = (Q, a, b)=>Point.BASE.multiplyAndAddUnsafe(Q, a, b);
// Calculate point, scalar and bytes
function schnorrGetExtPubKey(priv) {
    let d_ = exports.secp256k1.utils.normPrivateKeyToScalar(priv); // same method executed in fromPrivateKey
    let p = Point.fromPrivateKey(d_); // P = d'⋅G; 0 < d' < n check is done inside
    const scalar = p.hasEvenY() ? d_ : modN(-d_);
    return {
        scalar: scalar,
        bytes: pointToBytes(p)
    };
}
/**
 * lift_x from BIP340. Convert 32-byte x coordinate to elliptic curve point.
 * @returns valid point checked for being on-curve
 */ function lift_x(x) {
    if (!fe(x)) throw new Error('bad x: need 0 < x < p'); // Fail if x ≥ p.
    const xx = modP(x * x);
    const c = modP(xx * x + BigInt(7)); // Let c = x³ + 7 mod p.
    let y = sqrtMod(c); // Let y = c^(p+1)/4 mod p.
    if (y % _2n !== _0n) y = modP(-y); // Return the unique point P such that x(P) = x and
    const p = new Point(x, y, _1n); // y(P) = y if y mod 2 = 0 or y(P) = p-y otherwise.
    p.assertValidity();
    return p;
}
/**
 * Create tagged hash, convert it to bigint, reduce modulo-n.
 */ function challenge(...args) {
    return modN((0, utils_js_1.bytesToNumberBE)(taggedHash('BIP0340/challenge', ...args)));
}
/**
 * Schnorr public key is just `x` coordinate of Point as per BIP340.
 */ function schnorrGetPublicKey(privateKey) {
    return schnorrGetExtPubKey(privateKey).bytes; // d'=int(sk). Fail if d'=0 or d'≥n. Ret bytes(d'⋅G)
}
/**
 * Creates Schnorr signature as per BIP340. Verifies itself before returning anything.
 * auxRand is optional and is not the sole source of k generation: bad CSPRNG won't be dangerous.
 */ function schnorrSign(message, privateKey, auxRand = (0, utils_1.randomBytes)(32)) {
    const m = (0, utils_js_1.ensureBytes)('message', message);
    const { bytes: px, scalar: d } = schnorrGetExtPubKey(privateKey); // checks for isWithinCurveOrder
    const a = (0, utils_js_1.ensureBytes)('auxRand', auxRand, 32); // Auxiliary random data a: a 32-byte array
    const t = numTo32b(d ^ (0, utils_js_1.bytesToNumberBE)(taggedHash('BIP0340/aux', a))); // Let t be the byte-wise xor of bytes(d) and hash/aux(a)
    const rand = taggedHash('BIP0340/nonce', t, px, m); // Let rand = hash/nonce(t || bytes(P) || m)
    const k_ = modN((0, utils_js_1.bytesToNumberBE)(rand)); // Let k' = int(rand) mod n
    if (k_ === _0n) throw new Error('sign failed: k is zero'); // Fail if k' = 0.
    const { bytes: rx, scalar: k } = schnorrGetExtPubKey(k_); // Let R = k'⋅G.
    const e = challenge(rx, px, m); // Let e = int(hash/challenge(bytes(R) || bytes(P) || m)) mod n.
    const sig = new Uint8Array(64); // Let sig = bytes(R) || bytes((k + ed) mod n).
    sig.set(rx, 0);
    sig.set(numTo32b(modN(k + e * d)), 32);
    // If Verify(bytes(P), m, sig) (see below) returns failure, abort
    if (!schnorrVerify(sig, m, px)) throw new Error('sign: Invalid signature produced');
    return sig;
}
/**
 * Verifies Schnorr signature.
 * Will swallow errors & return false except for initial type validation of arguments.
 */ function schnorrVerify(signature, message, publicKey) {
    const sig = (0, utils_js_1.ensureBytes)('signature', signature, 64);
    const m = (0, utils_js_1.ensureBytes)('message', message);
    const pub = (0, utils_js_1.ensureBytes)('publicKey', publicKey, 32);
    try {
        const P = lift_x((0, utils_js_1.bytesToNumberBE)(pub)); // P = lift_x(int(pk)); fail if that fails
        const r = (0, utils_js_1.bytesToNumberBE)(sig.subarray(0, 32)); // Let r = int(sig[0:32]); fail if r ≥ p.
        if (!fe(r)) return false;
        const s = (0, utils_js_1.bytesToNumberBE)(sig.subarray(32, 64)); // Let s = int(sig[32:64]); fail if s ≥ n.
        if (!ge(s)) return false;
        const e = challenge(numTo32b(r), pointToBytes(P), m); // int(challenge(bytes(r)||bytes(P)||m))%n
        const R = GmulAdd(P, s, modN(-e)); // R = s⋅G - e⋅P
        if (!R || !R.hasEvenY() || R.toAffine().x !== r) return false; // -eP == (n-e)P
        return true; // Fail if is_infinite(R) / not has_even_y(R) / x(R) ≠ r.
    } catch (error) {
        return false;
    }
}
exports.schnorr = (()=>({
        getPublicKey: schnorrGetPublicKey,
        sign: schnorrSign,
        verify: schnorrVerify,
        utils: {
            randomPrivateKey: exports.secp256k1.utils.randomPrivateKey,
            lift_x,
            pointToBytes,
            numberToBytesBE: utils_js_1.numberToBytesBE,
            bytesToNumberBE: utils_js_1.bytesToNumberBE,
            taggedHash,
            mod: modular_js_1.mod
        }
    }))();
const isoMap = /* @__PURE__ */ (()=>(0, hash_to_curve_js_1.isogenyMap)(Fp, [
        // xNum
        [
            '0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7',
            '0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581',
            '0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262',
            '0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c'
        ],
        // xDen
        [
            '0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b',
            '0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14',
            '0x0000000000000000000000000000000000000000000000000000000000000001'
        ],
        // yNum
        [
            '0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c',
            '0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3',
            '0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931',
            '0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84'
        ],
        // yDen
        [
            '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b',
            '0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573',
            '0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f',
            '0x0000000000000000000000000000000000000000000000000000000000000001'
        ]
    ].map((i)=>i.map((j)=>BigInt(j)))))();
const mapSWU = /* @__PURE__ */ (()=>(0, weierstrass_js_1.mapToCurveSimpleSWU)(Fp, {
        A: BigInt('0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533'),
        B: BigInt('1771'),
        Z: Fp.create(BigInt('-11'))
    }))();
const htf = /* @__PURE__ */ (()=>(0, hash_to_curve_js_1.createHasher)(exports.secp256k1.ProjectivePoint, (scalars)=>{
        const { x, y } = mapSWU(Fp.create(scalars[0]));
        return isoMap(x, y);
    }, {
        DST: 'secp256k1_XMD:SHA-256_SSWU_RO_',
        encodeDST: 'secp256k1_XMD:SHA-256_SSWU_NU_',
        p: Fp.ORDER,
        m: 1,
        k: 128,
        expand: 'xmd',
        hash: sha256_1.sha256
    }))();
exports.hashToCurve = (()=>htf.hashToCurve)();
exports.encodeToCurve = (()=>htf.encodeToCurve)(); //# sourceMappingURL=secp256k1.js.map
}),
"[project]/node_modules/ethers/node_modules/@adraffy/ens-normalize/dist/index.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// created 2023-09-25T01:01:55.148Z
// compressed base64-encoded blob for include-ens data
// source: https://github.com/adraffy/ens-normalize.js/blob/main/src/make.js
// see: https://github.com/adraffy/ens-normalize.js#security
// SHA-256: 0565ed049b9cf1614bb9e11ba7d8ac6a6fb96c893253d890f7e2b2884b9ded32
var COMPRESSED$1 = 'AEEUdwmgDS8BxQKKAP4BOgDjATAAngDUAIMAoABoAOAAagCOAEQAhABMAHIAOwA9ACsANgAmAGIAHgAuACgAJwAXAC0AGgAjAB8ALwAUACkAEgAeAAkAGwARABkAFgA5ACgALQArADcAFQApABAAHgAiABAAGgAeABMAGAUhBe8BFxREN8sF2wC5AK5HAW8ArQkDzQCuhzc3NzcBP68NEfMABQdHBuw5BV8FYAA9MzkI9r4ZBg7QyQAWA9CeOwLNCjcCjqkChuA/lm+RAsXTAoP6ASfnEQDytQFJAjWVCkeXAOsA6godAB/cwdAUE0WlBCN/AQUCQRjFD/MRBjHxDQSJbw0jBzUAswBxme+tnIcAYwabAysG8QAjAEMMmxcDqgPKQyDXCMMxA7kUQwD3NXOrAKmFIAAfBC0D3x4BJQDBGdUFAhEgVD8JnwmQJiNWYUzrg0oAGwAUAB0AFnNcACkAFgBP9h3gPfsDOWDKneY2ChglX1UDYD30ABsAFAAdABZzIGRAnwDD8wAjAEEMzRbDqgMB2sAFYwXqAtCnAsS4AwpUJKRtFHsadUz9AMMVbwLpABM1NJEX0ZkCgYMBEyMAxRVvAukAEzUBUFAtmUwSAy4DBTER33EftQHfSwB5MxJ/AjkWKQLzL8E/cwBB6QH9LQDPDtO9ASNriQC5DQANAwCK21EFI91zHwCoL9kBqQcHBwcHKzUDowBvAQohPvU3fAQgHwCyAc8CKQMA5zMSezr7ULgFmDp/LzVQBgEGAi8FYQVgt8AFcTtlQhpCWEmfe5tmZ6IAExsDzQ8t+X8rBKtTAltbAn0jsy8Bl6utPWMDTR8Ei2kRANkDBrNHNysDBzECQWUAcwFpJ3kAiyUhAJ0BUb8AL3EfAbfNAz81KUsFWwF3YQZtAm0A+VEfAzEJDQBRSQCzAQBlAHsAM70GD/v3IZWHBwARKQAxALsjTwHZAeMPEzmXgIHwABIAGQA8AEUAQDt3gdvIEGcQZAkGTRFMdEIVEwK0D64L7REdDNkq09PgADSxB/MDWwfzA1sDWwfzB/MDWwfzA1sDWwNbA1scEvAi28gQZw9QBHUFlgWTBN4IiyZREYkHMAjaVBV0JhxPA00BBCMtSSQ7mzMTJUpMFE0LCAQ2SmyvfUADTzGzVP2QqgPTMlc5dAkGHnkSqAAyD3skNb1OhnpPcagKU0+2tYdJak5vAsY6sEAACikJm2/Dd1YGRRAfJ6kQ+ww3AbkBPw3xS9wE9QY/BM0fgRkdD9GVoAipLeEM8SbnLqWAXiP5KocF8Uv4POELUVFsD10LaQnnOmeBUgMlAREijwrhDT0IcRD3Cs1vDekRSQc9A9lJngCpBwULFR05FbkmFGKwCw05ewb/GvoLkyazEy17AAXXGiUGUQEtGwMA0y7rhbRaNVwgT2MGBwspI8sUrFAkDSlAu3hMGh8HGSWtApVDdEqLUToelyH6PEENai4XUYAH+TwJGVMLhTyiRq9FEhHWPpE9TCJNTDAEOYMsMyePCdMPiQy9fHYBXQklCbUMdRM1ERs3yQg9Bx0xlygnGQglRplgngT7owP3E9UDDwVDCUUHFwO5HDETMhUtBRGBKNsC9zbZLrcCk1aEARsFzw8pH+MQVEfkDu0InwJpA4cl7wAxFSUAGyKfCEdnAGOP3FMJLs8Iy2pwI3gDaxTrZRF3B5UOWwerHDcVwxzlcMxeD4YMKKezCV8BeQmdAWME5wgNNV+MpCBFZ1eLXBifIGVBQ14AAjUMaRWjRMGHfAKPD28SHwE5AXcHPQ0FAnsR8RFvEJkI74YINbkz/DopBFMhhyAVCisDU2zSCysm/Qz8bQGnEmYDEDRBd/Jnr2C6KBgBBx0yyUFkIfULlk/RDKAaxRhGVDIZ6AfDA/ca9yfuQVsGAwOnBxc6UTPyBMELbQiPCUMATQ6nGwfbGG4KdYzUATWPAbudA1uVhwJzkwY7Bw8Aaw+LBX3pACECqwinAAkA0wNbAD0CsQehAB0AiUUBQQMrMwEl6QKTA5cINc8BmTMB9y0EH8cMGQD7O25OAsO1AoBuZqYF4VwCkgJNOQFRKQQJUktVA7N15QDfAE8GF+NLARmvTs8e50cB43MvAMsA/wAJOQcJRQHRAfdxALsBYws1Caa3uQFR7S0AhwAZbwHbAo0A4QA5AIP1AVcAUQVd/QXXAlNNARU1HC9bZQG/AyMBNwERAH0Gz5GpzQsjBHEH1wIQHxXlAu8yB7kFAyLjE9FCyQK94lkAMhoKPAqrCqpgX2Q3CjV2PVQAEh+sPss/UgVVO1c7XDtXO1w7VztcO1c7XDtXO1wDm8Pmw+YKcF9JYe8Mqg3YRMw6TRPfYFVgNhPMLbsUxRXSJVoZQRrAJwkl6FUNDwgt12Y0CDA0eRfAAEMpbINFY4oeNApPHOtTlVT8LR8AtUumM7MNsBsZREQFS3XxYi4WEgomAmSFAmJGX1GzAV83JAKh+wJonAJmDQKfiDgfDwJmPwJmKgRyBIMDfxcDfpY5Cjl7GzmGOicnAmwhAjI6OA4CbcsCbbLzjgM3a0kvAWsA4gDlAE4JB5wMkQECD8YAEbkCdzMCdqZDAnlPRwJ4viFg30WyRvcCfEMCeswCfQ0CfPRIBEiBZygALxlJXEpfGRtK0ALRBQLQ0EsrA4hTA4fqRMmRNgLypV0HAwOyS9JMMSkH001QTbMCi0MCitzFHwshR2sJuwKOOwKOYESbhQKO3QKOYHxRuFM5AQ5S2FSJApP/ApMQAO0AIFUiVbNV1AosHymZijLleGpFPz0Cl6MC77ZYJawAXSkClpMCloCgAK1ZsFoNhVEAPwKWuQKWUlxIXNUCmc8CmWhczl0LHQKcnznGOqECnBoCn58CnryOACETNS4TAp31Ap6WALlBYThh8wKe1wKgcgGtAp6jIwKeUqljzGQrKS8CJ7MCJoICoP8CoFDbAqYzAqXSAqgDAIECp/ZogGi1AAdNaiBq1QKs5wKssgKtawKtBgJXIQJV4AKx5dsDH1JsmwKywRECsuwbbORtZ21MYwMl0QK2YD9DbpQDKUkCuGICuUsZArkue3A6cOUCvR0DLbYDMhUCvoxyBgMzdQK+HnMmc1MCw88CwwhzhnRPOUl05AM8qwEDPJ4DPcMCxYACxksCxhSNAshtVQLISALJUwLJMgJkoQLd1nh9ZXiyeSlL1AMYp2cGAmH4GfeVKHsPXpZevxUCz28Cz3AzT1fW9xejAMqxAs93AS3uA04Wfk8JAtwrAtuOAtJTA1JgA1NjAQUDVZCAjUMEzxrxZEl5A4LSg5EC2ssC2eKEFIRNp0ADhqkAMwNkEoZ1Xf0AWQLfaQLevHd7AuIz7RgB8zQrAfSfAfLWiwLr9wLpdH0DAur9AuroAP1LAb0C7o0C66CWrpcHAu5DA4XkmH1w5HGlAvMHAG0DjhqZlwL3FwORcgOSiwL3nAL53QL4apogmq+/O5siA52HAv7+AR8APZ8gAZ+3AwWRA6ZuA6bdANXJAwZuoYyiCQ0DDE0BEwEjB3EGZb1rCQC/BG/DFY8etxEAG3k9ACcDNxJRA42DAWcrJQCM8wAlAOanC6OVCLsGI6fJBgCvBRnDBvElRUYFFoAFcD9GSDNCKUK8X3kZX8QAls0FOgCQVCGbwTsuYDoZutcONxjOGJHJ/gVfBWAFXwVgBWsFYAVfBWAFXwVgBV8FYAVfBWBOHQjfjW8KCgoKbF7xMwTRA7kGN8PDAMMEr8MA70gxFroFTj5xPnhCR0K+X30/X/AAWBkzswCNBsxzzASm70aCRS4rDDMeLz49fnXfcsH5GcoscQFz13Y4HwVnBXLJycnACNdRYwgICAqEXoWTxgA7P4kACxbZBu21Kw0AjMsTAwkVAOVtJUUsJ1JCuULESUArXy9gPi9AKwnJRQYKTD9LPoA+iT54PnkCkULEUUpDX9NWV3JVEjQAc1w3A3IBE3YnX+g7QiMJb6MKaiszRCUuQrNCxDPMCcwEX9EWJzYREBEEBwIHKn6l33JCNVIfybPJtAltydPUCmhBZw/tEKsZAJOVJU1CLRuxbUHOQAo7P0s+eEJHHA8SJVRPdGM0NVrpvBoKhfUlM0JHHGUQUhEWO1xLSj8MO0ucNAqJIzVCRxv9EFsqKyA4OQgNj2nwZgp5ZNFgE2A1K3YHS2AhQQojJmC7DgpzGG1WYFUZCQYHZO9gHWCdYIVgu2BTYJlwFh8GvRbcXbG8YgtDHrMBwzPVyQonHQgkCyYBgQJ0Ajc4nVqIAwGSCsBPIgDsK3SWEtIVBa5N8gGjAo+kVwVIZwD/AEUSCDweX4ITrRQsJ8K3TwBXFDwEAB0TvzVcAtoTS20RIwDgVgZ9BBImYgA5AL4Coi8LFnezOkCnIQFjAY4KBAPh9RcGsgZSBsEAJctdsWIRu2kTkQstRw7DAcMBKgpPBGIGMDAwKCYnKTQaLg4AKRSVAFwCdl+YUZ0JdicFD3lPAdt1F9ZZKCGxuE3yBxkFVGcA/wBFEgiCBwAOLHQSjxOtQDg1z7deFRMAZ8QTAGtKb1ApIiPHADkAvgKiLy1DFtYCmBiDAlDDWNB0eo7fpaMO/aEVRRv0ATEQZBIODyMEAc8JQhCbDRgzFD4TAEMAu9YBCgCsAOkAm5I3ABwAYxvONnR+MhXJAxgKQyxL2+kkJhMbhQKDBMkSsvF0AD9BNQ6uQC7WqSQHwxEAEEIu1hkhAH2z4iQPwyJPHNWpdyYBRSpnJALzoBAEVPPsH20MxA0CCEQKRgAFyAtFAlMNwwjEDUQJRArELtapMg7DDZgJIw+TGukEIwvDFkMAqAtDEMMMBhioe+QAO3MMRAACrgnEBSPY9Q0FDnbSBoMAB8MSYxkSxAEJAPIJAAB8FWMOFtMc/HcXwxhDAC7DAvOowwAewwJdKDKHAAHDAALrFUQVwwAbwyvzpWMWv8wA/ABpAy++bcYDUKPD0KhDCwKmJ1MAAmMA5+UZwxAagwipBRL/eADfw6fDGOMCGsOjk3l6BwOpo4sAEsMOGxMAA5sAbcMOAAvDp0MJGkMDwgipnNIPAwfIqUMGAOGDAAPzABXDAAcDAAnDAGmTABrDAA7DChjDjnEWAwABYwAOcwAuUyYABsMAF8MIKQANUgC6wy4AA8MADqMq8wCyYgAcIwAB8wqpAAXOCx0V4wAHowBCwwEKAGnDAAuDAB3DAAjDCakABdIAbqcZ3QCZCCkABdIAAAFDAAfjAB2jCCkABqIACYMAGzMAbSMA5sOIAAhjAAhDABTDBAkpAAbSAOOTAAlDC6kOzPtnAAdDAG6kQFAATwAKwwwAA0MACbUDPwAHIwAZgwACE6cDAAojAApDAAoDp/MGwwAJIwADEwAQQwgAFEMAEXMAD5MADfMADcMAGRMOFiMAFUMAbqMWuwHDAMIAE0MLAGkzEgDhUwACQwAEWgAXgwUjAAbYABjDBSYBgzBaAEFNALcQBxUMegAwMngBrA0IZgJ0KxQHBREPd1N0ZzKRJwaIHAZqNT4DqQq8BwngAB4DAwt2AX56T1ocKQNXAh1GATQGC3tOxYNagkgAMQA5CQADAQEAWxLjAIOYNAEzAH7tFRk6TglSAF8NAAlYAQ+S1ACAQwQorQBiAN4dAJ1wPyeTANVzuQDX3AIeEMp9eyMgXiUAEdkBkJizKltbVVAaRMqRAAEAhyQ/SDEz6BmfVwB6ATEsOClKIRcDOF0E/832AFNt5AByAnkCRxGCOs94NjXdAwINGBonDBwPALW2AwICAgAAAAAAAAYDBQMDARrUAwAtAAAAAgEGBgYGBgYFBQUFBQUEBQYHCAkEBQUFBQQAAAICAAAAIgCNAJAAlT0A6gC7ANwApEQAwgCyAK0AqADuAKYA2gCjAOcBCAEDAMcAgQBiANIA1AEDAN4A8gCQAKkBMQDqAN8A3AsBCQ8yO9ra2tq8xuLT1tRJOB0BUgFcNU0BWgFpAWgBWwFMUUlLbhMBUxsNEAs6PhMOACcUKy0vMj5AQENDQ0RFFEYGJFdXV1dZWVhZL1pbXVxcI2NnZ2ZoZypsbnZ1eHh4eHh4enp6enp6enp6enp8fH18e2IARPIASQCaAHgAMgBm+ACOAFcAVwA3AnbvAIsABfj4AGQAk/IAnwBPAGIAZP//sACFAIUAaQBWALEAJAC2AIMCQAJDAPwA5wD+AP4A6AD/AOkA6QDoAOYALwJ7AVEBQAE+AVQBPgE+AT4BOQE4ATgBOAEcAVgXADEQCAEAUx8SHgsdHhYAjgCWAKYAUQBqIAIxAHYAbwCXAxUDJzIDIUlGTzEAkQJPAMcCVwKkAMAClgKWApYClgKWApYCiwKWApYClgKWApYClgKVApUCmAKgApcClgKWApQClAKUApQCkgKVAnUB1AKXAp8ClgKWApUeAIETBQD+DQOfAmECOh8BVBg9AuIZEjMbAU4/G1WZAXusRAFpYQEFA0FPAQYAmTEeIJdyADFoAHEANgCRA5zMk/C2jGINwjMWygIZCaXdfDILBCs5dAE7YnQBugDlhoiHhoiGiYqKhouOjIaNkI6Ij4qQipGGkoaThpSSlYaWhpeKmIaZhpqGm4aci52QnoqfhuIC4XTpAt90AIp0LHSoAIsAdHQEQwRABEIERQRDBEkERgRBBEcESQRIBEQERgRJAJ5udACrA490ALxuAQ10ANFZdHQA13QCFHQA/mJ0AP4BIQD+APwA/AD9APwDhGZ03ASMK23HAP4A/AD8AP0A/CR0dACRYnQA/gCRASEA/gCRAvQA/gCRA4RmdNwEjCttxyR0AP9idAEhAP4A/gD8APwA/QD8AP8A/AD8AP0A/AOEZnTcBIwrbcckdHQAkWJ0ASEA/gCRAP4AkQL0AP4AkQOEZnTcBIwrbcckdAJLAT50AlIBQXQCU8l0dAJfdHQDpgL0A6YDpgOnA6cDpwOnA4RmdNwEjCttxyR0dACRYnQBIQOmAJEDpgCRAvQDpgCRA4RmdNwEjCttxyR0BDh0AJEEOQCRDpU5dSgCADR03gV2CwArdAEFAM5iCnR0AF1iAAYcOgp0dACRCnQAXAEIwWZ0CnRmdHQAkWZ0CnRmdEXgAFF03gp0dEY0tlT2u3SOAQTwscwhjZZKrhYcBSfFp9XNbKiVDOD2b+cpe4/Z17mQnbtzzhaeQtE2GGj0IDNTjRUSyTxxw/RPHW/+vS7d1NfRt9z9QPZg4X7QFfhCnkvgNPIItOsC2eV6hPannZNHlZ9xrwZXIMOlu3jSoQSq78WEjwLjw1ELSlF1aBvfzwk5ZX7AUvQzjPQKbDuQ+sm4wNOp4A6AdVuRS0t1y/DZpg4R6m7FNjM9HgvW7Bi88zaMjOo6lM8wtBBdj8LP4ylv3zCXPhebMKJc066o9sF71oFW/8JXu86HJbwDID5lzw5GWLR/LhT0Qqnp2JQxNZNfcbLIzPy+YypqRm/lBmGmex+82+PisxUumSeJkALIT6rJezxMH+CTJmQtt5uwTVbL3ptmjDUQzlSIvWi8Tl7ng1NpuRn1Ng4n14Qc+3Iil7OwkvNWogLSPkn3pihIFytyIGmMhOe3n1tWsuMy9BdKyqF4Z3v2SgggTL9KVvMXPnCbRe+oOuFFP3HejBG/w9gvmfNYvg6JuWia2lcSSN1uIjBktzoIazOHPJZ7kKHPz8mRWVdW3lA8WGF9dQF6Bm673boov3BUWDU2JNcahR23GtfHKLOz/viZ+rYnZFaIznXO67CYEJ1fXuTRpZhYZkKe54xeoagkNGLs+NTZHE0rX45/XvQ2RGADX6vcAvdxIUBV27wxGm2zjZo4X3ILgAlrOFheuZ6wtsvaIj4yLY7qqawlliaIcrz2G+c3vscAnCkCuMzMmZvMfu9lLwTvfX+3cVSyPdN9ZwgDZhfjRgNJcLiJ67b9xx8JHswprbiE3v9UphotAPIgnXVIN5KmMc0piXhc6cChPnN+MRhG9adtdttQTTwSIpl8I4/j//d3sz1326qTBTpPRM/Hgh3kzqEXs8ZAk4ErQhNO8hzrQ0DLkWMA/N+91tn2MdOJnWC2FCZehkQrwzwbKOjhvZsbM95QoeL9skYyMf4srVPVJSgg7pOLUtr/n9eT99oe9nLtFRpjA9okV2Kj8h9k5HaC0oivRD8VyXkJ81tcd4fHNXPCfloIQasxsuO18/46dR2jgul/UIet2G0kRvnyONMKhHs6J26FEoqSqd+rfYjeEGwHWVDpX1fh1jBBcKGMqRepju9Y00mDVHC+Xdij/j44rKfvfjGinNs1jO/0F3jB83XCDINN/HB84axlP+3E/klktRo+vl3U/aiyMJbIodE1XSsDn6UAzIoMtUObY2+k/4gY/l+AkZJ5Sj2vQrkyLm3FoxjhDX+31UXBFf9XrAH31fFqoBmDEZvhvvpnZ87N+oZEu7U9O/nnk+QWj3x8uyoRbEnf+O5UMr9i0nHP38IF5AvzrBW8YWBUR0mIAzIvndQq9N3v/Jto3aPjPXUPl8ASdPPyAp7jENf8bk7VMM9ol9XGmlBmeDMuGqt+WzuL6CXAxXjIhCPM5vACchgMJ/8XBGLO/D1isVvGhwwHHr1DLaI5mn2Jr/b1pUD90uciDaS8cXNDzCWvNmT/PhQe5e8nTnnnkt8Ds/SIjibcum/fqDhKopxAY8AkSrPn+IGDEKOO+U3XOP6djFs2H5N9+orhOahiQk5KnEUWa+CzkVzhp8bMHRbg81qhjjXuIKbHjSLSIBKWqockGtKinY+z4/RdBUF6pcc3JmnlxVcNgrI4SEzKUZSwcD2QCyxzKve+gAmg6ZuSRkpPFa6mfThu7LJNu3H5K42uCpNvPAsoedolKV/LHe/eJ+BbaG5MG0NaSGVPRUmNFMFFSSpXEcXwbVh7UETOZZtoVNRGOIbbkig3McEtR68cG0RZAoJevWYo7Dg/lZ1CQzblWeUvVHmr8fY4Nqd9JJiH/zEX24mJviH60fAyFr0A3c4bC1j3yZU60VgJxXn8JgJXLUIsiBnmKmMYz+7yBQFBvqb2eYnuW59joZBf56/wXvWIR4R8wTmV80i1mZy+S4+BUES+hzjk0uXpC///z/IlqHZ1monzlXp8aCfhGKMti73FI1KbL1q6IKO4fuBuZ59gagjn5xU79muMpHXg6S+e+gDM/U9BKLHbl9l6o8czQKl4RUkJJiqftQG2i3BMg/TQlUYFkJDYBOOvAugYuzYSDnZbDDd/aSd9x0Oe6F+bJcHfl9+gp6L5/TgA+BdFFovbfCrQ40s5vMPw8866pNX8zyFGeFWdxIpPVp9Rg1UPOVFbFZrvaFq/YAzHQgqMWpahMYfqHpmwXfHL1/kpYmGuHFwT55mQu0dylfNuq2Oq0hTMCPwqfxnuBIPLXfci4Y1ANy+1CUipQxld/izVh16WyG2Q0CQQ9NqtAnx1HCHwDj7sYxOSB0wopZSnOzxQOcExmxrVTF2BkOthVpGfuhaGECfCJpJKpjnihY+xOT2QJxN61+9K6QSqtv2Shr82I3jgJrqBg0wELFZPjvHpvzTtaJnLK6Vb97Yn933koO/saN7fsjwNKzp4l2lJVx2orjCGzC/4ZL4zCver6aQYtC5sdoychuFE6ufOiog+VWi5UDkbmvmtah/3aArEBIi39s5ILUnlFLgilcGuz9CQshEY7fw2ouoILAYPVT/gyAIq3TFAIwVsl+ktkRz/qGfnCDGrm5gsl/l9QdvCWGsjPz3dU7XuqKfdUrr/6XIgjp4rey6AJBmCmUJMjITHVdFb5m1p+dLMCL8t55zD42cmftmLEJC0Da04YiRCVUBLLa8D071/N5UBNBXDh0LFsmhV/5B5ExOB4j3WVG/S3lfK5o+V6ELHvy6RR9n4ac+VsK4VE4yphPvV+kG9FegTBH4ZRXL2HytUHCduJazB/KykjfetYxOXTLws267aGOd+I+JhKP//+VnXmS90OD/jvLcVu0asyqcuYN1mSb6XTlCkqv1vigZPIYwNF/zpWcT1GR/6aEIRjkh0yhg4LXJfaGobYJTY4JI58KiAKgmmgAKWdl5nYCeLqavRJGQNuYuZtZFGx+IkI4w4NS2xwbetNMunOjBu/hmKCI/w7tfiiyUd//4rbTeWt4izBY8YvGIN6vyKYmP/8X8wHKCeN+WRcKM70+tXKNGyevU9H2Dg5BsljnTf8YbsJ1TmMs74Ce2XlHisleguhyeg44rQOHZuw/6HTkhnnurK2d62q6yS7210SsAIaR+jXMQA+svkrLpsUY+F30Uw89uOdGAR6vo4FIME0EfVVeHTu6eKicfhSqOeXJhbftcd08sWEnNUL1C9fnprTgd83IMut8onVUF0hvqzZfHduPjbjwEXIcoYmy+P6tcJZHmeOv6VrvEdkHDJecjHuHeWANe79VG662qTjA/HCvumVv3qL+LrOcpqGps2ZGwQdFJ7PU4iuyRlBrwfO+xnPyr47s2cXVbWzAyznDiBGjCM3ksxjjqM62GE9C8f5U38kB3VjtabKp/nRdvMESPGDG90bWRLAt1Qk5DyLuazRR1YzdC1c+hZXvAWV8xA72S4A8B67vjVhbba3MMop293FeEXpe7zItMWrJG/LOH9ByOXmYnNJfjmfuX9KbrpgLOba4nZ+fl8Gbdv/ihv+6wFGKHCYrVwmhFC0J3V2bn2tIB1wCc1CST3d3X2OyxhguXcs4sm679UngzofuSeBewMFJboIQHbUh/m2JhW2hG9DIvG2t7yZIzKBTz9wBtnNC+2pCRYhSIuQ1j8xsz5VvqnyUIthvuoyyu7fNIrg/KQUVmGQaqkqZk/Vx5b33/gsEs8yX7SC1J+NV4icz6bvIE7C5G6McBaI8rVg56q5QBJWxn/87Q1sPK4+sQa8fLU5gXo4paaq4cOcQ4wR0VBHPGjKh+UlPCbA1nLXyEUX45qZ8J7/Ln4FPJE2TdzD0Z8MLSNQiykMMmSyOCiFfy84Rq60emYB2vD09KjYwsoIpeDcBDTElBbXxND72yhd9pC/1CMid/5HUMvAL27OtcIJDzNKpRPNqPOpyt2aPGz9QWIs9hQ9LiX5s8m9hjTUu/f7MyIatjjd+tSfQ3ufZxPpmJhTaBtZtKLUcfOCUqADuO+QoH8B9v6U+P0HV1GLQmtoNFTb3s74ivZgjES0qfK+8RdGgBbcCMSy8eBvh98+et1KIFqSe1KQPyXULBMTsIYnysIwiZBJYdI20vseV+wuJkcqGemehKjaAb9L57xZm3g2zX0bZ2xk/fU+bCo7TlnbW7JuF1YdURo/2Gw7VclDG1W7LOtas2LX4upifZ/23rzpsnY/ALfRgrcWP5hYmV9VxVOQA1fZvp9F2UNU+7d7xRyVm5wiLp3/0dlV7vdw1PMiZrbDAYzIVqEjRY2YU03sJhPnlwIPcZUG5ltL6S8XCxU1eYS5cjr34veBmXAvy7yN4ZjArIG0dfD/5UpBNlX1ZPoxJOwyqRi3wQWtOzd4oNKh0LkoTm8cwqgIfKhqqGOhwo71I+zXnMemTv2B2AUzABWyFztGgGULjDDzWYwJUVBTjKCn5K2QGMK1CQT7SzziOjo+BhAmqBjzuc3xYym2eedGeOIRJVyTwDw37iCMe4g5Vbnsb5ZBdxOAnMT7HU4DHpxWGuQ7GeiY30Cpbvzss55+5Km1YsbD5ea3NI9QNYIXol5apgSu9dZ8f8xS5dtHpido5BclDuLWY4lhik0tbJa07yJhH0BOyEut/GRbYTS6RfiTYWGMCkNpfSHi7HvdiTglEVHKZXaVhezH4kkXiIvKopYAlPusftpE4a5IZwvw1x/eLvoDIh/zpo9FiQInsTb2SAkKHV42XYBjpJDg4374XiVb3ws4qM0s9eSQ5HzsMU4OZJKuopFjBM+dAZEl8RUMx5uU2N486Kr141tVsGQfGjORYMCJAMsxELeNT4RmWjRcpdTGBwcx6XN9drWqPmJzcrGrH4+DRc7+n1w3kPZwu0BkNr6hQrqgo7JTB9A5kdJ/H7P4cWBMwsmuixAzJB3yrQpnGIq90lxAXLzDCdn1LPibsRt7rHNjgQBklRgPZ8vTbjXdgXrTWQsK5MdrXXQVPp0Rinq3frzZKJ0qD6Qhc40VzAraUXlob1gvkhK3vpmHgI6FRlQZNx6eRqkp0zy4AQlX813fAPtL3jMRaitGFFjo0zmErloC+h+YYdVQ6k4F/epxAoF0BmqEoKNTt6j4vQZNQ2BoqF9Vj53TOIoNmDiu9Xp15RkIgQIGcoLpfoIbenzpGUAtqFJp5W+LLnx38jHeECTJ/navKY1NWfN0sY1T8/pB8kIH3DU3DX+u6W3YwpypBMYOhbSxGjq84RZ84fWJow8pyHqn4S/9J15EcCMsXqrfwyd9mhiu3+rEo9pPpoJkdZqHjra4NvzFwuThNKy6hao/SlLw3ZADUcUp3w3SRVfW2rhl80zOgTYnKE0Hs2qp1J6H3xqPqIkvUDRMFDYyRbsFI3M9MEyovPk8rlw7/0a81cDVLmBsR2ze2pBuKb23fbeZC0uXoIvDppfTwIDxk1Oq2dGesGc+oJXWJLGkOha3CX+DUnzgAp9HGH9RsPZN63Hn4RMA5eSVhPHO+9RcRb/IOgtW31V1Q5IPGtoxPjC+MEJbVlIMYADd9aHYWUIQKopuPOHmoqSkubnAKnzgKHqgIOfW5RdAgotN6BN+O2ZYHkuemLnvQ8U9THVrS1RtLmKbcC7PeeDsYznvqzeg6VCNwmr0Yyx1wnLjyT84BZz3EJyCptD3yeueAyDWIs0L2qs/VQ3HUyqfrja0V1LdDzqAikeWuV4sc7RLIB69jEIBjCkyZedoUHqCrOvShVzyd73OdrJW0hPOuQv2qOoHDc9xVb6Yu6uq3Xqp2ZaH46A7lzevbxQEmfrzvAYSJuZ4WDk1Hz3QX1LVdiUK0EvlAGAYlG3Md30r7dcPN63yqBCIj25prpvZP0nI4+EgWoFG95V596CurXpKRBGRjQlHCvy5Ib/iW8nZJWwrET3mgd6mEhfP4KCuaLjopWs7h+MdXFdIv8dHQJgg1xi1eYqB0uDYjxwVmri0Sv5XKut/onqapC+FQiC2C1lvYJ9MVco6yDYsS3AANUfMtvtbYI2hfwZatiSsnoUeMZd34GVjkMMKA+XnjJpXgRW2SHTZplVowPmJsvXy6w3cfO1AK2dvtZEKTkC/TY9LFiKHCG0DnrMQdGm2lzlBHM9iEYynH2UcVMhUEjsc0oDBTgo2ZSQ1gzkAHeWeBXYFjYLuuf8yzTCy7/RFR81WDjXMbq2BOH5dURnxo6oivmxL3cKzKInlZkD31nvpHB9Kk7GfcfE1t+1V64b9LtgeJGlpRFxQCAqWJ5DoY77ski8gsOEOr2uywZaoO/NGa0X0y1pNQHBi3b2SUGNpcZxDT7rLbBf1FSnQ8guxGW3W+36BW0gBje4DOz6Ba6SVk0xiKgt+q2JOFyr4SYfnu+Ic1QZYIuwHBrgzr6UvOcSCzPTOo7D6IC4ISeS7zkl4h+2VoeHpnG/uWR3+ysNgPcOIXQbv0n4mr3BwQcdKJxgPSeyuP/z1Jjg4e9nUvoXegqQVIE30EHx5GHv+FAVUNTowYDJgyFhf5IvlYmEqRif6+WN1MkEJmDcQITx9FX23a4mxy1AQRsOHO/+eImX9l8EMJI3oPWzVXxSOeHU1dUWYr2uAA7AMb+vAEZSbU3qob9ibCyXeypEMpZ6863o6QPqlqGHZkuWABSTVNd4cOh9hv3qEpSx2Zy/DJMP6cItEmiBJ5PFqQnDEIt3NrA3COlOSgz43D7gpNFNJ5MBh4oFzhDPiglC2ypsNU4ISywY2erkyb1NC3Qh/IfWj0eDgZI4/ln8WPfBsT3meTjq1Uqt1E7Zl/qftqkx6aM9KueMCekSnMrcHj1CqTWWzEzPsZGcDe3Ue4Ws+XFYVxNbOFF8ezkvQGR6ZOtOLU2lQEnMBStx47vE6Pb7AYMBRj2OOfZXfisjJnpTfSNjo6sZ6qSvNxZNmDeS7Gk3yYyCk1HtKN2UnhMIjOXUzAqDv90lx9O/q/AT1ZMnit5XQe9wmQxnE/WSH0CqZ9/2Hy+Sfmpeg8RwsHI5Z8kC8H293m/LHVVM/BA7HaTJYg5Enk7M/xWpq0192ACfBai2LA/qrCjCr6Dh1BIMzMXINBmX96MJ5Hn2nxln/RXPFhwHxUmSV0EV2V0jm86/dxxuYSU1W7sVkEbN9EzkG0QFwPhyHKyb3t+Fj5WoUUTErcazE/N6EW6Lvp0d//SDPj7EV9UdJN+Amnf3Wwk3A0SlJ9Z00yvXZ7n3z70G47Hfsow8Wq1JXcfwnA+Yxa5mFsgV464KKP4T31wqIgzFPd3eCe3j5ory5fBF2hgCFyVFrLzI9eetNXvM7oQqyFgDo4CTp/hDV9NMX9JDHQ/nyHTLvZLNLF6ftn2OxjGm8+PqOwhxnPHWipkE/8wbtyri80Sr7pMNkQGMfo4ZYK9OcCC4ESVFFbLMIvlxSoRqWie0wxqnLfcLSXMSpMMQEJYDVObYsXIQNv4TGNwjq1kvT1UOkicTrG3IaBZ3XdScS3u8sgeZPVpOLkbiF940FjbCeNRINNvDbd01EPBrTCPpm12m43ze1bBB59Ia6Ovhnur/Nvx3IxwSWol+3H2qfCJR8df6aQf4v6WiONxkK+IqT4pKQrZK/LplgDI/PJZbOep8dtbV7oCr6CgfpWa8NczOkPx81iSHbsNhVSJBOtrLIMrL31LK9TqHqAbAHe0RLmmV806kRLDLNEhUEJfm9u0sxpkL93Zgd6rw+tqBfTMi59xqXHLXSHwSbSBl0EK0+loECOPtrl+/nsaFe197di4yUgoe4jKoAJDXc6DGDjrQOoFDWZJ9HXwt8xDrQP+7aRwWKWI1GF8s8O4KzxWBBcwnl3vnl1Oez3oh6Ea1vjR7/z7DDTrFtqU2W/KAEzAuXDNZ7MY73MF216dzdSbWmUp4lcm7keJfWaMHgut9x5C9mj66Z0lJ+yhsjVvyiWrfk1lzPOTdhG15Y7gQlXtacvI7qv/XNSscDwqkgwHT/gUsD5yB7LdRRvJxQGYINn9hTpodKFVSTPrtGvyQw+HlRFXIkodErAGu9Iy1YpfSPc3jkFh5CX3lPxv7aqjE/JAfTIpEjGb/H7MO0e2vsViSW1qa/Lmi4/n4DEI3g7lYrcanspDfEpKkdV1OjSLOy0BCUqVoECaB55vs06rXl4jqmLsPsFM/7vYJ0vrBhDCm/00A/H81l1uekJ/6Lml3Hb9+NKiLqATJmDpyzfYZFHumEjC662L0Bwkxi7E9U4cQA0XMVDuMYAIeLMPgQaMVOd8fmt5SflFIfuBoszeAw7ow5gXPE2Y/yBc/7jExARUf/BxIHQBF5Sn3i61w4z5xJdCyO1F1X3+3ax+JSvMeZ7S6QSKp1Fp/sjYz6Z+VgCZzibGeEoujryfMulH7Rai5kAft9ebcW50DyJr2uo2z97mTWIu45YsSnNSMrrNUuG1XsYBtD9TDYzQffKB87vWbkM4EbPAFgoBV4GQS+vtFDUqOFAoi1nTtmIOvg38N4hT2Sn8r8clmBCXspBlMBYTnrqFJGBT3wZOzAyJDre9dHH7+x7qaaKDOB4UQALD5ecS0DE4obubQEiuJZ0EpBVpLuYcce8Aa4PYd/V4DLDAJBYKQPCWTcrEaZ5HYbJi11Gd6hjGom1ii18VHYnG28NKpkz2UKVPxlhYSp8uZr367iOmoy7zsxehW9wzcy2zG0a80PBMCRQMb32hnaHeOR8fnNDzZhaNYhkOdDsBUZ3loDMa1YP0uS0cjUP3b/6DBlqmZOeNABDsLl5BI5QJups8uxAuWJdkUB/pO6Zax6tsg7fN5mjjDgMGngO+DPcKqiHIDbFIGudxtPTIyDi9SFMKBDcfdGQRv41q1AqmxgkVfJMnP8w/Bc7N9/TR6C7mGObFqFkIEom8sKi2xYqJLTCHK7cxzaZvqODo22c3wisBCP4HeAgcRbNPAsBkNRhSmD48dHupdBRw4mIvtS5oeF6zeT1KMCyhMnmhpkFAGWnGscoNkwvQ8ZM5lE/vgTHFYL99OuNxdFBxTEDd5v2qLR8y9WkXsWgG6kZNndFG+pO/UAkOCipqIhL3hq7cRSdrCq7YhUsTocEcnaFa6nVkhnSeRYUA1YO0z5itF9Sly3VlxYDw239TJJH6f3EUfYO5lb7bcFcz8Bp7Oo8QmnsUHOz/fagVUBtKEw1iT88j+aKkv8cscKNkMxjYr8344D1kFoZ7/td1W6LCNYN594301tUGRmFjAzeRg5vyoM1F6+bJZ/Q54jN/k8SFd3DxPTYaAUsivsBfgTn7Mx8H2SpPt4GOdYRnEJOH6jHM2p6SgB0gzIRq6fHxGMmSmqaPCmlfwxiuloaVIitLGN8wie2CDWhkzLoCJcODh7KIOAqbHEvXdUxaS4TTTs07Clzj/6GmVs9kiZDerMxEnhUB6QQPlcfqkG9882RqHoLiHGBoHfQuXIsAG8GTAtao2KVwRnvvam8jo1e312GQAKWEa4sUVEAMG4G6ckcONDwRcg1e2D3+ohXgY4UAWF8wHKQMrSnzCgfFpsxh+aHXMGtPQroQasRY4U6UdG0rz1Vjbka0MekOGRZQEvqQFlxseFor8zWFgHek3v29+WqN6gaK5gZOTOMZzpQIC1201LkMCXild3vWXSc5UX9xcFYfbRPzGFa1FDcPfPB/jUEq/FeGt419CI3YmBlVoHsa4KdcwQP5ZSwHHhFJ7/Ph/Rap/4vmG91eDwPP0lDfCDRCLszTqfzM71xpmiKi2HwS4WlqvGNwtvwF5Dqpn6KTq8ax00UMPkxDcZrEEEsIvHiUXXEphdb4GB4FymlPwBz4Gperqq5pW7TQ6/yNRhW8VT5NhuP0udlxo4gILq5ZxAZk8ZGh3g4CqxJlPKY7AQxupfUcVpWT5VItp1+30UqoyP4wWsRo3olRRgkWZZ2ZN6VC3OZFeXB8NbnUrSdikNptD1QiGuKkr8EmSR/AK9Rw+FF3s5uwuPbvHGiPeFOViltMK7AUaOsq9+x9cndk3iJEE5LKZRlWJbKOZweROzmPNVPkjE3K/TyA57Rs68TkZ3MR8akKpm7cFjnjPd/DdkWjgYoKHSr5Wu5ssoBYU4acRs5g2DHxUmdq8VXOXRbunD8QN0LhgkssgahcdoYsNvuXGUK/KXD/7oFb+VGdhqIn02veuM5bLudJOc2Ky0GMaG4W/xWBxIJcL7yliJOXOpx0AkBqUgzlDczmLT4iILXDxxtRR1oZa2JWFgiAb43obrJnG/TZC2KSK2wqOzRZTXavZZFMb1f3bXvVaNaK828w9TO610gk8JNf3gMfETzXXsbcvRGCG9JWQZ6+cDPqc4466Yo2RcKH+PILeKOqtnlbInR3MmBeGG3FH10yzkybuqEC2HSQwpA0An7d9+73BkDUTm30bZmoP/RGbgFN+GrCOfADgqr0WbI1a1okpFms8iHYw9hm0zUvlEMivBRxModrbJJ+9/p3jUdQQ9BCtQdxnOGrT5dzRUmw0593/mbRSdBg0nRvRZM5/E16m7ZHmDEtWhwvfdZCZ8J8M12W0yRMszXamWfQTwIZ4ayYktrnscQuWr8idp3PjT2eF/jmtdhIfcpMnb+IfZY2FebW6UY/AK3jP4u3Tu4zE4qlnQgLFbM19EBIsNf7KhjdbqQ/D6yiDb+NlEi2SKD+ivXVUK8ib0oBo366gXkR8ZxGjpJIDcEgZPa9TcYe0TIbiPl/rPUQDu3XBJ9X/GNq3FAUsKsll57DzaGMrjcT+gctp+9MLYXCq+sqP81eVQ0r9lt+gcQfZbACRbEjvlMskztZG8gbC8Qn9tt26Q7y7nDrbZq/LEz7kR6Jc6pg3N9rVX8Y5MJrGlML9p9lU4jbTkKqCveeZUJjHB03m2KRKR2TytoFkTXOLg7keU1s1lrPMQJpoOKLuAAC+y1HlJucU6ysB5hsXhvSPPLq5J7JtnqHKZ4vYjC4Vy8153QY+6780xDuGARsGbOs1WqzH0QS765rnSKEbbKlkO8oI/VDwUd0is13tKpqILu1mDJFNy/iJAWcvDgjxvusIT+PGz3ST/J9r9Mtfd0jpaGeiLYIqXc7DiHSS8TcjFVksi66PEkxW1z6ujbLLUGNNYnzOWpH8BZGK4bCK7iR+MbIv8ncDAz1u4StN3vTTzewr9IQjk9wxFxn+6N1ddKs0vffJiS08N3a4G1SVrlZ97Q/M+8G9fe5AP6d9/Qq4WRnORVhofPIKEdCr3llspUfE0oKIIYoByBRPh+bX1HLS3JWGJRhIvE1aW4NTd8ePi4Z+kXb+Z8snYfSNcqijhAgVsx4RCM54cXUiYkjeBmmC4ajOHrChoELscJJC7+9jjMjw5BagZKlgRMiSNYz7h7vvZIoQqbtQmspc0cUk1G/73iXtSpROl5wtLgQi0mW2Ex8i3WULhcggx6E1LMVHUsdc9GHI1PH3U2Ko0PyGdn9KdVOLm7FPBui0i9a0HpA60MsewVE4z8CAt5d401Gv6zXlIT5Ybit1VIA0FCs7wtvYreru1fUyW3oLAZ/+aTnZrOcYRNVA8spoRtlRoWflsRClFcgzkqiHOrf0/SVw+EpVaFlJ0g4Kxq1MMOmiQdpMNpte8lMMQqm6cIFXlnGbfJllysKDi+0JJMotkqgIxOSQgU9dn/lWkeVf8nUm3iwX2Nl3WDw9i6AUK3vBAbZZrcJpDQ/N64AVwjT07Jef30GSSmtNu2WlW7YoyW2FlWfZFQUwk867EdLYKk9VG6JgEnBiBxkY7LMo4YLQJJlAo9l/oTvJkSARDF/XtyAzM8O2t3eT/iXa6wDN3WewNmQHdPfsxChU/KtLG2Mn8i4ZqKdSlIaBZadxJmRzVS/o4yA65RTSViq60oa395Lqw0pzY4SipwE0SXXsKV+GZraGSkr/RW08wPRvqvSUkYBMA9lPx4m24az+IHmCbXA+0faxTRE9wuGeO06DIXa6QlKJ3puIyiuAVfPr736vzo2pBirS+Vxel3TMm3JKhz9o2ZoRvaFVpIkykb0Hcm4oHFBMcNSNj7/4GJt43ogonY2Vg4nsDQIWxAcorpXACzgBqQPjYsE/VUpXpwNManEru4NwMCFPkXvMoqvoeLN3qyu/N1eWEHttMD65v19l/0kH2mR35iv/FI+yjoHJ9gPMz67af3Mq/BoWXqu3rphiWMXVkmnPSEkpGpUI2h1MThideGFEOK6YZHPwYzMBvpNC7+ZHxPb7epfefGyIB4JzO9DTNEYnDLVVHdQyvOEVefrk6Uv5kTQYVYWWdqrdcIl7yljwwIWdfQ/y+2QB3eR/qxYObuYyB4gTbo2in4PzarU1sO9nETkmj9/AoxDA+JM3GMqQtJR4jtduHtnoCLxd1gQUscHRB/MoRYIEsP2pDZ9KvHgtlk1iTbWWbHhohwFEYX7y51fUV2nuUmnoUcqnWIQAAgl9LTVX+Bc0QGNEhChxHR4YjfE51PUdGfsSFE6ck7BL3/hTf9jLq4G1IafINxOLKeAtO7quulYvH5YOBc+zX7CrMgWnW47/jfRsWnJjYYoE7xMfWV2HN2iyIqLI';
const FENCED = new Map([
    [
        8217,
        "apostrophe"
    ],
    [
        8260,
        "fraction slash"
    ],
    [
        12539,
        "middle dot"
    ]
]);
const NSM_MAX = 4;
function decode_arithmetic(bytes) {
    let pos = 0;
    function u16() {
        return bytes[pos++] << 8 | bytes[pos++];
    }
    // decode the frequency table
    let symbol_count = u16();
    let total = 1;
    let acc = [
        0,
        1
    ]; // first symbol has frequency 1
    for(let i = 1; i < symbol_count; i++){
        acc.push(total += u16());
    }
    // skip the sized-payload that the last 3 symbols index into
    let skip = u16();
    let pos_payload = pos;
    pos += skip;
    let read_width = 0;
    let read_buffer = 0;
    function read_bit() {
        if (read_width == 0) {
            // this will read beyond end of buffer
            // but (undefined|0) => zero pad
            read_buffer = read_buffer << 8 | bytes[pos++];
            read_width = 8;
        }
        return read_buffer >> --read_width & 1;
    }
    const N = 31;
    const FULL = 2 ** N;
    const HALF = FULL >>> 1;
    const QRTR = HALF >> 1;
    const MASK = FULL - 1;
    // fill register
    let register = 0;
    for(let i = 0; i < N; i++)register = register << 1 | read_bit();
    let symbols = [];
    let low = 0;
    let range = FULL; // treat like a float
    while(true){
        let value = Math.floor(((register - low + 1) * total - 1) / range);
        let start = 0;
        let end = symbol_count;
        while(end - start > 1){
            let mid = start + end >>> 1;
            if (value < acc[mid]) {
                end = mid;
            } else {
                start = mid;
            }
        }
        if (start == 0) break; // first symbol is end mark
        symbols.push(start);
        let a = low + Math.floor(range * acc[start] / total);
        let b = low + Math.floor(range * acc[start + 1] / total) - 1;
        while(((a ^ b) & HALF) == 0){
            register = register << 1 & MASK | read_bit();
            a = a << 1 & MASK;
            b = b << 1 & MASK | 1;
        }
        while(a & ~b & QRTR){
            register = register & HALF | register << 1 & MASK >>> 1 | read_bit();
            a = a << 1 ^ HALF;
            b = (b ^ HALF) << 1 | HALF | 1;
        }
        low = a;
        range = 1 + b - a;
    }
    let offset = symbol_count - 4;
    return symbols.map((x)=>{
        switch(x - offset){
            case 3:
                return offset + 0x10100 + (bytes[pos_payload++] << 16 | bytes[pos_payload++] << 8 | bytes[pos_payload++]);
            case 2:
                return offset + 0x100 + (bytes[pos_payload++] << 8 | bytes[pos_payload++]);
            case 1:
                return offset + bytes[pos_payload++];
            default:
                return x - 1;
        }
    });
}
// returns an iterator which returns the next symbol
function read_payload(v) {
    let pos = 0;
    return ()=>v[pos++];
}
function read_compressed_payload(s) {
    return read_payload(decode_arithmetic(unsafe_atob(s)));
}
// unsafe in the sense:
// expected well-formed Base64 w/o padding 
// 20220922: added for https://github.com/adraffy/ens-normalize.js/issues/4
function unsafe_atob(s) {
    let lookup = [];
    [
        ...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    ].forEach((c, i)=>lookup[c.charCodeAt(0)] = i);
    let n = s.length;
    let ret = new Uint8Array(6 * n >> 3);
    for(let i = 0, pos = 0, width = 0, carry = 0; i < n; i++){
        carry = carry << 6 | lookup[s.charCodeAt(i)];
        width += 6;
        if (width >= 8) {
            ret[pos++] = carry >> (width -= 8);
        }
    }
    return ret;
}
// eg. [0,1,2,3...] => [0,-1,1,-2,...]
function signed(i) {
    return i & 1 ? ~i >> 1 : i >> 1;
}
function read_deltas(n, next) {
    let v = Array(n);
    for(let i = 0, x = 0; i < n; i++)v[i] = x += signed(next());
    return v;
}
// [123][5] => [0 3] [1 1] [0 0]
function read_sorted(next, prev = 0) {
    let ret = [];
    while(true){
        let x = next();
        let n = next();
        if (!n) break;
        prev += x;
        for(let i = 0; i < n; i++){
            ret.push(prev + i);
        }
        prev += n + 1;
    }
    return ret;
}
function read_sorted_arrays(next) {
    return read_array_while(()=>{
        let v = read_sorted(next);
        if (v.length) return v;
    });
}
// returns map of x => ys
function read_mapped(next) {
    let ret = [];
    while(true){
        let w = next();
        if (w == 0) break;
        ret.push(read_linear_table(w, next));
    }
    while(true){
        let w = next() - 1;
        if (w < 0) break;
        ret.push(read_replacement_table(w, next));
    }
    return ret.flat();
}
// read until next is falsy
// return array of read values
function read_array_while(next) {
    let v = [];
    while(true){
        let x = next(v.length);
        if (!x) break;
        v.push(x);
    }
    return v;
}
// read w columns of length n
// return as n rows of length w
function read_transposed(n, w, next) {
    let m = Array(n).fill().map(()=>[]);
    for(let i = 0; i < w; i++){
        read_deltas(n, next).forEach((x, j)=>m[j].push(x));
    }
    return m;
}
// returns [[x, ys], [x+dx, ys+dy], [x+2*dx, ys+2*dy], ...]
// where dx/dy = steps, n = run size, w = length of y
function read_linear_table(w, next) {
    let dx = 1 + next();
    let dy = next();
    let vN = read_array_while(next);
    let m = read_transposed(vN.length, 1 + w, next);
    return m.flatMap((v, i)=>{
        let [x, ...ys] = v;
        return Array(vN[i]).fill().map((_, j)=>{
            let j_dy = j * dy;
            return [
                x + j * dx,
                ys.map((y)=>y + j_dy)
            ];
        });
    });
}
// return [[x, ys...], ...]
// where w = length of y
function read_replacement_table(w, next) {
    let n = 1 + next();
    let m = read_transposed(n, 1 + w, next);
    return m.map((v)=>[
            v[0],
            v.slice(1)
        ]);
}
function read_trie(next) {
    let ret = [];
    let sorted = read_sorted(next);
    expand(decode([]), []);
    return ret; // not sorted
    //TURBOPACK unreachable
    ;
    function decode(Q) {
        let S = next(); // state: valid, save, check
        let B = read_array_while(()=>{
            let cps = read_sorted(next).map((i)=>sorted[i]);
            if (cps.length) return decode(cps);
        });
        return {
            S,
            B,
            Q
        };
    }
    function expand({ S, B }, cps, saved) {
        if (S & 4 && saved === cps[cps.length - 1]) return;
        if (S & 2) saved = cps[cps.length - 1];
        if (S & 1) ret.push(cps);
        for (let br of B){
            for (let cp of br.Q){
                expand(br, [
                    ...cps,
                    cp
                ], saved);
            }
        }
    }
}
function hex_cp(cp) {
    return cp.toString(16).toUpperCase().padStart(2, '0');
}
function quote_cp(cp) {
    return `{${hex_cp(cp)}}`; // raffy convention: like "\u{X}" w/o the "\u"
}
/*
export function explode_cp(s) {
	return [...s].map(c => c.codePointAt(0));
}
*/ function explode_cp(s) {
    let cps = [];
    for(let pos = 0, len = s.length; pos < len;){
        let cp = s.codePointAt(pos);
        pos += cp < 0x10000 ? 1 : 2;
        cps.push(cp);
    }
    return cps;
}
function str_from_cps(cps) {
    const chunk = 4096;
    let len = cps.length;
    if (len < chunk) return String.fromCodePoint(...cps);
    let buf = [];
    for(let i = 0; i < len;){
        buf.push(String.fromCodePoint(...cps.slice(i, i += chunk)));
    }
    return buf.join('');
}
function compare_arrays(a, b) {
    let n = a.length;
    let c = n - b.length;
    for(let i = 0; c == 0 && i < n; i++)c = a[i] - b[i];
    return c;
}
// created 2023-09-25T01:01:55.148Z
// compressed base64-encoded blob for include-nf data
// source: https://github.com/adraffy/ens-normalize.js/blob/main/src/make.js
// see: https://github.com/adraffy/ens-normalize.js#security
// SHA-256: a974b6f8541fc29d919bc85118af0a44015851fab5343f8679cb31be2bdb209e
var COMPRESSED = 'AEUDTAHBCFQATQDRADAAcgAgADQAFAAsABQAHwAOACQADQARAAoAFwAHABIACAAPAAUACwAFAAwABAAQAAMABwAEAAoABQAIAAIACgABAAQAFAALAAIACwABAAIAAQAHAAMAAwAEAAsADAAMAAwACgANAA0AAwAKAAkABAAdAAYAZwDSAdsDJgC0CkMB8xhZAqfoC190UGcThgBurwf7PT09Pb09AjgJum8OjDllxHYUKXAPxzq6tABAxgK8ysUvWAgMPT09PT09PSs6LT2HcgWXWwFLoSMEEEl5RFVMKvO0XQ8ExDdJMnIgsj26PTQyy8FfEQ8AY8IPAGcEbwRwBHEEcgRzBHQEdQR2BHcEeAR6BHsEfAR+BIAEgfndBQoBYgULAWIFDAFiBNcE2ATZBRAFEQUvBdALFAsVDPcNBw13DYcOMA4xDjMB4BllHI0B2grbAMDpHLkQ7QHVAPRNQQFnGRUEg0yEB2uaJF8AJpIBpob5AERSMAKNoAXqaQLUBMCzEiACnwRZEkkVsS7tANAsBG0RuAQLEPABv9HICTUBXigPZwRBApMDOwAamhtaABqEAY8KvKx3LQ4ArAB8UhwEBAVSagD8AEFZADkBIadVj2UMUgx5Il4ANQC9AxIB1BlbEPMAs30CGxlXAhwZKQIECBc6EbsCoxngzv7UzRQA8M0BawL6ZwkN7wABAD33OQRcsgLJCjMCjqUChtw/km+NAsXPAoP2BT84PwURAK0RAvptb6cApQS/OMMey5HJS84UdxpxTPkCogVFITaTOwERAK5pAvkNBOVyA7q3BKlOJSALAgUIBRcEdASpBXqzABXFSWZOawLCOqw//AolCZdvv3dSBkEQGyelEPcMMwG1ATsN7UvYBPEGOwTJH30ZGQ/NlZwIpS3dDO0m4y6hgFoj9SqDBe1L9DzdC01RaA9ZC2UJ4zpjgU4DIQENIosK3Q05CG0Q8wrJaw3lEUUHOQPVSZoApQcBCxEdNRW1JhBirAsJOXcG+xr2C48mrxMpevwF0xohBk0BKRr/AM8u54WwWjFcHE9fBgMLJSPHFKhQIA0lQLd4SBobBxUlqQKRQ3BKh1E2HpMh9jw9DWYuE1F8B/U8BRlPC4E8nkarRQ4R0j6NPUgiSUwsBDV/LC8niwnPD4UMuXxyAVkJIQmxDHETMREXN8UIOQcZLZckJxUIIUaVYJoE958D8xPRAwsFPwlBBxMDtRwtEy4VKQUNgSTXAvM21S6zAo9WgAEXBcsPJR/fEFBH4A7pCJsCZQODJesALRUhABcimwhDYwBfj9hTBS7LCMdqbCN0A2cU52ERcweRDlcHpxwzFb8c4XDIXguGCCijrwlbAXUJmQFfBOMICTVbjKAgQWdTi1gYmyBhQT9d/AIxDGUVn0S9h3gCiw9rEhsBNQFzBzkNAQJ3Ee0RaxCVCOuGBDW1M/g6JQRPIYMgEQonA09szgsnJvkM+GkBoxJiAww0PXfuZ6tgtiQX/QcZMsVBYCHxC5JPzQycGsEYQlQuGeQHvwPzGvMn6kFXBf8DowMTOk0z7gS9C2kIiwk/AEkOoxcH1xhqCnGM0AExiwG3mQNXkYMCb48GNwcLAGcLhwV55QAdAqcIowAFAM8DVwA5Aq0HnQAZAIVBAT0DJy8BIeUCjwOTCDHLAZUvAfMpBBvDDBUA9zduSgLDsQKAamaiBd1YAo4CSTUBTSUEBU5HUQOvceEA2wBLBhPfRwEVq0rLGuNDAd9vKwDHAPsABTUHBUEBzQHzbQC3AV8LMQmis7UBTekpAIMAFWsB1wKJAN0ANQB/8QFTAE0FWfkF0wJPSQERMRgrV2EBuwMfATMBDQB5BsuNpckHHwRtB9MCEBsV4QLvLge1AQMi3xPNQsUCvd5VoWACZIECYkJbTa9bNyACofcCaJgCZgkCn4Q4GwsCZjsCZiYEbgR/A38TA36SOQY5dxc5gjojIwJsHQIyNjgKAm3HAm2u74ozZ0UrAWcA3gDhAEoFB5gMjQD+C8IADbUCdy8CdqI/AnlLQwJ4uh1c20WuRtcCfD8CesgCfQkCfPAFWQUgSABIfWMkAoFtAoAAAoAFAn+uSVhKWxUXSswC0QEC0MxLJwOITwOH5kTFkTIC8qFdAwMDrkvOTC0lA89NTE2vAos/AorYwRsHHUNnBbcCjjcCjlxAl4ECjtkCjlx4UbRTNQpS1FSFApP7ApMMAOkAHFUeVa9V0AYsGymVhjLheGZFOzkCl58C77JYIagAWSUClo8ClnycAKlZrFoJgU0AOwKWtQKWTlxEXNECmcsCmWRcyl0HGQKcmznCOp0CnBYCn5sCnriKAB0PMSoPAp3xAp6SALU9YTRh7wKe0wKgbgGpAp6fHwKeTqVjyGQnJSsCJ68CJn4CoPsCoEwCot0CocQCpi8Cpc4Cp/8AfQKn8mh8aLEAA0lqHGrRAqzjAqyuAq1nAq0CAlcdAlXcArHh1wMfTmyXArK9DQKy6Bds4G1jbUhfAyXNArZcOz9ukAMpRQK4XgK5RxUCuSp3cDZw4QK9GQK72nCWAzIRAr6IcgIDM3ECvhpzInNPAsPLAsMEc4J0SzVFdOADPKcDPJoDPb8CxXwCxkcCxhCJAshpUQLIRALJTwLJLgJknQLd0nh5YXiueSVL0AMYo2cCAmH0GfOVJHsLXpJeuxECz2sCz2wvS1PS8xOfAMatAs9zASnqA04SfksFAtwnAtuKAtJPA1JcA1NfAQEDVYyAiT8AyxbtYEWCHILTgs6DjQLaxwLZ3oQQhEmnPAOGpQAvA2QOhnFZ+QBVAt9lAt64c3cC4i/tFAHzMCcB9JsB8tKHAuvzAulweQLq+QLq5AD5RwG5Au6JAuuclqqXAwLuPwOF4Jh5cOBxoQLzAwBpA44WmZMC9xMDkW4DkocC95gC+dkC+GaaHJqruzebHgOdgwL++gEbADmfHJ+zAwWNA6ZqA6bZANHFAwZqoYiiBQkDDEkCwAA/AwDhQRdTARHzA2sHl2cFAJMtK7evvdsBiZkUfxEEOQH7KQUhDp0JnwCS/SlXxQL3AZ0AtwW5AG8LbUEuFCaNLgFDAYD8AbUmAHUDDgRtACwCFgyhAAAKAj0CagPdA34EkQEgRQUhfAoABQBEABMANhICdwEABdUDa+8KxQIA9wqfJ7+xt+UBkSFBQgHpFH8RNMCJAAQAGwBaAkUChIsABjpTOpSNbQC4Oo860ACNOME63AClAOgAywE6gTo7Ofw5+Tt2iTpbO56JOm85GAFWATMBbAUvNV01njWtNWY1dTW2NcU1gjWRNdI14TWeNa017jX9NbI1wTYCNhE1xjXVNhY2JzXeNe02LjY9Ni41LSE2OjY9Njw2yTcIBJA8VzY4Nt03IDcPNsogN4k3MAoEsDxnNiQ3GTdsOo03IULUQwdC4EMLHA8PCZsobShRVQYA6X8A6bABFCnXAukBowC9BbcAbwNzBL8MDAMMAQgDAAkKCwsLCQoGBAVVBI/DvwDz9b29kaUCb0QtsRTNLt4eGBcSHAMZFhYZEhYEARAEBUEcQRxBHEEcQRxBHEEaQRxBHEFCSTxBPElISUhBNkM2QTYbNklISVmBVIgBFLWZAu0BhQCjBcEAbykBvwGJAaQcEZ0ePCklMAAhMvAIMAL54gC7Bm8EescjzQMpARQpKgDUABavAj626xQAJP0A3etzuf4NNRA7efy2Z9NQrCnC0OSyANz5BBIbJ5IFDR6miIavYS6tprjjmuKebxm5C74Q225X1pkaYYPb6f1DK4k3xMEBb9S2WMjEibTNWhsRJIA+vwNVEiXTE5iXs/wezV66oFLfp9NZGYW+Gk19J2+bCT6Ye2w6LDYdgzKMUabk595eLBCXANz9HUpWbATq9vqXVx9XDg+Pc9Xp4+bsS005SVM/BJBM4687WUuf+Uj9dEi8aDNaPxtpbDxcG1THTImUMZq4UCaaNYpsVqraNyKLJXDYsFZ/5jl7bLRtO88t7P3xZaAxhb5OdPMXqsSkp1WCieG8jXm1U99+blvLlXzPCS+M93VnJCiK+09LfaSaBAVBomyDgJua8dfUzR7ga34IvR2Nvj+A9heJ6lsl1KG4NkI1032Cnff1m1wof2B9oHJK4bi6JkEdSqeNeiuo6QoZZincoc73/TH9SXF8sCE7XyuYyW8WSgbGFCjPV0ihLKhdPs08Tx82fYAkLLc4I2wdl4apY7GU5lHRFzRWJep7Ww3wbeA3qmd59/86P4xuNaqDpygXt6M85glSBHOCGgJDnt+pN9bK7HApMguX6+06RZNjzVmcZJ+wcUrJ9//bpRNxNuKpNl9uFds+S9tdx7LaM5ZkIrPj6nIU9mnbFtVbs9s/uLgl8MVczAwet+iOEzzBlYW7RCMgE6gyNLeq6+1tIx4dpgZnd0DksJS5f+JNDpwwcPNXaaVspq1fbQajOrJgK0ofKtJ1Ne90L6VO4MOl5S886p7u6xo7OLjG8TGL+HU1JXGJgppg4nNbNJ5nlzSpuPYy21JUEcUA94PoFiZfjZue+QnyQ80ekOuZVkxx4g+cvhJfHgNl4hy1/a6+RKcKlar/J29y//EztlbVPHVUeQ1zX86eQVAjR/M3dA9w4W8LfaXp4EgM85wOWasli837PzVMOnsLzR+k3o75/lRPAJSE1xAKQzEi5v10ke+VBvRt1cwQRMd+U5mLCTGVd6XiZtgBG5cDi0w22GKcVNvHiu5LQbZEDVtz0onn7k5+heuKXVsZtSzilkLRAUmjMXEMB3J9YC50XBxPiz53SC+EhnPl9WsKCv92SM/OFFIMJZYfl0WW8tIO3UxYcwdMAj7FSmgrsZ2aAZO03BOhP1bNNZItyXYQFTpC3SG1VuPDqH9GkiCDmE+JwxyIVSO5siDErAOpEXFgjy6PQtOVDj+s6e1r8heWVvmZnTciuf4EiNZzCAd7SOMhXERIOlsHIMG399i9aLTy3m2hRLZjJVDNLS53iGIK11dPqQt0zBDyg6qc7YqkDm2M5Ve6dCWCaCbTXX2rToaIgz6+zh4lYUi/+6nqcFMAkQJKHYLK0wYk5N9szV6xihDbDDFr45lN1K4aCXBq/FitPSud9gLt5ZVn+ZqGX7cwm2z5EGMgfFpIFyhGGuDPmso6TItTMwny+7uPnLCf4W6goFQFV0oQSsc9VfMmVLcLr6ZetDZbaSFTLqnSO/bIPjA3/zAUoqgGFAEQS4IhuMzEp2I3jJzbzkk/IEmyax+rhZTwd6f+CGtwPixu8IvzACquPWPREu9ZvGkUzpRwvRRuaNN6cr0W1wWits9ICdYJ7ltbgMiSL3sTPeufgNcVqMVWFkCPDH4jG2jA0XcVgQj62Cb29v9f/z/+2KbYvIv/zzjpQAPkliaVDzNrW57TZ/ZOyZD0nlfMmAIBIAGAI0D3k/mdN4xr9v85ZbZbbqfH2jGd5hUqNZWwl5SPfoGmfElmazUIeNL1j/mkF7VNAzTq4jNt8JoQ11NQOcmhprXoxSxfRGJ9LDEOAQ+dmxAQH90iti9e2u/MoeuaGcDTHoC+xsmEeWmxEKefQuIzHbpw5Tc5cEocboAD09oipWQhtTO1wivf/O+DRe2rpl/E9wlrzBorjJsOeG1B/XPW4EaJEFdNlECEZga5ZoGRHXgYouGRuVkm8tDESiEyFNo+3s5M5puSdTyUL2llnINVHEt91XUNW4ewdMgJ4boJfEyt/iY5WXqbA+A2Fkt5Z0lutiWhe9nZIyIUjyXDC3UsaG1t+eNx6z4W/OYoTB7A6x+dNSTOi9AInctbESqm5gvOLww7OWXPrmHwVZasrl4eD113pm+JtT7JVOvnCXqdzzdTRHgJ0PiGTFYW5Gvt9R9LD6Lzfs0v/TZZHSmyVNq7viIHE6DBK7Qp07Iz55EM8SYtQvZf/obBniTWi5C2/ovHfw4VndkE5XYdjOhCMRjDeOEfXeN/CwfGduiUIfsoFeUxXeQXba7c7972XNv8w+dTjjUM0QeNAReW+J014dKAD/McQYXT7c0GQPIkn3Ll6R7gGjuiQoZD0TEeEqQpKoZ15g/0OPQI17QiSv9AUROa/V/TQN3dvLArec3RrsYlvBm1b8LWzltdugsC50lNKYLEp2a+ZZYqPejULRlOJh5zj/LVMyTDvwKhMxxwuDkxJ1QpoNI0OTWLom4Z71SNzI9TV1iXJrIu9Wcnd+MCaAw8o1jSXd94YU/1gnkrC9BUEOtQvEIQ7g0i6h+KL2JKk8Ydl7HruvgWMSAmNe+LshGhV4qnWHhO9/RIPQzY1tHRj2VqOyNsDpK0cww+56AdDC4gsWwY0XxoucIWIqs/GcwnWqlaT0KPr8mbK5U94/301i1WLt4YINTVvCFBrFZbIbY8eycOdeJ2teD5IfPLCRg7jjcFTwlMFNl9zdh/o3E/hHPwj7BWg0MU09pPrBLbrCgm54A6H+I6v27+jL5gkjWg/iYdks9jbfVP5y/n0dlgWEMlKasl7JvFZd56LfybW1eeaVO0gxTfXZwD8G4SI116yx7UKVRgui6Ya1YpixqXeNLc8IxtAwCU5IhwQgn+NqHnRaDv61CxKhOq4pOX7M6pkA+Pmpd4j1vn6ACUALoLLc4vpXci8VidLxzm7qFBe7s+quuJs6ETYmnpgS3LwSZxPIltgBDXz8M1k/W2ySNv2f9/NPhxLGK2D21dkHeSGmenRT3Yqcdl0m/h3OYr8V+lXNYGf8aCCpd4bWjE4QIPj7vUKN4Nrfs7ML6Y2OyS830JCnofg/k7lpFpt4SqZc5HGg1HCOrHvOdC8bP6FGDbE/VV0mX4IakzbdS/op+Kt3G24/8QbBV7y86sGSQ/vZzU8FXs7u6jIvwchsEP2BpIhW3G8uWNwa3HmjfH/ZjhhCWvluAcF+nMf14ClKg5hGgtPLJ98ueNAkc5Hs2WZlk2QHvfreCK1CCGO6nMZVSb99VM/ajr8WHTte9JSmkXq/i/U943HEbdzW6Re/S88dKgg8pGOLlAeNiqrcLkUR3/aClFpMXcOUP3rmETcWSfMXZE3TUOi8i+fqRnTYLflVx/Vb/6GJ7eIRZUA6k3RYR3iFSK9c4iDdNwJuZL2FKz/IK5VimcNWEqdXjSoxSgmF0UPlDoUlNrPcM7ftmA8Y9gKiqKEHuWN+AZRIwtVSxye2Kf8rM3lhJ5XcBXU9n4v0Oy1RU2M+4qM8AQPVwse8ErNSob5oFPWxuqZnVzo1qB/IBxkM3EVUKFUUlO3e51259GgNcJbCmlvrdjtoTW7rChm1wyCKzpCTwozUUEOIcWLneRLgMXh+SjGSFkAllzbGS5HK7LlfCMRNRDSvbQPjcXaenNYxCvu2Qyznz6StuxVj66SgI0T8B6/sfHAJYZaZ78thjOSIFumNWLQbeZixDCCC+v0YBtkxiBB3jefHqZ/dFHU+crbj6OvS1x/JDD7vlm7zOVPwpUC01nhxZuY/63E7g';
// https://unicode.org/reports/tr15/
// for reference implementation
// see: /derive/nf.js
// algorithmic hangul
// https://www.unicode.org/versions/Unicode15.0.0/ch03.pdf (page 144)
const S0 = 0xAC00;
const L0 = 0x1100;
const V0 = 0x1161;
const T0 = 0x11A7;
const L_COUNT = 19;
const V_COUNT = 21;
const T_COUNT = 28;
const N_COUNT = V_COUNT * T_COUNT;
const S_COUNT = L_COUNT * N_COUNT;
const S1 = S0 + S_COUNT;
const L1 = L0 + L_COUNT;
const V1 = V0 + V_COUNT;
const T1 = T0 + T_COUNT;
function unpack_cc(packed) {
    return packed >> 24 & 0xFF;
}
function unpack_cp(packed) {
    return packed & 0xFFFFFF;
}
let SHIFTED_RANK, EXCLUSIONS, DECOMP, RECOMP;
function init$1() {
    //console.time('nf');
    let r = read_compressed_payload(COMPRESSED);
    SHIFTED_RANK = new Map(read_sorted_arrays(r).flatMap((v, i)=>v.map((x)=>[
                x,
                i + 1 << 24
            ]))); // pre-shifted
    EXCLUSIONS = new Set(read_sorted(r));
    DECOMP = new Map();
    RECOMP = new Map();
    for (let [cp, cps] of read_mapped(r)){
        if (!EXCLUSIONS.has(cp) && cps.length == 2) {
            let [a, b] = cps;
            let bucket = RECOMP.get(a);
            if (!bucket) {
                bucket = new Map();
                RECOMP.set(a, bucket);
            }
            bucket.set(b, cp);
        }
        DECOMP.set(cp, cps.reverse()); // stored reversed
    }
//console.timeEnd('nf');
// 20230905: 11ms
}
function is_hangul(cp) {
    return cp >= S0 && cp < S1;
}
function compose_pair(a, b) {
    if (a >= L0 && a < L1 && b >= V0 && b < V1) {
        return S0 + (a - L0) * N_COUNT + (b - V0) * T_COUNT;
    } else if (is_hangul(a) && b > T0 && b < T1 && (a - S0) % T_COUNT == 0) {
        return a + (b - T0);
    } else {
        let recomp = RECOMP.get(a);
        if (recomp) {
            recomp = recomp.get(b);
            if (recomp) {
                return recomp;
            }
        }
        return -1;
    }
}
function decomposed(cps) {
    if (!SHIFTED_RANK) init$1();
    let ret = [];
    let buf = [];
    let check_order = false;
    function add(cp) {
        let cc = SHIFTED_RANK.get(cp);
        if (cc) {
            check_order = true;
            cp |= cc;
        }
        ret.push(cp);
    }
    for (let cp of cps){
        while(true){
            if (cp < 0x80) {
                ret.push(cp);
            } else if (is_hangul(cp)) {
                let s_index = cp - S0;
                let l_index = s_index / N_COUNT | 0;
                let v_index = s_index % N_COUNT / T_COUNT | 0;
                let t_index = s_index % T_COUNT;
                add(L0 + l_index);
                add(V0 + v_index);
                if (t_index > 0) add(T0 + t_index);
            } else {
                let mapped = DECOMP.get(cp);
                if (mapped) {
                    buf.push(...mapped);
                } else {
                    add(cp);
                }
            }
            if (!buf.length) break;
            cp = buf.pop();
        }
    }
    if (check_order && ret.length > 1) {
        let prev_cc = unpack_cc(ret[0]);
        for(let i = 1; i < ret.length; i++){
            let cc = unpack_cc(ret[i]);
            if (cc == 0 || prev_cc <= cc) {
                prev_cc = cc;
                continue;
            }
            let j = i - 1;
            while(true){
                let tmp = ret[j + 1];
                ret[j + 1] = ret[j];
                ret[j] = tmp;
                if (!j) break;
                prev_cc = unpack_cc(ret[--j]);
                if (prev_cc <= cc) break;
            }
            prev_cc = unpack_cc(ret[i]);
        }
    }
    return ret;
}
function composed_from_decomposed(v) {
    let ret = [];
    let stack = [];
    let prev_cp = -1;
    let prev_cc = 0;
    for (let packed of v){
        let cc = unpack_cc(packed);
        let cp = unpack_cp(packed);
        if (prev_cp == -1) {
            if (cc == 0) {
                prev_cp = cp;
            } else {
                ret.push(cp);
            }
        } else if (prev_cc > 0 && prev_cc >= cc) {
            if (cc == 0) {
                ret.push(prev_cp, ...stack);
                stack.length = 0;
                prev_cp = cp;
            } else {
                stack.push(cp);
            }
            prev_cc = cc;
        } else {
            let composed = compose_pair(prev_cp, cp);
            if (composed >= 0) {
                prev_cp = composed;
            } else if (prev_cc == 0 && cc == 0) {
                ret.push(prev_cp);
                prev_cp = cp;
            } else {
                stack.push(cp);
                prev_cc = cc;
            }
        }
    }
    if (prev_cp >= 0) {
        ret.push(prev_cp, ...stack);
    }
    return ret;
}
// note: cps can be iterable
function nfd(cps) {
    return decomposed(cps).map(unpack_cp);
}
function nfc(cps) {
    return composed_from_decomposed(decomposed(cps));
}
const HYPHEN = 0x2D;
const STOP = 0x2E;
const STOP_CH = '.';
const FE0F = 0xFE0F;
const UNIQUE_PH = 1;
// 20230913: replace [...v] with Array_from(v) to avoid large spreads
const Array_from = (x)=>Array.from(x); // Array.from.bind(Array);
function group_has_cp(g, cp) {
    // 20230913: keep primary and secondary distinct instead of creating valid union
    return g.P.has(cp) || g.Q.has(cp);
}
class Emoji extends Array {
    get is_emoji() {
        return true;
    }
}
let MAPPED, IGNORED, CM, NSM, ESCAPE, NFC_CHECK, GROUPS, WHOLE_VALID, WHOLE_MAP, VALID, EMOJI_LIST, EMOJI_ROOT;
function init() {
    if (MAPPED) return;
    let r = read_compressed_payload(COMPRESSED$1);
    const read_sorted_array = ()=>read_sorted(r);
    const read_sorted_set = ()=>new Set(read_sorted_array());
    const set_add_many = (set, v)=>v.forEach((x)=>set.add(x));
    MAPPED = new Map(read_mapped(r));
    IGNORED = read_sorted_set(); // ignored characters are not valid, so just read raw codepoints
    /*
	// direct include from payload is smaller than the decompression code
	const FENCED = new Map(read_array_while(() => {
		let cp = r();
		if (cp) return [cp, read_str(r())];
	}));
	*/ // 20230217: we still need all CM for proper error formatting
    // but norm only needs NSM subset that are potentially-valid
    CM = read_sorted_array();
    NSM = new Set(read_sorted_array().map((i)=>CM[i]));
    CM = new Set(CM);
    ESCAPE = read_sorted_set(); // characters that should not be printed
    NFC_CHECK = read_sorted_set(); // only needed to illustrate ens_tokenize() transformations
    let chunks = read_sorted_arrays(r);
    let unrestricted = r();
    //const read_chunked = () => new Set(read_sorted_array().flatMap(i => chunks[i]).concat(read_sorted_array()));
    const read_chunked = ()=>{
        // 20230921: build set in parts, 2x faster
        let set = new Set();
        read_sorted_array().forEach((i)=>set_add_many(set, chunks[i]));
        set_add_many(set, read_sorted_array());
        return set;
    };
    GROUPS = read_array_while((i)=>{
        // minifier property mangling seems unsafe
        // so these are manually renamed to single chars
        let N = read_array_while(r).map((x)=>x + 0x60);
        if (N.length) {
            let R = i >= unrestricted; // unrestricted then restricted
            N[0] -= 32; // capitalize
            N = str_from_cps(N);
            if (R) N = `Restricted[${N}]`;
            let P = read_chunked(); // primary
            let Q = read_chunked(); // secondary
            let M = !r(); // not-whitelisted, check for NSM
            // *** this code currently isn't needed ***
            /*
			let V = [...P, ...Q].sort((a, b) => a-b); // derive: sorted valid
			let M = r()-1; // number of combining mark
			if (M < 0) { // whitelisted
				M = new Map(read_array_while(() => {
					let i = r();
					if (i) return [V[i-1], read_array_while(() => {
						let v = read_array_while(r);
						if (v.length) return v.map(x => x-1);
					})];
				}));
			}*/ return {
                N,
                P,
                Q,
                M,
                R
            };
        }
    });
    // decode compressed wholes
    WHOLE_VALID = read_sorted_set();
    WHOLE_MAP = new Map();
    let wholes = read_sorted_array().concat(Array_from(WHOLE_VALID)).sort((a, b)=>a - b); // must be sorted
    wholes.forEach((cp, i)=>{
        let d = r();
        let w = wholes[i] = d ? wholes[i - d] : {
            V: [],
            M: new Map()
        };
        w.V.push(cp); // add to member set
        if (!WHOLE_VALID.has(cp)) {
            WHOLE_MAP.set(cp, w); // register with whole map
        }
    });
    // compute confusable-extent complements
    // usage: WHOLE_MAP.get(cp).M.get(cp) = complement set
    for (let { V, M } of new Set(WHOLE_MAP.values())){
        // connect all groups that have each whole character
        let recs = [];
        for (let cp of V){
            let gs = GROUPS.filter((g)=>group_has_cp(g, cp));
            let rec = recs.find(({ G })=>gs.some((g)=>G.has(g)));
            if (!rec) {
                rec = {
                    G: new Set(),
                    V: []
                };
                recs.push(rec);
            }
            rec.V.push(cp);
            set_add_many(rec.G, gs);
        }
        // per character cache groups which are not a member of the extent
        let union = recs.flatMap((x)=>Array_from(x.G)); // all of the groups used by this whole
        for (let { G, V } of recs){
            let complement = new Set(union.filter((g)=>!G.has(g))); // groups not covered by the extent
            for (let cp of V){
                M.set(cp, complement); // this is the same reference
            }
        }
    }
    // compute valid set
    // 20230924: VALID was union but can be re-used
    VALID = new Set(); // exists in 1+ groups
    let multi = new Set(); // exists in 2+ groups
    const add_to_union = (cp)=>VALID.has(cp) ? multi.add(cp) : VALID.add(cp);
    for (let g of GROUPS){
        for (let cp of g.P)add_to_union(cp);
        for (let cp of g.Q)add_to_union(cp);
    }
    // dual purpose WHOLE_MAP: return placeholder if unique non-confusable
    for (let cp of VALID){
        if (!WHOLE_MAP.has(cp) && !multi.has(cp)) {
            WHOLE_MAP.set(cp, UNIQUE_PH);
        }
    }
    // add all decomposed parts
    // see derive: "Valid is Closed (via Brute-force)"
    set_add_many(VALID, nfd(VALID));
    // decode emoji
    // 20230719: emoji are now fully-expanded to avoid quirk logic 
    EMOJI_LIST = read_trie(r).map((v)=>Emoji.from(v)).sort(compare_arrays);
    EMOJI_ROOT = new Map(); // this has approx 7K nodes (2+ per emoji)
    for (let cps of EMOJI_LIST){
        // 20230719: change to *slightly* stricter algorithm which disallows 
        // insertion of misplaced FE0F in emoji sequences (matching ENSIP-15)
        // example: beautified [A B] (eg. flag emoji) 
        //  before: allow: [A FE0F B], error: [A FE0F FE0F B] 
        //   after: error: both
        // note: this code now matches ENSNormalize.{cs,java} logic
        let prev = [
            EMOJI_ROOT
        ];
        for (let cp of cps){
            let next = prev.map((node)=>{
                let child = node.get(cp);
                if (!child) {
                    // should this be object? 
                    // (most have 1-2 items, few have many)
                    // 20230719: no, v8 default map is 4?
                    child = new Map();
                    node.set(cp, child);
                }
                return child;
            });
            if (cp === FE0F) {
                prev.push(...next); // less than 20 elements
            } else {
                prev = next;
            }
        }
        for (let x of prev){
            x.V = cps;
        }
    }
}
// if escaped: {HEX}
//       else: "x" {HEX}
function quoted_cp(cp) {
    return (should_escape(cp) ? '' : `${bidi_qq(safe_str_from_cps([
        cp
    ]))} `) + quote_cp(cp);
}
// 20230211: some messages can be mixed-directional and result in spillover
// use 200E after a quoted string to force the remainder of a string from 
// acquring the direction of the quote
// https://www.w3.org/International/questions/qa-bidi-unicode-controls#exceptions
function bidi_qq(s) {
    return `"${s}"\u200E`; // strong LTR
}
function check_label_extension(cps) {
    if (cps.length >= 4 && cps[2] == HYPHEN && cps[3] == HYPHEN) {
        throw new Error(`invalid label extension: "${str_from_cps(cps.slice(0, 4))}"`); // this can only be ascii so cant be bidi
    }
}
function check_leading_underscore(cps) {
    const UNDERSCORE = 0x5F;
    for(let i = cps.lastIndexOf(UNDERSCORE); i > 0;){
        if (cps[--i] !== UNDERSCORE) {
            throw new Error('underscore allowed only at start');
        }
    }
}
// check that a fenced cp is not leading, trailing, or touching another fenced cp
function check_fenced(cps) {
    let cp = cps[0];
    let prev = FENCED.get(cp);
    if (prev) throw error_placement(`leading ${prev}`);
    let n = cps.length;
    let last = -1; // prevents trailing from throwing
    for(let i = 1; i < n; i++){
        cp = cps[i];
        let match = FENCED.get(cp);
        if (match) {
            // since cps[0] isn't fenced, cps[1] cannot throw
            if (last == i) throw error_placement(`${prev} + ${match}`);
            last = i + 1;
            prev = match;
        }
    }
    if (last == n) throw error_placement(`trailing ${prev}`);
}
// create a safe to print string 
// invisibles are escaped
// leading cm uses placeholder
// if cps exceed max, middle truncate with ellipsis
// quoter(cp) => string, eg. 3000 => "{3000}"
// note: in html, you'd call this function then replace [<>&] with entities
function safe_str_from_cps(cps, max = Infinity, quoter = quote_cp) {
    //if (Number.isInteger(cps)) cps = [cps];
    //if (!Array.isArray(cps)) throw new TypeError(`expected codepoints`);
    let buf = [];
    if (is_combining_mark(cps[0])) buf.push('◌');
    if (cps.length > max) {
        max >>= 1;
        cps = [
            ...cps.slice(0, max),
            0x2026,
            ...cps.slice(-max)
        ];
    }
    let prev = 0;
    let n = cps.length;
    for(let i = 0; i < n; i++){
        let cp = cps[i];
        if (should_escape(cp)) {
            buf.push(str_from_cps(cps.slice(prev, i)));
            buf.push(quoter(cp));
            prev = i + 1;
        }
    }
    buf.push(str_from_cps(cps.slice(prev, n)));
    return buf.join('');
}
// note: set(s) cannot be exposed because they can be modified
// note: Object.freeze() doesn't work
function is_combining_mark(cp) {
    init();
    return CM.has(cp);
}
function should_escape(cp) {
    init();
    return ESCAPE.has(cp);
}
// return all supported emoji as fully-qualified emoji 
// ordered by length then lexicographic 
function ens_emoji() {
    init();
    return EMOJI_LIST.map((x)=>x.slice()); // emoji are exposed so copy
}
function ens_normalize_fragment(frag, decompose) {
    init();
    let nf = decompose ? nfd : nfc;
    return frag.split(STOP_CH).map((label)=>str_from_cps(tokens_from_str(explode_cp(label), nf, filter_fe0f).flat())).join(STOP_CH);
}
function ens_normalize(name) {
    return flatten(split(name, nfc, filter_fe0f));
}
function ens_beautify(name) {
    let labels = split(name, nfc, (x)=>x); // emoji not exposed
    for (let { type, output, error } of labels){
        if (error) break; // flatten will throw
        // replace leading/trailing hyphen
        // 20230121: consider beautifing all or leading/trailing hyphen to unicode variant
        // not exactly the same in every font, but very similar: "-" vs "‐"
        /*
		const UNICODE_HYPHEN = 0x2010;
		// maybe this should replace all for visual consistancy?
		// `node tools/reg-count.js regex ^-\{2,\}` => 592
		//for (let i = 0; i < output.length; i++) if (output[i] == 0x2D) output[i] = 0x2010;
		if (output[0] == HYPHEN) output[0] = UNICODE_HYPHEN;
		let end = output.length-1;
		if (output[end] == HYPHEN) output[end] = UNICODE_HYPHEN;
		*/ // 20230123: WHATWG URL uses "CheckHyphens" false
        // https://url.spec.whatwg.org/#idna
        // update ethereum symbol
        // ξ => Ξ if not greek
        if (type !== 'Greek') array_replace(output, 0x3BE, 0x39E);
    // 20221213: fixes bidi subdomain issue, but breaks invariant (200E is disallowed)
    // could be fixed with special case for: 2D (.) + 200E (LTR)
    // https://discuss.ens.domains/t/bidi-label-ordering-spoof/15824
    //output.splice(0, 0, 0x200E);
    }
    return flatten(labels);
}
function array_replace(v, a, b) {
    let prev = 0;
    while(true){
        let next = v.indexOf(a, prev);
        if (next < 0) break;
        v[next] = b;
        prev = next + 1;
    }
}
function ens_split(name, preserve_emoji) {
    return split(name, nfc, preserve_emoji ? (x)=>x.slice() : filter_fe0f); // emoji are exposed so copy
}
function split(name, nf, ef) {
    if (!name) return []; // 20230719: empty name allowance
    init();
    let offset = 0;
    // https://unicode.org/reports/tr46/#Validity_Criteria
    // 4.) "The label must not contain a U+002E ( . ) FULL STOP."
    return name.split(STOP_CH).map((label)=>{
        let input = explode_cp(label);
        let info = {
            input,
            offset
        };
        offset += input.length + 1; // + stop
        try {
            // 1.) "The label must be in Unicode Normalization Form NFC"
            let tokens = info.tokens = tokens_from_str(input, nf, ef);
            let token_count = tokens.length;
            let type;
            if (!token_count) {
                //norm = [];
                //type = 'None'; // use this instead of next match, "ASCII"
                // 20230120: change to strict
                // https://discuss.ens.domains/t/ens-name-normalization-2nd/14564/59
                throw new Error(`empty label`);
            }
            let norm = info.output = tokens.flat();
            check_leading_underscore(norm);
            let emoji = info.emoji = token_count > 1 || tokens[0].is_emoji; // same as: tokens.some(x => x.is_emoji);
            if (!emoji && norm.every((cp)=>cp < 0x80)) {
                // 20230123: matches matches WHATWG, see note 3.3
                check_label_extension(norm); // only needed for ascii
                // cant have fenced
                // cant have cm
                // cant have wholes
                // see derive: "Fastpath ASCII"
                type = 'ASCII';
            } else {
                let chars = tokens.flatMap((x)=>x.is_emoji ? [] : x); // all of the nfc tokens concat together
                if (!chars.length) {
                    type = 'Emoji';
                } else {
                    // 5.) "The label must not begin with a combining mark, that is: General_Category=Mark."
                    if (CM.has(norm[0])) throw error_placement('leading combining mark');
                    for(let i = 1; i < token_count; i++){
                        let cps = tokens[i];
                        if (!cps.is_emoji && CM.has(cps[0])) {
                            // bidi_qq() not needed since emoji is LTR and cps is a CM
                            throw error_placement(`emoji + combining mark: "${str_from_cps(tokens[i - 1])} + ${safe_str_from_cps([
                                cps[0]
                            ])}"`);
                        }
                    }
                    check_fenced(norm);
                    let unique = Array_from(new Set(chars));
                    let [g] = determine_group(unique); // take the first match
                    // see derive: "Matching Groups have Same CM Style"
                    // alternative: could form a hybrid type: Latin/Japanese/...	
                    check_group(g, chars); // need text in order
                    check_whole(g, unique); // only need unique text (order would be required for multiple-char confusables)
                    type = g.N;
                // 20230121: consider exposing restricted flag
                // it's simpler to just check for 'Restricted'
                // or even better: type.endsWith(']')
                //if (g.R) info.restricted = true;
                }
            }
            info.type = type;
        } catch (err) {
            info.error = err; // use full error object
        }
        return info;
    });
}
function check_whole(group, unique) {
    let maker;
    let shared = [];
    for (let cp of unique){
        let whole = WHOLE_MAP.get(cp);
        if (whole === UNIQUE_PH) return; // unique, non-confusable
        if (whole) {
            let set = whole.M.get(cp); // groups which have a character that look-like this character
            maker = maker ? maker.filter((g)=>set.has(g)) : Array_from(set);
            if (!maker.length) return; // confusable intersection is empty
        } else {
            shared.push(cp);
        }
    }
    if (maker) {
        // we have 1+ confusable
        // check if any of the remaining groups
        // contain the shared characters too
        for (let g of maker){
            if (shared.every((cp)=>group_has_cp(g, cp))) {
                throw new Error(`whole-script confusable: ${group.N}/${g.N}`);
            }
        }
    }
}
// assumption: unique.size > 0
// returns list of matching groups
function determine_group(unique) {
    let groups = GROUPS;
    for (let cp of unique){
        // note: we need to dodge CM that are whitelisted
        // but that code isn't currently necessary
        let gs = groups.filter((g)=>group_has_cp(g, cp));
        if (!gs.length) {
            if (!GROUPS.some((g)=>group_has_cp(g, cp))) {
                // the character was composed of valid parts
                // but it's NFC form is invalid
                // 20230716: change to more exact statement, see: ENSNormalize.{cs,java}
                // note: this doesn't have to be a composition
                // 20230720: change to full check
                throw error_disallowed(cp); // this should be rare
            } else {
                // there is no group that contains all these characters
                // throw using the highest priority group that matched
                // https://www.unicode.org/reports/tr39/#mixed_script_confusables
                throw error_group_member(groups[0], cp);
            }
        }
        groups = gs;
        if (gs.length == 1) break; // there is only one group left
    }
    // there are at least 1 group(s) with all of these characters
    return groups;
}
// throw on first error
function flatten(split) {
    return split.map(({ input, error, output })=>{
        if (error) {
            // don't print label again if just a single label
            let msg = error.message;
            // bidi_qq() only necessary if msg is digits
            throw new Error(split.length == 1 ? msg : `Invalid label ${bidi_qq(safe_str_from_cps(input, 63))}: ${msg}`);
        }
        return str_from_cps(output);
    }).join(STOP_CH);
}
function error_disallowed(cp) {
    // TODO: add cp to error?
    return new Error(`disallowed character: ${quoted_cp(cp)}`);
}
function error_group_member(g, cp) {
    let quoted = quoted_cp(cp);
    let gg = GROUPS.find((g)=>g.P.has(cp)); // only check primary
    if (gg) {
        quoted = `${gg.N} ${quoted}`;
    }
    return new Error(`illegal mixture: ${g.N} + ${quoted}`);
}
function error_placement(where) {
    return new Error(`illegal placement: ${where}`);
}
// assumption: cps.length > 0
// assumption: cps[0] isn't a CM
// assumption: the previous character isn't an emoji
function check_group(g, cps) {
    for (let cp of cps){
        if (!group_has_cp(g, cp)) {
            // for whitelisted scripts, this will throw illegal mixture on invalid cm, eg. "e{300}{300}"
            // at the moment, it's unnecessary to introduce an extra error type
            // until there exists a whitelisted multi-character
            //   eg. if (M < 0 && is_combining_mark(cp)) { ... }
            // there are 3 cases:
            //   1. illegal cm for wrong group => mixture error
            //   2. illegal cm for same group => cm error
            //       requires set of whitelist cm per group: 
            //        eg. new Set([...g.P, ...g.Q].flatMap(nfc).filter(cp => CM.has(cp)))
            //   3. wrong group => mixture error
            throw error_group_member(g, cp);
        }
    }
    //if (M >= 0) { // we have a known fixed cm count
    if (g.M) {
        let decomposed = nfd(cps);
        for(let i = 1, e = decomposed.length; i < e; i++){
            // 20230210: bugfix: using cps instead of decomposed h/t Carbon225
            /*
			if (CM.has(decomposed[i])) {
				let j = i + 1;
				while (j < e && CM.has(decomposed[j])) j++;
				if (j - i > M) {
					throw new Error(`too many combining marks: ${g.N} ${bidi_qq(str_from_cps(decomposed.slice(i-1, j)))} (${j-i}/${M})`);
				}
				i = j;
			}
			*/ // 20230217: switch to NSM counting
            // https://www.unicode.org/reports/tr39/#Optional_Detection
            if (NSM.has(decomposed[i])) {
                let j = i + 1;
                for(let cp; j < e && NSM.has(cp = decomposed[j]); j++){
                    // a. Forbid sequences of the same nonspacing mark.
                    for(let k = i; k < j; k++){
                        if (decomposed[k] == cp) {
                            throw new Error(`duplicate non-spacing marks: ${quoted_cp(cp)}`);
                        }
                    }
                }
                // parse to end so we have full nsm count
                // b. Forbid sequences of more than 4 nonspacing marks (gc=Mn or gc=Me).
                if (j - i > NSM_MAX) {
                    // note: this slice starts with a base char or spacing-mark cm
                    throw new Error(`excessive non-spacing marks: ${bidi_qq(safe_str_from_cps(decomposed.slice(i - 1, j)))} (${j - i}/${NSM_MAX})`);
                }
                i = j;
            }
        }
    }
// *** this code currently isn't needed ***
/*
	let cm_whitelist = M instanceof Map;
	for (let i = 0, e = cps.length; i < e; ) {
		let cp = cps[i++];
		let seqs = cm_whitelist && M.get(cp);
		if (seqs) { 
			// list of codepoints that can follow
			// if this exists, this will always be 1+
			let j = i;
			while (j < e && CM.has(cps[j])) j++;
			let cms = cps.slice(i, j);
			let match = seqs.find(seq => !compare_arrays(seq, cms));
			if (!match) throw new Error(`disallowed combining mark sequence: "${safe_str_from_cps([cp, ...cms])}"`);
			i = j;
		} else if (!V.has(cp)) {
			// https://www.unicode.org/reports/tr39/#mixed_script_confusables
			let quoted = quoted_cp(cp);
			for (let cp of cps) {
				let u = UNIQUE.get(cp);
				if (u && u !== g) {
					// if both scripts are restricted this error is confusing
					// because we don't differentiate RestrictedA from RestrictedB 
					if (!u.R) quoted = `${quoted} is ${u.N}`;
					break;
				}
			}
			throw new Error(`disallowed ${g.N} character: ${quoted}`);
			//throw new Error(`disallowed character: ${quoted} (expected ${g.N})`);
			//throw new Error(`${g.N} does not allow: ${quoted}`);
		}
	}
	if (!cm_whitelist) {
		let decomposed = nfd(cps);
		for (let i = 1, e = decomposed.length; i < e; i++) { // we know it can't be cm leading
			if (CM.has(decomposed[i])) {
				let j = i + 1;
				while (j < e && CM.has(decomposed[j])) j++;
				if (j - i > M) {
					throw new Error(`too many combining marks: "${str_from_cps(decomposed.slice(i-1, j))}" (${j-i}/${M})`);
				}
				i = j;
			}
		}
	}
	*/ }
// given a list of codepoints
// returns a list of lists, where emoji are a fully-qualified (as Array subclass)
// eg. explode_cp("abc💩d") => [[61, 62, 63], Emoji[1F4A9, FE0F], [64]]
// 20230818: rename for 'process' name collision h/t Javarome
// https://github.com/adraffy/ens-normalize.js/issues/23
function tokens_from_str(input, nf, ef) {
    let ret = [];
    let chars = [];
    input = input.slice().reverse(); // flip so we can pop
    while(input.length){
        let emoji = consume_emoji_reversed(input);
        if (emoji) {
            if (chars.length) {
                ret.push(nf(chars));
                chars = [];
            }
            ret.push(ef(emoji));
        } else {
            let cp = input.pop();
            if (VALID.has(cp)) {
                chars.push(cp);
            } else {
                let cps = MAPPED.get(cp);
                if (cps) {
                    chars.push(...cps); // less than 10 elements
                } else if (!IGNORED.has(cp)) {
                    // 20230912: unicode 15.1 changed the order of processing such that
                    // disallowed parts are only rejected after NFC
                    // https://unicode.org/reports/tr46/#Validity_Criteria
                    // this doesn't impact normalization as of today
                    // technically, this error can be removed as the group logic will apply similar logic
                    // however the error type might be less clear
                    throw error_disallowed(cp);
                }
            }
        }
    }
    if (chars.length) {
        ret.push(nf(chars));
    }
    return ret;
}
function filter_fe0f(cps) {
    return cps.filter((cp)=>cp != FE0F);
}
// given array of codepoints
// returns the longest valid emoji sequence (or undefined if no match)
// *MUTATES* the supplied array
// disallows interleaved ignored characters
// fills (optional) eaten array with matched codepoints
function consume_emoji_reversed(cps, eaten) {
    let node = EMOJI_ROOT;
    let emoji;
    let pos = cps.length;
    while(pos){
        node = node.get(cps[--pos]);
        if (!node) break;
        let { V } = node;
        if (V) {
            emoji = V;
            if (eaten) eaten.push(...cps.slice(pos).reverse()); // (optional) copy input, used for ens_tokenize()
            cps.length = pos; // truncate
        }
    }
    return emoji;
}
// ************************************************************
// tokenizer 
const TY_VALID = 'valid';
const TY_MAPPED = 'mapped';
const TY_IGNORED = 'ignored';
const TY_DISALLOWED = 'disallowed';
const TY_EMOJI = 'emoji';
const TY_NFC = 'nfc';
const TY_STOP = 'stop';
function ens_tokenize(name, { nf = true } = {}) {
    init();
    let input = explode_cp(name).reverse();
    let eaten = [];
    let tokens = [];
    while(input.length){
        let emoji = consume_emoji_reversed(input, eaten);
        if (emoji) {
            tokens.push({
                type: TY_EMOJI,
                emoji: emoji.slice(),
                input: eaten,
                cps: filter_fe0f(emoji)
            });
            eaten = []; // reset buffer
        } else {
            let cp = input.pop();
            if (cp == STOP) {
                tokens.push({
                    type: TY_STOP,
                    cp
                });
            } else if (VALID.has(cp)) {
                tokens.push({
                    type: TY_VALID,
                    cps: [
                        cp
                    ]
                });
            } else if (IGNORED.has(cp)) {
                tokens.push({
                    type: TY_IGNORED,
                    cp
                });
            } else {
                let cps = MAPPED.get(cp);
                if (cps) {
                    tokens.push({
                        type: TY_MAPPED,
                        cp,
                        cps: cps.slice()
                    });
                } else {
                    tokens.push({
                        type: TY_DISALLOWED,
                        cp
                    });
                }
            }
        }
    }
    if (nf) {
        for(let i = 0, start = -1; i < tokens.length; i++){
            let token = tokens[i];
            if (is_valid_or_mapped(token.type)) {
                if (requires_check(token.cps)) {
                    let end = i + 1;
                    for(let pos = end; pos < tokens.length; pos++){
                        let { type, cps } = tokens[pos];
                        if (is_valid_or_mapped(type)) {
                            if (!requires_check(cps)) break;
                            end = pos + 1;
                        } else if (type !== TY_IGNORED) {
                            break;
                        }
                    }
                    if (start < 0) start = i;
                    let slice = tokens.slice(start, end);
                    let cps0 = slice.flatMap((x)=>is_valid_or_mapped(x.type) ? x.cps : []); // strip junk tokens
                    let cps = nfc(cps0);
                    if (compare_arrays(cps, cps0)) {
                        tokens.splice(start, end - start, {
                            type: TY_NFC,
                            input: cps0,
                            cps,
                            tokens0: collapse_valid_tokens(slice),
                            tokens: ens_tokenize(str_from_cps(cps), {
                                nf: false
                            })
                        });
                        i = start;
                    } else {
                        i = end - 1; // skip to end of slice
                    }
                    start = -1; // reset
                } else {
                    start = i; // remember last
                }
            } else if (token.type !== TY_IGNORED) {
                start = -1; // reset
            }
        }
    }
    return collapse_valid_tokens(tokens);
}
function is_valid_or_mapped(type) {
    return type == TY_VALID || type == TY_MAPPED;
}
function requires_check(cps) {
    return cps.some((cp)=>NFC_CHECK.has(cp));
}
function collapse_valid_tokens(tokens) {
    for(let i = 0; i < tokens.length; i++){
        if (tokens[i].type == TY_VALID) {
            let j = i + 1;
            while(j < tokens.length && tokens[j].type == TY_VALID)j++;
            tokens.splice(i, j - i, {
                type: TY_VALID,
                cps: tokens.slice(i, j).flatMap((x)=>x.cps)
            });
        }
    }
    return tokens;
}
exports.ens_beautify = ens_beautify;
exports.ens_emoji = ens_emoji;
exports.ens_normalize = ens_normalize;
exports.ens_normalize_fragment = ens_normalize_fragment;
exports.ens_split = ens_split;
exports.ens_tokenize = ens_tokenize;
exports.is_combining_mark = is_combining_mark;
exports.nfc = nfc;
exports.nfd = nfd;
exports.safe_str_from_cps = safe_str_from_cps;
exports.should_escape = should_escape;
}),
"[project]/node_modules/node-gyp-build/node-gyp-build.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
var path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
var os = __turbopack_context__.r("[externals]/os [external] (os, cjs)");
// Workaround to fix webpack's build warnings: 'the request of a dependency is an expression'
var runtimeRequire = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : /*TURBOPACK member replacement*/ __turbopack_context__.t // eslint-disable-line
;
var vars = process.config && process.config.variables || {};
var prebuildsOnly = !!process.env.PREBUILDS_ONLY;
var abi = process.versions.modules // TODO: support old node where this is undef
;
var runtime = isElectron() ? 'electron' : isNwjs() ? 'node-webkit' : 'node';
var arch = process.env.npm_config_arch || os.arch();
var platform = process.env.npm_config_platform || os.platform();
var libc = process.env.LIBC || (isAlpine(platform) ? 'musl' : 'glibc');
var armv = process.env.ARM_VERSION || (arch === 'arm64' ? '8' : vars.arm_version) || '';
var uv = (process.versions.uv || '').split('.')[0];
module.exports = load;
function load(dir) {
    return runtimeRequire(load.resolve(dir));
}
load.resolve = load.path = function(dir) {
    dir = path.resolve(dir || '.');
    try {
        var name = runtimeRequire(path.join(dir, 'package.json')).name.toUpperCase().replace(/-/g, '_');
        if (process.env[name + '_PREBUILD']) dir = process.env[name + '_PREBUILD'];
    } catch (err) {}
    if (!prebuildsOnly) {
        var release = getFirst(path.join(dir, 'build/Release'), matchBuild);
        if (release) return release;
        var debug = getFirst(path.join(dir, 'build/Debug'), matchBuild);
        if (debug) return debug;
    }
    var prebuild = resolve(dir);
    if (prebuild) return prebuild;
    var nearby = resolve(path.dirname(process.execPath));
    if (nearby) return nearby;
    var target = [
        'platform=' + platform,
        'arch=' + arch,
        'runtime=' + runtime,
        'abi=' + abi,
        'uv=' + uv,
        armv ? 'armv=' + armv : '',
        'libc=' + libc,
        'node=' + process.versions.node,
        process.versions.electron ? 'electron=' + process.versions.electron : '',
        typeof __webpack_require__ === 'function' ? 'webpack=true' : '' // eslint-disable-line
    ].filter(Boolean).join(' ');
    throw new Error('No native build was found for ' + target + '\n    loaded from: ' + dir + '\n');
    function resolve(dir) {
        // Find matching "prebuilds/<platform>-<arch>" directory
        var tuples = readdirSync(path.join(dir, 'prebuilds')).map(parseTuple);
        var tuple = tuples.filter(matchTuple(platform, arch)).sort(compareTuples)[0];
        if (!tuple) return;
        // Find most specific flavor first
        var prebuilds = path.join(dir, 'prebuilds', tuple.name);
        var parsed = readdirSync(prebuilds).map(parseTags);
        var candidates = parsed.filter(matchTags(runtime, abi));
        var winner = candidates.sort(compareTags(runtime))[0];
        if (winner) return path.join(prebuilds, winner.file);
    }
};
function readdirSync(dir) {
    try {
        return fs.readdirSync(dir);
    } catch (err) {
        return [];
    }
}
function getFirst(dir, filter) {
    var files = readdirSync(dir).filter(filter);
    return files[0] && path.join(dir, files[0]);
}
function matchBuild(name) {
    return /\.node$/.test(name);
}
function parseTuple(name) {
    // Example: darwin-x64+arm64
    var arr = name.split('-');
    if (arr.length !== 2) return;
    var platform = arr[0];
    var architectures = arr[1].split('+');
    if (!platform) return;
    if (!architectures.length) return;
    if (!architectures.every(Boolean)) return;
    return {
        name,
        platform,
        architectures
    };
}
function matchTuple(platform, arch) {
    return function(tuple) {
        if (tuple == null) return false;
        if (tuple.platform !== platform) return false;
        return tuple.architectures.includes(arch);
    };
}
function compareTuples(a, b) {
    // Prefer single-arch prebuilds over multi-arch
    return a.architectures.length - b.architectures.length;
}
function parseTags(file) {
    var arr = file.split('.');
    var extension = arr.pop();
    var tags = {
        file: file,
        specificity: 0
    };
    if (extension !== 'node') return;
    for(var i = 0; i < arr.length; i++){
        var tag = arr[i];
        if (tag === 'node' || tag === 'electron' || tag === 'node-webkit') {
            tags.runtime = tag;
        } else if (tag === 'napi') {
            tags.napi = true;
        } else if (tag.slice(0, 3) === 'abi') {
            tags.abi = tag.slice(3);
        } else if (tag.slice(0, 2) === 'uv') {
            tags.uv = tag.slice(2);
        } else if (tag.slice(0, 4) === 'armv') {
            tags.armv = tag.slice(4);
        } else if (tag === 'glibc' || tag === 'musl') {
            tags.libc = tag;
        } else {
            continue;
        }
        tags.specificity++;
    }
    return tags;
}
function matchTags(runtime, abi) {
    return function(tags) {
        if (tags == null) return false;
        if (tags.runtime && tags.runtime !== runtime && !runtimeAgnostic(tags)) return false;
        if (tags.abi && tags.abi !== abi && !tags.napi) return false;
        if (tags.uv && tags.uv !== uv) return false;
        if (tags.armv && tags.armv !== armv) return false;
        if (tags.libc && tags.libc !== libc) return false;
        return true;
    };
}
function runtimeAgnostic(tags) {
    return tags.runtime === 'node' && tags.napi;
}
function compareTags(runtime) {
    // Precedence: non-agnostic runtime, abi over napi, then by specificity.
    return function(a, b) {
        if (a.runtime !== b.runtime) {
            return a.runtime === runtime ? -1 : 1;
        } else if (a.abi !== b.abi) {
            return a.abi ? -1 : 1;
        } else if (a.specificity !== b.specificity) {
            return a.specificity > b.specificity ? -1 : 1;
        } else {
            return 0;
        }
    };
}
function isNwjs() {
    return !!(process.versions && process.versions.nw);
}
function isElectron() {
    if (process.versions && process.versions.electron) return true;
    if (process.env.ELECTRON_RUN_AS_NODE) return true;
    return ("TURBOPACK compile-time value", "undefined") !== 'undefined' && window.process && window.process.type === 'renderer';
}
function isAlpine(platform) {
    return platform === 'linux' && fs.existsSync('/etc/alpine-release');
}
// Exposed for unit tests
// TODO: move to lib
load.parseTags = parseTags;
load.matchTags = matchTags;
load.compareTags = compareTags;
load.parseTuple = parseTuple;
load.matchTuple = matchTuple;
load.compareTuples = compareTuples;
}),
"[project]/node_modules/node-gyp-build/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const runtimeRequire = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : /*TURBOPACK member replacement*/ __turbopack_context__.t // eslint-disable-line
;
if (typeof runtimeRequire.addon === 'function') {
    module.exports = runtimeRequire.addon.bind(runtimeRequire);
} else {
    module.exports = __turbopack_context__.r("[project]/node_modules/node-gyp-build/node-gyp-build.js [app-ssr] (ecmascript)");
}
}),
"[project]/node_modules/bufferutil/fallback.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */ const mask = (source, mask, output, offset, length)=>{
    for(var i = 0; i < length; i++){
        output[offset + i] = source[i] ^ mask[i & 3];
    }
};
/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */ const unmask = (buffer, mask)=>{
    // Required until https://github.com/nodejs/node/issues/9006 is resolved.
    const length = buffer.length;
    for(var i = 0; i < length; i++){
        buffer[i] ^= mask[i & 3];
    }
};
module.exports = {
    mask,
    unmask
};
}),
"[project]/node_modules/bufferutil/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

try {
    module.exports = __turbopack_context__.r("[project]/node_modules/node-gyp-build/index.js [app-ssr] (ecmascript)")(("TURBOPACK compile-time value", "/ROOT/node_modules/bufferutil"));
} catch (e) {
    module.exports = __turbopack_context__.r("[project]/node_modules/bufferutil/fallback.js [app-ssr] (ecmascript)");
}
}),
"[project]/node_modules/utf-8-validate/fallback.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Checks if a given buffer contains only correct UTF-8.
 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
 * Markus Kuhn.
 *
 * @param {Buffer} buf The buffer to check
 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
 * @public
 */ function isValidUTF8(buf) {
    const len = buf.length;
    let i = 0;
    while(i < len){
        if ((buf[i] & 0x80) === 0x00) {
            i++;
        } else if ((buf[i] & 0xe0) === 0xc0) {
            if (i + 1 === len || (buf[i + 1] & 0xc0) !== 0x80 || (buf[i] & 0xfe) === 0xc0 // overlong
            ) {
                return false;
            }
            i += 2;
        } else if ((buf[i] & 0xf0) === 0xe0) {
            if (i + 2 >= len || (buf[i + 1] & 0xc0) !== 0x80 || (buf[i + 2] & 0xc0) !== 0x80 || buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80 || // overlong
            buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0 // surrogate (U+D800 - U+DFFF)
            ) {
                return false;
            }
            i += 3;
        } else if ((buf[i] & 0xf8) === 0xf0) {
            if (i + 3 >= len || (buf[i + 1] & 0xc0) !== 0x80 || (buf[i + 2] & 0xc0) !== 0x80 || (buf[i + 3] & 0xc0) !== 0x80 || buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80 || // overlong
            buf[i] === 0xf4 && buf[i + 1] > 0x8f || buf[i] > 0xf4 // > U+10FFFF
            ) {
                return false;
            }
            i += 4;
        } else {
            return false;
        }
    }
    return true;
}
module.exports = isValidUTF8;
}),
"[project]/node_modules/utf-8-validate/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

try {
    module.exports = __turbopack_context__.r("[project]/node_modules/node-gyp-build/index.js [app-ssr] (ecmascript)")(("TURBOPACK compile-time value", "/ROOT/node_modules/utf-8-validate"));
} catch (e) {
    module.exports = __turbopack_context__.r("[project]/node_modules/utf-8-validate/fallback.js [app-ssr] (ecmascript)");
}
}),
"[project]/node_modules/aes-js/lib.commonjs/aes.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*! MIT License. Copyright 2015-2022 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */ var __classPrivateFieldGet = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _AES_key, _AES_Kd, _AES_Ke;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AES = void 0;
// Number of rounds by keysize
const numberOfRounds = {
    16: 10,
    24: 12,
    32: 14
};
// Round constant words
const rcon = [
    0x01,
    0x02,
    0x04,
    0x08,
    0x10,
    0x20,
    0x40,
    0x80,
    0x1b,
    0x36,
    0x6c,
    0xd8,
    0xab,
    0x4d,
    0x9a,
    0x2f,
    0x5e,
    0xbc,
    0x63,
    0xc6,
    0x97,
    0x35,
    0x6a,
    0xd4,
    0xb3,
    0x7d,
    0xfa,
    0xef,
    0xc5,
    0x91
];
// S-box and Inverse S-box (S is for Substitution)
const S = [
    0x63,
    0x7c,
    0x77,
    0x7b,
    0xf2,
    0x6b,
    0x6f,
    0xc5,
    0x30,
    0x01,
    0x67,
    0x2b,
    0xfe,
    0xd7,
    0xab,
    0x76,
    0xca,
    0x82,
    0xc9,
    0x7d,
    0xfa,
    0x59,
    0x47,
    0xf0,
    0xad,
    0xd4,
    0xa2,
    0xaf,
    0x9c,
    0xa4,
    0x72,
    0xc0,
    0xb7,
    0xfd,
    0x93,
    0x26,
    0x36,
    0x3f,
    0xf7,
    0xcc,
    0x34,
    0xa5,
    0xe5,
    0xf1,
    0x71,
    0xd8,
    0x31,
    0x15,
    0x04,
    0xc7,
    0x23,
    0xc3,
    0x18,
    0x96,
    0x05,
    0x9a,
    0x07,
    0x12,
    0x80,
    0xe2,
    0xeb,
    0x27,
    0xb2,
    0x75,
    0x09,
    0x83,
    0x2c,
    0x1a,
    0x1b,
    0x6e,
    0x5a,
    0xa0,
    0x52,
    0x3b,
    0xd6,
    0xb3,
    0x29,
    0xe3,
    0x2f,
    0x84,
    0x53,
    0xd1,
    0x00,
    0xed,
    0x20,
    0xfc,
    0xb1,
    0x5b,
    0x6a,
    0xcb,
    0xbe,
    0x39,
    0x4a,
    0x4c,
    0x58,
    0xcf,
    0xd0,
    0xef,
    0xaa,
    0xfb,
    0x43,
    0x4d,
    0x33,
    0x85,
    0x45,
    0xf9,
    0x02,
    0x7f,
    0x50,
    0x3c,
    0x9f,
    0xa8,
    0x51,
    0xa3,
    0x40,
    0x8f,
    0x92,
    0x9d,
    0x38,
    0xf5,
    0xbc,
    0xb6,
    0xda,
    0x21,
    0x10,
    0xff,
    0xf3,
    0xd2,
    0xcd,
    0x0c,
    0x13,
    0xec,
    0x5f,
    0x97,
    0x44,
    0x17,
    0xc4,
    0xa7,
    0x7e,
    0x3d,
    0x64,
    0x5d,
    0x19,
    0x73,
    0x60,
    0x81,
    0x4f,
    0xdc,
    0x22,
    0x2a,
    0x90,
    0x88,
    0x46,
    0xee,
    0xb8,
    0x14,
    0xde,
    0x5e,
    0x0b,
    0xdb,
    0xe0,
    0x32,
    0x3a,
    0x0a,
    0x49,
    0x06,
    0x24,
    0x5c,
    0xc2,
    0xd3,
    0xac,
    0x62,
    0x91,
    0x95,
    0xe4,
    0x79,
    0xe7,
    0xc8,
    0x37,
    0x6d,
    0x8d,
    0xd5,
    0x4e,
    0xa9,
    0x6c,
    0x56,
    0xf4,
    0xea,
    0x65,
    0x7a,
    0xae,
    0x08,
    0xba,
    0x78,
    0x25,
    0x2e,
    0x1c,
    0xa6,
    0xb4,
    0xc6,
    0xe8,
    0xdd,
    0x74,
    0x1f,
    0x4b,
    0xbd,
    0x8b,
    0x8a,
    0x70,
    0x3e,
    0xb5,
    0x66,
    0x48,
    0x03,
    0xf6,
    0x0e,
    0x61,
    0x35,
    0x57,
    0xb9,
    0x86,
    0xc1,
    0x1d,
    0x9e,
    0xe1,
    0xf8,
    0x98,
    0x11,
    0x69,
    0xd9,
    0x8e,
    0x94,
    0x9b,
    0x1e,
    0x87,
    0xe9,
    0xce,
    0x55,
    0x28,
    0xdf,
    0x8c,
    0xa1,
    0x89,
    0x0d,
    0xbf,
    0xe6,
    0x42,
    0x68,
    0x41,
    0x99,
    0x2d,
    0x0f,
    0xb0,
    0x54,
    0xbb,
    0x16
];
const Si = [
    0x52,
    0x09,
    0x6a,
    0xd5,
    0x30,
    0x36,
    0xa5,
    0x38,
    0xbf,
    0x40,
    0xa3,
    0x9e,
    0x81,
    0xf3,
    0xd7,
    0xfb,
    0x7c,
    0xe3,
    0x39,
    0x82,
    0x9b,
    0x2f,
    0xff,
    0x87,
    0x34,
    0x8e,
    0x43,
    0x44,
    0xc4,
    0xde,
    0xe9,
    0xcb,
    0x54,
    0x7b,
    0x94,
    0x32,
    0xa6,
    0xc2,
    0x23,
    0x3d,
    0xee,
    0x4c,
    0x95,
    0x0b,
    0x42,
    0xfa,
    0xc3,
    0x4e,
    0x08,
    0x2e,
    0xa1,
    0x66,
    0x28,
    0xd9,
    0x24,
    0xb2,
    0x76,
    0x5b,
    0xa2,
    0x49,
    0x6d,
    0x8b,
    0xd1,
    0x25,
    0x72,
    0xf8,
    0xf6,
    0x64,
    0x86,
    0x68,
    0x98,
    0x16,
    0xd4,
    0xa4,
    0x5c,
    0xcc,
    0x5d,
    0x65,
    0xb6,
    0x92,
    0x6c,
    0x70,
    0x48,
    0x50,
    0xfd,
    0xed,
    0xb9,
    0xda,
    0x5e,
    0x15,
    0x46,
    0x57,
    0xa7,
    0x8d,
    0x9d,
    0x84,
    0x90,
    0xd8,
    0xab,
    0x00,
    0x8c,
    0xbc,
    0xd3,
    0x0a,
    0xf7,
    0xe4,
    0x58,
    0x05,
    0xb8,
    0xb3,
    0x45,
    0x06,
    0xd0,
    0x2c,
    0x1e,
    0x8f,
    0xca,
    0x3f,
    0x0f,
    0x02,
    0xc1,
    0xaf,
    0xbd,
    0x03,
    0x01,
    0x13,
    0x8a,
    0x6b,
    0x3a,
    0x91,
    0x11,
    0x41,
    0x4f,
    0x67,
    0xdc,
    0xea,
    0x97,
    0xf2,
    0xcf,
    0xce,
    0xf0,
    0xb4,
    0xe6,
    0x73,
    0x96,
    0xac,
    0x74,
    0x22,
    0xe7,
    0xad,
    0x35,
    0x85,
    0xe2,
    0xf9,
    0x37,
    0xe8,
    0x1c,
    0x75,
    0xdf,
    0x6e,
    0x47,
    0xf1,
    0x1a,
    0x71,
    0x1d,
    0x29,
    0xc5,
    0x89,
    0x6f,
    0xb7,
    0x62,
    0x0e,
    0xaa,
    0x18,
    0xbe,
    0x1b,
    0xfc,
    0x56,
    0x3e,
    0x4b,
    0xc6,
    0xd2,
    0x79,
    0x20,
    0x9a,
    0xdb,
    0xc0,
    0xfe,
    0x78,
    0xcd,
    0x5a,
    0xf4,
    0x1f,
    0xdd,
    0xa8,
    0x33,
    0x88,
    0x07,
    0xc7,
    0x31,
    0xb1,
    0x12,
    0x10,
    0x59,
    0x27,
    0x80,
    0xec,
    0x5f,
    0x60,
    0x51,
    0x7f,
    0xa9,
    0x19,
    0xb5,
    0x4a,
    0x0d,
    0x2d,
    0xe5,
    0x7a,
    0x9f,
    0x93,
    0xc9,
    0x9c,
    0xef,
    0xa0,
    0xe0,
    0x3b,
    0x4d,
    0xae,
    0x2a,
    0xf5,
    0xb0,
    0xc8,
    0xeb,
    0xbb,
    0x3c,
    0x83,
    0x53,
    0x99,
    0x61,
    0x17,
    0x2b,
    0x04,
    0x7e,
    0xba,
    0x77,
    0xd6,
    0x26,
    0xe1,
    0x69,
    0x14,
    0x63,
    0x55,
    0x21,
    0x0c,
    0x7d
];
// Transformations for encryption
const T1 = [
    0xc66363a5,
    0xf87c7c84,
    0xee777799,
    0xf67b7b8d,
    0xfff2f20d,
    0xd66b6bbd,
    0xde6f6fb1,
    0x91c5c554,
    0x60303050,
    0x02010103,
    0xce6767a9,
    0x562b2b7d,
    0xe7fefe19,
    0xb5d7d762,
    0x4dababe6,
    0xec76769a,
    0x8fcaca45,
    0x1f82829d,
    0x89c9c940,
    0xfa7d7d87,
    0xeffafa15,
    0xb25959eb,
    0x8e4747c9,
    0xfbf0f00b,
    0x41adadec,
    0xb3d4d467,
    0x5fa2a2fd,
    0x45afafea,
    0x239c9cbf,
    0x53a4a4f7,
    0xe4727296,
    0x9bc0c05b,
    0x75b7b7c2,
    0xe1fdfd1c,
    0x3d9393ae,
    0x4c26266a,
    0x6c36365a,
    0x7e3f3f41,
    0xf5f7f702,
    0x83cccc4f,
    0x6834345c,
    0x51a5a5f4,
    0xd1e5e534,
    0xf9f1f108,
    0xe2717193,
    0xabd8d873,
    0x62313153,
    0x2a15153f,
    0x0804040c,
    0x95c7c752,
    0x46232365,
    0x9dc3c35e,
    0x30181828,
    0x379696a1,
    0x0a05050f,
    0x2f9a9ab5,
    0x0e070709,
    0x24121236,
    0x1b80809b,
    0xdfe2e23d,
    0xcdebeb26,
    0x4e272769,
    0x7fb2b2cd,
    0xea75759f,
    0x1209091b,
    0x1d83839e,
    0x582c2c74,
    0x341a1a2e,
    0x361b1b2d,
    0xdc6e6eb2,
    0xb45a5aee,
    0x5ba0a0fb,
    0xa45252f6,
    0x763b3b4d,
    0xb7d6d661,
    0x7db3b3ce,
    0x5229297b,
    0xdde3e33e,
    0x5e2f2f71,
    0x13848497,
    0xa65353f5,
    0xb9d1d168,
    0x00000000,
    0xc1eded2c,
    0x40202060,
    0xe3fcfc1f,
    0x79b1b1c8,
    0xb65b5bed,
    0xd46a6abe,
    0x8dcbcb46,
    0x67bebed9,
    0x7239394b,
    0x944a4ade,
    0x984c4cd4,
    0xb05858e8,
    0x85cfcf4a,
    0xbbd0d06b,
    0xc5efef2a,
    0x4faaaae5,
    0xedfbfb16,
    0x864343c5,
    0x9a4d4dd7,
    0x66333355,
    0x11858594,
    0x8a4545cf,
    0xe9f9f910,
    0x04020206,
    0xfe7f7f81,
    0xa05050f0,
    0x783c3c44,
    0x259f9fba,
    0x4ba8a8e3,
    0xa25151f3,
    0x5da3a3fe,
    0x804040c0,
    0x058f8f8a,
    0x3f9292ad,
    0x219d9dbc,
    0x70383848,
    0xf1f5f504,
    0x63bcbcdf,
    0x77b6b6c1,
    0xafdada75,
    0x42212163,
    0x20101030,
    0xe5ffff1a,
    0xfdf3f30e,
    0xbfd2d26d,
    0x81cdcd4c,
    0x180c0c14,
    0x26131335,
    0xc3ecec2f,
    0xbe5f5fe1,
    0x359797a2,
    0x884444cc,
    0x2e171739,
    0x93c4c457,
    0x55a7a7f2,
    0xfc7e7e82,
    0x7a3d3d47,
    0xc86464ac,
    0xba5d5de7,
    0x3219192b,
    0xe6737395,
    0xc06060a0,
    0x19818198,
    0x9e4f4fd1,
    0xa3dcdc7f,
    0x44222266,
    0x542a2a7e,
    0x3b9090ab,
    0x0b888883,
    0x8c4646ca,
    0xc7eeee29,
    0x6bb8b8d3,
    0x2814143c,
    0xa7dede79,
    0xbc5e5ee2,
    0x160b0b1d,
    0xaddbdb76,
    0xdbe0e03b,
    0x64323256,
    0x743a3a4e,
    0x140a0a1e,
    0x924949db,
    0x0c06060a,
    0x4824246c,
    0xb85c5ce4,
    0x9fc2c25d,
    0xbdd3d36e,
    0x43acacef,
    0xc46262a6,
    0x399191a8,
    0x319595a4,
    0xd3e4e437,
    0xf279798b,
    0xd5e7e732,
    0x8bc8c843,
    0x6e373759,
    0xda6d6db7,
    0x018d8d8c,
    0xb1d5d564,
    0x9c4e4ed2,
    0x49a9a9e0,
    0xd86c6cb4,
    0xac5656fa,
    0xf3f4f407,
    0xcfeaea25,
    0xca6565af,
    0xf47a7a8e,
    0x47aeaee9,
    0x10080818,
    0x6fbabad5,
    0xf0787888,
    0x4a25256f,
    0x5c2e2e72,
    0x381c1c24,
    0x57a6a6f1,
    0x73b4b4c7,
    0x97c6c651,
    0xcbe8e823,
    0xa1dddd7c,
    0xe874749c,
    0x3e1f1f21,
    0x964b4bdd,
    0x61bdbddc,
    0x0d8b8b86,
    0x0f8a8a85,
    0xe0707090,
    0x7c3e3e42,
    0x71b5b5c4,
    0xcc6666aa,
    0x904848d8,
    0x06030305,
    0xf7f6f601,
    0x1c0e0e12,
    0xc26161a3,
    0x6a35355f,
    0xae5757f9,
    0x69b9b9d0,
    0x17868691,
    0x99c1c158,
    0x3a1d1d27,
    0x279e9eb9,
    0xd9e1e138,
    0xebf8f813,
    0x2b9898b3,
    0x22111133,
    0xd26969bb,
    0xa9d9d970,
    0x078e8e89,
    0x339494a7,
    0x2d9b9bb6,
    0x3c1e1e22,
    0x15878792,
    0xc9e9e920,
    0x87cece49,
    0xaa5555ff,
    0x50282878,
    0xa5dfdf7a,
    0x038c8c8f,
    0x59a1a1f8,
    0x09898980,
    0x1a0d0d17,
    0x65bfbfda,
    0xd7e6e631,
    0x844242c6,
    0xd06868b8,
    0x824141c3,
    0x299999b0,
    0x5a2d2d77,
    0x1e0f0f11,
    0x7bb0b0cb,
    0xa85454fc,
    0x6dbbbbd6,
    0x2c16163a
];
const T2 = [
    0xa5c66363,
    0x84f87c7c,
    0x99ee7777,
    0x8df67b7b,
    0x0dfff2f2,
    0xbdd66b6b,
    0xb1de6f6f,
    0x5491c5c5,
    0x50603030,
    0x03020101,
    0xa9ce6767,
    0x7d562b2b,
    0x19e7fefe,
    0x62b5d7d7,
    0xe64dabab,
    0x9aec7676,
    0x458fcaca,
    0x9d1f8282,
    0x4089c9c9,
    0x87fa7d7d,
    0x15effafa,
    0xebb25959,
    0xc98e4747,
    0x0bfbf0f0,
    0xec41adad,
    0x67b3d4d4,
    0xfd5fa2a2,
    0xea45afaf,
    0xbf239c9c,
    0xf753a4a4,
    0x96e47272,
    0x5b9bc0c0,
    0xc275b7b7,
    0x1ce1fdfd,
    0xae3d9393,
    0x6a4c2626,
    0x5a6c3636,
    0x417e3f3f,
    0x02f5f7f7,
    0x4f83cccc,
    0x5c683434,
    0xf451a5a5,
    0x34d1e5e5,
    0x08f9f1f1,
    0x93e27171,
    0x73abd8d8,
    0x53623131,
    0x3f2a1515,
    0x0c080404,
    0x5295c7c7,
    0x65462323,
    0x5e9dc3c3,
    0x28301818,
    0xa1379696,
    0x0f0a0505,
    0xb52f9a9a,
    0x090e0707,
    0x36241212,
    0x9b1b8080,
    0x3ddfe2e2,
    0x26cdebeb,
    0x694e2727,
    0xcd7fb2b2,
    0x9fea7575,
    0x1b120909,
    0x9e1d8383,
    0x74582c2c,
    0x2e341a1a,
    0x2d361b1b,
    0xb2dc6e6e,
    0xeeb45a5a,
    0xfb5ba0a0,
    0xf6a45252,
    0x4d763b3b,
    0x61b7d6d6,
    0xce7db3b3,
    0x7b522929,
    0x3edde3e3,
    0x715e2f2f,
    0x97138484,
    0xf5a65353,
    0x68b9d1d1,
    0x00000000,
    0x2cc1eded,
    0x60402020,
    0x1fe3fcfc,
    0xc879b1b1,
    0xedb65b5b,
    0xbed46a6a,
    0x468dcbcb,
    0xd967bebe,
    0x4b723939,
    0xde944a4a,
    0xd4984c4c,
    0xe8b05858,
    0x4a85cfcf,
    0x6bbbd0d0,
    0x2ac5efef,
    0xe54faaaa,
    0x16edfbfb,
    0xc5864343,
    0xd79a4d4d,
    0x55663333,
    0x94118585,
    0xcf8a4545,
    0x10e9f9f9,
    0x06040202,
    0x81fe7f7f,
    0xf0a05050,
    0x44783c3c,
    0xba259f9f,
    0xe34ba8a8,
    0xf3a25151,
    0xfe5da3a3,
    0xc0804040,
    0x8a058f8f,
    0xad3f9292,
    0xbc219d9d,
    0x48703838,
    0x04f1f5f5,
    0xdf63bcbc,
    0xc177b6b6,
    0x75afdada,
    0x63422121,
    0x30201010,
    0x1ae5ffff,
    0x0efdf3f3,
    0x6dbfd2d2,
    0x4c81cdcd,
    0x14180c0c,
    0x35261313,
    0x2fc3ecec,
    0xe1be5f5f,
    0xa2359797,
    0xcc884444,
    0x392e1717,
    0x5793c4c4,
    0xf255a7a7,
    0x82fc7e7e,
    0x477a3d3d,
    0xacc86464,
    0xe7ba5d5d,
    0x2b321919,
    0x95e67373,
    0xa0c06060,
    0x98198181,
    0xd19e4f4f,
    0x7fa3dcdc,
    0x66442222,
    0x7e542a2a,
    0xab3b9090,
    0x830b8888,
    0xca8c4646,
    0x29c7eeee,
    0xd36bb8b8,
    0x3c281414,
    0x79a7dede,
    0xe2bc5e5e,
    0x1d160b0b,
    0x76addbdb,
    0x3bdbe0e0,
    0x56643232,
    0x4e743a3a,
    0x1e140a0a,
    0xdb924949,
    0x0a0c0606,
    0x6c482424,
    0xe4b85c5c,
    0x5d9fc2c2,
    0x6ebdd3d3,
    0xef43acac,
    0xa6c46262,
    0xa8399191,
    0xa4319595,
    0x37d3e4e4,
    0x8bf27979,
    0x32d5e7e7,
    0x438bc8c8,
    0x596e3737,
    0xb7da6d6d,
    0x8c018d8d,
    0x64b1d5d5,
    0xd29c4e4e,
    0xe049a9a9,
    0xb4d86c6c,
    0xfaac5656,
    0x07f3f4f4,
    0x25cfeaea,
    0xafca6565,
    0x8ef47a7a,
    0xe947aeae,
    0x18100808,
    0xd56fbaba,
    0x88f07878,
    0x6f4a2525,
    0x725c2e2e,
    0x24381c1c,
    0xf157a6a6,
    0xc773b4b4,
    0x5197c6c6,
    0x23cbe8e8,
    0x7ca1dddd,
    0x9ce87474,
    0x213e1f1f,
    0xdd964b4b,
    0xdc61bdbd,
    0x860d8b8b,
    0x850f8a8a,
    0x90e07070,
    0x427c3e3e,
    0xc471b5b5,
    0xaacc6666,
    0xd8904848,
    0x05060303,
    0x01f7f6f6,
    0x121c0e0e,
    0xa3c26161,
    0x5f6a3535,
    0xf9ae5757,
    0xd069b9b9,
    0x91178686,
    0x5899c1c1,
    0x273a1d1d,
    0xb9279e9e,
    0x38d9e1e1,
    0x13ebf8f8,
    0xb32b9898,
    0x33221111,
    0xbbd26969,
    0x70a9d9d9,
    0x89078e8e,
    0xa7339494,
    0xb62d9b9b,
    0x223c1e1e,
    0x92158787,
    0x20c9e9e9,
    0x4987cece,
    0xffaa5555,
    0x78502828,
    0x7aa5dfdf,
    0x8f038c8c,
    0xf859a1a1,
    0x80098989,
    0x171a0d0d,
    0xda65bfbf,
    0x31d7e6e6,
    0xc6844242,
    0xb8d06868,
    0xc3824141,
    0xb0299999,
    0x775a2d2d,
    0x111e0f0f,
    0xcb7bb0b0,
    0xfca85454,
    0xd66dbbbb,
    0x3a2c1616
];
const T3 = [
    0x63a5c663,
    0x7c84f87c,
    0x7799ee77,
    0x7b8df67b,
    0xf20dfff2,
    0x6bbdd66b,
    0x6fb1de6f,
    0xc55491c5,
    0x30506030,
    0x01030201,
    0x67a9ce67,
    0x2b7d562b,
    0xfe19e7fe,
    0xd762b5d7,
    0xabe64dab,
    0x769aec76,
    0xca458fca,
    0x829d1f82,
    0xc94089c9,
    0x7d87fa7d,
    0xfa15effa,
    0x59ebb259,
    0x47c98e47,
    0xf00bfbf0,
    0xadec41ad,
    0xd467b3d4,
    0xa2fd5fa2,
    0xafea45af,
    0x9cbf239c,
    0xa4f753a4,
    0x7296e472,
    0xc05b9bc0,
    0xb7c275b7,
    0xfd1ce1fd,
    0x93ae3d93,
    0x266a4c26,
    0x365a6c36,
    0x3f417e3f,
    0xf702f5f7,
    0xcc4f83cc,
    0x345c6834,
    0xa5f451a5,
    0xe534d1e5,
    0xf108f9f1,
    0x7193e271,
    0xd873abd8,
    0x31536231,
    0x153f2a15,
    0x040c0804,
    0xc75295c7,
    0x23654623,
    0xc35e9dc3,
    0x18283018,
    0x96a13796,
    0x050f0a05,
    0x9ab52f9a,
    0x07090e07,
    0x12362412,
    0x809b1b80,
    0xe23ddfe2,
    0xeb26cdeb,
    0x27694e27,
    0xb2cd7fb2,
    0x759fea75,
    0x091b1209,
    0x839e1d83,
    0x2c74582c,
    0x1a2e341a,
    0x1b2d361b,
    0x6eb2dc6e,
    0x5aeeb45a,
    0xa0fb5ba0,
    0x52f6a452,
    0x3b4d763b,
    0xd661b7d6,
    0xb3ce7db3,
    0x297b5229,
    0xe33edde3,
    0x2f715e2f,
    0x84971384,
    0x53f5a653,
    0xd168b9d1,
    0x00000000,
    0xed2cc1ed,
    0x20604020,
    0xfc1fe3fc,
    0xb1c879b1,
    0x5bedb65b,
    0x6abed46a,
    0xcb468dcb,
    0xbed967be,
    0x394b7239,
    0x4ade944a,
    0x4cd4984c,
    0x58e8b058,
    0xcf4a85cf,
    0xd06bbbd0,
    0xef2ac5ef,
    0xaae54faa,
    0xfb16edfb,
    0x43c58643,
    0x4dd79a4d,
    0x33556633,
    0x85941185,
    0x45cf8a45,
    0xf910e9f9,
    0x02060402,
    0x7f81fe7f,
    0x50f0a050,
    0x3c44783c,
    0x9fba259f,
    0xa8e34ba8,
    0x51f3a251,
    0xa3fe5da3,
    0x40c08040,
    0x8f8a058f,
    0x92ad3f92,
    0x9dbc219d,
    0x38487038,
    0xf504f1f5,
    0xbcdf63bc,
    0xb6c177b6,
    0xda75afda,
    0x21634221,
    0x10302010,
    0xff1ae5ff,
    0xf30efdf3,
    0xd26dbfd2,
    0xcd4c81cd,
    0x0c14180c,
    0x13352613,
    0xec2fc3ec,
    0x5fe1be5f,
    0x97a23597,
    0x44cc8844,
    0x17392e17,
    0xc45793c4,
    0xa7f255a7,
    0x7e82fc7e,
    0x3d477a3d,
    0x64acc864,
    0x5de7ba5d,
    0x192b3219,
    0x7395e673,
    0x60a0c060,
    0x81981981,
    0x4fd19e4f,
    0xdc7fa3dc,
    0x22664422,
    0x2a7e542a,
    0x90ab3b90,
    0x88830b88,
    0x46ca8c46,
    0xee29c7ee,
    0xb8d36bb8,
    0x143c2814,
    0xde79a7de,
    0x5ee2bc5e,
    0x0b1d160b,
    0xdb76addb,
    0xe03bdbe0,
    0x32566432,
    0x3a4e743a,
    0x0a1e140a,
    0x49db9249,
    0x060a0c06,
    0x246c4824,
    0x5ce4b85c,
    0xc25d9fc2,
    0xd36ebdd3,
    0xacef43ac,
    0x62a6c462,
    0x91a83991,
    0x95a43195,
    0xe437d3e4,
    0x798bf279,
    0xe732d5e7,
    0xc8438bc8,
    0x37596e37,
    0x6db7da6d,
    0x8d8c018d,
    0xd564b1d5,
    0x4ed29c4e,
    0xa9e049a9,
    0x6cb4d86c,
    0x56faac56,
    0xf407f3f4,
    0xea25cfea,
    0x65afca65,
    0x7a8ef47a,
    0xaee947ae,
    0x08181008,
    0xbad56fba,
    0x7888f078,
    0x256f4a25,
    0x2e725c2e,
    0x1c24381c,
    0xa6f157a6,
    0xb4c773b4,
    0xc65197c6,
    0xe823cbe8,
    0xdd7ca1dd,
    0x749ce874,
    0x1f213e1f,
    0x4bdd964b,
    0xbddc61bd,
    0x8b860d8b,
    0x8a850f8a,
    0x7090e070,
    0x3e427c3e,
    0xb5c471b5,
    0x66aacc66,
    0x48d89048,
    0x03050603,
    0xf601f7f6,
    0x0e121c0e,
    0x61a3c261,
    0x355f6a35,
    0x57f9ae57,
    0xb9d069b9,
    0x86911786,
    0xc15899c1,
    0x1d273a1d,
    0x9eb9279e,
    0xe138d9e1,
    0xf813ebf8,
    0x98b32b98,
    0x11332211,
    0x69bbd269,
    0xd970a9d9,
    0x8e89078e,
    0x94a73394,
    0x9bb62d9b,
    0x1e223c1e,
    0x87921587,
    0xe920c9e9,
    0xce4987ce,
    0x55ffaa55,
    0x28785028,
    0xdf7aa5df,
    0x8c8f038c,
    0xa1f859a1,
    0x89800989,
    0x0d171a0d,
    0xbfda65bf,
    0xe631d7e6,
    0x42c68442,
    0x68b8d068,
    0x41c38241,
    0x99b02999,
    0x2d775a2d,
    0x0f111e0f,
    0xb0cb7bb0,
    0x54fca854,
    0xbbd66dbb,
    0x163a2c16
];
const T4 = [
    0x6363a5c6,
    0x7c7c84f8,
    0x777799ee,
    0x7b7b8df6,
    0xf2f20dff,
    0x6b6bbdd6,
    0x6f6fb1de,
    0xc5c55491,
    0x30305060,
    0x01010302,
    0x6767a9ce,
    0x2b2b7d56,
    0xfefe19e7,
    0xd7d762b5,
    0xababe64d,
    0x76769aec,
    0xcaca458f,
    0x82829d1f,
    0xc9c94089,
    0x7d7d87fa,
    0xfafa15ef,
    0x5959ebb2,
    0x4747c98e,
    0xf0f00bfb,
    0xadadec41,
    0xd4d467b3,
    0xa2a2fd5f,
    0xafafea45,
    0x9c9cbf23,
    0xa4a4f753,
    0x727296e4,
    0xc0c05b9b,
    0xb7b7c275,
    0xfdfd1ce1,
    0x9393ae3d,
    0x26266a4c,
    0x36365a6c,
    0x3f3f417e,
    0xf7f702f5,
    0xcccc4f83,
    0x34345c68,
    0xa5a5f451,
    0xe5e534d1,
    0xf1f108f9,
    0x717193e2,
    0xd8d873ab,
    0x31315362,
    0x15153f2a,
    0x04040c08,
    0xc7c75295,
    0x23236546,
    0xc3c35e9d,
    0x18182830,
    0x9696a137,
    0x05050f0a,
    0x9a9ab52f,
    0x0707090e,
    0x12123624,
    0x80809b1b,
    0xe2e23ddf,
    0xebeb26cd,
    0x2727694e,
    0xb2b2cd7f,
    0x75759fea,
    0x09091b12,
    0x83839e1d,
    0x2c2c7458,
    0x1a1a2e34,
    0x1b1b2d36,
    0x6e6eb2dc,
    0x5a5aeeb4,
    0xa0a0fb5b,
    0x5252f6a4,
    0x3b3b4d76,
    0xd6d661b7,
    0xb3b3ce7d,
    0x29297b52,
    0xe3e33edd,
    0x2f2f715e,
    0x84849713,
    0x5353f5a6,
    0xd1d168b9,
    0x00000000,
    0xeded2cc1,
    0x20206040,
    0xfcfc1fe3,
    0xb1b1c879,
    0x5b5bedb6,
    0x6a6abed4,
    0xcbcb468d,
    0xbebed967,
    0x39394b72,
    0x4a4ade94,
    0x4c4cd498,
    0x5858e8b0,
    0xcfcf4a85,
    0xd0d06bbb,
    0xefef2ac5,
    0xaaaae54f,
    0xfbfb16ed,
    0x4343c586,
    0x4d4dd79a,
    0x33335566,
    0x85859411,
    0x4545cf8a,
    0xf9f910e9,
    0x02020604,
    0x7f7f81fe,
    0x5050f0a0,
    0x3c3c4478,
    0x9f9fba25,
    0xa8a8e34b,
    0x5151f3a2,
    0xa3a3fe5d,
    0x4040c080,
    0x8f8f8a05,
    0x9292ad3f,
    0x9d9dbc21,
    0x38384870,
    0xf5f504f1,
    0xbcbcdf63,
    0xb6b6c177,
    0xdada75af,
    0x21216342,
    0x10103020,
    0xffff1ae5,
    0xf3f30efd,
    0xd2d26dbf,
    0xcdcd4c81,
    0x0c0c1418,
    0x13133526,
    0xecec2fc3,
    0x5f5fe1be,
    0x9797a235,
    0x4444cc88,
    0x1717392e,
    0xc4c45793,
    0xa7a7f255,
    0x7e7e82fc,
    0x3d3d477a,
    0x6464acc8,
    0x5d5de7ba,
    0x19192b32,
    0x737395e6,
    0x6060a0c0,
    0x81819819,
    0x4f4fd19e,
    0xdcdc7fa3,
    0x22226644,
    0x2a2a7e54,
    0x9090ab3b,
    0x8888830b,
    0x4646ca8c,
    0xeeee29c7,
    0xb8b8d36b,
    0x14143c28,
    0xdede79a7,
    0x5e5ee2bc,
    0x0b0b1d16,
    0xdbdb76ad,
    0xe0e03bdb,
    0x32325664,
    0x3a3a4e74,
    0x0a0a1e14,
    0x4949db92,
    0x06060a0c,
    0x24246c48,
    0x5c5ce4b8,
    0xc2c25d9f,
    0xd3d36ebd,
    0xacacef43,
    0x6262a6c4,
    0x9191a839,
    0x9595a431,
    0xe4e437d3,
    0x79798bf2,
    0xe7e732d5,
    0xc8c8438b,
    0x3737596e,
    0x6d6db7da,
    0x8d8d8c01,
    0xd5d564b1,
    0x4e4ed29c,
    0xa9a9e049,
    0x6c6cb4d8,
    0x5656faac,
    0xf4f407f3,
    0xeaea25cf,
    0x6565afca,
    0x7a7a8ef4,
    0xaeaee947,
    0x08081810,
    0xbabad56f,
    0x787888f0,
    0x25256f4a,
    0x2e2e725c,
    0x1c1c2438,
    0xa6a6f157,
    0xb4b4c773,
    0xc6c65197,
    0xe8e823cb,
    0xdddd7ca1,
    0x74749ce8,
    0x1f1f213e,
    0x4b4bdd96,
    0xbdbddc61,
    0x8b8b860d,
    0x8a8a850f,
    0x707090e0,
    0x3e3e427c,
    0xb5b5c471,
    0x6666aacc,
    0x4848d890,
    0x03030506,
    0xf6f601f7,
    0x0e0e121c,
    0x6161a3c2,
    0x35355f6a,
    0x5757f9ae,
    0xb9b9d069,
    0x86869117,
    0xc1c15899,
    0x1d1d273a,
    0x9e9eb927,
    0xe1e138d9,
    0xf8f813eb,
    0x9898b32b,
    0x11113322,
    0x6969bbd2,
    0xd9d970a9,
    0x8e8e8907,
    0x9494a733,
    0x9b9bb62d,
    0x1e1e223c,
    0x87879215,
    0xe9e920c9,
    0xcece4987,
    0x5555ffaa,
    0x28287850,
    0xdfdf7aa5,
    0x8c8c8f03,
    0xa1a1f859,
    0x89898009,
    0x0d0d171a,
    0xbfbfda65,
    0xe6e631d7,
    0x4242c684,
    0x6868b8d0,
    0x4141c382,
    0x9999b029,
    0x2d2d775a,
    0x0f0f111e,
    0xb0b0cb7b,
    0x5454fca8,
    0xbbbbd66d,
    0x16163a2c
];
// Transformations for decryption
const T5 = [
    0x51f4a750,
    0x7e416553,
    0x1a17a4c3,
    0x3a275e96,
    0x3bab6bcb,
    0x1f9d45f1,
    0xacfa58ab,
    0x4be30393,
    0x2030fa55,
    0xad766df6,
    0x88cc7691,
    0xf5024c25,
    0x4fe5d7fc,
    0xc52acbd7,
    0x26354480,
    0xb562a38f,
    0xdeb15a49,
    0x25ba1b67,
    0x45ea0e98,
    0x5dfec0e1,
    0xc32f7502,
    0x814cf012,
    0x8d4697a3,
    0x6bd3f9c6,
    0x038f5fe7,
    0x15929c95,
    0xbf6d7aeb,
    0x955259da,
    0xd4be832d,
    0x587421d3,
    0x49e06929,
    0x8ec9c844,
    0x75c2896a,
    0xf48e7978,
    0x99583e6b,
    0x27b971dd,
    0xbee14fb6,
    0xf088ad17,
    0xc920ac66,
    0x7dce3ab4,
    0x63df4a18,
    0xe51a3182,
    0x97513360,
    0x62537f45,
    0xb16477e0,
    0xbb6bae84,
    0xfe81a01c,
    0xf9082b94,
    0x70486858,
    0x8f45fd19,
    0x94de6c87,
    0x527bf8b7,
    0xab73d323,
    0x724b02e2,
    0xe31f8f57,
    0x6655ab2a,
    0xb2eb2807,
    0x2fb5c203,
    0x86c57b9a,
    0xd33708a5,
    0x302887f2,
    0x23bfa5b2,
    0x02036aba,
    0xed16825c,
    0x8acf1c2b,
    0xa779b492,
    0xf307f2f0,
    0x4e69e2a1,
    0x65daf4cd,
    0x0605bed5,
    0xd134621f,
    0xc4a6fe8a,
    0x342e539d,
    0xa2f355a0,
    0x058ae132,
    0xa4f6eb75,
    0x0b83ec39,
    0x4060efaa,
    0x5e719f06,
    0xbd6e1051,
    0x3e218af9,
    0x96dd063d,
    0xdd3e05ae,
    0x4de6bd46,
    0x91548db5,
    0x71c45d05,
    0x0406d46f,
    0x605015ff,
    0x1998fb24,
    0xd6bde997,
    0x894043cc,
    0x67d99e77,
    0xb0e842bd,
    0x07898b88,
    0xe7195b38,
    0x79c8eedb,
    0xa17c0a47,
    0x7c420fe9,
    0xf8841ec9,
    0x00000000,
    0x09808683,
    0x322bed48,
    0x1e1170ac,
    0x6c5a724e,
    0xfd0efffb,
    0x0f853856,
    0x3daed51e,
    0x362d3927,
    0x0a0fd964,
    0x685ca621,
    0x9b5b54d1,
    0x24362e3a,
    0x0c0a67b1,
    0x9357e70f,
    0xb4ee96d2,
    0x1b9b919e,
    0x80c0c54f,
    0x61dc20a2,
    0x5a774b69,
    0x1c121a16,
    0xe293ba0a,
    0xc0a02ae5,
    0x3c22e043,
    0x121b171d,
    0x0e090d0b,
    0xf28bc7ad,
    0x2db6a8b9,
    0x141ea9c8,
    0x57f11985,
    0xaf75074c,
    0xee99ddbb,
    0xa37f60fd,
    0xf701269f,
    0x5c72f5bc,
    0x44663bc5,
    0x5bfb7e34,
    0x8b432976,
    0xcb23c6dc,
    0xb6edfc68,
    0xb8e4f163,
    0xd731dcca,
    0x42638510,
    0x13972240,
    0x84c61120,
    0x854a247d,
    0xd2bb3df8,
    0xaef93211,
    0xc729a16d,
    0x1d9e2f4b,
    0xdcb230f3,
    0x0d8652ec,
    0x77c1e3d0,
    0x2bb3166c,
    0xa970b999,
    0x119448fa,
    0x47e96422,
    0xa8fc8cc4,
    0xa0f03f1a,
    0x567d2cd8,
    0x223390ef,
    0x87494ec7,
    0xd938d1c1,
    0x8ccaa2fe,
    0x98d40b36,
    0xa6f581cf,
    0xa57ade28,
    0xdab78e26,
    0x3fadbfa4,
    0x2c3a9de4,
    0x5078920d,
    0x6a5fcc9b,
    0x547e4662,
    0xf68d13c2,
    0x90d8b8e8,
    0x2e39f75e,
    0x82c3aff5,
    0x9f5d80be,
    0x69d0937c,
    0x6fd52da9,
    0xcf2512b3,
    0xc8ac993b,
    0x10187da7,
    0xe89c636e,
    0xdb3bbb7b,
    0xcd267809,
    0x6e5918f4,
    0xec9ab701,
    0x834f9aa8,
    0xe6956e65,
    0xaaffe67e,
    0x21bccf08,
    0xef15e8e6,
    0xbae79bd9,
    0x4a6f36ce,
    0xea9f09d4,
    0x29b07cd6,
    0x31a4b2af,
    0x2a3f2331,
    0xc6a59430,
    0x35a266c0,
    0x744ebc37,
    0xfc82caa6,
    0xe090d0b0,
    0x33a7d815,
    0xf104984a,
    0x41ecdaf7,
    0x7fcd500e,
    0x1791f62f,
    0x764dd68d,
    0x43efb04d,
    0xccaa4d54,
    0xe49604df,
    0x9ed1b5e3,
    0x4c6a881b,
    0xc12c1fb8,
    0x4665517f,
    0x9d5eea04,
    0x018c355d,
    0xfa877473,
    0xfb0b412e,
    0xb3671d5a,
    0x92dbd252,
    0xe9105633,
    0x6dd64713,
    0x9ad7618c,
    0x37a10c7a,
    0x59f8148e,
    0xeb133c89,
    0xcea927ee,
    0xb761c935,
    0xe11ce5ed,
    0x7a47b13c,
    0x9cd2df59,
    0x55f2733f,
    0x1814ce79,
    0x73c737bf,
    0x53f7cdea,
    0x5ffdaa5b,
    0xdf3d6f14,
    0x7844db86,
    0xcaaff381,
    0xb968c43e,
    0x3824342c,
    0xc2a3405f,
    0x161dc372,
    0xbce2250c,
    0x283c498b,
    0xff0d9541,
    0x39a80171,
    0x080cb3de,
    0xd8b4e49c,
    0x6456c190,
    0x7bcb8461,
    0xd532b670,
    0x486c5c74,
    0xd0b85742
];
const T6 = [
    0x5051f4a7,
    0x537e4165,
    0xc31a17a4,
    0x963a275e,
    0xcb3bab6b,
    0xf11f9d45,
    0xabacfa58,
    0x934be303,
    0x552030fa,
    0xf6ad766d,
    0x9188cc76,
    0x25f5024c,
    0xfc4fe5d7,
    0xd7c52acb,
    0x80263544,
    0x8fb562a3,
    0x49deb15a,
    0x6725ba1b,
    0x9845ea0e,
    0xe15dfec0,
    0x02c32f75,
    0x12814cf0,
    0xa38d4697,
    0xc66bd3f9,
    0xe7038f5f,
    0x9515929c,
    0xebbf6d7a,
    0xda955259,
    0x2dd4be83,
    0xd3587421,
    0x2949e069,
    0x448ec9c8,
    0x6a75c289,
    0x78f48e79,
    0x6b99583e,
    0xdd27b971,
    0xb6bee14f,
    0x17f088ad,
    0x66c920ac,
    0xb47dce3a,
    0x1863df4a,
    0x82e51a31,
    0x60975133,
    0x4562537f,
    0xe0b16477,
    0x84bb6bae,
    0x1cfe81a0,
    0x94f9082b,
    0x58704868,
    0x198f45fd,
    0x8794de6c,
    0xb7527bf8,
    0x23ab73d3,
    0xe2724b02,
    0x57e31f8f,
    0x2a6655ab,
    0x07b2eb28,
    0x032fb5c2,
    0x9a86c57b,
    0xa5d33708,
    0xf2302887,
    0xb223bfa5,
    0xba02036a,
    0x5ced1682,
    0x2b8acf1c,
    0x92a779b4,
    0xf0f307f2,
    0xa14e69e2,
    0xcd65daf4,
    0xd50605be,
    0x1fd13462,
    0x8ac4a6fe,
    0x9d342e53,
    0xa0a2f355,
    0x32058ae1,
    0x75a4f6eb,
    0x390b83ec,
    0xaa4060ef,
    0x065e719f,
    0x51bd6e10,
    0xf93e218a,
    0x3d96dd06,
    0xaedd3e05,
    0x464de6bd,
    0xb591548d,
    0x0571c45d,
    0x6f0406d4,
    0xff605015,
    0x241998fb,
    0x97d6bde9,
    0xcc894043,
    0x7767d99e,
    0xbdb0e842,
    0x8807898b,
    0x38e7195b,
    0xdb79c8ee,
    0x47a17c0a,
    0xe97c420f,
    0xc9f8841e,
    0x00000000,
    0x83098086,
    0x48322bed,
    0xac1e1170,
    0x4e6c5a72,
    0xfbfd0eff,
    0x560f8538,
    0x1e3daed5,
    0x27362d39,
    0x640a0fd9,
    0x21685ca6,
    0xd19b5b54,
    0x3a24362e,
    0xb10c0a67,
    0x0f9357e7,
    0xd2b4ee96,
    0x9e1b9b91,
    0x4f80c0c5,
    0xa261dc20,
    0x695a774b,
    0x161c121a,
    0x0ae293ba,
    0xe5c0a02a,
    0x433c22e0,
    0x1d121b17,
    0x0b0e090d,
    0xadf28bc7,
    0xb92db6a8,
    0xc8141ea9,
    0x8557f119,
    0x4caf7507,
    0xbbee99dd,
    0xfda37f60,
    0x9ff70126,
    0xbc5c72f5,
    0xc544663b,
    0x345bfb7e,
    0x768b4329,
    0xdccb23c6,
    0x68b6edfc,
    0x63b8e4f1,
    0xcad731dc,
    0x10426385,
    0x40139722,
    0x2084c611,
    0x7d854a24,
    0xf8d2bb3d,
    0x11aef932,
    0x6dc729a1,
    0x4b1d9e2f,
    0xf3dcb230,
    0xec0d8652,
    0xd077c1e3,
    0x6c2bb316,
    0x99a970b9,
    0xfa119448,
    0x2247e964,
    0xc4a8fc8c,
    0x1aa0f03f,
    0xd8567d2c,
    0xef223390,
    0xc787494e,
    0xc1d938d1,
    0xfe8ccaa2,
    0x3698d40b,
    0xcfa6f581,
    0x28a57ade,
    0x26dab78e,
    0xa43fadbf,
    0xe42c3a9d,
    0x0d507892,
    0x9b6a5fcc,
    0x62547e46,
    0xc2f68d13,
    0xe890d8b8,
    0x5e2e39f7,
    0xf582c3af,
    0xbe9f5d80,
    0x7c69d093,
    0xa96fd52d,
    0xb3cf2512,
    0x3bc8ac99,
    0xa710187d,
    0x6ee89c63,
    0x7bdb3bbb,
    0x09cd2678,
    0xf46e5918,
    0x01ec9ab7,
    0xa8834f9a,
    0x65e6956e,
    0x7eaaffe6,
    0x0821bccf,
    0xe6ef15e8,
    0xd9bae79b,
    0xce4a6f36,
    0xd4ea9f09,
    0xd629b07c,
    0xaf31a4b2,
    0x312a3f23,
    0x30c6a594,
    0xc035a266,
    0x37744ebc,
    0xa6fc82ca,
    0xb0e090d0,
    0x1533a7d8,
    0x4af10498,
    0xf741ecda,
    0x0e7fcd50,
    0x2f1791f6,
    0x8d764dd6,
    0x4d43efb0,
    0x54ccaa4d,
    0xdfe49604,
    0xe39ed1b5,
    0x1b4c6a88,
    0xb8c12c1f,
    0x7f466551,
    0x049d5eea,
    0x5d018c35,
    0x73fa8774,
    0x2efb0b41,
    0x5ab3671d,
    0x5292dbd2,
    0x33e91056,
    0x136dd647,
    0x8c9ad761,
    0x7a37a10c,
    0x8e59f814,
    0x89eb133c,
    0xeecea927,
    0x35b761c9,
    0xede11ce5,
    0x3c7a47b1,
    0x599cd2df,
    0x3f55f273,
    0x791814ce,
    0xbf73c737,
    0xea53f7cd,
    0x5b5ffdaa,
    0x14df3d6f,
    0x867844db,
    0x81caaff3,
    0x3eb968c4,
    0x2c382434,
    0x5fc2a340,
    0x72161dc3,
    0x0cbce225,
    0x8b283c49,
    0x41ff0d95,
    0x7139a801,
    0xde080cb3,
    0x9cd8b4e4,
    0x906456c1,
    0x617bcb84,
    0x70d532b6,
    0x74486c5c,
    0x42d0b857
];
const T7 = [
    0xa75051f4,
    0x65537e41,
    0xa4c31a17,
    0x5e963a27,
    0x6bcb3bab,
    0x45f11f9d,
    0x58abacfa,
    0x03934be3,
    0xfa552030,
    0x6df6ad76,
    0x769188cc,
    0x4c25f502,
    0xd7fc4fe5,
    0xcbd7c52a,
    0x44802635,
    0xa38fb562,
    0x5a49deb1,
    0x1b6725ba,
    0x0e9845ea,
    0xc0e15dfe,
    0x7502c32f,
    0xf012814c,
    0x97a38d46,
    0xf9c66bd3,
    0x5fe7038f,
    0x9c951592,
    0x7aebbf6d,
    0x59da9552,
    0x832dd4be,
    0x21d35874,
    0x692949e0,
    0xc8448ec9,
    0x896a75c2,
    0x7978f48e,
    0x3e6b9958,
    0x71dd27b9,
    0x4fb6bee1,
    0xad17f088,
    0xac66c920,
    0x3ab47dce,
    0x4a1863df,
    0x3182e51a,
    0x33609751,
    0x7f456253,
    0x77e0b164,
    0xae84bb6b,
    0xa01cfe81,
    0x2b94f908,
    0x68587048,
    0xfd198f45,
    0x6c8794de,
    0xf8b7527b,
    0xd323ab73,
    0x02e2724b,
    0x8f57e31f,
    0xab2a6655,
    0x2807b2eb,
    0xc2032fb5,
    0x7b9a86c5,
    0x08a5d337,
    0x87f23028,
    0xa5b223bf,
    0x6aba0203,
    0x825ced16,
    0x1c2b8acf,
    0xb492a779,
    0xf2f0f307,
    0xe2a14e69,
    0xf4cd65da,
    0xbed50605,
    0x621fd134,
    0xfe8ac4a6,
    0x539d342e,
    0x55a0a2f3,
    0xe132058a,
    0xeb75a4f6,
    0xec390b83,
    0xefaa4060,
    0x9f065e71,
    0x1051bd6e,
    0x8af93e21,
    0x063d96dd,
    0x05aedd3e,
    0xbd464de6,
    0x8db59154,
    0x5d0571c4,
    0xd46f0406,
    0x15ff6050,
    0xfb241998,
    0xe997d6bd,
    0x43cc8940,
    0x9e7767d9,
    0x42bdb0e8,
    0x8b880789,
    0x5b38e719,
    0xeedb79c8,
    0x0a47a17c,
    0x0fe97c42,
    0x1ec9f884,
    0x00000000,
    0x86830980,
    0xed48322b,
    0x70ac1e11,
    0x724e6c5a,
    0xfffbfd0e,
    0x38560f85,
    0xd51e3dae,
    0x3927362d,
    0xd9640a0f,
    0xa621685c,
    0x54d19b5b,
    0x2e3a2436,
    0x67b10c0a,
    0xe70f9357,
    0x96d2b4ee,
    0x919e1b9b,
    0xc54f80c0,
    0x20a261dc,
    0x4b695a77,
    0x1a161c12,
    0xba0ae293,
    0x2ae5c0a0,
    0xe0433c22,
    0x171d121b,
    0x0d0b0e09,
    0xc7adf28b,
    0xa8b92db6,
    0xa9c8141e,
    0x198557f1,
    0x074caf75,
    0xddbbee99,
    0x60fda37f,
    0x269ff701,
    0xf5bc5c72,
    0x3bc54466,
    0x7e345bfb,
    0x29768b43,
    0xc6dccb23,
    0xfc68b6ed,
    0xf163b8e4,
    0xdccad731,
    0x85104263,
    0x22401397,
    0x112084c6,
    0x247d854a,
    0x3df8d2bb,
    0x3211aef9,
    0xa16dc729,
    0x2f4b1d9e,
    0x30f3dcb2,
    0x52ec0d86,
    0xe3d077c1,
    0x166c2bb3,
    0xb999a970,
    0x48fa1194,
    0x642247e9,
    0x8cc4a8fc,
    0x3f1aa0f0,
    0x2cd8567d,
    0x90ef2233,
    0x4ec78749,
    0xd1c1d938,
    0xa2fe8cca,
    0x0b3698d4,
    0x81cfa6f5,
    0xde28a57a,
    0x8e26dab7,
    0xbfa43fad,
    0x9de42c3a,
    0x920d5078,
    0xcc9b6a5f,
    0x4662547e,
    0x13c2f68d,
    0xb8e890d8,
    0xf75e2e39,
    0xaff582c3,
    0x80be9f5d,
    0x937c69d0,
    0x2da96fd5,
    0x12b3cf25,
    0x993bc8ac,
    0x7da71018,
    0x636ee89c,
    0xbb7bdb3b,
    0x7809cd26,
    0x18f46e59,
    0xb701ec9a,
    0x9aa8834f,
    0x6e65e695,
    0xe67eaaff,
    0xcf0821bc,
    0xe8e6ef15,
    0x9bd9bae7,
    0x36ce4a6f,
    0x09d4ea9f,
    0x7cd629b0,
    0xb2af31a4,
    0x23312a3f,
    0x9430c6a5,
    0x66c035a2,
    0xbc37744e,
    0xcaa6fc82,
    0xd0b0e090,
    0xd81533a7,
    0x984af104,
    0xdaf741ec,
    0x500e7fcd,
    0xf62f1791,
    0xd68d764d,
    0xb04d43ef,
    0x4d54ccaa,
    0x04dfe496,
    0xb5e39ed1,
    0x881b4c6a,
    0x1fb8c12c,
    0x517f4665,
    0xea049d5e,
    0x355d018c,
    0x7473fa87,
    0x412efb0b,
    0x1d5ab367,
    0xd25292db,
    0x5633e910,
    0x47136dd6,
    0x618c9ad7,
    0x0c7a37a1,
    0x148e59f8,
    0x3c89eb13,
    0x27eecea9,
    0xc935b761,
    0xe5ede11c,
    0xb13c7a47,
    0xdf599cd2,
    0x733f55f2,
    0xce791814,
    0x37bf73c7,
    0xcdea53f7,
    0xaa5b5ffd,
    0x6f14df3d,
    0xdb867844,
    0xf381caaf,
    0xc43eb968,
    0x342c3824,
    0x405fc2a3,
    0xc372161d,
    0x250cbce2,
    0x498b283c,
    0x9541ff0d,
    0x017139a8,
    0xb3de080c,
    0xe49cd8b4,
    0xc1906456,
    0x84617bcb,
    0xb670d532,
    0x5c74486c,
    0x5742d0b8
];
const T8 = [
    0xf4a75051,
    0x4165537e,
    0x17a4c31a,
    0x275e963a,
    0xab6bcb3b,
    0x9d45f11f,
    0xfa58abac,
    0xe303934b,
    0x30fa5520,
    0x766df6ad,
    0xcc769188,
    0x024c25f5,
    0xe5d7fc4f,
    0x2acbd7c5,
    0x35448026,
    0x62a38fb5,
    0xb15a49de,
    0xba1b6725,
    0xea0e9845,
    0xfec0e15d,
    0x2f7502c3,
    0x4cf01281,
    0x4697a38d,
    0xd3f9c66b,
    0x8f5fe703,
    0x929c9515,
    0x6d7aebbf,
    0x5259da95,
    0xbe832dd4,
    0x7421d358,
    0xe0692949,
    0xc9c8448e,
    0xc2896a75,
    0x8e7978f4,
    0x583e6b99,
    0xb971dd27,
    0xe14fb6be,
    0x88ad17f0,
    0x20ac66c9,
    0xce3ab47d,
    0xdf4a1863,
    0x1a3182e5,
    0x51336097,
    0x537f4562,
    0x6477e0b1,
    0x6bae84bb,
    0x81a01cfe,
    0x082b94f9,
    0x48685870,
    0x45fd198f,
    0xde6c8794,
    0x7bf8b752,
    0x73d323ab,
    0x4b02e272,
    0x1f8f57e3,
    0x55ab2a66,
    0xeb2807b2,
    0xb5c2032f,
    0xc57b9a86,
    0x3708a5d3,
    0x2887f230,
    0xbfa5b223,
    0x036aba02,
    0x16825ced,
    0xcf1c2b8a,
    0x79b492a7,
    0x07f2f0f3,
    0x69e2a14e,
    0xdaf4cd65,
    0x05bed506,
    0x34621fd1,
    0xa6fe8ac4,
    0x2e539d34,
    0xf355a0a2,
    0x8ae13205,
    0xf6eb75a4,
    0x83ec390b,
    0x60efaa40,
    0x719f065e,
    0x6e1051bd,
    0x218af93e,
    0xdd063d96,
    0x3e05aedd,
    0xe6bd464d,
    0x548db591,
    0xc45d0571,
    0x06d46f04,
    0x5015ff60,
    0x98fb2419,
    0xbde997d6,
    0x4043cc89,
    0xd99e7767,
    0xe842bdb0,
    0x898b8807,
    0x195b38e7,
    0xc8eedb79,
    0x7c0a47a1,
    0x420fe97c,
    0x841ec9f8,
    0x00000000,
    0x80868309,
    0x2bed4832,
    0x1170ac1e,
    0x5a724e6c,
    0x0efffbfd,
    0x8538560f,
    0xaed51e3d,
    0x2d392736,
    0x0fd9640a,
    0x5ca62168,
    0x5b54d19b,
    0x362e3a24,
    0x0a67b10c,
    0x57e70f93,
    0xee96d2b4,
    0x9b919e1b,
    0xc0c54f80,
    0xdc20a261,
    0x774b695a,
    0x121a161c,
    0x93ba0ae2,
    0xa02ae5c0,
    0x22e0433c,
    0x1b171d12,
    0x090d0b0e,
    0x8bc7adf2,
    0xb6a8b92d,
    0x1ea9c814,
    0xf1198557,
    0x75074caf,
    0x99ddbbee,
    0x7f60fda3,
    0x01269ff7,
    0x72f5bc5c,
    0x663bc544,
    0xfb7e345b,
    0x4329768b,
    0x23c6dccb,
    0xedfc68b6,
    0xe4f163b8,
    0x31dccad7,
    0x63851042,
    0x97224013,
    0xc6112084,
    0x4a247d85,
    0xbb3df8d2,
    0xf93211ae,
    0x29a16dc7,
    0x9e2f4b1d,
    0xb230f3dc,
    0x8652ec0d,
    0xc1e3d077,
    0xb3166c2b,
    0x70b999a9,
    0x9448fa11,
    0xe9642247,
    0xfc8cc4a8,
    0xf03f1aa0,
    0x7d2cd856,
    0x3390ef22,
    0x494ec787,
    0x38d1c1d9,
    0xcaa2fe8c,
    0xd40b3698,
    0xf581cfa6,
    0x7ade28a5,
    0xb78e26da,
    0xadbfa43f,
    0x3a9de42c,
    0x78920d50,
    0x5fcc9b6a,
    0x7e466254,
    0x8d13c2f6,
    0xd8b8e890,
    0x39f75e2e,
    0xc3aff582,
    0x5d80be9f,
    0xd0937c69,
    0xd52da96f,
    0x2512b3cf,
    0xac993bc8,
    0x187da710,
    0x9c636ee8,
    0x3bbb7bdb,
    0x267809cd,
    0x5918f46e,
    0x9ab701ec,
    0x4f9aa883,
    0x956e65e6,
    0xffe67eaa,
    0xbccf0821,
    0x15e8e6ef,
    0xe79bd9ba,
    0x6f36ce4a,
    0x9f09d4ea,
    0xb07cd629,
    0xa4b2af31,
    0x3f23312a,
    0xa59430c6,
    0xa266c035,
    0x4ebc3774,
    0x82caa6fc,
    0x90d0b0e0,
    0xa7d81533,
    0x04984af1,
    0xecdaf741,
    0xcd500e7f,
    0x91f62f17,
    0x4dd68d76,
    0xefb04d43,
    0xaa4d54cc,
    0x9604dfe4,
    0xd1b5e39e,
    0x6a881b4c,
    0x2c1fb8c1,
    0x65517f46,
    0x5eea049d,
    0x8c355d01,
    0x877473fa,
    0x0b412efb,
    0x671d5ab3,
    0xdbd25292,
    0x105633e9,
    0xd647136d,
    0xd7618c9a,
    0xa10c7a37,
    0xf8148e59,
    0x133c89eb,
    0xa927eece,
    0x61c935b7,
    0x1ce5ede1,
    0x47b13c7a,
    0xd2df599c,
    0xf2733f55,
    0x14ce7918,
    0xc737bf73,
    0xf7cdea53,
    0xfdaa5b5f,
    0x3d6f14df,
    0x44db8678,
    0xaff381ca,
    0x68c43eb9,
    0x24342c38,
    0xa3405fc2,
    0x1dc37216,
    0xe2250cbc,
    0x3c498b28,
    0x0d9541ff,
    0xa8017139,
    0x0cb3de08,
    0xb4e49cd8,
    0x56c19064,
    0xcb84617b,
    0x32b670d5,
    0x6c5c7448,
    0xb85742d0
];
// Transformations for decryption key expansion
const U1 = [
    0x00000000,
    0x0e090d0b,
    0x1c121a16,
    0x121b171d,
    0x3824342c,
    0x362d3927,
    0x24362e3a,
    0x2a3f2331,
    0x70486858,
    0x7e416553,
    0x6c5a724e,
    0x62537f45,
    0x486c5c74,
    0x4665517f,
    0x547e4662,
    0x5a774b69,
    0xe090d0b0,
    0xee99ddbb,
    0xfc82caa6,
    0xf28bc7ad,
    0xd8b4e49c,
    0xd6bde997,
    0xc4a6fe8a,
    0xcaaff381,
    0x90d8b8e8,
    0x9ed1b5e3,
    0x8ccaa2fe,
    0x82c3aff5,
    0xa8fc8cc4,
    0xa6f581cf,
    0xb4ee96d2,
    0xbae79bd9,
    0xdb3bbb7b,
    0xd532b670,
    0xc729a16d,
    0xc920ac66,
    0xe31f8f57,
    0xed16825c,
    0xff0d9541,
    0xf104984a,
    0xab73d323,
    0xa57ade28,
    0xb761c935,
    0xb968c43e,
    0x9357e70f,
    0x9d5eea04,
    0x8f45fd19,
    0x814cf012,
    0x3bab6bcb,
    0x35a266c0,
    0x27b971dd,
    0x29b07cd6,
    0x038f5fe7,
    0x0d8652ec,
    0x1f9d45f1,
    0x119448fa,
    0x4be30393,
    0x45ea0e98,
    0x57f11985,
    0x59f8148e,
    0x73c737bf,
    0x7dce3ab4,
    0x6fd52da9,
    0x61dc20a2,
    0xad766df6,
    0xa37f60fd,
    0xb16477e0,
    0xbf6d7aeb,
    0x955259da,
    0x9b5b54d1,
    0x894043cc,
    0x87494ec7,
    0xdd3e05ae,
    0xd33708a5,
    0xc12c1fb8,
    0xcf2512b3,
    0xe51a3182,
    0xeb133c89,
    0xf9082b94,
    0xf701269f,
    0x4de6bd46,
    0x43efb04d,
    0x51f4a750,
    0x5ffdaa5b,
    0x75c2896a,
    0x7bcb8461,
    0x69d0937c,
    0x67d99e77,
    0x3daed51e,
    0x33a7d815,
    0x21bccf08,
    0x2fb5c203,
    0x058ae132,
    0x0b83ec39,
    0x1998fb24,
    0x1791f62f,
    0x764dd68d,
    0x7844db86,
    0x6a5fcc9b,
    0x6456c190,
    0x4e69e2a1,
    0x4060efaa,
    0x527bf8b7,
    0x5c72f5bc,
    0x0605bed5,
    0x080cb3de,
    0x1a17a4c3,
    0x141ea9c8,
    0x3e218af9,
    0x302887f2,
    0x223390ef,
    0x2c3a9de4,
    0x96dd063d,
    0x98d40b36,
    0x8acf1c2b,
    0x84c61120,
    0xaef93211,
    0xa0f03f1a,
    0xb2eb2807,
    0xbce2250c,
    0xe6956e65,
    0xe89c636e,
    0xfa877473,
    0xf48e7978,
    0xdeb15a49,
    0xd0b85742,
    0xc2a3405f,
    0xccaa4d54,
    0x41ecdaf7,
    0x4fe5d7fc,
    0x5dfec0e1,
    0x53f7cdea,
    0x79c8eedb,
    0x77c1e3d0,
    0x65daf4cd,
    0x6bd3f9c6,
    0x31a4b2af,
    0x3fadbfa4,
    0x2db6a8b9,
    0x23bfa5b2,
    0x09808683,
    0x07898b88,
    0x15929c95,
    0x1b9b919e,
    0xa17c0a47,
    0xaf75074c,
    0xbd6e1051,
    0xb3671d5a,
    0x99583e6b,
    0x97513360,
    0x854a247d,
    0x8b432976,
    0xd134621f,
    0xdf3d6f14,
    0xcd267809,
    0xc32f7502,
    0xe9105633,
    0xe7195b38,
    0xf5024c25,
    0xfb0b412e,
    0x9ad7618c,
    0x94de6c87,
    0x86c57b9a,
    0x88cc7691,
    0xa2f355a0,
    0xacfa58ab,
    0xbee14fb6,
    0xb0e842bd,
    0xea9f09d4,
    0xe49604df,
    0xf68d13c2,
    0xf8841ec9,
    0xd2bb3df8,
    0xdcb230f3,
    0xcea927ee,
    0xc0a02ae5,
    0x7a47b13c,
    0x744ebc37,
    0x6655ab2a,
    0x685ca621,
    0x42638510,
    0x4c6a881b,
    0x5e719f06,
    0x5078920d,
    0x0a0fd964,
    0x0406d46f,
    0x161dc372,
    0x1814ce79,
    0x322bed48,
    0x3c22e043,
    0x2e39f75e,
    0x2030fa55,
    0xec9ab701,
    0xe293ba0a,
    0xf088ad17,
    0xfe81a01c,
    0xd4be832d,
    0xdab78e26,
    0xc8ac993b,
    0xc6a59430,
    0x9cd2df59,
    0x92dbd252,
    0x80c0c54f,
    0x8ec9c844,
    0xa4f6eb75,
    0xaaffe67e,
    0xb8e4f163,
    0xb6edfc68,
    0x0c0a67b1,
    0x02036aba,
    0x10187da7,
    0x1e1170ac,
    0x342e539d,
    0x3a275e96,
    0x283c498b,
    0x26354480,
    0x7c420fe9,
    0x724b02e2,
    0x605015ff,
    0x6e5918f4,
    0x44663bc5,
    0x4a6f36ce,
    0x587421d3,
    0x567d2cd8,
    0x37a10c7a,
    0x39a80171,
    0x2bb3166c,
    0x25ba1b67,
    0x0f853856,
    0x018c355d,
    0x13972240,
    0x1d9e2f4b,
    0x47e96422,
    0x49e06929,
    0x5bfb7e34,
    0x55f2733f,
    0x7fcd500e,
    0x71c45d05,
    0x63df4a18,
    0x6dd64713,
    0xd731dcca,
    0xd938d1c1,
    0xcb23c6dc,
    0xc52acbd7,
    0xef15e8e6,
    0xe11ce5ed,
    0xf307f2f0,
    0xfd0efffb,
    0xa779b492,
    0xa970b999,
    0xbb6bae84,
    0xb562a38f,
    0x9f5d80be,
    0x91548db5,
    0x834f9aa8,
    0x8d4697a3
];
const U2 = [
    0x00000000,
    0x0b0e090d,
    0x161c121a,
    0x1d121b17,
    0x2c382434,
    0x27362d39,
    0x3a24362e,
    0x312a3f23,
    0x58704868,
    0x537e4165,
    0x4e6c5a72,
    0x4562537f,
    0x74486c5c,
    0x7f466551,
    0x62547e46,
    0x695a774b,
    0xb0e090d0,
    0xbbee99dd,
    0xa6fc82ca,
    0xadf28bc7,
    0x9cd8b4e4,
    0x97d6bde9,
    0x8ac4a6fe,
    0x81caaff3,
    0xe890d8b8,
    0xe39ed1b5,
    0xfe8ccaa2,
    0xf582c3af,
    0xc4a8fc8c,
    0xcfa6f581,
    0xd2b4ee96,
    0xd9bae79b,
    0x7bdb3bbb,
    0x70d532b6,
    0x6dc729a1,
    0x66c920ac,
    0x57e31f8f,
    0x5ced1682,
    0x41ff0d95,
    0x4af10498,
    0x23ab73d3,
    0x28a57ade,
    0x35b761c9,
    0x3eb968c4,
    0x0f9357e7,
    0x049d5eea,
    0x198f45fd,
    0x12814cf0,
    0xcb3bab6b,
    0xc035a266,
    0xdd27b971,
    0xd629b07c,
    0xe7038f5f,
    0xec0d8652,
    0xf11f9d45,
    0xfa119448,
    0x934be303,
    0x9845ea0e,
    0x8557f119,
    0x8e59f814,
    0xbf73c737,
    0xb47dce3a,
    0xa96fd52d,
    0xa261dc20,
    0xf6ad766d,
    0xfda37f60,
    0xe0b16477,
    0xebbf6d7a,
    0xda955259,
    0xd19b5b54,
    0xcc894043,
    0xc787494e,
    0xaedd3e05,
    0xa5d33708,
    0xb8c12c1f,
    0xb3cf2512,
    0x82e51a31,
    0x89eb133c,
    0x94f9082b,
    0x9ff70126,
    0x464de6bd,
    0x4d43efb0,
    0x5051f4a7,
    0x5b5ffdaa,
    0x6a75c289,
    0x617bcb84,
    0x7c69d093,
    0x7767d99e,
    0x1e3daed5,
    0x1533a7d8,
    0x0821bccf,
    0x032fb5c2,
    0x32058ae1,
    0x390b83ec,
    0x241998fb,
    0x2f1791f6,
    0x8d764dd6,
    0x867844db,
    0x9b6a5fcc,
    0x906456c1,
    0xa14e69e2,
    0xaa4060ef,
    0xb7527bf8,
    0xbc5c72f5,
    0xd50605be,
    0xde080cb3,
    0xc31a17a4,
    0xc8141ea9,
    0xf93e218a,
    0xf2302887,
    0xef223390,
    0xe42c3a9d,
    0x3d96dd06,
    0x3698d40b,
    0x2b8acf1c,
    0x2084c611,
    0x11aef932,
    0x1aa0f03f,
    0x07b2eb28,
    0x0cbce225,
    0x65e6956e,
    0x6ee89c63,
    0x73fa8774,
    0x78f48e79,
    0x49deb15a,
    0x42d0b857,
    0x5fc2a340,
    0x54ccaa4d,
    0xf741ecda,
    0xfc4fe5d7,
    0xe15dfec0,
    0xea53f7cd,
    0xdb79c8ee,
    0xd077c1e3,
    0xcd65daf4,
    0xc66bd3f9,
    0xaf31a4b2,
    0xa43fadbf,
    0xb92db6a8,
    0xb223bfa5,
    0x83098086,
    0x8807898b,
    0x9515929c,
    0x9e1b9b91,
    0x47a17c0a,
    0x4caf7507,
    0x51bd6e10,
    0x5ab3671d,
    0x6b99583e,
    0x60975133,
    0x7d854a24,
    0x768b4329,
    0x1fd13462,
    0x14df3d6f,
    0x09cd2678,
    0x02c32f75,
    0x33e91056,
    0x38e7195b,
    0x25f5024c,
    0x2efb0b41,
    0x8c9ad761,
    0x8794de6c,
    0x9a86c57b,
    0x9188cc76,
    0xa0a2f355,
    0xabacfa58,
    0xb6bee14f,
    0xbdb0e842,
    0xd4ea9f09,
    0xdfe49604,
    0xc2f68d13,
    0xc9f8841e,
    0xf8d2bb3d,
    0xf3dcb230,
    0xeecea927,
    0xe5c0a02a,
    0x3c7a47b1,
    0x37744ebc,
    0x2a6655ab,
    0x21685ca6,
    0x10426385,
    0x1b4c6a88,
    0x065e719f,
    0x0d507892,
    0x640a0fd9,
    0x6f0406d4,
    0x72161dc3,
    0x791814ce,
    0x48322bed,
    0x433c22e0,
    0x5e2e39f7,
    0x552030fa,
    0x01ec9ab7,
    0x0ae293ba,
    0x17f088ad,
    0x1cfe81a0,
    0x2dd4be83,
    0x26dab78e,
    0x3bc8ac99,
    0x30c6a594,
    0x599cd2df,
    0x5292dbd2,
    0x4f80c0c5,
    0x448ec9c8,
    0x75a4f6eb,
    0x7eaaffe6,
    0x63b8e4f1,
    0x68b6edfc,
    0xb10c0a67,
    0xba02036a,
    0xa710187d,
    0xac1e1170,
    0x9d342e53,
    0x963a275e,
    0x8b283c49,
    0x80263544,
    0xe97c420f,
    0xe2724b02,
    0xff605015,
    0xf46e5918,
    0xc544663b,
    0xce4a6f36,
    0xd3587421,
    0xd8567d2c,
    0x7a37a10c,
    0x7139a801,
    0x6c2bb316,
    0x6725ba1b,
    0x560f8538,
    0x5d018c35,
    0x40139722,
    0x4b1d9e2f,
    0x2247e964,
    0x2949e069,
    0x345bfb7e,
    0x3f55f273,
    0x0e7fcd50,
    0x0571c45d,
    0x1863df4a,
    0x136dd647,
    0xcad731dc,
    0xc1d938d1,
    0xdccb23c6,
    0xd7c52acb,
    0xe6ef15e8,
    0xede11ce5,
    0xf0f307f2,
    0xfbfd0eff,
    0x92a779b4,
    0x99a970b9,
    0x84bb6bae,
    0x8fb562a3,
    0xbe9f5d80,
    0xb591548d,
    0xa8834f9a,
    0xa38d4697
];
const U3 = [
    0x00000000,
    0x0d0b0e09,
    0x1a161c12,
    0x171d121b,
    0x342c3824,
    0x3927362d,
    0x2e3a2436,
    0x23312a3f,
    0x68587048,
    0x65537e41,
    0x724e6c5a,
    0x7f456253,
    0x5c74486c,
    0x517f4665,
    0x4662547e,
    0x4b695a77,
    0xd0b0e090,
    0xddbbee99,
    0xcaa6fc82,
    0xc7adf28b,
    0xe49cd8b4,
    0xe997d6bd,
    0xfe8ac4a6,
    0xf381caaf,
    0xb8e890d8,
    0xb5e39ed1,
    0xa2fe8cca,
    0xaff582c3,
    0x8cc4a8fc,
    0x81cfa6f5,
    0x96d2b4ee,
    0x9bd9bae7,
    0xbb7bdb3b,
    0xb670d532,
    0xa16dc729,
    0xac66c920,
    0x8f57e31f,
    0x825ced16,
    0x9541ff0d,
    0x984af104,
    0xd323ab73,
    0xde28a57a,
    0xc935b761,
    0xc43eb968,
    0xe70f9357,
    0xea049d5e,
    0xfd198f45,
    0xf012814c,
    0x6bcb3bab,
    0x66c035a2,
    0x71dd27b9,
    0x7cd629b0,
    0x5fe7038f,
    0x52ec0d86,
    0x45f11f9d,
    0x48fa1194,
    0x03934be3,
    0x0e9845ea,
    0x198557f1,
    0x148e59f8,
    0x37bf73c7,
    0x3ab47dce,
    0x2da96fd5,
    0x20a261dc,
    0x6df6ad76,
    0x60fda37f,
    0x77e0b164,
    0x7aebbf6d,
    0x59da9552,
    0x54d19b5b,
    0x43cc8940,
    0x4ec78749,
    0x05aedd3e,
    0x08a5d337,
    0x1fb8c12c,
    0x12b3cf25,
    0x3182e51a,
    0x3c89eb13,
    0x2b94f908,
    0x269ff701,
    0xbd464de6,
    0xb04d43ef,
    0xa75051f4,
    0xaa5b5ffd,
    0x896a75c2,
    0x84617bcb,
    0x937c69d0,
    0x9e7767d9,
    0xd51e3dae,
    0xd81533a7,
    0xcf0821bc,
    0xc2032fb5,
    0xe132058a,
    0xec390b83,
    0xfb241998,
    0xf62f1791,
    0xd68d764d,
    0xdb867844,
    0xcc9b6a5f,
    0xc1906456,
    0xe2a14e69,
    0xefaa4060,
    0xf8b7527b,
    0xf5bc5c72,
    0xbed50605,
    0xb3de080c,
    0xa4c31a17,
    0xa9c8141e,
    0x8af93e21,
    0x87f23028,
    0x90ef2233,
    0x9de42c3a,
    0x063d96dd,
    0x0b3698d4,
    0x1c2b8acf,
    0x112084c6,
    0x3211aef9,
    0x3f1aa0f0,
    0x2807b2eb,
    0x250cbce2,
    0x6e65e695,
    0x636ee89c,
    0x7473fa87,
    0x7978f48e,
    0x5a49deb1,
    0x5742d0b8,
    0x405fc2a3,
    0x4d54ccaa,
    0xdaf741ec,
    0xd7fc4fe5,
    0xc0e15dfe,
    0xcdea53f7,
    0xeedb79c8,
    0xe3d077c1,
    0xf4cd65da,
    0xf9c66bd3,
    0xb2af31a4,
    0xbfa43fad,
    0xa8b92db6,
    0xa5b223bf,
    0x86830980,
    0x8b880789,
    0x9c951592,
    0x919e1b9b,
    0x0a47a17c,
    0x074caf75,
    0x1051bd6e,
    0x1d5ab367,
    0x3e6b9958,
    0x33609751,
    0x247d854a,
    0x29768b43,
    0x621fd134,
    0x6f14df3d,
    0x7809cd26,
    0x7502c32f,
    0x5633e910,
    0x5b38e719,
    0x4c25f502,
    0x412efb0b,
    0x618c9ad7,
    0x6c8794de,
    0x7b9a86c5,
    0x769188cc,
    0x55a0a2f3,
    0x58abacfa,
    0x4fb6bee1,
    0x42bdb0e8,
    0x09d4ea9f,
    0x04dfe496,
    0x13c2f68d,
    0x1ec9f884,
    0x3df8d2bb,
    0x30f3dcb2,
    0x27eecea9,
    0x2ae5c0a0,
    0xb13c7a47,
    0xbc37744e,
    0xab2a6655,
    0xa621685c,
    0x85104263,
    0x881b4c6a,
    0x9f065e71,
    0x920d5078,
    0xd9640a0f,
    0xd46f0406,
    0xc372161d,
    0xce791814,
    0xed48322b,
    0xe0433c22,
    0xf75e2e39,
    0xfa552030,
    0xb701ec9a,
    0xba0ae293,
    0xad17f088,
    0xa01cfe81,
    0x832dd4be,
    0x8e26dab7,
    0x993bc8ac,
    0x9430c6a5,
    0xdf599cd2,
    0xd25292db,
    0xc54f80c0,
    0xc8448ec9,
    0xeb75a4f6,
    0xe67eaaff,
    0xf163b8e4,
    0xfc68b6ed,
    0x67b10c0a,
    0x6aba0203,
    0x7da71018,
    0x70ac1e11,
    0x539d342e,
    0x5e963a27,
    0x498b283c,
    0x44802635,
    0x0fe97c42,
    0x02e2724b,
    0x15ff6050,
    0x18f46e59,
    0x3bc54466,
    0x36ce4a6f,
    0x21d35874,
    0x2cd8567d,
    0x0c7a37a1,
    0x017139a8,
    0x166c2bb3,
    0x1b6725ba,
    0x38560f85,
    0x355d018c,
    0x22401397,
    0x2f4b1d9e,
    0x642247e9,
    0x692949e0,
    0x7e345bfb,
    0x733f55f2,
    0x500e7fcd,
    0x5d0571c4,
    0x4a1863df,
    0x47136dd6,
    0xdccad731,
    0xd1c1d938,
    0xc6dccb23,
    0xcbd7c52a,
    0xe8e6ef15,
    0xe5ede11c,
    0xf2f0f307,
    0xfffbfd0e,
    0xb492a779,
    0xb999a970,
    0xae84bb6b,
    0xa38fb562,
    0x80be9f5d,
    0x8db59154,
    0x9aa8834f,
    0x97a38d46
];
const U4 = [
    0x00000000,
    0x090d0b0e,
    0x121a161c,
    0x1b171d12,
    0x24342c38,
    0x2d392736,
    0x362e3a24,
    0x3f23312a,
    0x48685870,
    0x4165537e,
    0x5a724e6c,
    0x537f4562,
    0x6c5c7448,
    0x65517f46,
    0x7e466254,
    0x774b695a,
    0x90d0b0e0,
    0x99ddbbee,
    0x82caa6fc,
    0x8bc7adf2,
    0xb4e49cd8,
    0xbde997d6,
    0xa6fe8ac4,
    0xaff381ca,
    0xd8b8e890,
    0xd1b5e39e,
    0xcaa2fe8c,
    0xc3aff582,
    0xfc8cc4a8,
    0xf581cfa6,
    0xee96d2b4,
    0xe79bd9ba,
    0x3bbb7bdb,
    0x32b670d5,
    0x29a16dc7,
    0x20ac66c9,
    0x1f8f57e3,
    0x16825ced,
    0x0d9541ff,
    0x04984af1,
    0x73d323ab,
    0x7ade28a5,
    0x61c935b7,
    0x68c43eb9,
    0x57e70f93,
    0x5eea049d,
    0x45fd198f,
    0x4cf01281,
    0xab6bcb3b,
    0xa266c035,
    0xb971dd27,
    0xb07cd629,
    0x8f5fe703,
    0x8652ec0d,
    0x9d45f11f,
    0x9448fa11,
    0xe303934b,
    0xea0e9845,
    0xf1198557,
    0xf8148e59,
    0xc737bf73,
    0xce3ab47d,
    0xd52da96f,
    0xdc20a261,
    0x766df6ad,
    0x7f60fda3,
    0x6477e0b1,
    0x6d7aebbf,
    0x5259da95,
    0x5b54d19b,
    0x4043cc89,
    0x494ec787,
    0x3e05aedd,
    0x3708a5d3,
    0x2c1fb8c1,
    0x2512b3cf,
    0x1a3182e5,
    0x133c89eb,
    0x082b94f9,
    0x01269ff7,
    0xe6bd464d,
    0xefb04d43,
    0xf4a75051,
    0xfdaa5b5f,
    0xc2896a75,
    0xcb84617b,
    0xd0937c69,
    0xd99e7767,
    0xaed51e3d,
    0xa7d81533,
    0xbccf0821,
    0xb5c2032f,
    0x8ae13205,
    0x83ec390b,
    0x98fb2419,
    0x91f62f17,
    0x4dd68d76,
    0x44db8678,
    0x5fcc9b6a,
    0x56c19064,
    0x69e2a14e,
    0x60efaa40,
    0x7bf8b752,
    0x72f5bc5c,
    0x05bed506,
    0x0cb3de08,
    0x17a4c31a,
    0x1ea9c814,
    0x218af93e,
    0x2887f230,
    0x3390ef22,
    0x3a9de42c,
    0xdd063d96,
    0xd40b3698,
    0xcf1c2b8a,
    0xc6112084,
    0xf93211ae,
    0xf03f1aa0,
    0xeb2807b2,
    0xe2250cbc,
    0x956e65e6,
    0x9c636ee8,
    0x877473fa,
    0x8e7978f4,
    0xb15a49de,
    0xb85742d0,
    0xa3405fc2,
    0xaa4d54cc,
    0xecdaf741,
    0xe5d7fc4f,
    0xfec0e15d,
    0xf7cdea53,
    0xc8eedb79,
    0xc1e3d077,
    0xdaf4cd65,
    0xd3f9c66b,
    0xa4b2af31,
    0xadbfa43f,
    0xb6a8b92d,
    0xbfa5b223,
    0x80868309,
    0x898b8807,
    0x929c9515,
    0x9b919e1b,
    0x7c0a47a1,
    0x75074caf,
    0x6e1051bd,
    0x671d5ab3,
    0x583e6b99,
    0x51336097,
    0x4a247d85,
    0x4329768b,
    0x34621fd1,
    0x3d6f14df,
    0x267809cd,
    0x2f7502c3,
    0x105633e9,
    0x195b38e7,
    0x024c25f5,
    0x0b412efb,
    0xd7618c9a,
    0xde6c8794,
    0xc57b9a86,
    0xcc769188,
    0xf355a0a2,
    0xfa58abac,
    0xe14fb6be,
    0xe842bdb0,
    0x9f09d4ea,
    0x9604dfe4,
    0x8d13c2f6,
    0x841ec9f8,
    0xbb3df8d2,
    0xb230f3dc,
    0xa927eece,
    0xa02ae5c0,
    0x47b13c7a,
    0x4ebc3774,
    0x55ab2a66,
    0x5ca62168,
    0x63851042,
    0x6a881b4c,
    0x719f065e,
    0x78920d50,
    0x0fd9640a,
    0x06d46f04,
    0x1dc37216,
    0x14ce7918,
    0x2bed4832,
    0x22e0433c,
    0x39f75e2e,
    0x30fa5520,
    0x9ab701ec,
    0x93ba0ae2,
    0x88ad17f0,
    0x81a01cfe,
    0xbe832dd4,
    0xb78e26da,
    0xac993bc8,
    0xa59430c6,
    0xd2df599c,
    0xdbd25292,
    0xc0c54f80,
    0xc9c8448e,
    0xf6eb75a4,
    0xffe67eaa,
    0xe4f163b8,
    0xedfc68b6,
    0x0a67b10c,
    0x036aba02,
    0x187da710,
    0x1170ac1e,
    0x2e539d34,
    0x275e963a,
    0x3c498b28,
    0x35448026,
    0x420fe97c,
    0x4b02e272,
    0x5015ff60,
    0x5918f46e,
    0x663bc544,
    0x6f36ce4a,
    0x7421d358,
    0x7d2cd856,
    0xa10c7a37,
    0xa8017139,
    0xb3166c2b,
    0xba1b6725,
    0x8538560f,
    0x8c355d01,
    0x97224013,
    0x9e2f4b1d,
    0xe9642247,
    0xe0692949,
    0xfb7e345b,
    0xf2733f55,
    0xcd500e7f,
    0xc45d0571,
    0xdf4a1863,
    0xd647136d,
    0x31dccad7,
    0x38d1c1d9,
    0x23c6dccb,
    0x2acbd7c5,
    0x15e8e6ef,
    0x1ce5ede1,
    0x07f2f0f3,
    0x0efffbfd,
    0x79b492a7,
    0x70b999a9,
    0x6bae84bb,
    0x62a38fb5,
    0x5d80be9f,
    0x548db591,
    0x4f9aa883,
    0x4697a38d
];
function convertToInt32(bytes) {
    const result = [];
    for(let i = 0; i < bytes.length; i += 4){
        result.push(bytes[i] << 24 | bytes[i + 1] << 16 | bytes[i + 2] << 8 | bytes[i + 3]);
    }
    return result;
}
class AES {
    get key() {
        return __classPrivateFieldGet(this, _AES_key, "f").slice();
    }
    constructor(key){
        _AES_key.set(this, void 0);
        _AES_Kd.set(this, void 0);
        _AES_Ke.set(this, void 0);
        if (!(this instanceof AES)) {
            throw Error('AES must be instanitated with `new`');
        }
        __classPrivateFieldSet(this, _AES_key, new Uint8Array(key), "f");
        const rounds = numberOfRounds[this.key.length];
        if (rounds == null) {
            throw new TypeError('invalid key size (must be 16, 24 or 32 bytes)');
        }
        // encryption round keys
        __classPrivateFieldSet(this, _AES_Ke, [], "f");
        // decryption round keys
        __classPrivateFieldSet(this, _AES_Kd, [], "f");
        for(let i = 0; i <= rounds; i++){
            __classPrivateFieldGet(this, _AES_Ke, "f").push([
                0,
                0,
                0,
                0
            ]);
            __classPrivateFieldGet(this, _AES_Kd, "f").push([
                0,
                0,
                0,
                0
            ]);
        }
        const roundKeyCount = (rounds + 1) * 4;
        const KC = this.key.length / 4;
        // convert the key into ints
        const tk = convertToInt32(this.key);
        // copy values into round key arrays
        let index;
        for(let i = 0; i < KC; i++){
            index = i >> 2;
            __classPrivateFieldGet(this, _AES_Ke, "f")[index][i % 4] = tk[i];
            __classPrivateFieldGet(this, _AES_Kd, "f")[rounds - index][i % 4] = tk[i];
        }
        // key expansion (fips-197 section 5.2)
        let rconpointer = 0;
        let t = KC, tt;
        while(t < roundKeyCount){
            tt = tk[KC - 1];
            tk[0] ^= S[tt >> 16 & 0xFF] << 24 ^ S[tt >> 8 & 0xFF] << 16 ^ S[tt & 0xFF] << 8 ^ S[tt >> 24 & 0xFF] ^ rcon[rconpointer] << 24;
            rconpointer += 1;
            // key expansion (for non-256 bit)
            if (KC != 8) {
                for(let i = 1; i < KC; i++){
                    tk[i] ^= tk[i - 1];
                }
            // key expansion for 256-bit keys is "slightly different" (fips-197)
            } else {
                for(let i = 1; i < KC / 2; i++){
                    tk[i] ^= tk[i - 1];
                }
                tt = tk[KC / 2 - 1];
                tk[KC / 2] ^= S[tt & 0xFF] ^ S[tt >> 8 & 0xFF] << 8 ^ S[tt >> 16 & 0xFF] << 16 ^ S[tt >> 24 & 0xFF] << 24;
                for(let i = KC / 2 + 1; i < KC; i++){
                    tk[i] ^= tk[i - 1];
                }
            }
            // copy values into round key arrays
            let i = 0, r, c;
            while(i < KC && t < roundKeyCount){
                r = t >> 2;
                c = t % 4;
                __classPrivateFieldGet(this, _AES_Ke, "f")[r][c] = tk[i];
                __classPrivateFieldGet(this, _AES_Kd, "f")[rounds - r][c] = tk[i++];
                t++;
            }
        }
        // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
        for(let r = 1; r < rounds; r++){
            for(let c = 0; c < 4; c++){
                tt = __classPrivateFieldGet(this, _AES_Kd, "f")[r][c];
                __classPrivateFieldGet(this, _AES_Kd, "f")[r][c] = U1[tt >> 24 & 0xFF] ^ U2[tt >> 16 & 0xFF] ^ U3[tt >> 8 & 0xFF] ^ U4[tt & 0xFF];
            }
        }
    }
    encrypt(plaintext) {
        if (plaintext.length != 16) {
            throw new TypeError('invalid plaintext size (must be 16 bytes)');
        }
        const rounds = __classPrivateFieldGet(this, _AES_Ke, "f").length - 1;
        const a = [
            0,
            0,
            0,
            0
        ];
        // convert plaintext to (ints ^ key)
        let t = convertToInt32(plaintext);
        for(let i = 0; i < 4; i++){
            t[i] ^= __classPrivateFieldGet(this, _AES_Ke, "f")[0][i];
        }
        // apply round transforms
        for(let r = 1; r < rounds; r++){
            for(let i = 0; i < 4; i++){
                a[i] = T1[t[i] >> 24 & 0xff] ^ T2[t[(i + 1) % 4] >> 16 & 0xff] ^ T3[t[(i + 2) % 4] >> 8 & 0xff] ^ T4[t[(i + 3) % 4] & 0xff] ^ __classPrivateFieldGet(this, _AES_Ke, "f")[r][i];
            }
            t = a.slice();
        }
        // the last round is special
        const result = new Uint8Array(16);
        let tt = 0;
        for(let i = 0; i < 4; i++){
            tt = __classPrivateFieldGet(this, _AES_Ke, "f")[rounds][i];
            result[4 * i] = (S[t[i] >> 24 & 0xff] ^ tt >> 24) & 0xff;
            result[4 * i + 1] = (S[t[(i + 1) % 4] >> 16 & 0xff] ^ tt >> 16) & 0xff;
            result[4 * i + 2] = (S[t[(i + 2) % 4] >> 8 & 0xff] ^ tt >> 8) & 0xff;
            result[4 * i + 3] = (S[t[(i + 3) % 4] & 0xff] ^ tt) & 0xff;
        }
        return result;
    }
    decrypt(ciphertext) {
        if (ciphertext.length != 16) {
            throw new TypeError('invalid ciphertext size (must be 16 bytes)');
        }
        const rounds = __classPrivateFieldGet(this, _AES_Kd, "f").length - 1;
        const a = [
            0,
            0,
            0,
            0
        ];
        // convert plaintext to (ints ^ key)
        let t = convertToInt32(ciphertext);
        for(let i = 0; i < 4; i++){
            t[i] ^= __classPrivateFieldGet(this, _AES_Kd, "f")[0][i];
        }
        // apply round transforms
        for(let r = 1; r < rounds; r++){
            for(let i = 0; i < 4; i++){
                a[i] = T5[t[i] >> 24 & 0xff] ^ T6[t[(i + 3) % 4] >> 16 & 0xff] ^ T7[t[(i + 2) % 4] >> 8 & 0xff] ^ T8[t[(i + 1) % 4] & 0xff] ^ __classPrivateFieldGet(this, _AES_Kd, "f")[r][i];
            }
            t = a.slice();
        }
        // the last round is special
        const result = new Uint8Array(16);
        let tt = 0;
        for(let i = 0; i < 4; i++){
            tt = __classPrivateFieldGet(this, _AES_Kd, "f")[rounds][i];
            result[4 * i] = (Si[t[i] >> 24 & 0xff] ^ tt >> 24) & 0xff;
            result[4 * i + 1] = (Si[t[(i + 3) % 4] >> 16 & 0xff] ^ tt >> 16) & 0xff;
            result[4 * i + 2] = (Si[t[(i + 2) % 4] >> 8 & 0xff] ^ tt >> 8) & 0xff;
            result[4 * i + 3] = (Si[t[(i + 1) % 4] & 0xff] ^ tt) & 0xff;
        }
        return result;
    }
}
exports.AES = AES;
_AES_key = new WeakMap(), _AES_Kd = new WeakMap(), _AES_Ke = new WeakMap(); //# sourceMappingURL=aes.js.map
}),
"[project]/node_modules/aes-js/lib.commonjs/mode.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ModeOfOperation = void 0;
const aes_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/aes.js [app-ssr] (ecmascript)");
class ModeOfOperation {
    constructor(name, key, cls){
        if (cls && !(this instanceof cls)) {
            throw new Error(`${name} must be instantiated with "new"`);
        }
        Object.defineProperties(this, {
            aes: {
                enumerable: true,
                value: new aes_js_1.AES(key)
            },
            name: {
                enumerable: true,
                value: name
            }
        });
    }
}
exports.ModeOfOperation = ModeOfOperation; //# sourceMappingURL=mode.js.map
}),
"[project]/node_modules/aes-js/lib.commonjs/mode-cbc.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Cipher Block Chaining
var __classPrivateFieldSet = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CBC_iv, _CBC_lastBlock;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CBC = void 0;
const mode_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/mode.js [app-ssr] (ecmascript)");
class CBC extends mode_js_1.ModeOfOperation {
    constructor(key, iv){
        super("ECC", key, CBC);
        _CBC_iv.set(this, void 0);
        _CBC_lastBlock.set(this, void 0);
        if (iv) {
            if (iv.length % 16) {
                throw new TypeError("invalid iv size (must be 16 bytes)");
            }
            __classPrivateFieldSet(this, _CBC_iv, new Uint8Array(iv), "f");
        } else {
            __classPrivateFieldSet(this, _CBC_iv, new Uint8Array(16), "f");
        }
        __classPrivateFieldSet(this, _CBC_lastBlock, this.iv, "f");
    }
    get iv() {
        return new Uint8Array(__classPrivateFieldGet(this, _CBC_iv, "f"));
    }
    encrypt(plaintext) {
        if (plaintext.length % 16) {
            throw new TypeError("invalid plaintext size (must be multiple of 16 bytes)");
        }
        const ciphertext = new Uint8Array(plaintext.length);
        for(let i = 0; i < plaintext.length; i += 16){
            for(let j = 0; j < 16; j++){
                __classPrivateFieldGet(this, _CBC_lastBlock, "f")[j] ^= plaintext[i + j];
            }
            __classPrivateFieldSet(this, _CBC_lastBlock, this.aes.encrypt(__classPrivateFieldGet(this, _CBC_lastBlock, "f")), "f");
            ciphertext.set(__classPrivateFieldGet(this, _CBC_lastBlock, "f"), i);
        }
        return ciphertext;
    }
    decrypt(ciphertext) {
        if (ciphertext.length % 16) {
            throw new TypeError("invalid ciphertext size (must be multiple of 16 bytes)");
        }
        const plaintext = new Uint8Array(ciphertext.length);
        for(let i = 0; i < ciphertext.length; i += 16){
            const block = this.aes.decrypt(ciphertext.subarray(i, i + 16));
            for(let j = 0; j < 16; j++){
                plaintext[i + j] = block[j] ^ __classPrivateFieldGet(this, _CBC_lastBlock, "f")[j];
                __classPrivateFieldGet(this, _CBC_lastBlock, "f")[j] = ciphertext[i + j];
            }
        }
        return plaintext;
    }
}
exports.CBC = CBC;
_CBC_iv = new WeakMap(), _CBC_lastBlock = new WeakMap(); //# sourceMappingURL=mode-cbc.js.map
}),
"[project]/node_modules/aes-js/lib.commonjs/mode-cfb.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Cipher Feedback
var __classPrivateFieldSet = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CFB_instances, _CFB_iv, _CFB_shiftRegister, _CFB_shift;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CFB = void 0;
const mode_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/mode.js [app-ssr] (ecmascript)");
class CFB extends mode_js_1.ModeOfOperation {
    constructor(key, iv, segmentSize = 8){
        super("CFB", key, CFB);
        _CFB_instances.add(this);
        _CFB_iv.set(this, void 0);
        _CFB_shiftRegister.set(this, void 0);
        // This library currently only handles byte-aligned segmentSize
        if (!Number.isInteger(segmentSize) || segmentSize % 8) {
            throw new TypeError("invalid segmentSize");
        }
        Object.defineProperties(this, {
            segmentSize: {
                enumerable: true,
                value: segmentSize
            }
        });
        if (iv) {
            if (iv.length % 16) {
                throw new TypeError("invalid iv size (must be 16 bytes)");
            }
            __classPrivateFieldSet(this, _CFB_iv, new Uint8Array(iv), "f");
        } else {
            __classPrivateFieldSet(this, _CFB_iv, new Uint8Array(16), "f");
        }
        __classPrivateFieldSet(this, _CFB_shiftRegister, this.iv, "f");
    }
    get iv() {
        return new Uint8Array(__classPrivateFieldGet(this, _CFB_iv, "f"));
    }
    encrypt(plaintext) {
        if (8 * plaintext.length % this.segmentSize) {
            throw new TypeError("invalid plaintext size (must be multiple of segmentSize bytes)");
        }
        const segmentSize = this.segmentSize / 8;
        const ciphertext = new Uint8Array(plaintext);
        for(let i = 0; i < ciphertext.length; i += segmentSize){
            const xorSegment = this.aes.encrypt(__classPrivateFieldGet(this, _CFB_shiftRegister, "f"));
            for(let j = 0; j < segmentSize; j++){
                ciphertext[i + j] ^= xorSegment[j];
            }
            __classPrivateFieldGet(this, _CFB_instances, "m", _CFB_shift).call(this, ciphertext.subarray(i));
        }
        return ciphertext;
    }
    decrypt(ciphertext) {
        if (8 * ciphertext.length % this.segmentSize) {
            throw new TypeError("invalid ciphertext size (must be multiple of segmentSize bytes)");
        }
        const segmentSize = this.segmentSize / 8;
        const plaintext = new Uint8Array(ciphertext);
        for(let i = 0; i < plaintext.length; i += segmentSize){
            const xorSegment = this.aes.encrypt(__classPrivateFieldGet(this, _CFB_shiftRegister, "f"));
            for(let j = 0; j < segmentSize; j++){
                plaintext[i + j] ^= xorSegment[j];
            }
            __classPrivateFieldGet(this, _CFB_instances, "m", _CFB_shift).call(this, ciphertext.subarray(i));
        }
        return plaintext;
    }
}
exports.CFB = CFB;
_CFB_iv = new WeakMap(), _CFB_shiftRegister = new WeakMap(), _CFB_instances = new WeakSet(), _CFB_shift = function _CFB_shift(data) {
    const segmentSize = this.segmentSize / 8;
    // Shift the register
    __classPrivateFieldGet(this, _CFB_shiftRegister, "f").set(__classPrivateFieldGet(this, _CFB_shiftRegister, "f").subarray(segmentSize));
    __classPrivateFieldGet(this, _CFB_shiftRegister, "f").set(data.subarray(0, segmentSize), 16 - segmentSize);
}; //# sourceMappingURL=mode-cfb.js.map
}),
"[project]/node_modules/aes-js/lib.commonjs/mode-ctr.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Counter Mode
var __classPrivateFieldSet = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CTR_remaining, _CTR_remainingIndex, _CTR_counter;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CTR = void 0;
const mode_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/mode.js [app-ssr] (ecmascript)");
class CTR extends mode_js_1.ModeOfOperation {
    constructor(key, initialValue){
        super("CTR", key, CTR);
        // Remaining bytes for the one-time pad
        _CTR_remaining.set(this, void 0);
        _CTR_remainingIndex.set(this, void 0);
        // The current counter
        _CTR_counter.set(this, void 0);
        __classPrivateFieldSet(this, _CTR_counter, new Uint8Array(16), "f");
        __classPrivateFieldGet(this, _CTR_counter, "f").fill(0);
        __classPrivateFieldSet(this, _CTR_remaining, __classPrivateFieldGet(this, _CTR_counter, "f"), "f"); // This will be discarded immediately
        __classPrivateFieldSet(this, _CTR_remainingIndex, 16, "f");
        if (initialValue == null) {
            initialValue = 1;
        }
        if (typeof initialValue === "number") {
            this.setCounterValue(initialValue);
        } else {
            this.setCounterBytes(initialValue);
        }
    }
    get counter() {
        return new Uint8Array(__classPrivateFieldGet(this, _CTR_counter, "f"));
    }
    setCounterValue(value) {
        if (!Number.isInteger(value) || value < 0 || value > Number.MAX_SAFE_INTEGER) {
            throw new TypeError("invalid counter initial integer value");
        }
        for(let index = 15; index >= 0; --index){
            __classPrivateFieldGet(this, _CTR_counter, "f")[index] = value % 256;
            value = Math.floor(value / 256);
        }
    }
    setCounterBytes(value) {
        if (value.length !== 16) {
            throw new TypeError("invalid counter initial Uint8Array value length");
        }
        __classPrivateFieldGet(this, _CTR_counter, "f").set(value);
    }
    increment() {
        for(let i = 15; i >= 0; i--){
            if (__classPrivateFieldGet(this, _CTR_counter, "f")[i] === 255) {
                __classPrivateFieldGet(this, _CTR_counter, "f")[i] = 0;
            } else {
                __classPrivateFieldGet(this, _CTR_counter, "f")[i]++;
                break;
            }
        }
    }
    encrypt(plaintext) {
        var _a, _b;
        const crypttext = new Uint8Array(plaintext);
        for(let i = 0; i < crypttext.length; i++){
            if (__classPrivateFieldGet(this, _CTR_remainingIndex, "f") === 16) {
                __classPrivateFieldSet(this, _CTR_remaining, this.aes.encrypt(__classPrivateFieldGet(this, _CTR_counter, "f")), "f");
                __classPrivateFieldSet(this, _CTR_remainingIndex, 0, "f");
                this.increment();
            }
            crypttext[i] ^= __classPrivateFieldGet(this, _CTR_remaining, "f")[__classPrivateFieldSet(this, _CTR_remainingIndex, (_b = __classPrivateFieldGet(this, _CTR_remainingIndex, "f"), _a = _b++, _b), "f"), _a];
        }
        return crypttext;
    }
    decrypt(ciphertext) {
        return this.encrypt(ciphertext);
    }
}
exports.CTR = CTR;
_CTR_remaining = new WeakMap(), _CTR_remainingIndex = new WeakMap(), _CTR_counter = new WeakMap(); //# sourceMappingURL=mode-ctr.js.map
}),
"[project]/node_modules/aes-js/lib.commonjs/mode-ecb.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Electronic Code Book
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ECB = void 0;
const mode_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/mode.js [app-ssr] (ecmascript)");
class ECB extends mode_js_1.ModeOfOperation {
    constructor(key){
        super("ECB", key, ECB);
    }
    encrypt(plaintext) {
        if (plaintext.length % 16) {
            throw new TypeError("invalid plaintext size (must be multiple of 16 bytes)");
        }
        const crypttext = new Uint8Array(plaintext.length);
        for(let i = 0; i < plaintext.length; i += 16){
            crypttext.set(this.aes.encrypt(plaintext.subarray(i, i + 16)), i);
        }
        return crypttext;
    }
    decrypt(crypttext) {
        if (crypttext.length % 16) {
            throw new TypeError("invalid ciphertext size (must be multiple of 16 bytes)");
        }
        const plaintext = new Uint8Array(crypttext.length);
        for(let i = 0; i < crypttext.length; i += 16){
            plaintext.set(this.aes.decrypt(crypttext.subarray(i, i + 16)), i);
        }
        return plaintext;
    }
}
exports.ECB = ECB; //# sourceMappingURL=mode-ecb.js.map
}),
"[project]/node_modules/aes-js/lib.commonjs/mode-ofb.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Output Feedback
var __classPrivateFieldSet = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _OFB_iv, _OFB_lastPrecipher, _OFB_lastPrecipherIndex;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OFB = void 0;
const mode_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/mode.js [app-ssr] (ecmascript)");
class OFB extends mode_js_1.ModeOfOperation {
    constructor(key, iv){
        super("OFB", key, OFB);
        _OFB_iv.set(this, void 0);
        _OFB_lastPrecipher.set(this, void 0);
        _OFB_lastPrecipherIndex.set(this, void 0);
        if (iv) {
            if (iv.length % 16) {
                throw new TypeError("invalid iv size (must be 16 bytes)");
            }
            __classPrivateFieldSet(this, _OFB_iv, new Uint8Array(iv), "f");
        } else {
            __classPrivateFieldSet(this, _OFB_iv, new Uint8Array(16), "f");
        }
        __classPrivateFieldSet(this, _OFB_lastPrecipher, this.iv, "f");
        __classPrivateFieldSet(this, _OFB_lastPrecipherIndex, 16, "f");
    }
    get iv() {
        return new Uint8Array(__classPrivateFieldGet(this, _OFB_iv, "f"));
    }
    encrypt(plaintext) {
        var _a, _b;
        if (plaintext.length % 16) {
            throw new TypeError("invalid plaintext size (must be multiple of 16 bytes)");
        }
        const ciphertext = new Uint8Array(plaintext);
        for(let i = 0; i < ciphertext.length; i++){
            if (__classPrivateFieldGet(this, _OFB_lastPrecipherIndex, "f") === 16) {
                __classPrivateFieldSet(this, _OFB_lastPrecipher, this.aes.encrypt(__classPrivateFieldGet(this, _OFB_lastPrecipher, "f")), "f");
                __classPrivateFieldSet(this, _OFB_lastPrecipherIndex, 0, "f");
            }
            ciphertext[i] ^= __classPrivateFieldGet(this, _OFB_lastPrecipher, "f")[__classPrivateFieldSet(this, _OFB_lastPrecipherIndex, (_b = __classPrivateFieldGet(this, _OFB_lastPrecipherIndex, "f"), _a = _b++, _b), "f"), _a];
        }
        return ciphertext;
    }
    decrypt(ciphertext) {
        if (ciphertext.length % 16) {
            throw new TypeError("invalid ciphertext size (must be multiple of 16 bytes)");
        }
        return this.encrypt(ciphertext);
    }
}
exports.OFB = OFB;
_OFB_iv = new WeakMap(), _OFB_lastPrecipher = new WeakMap(), _OFB_lastPrecipherIndex = new WeakMap(); //# sourceMappingURL=mode-ofb.js.map
}),
"[project]/node_modules/aes-js/lib.commonjs/padding.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pkcs7Strip = exports.pkcs7Pad = void 0;
function pkcs7Pad(data) {
    const padder = 16 - data.length % 16;
    const result = new Uint8Array(data.length + padder);
    result.set(data);
    for(let i = data.length; i < result.length; i++){
        result[i] = padder;
    }
    return result;
}
exports.pkcs7Pad = pkcs7Pad;
function pkcs7Strip(data) {
    if (data.length < 16) {
        throw new TypeError('PKCS#7 invalid length');
    }
    const padder = data[data.length - 1];
    if (padder > 16) {
        throw new TypeError('PKCS#7 padding byte out of range');
    }
    const length = data.length - padder;
    for(let i = 0; i < padder; i++){
        if (data[length + i] !== padder) {
            throw new TypeError('PKCS#7 invalid padding byte');
        }
    }
    return new Uint8Array(data.subarray(0, length));
}
exports.pkcs7Strip = pkcs7Strip; //# sourceMappingURL=padding.js.map
}),
"[project]/node_modules/aes-js/lib.commonjs/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pkcs7Strip = exports.pkcs7Pad = exports.OFB = exports.ECB = exports.CTR = exports.CFB = exports.CBC = exports.ModeOfOperation = exports.AES = void 0;
var aes_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/aes.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "AES", {
    enumerable: true,
    get: function() {
        return aes_js_1.AES;
    }
});
var mode_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/mode.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "ModeOfOperation", {
    enumerable: true,
    get: function() {
        return mode_js_1.ModeOfOperation;
    }
});
var mode_cbc_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/mode-cbc.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "CBC", {
    enumerable: true,
    get: function() {
        return mode_cbc_js_1.CBC;
    }
});
var mode_cfb_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/mode-cfb.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "CFB", {
    enumerable: true,
    get: function() {
        return mode_cfb_js_1.CFB;
    }
});
var mode_ctr_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/mode-ctr.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "CTR", {
    enumerable: true,
    get: function() {
        return mode_ctr_js_1.CTR;
    }
});
var mode_ecb_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/mode-ecb.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "ECB", {
    enumerable: true,
    get: function() {
        return mode_ecb_js_1.ECB;
    }
});
var mode_ofb_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/mode-ofb.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "OFB", {
    enumerable: true,
    get: function() {
        return mode_ofb_js_1.OFB;
    }
});
var padding_js_1 = __turbopack_context__.r("[project]/node_modules/aes-js/lib.commonjs/padding.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "pkcs7Pad", {
    enumerable: true,
    get: function() {
        return padding_js_1.pkcs7Pad;
    }
});
Object.defineProperty(exports, "pkcs7Strip", {
    enumerable: true,
    get: function() {
        return padding_js_1.pkcs7Strip;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@snowbridge/registry/dist/environment.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.environmentFor = environmentFor;
function environmentFor(env) {
    if (!(env in SNOWBRIDGE_ENV)) throw Error(`Unknown env '${env}'`);
    return SNOWBRIDGE_ENV[env];
}
const SNOWBRIDGE_ENV = {
    local_e2e: {
        name: "local_e2e",
        ethChainId: 11155111,
        beaconApiUrl: "http://127.0.0.1:9596",
        ethereumChains: {
            "11155111": "ws://127.0.0.1:8546"
        },
        relaychainUrl: "ws://127.0.0.1:9944",
        parachains: {
            "1000": "ws://127.0.0.1:12144",
            "1002": "ws://127.0.0.1:11144",
            "2000": "ws://127.0.0.1:13144"
        },
        gatewayContract: "0xb1185ede04202fe62d38f5db72f71e38ff3e8305",
        beefyContract: "0x83428c7db9815f482a39a1715684dcf755021997",
        assetHubParaId: 1000,
        bridgeHubParaId: 1002,
        v2_parachains: [
            1000
        ],
        indexerGraphQlUrl: "http://127.0.0.1/does/not/exist"
    },
    paseo_sepolia: {
        name: "paseo_sepolia",
        ethChainId: 11155111,
        beaconApiUrl: "https://lodestar-sepolia.chainsafe.io",
        ethereumChains: {
            "11155111": "https://ethereum-sepolia-rpc.publicnode.com"
        },
        relaychainUrl: "wss://paseo-rpc.dwellir.com",
        parachains: {
            "1000": "wss://asset-hub-paseo-rpc.dwellir.com",
            "1002": "wss://bridge-hub-paseo.dotters.network",
            "3369": "wss://paseo-muse-rpc.polkadot.io",
            "2043": `wss://parachain-testnet-rpc.origin-trail.network`
        },
        gatewayContract: "0x1607C1368bc943130258318c91bBd8cFf3D063E6",
        beefyContract: "0x2c780945beb1241fE9c645800110cb9C4bBbb639",
        assetHubParaId: 1000,
        bridgeHubParaId: 1002,
        v2_parachains: [
            1000
        ],
        indexerGraphQlUrl: "https://snowbridge.squids.live/snowbridge-subsquid-paseo@v1/api/graphql",
        metadataOverrides: {
            // Change the name of TRAC
            "0xef32abea56beff54f61da319a7311098d6fbcea9": {
                name: "OriginTrail TRAC",
                symbol: "TRAC"
            }
        }
    },
    polkadot_mainnet: {
        name: "polkadot_mainnet",
        ethChainId: 1,
        beaconApiUrl: "https://lodestar-mainnet.chainsafe.io",
        ethereumChains: {
            "1": "https://ethereum-rpc.publicnode.com",
            "1284": "https://rpc.api.moonbeam.network",
            "8453": "https://base-rpc.publicnode.com"
        },
        relaychainUrl: "https://polkadot-rpc.n.dwellir.com",
        parachains: {
            "1000": "wss://asset-hub-polkadot-rpc.n.dwellir.com",
            "1002": "https://bridge-hub-polkadot-rpc.n.dwellir.com",
            "3369": "wss://polkadot-mythos-rpc.polkadot.io",
            "2034": "wss://hydration-rpc.n.dwellir.com",
            "2030": "wss://bifrost-polkadot.ibp.network",
            "2004": "wss://moonbeam.ibp.network",
            "2000": "wss://acala-rpc-0.aca-api.network",
            "2043": "wss://parachain-rpc.origin-trail.network"
        },
        gatewayContract: "0x27ca963c279c93801941e1eb8799c23f407d68e7",
        beefyContract: "0x1817874feAb3ce053d0F40AbC23870DB35C2AFfc",
        assetHubParaId: 1000,
        bridgeHubParaId: 1002,
        v2_parachains: [
            1000
        ],
        indexerGraphQlUrl: "https://snowbridge.squids.live/snowbridge-subsquid-polkadot@v2/api/graphql",
        kusama: {
            assetHubParaId: 1000,
            bridgeHubParaId: 1002,
            parachains: {
                "1000": "wss://asset-hub-kusama-rpc.n.dwellir.com",
                "1002": "https://bridge-hub-kusama-rpc.n.dwellir.com"
            }
        },
        precompiles: {
            // Add override for mythos token and add precompile for moonbeam
            "2004": "0x000000000000000000000000000000000000081a"
        },
        metadataOverrides: {
            // Change the name of TRAC
            "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f": {
                name: "OriginTrail TRAC"
            }
        },
        l2Bridge: {
            acrossAPIUrl: "https://app.across.to/api",
            l1AdapterAddress: "0x313E8c9Fb47613f2B1A436bE978c2BB75727fcC5",
            l1HandlerAddress: "0x924a9f036260DdD5808007E1AA95f08eD08aA569",
            l1FeeTokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            l1SwapQuoterAddress: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
            l1SwapRouterAddress: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
            l2Chains: {
                "8453": {
                    adapterAddress: "0xCd5d2c665E3AC84bF5c67FE7a0C48748dA40db2F",
                    feeTokenAddress: "0x4200000000000000000000000000000000000006",
                    swapRoutes: [
                        // WETH
                        {
                            inputToken: "0x4200000000000000000000000000000000000006",
                            outputToken: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                            swapFee: 0
                        },
                        // USDC
                        {
                            inputToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                            outputToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                            swapFee: 500
                        }
                    ]
                }
            }
        }
    },
    westend_sepolia: {
        name: "westend_sepolia",
        ethChainId: 11155111,
        beaconApiUrl: "https://lodestar-sepolia.chainsafe.io",
        ethereumChains: {
            "11155111": "https://ethereum-sepolia-rpc.publicnode.com",
            "84532": "https://base-sepolia-rpc.publicnode.com"
        },
        relaychainUrl: "wss://westend-rpc.n.dwellir.com",
        parachains: {
            "1000": "wss://asset-hub-westend-rpc.n.dwellir.com",
            "1002": "wss://bridge-hub-westend-rpc.n.dwellir.com"
        },
        gatewayContract: "0x9ed8b47bc3417e3bd0507adc06e56e2fa360a4e9",
        beefyContract: "0xA04460B1D8bBef33F54edB2C3115e3E4D41237A6",
        assetHubParaId: 1000,
        bridgeHubParaId: 1002,
        v2_parachains: [
            1000
        ],
        indexerGraphQlUrl: "https://snowbridge.squids.live/snowbridge-subsquid-westend@v1/api/graphql",
        l2Bridge: {
            acrossAPIUrl: "https://testnet.across.to/api",
            l1AdapterAddress: "0xA5B8589bD534701be49916c4d2e634aB1c765Cbf",
            l1HandlerAddress: "0x924a9f036260DdD5808007E1AA95f08eD08aA569",
            l1FeeTokenAddress: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
            l1SwapRouterAddress: "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E",
            l1SwapQuoterAddress: "0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3",
            l2Chains: {
                "84532": {
                    adapterAddress: "0xf06939613A3838Af11104c898758220dB9093679",
                    feeTokenAddress: "0x4200000000000000000000000000000000000006",
                    swapRoutes: [
                        // WETH
                        {
                            inputToken: "0x4200000000000000000000000000000000000006",
                            outputToken: "0xfff9976782d46cc05630d1f6ebab18b2324d6b14",
                            swapFee: 0
                        },
                        // USDC
                        {
                            inputToken: "0x036cbd53842c5426634e7929541ec2318f3dcf7e",
                            outputToken: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
                            swapFee: 500
                        }
                    ]
                }
            }
        }
    }
};
}),
"[project]/node_modules/@snowbridge/registry/dist/polkadot_mainnet.registry.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"timestamp\":\"2026-01-19T12:15:32.614Z\",\"environment\":\"polkadot_mainnet\",\"ethChainId\":1,\"gatewayAddress\":\"0x27ca963c279c93801941e1eb8799c23f407d68e7\",\"assetHubParaId\":1000,\"bridgeHubParaId\":1002,\"relaychain\":{\"tokenSymbols\":\"DOT\",\"tokenDecimals\":10,\"ss58Format\":0,\"isEthereum\":false,\"accountType\":\"AccountId32\",\"name\":\"Polkadot\",\"specName\":\"polkadot\",\"specVersion\":2000001},\"bridgeHub\":{\"tokenSymbols\":\"DOT\",\"tokenDecimals\":10,\"ss58Format\":0,\"isEthereum\":false,\"accountType\":\"AccountId32\",\"name\":\"Polkadot BridgeHub\",\"specName\":\"bridge-hub-polkadot\",\"specVersion\":2000003},\"ethereumChains\":{\"1\":{\"chainId\":1,\"assets\":{\"0x9d39a5de30e57443bff2a8307a4256c8797a3497\":{\"token\":\"0x9d39a5de30e57443bff2a8307a4256c8797a3497\",\"name\":\"Staked USDe\",\"symbol\":\"sUSDe\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\":{\"token\":\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\",\"name\":\"Wrapped Ether\",\"symbol\":\"WETH\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x6982508145454ce325ddbe47a25d4ec3d2311933\":{\"token\":\"0x6982508145454ce325ddbe47a25d4ec3d2311933\",\"name\":\"Pepe\",\"symbol\":\"PEPE\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x5a98fcbea516cf06857215779fd812ca3bef1b32\":{\"token\":\"0x5a98fcbea516cf06857215779fd812ca3bef1b32\",\"name\":\"Lido DAO Token\",\"symbol\":\"LDO\",\"decimals\":18,\"deliveryGas\":\"bigint:150000\"},\"0x45804880de22913dafe09f4980848ece6ecbaf78\":{\"token\":\"0x45804880de22913dafe09f4980848ece6ecbaf78\",\"name\":\"Paxos Gold\",\"symbol\":\"PAXG\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0xcccccccccc33d538dbc2ee4feab0a7a1ff4e8a94\":{\"token\":\"0xcccccccccc33d538dbc2ee4feab0a7a1ff4e8a94\",\"name\":\"Centrifuge\",\"symbol\":\"CFG\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0xa3931d71877c0e7a3148cb7eb4463524fec27fbd\":{\"token\":\"0xa3931d71877c0e7a3148cb7eb4463524fec27fbd\",\"name\":\"Savings USDS\",\"symbol\":\"sUSDS\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x163f8c2467924be0ae7b5347228cabf260318753\":{\"token\":\"0x163f8c2467924be0ae7b5347228cabf260318753\",\"name\":\"Worldcoin\",\"symbol\":\"WLD\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x57e114b691db790c35207b2e685d4a43181e6061\":{\"token\":\"0x57e114b691db790c35207b2e685d4a43181e6061\",\"name\":\"ENA\",\"symbol\":\"ENA\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x8236a87084f8b84306f72007f36f2618a5634494\":{\"token\":\"0x8236a87084f8b84306f72007f36f2618a5634494\",\"name\":\"Lombard Staked Bitcoin\",\"symbol\":\"LBTC\",\"decimals\":8,\"deliveryGas\":\"bigint:80000\"},\"0x1abaea1f7c830bd89acc67ec4af516284b1bc33c\":{\"token\":\"0x1abaea1f7c830bd89acc67ec4af516284b1bc33c\",\"name\":\"Euro Coin\",\"symbol\":\"EURC\",\"decimals\":6,\"deliveryGas\":\"bigint:80000\"},\"0x56072c95faa701256059aa122697b133aded9279\":{\"token\":\"0x56072c95faa701256059aa122697b133aded9279\",\"name\":\"SKY Governance Token\",\"symbol\":\"SKY\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\":{\"token\":\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\",\"name\":\"USD Coin\",\"symbol\":\"USDC\",\"decimals\":6,\"deliveryGas\":\"bigint:80000\"},\"0xba41ddf06b7ffd89d1267b5a93bfef2424eb2003\":{\"token\":\"0xba41ddf06b7ffd89d1267b5a93bfef2424eb2003\",\"name\":\"Mythos\",\"symbol\":\"MYTH\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x0e186357c323c806c1efdad36d217f7a54b63d18\":{\"token\":\"0x0e186357c323c806c1efdad36d217f7a54b63d18\",\"name\":\"Curio Gas Token\",\"symbol\":\"CGT2.0\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f\":{\"token\":\"0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f\",\"name\":\"OriginTrail TRAC\",\"symbol\":\"TRAC\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x18084fba666a33d37592fa2633fd49a74dd93a88\":{\"token\":\"0x18084fba666a33d37592fa2633fd49a74dd93a88\",\"name\":\"tBTC v2\",\"symbol\":\"tBTC\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0\":{\"token\":\"0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0\",\"name\":\"Wrapped liquid staked Ether 2.0\",\"symbol\":\"wstETH\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0xe9f6d9898f9269b519e1435e6ebaff766c7f46bf\":{\"token\":\"0xe9f6d9898f9269b519e1435e6ebaff766c7f46bf\",\"name\":\"vTAO\",\"symbol\":\"vTAO\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x582d872a1b094fc48f5de31d3b73f2d9be47def1\":{\"token\":\"0x582d872a1b094fc48f5de31d3b73f2d9be47def1\",\"name\":\"Wrapped TON Coin\",\"symbol\":\"TONCOIN\",\"decimals\":9,\"deliveryGas\":\"bigint:80000\"},\"0x6b175474e89094c44da98b954eedeac495271d0f\":{\"token\":\"0x6b175474e89094c44da98b954eedeac495271d0f\",\"name\":\"Dai Stablecoin\",\"symbol\":\"DAI\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce\":{\"token\":\"0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce\",\"name\":\"SHIBA INU\",\"symbol\":\"SHIB\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x7de91b204c1c737bcee6f000aaa6569cf7061cb7\":{\"token\":\"0x7de91b204c1c737bcee6f000aaa6569cf7061cb7\",\"name\":\"Robonomics\",\"symbol\":\"XRT\",\"decimals\":9,\"deliveryGas\":\"bigint:80000\"},\"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599\":{\"token\":\"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599\",\"name\":\"Wrapped BTC\",\"symbol\":\"WBTC\",\"decimals\":8,\"deliveryGas\":\"bigint:80000\"},\"0x8daebade922df735c38c80c7ebd708af50815faa\":{\"token\":\"0x8daebade922df735c38c80c7ebd708af50815faa\",\"name\":\"tBTC\",\"symbol\":\"TBTC\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x0000000000000000000000000000000000000000\":{\"token\":\"0x0000000000000000000000000000000000000000\",\"name\":\"Ether\",\"symbol\":\"ETH\",\"decimals\":18},\"0x5d3d01fd6d2ad1169b17918eb4f153c6616288eb\":{\"token\":\"0x5d3d01fd6d2ad1169b17918eb4f153c6616288eb\",\"name\":\"KILT\",\"symbol\":\"KILT\",\"decimals\":15,\"deliveryGas\":\"bigint:80000\"},\"0xdac17f958d2ee523a2206206994597c13d831ec7\":{\"token\":\"0xdac17f958d2ee523a2206206994597c13d831ec7\",\"name\":\"Tether USD\",\"symbol\":\"USDT\",\"decimals\":6,\"deliveryGas\":\"bigint:80000\"},\"0x514910771af9ca656af840dff83e8264ecf986ca\":{\"token\":\"0x514910771af9ca656af840dff83e8264ecf986ca\",\"name\":\"ChainLink Token\",\"symbol\":\"LINK\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9\":{\"token\":\"0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9\",\"name\":\"Aave Token\",\"symbol\":\"AAVE\",\"decimals\":18,\"deliveryGas\":\"bigint:80000\"},\"0x196c20da81fbc324ecdf55501e95ce9f0bd84d14\":{\"token\":\"0x196c20da81fbc324ecdf55501e95ce9f0bd84d14\",\"name\":\"Polkadot\",\"symbol\":\"DOT\",\"decimals\":10,\"foreignId\":\"0x4e241583d94b5d48a27a22064cd49b2ed6f5231d2d950e432f9b7c2e0ade52b2\",\"deliveryGas\":\"bigint:80000\"},\"0x21fab0ea070f162180447881d5873cf3d57200d6\":{\"token\":\"0x21fab0ea070f162180447881d5873cf3d57200d6\",\"name\":\"Kolkadot\",\"symbol\":\"KOL\",\"decimals\":12,\"foreignId\":\"0xad050334b66c8d3abaac7ef6667e97e3e6f4a25d9b7b4765133290f0dc19aa6e\",\"deliveryGas\":\"bigint:80000\"},\"0x12bbfdc9e813614eef8dc8a2560b0efbeaf7c2ab\":{\"token\":\"0x12bbfdc9e813614eef8dc8a2560b0efbeaf7c2ab\",\"name\":\"Kusama\",\"symbol\":\"KSM\",\"decimals\":12,\"foreignId\":\"0x03b6054d0c576dd8391e34e1609cf398f68050c23009d19ce93c000922bcd852\",\"deliveryGas\":\"bigint:80000\"},\"0x5fdcd48f09fb67de3d202cd854b372aec1100ed5\":{\"token\":\"0x5fdcd48f09fb67de3d202cd854b372aec1100ed5\",\"name\":\"GAVUN WUD\",\"symbol\":\"WUD\",\"decimals\":10,\"foreignId\":\"0x7ca757304cac2ff0881de18dc6a1dfa7f10e51b0cba0297e0e762f8072049c98\",\"deliveryGas\":\"bigint:80000\"},\"0xa37b046782518a80e2e69056009fbd0431d36e50\":{\"token\":\"0xa37b046782518a80e2e69056009fbd0431d36e50\",\"name\":\"PINK\",\"symbol\":\"PINK\",\"decimals\":10,\"foreignId\":\"0xbc8785969587ef3d22739d3385cb519a9e0133dd5da8d320c376772468c19be6\",\"deliveryGas\":\"bigint:80000\"},\"0x769916a66fdac0e3d57363129caac59386ea622b\":{\"token\":\"0x769916a66fdac0e3d57363129caac59386ea622b\",\"name\":\"Integritee TEER\",\"symbol\":\"TEER\",\"decimals\":12,\"foreignId\":\"0x3b7f577715347bdcde4739a1bf1a7f1dec71e8ff4dbe23a6a49348ebf920c658\",\"deliveryGas\":\"bigint:80000\"},\"0x92262680a8d6636bba9bffdf484c274ca2de6400\":{\"token\":\"0x92262680a8d6636bba9bffdf484c274ca2de6400\",\"name\":\"DED\",\"symbol\":\"DED\",\"decimals\":10,\"foreignId\":\"0x536917d1276896038c09bb6499bd0d7197e609983ec22e9ca4e75b394b23752b\",\"deliveryGas\":\"bigint:80000\"}},\"id\":\"mainnet\",\"baseDeliveryGas\":\"bigint:120000\"},\"1284\":{\"chainId\":1284,\"evmParachainId\":2004,\"assets\":{\"0xffffffff86829afe1521ad2296719df3ace8ded7\":{\"token\":\"0xffffffff86829afe1521ad2296719df3ace8ded7\",\"name\":\"Snowbridge WETH\",\"symbol\":\"WETH.e\",\"decimals\":18},\"0xffffffff5d5deb44bf7278dee5381beb24cb6573\":{\"token\":\"0xffffffff5d5deb44bf7278dee5381beb24cb6573\",\"name\":\"Snowbridge wstETH\",\"symbol\":\"wstETH.e\",\"decimals\":18},\"0xffffffff1b4bb1ac5749f73d866ffc91a3432c47\":{\"token\":\"0xffffffff1b4bb1ac5749f73d866ffc91a3432c47\",\"name\":\"Snowbridge WBTC\",\"symbol\":\"WBTC.e\",\"decimals\":8},\"0xffffffff9de12e6658c49b4834f9278f6a39f5d7\":{\"token\":\"0xffffffff9de12e6658c49b4834f9278f6a39f5d7\",\"name\":\"Snowbridge DAI\",\"symbol\":\"DAI.e\",\"decimals\":18},\"0xffffffff166f84967f054ae95ab5764c38cf3aed\":{\"token\":\"0xffffffff166f84967f054ae95ab5764c38cf3aed\",\"name\":\"Snowbridge USDC\",\"symbol\":\"USDC.e\",\"decimals\":6},\"0xffffffffaff6df83d0a1935dda2e5f1f402c0c45\":{\"token\":\"0xffffffffaff6df83d0a1935dda2e5f1f402c0c45\",\"name\":\"Snowbridge ETH\",\"symbol\":\"ETH.e\",\"decimals\":18},\"0xffffffff7bc304425217b49e9598415c514ae81b\":{\"token\":\"0xffffffff7bc304425217b49e9598415c514ae81b\",\"name\":\"Snowbridge USDT\",\"symbol\":\"USDT.e\",\"decimals\":6},\"0xffffffff1fcacbd218edc0eba20fc2308c778080\":{\"token\":\"0xffffffff1fcacbd218edc0eba20fc2308c778080\",\"name\":\"xcDOT\",\"symbol\":\"xcDOT\",\"decimals\":10}},\"precompile\":\"0x000000000000000000000000000000000000081a\",\"xcDOT\":\"0xffffffff1fcacbd218edc0eba20fc2308c778080\",\"xcTokenMap\":{\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\":\"0xffffffff86829afe1521ad2296719df3ace8ded7\",\"0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0\":\"0xffffffff5d5deb44bf7278dee5381beb24cb6573\",\"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599\":\"0xffffffff1b4bb1ac5749f73d866ffc91a3432c47\",\"0x6b175474e89094c44da98b954eedeac495271d0f\":\"0xffffffff9de12e6658c49b4834f9278f6a39f5d7\",\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\":\"0xffffffff166f84967f054ae95ab5764c38cf3aed\",\"0x0000000000000000000000000000000000000000\":\"0xffffffffaff6df83d0a1935dda2e5f1f402c0c45\",\"0xdac17f958d2ee523a2206206994597c13d831ec7\":\"0xffffffff7bc304425217b49e9598415c514ae81b\"},\"id\":\"evm_moonbeam\"},\"8453\":{\"chainId\":8453,\"assets\":{\"0x4200000000000000000000000000000000000006\":{\"token\":\"0x4200000000000000000000000000000000000006\",\"name\":\"Wrapped Ether\",\"symbol\":\"WETH\",\"decimals\":18,\"swapTokenAddress\":\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\",\"swapFee\":0},\"0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913\":{\"token\":\"0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913\",\"name\":\"USD Coin\",\"symbol\":\"USDC\",\"decimals\":6,\"swapTokenAddress\":\"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\",\"swapFee\":500},\"0x0000000000000000000000000000000000000000\":{\"token\":\"0x0000000000000000000000000000000000000000\",\"name\":\"Ether\",\"symbol\":\"Ether\",\"decimals\":18,\"swapTokenAddress\":\"0x0000000000000000000000000000000000000000\",\"swapFee\":0}},\"id\":\"base\"}},\"parachains\":{\"1000\":{\"parachainId\":1000,\"features\":{\"hasPalletXcm\":true,\"hasDryRunApi\":true,\"hasTxPaymentApi\":true,\"hasDryRunRpc\":true,\"hasDotBalance\":true,\"hasEthBalance\":true,\"hasXcmPaymentApi\":true,\"supportsAliasOrigin\":true,\"xcmVersion\":\"v5\",\"supportsV2\":true},\"info\":{\"tokenSymbols\":\"DOT\",\"tokenDecimals\":10,\"ss58Format\":0,\"isEthereum\":false,\"accountType\":\"AccountId32\",\"name\":\"Polkadot Asset Hub\",\"specName\":\"statemint\",\"specVersion\":2000003},\"assets\":{\"0x9d39a5de30e57443bff2a8307a4256c8797a3497\":{\"token\":\"0x9d39a5de30e57443bff2a8307a4256c8797a3497\",\"name\":\"Staked USDe\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"sUSDe\",\"decimals\":18,\"isSufficient\":false},\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\":{\"token\":\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\",\"name\":\"Wrapped Ether\",\"minimumBalance\":\"bigint:15000000000000\",\"symbol\":\"WETH\",\"decimals\":18,\"isSufficient\":true},\"0x6982508145454ce325ddbe47a25d4ec3d2311933\":{\"token\":\"0x6982508145454ce325ddbe47a25d4ec3d2311933\",\"name\":\"Pepe\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"PEPE\",\"decimals\":18,\"isSufficient\":false},\"0x5a98fcbea516cf06857215779fd812ca3bef1b32\":{\"token\":\"0x5a98fcbea516cf06857215779fd812ca3bef1b32\",\"name\":\"Lido DAO Token\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"LDO\",\"decimals\":18,\"isSufficient\":false},\"0x45804880de22913dafe09f4980848ece6ecbaf78\":{\"token\":\"0x45804880de22913dafe09f4980848ece6ecbaf78\",\"name\":\"\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"\",\"decimals\":0,\"isSufficient\":false},\"0xcccccccccc33d538dbc2ee4feab0a7a1ff4e8a94\":{\"token\":\"0xcccccccccc33d538dbc2ee4feab0a7a1ff4e8a94\",\"name\":\"\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"\",\"decimals\":0,\"isSufficient\":false},\"0xa3931d71877c0e7a3148cb7eb4463524fec27fbd\":{\"token\":\"0xa3931d71877c0e7a3148cb7eb4463524fec27fbd\",\"name\":\"Savings USDS\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"sUSDS\",\"decimals\":18,\"isSufficient\":false},\"0x163f8c2467924be0ae7b5347228cabf260318753\":{\"token\":\"0x163f8c2467924be0ae7b5347228cabf260318753\",\"name\":\"\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"\",\"decimals\":0,\"isSufficient\":false},\"0x57e114b691db790c35207b2e685d4a43181e6061\":{\"token\":\"0x57e114b691db790c35207b2e685d4a43181e6061\",\"name\":\"\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"\",\"decimals\":0,\"isSufficient\":false},\"0x8236a87084f8b84306f72007f36f2618a5634494\":{\"token\":\"0x8236a87084f8b84306f72007f36f2618a5634494\",\"name\":\"Lombard Staked Bitcoin\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"LBTC\",\"decimals\":8,\"isSufficient\":false},\"0x1abaea1f7c830bd89acc67ec4af516284b1bc33c\":{\"token\":\"0x1abaea1f7c830bd89acc67ec4af516284b1bc33c\",\"name\":\"Euro Coin\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"EURC\",\"decimals\":6,\"isSufficient\":false},\"0x56072c95faa701256059aa122697b133aded9279\":{\"token\":\"0x56072c95faa701256059aa122697b133aded9279\",\"name\":\"SKY Governance Token\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"SKY\",\"decimals\":18,\"isSufficient\":false},\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\":{\"token\":\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\",\"name\":\"USDC (Snowbridge)\",\"minimumBalance\":\"bigint:10000\",\"symbol\":\"USDC\",\"decimals\":6,\"isSufficient\":true},\"0xba41ddf06b7ffd89d1267b5a93bfef2424eb2003\":{\"token\":\"0xba41ddf06b7ffd89d1267b5a93bfef2424eb2003\",\"name\":\"Mythos\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"MYTH\",\"decimals\":18,\"isSufficient\":false},\"0x0e186357c323c806c1efdad36d217f7a54b63d18\":{\"token\":\"0x0e186357c323c806c1efdad36d217f7a54b63d18\",\"name\":\"Curio Gas Token\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"CGT2.0\",\"decimals\":18,\"isSufficient\":false},\"0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f\":{\"token\":\"0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f\",\"name\":\"OriginTrail TRAC\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"TRAC\",\"decimals\":18,\"isSufficient\":false},\"0x18084fba666a33d37592fa2633fd49a74dd93a88\":{\"token\":\"0x18084fba666a33d37592fa2633fd49a74dd93a88\",\"name\":\"tBTC v2\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"tBTC\",\"decimals\":18,\"isSufficient\":false},\"0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0\":{\"token\":\"0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0\",\"name\":\"Wrapped liquid staked Ether 2.0\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"wstETH\",\"decimals\":18,\"isSufficient\":false},\"0xe9f6d9898f9269b519e1435e6ebaff766c7f46bf\":{\"token\":\"0xe9f6d9898f9269b519e1435e6ebaff766c7f46bf\",\"name\":\"\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"\",\"decimals\":0,\"isSufficient\":false},\"0x582d872a1b094fc48f5de31d3b73f2d9be47def1\":{\"token\":\"0x582d872a1b094fc48f5de31d3b73f2d9be47def1\",\"name\":\"Wrapped TON Coin\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"TONCOIN\",\"decimals\":9,\"isSufficient\":false},\"0x6b175474e89094c44da98b954eedeac495271d0f\":{\"token\":\"0x6b175474e89094c44da98b954eedeac495271d0f\",\"name\":\"Dai Stablecoin\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"DAI\",\"decimals\":18,\"isSufficient\":false},\"0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce\":{\"token\":\"0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce\",\"name\":\"SHIBA INU\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"SHIB\",\"decimals\":18,\"isSufficient\":false},\"0x7de91b204c1c737bcee6f000aaa6569cf7061cb7\":{\"token\":\"0x7de91b204c1c737bcee6f000aaa6569cf7061cb7\",\"name\":\"Robonomics\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"XRT\",\"decimals\":9,\"isSufficient\":false},\"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599\":{\"token\":\"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599\",\"name\":\"Wrapped BTC\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"WBTC\",\"decimals\":8,\"isSufficient\":false},\"0x8daebade922df735c38c80c7ebd708af50815faa\":{\"token\":\"0x8daebade922df735c38c80c7ebd708af50815faa\",\"name\":\"tBTC\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"TBTC\",\"decimals\":18,\"isSufficient\":false},\"0x0000000000000000000000000000000000000000\":{\"token\":\"0x0000000000000000000000000000000000000000\",\"name\":\"Ether\",\"minimumBalance\":\"bigint:15000000000000\",\"symbol\":\"ETH\",\"decimals\":18,\"isSufficient\":true},\"0x5d3d01fd6d2ad1169b17918eb4f153c6616288eb\":{\"token\":\"0x5d3d01fd6d2ad1169b17918eb4f153c6616288eb\",\"name\":\"KILT\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"KILT\",\"decimals\":15,\"isSufficient\":false},\"0xdac17f958d2ee523a2206206994597c13d831ec7\":{\"token\":\"0xdac17f958d2ee523a2206206994597c13d831ec7\",\"name\":\"Tether USD (Snowbridge)\",\"minimumBalance\":\"bigint:10000\",\"symbol\":\"USDT\",\"decimals\":6,\"isSufficient\":true},\"0x514910771af9ca656af840dff83e8264ecf986ca\":{\"token\":\"0x514910771af9ca656af840dff83e8264ecf986ca\",\"name\":\"ChainLink Token\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"LINK\",\"decimals\":18,\"isSufficient\":false},\"0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9\":{\"token\":\"0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9\",\"name\":\"Aave Token\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"AAVE\",\"decimals\":18,\"isSufficient\":false},\"0x196c20da81fbc324ecdf55501e95ce9f0bd84d14\":{\"token\":\"0x196c20da81fbc324ecdf55501e95ce9f0bd84d14\",\"name\":\"\",\"symbol\":\"DOT\",\"decimals\":10,\"locationOnEthereum\":{\"parents\":1,\"interior\":{\"x1\":[{\"globalConsensus\":{\"polkadot\":null}}]}},\"location\":{\"parents\":1,\"interior\":\"Here\"},\"locationOnAH\":{\"parents\":1,\"interior\":\"Here\"},\"foreignId\":\"0x4e241583d94b5d48a27a22064cd49b2ed6f5231d2d950e432f9b7c2e0ade52b2\",\"minimumBalance\":\"bigint:100000000\",\"isSufficient\":true},\"0x21fab0ea070f162180447881d5873cf3d57200d6\":{\"token\":\"0x21fab0ea070f162180447881d5873cf3d57200d6\",\"name\":\"Kolkadot\",\"symbol\":\"KOL\",\"decimals\":12,\"locationOnEthereum\":{\"parents\":1,\"interior\":{\"x4\":[{\"globalConsensus\":{\"polkadot\":null}},{\"parachain\":1000},{\"palletInstance\":50},{\"generalIndex\":86}]}},\"location\":{\"parents\":0,\"interior\":{\"x2\":[{\"palletInstance\":50},{\"generalIndex\":86}]}},\"locationOnAH\":{\"parents\":0,\"interior\":{\"x2\":[{\"palletInstance\":50},{\"generalIndex\":86}]}},\"foreignId\":\"0xad050334b66c8d3abaac7ef6667e97e3e6f4a25d9b7b4765133290f0dc19aa6e\",\"minimumBalance\":\"bigint:1000000000000\",\"isSufficient\":false,\"assetId\":\"86\"},\"0x12bbfdc9e813614eef8dc8a2560b0efbeaf7c2ab\":{\"token\":\"0x12bbfdc9e813614eef8dc8a2560b0efbeaf7c2ab\",\"name\":\"Kusama\",\"symbol\":\"KSM\",\"decimals\":12,\"locationOnEthereum\":{\"parents\":1,\"interior\":{\"x1\":[{\"globalConsensus\":{\"kusama\":null}}]}},\"location\":{\"parents\":2,\"interior\":{\"x1\":[{\"globalConsensus\":{\"kusama\":null}}]}},\"locationOnAH\":{\"parents\":2,\"interior\":{\"x1\":[{\"globalConsensus\":{\"kusama\":null}}]}},\"foreignId\":\"0x03b6054d0c576dd8391e34e1609cf398f68050c23009d19ce93c000922bcd852\",\"minimumBalance\":\"bigint:1000000000\",\"isSufficient\":true},\"0x5fdcd48f09fb67de3d202cd854b372aec1100ed5\":{\"token\":\"0x5fdcd48f09fb67de3d202cd854b372aec1100ed5\",\"name\":\"GAVUN WUD\",\"symbol\":\"WUD\",\"decimals\":10,\"locationOnEthereum\":{\"parents\":1,\"interior\":{\"x4\":[{\"globalConsensus\":{\"polkadot\":null}},{\"parachain\":1000},{\"palletInstance\":50},{\"generalIndex\":31337}]}},\"location\":{\"parents\":0,\"interior\":{\"x2\":[{\"palletInstance\":50},{\"generalIndex\":31337}]}},\"locationOnAH\":{\"parents\":0,\"interior\":{\"x2\":[{\"palletInstance\":50},{\"generalIndex\":31337}]}},\"foreignId\":\"0x7ca757304cac2ff0881de18dc6a1dfa7f10e51b0cba0297e0e762f8072049c98\",\"minimumBalance\":\"bigint:10000000\",\"isSufficient\":false,\"assetId\":\"31337\"},\"0xa37b046782518a80e2e69056009fbd0431d36e50\":{\"token\":\"0xa37b046782518a80e2e69056009fbd0431d36e50\",\"name\":\"PINK\",\"symbol\":\"PINK\",\"decimals\":10,\"locationOnEthereum\":{\"parents\":1,\"interior\":{\"x4\":[{\"globalConsensus\":{\"polkadot\":null}},{\"parachain\":1000},{\"palletInstance\":50},{\"generalIndex\":23}]}},\"location\":{\"parents\":0,\"interior\":{\"x2\":[{\"palletInstance\":50},{\"generalIndex\":23}]}},\"locationOnAH\":{\"parents\":0,\"interior\":{\"x2\":[{\"palletInstance\":50},{\"generalIndex\":23}]}},\"foreignId\":\"0xbc8785969587ef3d22739d3385cb519a9e0133dd5da8d320c376772468c19be6\",\"minimumBalance\":\"bigint:1\",\"isSufficient\":false,\"assetId\":\"23\"},\"0x769916a66fdac0e3d57363129caac59386ea622b\":{\"token\":\"0x769916a66fdac0e3d57363129caac59386ea622b\",\"name\":\"Integritee TEER\",\"symbol\":\"TEER\",\"decimals\":12,\"locationOnEthereum\":{\"parents\":1,\"interior\":{\"x2\":[{\"globalConsensus\":{\"polkadot\":null}},{\"parachain\":2039}]}},\"location\":{\"parents\":1,\"interior\":{\"x1\":[{\"parachain\":2039}]}},\"locationOnAH\":{\"parents\":1,\"interior\":{\"x1\":[{\"parachain\":2039}]}},\"foreignId\":\"0x3b7f577715347bdcde4739a1bf1a7f1dec71e8ff4dbe23a6a49348ebf920c658\",\"minimumBalance\":\"bigint:1000000000\",\"isSufficient\":false},\"0x92262680a8d6636bba9bffdf484c274ca2de6400\":{\"token\":\"0x92262680a8d6636bba9bffdf484c274ca2de6400\",\"name\":\"DED\",\"symbol\":\"DED\",\"decimals\":10,\"locationOnEthereum\":{\"parents\":1,\"interior\":{\"x4\":[{\"globalConsensus\":{\"polkadot\":null}},{\"parachain\":1000},{\"palletInstance\":50},{\"generalIndex\":30}]}},\"location\":{\"parents\":0,\"interior\":{\"x2\":[{\"palletInstance\":50},{\"generalIndex\":30}]}},\"locationOnAH\":{\"parents\":0,\"interior\":{\"x2\":[{\"palletInstance\":50},{\"generalIndex\":30}]}},\"foreignId\":\"0x536917d1276896038c09bb6499bd0d7197e609983ec22e9ca4e75b394b23752b\",\"minimumBalance\":\"bigint:1\",\"isSufficient\":false,\"assetId\":\"30\"}},\"estimatedExecutionFeeDOT\":\"bigint:0\",\"estimatedDeliveryFeeDOT\":\"bigint:0\"},\"2000\":{\"parachainId\":2000,\"features\":{\"hasPalletXcm\":true,\"hasDryRunApi\":true,\"hasTxPaymentApi\":true,\"hasDryRunRpc\":true,\"hasDotBalance\":true,\"hasEthBalance\":true,\"hasXcmPaymentApi\":true,\"supportsAliasOrigin\":true,\"xcmVersion\":\"v5\",\"supportsV2\":false},\"info\":{\"tokenSymbols\":\"ACA\",\"tokenDecimals\":12,\"ss58Format\":10,\"isEthereum\":false,\"accountType\":\"AccountId32\",\"name\":\"Acala\",\"specName\":\"acala\",\"specVersion\":2330},\"assets\":{\"0x0000000000000000000000000000000000000000\":{\"token\":\"0x0000000000000000000000000000000000000000\",\"name\":\"Ether\",\"minimumBalance\":\"bigint:10000000000000\",\"symbol\":\"ETH\",\"decimals\":18,\"isSufficient\":false}},\"estimatedExecutionFeeDOT\":\"bigint:300000000\",\"estimatedDeliveryFeeDOT\":\"bigint:307100000\"},\"2004\":{\"parachainId\":2004,\"features\":{\"hasPalletXcm\":true,\"hasDryRunApi\":true,\"hasTxPaymentApi\":true,\"hasDryRunRpc\":true,\"hasDotBalance\":true,\"hasEthBalance\":false,\"hasXcmPaymentApi\":true,\"supportsAliasOrigin\":false,\"xcmVersion\":\"v5\",\"supportsV2\":false},\"info\":{\"tokenSymbols\":\"GLMR\",\"tokenDecimals\":18,\"ss58Format\":1284,\"isEthereum\":false,\"accountType\":\"AccountId20\",\"evmChainId\":1284,\"name\":\"Moonbeam\",\"specName\":\"moonbeam\",\"specVersion\":4001},\"xcDOT\":\"0xffffffff1fcacbd218edc0eba20fc2308c778080\",\"assets\":{\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\":{\"token\":\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\",\"name\":\"Snowbridge WETH\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"WETH.e\",\"decimals\":18,\"isSufficient\":true,\"xc20\":\"0xffffffff86829afe1521ad2296719df3ace8ded7\"},\"0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0\":{\"token\":\"0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0\",\"name\":\"Snowbridge wstETH\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"wstETH.e\",\"decimals\":18,\"isSufficient\":true,\"xc20\":\"0xffffffff5d5deb44bf7278dee5381beb24cb6573\"},\"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599\":{\"token\":\"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599\",\"name\":\"Snowbridge WBTC\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"WBTC.e\",\"decimals\":8,\"isSufficient\":true,\"xc20\":\"0xffffffff1b4bb1ac5749f73d866ffc91a3432c47\"},\"0x6b175474e89094c44da98b954eedeac495271d0f\":{\"token\":\"0x6b175474e89094c44da98b954eedeac495271d0f\",\"name\":\"Snowbridge DAI\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"DAI.e\",\"decimals\":18,\"isSufficient\":true,\"xc20\":\"0xffffffff9de12e6658c49b4834f9278f6a39f5d7\"},\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\":{\"token\":\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\",\"name\":\"Snowbridge USDC\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"USDC.e\",\"decimals\":6,\"isSufficient\":true,\"xc20\":\"0xffffffff166f84967f054ae95ab5764c38cf3aed\"},\"0x0000000000000000000000000000000000000000\":{\"token\":\"0x0000000000000000000000000000000000000000\",\"name\":\"Snowbridge ETH\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"ETH.e\",\"decimals\":18,\"isSufficient\":true,\"xc20\":\"0xffffffffaff6df83d0a1935dda2e5f1f402c0c45\"},\"0xdac17f958d2ee523a2206206994597c13d831ec7\":{\"token\":\"0xdac17f958d2ee523a2206206994597c13d831ec7\",\"name\":\"Snowbridge USDT\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"USDT.e\",\"decimals\":6,\"isSufficient\":true,\"xc20\":\"0xffffffff7bc304425217b49e9598415c514ae81b\"}},\"estimatedExecutionFeeDOT\":\"bigint:105696134\",\"estimatedDeliveryFeeDOT\":\"bigint:306500000\"},\"2030\":{\"parachainId\":2030,\"features\":{\"hasPalletXcm\":true,\"hasDryRunApi\":true,\"hasTxPaymentApi\":true,\"hasDryRunRpc\":true,\"hasDotBalance\":true,\"hasEthBalance\":true,\"hasXcmPaymentApi\":true,\"supportsAliasOrigin\":true,\"xcmVersion\":\"v5\",\"supportsV2\":false},\"info\":{\"tokenSymbols\":\"BNC\",\"tokenDecimals\":12,\"ss58Format\":0,\"isEthereum\":false,\"accountType\":\"AccountId32\",\"evmChainId\":996,\"name\":\"Bifrost Polkadot\",\"specName\":\"bifrost_polkadot\",\"specVersion\":23000},\"assets\":{\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\":{\"token\":\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\",\"name\":\"Wrapped ETH\",\"minimumBalance\":\"bigint:15000000000000\",\"symbol\":\"WETH\",\"decimals\":18,\"isSufficient\":false},\"0x0000000000000000000000000000000000000000\":{\"token\":\"0x0000000000000000000000000000000000000000\",\"name\":\"Native ETH\",\"minimumBalance\":\"bigint:15000000000000\",\"symbol\":\"ETH\",\"decimals\":18,\"isSufficient\":false}},\"estimatedExecutionFeeDOT\":\"bigint:94936522\",\"estimatedDeliveryFeeDOT\":\"bigint:307100000\"},\"2034\":{\"parachainId\":2034,\"features\":{\"hasPalletXcm\":true,\"hasDryRunApi\":true,\"hasTxPaymentApi\":true,\"hasDryRunRpc\":true,\"hasDotBalance\":true,\"hasEthBalance\":false,\"hasXcmPaymentApi\":true,\"supportsAliasOrigin\":false,\"xcmVersion\":\"v4\",\"supportsV2\":false},\"info\":{\"tokenSymbols\":\"HDX\",\"tokenDecimals\":12,\"ss58Format\":0,\"isEthereum\":false,\"accountType\":\"AccountId32\",\"evmChainId\":222222,\"name\":\"Hydration\",\"specName\":\"hydradx\",\"specVersion\":378},\"assets\":{\"0x45804880de22913dafe09f4980848ece6ecbaf78\":{\"token\":\"0x45804880de22913dafe09f4980848ece6ecbaf78\",\"name\":\"PAX Gold\",\"minimumBalance\":\"bigint:2374169040836\",\"symbol\":\"PAXG\",\"decimals\":18,\"isSufficient\":true},\"0x57e114b691db790c35207b2e685d4a43181e6061\":{\"token\":\"0x57e114b691db790c35207b2e685d4a43181e6061\",\"name\":\"Ethena\",\"minimumBalance\":\"bigint:17337031900138700\",\"symbol\":\"ENA\",\"decimals\":18,\"isSufficient\":true},\"0x0000000000000000000000000000000000000000\":{\"token\":\"0x0000000000000000000000000000000000000000\",\"name\":\"Ethereum\",\"minimumBalance\":\"bigint:5373455131650\",\"symbol\":\"ETH\",\"decimals\":18,\"isSufficient\":true},\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\":{\"token\":\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\",\"name\":\"USDC (Ethereum native)\",\"minimumBalance\":\"bigint:10000\",\"symbol\":\"USDC\",\"decimals\":6,\"isSufficient\":true},\"0x5a98fcbea516cf06857215779fd812ca3bef1b32\":{\"token\":\"0x5a98fcbea516cf06857215779fd812ca3bef1b32\",\"name\":\"Lido\",\"minimumBalance\":\"bigint:5102040816326530\",\"symbol\":\"LDO\",\"decimals\":18,\"isSufficient\":true},\"0x56072c95faa701256059aa122697b133aded9279\":{\"token\":\"0x56072c95faa701256059aa122697b133aded9279\",\"name\":\"SKY\",\"minimumBalance\":\"bigint:211685012701101000\",\"symbol\":\"SKY\",\"decimals\":18,\"isSufficient\":true},\"0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f\":{\"token\":\"0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f\",\"name\":\"OriginTrail\",\"minimumBalance\":\"bigint:27777777777777800\",\"symbol\":\"TRAC\",\"decimals\":18,\"isSufficient\":true},\"0xe9f6d9898f9269b519e1435e6ebaff766c7f46bf\":{\"token\":\"0xe9f6d9898f9269b519e1435e6ebaff766c7f46bf\",\"name\":\"\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"\",\"decimals\":0,\"isSufficient\":false},\"0xcccccccccc33d538dbc2ee4feab0a7a1ff4e8a94\":{\"token\":\"0xcccccccccc33d538dbc2ee4feab0a7a1ff4e8a94\",\"name\":\"Centrifuge\",\"minimumBalance\":\"bigint:36297640653357500\",\"symbol\":\"CFG\",\"decimals\":18,\"isSufficient\":true},\"0x514910771af9ca656af840dff83e8264ecf986ca\":{\"token\":\"0x514910771af9ca656af840dff83e8264ecf986ca\",\"name\":\"Chainlink\",\"minimumBalance\":\"bigint:436681222707424\",\"symbol\":\"LINK\",\"decimals\":18,\"isSufficient\":true},\"0x9d39a5de30e57443bff2a8307a4256c8797a3497\":{\"token\":\"0x9d39a5de30e57443bff2a8307a4256c8797a3497\",\"name\":\"Ethena Staked USDe\",\"minimumBalance\":\"bigint:8928571428571430\",\"symbol\":\"sUSDe\",\"decimals\":18,\"isSufficient\":true},\"0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9\":{\"token\":\"0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9\",\"name\":\"AAVE\",\"minimumBalance\":\"bigint:59084194977843\",\"symbol\":\"AAVE\",\"decimals\":18,\"isSufficient\":true},\"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599\":{\"token\":\"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599\",\"name\":\"Wrapped Bitcoin\",\"minimumBalance\":\"bigint:23\",\"symbol\":\"WBTC\",\"decimals\":8,\"isSufficient\":true},\"0xa3931d71877c0e7a3148cb7eb4463524fec27fbd\":{\"token\":\"0xa3931d71877c0e7a3148cb7eb4463524fec27fbd\",\"name\":\"Savings USDS\",\"minimumBalance\":\"bigint:9910802775024780\",\"symbol\":\"sUSDS\",\"decimals\":18,\"isSufficient\":true},\"0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0\":{\"token\":\"0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0\",\"name\":\"Wrapped staked ETH\",\"minimumBalance\":\"bigint:3244646333550\",\"symbol\":\"wstETH\",\"decimals\":18,\"isSufficient\":true},\"0xdac17f958d2ee523a2206206994597c13d831ec7\":{\"token\":\"0xdac17f958d2ee523a2206206994597c13d831ec7\",\"name\":\"Tether (Ethereum native)\",\"minimumBalance\":\"bigint:10000\",\"symbol\":\"USDT\",\"decimals\":6,\"isSufficient\":true},\"0x18084fba666a33d37592fa2633fd49a74dd93a88\":{\"token\":\"0x18084fba666a33d37592fa2633fd49a74dd93a88\",\"name\":\"Threshold BTC\",\"minimumBalance\":\"bigint:106803374987\",\"symbol\":\"tBTC\",\"decimals\":18,\"isSufficient\":true},\"0x8236a87084f8b84306f72007f36f2618a5634494\":{\"token\":\"0x8236a87084f8b84306f72007f36f2618a5634494\",\"name\":\"Lombard Staked BTC\",\"minimumBalance\":\"bigint:11\",\"symbol\":\"LBTC\",\"decimals\":8,\"isSufficient\":true},\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\":{\"token\":\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\",\"name\":\"Wrapped Ethereum\",\"minimumBalance\":\"bigint:6009615384615\",\"symbol\":\"WETH\",\"decimals\":18,\"isSufficient\":true}},\"estimatedExecutionFeeDOT\":\"bigint:1774411\",\"estimatedDeliveryFeeDOT\":\"bigint:307100000\"},\"2043\":{\"parachainId\":2043,\"features\":{\"hasPalletXcm\":true,\"hasDryRunApi\":true,\"hasTxPaymentApi\":true,\"hasDryRunRpc\":true,\"hasDotBalance\":false,\"hasEthBalance\":false,\"hasXcmPaymentApi\":true,\"supportsAliasOrigin\":false,\"xcmVersion\":\"v4\",\"supportsV2\":false},\"info\":{\"tokenSymbols\":\"NEURO\",\"tokenDecimals\":12,\"ss58Format\":101,\"isEthereum\":false,\"accountType\":\"AccountId32\",\"name\":\"NeuroWeb\",\"specName\":\"origintrail-parachain\",\"specVersion\":151},\"assets\":{\"0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f\":{\"token\":\"0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f\",\"name\":\"Trac\",\"minimumBalance\":\"bigint:1000000000000000\",\"symbol\":\"TRAC\",\"decimals\":18,\"isSufficient\":true}},\"estimatedExecutionFeeDOT\":\"bigint:306833\",\"estimatedDeliveryFeeDOT\":\"bigint:307100000\"},\"3369\":{\"parachainId\":3369,\"features\":{\"hasPalletXcm\":true,\"hasDryRunApi\":true,\"hasTxPaymentApi\":true,\"hasDryRunRpc\":true,\"hasDotBalance\":false,\"hasEthBalance\":false,\"hasXcmPaymentApi\":false,\"supportsAliasOrigin\":false,\"xcmVersion\":\"v4\",\"supportsV2\":false},\"info\":{\"tokenSymbols\":\"MYTH\",\"tokenDecimals\":18,\"ss58Format\":29972,\"isEthereum\":true,\"accountType\":\"AccountId20\",\"name\":\"Mythos\",\"specName\":\"mythos\",\"specVersion\":1016},\"assets\":{\"0xba41ddf06b7ffd89d1267b5a93bfef2424eb2003\":{\"token\":\"0xba41ddf06b7ffd89d1267b5a93bfef2424eb2003\",\"name\":\"Mythos\",\"minimumBalance\":\"bigint:10000000000000000\",\"symbol\":\"MYTH\",\"decimals\":18,\"isSufficient\":true}},\"estimatedExecutionFeeDOT\":\"bigint:1000000000\",\"estimatedDeliveryFeeDOT\":\"bigint:306500000\"}},\"kusama\":{\"parachains\":{\"1000\":{\"parachainId\":1000,\"features\":{\"hasPalletXcm\":true,\"hasDryRunApi\":true,\"hasTxPaymentApi\":true,\"hasDryRunRpc\":true,\"hasDotBalance\":true,\"hasEthBalance\":false,\"hasXcmPaymentApi\":true,\"supportsAliasOrigin\":true,\"xcmVersion\":\"v5\",\"supportsV2\":false},\"info\":{\"tokenSymbols\":\"KSM\",\"tokenDecimals\":12,\"ss58Format\":2,\"isEthereum\":false,\"accountType\":\"AccountId32\",\"name\":\"Kusama Asset Hub\",\"specName\":\"statemine\",\"specVersion\":2000004},\"assets\":{\"0x9d39a5de30e57443bff2a8307a4256c8797a3497\":{\"token\":\"0x9d39a5de30e57443bff2a8307a4256c8797a3497\",\"name\":\"Staked USDe\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"sUSDe\",\"decimals\":18,\"isSufficient\":false},\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\":{\"token\":\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\",\"name\":\"Wrapped Ether\",\"minimumBalance\":\"bigint:15000000000000\",\"symbol\":\"WETH\",\"decimals\":18,\"isSufficient\":true},\"0x6982508145454ce325ddbe47a25d4ec3d2311933\":{\"token\":\"0x6982508145454ce325ddbe47a25d4ec3d2311933\",\"name\":\"Pepe\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"PEPE\",\"decimals\":18,\"isSufficient\":false},\"0x5a98fcbea516cf06857215779fd812ca3bef1b32\":{\"token\":\"0x5a98fcbea516cf06857215779fd812ca3bef1b32\",\"name\":\"Lido DAO Token\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"LDO\",\"decimals\":18,\"isSufficient\":false},\"0xa3931d71877c0e7a3148cb7eb4463524fec27fbd\":{\"token\":\"0xa3931d71877c0e7a3148cb7eb4463524fec27fbd\",\"name\":\"Savings USDS\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"sUSDS\",\"decimals\":18,\"isSufficient\":false},\"0x8236a87084f8b84306f72007f36f2618a5634494\":{\"token\":\"0x8236a87084f8b84306f72007f36f2618a5634494\",\"name\":\"Lombard Staked Bitcoin\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"LBTC\",\"decimals\":8,\"isSufficient\":false},\"0x1abaea1f7c830bd89acc67ec4af516284b1bc33c\":{\"token\":\"0x1abaea1f7c830bd89acc67ec4af516284b1bc33c\",\"name\":\"Euro Coin\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"EURC\",\"decimals\":6,\"isSufficient\":false},\"0x56072c95faa701256059aa122697b133aded9279\":{\"token\":\"0x56072c95faa701256059aa122697b133aded9279\",\"name\":\"SKY Governance Token\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"SKY\",\"decimals\":18,\"isSufficient\":false},\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\":{\"token\":\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\",\"name\":\"USDC (Snowbridge)\",\"minimumBalance\":\"bigint:10000\",\"symbol\":\"USDC\",\"decimals\":6,\"isSufficient\":true},\"0x0e186357c323c806c1efdad36d217f7a54b63d18\":{\"token\":\"0x0e186357c323c806c1efdad36d217f7a54b63d18\",\"name\":\"Curio Gas Token\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"CGT2.0\",\"decimals\":18,\"isSufficient\":false},\"0x18084fba666a33d37592fa2633fd49a74dd93a88\":{\"token\":\"0x18084fba666a33d37592fa2633fd49a74dd93a88\",\"name\":\"tBTC v2\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"tBTC\",\"decimals\":18,\"isSufficient\":false},\"0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0\":{\"token\":\"0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0\",\"name\":\"Wrapped liquid staked Ether 2.0\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"wstETH\",\"decimals\":18,\"isSufficient\":false},\"0x582d872a1b094fc48f5de31d3b73f2d9be47def1\":{\"token\":\"0x582d872a1b094fc48f5de31d3b73f2d9be47def1\",\"name\":\"Wrapped TON Coin\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"TONCOIN\",\"decimals\":9,\"isSufficient\":false},\"0x6b175474e89094c44da98b954eedeac495271d0f\":{\"token\":\"0x6b175474e89094c44da98b954eedeac495271d0f\",\"name\":\"Dai Stablecoin\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"DAI\",\"decimals\":18,\"isSufficient\":false},\"0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce\":{\"token\":\"0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce\",\"name\":\"SHIBA INU\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"SHIB\",\"decimals\":18,\"isSufficient\":false},\"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599\":{\"token\":\"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599\",\"name\":\"Wrapped BTC\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"WBTC\",\"decimals\":8,\"isSufficient\":false},\"0x8daebade922df735c38c80c7ebd708af50815faa\":{\"token\":\"0x8daebade922df735c38c80c7ebd708af50815faa\",\"name\":\"tBTC\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"TBTC\",\"decimals\":18,\"isSufficient\":false},\"0x0000000000000000000000000000000000000000\":{\"token\":\"0x0000000000000000000000000000000000000000\",\"name\":\"Ether\",\"minimumBalance\":\"bigint:15000000000000\",\"symbol\":\"ETH\",\"decimals\":18,\"isSufficient\":true},\"0x5d3d01fd6d2ad1169b17918eb4f153c6616288eb\":{\"token\":\"0x5d3d01fd6d2ad1169b17918eb4f153c6616288eb\",\"name\":\"KILT\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"KILT\",\"decimals\":15,\"isSufficient\":false},\"0xdac17f958d2ee523a2206206994597c13d831ec7\":{\"token\":\"0xdac17f958d2ee523a2206206994597c13d831ec7\",\"name\":\"USDT (Snowbridge)\",\"minimumBalance\":\"bigint:10000\",\"symbol\":\"USDT\",\"decimals\":6,\"isSufficient\":true},\"0x514910771af9ca656af840dff83e8264ecf986ca\":{\"token\":\"0x514910771af9ca656af840dff83e8264ecf986ca\",\"name\":\"ChainLink Token\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"LINK\",\"decimals\":18,\"isSufficient\":false},\"0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9\":{\"token\":\"0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9\",\"name\":\"Aave Token\",\"minimumBalance\":\"bigint:1\",\"symbol\":\"AAVE\",\"decimals\":18,\"isSufficient\":false},\"0x196c20da81fbc324ecdf55501e95ce9f0bd84d14\":{\"token\":\"0x196c20da81fbc324ecdf55501e95ce9f0bd84d14\",\"name\":\"Polkadot\",\"symbol\":\"DOT\",\"decimals\":10,\"locationOnEthereum\":{\"parents\":1,\"interior\":{\"x1\":[{\"globalConsensus\":{\"polkadot\":null}}]}},\"location\":{\"parents\":2,\"interior\":{\"x1\":[{\"globalConsensus\":{\"Polkadot\":null}}]}},\"locationOnAH\":{\"parents\":2,\"interior\":{\"x1\":[{\"globalConsensus\":{\"Polkadot\":null}}]}},\"foreignId\":\"0x4e241583d94b5d48a27a22064cd49b2ed6f5231d2d950e432f9b7c2e0ade52b2\",\"minimumBalance\":\"bigint:10000000\",\"isSufficient\":true},\"0x12bbfdc9e813614eef8dc8a2560b0efbeaf7c2ab\":{\"token\":\"0x12bbfdc9e813614eef8dc8a2560b0efbeaf7c2ab\",\"name\":\"\",\"symbol\":\"KSM\",\"decimals\":12,\"locationOnEthereum\":{\"parents\":1,\"interior\":{\"x1\":[{\"globalConsensus\":{\"kusama\":null}}]}},\"location\":{\"parents\":1,\"interior\":\"Here\"},\"locationOnAH\":{\"parents\":1,\"interior\":\"Here\"},\"foreignId\":\"0x03b6054d0c576dd8391e34e1609cf398f68050c23009d19ce93c000922bcd852\",\"minimumBalance\":\"bigint:3333333\",\"isSufficient\":true},\"0x5fdcd48f09fb67de3d202cd854b372aec1100ed5\":{\"token\":\"0x5fdcd48f09fb67de3d202cd854b372aec1100ed5\",\"name\":\"GAVUN WUD\",\"symbol\":\"WUD\",\"decimals\":10,\"locationOnEthereum\":{\"parents\":1,\"interior\":{\"x4\":[{\"globalConsensus\":{\"polkadot\":null}},{\"parachain\":1000},{\"palletInstance\":50},{\"generalIndex\":31337}]}},\"location\":{\"parents\":2,\"interior\":{\"x4\":[{\"globalConsensus\":{\"Polkadot\":null}},{\"parachain\":1000},{\"palletInstance\":50},{\"generalIndex\":31337}]}},\"locationOnAH\":{\"parents\":2,\"interior\":{\"x4\":[{\"globalConsensus\":{\"Polkadot\":null}},{\"parachain\":1000},{\"palletInstance\":50},{\"generalIndex\":31337}]}},\"foreignId\":\"0x7ca757304cac2ff0881de18dc6a1dfa7f10e51b0cba0297e0e762f8072049c98\",\"minimumBalance\":\"bigint:10000000\",\"isSufficient\":false}},\"estimatedExecutionFeeDOT\":\"bigint:0\",\"estimatedDeliveryFeeDOT\":\"bigint:0\"}},\"assetHubParaId\":1000,\"bridgeHubParaId\":1002}}"));}),
"[project]/node_modules/@snowbridge/registry/dist/westend_sepolia.registry.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"timestamp":"2026-01-19T12:21:13.043Z","environment":"westend_sepolia","ethChainId":11155111,"gatewayAddress":"0x9ed8b47bc3417e3bd0507adc06e56e2fa360a4e9","assetHubParaId":1000,"bridgeHubParaId":1002,"relaychain":{"tokenSymbols":"WND","tokenDecimals":12,"ss58Format":42,"isEthereum":false,"accountType":"AccountId32","name":"Westend","specName":"westend","specVersion":1021001},"bridgeHub":{"tokenSymbols":"WND","tokenDecimals":12,"ss58Format":42,"isEthereum":false,"accountType":"AccountId32","name":"Westend BridgeHub","specName":"bridge-hub-westend","specVersion":1021000},"ethereumChains":{"84532":{"chainId":84532,"assets":{"0x4200000000000000000000000000000000000006":{"token":"0x4200000000000000000000000000000000000006","name":"Wrapped Ether","symbol":"WETH","decimals":18,"swapTokenAddress":"0xfff9976782d46cc05630d1f6ebab18b2324d6b14","swapFee":0},"0x036cbd53842c5426634e7929541ec2318f3dcf7e":{"token":"0x036cbd53842c5426634e7929541ec2318f3dcf7e","name":"USDC","symbol":"USDC","decimals":6,"swapTokenAddress":"0x1c7d4b196cb0c7b01d743fbc6116a902379c7238","swapFee":500},"0x0000000000000000000000000000000000000000":{"token":"0x0000000000000000000000000000000000000000","name":"Ether","symbol":"Ether","decimals":18,"swapTokenAddress":"0x0000000000000000000000000000000000000000","swapFee":0}},"id":"base-sepolia"},"11155111":{"chainId":11155111,"assets":{"0x0000000000000000000000000000000000000000":{"token":"0x0000000000000000000000000000000000000000","name":"Ether","symbol":"Ether","decimals":18},"0x1c7d4b196cb0c7b01d743fbc6116a902379c7238":{"token":"0x1c7d4b196cb0c7b01d743fbc6116a902379c7238","name":"USDC","symbol":"USDC","decimals":6,"deliveryGas":"bigint:80000"},"0x72c610e05eaafcdf1fa7a2da15374ee90edb1620":{"token":"0x72c610e05eaafcdf1fa7a2da15374ee90edb1620","name":"Frequency","symbol":"eFRQCY","decimals":12,"deliveryGas":"bigint:80000"},"0xfff9976782d46cc05630d1f6ebab18b2324d6b14":{"token":"0xfff9976782d46cc05630d1f6ebab18b2324d6b14","name":"Wrapped Ether","symbol":"WETH","decimals":18,"deliveryGas":"bigint:80000"},"0x23838b1bb57cecf4422a57dd8e7f8a087b30d54f":{"token":"0x23838b1bb57cecf4422a57dd8e7f8a087b30d54f","name":"Frequency","symbol":"XRQCY","decimals":8,"foreignId":"0xaf13384cf9612ef1ff4b87470ab247d6f8d8110d4f5af2fe290ce6767818712c","deliveryGas":"bigint:80000"},"0xb8a0f2703ac6bdd352096c90c2945a097e8f4055":{"token":"0xb8a0f2703ac6bdd352096c90c2945a097e8f4055","name":"WND","symbol":"WND","decimals":12,"foreignId":"0x2121cfe35065c0c33465fbada265f08e9613428a4b9eb4bb717cd7db2abf622e","deliveryGas":"bigint:80000"},"0xf50fb50d65c8c1f6c72e4d8397c984933afc8f7e":{"token":"0xf50fb50d65c8c1f6c72e4d8397c984933afc8f7e","name":"WND","symbol":"WND","decimals":12,"foreignId":"0x9441dceeeffa7e032eedaccf9b7632e60e86711551a82ffbbb0dda8afd9e4ef7","deliveryGas":"bigint:80000"}},"id":"sepolia","baseDeliveryGas":"bigint:120000"}},"parachains":{"1000":{"parachainId":1000,"features":{"hasPalletXcm":true,"hasDryRunApi":true,"hasTxPaymentApi":true,"hasDryRunRpc":true,"hasDotBalance":true,"hasEthBalance":true,"hasXcmPaymentApi":true,"supportsAliasOrigin":true,"xcmVersion":"v5","supportsV2":true},"info":{"tokenSymbols":"WND","tokenDecimals":12,"ss58Format":42,"isEthereum":false,"accountType":"AccountId32","name":"Westend Asset Hub","specName":"westmint","specVersion":1021000},"assets":{"0x0000000000000000000000000000000000000000":{"token":"0x0000000000000000000000000000000000000000","name":"Ether","minimumBalance":"bigint:15000","symbol":"Ether","decimals":18,"isSufficient":true},"0x1c7d4b196cb0c7b01d743fbc6116a902379c7238":{"token":"0x1c7d4b196cb0c7b01d743fbc6116a902379c7238","name":"","minimumBalance":"bigint:1","symbol":"","decimals":0,"isSufficient":false},"0x72c610e05eaafcdf1fa7a2da15374ee90edb1620":{"token":"0x72c610e05eaafcdf1fa7a2da15374ee90edb1620","name":"","minimumBalance":"bigint:1","symbol":"","decimals":0,"isSufficient":false},"0xfff9976782d46cc05630d1f6ebab18b2324d6b14":{"token":"0xfff9976782d46cc05630d1f6ebab18b2324d6b14","name":"Wrapped Ether","minimumBalance":"bigint:15000000000000","symbol":"WETH","decimals":18,"isSufficient":true},"0x23838b1bb57cecf4422a57dd8e7f8a087b30d54f":{"token":"0x23838b1bb57cecf4422a57dd8e7f8a087b30d54f","name":"","symbol":"","decimals":0,"locationOnEthereum":{"parents":1,"interior":{"x2":[{"globalConsensus":{"byGenesis":"0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e"}},{"parachain":2313}]}},"location":{"parents":1,"interior":{"x1":[{"parachain":2313}]}},"locationOnAH":{"parents":1,"interior":{"x1":[{"parachain":2313}]}},"foreignId":"0xaf13384cf9612ef1ff4b87470ab247d6f8d8110d4f5af2fe290ce6767818712c","minimumBalance":"bigint:1","isSufficient":false},"0xb8a0f2703ac6bdd352096c90c2945a097e8f4055":{"token":"0xb8a0f2703ac6bdd352096c90c2945a097e8f4055","name":"","symbol":"WND","decimals":12,"locationOnEthereum":{"parents":1,"interior":{"x1":[{"globalConsensus":{"byGenesis":"0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e"}}]}},"location":{"parents":1,"interior":"Here"},"locationOnAH":{"parents":1,"interior":"Here"},"foreignId":"0x2121cfe35065c0c33465fbada265f08e9613428a4b9eb4bb717cd7db2abf622e","minimumBalance":"bigint:1000000000","isSufficient":true},"0xf50fb50d65c8c1f6c72e4d8397c984933afc8f7e":{"token":"0xf50fb50d65c8c1f6c72e4d8397c984933afc8f7e","name":"","symbol":"WND","decimals":12,"locationOnEthereum":{"parents":1,"interior":{"x1":[{"globalConsensus":{"byGenesis":"0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e"}}]}},"location":{"parents":1,"interior":"Here"},"locationOnAH":{"parents":1,"interior":"Here"},"foreignId":"0x9441dceeeffa7e032eedaccf9b7632e60e86711551a82ffbbb0dda8afd9e4ef7","minimumBalance":"bigint:1000000000","isSufficient":true}},"estimatedExecutionFeeDOT":"bigint:0","estimatedDeliveryFeeDOT":"bigint:0"}}});}),
"[project]/node_modules/@snowbridge/registry/dist/paseo_sepolia.registry.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"timestamp":"2025-10-03T22:05:14.881Z","environment":"paseo_sepolia","ethChainId":11155111,"gatewayAddress":"0x1607C1368bc943130258318c91bBd8cFf3D063E6","assetHubParaId":1000,"bridgeHubParaId":1002,"relaychain":{"tokenSymbols":"PAS","tokenDecimals":10,"ss58Format":0,"isEthereum":false,"accountType":"AccountId32","name":"Paseo Testnet","specName":"paseo","specVersion":1006002},"bridgeHub":{"tokenSymbols":"PAS","tokenDecimals":10,"ss58Format":0,"isEthereum":false,"accountType":"AccountId32","name":"Paseo Bridge Hub","specName":"bridge-hub-paseo","specVersion":1007001},"ethereumChains":{"11155111":{"chainId":11155111,"assets":{"0x0000000000000000000000000000000000000000":{"token":"0x0000000000000000000000000000000000000000","name":"Ether","symbol":"ETH","decimals":18},"0xb34a6924a02100ba6ef12af1c798285e8f7a16ee":{"token":"0xb34a6924a02100ba6ef12af1c798285e8f7a16ee","name":"Muse","symbol":"MUSE","decimals":18,"deliveryGas":"bigint:80000"},"0x22e12ed4e6bcde652a73552dde340fcb972eef89":{"token":"0x22e12ed4e6bcde652a73552dde340fcb972eef89","name":"Wrapped PILT","symbol":"wPILT","decimals":15,"deliveryGas":"bigint:80000"},"0xef32abea56beff54f61da319a7311098d6fbcea9":{"token":"0xef32abea56beff54f61da319a7311098d6fbcea9","name":"OriginTrail TRAC","symbol":"TRAC","decimals":18,"deliveryGas":"bigint:80000"},"0x99e743964c036bc28931fb564817db428aa7f752":{"token":"0x99e743964c036bc28931fb564817db428aa7f752","name":"KILT","symbol":"KILT","decimals":15,"deliveryGas":"bigint:80000"},"0xfff9976782d46cc05630d1f6ebab18b2324d6b14":{"token":"0xfff9976782d46cc05630d1f6ebab18b2324d6b14","name":"Wrapped Ether","symbol":"WETH","decimals":18,"deliveryGas":"bigint:80000"}},"id":"sepolia","baseDeliveryGas":"bigint:120000"}},"parachains":{"1000":{"parachainId":1000,"features":{"hasPalletXcm":true,"hasDryRunApi":true,"hasTxPaymentApi":true,"hasDryRunRpc":true,"hasDotBalance":true,"hasEthBalance":true,"hasXcmPaymentApi":true,"supportsAliasOrigin":true,"xcmVersion":"v5","supportsV2":true},"info":{"tokenSymbols":"PAS","tokenDecimals":10,"ss58Format":0,"isEthereum":false,"accountType":"AccountId32","name":"Paseo Asset Hub","specName":"asset-hub-paseo","specVersion":1006002},"assets":{"0x0000000000000000000000000000000000000000":{"token":"0x0000000000000000000000000000000000000000","name":"Ether","minimumBalance":"bigint:15000000000000","symbol":"ETH","decimals":18,"isSufficient":true},"0xb34a6924a02100ba6ef12af1c798285e8f7a16ee":{"token":"0xb34a6924a02100ba6ef12af1c798285e8f7a16ee","name":"","minimumBalance":"bigint:1","symbol":"","decimals":0,"isSufficient":false},"0x22e12ed4e6bcde652a73552dde340fcb972eef89":{"token":"0x22e12ed4e6bcde652a73552dde340fcb972eef89","name":"","minimumBalance":"bigint:1","symbol":"","decimals":0,"isSufficient":false},"0xef32abea56beff54f61da319a7311098d6fbcea9":{"token":"0xef32abea56beff54f61da319a7311098d6fbcea9","name":"","minimumBalance":"bigint:1","symbol":"","decimals":0,"isSufficient":false},"0x99e743964c036bc28931fb564817db428aa7f752":{"token":"0x99e743964c036bc28931fb564817db428aa7f752","name":"","minimumBalance":"bigint:1","symbol":"","decimals":0,"isSufficient":false},"0xfff9976782d46cc05630d1f6ebab18b2324d6b14":{"token":"0xfff9976782d46cc05630d1f6ebab18b2324d6b14","name":"Wrapped Ether","minimumBalance":"bigint:15000000000000","symbol":"WETH","decimals":18,"isSufficient":true}},"estimatedExecutionFeeDOT":"bigint:0","estimatedDeliveryFeeDOT":"bigint:0"},"2043":{"parachainId":2043,"features":{"hasPalletXcm":true,"hasDryRunApi":false,"hasTxPaymentApi":true,"hasDryRunRpc":true,"hasDotBalance":false,"hasEthBalance":false,"hasXcmPaymentApi":false,"supportsAliasOrigin":false,"xcmVersion":"v4","supportsV2":false},"info":{"tokenSymbols":"NEURO","tokenDecimals":12,"ss58Format":101,"isEthereum":false,"accountType":"AccountId32","name":"Neuro Testnet","specName":"origintrail-parachain","specVersion":147},"assets":{"0xef32abea56beff54f61da319a7311098d6fbcea9":{"token":"0xef32abea56beff54f61da319a7311098d6fbcea9","name":"Trac","minimumBalance":"bigint:1000000000000000","symbol":"TRAC","decimals":18,"isSufficient":true}},"estimatedExecutionFeeDOT":"bigint:1000000000","estimatedDeliveryFeeDOT":"bigint:307250000"},"3369":{"parachainId":3369,"features":{"hasPalletXcm":true,"hasDryRunApi":true,"hasTxPaymentApi":true,"hasDryRunRpc":true,"hasDotBalance":false,"hasEthBalance":false,"hasXcmPaymentApi":false,"supportsAliasOrigin":false,"xcmVersion":"v4","supportsV2":false},"info":{"tokenSymbols":"MUSE","tokenDecimals":18,"ss58Format":29972,"isEthereum":true,"accountType":"AccountId20","name":"Muse Testnet","specName":"muse","specVersion":1029},"assets":{"0xb34a6924a02100ba6ef12af1c798285e8f7a16ee":{"token":"0xb34a6924a02100ba6ef12af1c798285e8f7a16ee","name":"Muse","minimumBalance":"bigint:10000000000000000","symbol":"MUSE","decimals":18,"isSufficient":true}},"estimatedExecutionFeeDOT":"bigint:1000000000","estimatedDeliveryFeeDOT":"bigint:306650000"}}});}),
"[project]/node_modules/@snowbridge/registry/dist/local_e2e.registry.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"timestamp":"2025-08-13T06:09:22.989Z","environment":"local_e2e","ethChainId":11155111,"gatewayAddress":"0xb1185ede04202fe62d38f5db72f71e38ff3e8305","assetHubParaId":1000,"bridgeHubParaId":1002,"relaychain":{"tokenSymbols":"WND","tokenDecimals":12,"ss58Format":42,"isEthereum":false,"accountType":"AccountId32","name":"Westend Local Testnet","specName":"westend","specVersion":1019002},"bridgeHub":{"tokenSymbols":"WND","tokenDecimals":12,"ss58Format":42,"isEthereum":false,"accountType":"AccountId32","name":"Westend BridgeHub Local","specName":"bridge-hub-westend","specVersion":1019002},"ethereumChains":{"11155111":{"chainId":11155111,"assets":{"0x0000000000000000000000000000000000000000":{"token":"0x0000000000000000000000000000000000000000","name":"Ether","symbol":"Ether","decimals":18},"0xb8ea8cb425d85536b158d661da1ef0895bb92f1d":{"token":"0xb8ea8cb425d85536b158d661da1ef0895bb92f1d","name":"Wrapped Ether","symbol":"WETH","decimals":18,"deliveryGas":"bigint:80000"},"0xde45448ca2d57797c0bec0ee15a1e42334744219":{"token":"0xde45448ca2d57797c0bec0ee15a1e42334744219","name":"roc","symbol":"roc","decimals":12,"foreignId":"0xbcd4282ca0c30cbd9c578b5c790e88c803d80cd9cc91f28686f24ac25a61e06e","deliveryGas":"bigint:80000"},"0xd8597eb7ef761e3315623edfee9defcbacd72e8b":{"token":"0xd8597eb7ef761e3315623edfee9defcbacd72e8b","name":"wnd","symbol":"wnd","decimals":12,"foreignId":"0x9441dceeeffa7e032eedaccf9b7632e60e86711551a82ffbbb0dda8afd9e4ef7","deliveryGas":"bigint:80000"},"0x805c5a7d4e97908a8ec726dccc94a047d073eb7e":{"token":"0x805c5a7d4e97908a8ec726dccc94a047d073eb7e","name":"pal-2","symbol":"pal-2","decimals":12,"foreignId":"0x17444ededa61bdbfcb1e5c39b2aed47f73b8970b65bbb0574c0a0ab1b0c99279","deliveryGas":"bigint:80000"}},"id":"sepolia","baseDeliveryGas":"bigint:120000"}},"parachains":{"1000":{"parachainId":1000,"features":{"hasPalletXcm":true,"hasDryRunApi":true,"hasTxPaymentApi":true,"hasDryRunRpc":true,"hasDotBalance":true,"hasEthBalance":true,"hasXcmPaymentApi":true,"supportsAliasOrigin":true,"xcmVersion":"v5","supportsV2":true},"info":{"tokenSymbols":"WND","tokenDecimals":12,"ss58Format":42,"isEthereum":false,"accountType":"AccountId32","name":"Westend Asset Hub Local","specName":"westmint","specVersion":1019002},"assets":{"0x0000000000000000000000000000000000000000":{"token":"0x0000000000000000000000000000000000000000","name":"Ether","minimumBalance":"bigint:1","symbol":"Ether","decimals":18,"isSufficient":true},"0xb8ea8cb425d85536b158d661da1ef0895bb92f1d":{"token":"0xb8ea8cb425d85536b158d661da1ef0895bb92f1d","name":"WETH","minimumBalance":"bigint:1","symbol":"WETH","decimals":18,"isSufficient":true},"0xde45448ca2d57797c0bec0ee15a1e42334744219":{"token":"0xde45448ca2d57797c0bec0ee15a1e42334744219","name":"Roc","symbol":"Roc","decimals":0,"locationOnEthereum":{"parents":1,"interior":{"x1":[{"globalConsensus":{"byGenesis":"0x6408de7737c59c238890533af25896a2c20608d8b380bb01029acb392781063e"}}]}},"location":{"parents":2,"interior":{"x1":[{"globalConsensus":{"byGenesis":"0x6408de7737c59c238890533af25896a2c20608d8b380bb01029acb392781063e"}}]}},"locationOnAH":{"parents":2,"interior":{"x1":[{"globalConsensus":{"byGenesis":"0x6408de7737c59c238890533af25896a2c20608d8b380bb01029acb392781063e"}}]}},"foreignId":"0xbcd4282ca0c30cbd9c578b5c790e88c803d80cd9cc91f28686f24ac25a61e06e","minimumBalance":"bigint:1","isSufficient":true},"0xd8597eb7ef761e3315623edfee9defcbacd72e8b":{"token":"0xd8597eb7ef761e3315623edfee9defcbacd72e8b","name":"","symbol":"WND","decimals":12,"locationOnEthereum":{"parents":1,"interior":{"x1":[{"globalConsensus":{"byGenesis":"0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e"}}]}},"location":{"parents":1,"interior":"Here"},"locationOnAH":{"parents":1,"interior":"Here"},"foreignId":"0x9441dceeeffa7e032eedaccf9b7632e60e86711551a82ffbbb0dda8afd9e4ef7","minimumBalance":"bigint:1000000000","isSufficient":true},"0x805c5a7d4e97908a8ec726dccc94a047d073eb7e":{"token":"0x805c5a7d4e97908a8ec726dccc94a047d073eb7e","name":"pal-2","symbol":"pal-2","decimals":12,"locationOnEthereum":{"parents":1,"interior":{"x4":[{"globalConsensus":{"byGenesis":"0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e"}},{"parachain":2000},{"palletInstance":50},{"generalIndex":2}]}},"location":{"parents":1,"interior":{"x3":[{"parachain":2000},{"palletInstance":50},{"generalIndex":2}]}},"locationOnAH":{"parents":1,"interior":{"x3":[{"parachain":2000},{"palletInstance":50},{"generalIndex":2}]}},"foreignId":"0x17444ededa61bdbfcb1e5c39b2aed47f73b8970b65bbb0574c0a0ab1b0c99279","minimumBalance":"bigint:1","isSufficient":true}},"estimatedExecutionFeeDOT":"bigint:0","estimatedDeliveryFeeDOT":"bigint:0"},"2000":{"parachainId":2000,"features":{"hasPalletXcm":true,"hasDryRunApi":true,"hasTxPaymentApi":true,"hasDryRunRpc":true,"hasDotBalance":true,"hasEthBalance":false,"hasXcmPaymentApi":true,"supportsAliasOrigin":false,"xcmVersion":"v5","supportsV2":false},"info":{"tokenSymbols":"undefined","tokenDecimals":null,"ss58Format":42,"isEthereum":false,"accountType":"AccountId32","name":"Penpal Parachain","specName":"penpal-parachain","specVersion":1},"assets":{"0x0000000000000000000000000000000000000000":{"token":"0x0000000000000000000000000000000000000000","name":"Ether","minimumBalance":"bigint:1","symbol":"Ether","decimals":18,"isSufficient":true},"0xb8ea8cb425d85536b158d661da1ef0895bb92f1d":{"token":"0xb8ea8cb425d85536b158d661da1ef0895bb92f1d","name":"WETH","minimumBalance":"bigint:1","symbol":"WETH","decimals":18,"isSufficient":true},"0x805c5a7d4e97908a8ec726dccc94a047d073eb7e":{"token":"0x805c5a7d4e97908a8ec726dccc94a047d073eb7e","name":"pal-2","symbol":"pal-2","decimals":12,"locationOnEthereum":{"parents":1,"interior":{"x4":[{"globalConsensus":{"byGenesis":"0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e"}},{"parachain":2000},{"palletInstance":50},{"generalIndex":2}]}},"location":{"parents":0,"interior":{"x2":[{"palletInstance":50},{"generalIndex":2}]}},"locationOnAH":{"parents":1,"interior":{"x3":[{"parachain":2000},{"palletInstance":50},{"generalIndex":2}]}},"foreignId":"0x17444ededa61bdbfcb1e5c39b2aed47f73b8970b65bbb0574c0a0ab1b0c99279","minimumBalance":"bigint:1000000000","isSufficient":false,"assetId":"2"},"0xd8597eb7ef761e3315623edfee9defcbacd72e8b":{"token":"0xd8597eb7ef761e3315623edfee9defcbacd72e8b","name":"","symbol":"WND","decimals":12,"locationOnEthereum":{"parents":1,"interior":{"x1":[{"globalConsensus":{"byGenesis":"0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e"}}]}},"location":{"parents":1,"interior":"Here"},"locationOnAH":{"parents":1,"interior":"Here"},"foreignId":"0x9441dceeeffa7e032eedaccf9b7632e60e86711551a82ffbbb0dda8afd9e4ef7","minimumBalance":"bigint:1000000000","isSufficient":true}},"estimatedExecutionFeeDOT":"bigint:3276800000","estimatedDeliveryFeeDOT":"bigint:31450000000"}}});}),
"[project]/node_modules/@snowbridge/registry/dist/registry.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assetRegistryFor = assetRegistryFor;
const polkadot_mainnet_registry_json_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/@snowbridge/registry/dist/polkadot_mainnet.registry.json (json)"));
const westend_sepolia_registry_json_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/@snowbridge/registry/dist/westend_sepolia.registry.json (json)"));
const paseo_sepolia_registry_json_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/@snowbridge/registry/dist/paseo_sepolia.registry.json (json)"));
const local_e2e_registry_json_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/@snowbridge/registry/dist/local_e2e.registry.json (json)"));
function transformBigInt(obj) {
    // Regex to match strings like "bigint:123"
    const bigintPattern = /^bigint:(\d+)$/;
    // Handle null or non-object/non-array values
    if (obj === null || typeof obj !== "object") {
        if (typeof obj === "string") {
            const match = obj.match(bigintPattern);
            if (match) {
                return Object.freeze(BigInt(match[1]));
            }
        }
        return Object.freeze(obj);
    }
    // Handle arrays
    if (Array.isArray(obj)) {
        return Object.freeze(obj.map((item)=>transformBigInt(item)));
    }
    // Handle objects
    const result = {};
    for(const key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = transformBigInt(obj[key]);
        }
    }
    return Object.freeze(result);
}
const cache = {};
function assetRegistryFor(env) {
    if (env in cache) {
        return cache[env];
    }
    let json;
    switch(env){
        case "polkadot_mainnet":
            json = polkadot_mainnet_registry_json_1.default;
            break;
        case "westend_sepolia":
            json = westend_sepolia_registry_json_1.default;
            break;
        case "paseo_sepolia":
            json = paseo_sepolia_registry_json_1.default;
            break;
        case "local_e2e":
            json = local_e2e_registry_json_1.default;
            break;
        default:
            throw Error(`Unknown env '${env}'`);
    }
    cache[env] = transformBigInt(json);
    return cache[env];
}
}),
"[project]/node_modules/@snowbridge/registry/dist/transfers.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transferSourcesFor = transferSourcesFor;
exports.getEthereumTransferLocation = getEthereumTransferLocation;
exports.getSubstrateTransferLocation = getSubstrateTransferLocation;
exports.getTransferLocation = getTransferLocation;
exports.getTransferLocationKusama = getTransferLocationKusama;
exports.getTransferLocations = getTransferLocations;
exports.defaultPathFilter = defaultPathFilter;
const registry_1 = __turbopack_context__.r("[project]/node_modules/@snowbridge/registry/dist/registry.js [app-ssr] (ecmascript)");
const cache = {};
function transferSourcesFor(env) {
    if (env in cache) {
        return cache[env];
    }
    return getTransferLocations((0, registry_1.assetRegistryFor)(env));
}
function getEthereumTransferLocation(registry, ethChain) {
    if (!ethChain.evmParachainId) {
        return {
            id: "ethereum",
            name: "Ethereum",
            type: "ethereum",
            key: ethChain.chainId.toString(),
            ethChain
        };
    } else {
        const evmChain = registry.parachains[ethChain.evmParachainId];
        return {
            id: ethChain.id,
            name: `${evmChain.info.name} (EVM)`,
            key: ethChain.chainId.toString(),
            type: "ethereum",
            ethChain,
            parachain: evmChain
        };
    }
}
function getSubstrateTransferLocation(parachain) {
    return {
        id: parachain.info.specName,
        name: parachain.info.name,
        key: parachain.parachainId.toString(),
        type: "substrate",
        parachain
    };
}
function getTransferLocation(registry, sourceType, sourceKey) {
    if (sourceType === "ethereum") {
        return getEthereumTransferLocation(registry, registry.ethereumChains[sourceKey]);
    } else {
        return getSubstrateTransferLocation(registry.parachains[sourceKey]);
    }
}
function getTransferLocationKusama(registry, network, parachainId) {
    if (network === "kusama" && registry.kusama) {
        return getSubstrateTransferLocation(registry.kusama?.parachains[parachainId]);
    } else {
        return getSubstrateTransferLocation(registry.parachains[parachainId]);
    }
}
function getTransferLocations(registry, filter) {
    const ethChain = registry.ethereumChains[registry.ethChainId];
    const parachains = Object.keys(registry.parachains).filter((p)=>p !== registry.bridgeHubParaId.toString()).map((p)=>registry.parachains[p]);
    const pathFilter = filter ?? defaultPathFilter(registry.environment);
    const locations = [];
    const ethAssets = Object.keys(ethChain.assets);
    // Bridged paths
    for (const parachain of parachains){
        const destinationAssets = Object.keys(parachain.assets);
        const commonAssets = new Set(ethAssets.filter((sa)=>destinationAssets.find((da)=>da === sa)));
        for (const asset of commonAssets){
            const p1 = {
                type: "ethereum",
                id: "ethereum",
                source: ethChain.chainId,
                destinationType: "substrate",
                destination: parachain.parachainId,
                asset
            };
            if (pathFilter(p1)) {
                locations.push(p1);
            }
            const p2 = {
                type: "substrate",
                id: parachain.info.specName,
                source: parachain.parachainId,
                destinationType: "ethereum",
                destination: ethChain.chainId,
                asset
            };
            if (pathFilter(p2)) {
                locations.push(p2);
            }
            if (parachain.info.evmChainId && registry.ethereumChains[parachain.info.evmChainId]) {
                const p3 = {
                    type: "ethereum",
                    id: `${parachain.info.specName}_evm`,
                    source: parachain.info.evmChainId,
                    destinationType: "ethereum",
                    destination: ethChain.chainId,
                    asset
                };
                if (pathFilter(p3)) {
                    locations.push(p3);
                }
            }
        }
    }
    // Local paths
    const assetHub = registry.parachains[registry.assetHubParaId];
    for (const parachain of parachains){
        if (parachain.parachainId === assetHub.parachainId) continue;
        const assetHubAssets = Object.keys(assetHub.assets);
        const destinationAssets = Object.keys(parachain.assets);
        // The asset exists on ethereum, parachain and asset hub
        const commonAssets = new Set(ethAssets.filter((sa)=>assetHubAssets.find((da)=>da === sa) && destinationAssets.find((da)=>da === sa)));
        for (const asset of commonAssets){
            const p1 = {
                type: "substrate",
                id: assetHub.info.specName,
                source: assetHub.parachainId,
                destinationType: "substrate",
                destination: parachain.parachainId,
                asset
            };
            if (pathFilter(p1)) {
                locations.push(p1);
            }
            const p2 = {
                type: "substrate",
                id: parachain.info.specName,
                source: parachain.parachainId,
                destinationType: "substrate",
                destination: assetHub.parachainId,
                asset
            };
            if (pathFilter(p2)) {
                locations.push(p2);
            }
        }
    }
    const results = [];
    for (const location of locations){
        let source = results.find((s)=>s.type === location.type && s.id === location.id && s.key === location.source.toString());
        if (!source) {
            source = {
                type: location.type,
                id: location.id,
                key: location.source.toString(),
                destinations: {}
            };
            results.push(source);
        }
        let destination = source.destinations[location.destination];
        if (!destination) {
            destination = {
                type: location.destinationType,
                assets: []
            };
            source.destinations[location.destination] = destination;
        }
        destination.assets.push(location.asset);
    }
    return results;
}
function defaultPathFilter(envName) {
    switch(envName){
        case "westend_sepolia":
            {
                return (path)=>{
                    // Frequency
                    if (path.asset === "0x72c610e05eaafcdf1fa7a2da15374ee90edb1620") {
                        return false;
                    }
                    // Disable para to para transfers
                    if (path.type === "substrate" && path.destinationType === "substrate") {
                        return false;
                    }
                    return true;
                };
            }
        case "paseo_sepolia":
            return (path)=>{
                // Disallow MUSE to any location but 3369
                if (path.asset === "0xb34a6924a02100ba6ef12af1c798285e8f7a16ee" && (path.destination !== 3369 && path.type === "ethereum" || path.source !== 3369 && path.type === "substrate")) {
                    return false;
                }
                // Disable para to para transfers
                if (path.type === "substrate" && path.destinationType === "substrate") {
                    return false;
                }
                return true;
            };
        case "polkadot_mainnet":
            return (path)=>{
                // Disallow MYTH to any location but 3369
                if (path.asset === "0xba41ddf06b7ffd89d1267b5a93bfef2424eb2003" && (path.destination !== 3369 && path.type === "ethereum" || path.source !== 3369 && path.type === "substrate")) {
                    return false;
                }
                // Allow TRAC to go to Hydration (2034) and Neuroweb (2043) only
                if (path.asset === "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f" && (path.destination !== 2034 && path.destination !== 2043 && path.type === "ethereum" || path.source !== 2034 && path.source !== 2043 && path.type === "substrate")) {
                    return false;
                }
                // Disable stable coins in the UI from Ethereum to Polkadot
                if ((path.asset === "0x9d39a5de30e57443bff2a8307a4256c8797a3497" || // Staked USDe
                path.asset === "0xa3931d71877c0e7a3148cb7eb4463524fec27fbd" || // Savings USD
                path.asset === "0x6b175474e89094c44da98b954eedeac495271d0f") && // DAI
                path.destination === 2034 // Hydration
                ) {
                    return false;
                }
                // Disable para to para transfers except for hydration
                if (path.type === "substrate" && path.destinationType === "substrate" && !(path.source === 2034 && path.destination == 1000 || path.source === 1000 && path.destination === 2034)) {
                    return false;
                }
                return true;
            };
        default:
            return (_)=>true;
    }
}
}),
"[project]/node_modules/@snowbridge/registry/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/node_modules/@snowbridge/registry/dist/environment.js [app-ssr] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/node_modules/@snowbridge/registry/dist/registry.js [app-ssr] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/node_modules/@snowbridge/registry/dist/transfers.js [app-ssr] (ecmascript)"), exports);
}),
"[project]/node_modules/@paraspell/sdk-pjs/dist/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Builder",
    ()=>Builder,
    "EvmBuilder",
    ()=>EvmBuilder,
    "approveToken",
    ()=>approveToken,
    "assets",
    ()=>assets,
    "claimAssets",
    ()=>claimAssets,
    "convertSs58",
    ()=>convertSs58,
    "createChainClient",
    ()=>createChainClient,
    "depositToken",
    ()=>depositToken,
    "dryRun",
    ()=>dryRun,
    "dryRunOrigin",
    ()=>dryRunOrigin,
    "getBalance",
    ()=>getBalance,
    "getBridgeStatus",
    ()=>getBridgeStatus,
    "getParaEthTransferFees",
    ()=>getParaEthTransferFees,
    "getTokenBalance",
    ()=>getTokenBalance,
    "send",
    ()=>send,
    "transferEthToPolkadot",
    ()=>transferEthToPolkadot,
    "xcmPallet",
    ()=>transfer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@paraspell/sdk-core/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paraspell/assets/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$common$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paraspell/sdk-common/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$api__$5b$external$5d$__$2840$polkadot$2f$api$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$api$29$__ = __turbopack_context__.i("[externals]/@polkadot/api [external] (@polkadot/api, esm_import, [project]/node_modules/@polkadot/api)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$29$__ = __turbopack_context__.i("[externals]/@polkadot/util [external] (@polkadot/util, esm_import, [project]/node_modules/@polkadot/util)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__ = __turbopack_context__.i("[externals]/@polkadot/util-crypto [external] (@polkadot/util-crypto, esm_import, [project]/node_modules/@polkadot/util-crypto)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$contract$2d$types$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@snowbridge/contract-types/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$registry$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@snowbridge/registry/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$api$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@snowbridge/api/dist/index.js [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$api__$5b$external$5d$__$2840$polkadot$2f$api$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$api$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$api__$5b$external$5d$__$2840$polkadot$2f$api$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$api$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
var createKeyringPair = function createKeyringPair(path) {
    var evmPrivateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getEvmPrivateKeyHex"])(path);
    var keyring = evmPrivateKey ? new __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$api__$5b$external$5d$__$2840$polkadot$2f$api$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$api$29$__["Keyring"]() : new __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$api__$5b$external$5d$__$2840$polkadot$2f$api$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$api$29$__["Keyring"]({
        type: 'sr25519'
    });
    return evmPrivateKey ? keyring.createFromUri(evmPrivateKey, undefined, 'ethereum') : keyring.addFromUri(path);
};
var lowercaseFirstLetter = function lowercaseFirstLetter(value) {
    return value.charAt(0).toLowerCase() + value.slice(1);
};
var snakeToCamel = function snakeToCamel(str) {
    return str.toLowerCase().replace(/([-_][a-z])/g, function(group) {
        return group.toUpperCase().replace('-', '').replace('_', '');
    });
};
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
        var i = n[a](c), u = i.value;
    } catch (n) {
        return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
    return function() {
        var t = this, e = arguments;
        return new Promise(function(r, o) {
            var a = n.apply(t, e);
            function _next(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
            }
            function _throw(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
            }
            _next(void 0);
        });
    };
}
function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
    for(var t = 0; t < r.length; t++){
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
}
function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
        writable: false
    }), e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: true,
        configurable: true,
        writable: true
    }) : e[r] = t, e;
}
function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread2(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _regenerator() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
    function i(r, n, o, i) {
        var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype);
        return _regeneratorDefine(u, "_invoke", function(r, n, o) {
            var i, c, u, f = 0, p = o || [], y = false, G = {
                p: 0,
                n: 0,
                v: e,
                a: d,
                f: d.bind(e, 4),
                d: function(t, r) {
                    return i = t, c = 0, u = e, G.n = r, a;
                }
            };
            function d(r, n) {
                for(c = r, u = n, t = 0; !y && f && !o && t < p.length; t++){
                    var o, i = p[t], d = G.p, l = i[2];
                    r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
                }
                if (o || r > 1) return a;
                throw y = true, n;
            }
            return function(o, p, l) {
                if (f > 1) throw TypeError("Generator is already running");
                for(y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;){
                    i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
                    try {
                        if (f = 2, i) {
                            if (c || (o = "next"), t = i[o]) {
                                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                                if (!t.done) return t;
                                u = t.value, c < 2 && (c = 0);
                            } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
                            i = e;
                        } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
                    } catch (t) {
                        i = e, c = 1, u = t;
                    } finally{
                        f = 1;
                    }
                }
                return {
                    value: t,
                    done: y
                };
            };
        }(r, o, i), true), u;
    }
    var a = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    t = Object.getPrototypeOf;
    var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function() {
        return this;
    }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
    function f(e) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function() {
        return this;
    }), _regeneratorDefine(u, "toString", function() {
        return "[object Generator]";
    }), (_regenerator = function() {
        return {
            w: i,
            m: f
        };
    })();
}
function _regeneratorDefine(e, r, n, t) {
    var i = Object.defineProperty;
    try {
        i({}, "", {});
    } catch (e) {
        i = 0;
    }
    _regeneratorDefine = function(e, r, n, t) {
        function o(r, n) {
            _regeneratorDefine(e, r, function(e) {
                return this._invoke(r, n, e);
            });
        }
        r ? i ? i(e, r, {
            value: n,
            enumerable: !t,
            configurable: !t,
            writable: !t
        }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
    }, _regeneratorDefine(e, r, n, t);
}
function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r);
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
// Cache settings
var DEFAULT_TTL_MS = 60000; // 1 minute
var MAX_CLIENTS = 100;
var EXTENSION_MS = 5 * 60000; // 5 minutes
var clientPool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClientCache"])(MAX_CLIENTS, /*#__PURE__*/ function() {
    var _ref = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee(client) {
        return _regenerator().w(function(_context) {
            while(1)switch(_context.n){
                case 0:
                    _context.n = 1;
                    return client.rpc.system.properties();
                case 1:
                    return _context.a(2);
            }
        }, _callee);
    }));
    return function(_x) {
        return _ref.apply(this, arguments);
    };
}(), function(_key, entry) {
    void entry.client.disconnect();
}, EXTENSION_MS);
var createPolkadotJsClient = /*#__PURE__*/ function() {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee2(ws) {
        var wsProvider;
        return _regenerator().w(function(_context2) {
            while(1)switch(_context2.n){
                case 0:
                    wsProvider = new __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$api__$5b$external$5d$__$2840$polkadot$2f$api$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$api$29$__["WsProvider"](ws);
                    return _context2.a(2, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$api__$5b$external$5d$__$2840$polkadot$2f$api$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$api$29$__["ApiPromise"].create({
                        provider: wsProvider
                    }));
            }
        }, _callee2);
    }));
    return function createPolkadotJsClient(_x2) {
        return _ref2.apply(this, arguments);
    };
}();
var _createClientPoolHelp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClientPoolHelpers"])(clientPool, createPolkadotJsClient), leaseClient = _createClientPoolHelp.leaseClient, releaseClient = _createClientPoolHelp.releaseClient;
var PolkadotJsApi = /*#__PURE__*/ function() {
    function PolkadotJsApi(config) {
        _classCallCheck(this, PolkadotJsApi);
        this._ttlMs = DEFAULT_TTL_MS;
        this.initialized = false;
        this.disconnectAllowed = true;
        this._config = config;
    }
    return _createClass(PolkadotJsApi, [
        {
            key: "getConfig",
            value: function getConfig() {
                return this._config;
            }
        },
        {
            key: "getApi",
            value: function getApi() {
                return this.api;
            }
        },
        {
            key: "init",
            value: function() {
                var _init = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee3(chain) {
                    var clientTtlMs, apiConfig, _args = arguments;
                    return _regenerator().w(function(_context3) {
                        while(1)switch(_context3.n){
                            case 0:
                                clientTtlMs = _args.length > 1 && _args[1] !== undefined ? _args[1] : DEFAULT_TTL_MS;
                                if (!(this.initialized || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$common$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isExternalChain"])(chain))) {
                                    _context3.n = 1;
                                    break;
                                }
                                return _context3.a(2);
                            case 1:
                                this._ttlMs = clientTtlMs;
                                this._chain = chain;
                                apiConfig = this.getApiConfigForChain(chain);
                                if (!((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isConfig"])(this._config) && this._config.development && !apiConfig)) {
                                    _context3.n = 2;
                                    break;
                                }
                                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MissingChainApiError"](chain);
                            case 2:
                                _context3.n = 3;
                                return this.resolveApi(apiConfig, chain);
                            case 3:
                                this.api = _context3.v;
                                this.initialized = true;
                            case 4:
                                return _context3.a(2);
                        }
                    }, _callee3, this);
                }));
                function init(_x3) {
                    return _init.apply(this, arguments);
                }
                return init;
            }()
        },
        {
            key: "getApiConfigForChain",
            value: function getApiConfigForChain(chain) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isConfig"])(this._config)) {
                    var _this$_config$apiOver;
                    return (_this$_config$apiOver = this._config.apiOverrides) === null || _this$_config$apiOver === void 0 ? void 0 : _this$_config$apiOver[chain];
                }
                return this._config;
            }
        },
        {
            key: "resolveApi",
            value: function resolveApi(apiConfig, chain) {
                if (!apiConfig) {
                    var wsUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getChainProviders"])(chain);
                    return this.createApiInstance(wsUrl, chain);
                }
                if (typeof apiConfig === 'string' || apiConfig instanceof Array) {
                    return this.createApiInstance(apiConfig, chain);
                }
                return Promise.resolve(apiConfig);
            }
        },
        {
            key: "createApiInstance",
            value: function createApiInstance(wsUrl, _chain) {
                return leaseClient(wsUrl, this._ttlMs, false);
            }
        },
        {
            key: "accountToHex",
            value: function accountToHex(address) {
                var isPrefixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
                if ((0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$29$__["isHex"])(address)) return address;
                var uint8Array = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__["decodeAddress"])(address);
                return (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$29$__["u8aToHex"])(uint8Array, -1, isPrefixed);
            }
        },
        {
            key: "accountToUint8a",
            value: function accountToUint8a(address) {
                return (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__["decodeAddress"])(address);
            }
        },
        {
            key: "convertToPjsCall",
            value: function convertToPjsCall(_ref3) {
                var module = _ref3.module, method = _ref3.method;
                return {
                    module: lowercaseFirstLetter(module),
                    method: snakeToCamel(method)
                };
            }
        },
        {
            key: "deserializeExtrinsics",
            value: function deserializeExtrinsics(serialized) {
                var _this$api$tx$module;
                var params = serialized.params;
                var values = Object.values(params);
                var _this$convertToPjsCal = this.convertToPjsCall(serialized), module = _this$convertToPjsCal.module, method = _this$convertToPjsCal.method;
                return (_this$api$tx$module = this.api.tx[module])[method].apply(_this$api$tx$module, values);
            }
        },
        {
            key: "txFromHex",
            value: function txFromHex(hex) {
                return Promise.resolve(this.api.tx(hex));
            }
        },
        {
            key: "queryState",
            value: function() {
                var _queryState = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee4(serialized) {
                    var _this$api$query$modul;
                    var params, _this$convertToPjsCal2, module, method, res;
                    return _regenerator().w(function(_context4) {
                        while(1)switch(_context4.n){
                            case 0:
                                params = serialized.params;
                                _this$convertToPjsCal2 = this.convertToPjsCall(serialized), module = _this$convertToPjsCal2.module, method = _this$convertToPjsCal2.method;
                                _context4.n = 1;
                                return (_this$api$query$modul = this.api.query[module])[method].apply(_this$api$query$modul, _toConsumableArray(params));
                            case 1:
                                res = _context4.v;
                                return _context4.a(2, res.toJSON());
                        }
                    }, _callee4, this);
                }));
                function queryState(_x4) {
                    return _queryState.apply(this, arguments);
                }
                return queryState;
            }()
        },
        {
            key: "queryRuntimeApi",
            value: function queryRuntimeApi(serialized) {
                var _this$api$call$module;
                var params = serialized.params;
                var _this$convertToPjsCal3 = this.convertToPjsCall(serialized), module = _this$convertToPjsCal3.module, method = _this$convertToPjsCal3.method;
                return (_this$api$call$module = this.api.call[module])[method].apply(_this$api$call$module, _toConsumableArray(params));
            }
        },
        {
            key: "callBatchMethod",
            value: function callBatchMethod(calls, mode) {
                var method = mode === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BatchMode"].BATCH_ALL ? 'batchAll' : 'batch';
                return this.api.tx.utility[method](calls);
            }
        },
        {
            key: "callDispatchAsMethod",
            value: function callDispatchAsMethod(call, address) {
                var origin = {
                    system: {
                        Signed: address
                    }
                };
                return this.api.tx.utility.dispatchAs(origin, call);
            }
        },
        {
            key: "objectToHex",
            value: function objectToHex(obj, typeName) {
                return Promise.resolve(this.api.createType(typeName, obj).toHex());
            }
        },
        {
            key: "hexToUint8a",
            value: function hexToUint8a(hex) {
                return (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$29$__["hexToU8a"])(hex);
            }
        },
        {
            key: "stringToUint8a",
            value: function stringToUint8a(str) {
                return (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$29$__["stringToU8a"])(str);
            }
        },
        {
            key: "getPaymentInfo",
            value: function() {
                var _getPaymentInfo = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee5(tx, address) {
                    var _yield$tx$paymentInfo, _yield$tx$paymentInfo2, proofSize, refTime, partialFee;
                    return _regenerator().w(function(_context5) {
                        while(1)switch(_context5.n){
                            case 0:
                                _context5.n = 1;
                                return tx.paymentInfo(address);
                            case 1:
                                _yield$tx$paymentInfo = _context5.v;
                                _yield$tx$paymentInfo2 = _yield$tx$paymentInfo.weight;
                                proofSize = _yield$tx$paymentInfo2.proofSize;
                                refTime = _yield$tx$paymentInfo2.refTime;
                                partialFee = _yield$tx$paymentInfo.partialFee;
                                return _context5.a(2, {
                                    weight: {
                                        proofSize: proofSize.toBigInt(),
                                        refTime: refTime.toBigInt()
                                    },
                                    partialFee: partialFee.toBigInt()
                                });
                        }
                    }, _callee5);
                }));
                function getPaymentInfo(_x5, _x6) {
                    return _getPaymentInfo.apply(this, arguments);
                }
                return getPaymentInfo;
            }()
        },
        {
            key: "quoteAhPrice",
            value: function() {
                var _quoteAhPrice = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee6(fromMl, toMl, amountIn) {
                    var includeFee, quoted, _args4 = arguments;
                    return _regenerator().w(function(_context6) {
                        while(1)switch(_context6.n){
                            case 0:
                                includeFee = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : true;
                                _context6.n = 1;
                                return this.api.call.assetConversionApi.quotePriceExactTokensForTokens(fromMl, toMl, amountIn.toString(), includeFee);
                            case 1:
                                quoted = _context6.v;
                                return _context6.a(2, quoted.toJSON() !== null ? BigInt(quoted.toString()) : undefined);
                        }
                    }, _callee6, this);
                }));
                function quoteAhPrice(_x7, _x8, _x9) {
                    return _quoteAhPrice.apply(this, arguments);
                }
                return quoteAhPrice;
            }()
        },
        {
            key: "getEvmStorage",
            value: function getEvmStorage(contract, slot) {
                return Promise.resolve(this.api.query.evm.accountStorages.key(contract, slot));
            }
        },
        {
            key: "getMethod",
            value: function getMethod(tx) {
                return tx.method.method;
            }
        },
        {
            key: "getTypeThenAssetCount",
            value: function getTypeThenAssetCount(tx) {
                if (this.getMethod(tx) !== 'transferAssetsUsingTypeAndThen') return undefined;
                var human = tx.toHuman();
                return Object.values(human.method.args.assets)[0].length;
            }
        },
        {
            key: "hasMethod",
            value: function hasMethod(pallet, method) {
                var _this$api$tx$palletFo;
                var palletFormatted = lowercaseFirstLetter(pallet);
                var methodFormatted = snakeToCamel(method);
                return Promise.resolve(((_this$api$tx$palletFo = this.api.tx[palletFormatted]) === null || _this$api$tx$palletFo === void 0 ? void 0 : _this$api$tx$palletFo[methodFormatted]) !== undefined);
            }
        },
        {
            key: "getFromRpc",
            value: function() {
                var _getFromRpc = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee7(module, method, key) {
                    var rpcModule, response;
                    return _regenerator().w(function(_context7) {
                        while(1)switch(_context7.n){
                            case 0:
                                rpcModule = this.api.rpc[module];
                                if (!(!rpcModule || !rpcModule[method])) {
                                    _context7.n = 1;
                                    break;
                                }
                                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnsupportedOperationError"]("RPC method ".concat(module, ".").concat(method, " not available"));
                            case 1:
                                _context7.n = 2;
                                return rpcModule[method](key);
                            case 2:
                                response = _context7.v;
                                return _context7.a(2, response.toHex());
                        }
                    }, _callee7, this);
                }));
                function getFromRpc(_x0, _x1, _x10) {
                    return _getFromRpc.apply(this, arguments);
                }
                return getFromRpc;
            }()
        },
        {
            key: "blake2AsHex",
            value: function blake2AsHex$1(data) {
                return (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__["blake2AsHex"])(data);
            }
        },
        {
            key: "clone",
            value: function clone() {
                return new PolkadotJsApi((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isConfig"])(this._config) ? this._config : undefined);
            }
        },
        {
            key: "createApiForChain",
            value: function() {
                var _createApiForChain = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee8(chain) {
                    var api;
                    return _regenerator().w(function(_context8) {
                        while(1)switch(_context8.n){
                            case 0:
                                api = new PolkadotJsApi();
                                _context8.n = 1;
                                return api.init(chain);
                            case 1:
                                return _context8.a(2, api);
                        }
                    }, _callee8);
                }));
                function createApiForChain(_x11) {
                    return _createApiForChain.apply(this, arguments);
                }
                return createApiForChain;
            }()
        },
        {
            key: "resolveDefaultFeeAsset",
            value: function resolveDefaultFeeAsset(_ref4) {
                var chain = _ref4.chain, feeAsset = _ref4.feeAsset;
                return feeAsset !== null && feeAsset !== void 0 ? feeAsset : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findNativeAssetInfoOrThrow"])(chain);
            }
        },
        {
            key: "resolveFeeAsset",
            value: function() {
                var _resolveFeeAsset = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee9(options) {
                    var chain, address, response, assetId;
                    return _regenerator().w(function(_context9) {
                        while(1)switch(_context9.n){
                            case 0:
                                chain = options.chain, address = options.address;
                                if (chain.startsWith('Hydration')) {
                                    _context9.n = 1;
                                    break;
                                }
                                return _context9.a(2, {
                                    isCustomAsset: false,
                                    asset: this.resolveDefaultFeeAsset(options)
                                });
                            case 1:
                                _context9.n = 2;
                                return this.api.query.multiTransactionPayment.accountCurrencyMap(address);
                            case 2:
                                response = _context9.v;
                                assetId = response.toJSON();
                                if (!(assetId === null)) {
                                    _context9.n = 3;
                                    break;
                                }
                                return _context9.a(2, {
                                    isCustomAsset: false,
                                    asset: this.resolveDefaultFeeAsset(options)
                                });
                            case 3:
                                return _context9.a(2, {
                                    isCustomAsset: true,
                                    asset: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findAssetInfoOrThrow"])(chain, {
                                        id: assetId
                                    }, null)
                                });
                        }
                    }, _callee9, this);
                }));
                function resolveFeeAsset(_x12) {
                    return _resolveFeeAsset.apply(this, arguments);
                }
                return resolveFeeAsset;
            }()
        },
        {
            key: "getDryRunCall",
            value: function() {
                var _getDryRunCall = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee1(options) {
                    var _this = this;
                    var tx, address, feeAsset, chain, destination, version, _options$useRootOrigi, useRootOrigin, bypassOptions, supportsDryRunApi, basePayload, resolvedTx, resolvedFeeAsset, performDryRunCall, getExecutionSuccessFromResult, extractFailureReasonFromResult, response, resultHuman, resultJson, isSuccess, failureErr, shouldRetryWithVersion, msg, _msg, forwardedXcms, actualWeight, weight, destParaId, overriddenWeight, xcmFee, _yield$this$getPaymen, executionFee, fee, _t, _t2, _t3, _t4;
                    return _regenerator().w(function(_context1) {
                        while(1)switch(_context1.p = _context1.n){
                            case 0:
                                tx = options.tx, address = options.address, feeAsset = options.feeAsset, chain = options.chain, destination = options.destination, version = options.version, _options$useRootOrigi = options.useRootOrigin, useRootOrigin = _options$useRootOrigi === void 0 ? false : _options$useRootOrigi, bypassOptions = options.bypassOptions;
                                supportsDryRunApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssetsObject"])(chain).supportsDryRunApi;
                                if (supportsDryRunApi) {
                                    _context1.n = 1;
                                    break;
                                }
                                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RuntimeApiUnavailableError"](chain, 'DryRunApi');
                            case 1:
                                basePayload = useRootOrigin ? {
                                    system: {
                                        Root: null
                                    }
                                } : {
                                    system: {
                                        Signed: address
                                    }
                                };
                                if (!useRootOrigin) {
                                    _context1.n = 3;
                                    break;
                                }
                                _context1.n = 2;
                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["wrapTxBypass"])(_objectSpread2(_objectSpread2({}, options), {}, {
                                    api: this
                                }), bypassOptions);
                            case 2:
                                _t = _context1.v;
                                _context1.n = 4;
                                break;
                            case 3:
                                _t = tx;
                            case 4:
                                resolvedTx = _t;
                                _context1.n = 5;
                                return this.resolveFeeAsset(options);
                            case 5:
                                resolvedFeeAsset = _context1.v;
                                performDryRunCall = /*#__PURE__*/ function() {
                                    var _ref5 = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee0(includeVersion) {
                                        var _this$api$call$dryRun;
                                        var versionNum;
                                        return _regenerator().w(function(_context0) {
                                            while(1)switch(_context0.n){
                                                case 0:
                                                    versionNum = Number(version.charAt(1));
                                                    return _context0.a(2, (_this$api$call$dryRun = _this.api.call.dryRunApi).dryRunCall.apply(_this$api$call$dryRun, [
                                                        basePayload,
                                                        resolvedTx
                                                    ].concat(_toConsumableArray(includeVersion ? [
                                                        versionNum
                                                    ] : []))));
                                            }
                                        }, _callee0);
                                    }));
                                    return function performDryRunCall(_x14) {
                                        return _ref5.apply(this, arguments);
                                    };
                                }();
                                getExecutionSuccessFromResult = function getExecutionSuccessFromResult(resultHuman) {
                                    var _resultHuman$Ok$execu;
                                    return Boolean((resultHuman === null || resultHuman === void 0 ? void 0 : resultHuman.Ok) && ((_resultHuman$Ok$execu = resultHuman.Ok.executionResult) === null || _resultHuman$Ok$execu === void 0 ? void 0 : _resultHuman$Ok$execu.Ok));
                                };
                                extractFailureReasonFromResult = function extractFailureReasonFromResult(resultHuman, resultJson) {
                                    var _resultHuman$Ok, _resultHuman$Ok2, _resultHuman$Ok3, _resultJson$ok, _ref6;
                                    var modErrHuman = resultHuman === null || resultHuman === void 0 || (_resultHuman$Ok = resultHuman.Ok) === null || _resultHuman$Ok === void 0 || (_resultHuman$Ok = _resultHuman$Ok.executionResult) === null || _resultHuman$Ok === void 0 || (_resultHuman$Ok = _resultHuman$Ok.Err) === null || _resultHuman$Ok === void 0 || (_resultHuman$Ok = _resultHuman$Ok.error) === null || _resultHuman$Ok === void 0 ? void 0 : _resultHuman$Ok.Module;
                                    if (modErrHuman) {
                                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveModuleError"])(chain, modErrHuman);
                                    }
                                    var otherErrHuman = resultHuman === null || resultHuman === void 0 || (_resultHuman$Ok2 = resultHuman.Ok) === null || _resultHuman$Ok2 === void 0 || (_resultHuman$Ok2 = _resultHuman$Ok2.executionResult) === null || _resultHuman$Ok2 === void 0 || (_resultHuman$Ok2 = _resultHuman$Ok2.Err) === null || _resultHuman$Ok2 === void 0 || (_resultHuman$Ok2 = _resultHuman$Ok2.error) === null || _resultHuman$Ok2 === void 0 ? void 0 : _resultHuman$Ok2.Other;
                                    if (otherErrHuman) {
                                        return {
                                            failureReason: String(otherErrHuman)
                                        };
                                    }
                                    var secondErrHuman = resultHuman === null || resultHuman === void 0 || (_resultHuman$Ok3 = resultHuman.Ok) === null || _resultHuman$Ok3 === void 0 || (_resultHuman$Ok3 = _resultHuman$Ok3.executionResult) === null || _resultHuman$Ok3 === void 0 || (_resultHuman$Ok3 = _resultHuman$Ok3.Err) === null || _resultHuman$Ok3 === void 0 ? void 0 : _resultHuman$Ok3.error;
                                    if (secondErrHuman) {
                                        return {
                                            failureReason: String(secondErrHuman)
                                        };
                                    }
                                    var execErrJson = resultJson === null || resultJson === void 0 || (_resultJson$ok = resultJson.ok) === null || _resultJson$ok === void 0 || (_resultJson$ok = _resultJson$ok.executionResult) === null || _resultJson$ok === void 0 || (_resultJson$ok = _resultJson$ok.err) === null || _resultJson$ok === void 0 ? void 0 : _resultJson$ok.error;
                                    if (execErrJson !== null && execErrJson !== void 0 && execErrJson.module) {
                                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveModuleError"])(chain, execErrJson.module);
                                    }
                                    if (execErrJson !== null && execErrJson !== void 0 && execErrJson.other) {
                                        return {
                                            failureReason: String(execErrJson.other)
                                        };
                                    }
                                    return {
                                        failureReason: JSON.stringify((_ref6 = resultJson !== null && resultJson !== void 0 ? resultJson : resultHuman) !== null && _ref6 !== void 0 ? _ref6 : 'Unknown error')
                                    };
                                }; // Attempt 1: WITHOUT version
                                isSuccess = false;
                                failureErr = {
                                    failureReason: ''
                                };
                                shouldRetryWithVersion = false;
                                _context1.p = 6;
                                _context1.n = 7;
                                return performDryRunCall(false);
                            case 7:
                                response = _context1.v;
                                resultHuman = response.toHuman();
                                resultJson = response.toJSON();
                                isSuccess = getExecutionSuccessFromResult(resultHuman);
                                if (!isSuccess) {
                                    failureErr = extractFailureReasonFromResult(resultHuman, resultJson);
                                    if (failureErr.failureReason === 'VersionedConversionFailed') {
                                        shouldRetryWithVersion = true;
                                    }
                                }
                                _context1.n = 10;
                                break;
                            case 8:
                                _context1.p = 8;
                                _t2 = _context1.v;
                                msg = _t2 instanceof Error ? _t2.message : String(_t2);
                                if (!msg.includes('Expected 3 arguments')) {
                                    _context1.n = 9;
                                    break;
                                }
                                shouldRetryWithVersion = true;
                                _context1.n = 10;
                                break;
                            case 9:
                                return _context1.a(2, {
                                    success: false,
                                    failureReason: msg,
                                    asset: resolvedFeeAsset.asset
                                });
                            case 10:
                                if (!shouldRetryWithVersion) {
                                    _context1.n = 14;
                                    break;
                                }
                                _context1.p = 11;
                                _context1.n = 12;
                                return performDryRunCall(true);
                            case 12:
                                response = _context1.v;
                                resultHuman = response.toHuman();
                                resultJson = response.toJSON();
                                isSuccess = getExecutionSuccessFromResult(resultHuman);
                                if (!isSuccess) {
                                    failureErr = extractFailureReasonFromResult(resultHuman, resultJson);
                                }
                                _context1.n = 14;
                                break;
                            case 13:
                                _context1.p = 13;
                                _t3 = _context1.v;
                                _msg = _t3 instanceof Error ? _t3.message : String(_t3);
                                failureErr = failureErr || _msg;
                                return _context1.a(2, {
                                    success: false,
                                    failureReason: failureErr.failureReason,
                                    failureSubReason: failureErr.failureSubReason,
                                    asset: resolvedFeeAsset.asset
                                });
                            case 14:
                                if (isSuccess) {
                                    _context1.n = 15;
                                    break;
                                }
                                return _context1.a(2, {
                                    success: false,
                                    failureReason: failureErr.failureReason || 'Unknown error',
                                    failureSubReason: failureErr.failureSubReason,
                                    asset: resolvedFeeAsset.asset
                                });
                            case 15:
                                forwardedXcms = resultJson.ok.forwardedXcms.length > 0 ? resultJson.ok.forwardedXcms[0] : [];
                                actualWeight = resultJson.ok.executionResult.ok.actualWeight;
                                weight = actualWeight ? {
                                    refTime: BigInt(actualWeight.refTime),
                                    proofSize: BigInt(actualWeight.proofSize)
                                } : undefined;
                                destParaId = forwardedXcms.length === 0 ? undefined : function(i, _ref7) {
                                    return i.here === null ? 0 : (_ref7 = Array.isArray(i.x1) ? i.x1[0] : i.x1) === null || _ref7 === void 0 ? void 0 : _ref7.parachain;
                                }(Object.values(forwardedXcms[0])[0].interior);
                                if (!((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasXcmPaymentApiSupport"])(chain) && resultJson.ok.local_xcm && (feeAsset || chain.startsWith('AssetHub') && destination === 'Ethereum') || resolvedFeeAsset.isCustomAsset)) {
                                    _context1.n = 21;
                                    break;
                                }
                                if (resultJson.ok.local_xcm) {
                                    _context1.n = 17;
                                    break;
                                }
                                _context1.n = 16;
                                return this.getPaymentInfo(tx, address);
                            case 16:
                                _t4 = _context1.v.weight;
                                _context1.n = 18;
                                break;
                            case 17:
                                _t4 = undefined;
                            case 18:
                                overriddenWeight = _t4;
                                _context1.n = 19;
                                return this.getXcmPaymentApiFee(chain, resultJson.ok.local_xcm, forwardedXcms, resolvedFeeAsset.asset, version, false, overriddenWeight);
                            case 19:
                                xcmFee = _context1.v;
                                if (!(typeof xcmFee === 'bigint')) {
                                    _context1.n = 20;
                                    break;
                                }
                                return _context1.a(2, Promise.resolve({
                                    success: true,
                                    fee: xcmFee,
                                    asset: resolvedFeeAsset.asset,
                                    weight: weight,
                                    forwardedXcms: forwardedXcms,
                                    destParaId: destParaId
                                }));
                            case 20:
                                resolvedFeeAsset = {
                                    isCustomAsset: false,
                                    asset: this.resolveDefaultFeeAsset(options)
                                };
                            case 21:
                                _context1.n = 22;
                                return this.getPaymentInfo(tx, address);
                            case 22:
                                _yield$this$getPaymen = _context1.v;
                                executionFee = _yield$this$getPaymen.partialFee;
                                fee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["computeFeeFromDryRunPjs"])(resultHuman, chain, executionFee);
                                return _context1.a(2, {
                                    success: true,
                                    fee: fee,
                                    asset: resolvedFeeAsset.asset,
                                    weight: weight,
                                    forwardedXcms: forwardedXcms,
                                    destParaId: destParaId
                                });
                        }
                    }, _callee1, this, [
                        [
                            11,
                            13
                        ],
                        [
                            6,
                            8
                        ]
                    ]);
                }));
                function getDryRunCall(_x13) {
                    return _getDryRunCall.apply(this, arguments);
                }
                return getDryRunCall;
            }()
        },
        {
            key: "getXcmPaymentApiFee",
            value: function() {
                var _getXcmPaymentApiFee = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee10(chain, localXcm, forwardedXcm, asset, version) {
                    var overridenWeight, weight, assetLocalizedLoc, feeResult, execFeeRes, execFeeOk, execFee, isAssetNotFound, bridgeHubExecFee, deliveryFee, _args0 = arguments, _t5;
                    return _regenerator().w(function(_context10) {
                        while(1)switch(_context10.n){
                            case 0:
                                overridenWeight = _args0.length > 6 ? _args0[6] : undefined;
                                if (!(overridenWeight !== null && overridenWeight !== void 0)) {
                                    _context10.n = 1;
                                    break;
                                }
                                _t5 = overridenWeight;
                                _context10.n = 3;
                                break;
                            case 1:
                                _context10.n = 2;
                                return this.getXcmWeight(localXcm);
                            case 2:
                                _t5 = _context10.v;
                            case 3:
                                weight = _t5;
                                assetLocalizedLoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["localizeLocation"])(chain, asset.location);
                                _context10.n = 4;
                                return this.api.call.xcmPaymentApi.queryWeightToAssetFee(weight, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["addXcmVersionHeader"])(assetLocalizedLoc, version));
                            case 4:
                                feeResult = _context10.v;
                                execFeeRes = feeResult.toJSON();
                                execFeeOk = execFeeRes === null || execFeeRes === void 0 ? void 0 : execFeeRes.ok;
                                execFee = typeof execFeeOk === 'string' || typeof execFeeOk === 'number' ? BigInt(execFeeOk) : 0n;
                                isAssetNotFound = (execFeeRes === null || execFeeRes === void 0 ? void 0 : execFeeRes.err) === 'AssetNotFound';
                                if (!(chain.startsWith('BridgeHub') && isAssetNotFound)) {
                                    _context10.n = 6;
                                    break;
                                }
                                _context10.n = 5;
                                return this.getBridgeHubFallbackExecFee(chain, weight, asset, version);
                            case 5:
                                bridgeHubExecFee = _context10.v;
                                if (typeof bridgeHubExecFee === 'bigint') {
                                    execFee = bridgeHubExecFee;
                                }
                            case 6:
                                _context10.n = 7;
                                return this.getDeliveryFee(chain, forwardedXcm, asset, assetLocalizedLoc, version);
                            case 7:
                                deliveryFee = _context10.v;
                                return _context10.a(2, execFee + deliveryFee);
                        }
                    }, _callee10, this);
                }));
                function getXcmPaymentApiFee(_x15, _x16, _x17, _x18, _x19) {
                    return _getXcmPaymentApiFee.apply(this, arguments);
                }
                return getXcmPaymentApiFee;
            }()
        },
        {
            key: "getDeliveryFee",
            value: function() {
                var _getDeliveryFee = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee11(chain, forwardedXcm, asset, assetLocalizedLoc, version) {
                    var _deliveryFeeRes, _ref8, _deliveryFeeResJson$o, _deliveryFeeResJson$o2, _deliveryFeeResJson$o3, _ref9, _deliveryFeeResJson$o4, _deliveryFeeResJson$o5, _deliveryFeeResJson$o6;
                    var usedThirdParam, deliveryFeeRes, baseArgs, _this$api$call$xcmPay, message, _this$api$call$xcmPay2, versionedAssetLoc, deliveryFeeResJson, deliveryFeeResolved, nativeAsset, res, _t6;
                    return _regenerator().w(function(_context11) {
                        while(1)switch(_context11.p = _context11.n){
                            case 0:
                                usedThirdParam = false;
                                if (!(forwardedXcm.length > 0)) {
                                    _context11.n = 6;
                                    break;
                                }
                                baseArgs = [
                                    forwardedXcm[0],
                                    forwardedXcm[1][0]
                                ];
                                _context11.p = 1;
                                _context11.n = 2;
                                return (_this$api$call$xcmPay = this.api.call.xcmPaymentApi).queryDeliveryFees.apply(_this$api$call$xcmPay, baseArgs);
                            case 2:
                                deliveryFeeRes = _context11.v;
                                _context11.n = 6;
                                break;
                            case 3:
                                _context11.p = 3;
                                _t6 = _context11.v;
                                message = _t6 instanceof Error ? _t6.message : String(_t6);
                                if (!message.includes('Expected 3 arguments')) {
                                    _context11.n = 5;
                                    break;
                                }
                                usedThirdParam = true;
                                versionedAssetLoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["addXcmVersionHeader"])(assetLocalizedLoc, version);
                                _context11.n = 4;
                                return (_this$api$call$xcmPay2 = this.api.call.xcmPaymentApi).queryDeliveryFees.apply(_this$api$call$xcmPay2, baseArgs.concat([
                                    versionedAssetLoc
                                ]));
                            case 4:
                                deliveryFeeRes = _context11.v;
                                _context11.n = 6;
                                break;
                            case 5:
                                throw _t6;
                            case 6:
                                deliveryFeeResJson = (_deliveryFeeRes = deliveryFeeRes) === null || _deliveryFeeRes === void 0 ? void 0 : _deliveryFeeRes.toJSON();
                                deliveryFeeResolved = deliveryFeeRes && ((_ref8 = (_deliveryFeeResJson$o = (_deliveryFeeResJson$o2 = deliveryFeeResJson.ok) === null || _deliveryFeeResJson$o2 === void 0 ? void 0 : _deliveryFeeResJson$o2.v4) !== null && _deliveryFeeResJson$o !== void 0 ? _deliveryFeeResJson$o : (_deliveryFeeResJson$o3 = deliveryFeeResJson.ok) === null || _deliveryFeeResJson$o3 === void 0 ? void 0 : _deliveryFeeResJson$o3.v3) === null || _ref8 === void 0 ? void 0 : _ref8.length) > 0 ? BigInt((_ref9 = (_deliveryFeeResJson$o4 = deliveryFeeResJson === null || deliveryFeeResJson === void 0 || (_deliveryFeeResJson$o5 = deliveryFeeResJson.ok) === null || _deliveryFeeResJson$o5 === void 0 ? void 0 : _deliveryFeeResJson$o5.v4) !== null && _deliveryFeeResJson$o4 !== void 0 ? _deliveryFeeResJson$o4 : deliveryFeeResJson === null || deliveryFeeResJson === void 0 || (_deliveryFeeResJson$o6 = deliveryFeeResJson.ok) === null || _deliveryFeeResJson$o6 === void 0 ? void 0 : _deliveryFeeResJson$o6.v3) === null || _ref9 === void 0 || (_ref9 = _ref9[0]) === null || _ref9 === void 0 || (_ref9 = _ref9.fun) === null || _ref9 === void 0 ? void 0 : _ref9.fungible) : 0n;
                                nativeAsset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findNativeAssetInfoOrThrow"])(chain);
                                if (!((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAssetXcEqual"])(asset, nativeAsset) || usedThirdParam)) {
                                    _context11.n = 7;
                                    break;
                                }
                                return _context11.a(2, deliveryFeeResolved);
                            case 7:
                                _context11.p = 7;
                                _context11.n = 8;
                                return this.quoteAhPrice((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["localizeLocation"])(chain, nativeAsset.location), assetLocalizedLoc, deliveryFeeResolved, false);
                            case 8:
                                res = _context11.v;
                                return _context11.a(2, res !== null && res !== void 0 ? res : 0n);
                            case 9:
                                _context11.p = 9;
                                _context11.v;
                                return _context11.a(2, 0n);
                        }
                    }, _callee11, this, [
                        [
                            7,
                            9
                        ],
                        [
                            1,
                            3
                        ]
                    ]);
                }));
                function getDeliveryFee(_x20, _x21, _x22, _x23, _x24) {
                    return _getDeliveryFee.apply(this, arguments);
                }
                return getDeliveryFee;
            }()
        },
        {
            key: "getBridgeHubFallbackExecFee",
            value: function() {
                var _getBridgeHubFallbackExecFee = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee12(chain, weightValue, asset, version) {
                    var fallbackExecFeeRes, fallbackJson, fallbackOk, fallbackExecFee, ahApi, assetHubChain, ahLocalizedLoc, convertedExecFee;
                    return _regenerator().w(function(_context12) {
                        while(1)switch(_context12.n){
                            case 0:
                                _context12.n = 1;
                                return this.api.call.xcmPaymentApi.queryWeightToAssetFee(weightValue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["addXcmVersionHeader"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RELAY_LOCATION"], version));
                            case 1:
                                fallbackExecFeeRes = _context12.v;
                                fallbackJson = fallbackExecFeeRes.toJSON();
                                fallbackOk = fallbackJson === null || fallbackJson === void 0 ? void 0 : fallbackJson.ok;
                                fallbackExecFee = typeof fallbackOk === 'string' || typeof fallbackOk === 'number' ? BigInt(fallbackOk) : undefined;
                                if (!(fallbackExecFee === undefined)) {
                                    _context12.n = 2;
                                    break;
                                }
                                return _context12.a(2, undefined);
                            case 2:
                                ahApi = this.clone();
                                assetHubChain = "AssetHub".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getRelayChainOf"])(chain));
                                _context12.n = 3;
                                return ahApi.init(assetHubChain);
                            case 3:
                                ahLocalizedLoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["localizeLocation"])(assetHubChain, asset.location);
                                _context12.n = 4;
                                return ahApi.quoteAhPrice(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RELAY_LOCATION"], ahLocalizedLoc, fallbackExecFee, false);
                            case 4:
                                convertedExecFee = _context12.v;
                                if (!(typeof convertedExecFee === 'bigint')) {
                                    _context12.n = 5;
                                    break;
                                }
                                return _context12.a(2, convertedExecFee);
                            case 5:
                                return _context12.a(2, undefined);
                        }
                    }, _callee12, this);
                }));
                function getBridgeHubFallbackExecFee(_x25, _x26, _x27, _x28) {
                    return _getBridgeHubFallbackExecFee.apply(this, arguments);
                }
                return getBridgeHubFallbackExecFee;
            }()
        },
        {
            key: "getXcmWeight",
            value: function() {
                var _getXcmWeight = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee13(xcm) {
                    var result, resultJson;
                    return _regenerator().w(function(_context13) {
                        while(1)switch(_context13.n){
                            case 0:
                                _context13.n = 1;
                                return this.api.call.xcmPaymentApi.queryXcmWeight(xcm);
                            case 1:
                                result = _context13.v;
                                resultJson = result.toJSON();
                                return _context13.a(2, resultJson.ok);
                        }
                    }, _callee13, this);
                }));
                function getXcmWeight(_x29) {
                    return _getXcmWeight.apply(this, arguments);
                }
                return getXcmWeight;
            }()
        },
        {
            key: "getDryRunXcm",
            value: function() {
                var _getDryRunXcm = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee14(_ref0) {
                    var _ref10, _ref11, _ref12;
                    var originLocation, xcm, asset, chain, version, origin, supportsDryRunApi, response, result, resultJson, isSuccess, error, failureReason, forwardedXcms, actualWeight, weight, destParaId, _fee, emitted, reversedEvents, palletsWithIssued, feeEvent, feeAmount, fee;
                    return _regenerator().w(function(_context14) {
                        while(1)switch(_context14.n){
                            case 0:
                                originLocation = _ref0.originLocation, xcm = _ref0.xcm, asset = _ref0.asset, chain = _ref0.chain, version = _ref0.version, origin = _ref0.origin;
                                supportsDryRunApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssetsObject"])(chain).supportsDryRunApi;
                                if (supportsDryRunApi) {
                                    _context14.n = 1;
                                    break;
                                }
                                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RuntimeApiUnavailableError"](chain, 'DryRunApi');
                            case 1:
                                _context14.n = 2;
                                return this.api.call.dryRunApi.dryRunXcm(originLocation, xcm);
                            case 2:
                                response = _context14.v;
                                result = response.toHuman();
                                resultJson = response.toJSON();
                                isSuccess = result.Ok && result.Ok.executionResult.Complete;
                                if (isSuccess) {
                                    _context14.n = 3;
                                    break;
                                }
                                error = result.Ok.executionResult.Incomplete.error;
                                failureReason = typeof error === 'string' ? error : error.error;
                                return _context14.a(2, {
                                    success: false,
                                    failureReason: failureReason,
                                    asset: asset
                                });
                            case 3:
                                forwardedXcms = resultJson.ok.forwardedXcms.length > 0 ? resultJson.ok.forwardedXcms[0] : [];
                                actualWeight = resultJson.ok.executionResult.used;
                                weight = actualWeight ? {
                                    refTime: BigInt(actualWeight.refTime),
                                    proofSize: BigInt(actualWeight.proofSize)
                                } : undefined;
                                destParaId = forwardedXcms.length === 0 ? undefined : function(i, _ref1) {
                                    return i.Here ? 0 : (_ref1 = Array.isArray(i.x1) ? i.x1[0] : i.x1) === null || _ref1 === void 0 ? void 0 : _ref1.parachain;
                                }(Object.values(forwardedXcms[0])[0].interior);
                                if (!((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasXcmPaymentApiSupport"])(chain) && asset)) {
                                    _context14.n = 5;
                                    break;
                                }
                                _context14.n = 4;
                                return this.getXcmPaymentApiFee(chain, xcm, forwardedXcms, asset, version);
                            case 4:
                                _fee = _context14.v;
                                if (!(typeof _fee === 'bigint')) {
                                    _context14.n = 5;
                                    break;
                                }
                                return _context14.a(2, {
                                    success: true,
                                    fee: _fee,
                                    asset: asset,
                                    weight: weight,
                                    forwardedXcms: forwardedXcms,
                                    destParaId: destParaId
                                });
                            case 5:
                                emitted = result.Ok.emittedEvents; // We want to look for the last event
                                reversedEvents = _toConsumableArray(emitted).reverse();
                                palletsWithIssued = [
                                    'balances',
                                    'foreignAssets',
                                    'assets'
                                ];
                                feeEvent = (_ref10 = (_ref11 = (_ref12 = origin === 'Mythos' ? reversedEvents.find(function(event) {
                                    return event.section === 'assetConversion' && event.method === 'SwapCreditExecuted';
                                }) : undefined) !== null && _ref12 !== void 0 ? _ref12 : // Prefer an Issued event
                                reversedEvents.find(function(event) {
                                    return palletsWithIssued.includes(event.section) && event.method === 'Issued';
                                })) !== null && _ref11 !== void 0 ? _ref11 : // Fallback to Minted event
                                reversedEvents.find(function(event) {
                                    return [
                                        'balances',
                                        'foreignAssets'
                                    ].includes(event.section) && event.method === 'Minted';
                                })) !== null && _ref10 !== void 0 ? _ref10 : reversedEvents.find(function(event) {
                                    return [
                                        'currencies',
                                        'tokens'
                                    ].includes(event.section) && event.method === 'Deposited';
                                });
                                if (feeEvent) {
                                    _context14.n = 6;
                                    break;
                                }
                                return _context14.a(2, Promise.resolve({
                                    success: false,
                                    failureReason: 'Cannot determine destination fee. No Issued event found',
                                    asset: asset
                                }));
                            case 6:
                                feeAmount = feeEvent.section === 'assetConversion' ? feeEvent.data.amountIn : feeEvent.data.amount;
                                fee = BigInt(feeAmount.replace(/,/g, ''));
                                return _context14.a(2, {
                                    success: true,
                                    fee: fee,
                                    asset: asset,
                                    weight: weight,
                                    forwardedXcms: forwardedXcms,
                                    destParaId: destParaId
                                });
                        }
                    }, _callee14, this);
                }));
                function getDryRunXcm(_x30) {
                    return _getDryRunXcm.apply(this, arguments);
                }
                return getDryRunXcm;
            }()
        },
        {
            key: "getBridgeStatus",
            value: function() {
                var _getBridgeStatus = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee15() {
                    var outboundOperatingMode;
                    return _regenerator().w(function(_context15) {
                        while(1)switch(_context15.n){
                            case 0:
                                _context15.n = 1;
                                return this.api.query.ethereumOutboundQueue.operatingMode();
                            case 1:
                                outboundOperatingMode = _context15.v;
                                return _context15.a(2, outboundOperatingMode.toPrimitive());
                        }
                    }, _callee15, this);
                }));
                function getBridgeStatus() {
                    return _getBridgeStatus.apply(this, arguments);
                }
                return getBridgeStatus;
            }()
        },
        {
            key: "setDisconnectAllowed",
            value: function setDisconnectAllowed(allowed) {
                this.disconnectAllowed = allowed;
            }
        },
        {
            key: "getDisconnectAllowed",
            value: function getDisconnectAllowed() {
                return this.disconnectAllowed;
            }
        },
        {
            key: "disconnect",
            value: function disconnect() {
                var _this$_config$apiOver2;
                var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                if (!this.initialized) return Promise.resolve();
                if (!force && !this.disconnectAllowed) return Promise.resolve();
                var api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isConfig"])(this._config) ? (_this$_config$apiOver2 = this._config.apiOverrides) === null || _this$_config$apiOver2 === void 0 ? void 0 : _this$_config$apiOver2[this._chain] : this._config;
                // Own client provided, destroy only if force true
                if (force && _typeof(api) === 'object') {
                    void this.api.disconnect();
                }
                // Client created automatically
                if (typeof api === 'string' || Array.isArray(api) || api === undefined) {
                    if (force) {
                        void this.api.disconnect();
                    } else {
                        var key = api === undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getChainProviders"])(this._chain) : api;
                        releaseClient(key);
                    }
                }
                return Promise.resolve();
            }
        },
        {
            key: "validateSubstrateAddress",
            value: function validateSubstrateAddress(address) {
                try {
                    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__["validateAddress"])(address);
                    return true;
                } catch (_unused) {
                    return false;
                }
            }
        },
        {
            key: "deriveAddress",
            value: function deriveAddress(sender) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isSenderSigner"])(sender)) return sender.address;
                var _createKeyringPair = createKeyringPair(sender), address = _createKeyringPair.address;
                return address;
            }
        },
        {
            key: "signAndSubmit",
            value: function() {
                var _signAndSubmit = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee16(tx, sender) {
                    var hash, _t8;
                    return _regenerator().w(function(_context16) {
                        while(1)switch(_context16.n){
                            case 0:
                                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isSenderSigner"])(sender)) {
                                    _context16.n = 2;
                                    break;
                                }
                                _context16.n = 1;
                                return tx.signAndSend(sender.address, {
                                    signer: sender.signer
                                });
                            case 1:
                                _t8 = _context16.v;
                                _context16.n = 4;
                                break;
                            case 2:
                                _context16.n = 3;
                                return tx.signAndSend(createKeyringPair(sender));
                            case 3:
                                _t8 = _context16.v;
                            case 4:
                                hash = _t8;
                                return _context16.a(2, hash.toHex());
                        }
                    }, _callee16);
                }));
                function signAndSubmit(_x31, _x32) {
                    return _signAndSubmit.apply(this, arguments);
                }
                return signAndSubmit;
            }()
        }
    ]);
}();
var createChainClient = function createChainClient(chain, builderOptions) {
    var pjsApi = new PolkadotJsApi(builderOptions);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createChainClient"])(pjsApi, chain);
};
var createPolkadotJsApiCall = function createPolkadotJsApiCall(apiCall) {
    return /*#__PURE__*/ function() {
        var _ref = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee(options) {
            var pjsApi, optionsWithApi;
            return _regenerator().w(function(_context) {
                while(1)switch(_context.n){
                    case 0:
                        pjsApi = new PolkadotJsApi(options.api);
                        optionsWithApi = _objectSpread2(_objectSpread2({}, options), {}, {
                            api: pjsApi
                        });
                        return _context.a(2, apiCall(optionsWithApi));
                }
            }, _callee);
        }));
        return function(_x) {
            return _ref.apply(this, arguments);
        };
    }();
};
var isEthersSigner = function isEthersSigner(signer) {
    return _typeof(signer) === 'object' && signer !== null && 'provider' in signer;
};
/**
 * Retrieves the asset balance for a given account on a specified chain.
 *
 * @returns The asset balance as a bigint.
 */ var getBalance = createPolkadotJsApiCall(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getBalance"]);
/**
 * Claims assets from a parachain.
 *
 * @returns An extrinsic representing the claim transaction.
 */ var claimAssets = createPolkadotJsApiCall(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["claimAssets"]);
var assets = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    Foreign: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Foreign"],
    ForeignAbstract: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ForeignAbstract"],
    Native: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Native"],
    Override: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Override"],
    claimAssets: claimAssets,
    findAssetInfo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findAssetInfo"],
    getAllAssetsSymbols: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllAssetsSymbols"],
    getAssetDecimals: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssetDecimals"],
    getAssetId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssetId"],
    getAssets: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssets"],
    getAssetsObject: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssetsObject"],
    getBalance: getBalance,
    getExistentialDeposit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getExistentialDeposit"],
    getNativeAssetSymbol: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNativeAssetSymbol"],
    getNativeAssets: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNativeAssets"],
    getOtherAssets: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOtherAssets"],
    getRelayChainSymbol: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRelayChainSymbol"],
    getSupportedAssets: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupportedAssets"],
    getTChain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getTChain"],
    hasSupportForAsset: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasSupportForAsset"],
    isChainEvm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isChainEvm"]
});
var convertSs58 = function convertSs58(address, chain) {
    var papiApi = new PolkadotJsApi();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["convertSs58"])(papiApi, address, chain);
};
var approveToken = /*#__PURE__*/ function() {
    var _ref = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee(signer, amount, symbol) {
        var _environmentFor, gatewayContract, asset, weth9, result, receipt;
        return _regenerator().w(function(_context) {
            while(1)switch(_context.n){
                case 0:
                    _environmentFor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$registry$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["environmentFor"])('polkadot_mainnet'), gatewayContract = _environmentFor.gatewayContract;
                    asset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findAssetInfoOrThrow"])('Ethereum', {
                        symbol: symbol
                    }, null);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["assertHasId"])(asset);
                    weth9 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$contract$2d$types$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WETH9__factory"].connect(asset.assetId, signer);
                    _context.n = 1;
                    return weth9.approve(gatewayContract, amount);
                case 1:
                    result = _context.v;
                    _context.n = 2;
                    return result.wait();
                case 2:
                    receipt = _context.v;
                    return _context.a(2, {
                        result: result,
                        receipt: receipt
                    });
            }
        }, _callee);
    }));
    return function approveToken(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
var depositToken = /*#__PURE__*/ function() {
    var _ref = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee(signer, amount, symbol) {
        var asset, weth9, result, receipt;
        return _regenerator().w(function(_context) {
            while(1)switch(_context.n){
                case 0:
                    asset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findAssetInfoOrThrow"])('Ethereum', {
                        symbol: symbol
                    }, null);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["assertHasId"])(asset);
                    weth9 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$contract$2d$types$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WETH9__factory"].connect(asset.assetId, signer);
                    _context.n = 1;
                    return weth9.deposit({
                        value: amount
                    });
                case 1:
                    result = _context.v;
                    _context.n = 2;
                    return result.wait();
                case 2:
                    receipt = _context.v;
                    return _context.a(2, {
                        result: result,
                        receipt: receipt
                    });
            }
        }, _callee);
    }));
    return function depositToken(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
var createContext = function createContext(executionUrl, env) {
    var isStringProvider = typeof executionUrl === 'string';
    var context = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$api$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Context"](_objectSpread2(_objectSpread2({}, env), {}, {
        assetOverrides: {
            '3369': [
                {
                    token: '0xba41ddf06b7ffd89d1267b5a93bfef2424eb2003',
                    name: 'Mythos',
                    minimumBalance: 10000000000000000n,
                    symbol: 'MYTH',
                    decimals: 18,
                    isSufficient: true
                }
            ]
        },
        precompiles: {
            '2004': '0x000000000000000000000000000000000000081A'
        },
        ethereumChains: _objectSpread2(_objectSpread2({}, isStringProvider ? _defineProperty({}, env.ethChainId.toString(), executionUrl) : {}), {}, _defineProperty({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getParaId"])('Moonbeam'), 'https://rpc.api.moonbeam.network'))
    }));
    if (!isStringProvider) context.setEthProvider(env.ethChainId, executionUrl);
    return context;
};
/**
 * Transfers an Ethereum asset to a Polkadot account.
 *
 * @param provider - The Ethereum provider instance to interact with the Ethereum network.
 * @param options - The options for the transfer.
 *
 * @returns A Promise that resolves to an object containing the result and the plan of the transfer.
 *
 * @throws Will throw an error if the transfer validation fails or if the transfer cannot be completed.
 */ var transferEthToPolkadot$1 = /*#__PURE__*/ function() {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee(_ref) {
        var api, provider, signer, address, to, currency, ethAsset, amount, env, context, destParaId, registry, fee, sourceAddress, transfer, validation, tx, response, receipt, messageReceipt, _t, _t2, _t3, _t4, _t5, _t6, _t7, _t8, _t9, _t0, _t1;
        return _regenerator().w(function(_context) {
            while(1)switch(_context.n){
                case 0:
                    api = _ref.api, provider = _ref.provider, signer = _ref.signer, address = _ref.address, to = _ref.to, currency = _ref.currency;
                    if (!Array.isArray(currency)) {
                        _context.n = 1;
                        break;
                    }
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnsupportedOperationError"]('Multi-assets are not yet supported for EVM transfers');
                case 1:
                    if (!('location' in currency && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isOverrideLocationSpecifier"])(currency.location))) {
                        _context.n = 2;
                        break;
                    }
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnsupportedOperationError"]('Override location is not supported for EVM transfers');
                case 2:
                    if (provider) {
                        _context.n = 3;
                        break;
                    }
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MissingParameterError"]('provider', 'provider parameter is required for Snowbridge transfers.');
                case 3:
                    if (isEthersSigner(signer)) {
                        _context.n = 4;
                        break;
                    }
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnsupportedOperationError"]('Snowbridge does not support Viem provider yet.');
                case 4:
                    ethAsset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findAssetInfoOrThrow"])('Ethereum', currency, to);
                    amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["abstractDecimals"])(currency.amount, ethAsset.decimals, api);
                    env = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$registry$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["environmentFor"])('polkadot_mainnet');
                    context = createContext(provider, env);
                    destParaId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getParaId"])(to);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["assertHasId"])(ethAsset);
                    registry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$registry$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRegistryFor"])('polkadot_mainnet');
                    _t = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$api$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPolkadotV2"];
                    _t2 = context.gateway();
                    _context.n = 5;
                    return context.assetHub();
                case 5:
                    _t3 = _context.v;
                    _context.n = 6;
                    return context.parachain(destParaId);
                case 6:
                    _t4 = _context.v;
                    _context.n = 7;
                    return _t.getDeliveryFee.call(_t, {
                        gateway: _t2,
                        assetHub: _t3,
                        destination: _t4
                    }, registry, ethAsset.assetId, destParaId);
                case 7:
                    fee = _context.v;
                    _context.n = 8;
                    return signer.getAddress();
                case 8:
                    sourceAddress = _context.v;
                    _context.n = 9;
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$api$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPolkadotV2"].createTransfer(registry, sourceAddress, address, ethAsset.assetId, destParaId, amount, fee);
                case 9:
                    transfer = _context.v;
                    _t5 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$api$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPolkadotV2"];
                    _t6 = context.ethereum();
                    _t7 = context.gateway();
                    _context.n = 10;
                    return context.bridgeHub();
                case 10:
                    _t8 = _context.v;
                    _context.n = 11;
                    return context.assetHub();
                case 11:
                    _t9 = _context.v;
                    if (!(destParaId !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getParaId"])('AssetHubPolkadot'))) {
                        _context.n = 13;
                        break;
                    }
                    _context.n = 12;
                    return context.parachain(destParaId);
                case 12:
                    _t0 = _context.v;
                    _context.n = 14;
                    break;
                case 13:
                    _t0 = undefined;
                case 14:
                    _t1 = _t0;
                    _context.n = 15;
                    return _t5.validateTransfer.call(_t5, {
                        ethereum: _t6,
                        gateway: _t7,
                        bridgeHub: _t8,
                        assetHub: _t9,
                        destParachain: _t1
                    }, transfer);
                case 15:
                    validation = _context.v;
                    if (!validation.logs.find(function(l) {
                        return l.kind == __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$api$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPolkadotV2"].ValidationKind.Error;
                    })) {
                        _context.n = 16;
                        break;
                    }
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RoutingResolutionError"]("Validation failed with following errors: \n\n ".concat(validation.logs.filter(function(l) {
                        return l.kind == __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$api$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPolkadotV2"].ValidationKind.Error;
                    }).map(function(l) {
                        return l.message;
                    }).join('\n\n')));
                case 16:
                    tx = transfer.tx;
                    _context.n = 17;
                    return signer.sendTransaction(tx);
                case 17:
                    response = _context.v;
                    _context.n = 18;
                    return response.wait(1);
                case 18:
                    receipt = _context.v;
                    if (receipt) {
                        _context.n = 19;
                        break;
                    }
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RoutingResolutionError"]("Transaction ".concat(response.hash, " not included."));
                case 19:
                    _context.n = 20;
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$api$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPolkadotV2"].getMessageReceipt(receipt);
                case 20:
                    messageReceipt = _context.v;
                    if (messageReceipt) {
                        _context.n = 21;
                        break;
                    }
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RoutingResolutionError"]("Transaction ".concat(receipt.hash, " did not emit a message."));
                case 21:
                    return _context.a(2, {
                        response: response,
                        messageReceipt: messageReceipt
                    });
            }
        }, _callee);
    }));
    return function transferEthToPolkadot(_x) {
        return _ref2.apply(this, arguments);
    };
}();
var getTokenBalance = /*#__PURE__*/ function() {
    var _ref = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee(signer, symbol) {
        var asset, weth9, address;
        return _regenerator().w(function(_context) {
            while(1)switch(_context.n){
                case 0:
                    asset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$assets$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findAssetInfoOrThrow"])('Ethereum', {
                        symbol: symbol
                    }, null);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["assertHasId"])(asset);
                    weth9 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$snowbridge$2f$contract$2d$types$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WETH9__factory"].connect(asset.assetId, signer);
                    _context.n = 1;
                    return signer.getAddress();
                case 1:
                    address = _context.v;
                    return _context.a(2, weth9.balanceOf(address));
            }
        }, _callee);
    }));
    return function getTokenBalance(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
/**
 * Builder class for constructing transfers from Ethereum to Polkadot.
 */ var EvmBuilderCore = /*#__PURE__*/ function() {
    function EvmBuilderCore(options) {
        _classCallCheck(this, EvmBuilderCore);
        this._options = options;
    }
    return _createClass(EvmBuilderCore, [
        {
            key: "from",
            value: function from(chain) {
                return new EvmBuilderCore(_objectSpread2(_objectSpread2({}, this._options), {}, {
                    from: chain
                }));
            }
        },
        {
            key: "to",
            value: function to(chain) {
                return new EvmBuilderCore(_objectSpread2(_objectSpread2({}, this._options), {}, {
                    to: chain
                }));
            }
        },
        {
            key: "currency",
            value: function currency(_currency) {
                return new EvmBuilderCore(_objectSpread2(_objectSpread2({}, this._options), {}, {
                    currency: _currency
                }));
            }
        },
        {
            key: "address",
            value: function address(_address) {
                return new EvmBuilderCore(_objectSpread2(_objectSpread2({}, this._options), {}, {
                    address: _address
                }));
            }
        },
        {
            key: "ahAddress",
            value: function ahAddress(address) {
                return new EvmBuilderCore(_objectSpread2(_objectSpread2({}, this._options), {}, {
                    ahAddress: address
                }));
            }
        },
        {
            key: "signer",
            value: function signer(_signer) {
                return new EvmBuilderCore(_objectSpread2(_objectSpread2({}, this._options), {}, {
                    signer: _signer
                }));
            }
        },
        {
            key: "build",
            value: function() {
                var _build = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee() {
                    var _this$_options, from, to, address, signer, api, _yield$transferEthToP, response;
                    return _regenerator().w(function(_context) {
                        while(1)switch(_context.n){
                            case 0:
                                _this$_options = this._options, from = _this$_options.from, to = _this$_options.to, address = _this$_options.address, signer = _this$_options.signer, api = _this$_options.api;
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["validateAddress"])(api, address, to);
                                if (!(from === 'Moonbeam' && to === 'Ethereum')) {
                                    _context.n = 2;
                                    break;
                                }
                                if (!isEthersSigner(signer)) {
                                    _context.n = 1;
                                    break;
                                }
                                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnsupportedOperationError"]('Ethers signer is not supported for Moonbeam to Ethereum transfers.');
                            case 1:
                                return _context.a(2, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["transferMoonbeamToEth"])(from, _objectSpread2(_objectSpread2({}, this._options), {}, {
                                    signer: signer
                                })));
                            case 2:
                                if (!(from === 'Moonbeam' || from === 'Moonriver' || from === 'Darwinia')) {
                                    _context.n = 4;
                                    break;
                                }
                                if (!isEthersSigner(signer)) {
                                    _context.n = 3;
                                    break;
                                }
                                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnsupportedOperationError"]('Ethers signer is not supported for Moonbeam to Ethereum transfers.');
                            case 3:
                                return _context.a(2, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["transferMoonbeamEvm"])(_objectSpread2(_objectSpread2({}, this._options), {}, {
                                    signer: signer
                                })));
                            case 4:
                                _context.n = 5;
                                return transferEthToPolkadot$1(this._options);
                            case 5:
                                _yield$transferEthToP = _context.v;
                                response = _yield$transferEthToP.response;
                                return _context.a(2, response.hash);
                            case 6:
                                return _context.a(2);
                        }
                    }, _callee, this);
                }));
                function build() {
                    return _build.apply(this, arguments);
                }
                return build;
            }()
        }
    ]);
}();
/**
 * Creates a new EvmBuilder instance for constructing Ethereum to Polkadot transfers.
 *
 * @param provider - The Ethereum provider to use for the transfer.
 * @returns An instance of EvmBuilder class
 */ var EvmBuilder$1 = function EvmBuilder(api, provider) {
    return new EvmBuilderCore({
        api: api,
        provider: provider
    });
};
/**
 * Creates a new Builder instance.
 *
 * @param api - The API instance to use for building transactions. If not provided, a new instance will be created.
 * @returns A new Builder instance.
 */ var Builder = function Builder(api) {
    var pjsApi = new PolkadotJsApi(api);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Builder"])(pjsApi);
};
var EvmBuilder = function EvmBuilder(provider, api) {
    var pjsApi = new PolkadotJsApi(api);
    return EvmBuilder$1(pjsApi, provider);
};
/**
 * Transfers assets from parachain to another parachain or from/to relay chain.
 * @param options - The transfer options.
 * @returns An extrinsic to be signed and sent.
 */ var send = createPolkadotJsApiCall(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["send"]);
var dryRun = createPolkadotJsApiCall(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dryRun"]);
var dryRunOrigin = createPolkadotJsApiCall(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dryRunOrigin"]);
var transferEthToPolkadot = function transferEthToPolkadot(options) {
    return transferEthToPolkadot$1(_objectSpread2(_objectSpread2({}, options), {}, {
        api: new PolkadotJsApi()
    }));
};
var getParaEthTransferFees = /*#__PURE__*/ function() {
    var _ref = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee(api) {
        var pjsApi;
        return _regenerator().w(function(_context) {
            while(1)switch(_context.n){
                case 0:
                    pjsApi = new PolkadotJsApi(api);
                    _context.n = 1;
                    return pjsApi.init('AssetHubPolkadot', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DRY_RUN_CLIENT_TIMEOUT_MS"]);
                case 1:
                    return _context.a(2, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getParaEthTransferFees"])(pjsApi));
            }
        }, _callee);
    }));
    return function getParaEthTransferFees(_x) {
        return _ref.apply(this, arguments);
    };
}();
/**
 * Gets the Ethereum bridge status.
 */ var getBridgeStatus = /*#__PURE__*/ function() {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee2(api) {
        var pjsApi;
        return _regenerator().w(function(_context2) {
            while(1)switch(_context2.n){
                case 0:
                    pjsApi = new PolkadotJsApi(api);
                    return _context2.a(2, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getBridgeStatus"])(pjsApi));
            }
        }, _callee2);
    }));
    return function getBridgeStatus(_x2) {
        return _ref2.apply(this, arguments);
    };
}();
var transfer = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    approveToken: approveToken,
    depositToken: depositToken,
    dryRun: dryRun,
    dryRunOrigin: dryRunOrigin,
    getBridgeStatus: getBridgeStatus,
    getParaEthTransferFees: getParaEthTransferFees,
    getTokenBalance: getTokenBalance,
    send: send,
    transferEthToPolkadot: transferEthToPolkadot
});
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ed05cb01._.js.map