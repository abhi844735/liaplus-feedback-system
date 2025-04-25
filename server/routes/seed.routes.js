const express = require('express');
const SeedController = require('../controllers/seed.controller');

const router = express.Router();

// GET /api/seed/mock - Check seed endpoint status
router.get('/mock', (req, res) => {
  res.status(200).json({
    message: 'Seed route is accessible. Use POST to load mock data.'
  });
});

// POST /api/seed/mock - Load mock feedback data
router.post('/mock', SeedController.loadMockData);

module.exports = router; 