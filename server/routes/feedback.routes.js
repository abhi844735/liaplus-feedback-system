const express = require('express');
const FeedbackController = require('../controllers/feedback.controller');

const router = express.Router();

// POST /api/feedback - Submit new feedback
router.post('/', FeedbackController.submitFeedback);

// GET /api/feedback - Get all feedback with filters
router.get('/', FeedbackController.getFeedback);

// GET /api/feedback/:id - Get feedback by id
router.get('/:id', FeedbackController.getFeedbackById);

module.exports = router; 