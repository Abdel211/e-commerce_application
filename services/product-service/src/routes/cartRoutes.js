const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/:userId', cartController.addToCart);
router.get('/:userId', cartController.getCartByUserId);
router.delete('/:userId/:itemId', cartController.removeFromCart);

module.exports = router;
