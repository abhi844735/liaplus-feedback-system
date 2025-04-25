const FeedbackRepository = require('../repositories/feedback.repository');

class FeedbackService {
  async createFeedback(feedbackData) {
    try {
      return await FeedbackRepository.create(feedbackData);
    } catch (error) {
      throw error;
    }
  }

  async getAllFeedback(query) {
    try {
      return await FeedbackRepository.findAll(query);
    } catch (error) {
      throw error;
    }
  }

  async getFeedbackById(id) {
    try {
      const feedback = await FeedbackRepository.findById(id);
      if (!feedback) {
        throw new Error('Feedback not found');
      }
      return feedback;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new FeedbackService(); 