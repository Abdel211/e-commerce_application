const Cart = require('../models/Cart');
const Product = require('../models/Product');
exports.addToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.params.userId;
  
      // Vérifie si le produit existe avant de l'ajouter au panier
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Produit non trouvé' });
      }
  
      // Trouver le panier de l'utilisateur ou en créer un
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({ userId, items: [{ productId, quantity }] });
      } else {
        // Si l'élément existe déjà, on met à jour la quantité
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({ productId, quantity });
        }
      }
  
      await cart.save();
      res.status(200).json({ message: 'Produit ajouté au panier', cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getCartByUserId = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
      if (!cart) {
        return res.status(404).json({ message: 'Panier non trouvé' });
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Panier non trouvé' });
    }

    // Filtrer les éléments pour retirer celui correspondant à l'ID
    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    await cart.save();

    res.status(200).json({ message: 'Produit retiré du panier', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
