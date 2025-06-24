import React, { useState } from 'react'; 
import API from '../services/api';
import Layout from '../components/Layout';
import '../styles/AddBook.css'; 


const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '', author: '', genre: '', description: '', price: '', stock: '', image: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const genres = formData.genre.split(',').map(g => g.trim());

    try {
      const res = await API.post('/books', {
        ...formData,
        genre: genres,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      alert('Book added successfully!');
      setFormData({ title: '', author: '', genre: '', description: '', price: '', stock: '', image: '' });
    } catch (err) {
      console.error("Add book error:", err.response?.data || err.message);
      alert("Failed to add book.");
    }
  };

return (
    <Layout>
      <div className="add-book-container">
        <h2 className="form-heading">📚 Add a New Book</h2>
        <form className="book-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required />

          <label>Author</label>
          <input name="author" value={formData.author} onChange={handleChange} />

          <label>Genre (comma separated)</label>
          <input name="genre" value={formData.genre} onChange={handleChange} />

          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />

          <label>Price (₹)</label>
          <input name="price" type="number" value={formData.price} onChange={handleChange} />

          <label>Stock</label>
          <input name="stock" type="number" value={formData.stock} onChange={handleChange} />

          <label>Image URL</label>
          <input name="image" value={formData.image} onChange={handleChange} />

          <button type="submit">Add Book</button>
        </form>
      </div>
    </Layout>
  );
};

export default AddBook;

