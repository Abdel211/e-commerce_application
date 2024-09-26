const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },  // Le code de réduction unique
  discount: { type: Number, required: true },  // Pourcentage de réduction
  validFrom: { type: Date, required: true },  // Date de début de la promotion
  validUntil: { type: Date, required: true },  // Date de fin de la promotion
  isActive: { type: Boolean, default: true },  // Promotion active ou non
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]  // Produits éligibles à la promotion
});

module.exports = mongoose.model('Promotion', promotionSchema);
