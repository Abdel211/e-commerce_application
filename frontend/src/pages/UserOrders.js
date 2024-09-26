import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../services/userService';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userOrders = await getUserOrders('userId', token);  // Remplace 'userId'
        setOrders(userOrders);
      } catch (error) {
        setMessage(error);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div>
      <h1>Mes Commandes</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Commande #{order._id} - Montant total : {order.totalAmount} €
            </li>
          ))}
        </ul>
      ) : (
        <p>Vous n'avez pas encore de commandes.</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserOrders;
