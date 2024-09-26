const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Inscription
router.post('/register', userController.register);

// Connexion
router.post('/login', userController.login);

// Récupérer un utilisateur par ID
router.get('/:userId', authMiddleware.authenticateJWT, userController.getUserById);

// Mise à jour du profil utilisateur
router.put('/:userId/profile', authMiddleware.authenticateJWT, userController.updateUserProfile);

// Réinitialisation du mot de passe (demande)
router.post('/reset-password', userController.resetPasswordRequest);

// Réinitialisation du mot de passe (confirmation)
router.post('/reset-password/confirm', userController.resetPassword);

// Ajouter une adresse
router.post('/:userId/address', authMiddleware.authenticateJWT, userController.addAddress);

// Ajouter un produit à la wishlist
router.post('/:userId/wishlist', authMiddleware.authenticateJWT, userController.addToWishlist);

// Récupérer les commandes utilisateur
router.get('/:userId/orders', authMiddleware.authenticateJWT, userController.getUserOrders);

// Route admin
router.get('/admin/dashboard', authMiddleware.authenticateJWT, authMiddleware.verifyAdmin, (req, res) => {
  res.status(200).json({ message: 'Bienvenue sur le tableau de bord admin' });
});

module.exports = router;
