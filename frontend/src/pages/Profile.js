import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState({});
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setUpdatedUsername(response.data.username);
      } catch (error) {
        setError('Failed to load profile.');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3001/users/${profile._id}/profile`,
        { username: updatedUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile((prev) => ({ ...prev, username: updatedUsername }));
    } catch (error) {
      setError('Update failed.');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {profile && (
        <>
          <p>Username: {profile.username}</p>
          <input
            type="text"
            value={updatedUsername}
            onChange={(e) => setUpdatedUsername(e.target.value)}
          />
          <button onClick={handleUpdate}>Update Profile</button>
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Profile;
