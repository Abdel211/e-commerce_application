import axios from 'axios';

const API_URL = 'http://localhost:3001/users';  // L'URL de ton service d'utilisateurs

// Inscription
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Connexion
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Récupérer un utilisateur par son ID
export const getUserById = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Mise à jour du profil utilisateur
export const updateUserProfile = async (userId, updateData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Demander une réinitialisation de mot de passe
export const resetPasswordRequest = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password-request`, { email });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Réinitialiser le mot de passe
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { token, newPassword });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Ajouter une adresse
export const addAddress = async (userId, address, token) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}/address`, address, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Ajouter un produit à la wishlist
export const addToWishlist = async (userId, productId, token) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}/wishlist`, { productId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Récupérer les commandes de l'utilisateur
export const getUserOrders = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
