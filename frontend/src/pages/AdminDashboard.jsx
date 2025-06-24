import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Layout from '../components/Layout';
import '../styles/AdminDashboard.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const userRes = await API.get('/users');
      const bookRes = await API.get('/books');
      const orderRes = await API.get('/orders/all'); // ✅ make sure backend is fixed!

      setUsers(userRes.data);
      setBooks(bookRes.data);
      setOrders(orderRes.data);
    } catch (err) {
      console.error('❌ Admin fetch error:', err);
      setError('Failed to load dashboard data.');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
      alert("User deleted.");
    } catch (err) {
      console.error("❌ User delete error:", err);
      alert("Failed to delete user.");
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await API.delete(`/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
      alert("Book deleted.");
    } catch (err) {
      console.error("❌ Book delete error:", err);
      alert("Failed to delete book.");
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      alert("✅ Status updated");
    } catch (err) {
      console.error("❌ Status update error:", err);
      alert("Failed to update status.");
    }
  };

  const vendors = users.filter(u => u.isSeller && !u.isAdmin);

  const chartData = [
    { name: 'Users', value: users.length },
    { name: 'Vendors', value: vendors.length },
    { name: 'Books', value: books.length },
    { name: 'Orders', value: orders.length }
  ];

  return (
    <Layout>
      <div className="admin-dashboard">
        <h2>📊 Admin Dashboard</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Metrics */}
        <div className="admin-metrics">
          <div className="metric-box users">👤<p>Users</p><h3>{users.length}</h3></div>
          <div className="metric-box vendors">🧑‍💼<p>Vendors</p><h3>{vendors.length}</h3></div>
          <div className="metric-box books">📚<p>Books</p><h3>{books.length}</h3></div>
          <div className="metric-box orders">📦<p>Orders</p><h3>{orders.length}</h3></div>
        </div>

        {/* Chart */}
        <div className="admin-chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Users */}
        <h3>👥 All Users</h3>
        <ul className="admin-list">
          {users.map(user => (
            <li key={user._id}>
              {user.name} — {user.email} {user.isAdmin ? "(Admin)" : user.isSeller ? "(Seller)" : "(User)"}
              {!user.isAdmin && (
                <button onClick={() => deleteUser(user._id)} className="delete-btn">Delete</button>
              )}
            </li>
          ))}
        </ul>

        {/* Books */}
        <h3>📚 All Books</h3>
        <ul className="admin-list">
          {books.map(book => (
            <li key={book._id}>
              {book.title} — ₹{book.price}
              <button onClick={() => deleteBook(book._id)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>

        {/* Orders */}
        <h3>📦 All Orders</h3>
        {orders.map(order => (
          <div key={order._id} className="admin-order-card">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>User:</strong> {order.userId?.name || 'Unknown'}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
            <ul>
              {order.books.map(book => (
                <li key={book.bookId}>
                  {book.bookId?.title || 'Deleted Book'} × {book.quantity}
                </li>
              ))}
            </ul>
            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="on the way">On the Way</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
