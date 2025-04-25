const FeedbackService = require('../services/feedback.service');

class FeedbackController {
  async submitFeedback(req, res) {
    try {
      const feedbackData = req.body;
      const feedback = await FeedbackService.createFeedback(feedbackData);
      res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully',
        data: feedback
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to submit feedback',
        error: error.message
      });
    }
  }

  async getFeedback(req, res) {
    try {
      const result = await FeedbackService.getAllFeedback(req.query);
      res.status(200).json({
        success: true,
        message: 'Feedback retrieved successfully',
        data: result.feedbacks,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to retrieve feedback',
        error: error.message
      });
    }
  }

  async getFeedbackById(req, res) {
    try {
      const { id } = req.params;
      const feedback = await FeedbackService.getFeedbackById(id);
      res.status(200).json({
        success: true,
        message: 'Feedback retrieved successfully',
        data: feedback
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: 'Failed to retrieve feedback',
        error: error.message
      });
    }
  }
}

module.exports = new FeedbackController(); 