'use strict';
const express = require('express');
const router = express.Router();
const oracle = require('../services/oracle-service');

// GET /oracle/status - cached state, no RPC calls
router.get('/status', (_req, res) => {
    res.json(oracle.getState());
});

// GET /oracle/crash - inject price crash
router.get('/crash', async (_req, res) => {
    try {
        const result = await oracle.crash();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /oracle/recover - restore price
router.get('/recover', async (_req, res) => {
    try {
        const result = await oracle.recover();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /oracle/next - advance one tick manually
router.get('/next', async (_req, res) => {
    try {
        const result = await oracle.tick(true);
        if (result.error) {
            res.status(500).json(result);
        } else {
            res.json(result);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
