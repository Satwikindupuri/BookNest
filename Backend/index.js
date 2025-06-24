const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes'); 
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // VERY IMPORTANT: To parse req.body

// ✅ Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); // ✅ This mounts the route
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/uploads', express.static('uploads'));



// Root test
app.get('/', (req, res) => {
  res.send("BookNest API is running...");
});

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch(err => {
  console.error("MongoDB connection failed:", err.message);
});
