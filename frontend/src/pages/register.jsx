import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      alert('Registration failed. Try a different email.');
    }
  };

  return (
  <div className="register-container">
    <form className="register-card" onSubmit={handleSubmit}>
      <h2>Create your account</h2>

      <label>Name</label>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />

      <label>Email</label>
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

      <label>Password</label>
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

      <button type="submit">Register</button>
    </form>
  </div>
);
};

export default Register;
