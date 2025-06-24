import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/register';
import Books from './pages/Books';
import Cart from './pages/Cart';
import AddBook from './pages/AddBook';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MyOrders from './pages/MyOrders';
import Landing from './pages/Landing';
import MyProducts from './pages/MyProducts';
import EditBook from './pages/EditBook';

const App = () => {
  const location = useLocation();

  // Hide Navbar only on these paths
  const hideNavbarPaths = ['/login'];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
      </Routes>
    </>
  );
};

export default App;
