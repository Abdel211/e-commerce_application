const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Créer un nouveau produit
router.post('/', productController.createProduct);

// Récupérer tous les produits
router.get('/', productController.getAllProducts);

// Récupérer un produit spécifique par ID
router.get('/:productId', productController.getProductById);

// Mettre à jour un produit spécifique
router.put('/:productId', productController.updateProduct);

// Supprimer un produit spécifique
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
