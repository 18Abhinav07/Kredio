'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const oracle = require('./services/oracle-service');
const bridge = require('./services/bridge-service');
const yieldStrategy = require('./services/yield-strategy-service');
const oracleRoutes = require('./routes/oracle');
const bridgeRoutes = require('./routes/bridge');
const yieldStrategyRoutes = require('./routes/yield-strategy');

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────
const rawOrigins = process.env.CORS_ORIGINS;
const corsOptions = rawOrigins
    ? { origin: rawOrigins.split(',').map(s => s.trim()), optionsSuccessStatus: 200 }
    : { origin: true, optionsSuccessStatus: 200 }; // allow all in dev

app.use(cors(corsOptions));
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────
app.use('/oracle', oracleRoutes);
app.use('/bridge', bridgeRoutes);
app.use('/yield-strategy', yieldStrategyRoutes);

// ─── Health check ─────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
    res.json({ ok: true, ts: new Date().toISOString(), pid: process.pid });
});

// ─── 404 fallback ─────────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ error: 'not found' });
});

// ─── Start services ───────────────────────────────────────────────────────
oracle.start().catch(err => console.error('[oracle] start error:', err.message));
bridge.start();
yieldStrategy.start().catch(err => console.error('[yield-strategy] start error:', err.message));

// ─── Listen ───────────────────────────────────────────────────────────────
const server = app.listen(PORT, () => {
    console.log(`\n════════════════════════════════════════`);
    console.log(` Kredio Backend  pid=${process.pid}  port=${PORT}`);
    console.log(`────────────────────────────────────────`);
    console.log(`  GET  /health`);
    console.log(`  GET  /oracle/status`);
    console.log(`  GET  /oracle/crash`);
    console.log(`  GET  /oracle/recover`);
    console.log(`  GET  /oracle/next`);
    console.log(`  GET  /bridge/quote?chainId=11155111&ethAmount=0.01`);
    console.log(`  POST /bridge/deposit   { chainId, txHash, hubRecipient }`);
    console.log(`  GET  /bridge/status?txHash=0x...`);
    console.log(`  GET  /yield-strategy/status`);
    console.log(`════════════════════════════════════════\n`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n[server] Port ${PORT} is already in use.`);
        console.error(`[server] Kill the old process and retry:`);
        console.error(`         kill $(lsof -ti :${PORT})\n`);
    } else {
        console.error('[server] Fatal error:', err.message);
    }
    process.exit(1);
});
