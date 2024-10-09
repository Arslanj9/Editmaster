// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/UserRoute');
const adminRoutes = require('./routes/adminRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors(
  {
    origin: ["https://editmaster-livid.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  }
));
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);

// Check if MongoDB connection is successful
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Use User Routes - api/auth/..
app.use('/api', userRoutes);

// Use Admin Routes
app.use('/api', adminRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
