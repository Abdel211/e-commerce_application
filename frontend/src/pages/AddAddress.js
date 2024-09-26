import React, { useState } from 'react';
import { addAddress } from '../services/userService';

const AddAddress = () => {
  const [address, setAddress] = useState({ street: '', city: '', postalCode: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addAddress('userId', address, token);  // Remplace 'userId'
      setMessage(response.message);
    } catch (error) {
      setMessage(error);
    }
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Ajouter une adresse</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="street" placeholder="Rue" onChange={handleChange} />
        <input type="text" name="city" placeholder="Ville" onChange={handleChange} />
        <input type="text" name="postalCode" placeholder="Code Postal" onChange={handleChange} />
        <button type="submit">Ajouter l'adresse</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddAddress;
