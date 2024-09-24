const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  // Code existant pour créer un produit
};

exports.getAllProducts = async (req, res) => {
  // Code existant pour récupérer tous les produits
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
