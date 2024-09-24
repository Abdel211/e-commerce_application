const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }  // <- Référence à la catégorie
});

module.exports = mongoose.model('Product', productSchema);
