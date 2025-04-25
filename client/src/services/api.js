import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getFeedback = async (params = {}) => {
  try {
    const response = await api.get('/feedback', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getFeedbackById = async (id) => {
  try {
    const response = await api.get(`/feedback/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loadMockData = async () => {
  try {
    const response = await api.post('/seed/mock');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api; 