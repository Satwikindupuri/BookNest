import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Layout from '../components/Layout';
import '../styles/MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    API.get(`/orders/my-orders/${userId}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error('Fetch failed:', err));
  }, [userId]);

  return (
    <Layout>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div>
      {orders.map(order => (
        <div className="order-card" key={order._id}>
          <img src={order.books[0]?.bookId?.image || 'https://via.placeholder.com/80'} alt="book" />
          <div className="order-details">
            <h3>{order.books[0]?.bookId?.title || 'Unknown Book'}</h3>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Price:</strong> ₹{order.totalPrice}</p>
            <p><strong>Seller:</strong> {order.seller || 'N/A'}</p>
            <p><strong>Ordered On:</strong> {order.bookingDate || 'N/A'}</p>
            <p><strong>Delivery By:</strong> {order.deliveryDate || 'N/A'}</p>
            <p><strong>Status:</strong> {order.status || 'pending'}</p>
            <p><strong>Address:</strong> {order.address}</p>
          </div>
        </div>
      ))}
        </div>
      )}
    </Layout>
  );
};

export default MyOrders;
