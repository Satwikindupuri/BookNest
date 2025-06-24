import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Layout from '../components/Layout';

const MyProducts = () => {
  const [books, setBooks] = useState([]);
  const sellerId = localStorage.getItem('userId');

  useEffect(() => {
    API.get(`/books/seller/${sellerId}`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching seller books:", err));
  }, [sellerId]);

  return (
    <Layout>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>📦 My Products</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px'
      }}>
        {books.map(book => (
          <div key={book._id} style={{
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            padding: '16px',
            textAlign: 'center'
          }}>
            <img
              src={book.image}
              alt={book.title}
              style={{
                width: '100%',
                maxHeight: '220px',
                objectFit: 'contain',
                borderRadius: '6px',
                background: '#f8f8f8',
                padding: '10px'
              }}
            />
            <h3 style={{ margin: '10px 0', color: '#333' }}>{book.title}</h3>
            <p><strong>Price:</strong> ₹{book.price}</p>
            <p><strong>Stock:</strong> {book.stock}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button
                onClick={() => window.location.href = `/edit-book/${book._id}`}
                style={{ padding: '6px 12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteBook(book._id)}
                style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );

  async function deleteBook(id) {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await API.delete(`/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
      alert("Book deleted successfully!");
    } catch (err) {
      console.error("Failed to delete book:", err);
      alert("Failed to delete book.");
    }
  }
};

export default MyProducts;
