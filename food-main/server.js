const express = require('express');
const mongoose = require('mongoose');
const donorRoutes = require('./routes/donorRoutes');
const receiverRoutes = require('./routes/receiverRoutes');
const cors = require('cors');

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect('mongodb://localhost:27017/food-donor')
.then(() => {
  console.log('Database connected');
}).catch(err => {
  console.error('Database connection error:', err);
});

// Routes
app.use('/api/donors', donorRoutes);
app.use('/api/receiver', receiverRoutes);
// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
