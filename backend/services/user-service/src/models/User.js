const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String }, // Ajout du numéro de téléphone
  addresses: [{  // Pour gérer plusieurs adresses
    type: { type: String },  // "livraison" ou "facturation"
    street: String,
    city: String,
    country: String,
    postalCode: String
  }],
  role: { type: String, enum: ['utilisateur', 'admin'], default: 'utilisateur' },  // Ajout de rôle
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],  // Wishlist pour les produits favoris
});

// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Méthode pour vérifier le mot de passe
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
