const express = require('express');
const app = express();

// Basic middleware
app.use(express.json());

// Define a simple seed route
app.post('/api/seed/mock', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Mock seed route is working!',
    count: 15
  });
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log('Try accessing POST http://localhost:5001/api/seed/mock');
}); 