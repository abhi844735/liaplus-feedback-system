// Import the seed service directly
const SeedService = require('./services/seed.service');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/feedback-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for direct test'))
.catch(err => console.error('MongoDB connection error:', err));

// Function to test the seed service directly
async function testSeedService() {
  try {
    console.log('Attempting to load mock data directly...');
    const result = await SeedService.loadMockData();
    console.log('Success!', result);
    process.exit(0);
  } catch (error) {
    console.error('Error loading mock data:', error);
    process.exit(1);
  }
}

// Run the test
testSeedService(); 