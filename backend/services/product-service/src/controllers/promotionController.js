const Promotion = require('../models/Promotion');

// Créer une promotion
exports.createPromotion = async (req, res) => {
  try {
    const { code, discount, validFrom, validUntil, products } = req.body;
    
    // Validation des dates
    if (new Date(validFrom) >= new Date(validUntil)) {
      return res.status(400).json({ message: 'La date de début doit être inférieure à la date de fin.' });
    }

    const promotion = new Promotion({
      code,
      discount,
      validFrom,
      validUntil,
      products,
    });
    await promotion.save();
    
    res.status(201).json({ message: 'Promotion créée avec succès', promotion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Appliquer une promotion à une commande
exports.applyPromotion = async (req, res) => {
  try {
    const { code } = req.body;

    const promotion = await Promotion.findOne({ code });

    // Vérifier si la promotion existe et est encore active
    if (!promotion || !promotion.isActive) {
      return res.status(404).json({ message: 'Code promotionnel invalide ou expiré.' });
    }

    // Vérifier les dates de validité de la promotion
    const now = new Date();
    if (now < new Date(promotion.validFrom) || now > new Date(promotion.validUntil)) {
      return res.status(400).json({ message: 'Code promotionnel non valide à ce jour.' });
    }

    res.status(200).json({ discount: promotion.discount, message: 'Promotion appliquée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un code promo
exports.deletePromotion = async (req, res) => {
  try {
    const promotionId = req.params.promotionId;

    // Supprimer la promotion par son ID
    const promotion = await Promotion.findByIdAndDelete(promotionId);

    if (!promotion) {
      return res.status(404).json({ message: 'Promotion non trouvée.' });
    }

    res.status(200).json({ message: 'Promotion supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
