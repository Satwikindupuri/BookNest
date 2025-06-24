import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post('/users/login', formData);

    const token = res.data.token;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', res.data.userId);
    localStorage.setItem('isAdmin', res.data.isAdmin);
    localStorage.setItem('isSeller', res.data.isSeller);

    alert('Login successful!');

    if (res.data.isAdmin) {
      navigate('/admin-dashboard');
    } else if (res.data.isSeller) {
      navigate('/seller-dashboard');
    } else {
      navigate('/books');
    }

  } catch (err) {
    alert('Login failed.');
    console.error(err.response?.data || err.message);
  }
};


  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login to user account</h2>

        <label>Email address</label>
        <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Log in</button>

        <p>Don't have an account? Create <Link to="/register" className="link">Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;



//without CSS
/*import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/login', formData);
      const { token, userId } = res.data;

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      // Decode token to get roles
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const isAdmin = decoded.isAdmin;
      const isSeller = decoded.isSeller;

      if (isAdmin) {
        navigate('/admin-dashboard');
      } else if (isSeller) {
        navigate('/seller-dashboard');
      } else {
        navigate('/books');
      }

      alert('Login successful!');
    } catch (err) {
      alert('Login failed.');
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required /><br />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
*/