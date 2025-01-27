const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const noterouter = require('./routes/noteroute');
const userrouter = require('./routes/userroute');

require('dotenv').config();

const port = process.env.PORT;
const hostname = process.env.REACT_APP_API_BASE_URL;

const app = express();  
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((error) => {
    console.error(`MongoDB Connection Failed... reason: ${error.message}`);
    process.exit(1); 
  });

app.use('/notepad', noterouter);
app.use('/auth', userrouter);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port,hostname, () => {
  console.log(`Server is running on port ${hostname}:${port}`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });
});
