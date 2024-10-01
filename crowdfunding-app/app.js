//Main server configuration and routes setup
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const api = require('./api');

// Allow cross-origin requests
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(express.json());

// Register API routes
app.use('/api', api);

// Test API route to ensure everything is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Handle root path route
app.get('/', (req, res) => {
  res.send('Welcome to the Crowdfunding Platform');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Add an error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});