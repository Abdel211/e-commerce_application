const Product = require('../models/Product');

// Créer un produit
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    // Vérifie si les données sont valides
    if (!name || !price || quantity == null) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const newProduct = new Product({ name, description, price, quantity });
    await newProduct.save();

    res.status(201).json({ message: 'Produit créé avec succès', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un produit par ID
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

// Mettre à jour un produit par ID
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      { name, description, price, quantity },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.status(200).json({ message: 'Produit mis à jour', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un produit par ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
