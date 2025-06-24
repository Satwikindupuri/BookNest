import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import Layout from '../components/Layout';

const EditBook = () => {
  const { id } = useParams(); // book id
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '', author: '', genre: '', description: '', price: '', stock: '', image: ''
  });

  // Fetch book details on load
  useEffect(() => {
    API.get(`/books/${id}`)
      .then((res) => {
        const book = res.data;
        setFormData({
          title: book.title,
          author: book.author,
          genre: Array.isArray(book.genre) ? book.genre.join(', ') : book.genre,
          description: book.description,
          price: book.price,
          stock: book.stock,
          image: book.image
        });
      })
      .catch(err => {
        console.error('Failed to fetch book:', err);
        alert('Error fetching book.');
      });
  }, [id]);

  // Handle input
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/books/${id}`, {
        ...formData,
        genre: formData.genre.split(',').map(g => g.trim()),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      alert('Book updated successfully!');
      navigate('/seller-dashboard');
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update book.");
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: '500px', margin: 'auto' }}>
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required /><br /><br />
          <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} /><br /><br />
          <input name="genre" placeholder="Genre (comma separated)" value={formData.genre} onChange={handleChange} /><br /><br />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} /><br /><br />
          <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} /><br /><br />
          <input name="stock" placeholder="Stock" type="number" value={formData.stock} onChange={handleChange} /><br /><br />
          <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} /><br /><br />
          <button type="submit">Update Book</button>
        </form>
      </div>
    </Layout>
  );
};

export default EditBook;
