import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Layout from '../components/Layout';
import '../styles/SellerDashboard.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SellerDashboard = () => {
  const [books, setBooks] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const navigate = useNavigate();
  const sellerId = localStorage.getItem('userId');

  // 📦 Fetch seller's books
  useEffect(() => {
    API.get(`/books/seller/${sellerId}`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Failed to fetch seller books:", err));
  }, [sellerId]);

  // 🛒 Fetch order count
  useEffect(() => {
    API.get(`/orders/seller/${sellerId}`)
      .then((res) => setOrderCount(res.data.length))
      .catch((err) => console.error("Failed to fetch seller orders:", err));
  }, [sellerId]);

  // ❌ Delete book handler
  const deleteBook = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await API.delete(`/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
      alert('Book deleted!');
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete book");
    }
  };

  const chartData = [
    { name: 'Items', value: books.length },
    { name: 'Orders', value: orderCount }
  ];

  return (
    <Layout>
      <div className="seller-dashboard">
        <h2>📈 Seller Dashboard</h2>

        {/* ✅ Metrics + Chart */}
        <div className="metrics-container">
          <div className="metric-box items">
            <p>📚 Items</p>
            <h3>{books.length}</h3>
          </div>
          <div className="metric-box orders">
            <p>🛒 Orders</p>
            <h3>{orderCount}</h3>
          </div>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>


      </div>
    </Layout>
  );
};

export default SellerDashboard;
