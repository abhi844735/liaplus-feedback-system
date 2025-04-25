const FeedbackRepository = require('../repositories/feedback.repository');
const Feedback = require('../models/feedback.model');
const fs = require('fs');
const path = require('path');
const mockFeedback = require('../data/mockFeedback.json');

class SeedService {
  async loadMockData() {
    try {
      // Check if there's already data in the collection
      const count = await Feedback.countDocuments();
      
      // If there's data, clear it first
      if (count > 0) {
        await Feedback.deleteMany({});
      }
      
      // Insert mock data
      await Feedback.insertMany(mockFeedback);
      
      return {
        success: true,
        message: `Successfully loaded ${mockFeedback.length} mock feedback entries`,
        count: mockFeedback.length
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new SeedService(); 