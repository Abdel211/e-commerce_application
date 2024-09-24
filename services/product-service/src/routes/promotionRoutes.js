const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');
const authMiddleware = require('../../user-service/src/middleware/authMiddleware');

// Route pour créer une promotion (réservée aux admins)
router.post('/create', authMiddleware.authenticateJWT, authMiddleware.verifyAdmin, promotionController.createPromotion);

// Route pour appliquer un code promo (accessible à tous les utilisateurs authentifiés)
router.post('/apply', promotionController.applyPromotion);

// Route pour supprimer un code promo (réservée aux admins)
router.delete('/:promotionId', authMiddleware.authenticateJWT, authMiddleware.verifyAdmin, promotionController.deletePromotion);

module.exports = router;
