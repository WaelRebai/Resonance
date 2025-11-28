const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jobRoutes = require('./routes/jobRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', jobRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Job Service running on port ${PORT}`);
});