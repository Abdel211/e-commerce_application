import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Header from './components/Header';

function App() {
  // Function to check if the user is authenticated (token exists)
  const isAuthenticated = () => {
    return localStorage.getItem('token') ? true : false;
  };

  return (
    <Router>
      <div>
        <Header isAuthenticated={isAuthenticated()} />
        <Routes>
          {/* Redirect to login page if not authenticated */}
          <Route
            path="/"
            element={isAuthenticated() ? <Navigate to="/profile" /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />} />
          {/* You can add more protected routes here, like Cart or Wishlist */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
