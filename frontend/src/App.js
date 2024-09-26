import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import AddAddress from './pages/AddAddress';
import UserOrders from './pages/UserOrders';
import Header from './components/Header';  // Composant de navigation
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/add-address" component={AddAddress} />
        <Route path="/orders" component={UserOrders} />
        </Routes>
    </Router>
  );
}

export default App;
