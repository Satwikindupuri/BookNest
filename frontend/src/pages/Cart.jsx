import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const placeOrder = async () => {
    const userId = localStorage.getItem('userId');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!userId || cart.length === 0) {
      alert("User not logged in or cart is empty");
      return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    try {
      const res = await API.post('/orders', {
        userId,
        books: cart.map(item => ({
          bookId: item._id,
          quantity: item.quantity || 1
        })),
        totalPrice
      });

      localStorage.removeItem('cart');
      setCartItems([]);
      alert("Order placed successfully!");
      console.log("✅ Order:", res.data);
    } catch (err) {
      console.error("❌ Order error:", err.response?.data || err.message);
      alert("Failed to place order");
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">🛒 Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div className="cart-card" key={item._id}>
              <img src={item.image || 'https://via.placeholder.com/80x100'} alt={item.title} />
              <div className="cart-details">
                <h3>{item.title}</h3>
                <p><strong>Author:</strong> {item.author || 'Unknown'}</p>
                <p className="cart-price">₹{item.price}</p>
              </div>
              <button className="remove-btn" onClick={() => removeItem(item._id)}>Remove</button>
            </div>
          ))}

          <div className="cart-footer">
            <button className="order-btn" onClick={placeOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
};
export default Cart;
