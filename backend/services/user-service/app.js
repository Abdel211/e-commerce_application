require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const cors = require('cors');  // Import CORS

const app = express();

// Enable CORS for all origins (or restrict to specific origins if necessary)
app.use(cors({
  origin: 'http://localhost:3000',  // This is where your frontend is running
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Allow cookies and other credentials
}));

app.use(express.json());

app.use('/users', userRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`User Service running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error', err);
  });

module.exports = app; // Pour les tests
