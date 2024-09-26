import React, { useEffect, useState } from 'react';
import { addToWishlist, getUserById } from '../services/userService';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const user = await getUserById('userId', token);  // Remplace 'userId' par l'ID utilisateur
        setWishlist(user.wishlist);
      } catch (error) {
        setMessage(error);
      }
    };
    fetchWishlist();
  }, [token]);

  const handleAddToWishlist = async (productId) => {
    try {
      const response = await addToWishlist('userId', productId, token);  // Remplace 'userId'
      setWishlist(response.wishlist);
      setMessage(response.message);
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div>
      <h1>Ma Wishlist</h1>
      <ul>
        {wishlist.map((productId) => (
          <li key={productId}>{productId}</li>
        ))}
      </ul>
      {message && <p>{message}</p>}
      {/* Simuler l'ajout d'un produit (remplacer productId par l'ID réel) */}
      <button onClick={() => handleAddToWishlist('productId')}>Ajouter à la Wishlist</button>
    </div>
  );
};

export default Wishlist;
