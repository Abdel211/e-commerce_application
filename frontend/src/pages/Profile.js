import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3001/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,  // Ajoute le token dans les en-têtes
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          setMessage(data.message || 'Erreur lors de la récupération des informations.');
        }
      } catch (error) {
        setMessage('Erreur serveur');
      }
    };

    fetchUserData();
  }, []);

  if (!user) return <div>Chargement...</div>;

  return (
    <div className="container mt-5">
      <h1>Profil Utilisateur</h1>
      <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
      <p><strong>Email :</strong> {user.email}</p>
      {/* Affiche d'autres infos comme les adresses ou la wishlist */}
    </div>
  );
};

export default Profile;
