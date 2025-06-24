import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onLandingPage = location.pathname === '/';

  const token = localStorage.getItem('token');
  let decoded = {};

  if (token) {
    try {
      decoded = JSON.parse(atob(token.split('.')[1]));
    } catch (err) {
      console.error('Invalid token');
    }
  }

  const isAdmin = decoded.isAdmin;
  const isSeller = decoded.isSeller;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">BookNest</div>

      <div className="nav-links">
        {onLandingPage ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : token ? (
          <>
            {isAdmin && <Link to="/admin-dashboard">Admin Dashboard</Link>}


            {!isAdmin && !isSeller && (
              <>
                <Link to="/books">Books</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/my-orders">My Orders</Link>
              </>
            )}
            {isSeller && !isAdmin && (
              <>
                <Link to="/add-book">Add Book</Link>
                <Link to="/my-products">My Products</Link> {/* 👈 Changed from /books */}
                <Link to="/seller-dashboard">Seller Dashboard</Link>
              </>
            )}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
