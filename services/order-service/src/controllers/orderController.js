// orderController.js

const Order = require('../models/Order');
const axios = require('axios');

exports.createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Vérifier l'existence de l'utilisateur via le User Service
    try {
      const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      } else {
        return res.status(500).json({ message: 'Erreur lors de la vérification de l\'utilisateur' });
      }
    }

    // Calculer le montant total en récupérant les prix depuis le Product Service
    let totalAmount = 0;
    for (const item of products) {
      try {
        const productResponse = await axios.get(`http://localhost:3002/products/${item.productId}`);
        const product = productResponse.data;

        // Vérifier la disponibilité du stock
        if (product.quantity < item.quantity) {
          return res.status(400).json({ message: `Stock insuffisant pour le produit ${product.name}` });
        }

        totalAmount += product.price * item.quantity;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return res.status(404).json({ message: `Produit ${item.productId} non trouvé` });
        } else {
          return res.status(500).json({ message: 'Erreur lors de la vérification du produit' });
        }
      }
    }

    // Créer la commande
    const order = new Order({ userId, products, totalAmount });
    await order.save();

    // Mettre à jour les quantités de produits dans le Product Service
    for (const item of products) {
      await axios.put(`http://localhost:3002/products/${item.productId}/decrease`, {
        quantity: item.quantity,
      });
    }

    res.status(201).json({ message: 'Commande créée avec succès', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.status(200).json({ message: 'Statut de la commande mis à jour', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
