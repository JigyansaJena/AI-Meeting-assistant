const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Frontend serve karo
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const processRoute = require('./routes/process');
app.use('/api', processRoute);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'Server is running!',
    groq: process.env.GROQ_API_KEY ? '✅ Connected' : '❌ Missing'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});