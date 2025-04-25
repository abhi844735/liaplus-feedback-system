const Feedback = require('../models/feedback.model');

class FeedbackRepository {
  async create(feedbackData) {
    try {
      const feedback = new Feedback(feedbackData);
      return await feedback.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll(query = {}) {
    try {
      const { 
        category, 
        searchTerm,
        sortBy = 'createdAt', 
        sortOrder = 'desc', 
        page = 1, 
        limit = 10 
      } = query;
      
      // Build filter object
      const filter = {};
      
      // Add category filter if provided
      if (category) filter.category = category;
      
      // Add search filter if provided
      if (searchTerm) {
        filter.$or = [
          { name: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } },
          { feedbackText: { $regex: searchTerm, $options: 'i' } }
        ];
      }
      
      // Build sort object
      const sort = {};
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
      
      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Execute query with all filters, sorting, and pagination
      const feedbacks = await Feedback.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));
        
      // Get total count for pagination
      const total = await Feedback.countDocuments(filter);
      
      return {
        feedbacks,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      return await Feedback.findById(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new FeedbackRepository(); 