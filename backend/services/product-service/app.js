require('dotenv').config();
console.log("MONGO_URI:", process.env.MONGO_URI);  // Vérification du chargement de l'URI
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const cartRoutes = require('./src/routes/cartRoutes');  
const promotionRoutes = require('./src/routes/promotionRoutes');  

const app = express();
app.use(express.json());

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/cart', cartRoutes); 
app.use('/promotions', promotionRoutes); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Product Service is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('Database connection error:', err);
});

module.exports = app;
