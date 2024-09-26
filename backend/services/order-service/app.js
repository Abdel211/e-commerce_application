require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();
app.use(express.json());

app.use('/orders', orderRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  const PORT = process.env.PORT || 3003;
  app.listen(PORT, () => {
    console.log(`Order Service is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('Database connection error:', err);
});

module.exports = app; // Pour les tests
