'use strict';
const express = require('express');
const router = express.Router();
const strategy = require('../services/yield-strategy-service');

// GET /yield-strategy/status
// Returns current strategy state: zone, utilization, invested amount, pending yield, last action.
router.get('/status', (_req, res) => {
    res.json(strategy.getState());
});

module.exports = router;
