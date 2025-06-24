import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Layout from '../components/Layout';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get('/books')
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const addToCart = (book) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(item => item._id === book._id);
    if (exists) return alert('Book already in cart!');
    cart.push({ ...book, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Book added to cart!');
  };

  return (
    <Layout>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Books List</h2>
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
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre.join(', ')}</p>
            <p style={{ color: '#007bff', fontWeight: 'bold' }}>Price: ₹{book.price}</p>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button
                onClick={() => addToCart(book)}
                style={{ padding: '6px 12px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Add to Cart
              </button>
              <button
                style={{ padding: '6px 12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Books;
