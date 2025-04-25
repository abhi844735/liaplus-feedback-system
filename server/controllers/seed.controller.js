const SeedService = require('../services/seed.service');

class SeedController {
  async loadMockData(req, res) {
    try {
      const result = await SeedService.loadMockData();
      res.status(200).json({
        success: true,
        message: result.message,
        count: result.count
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to load mock data',
        error: error.message
      });
    }
  }
}

module.exports = new SeedController(); 