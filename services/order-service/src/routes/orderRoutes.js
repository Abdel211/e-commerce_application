const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route pour créer une commande
router.post('/', orderController.createOrder);

// Route pour récupérer toutes les commandes
router.get('/', orderController.getAllOrders);

// Route pour récupérer une commande par son ID
router.get('/:orderId', orderController.getOrderById);

// Route pour mettre à jour le statut d'une commande
router.put('/:orderId/status', orderController.updateOrderStatus);

module.exports = router;
