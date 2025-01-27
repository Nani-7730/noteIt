const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const noterouter = require('./routes/noteroute');
const userrouter = require('./routes/userroute');

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((error) => {
    console.error(`MongoDB Connection Failed... reason: ${error.message}`);
    process.exit(1);
  });

// Routes
app.use('/notepad', noterouter);
app.use('/auth', userrouter);

// Serve Static Files
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful Shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });
});
