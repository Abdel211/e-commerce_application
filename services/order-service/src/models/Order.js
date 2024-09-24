// Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  status: { type: String, default: 'En cours' },
});

module.exports = mongoose.model('Order', orderSchema);
