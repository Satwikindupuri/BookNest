const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const registerUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    console.log("📥 Incoming register request body:", req.body);

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration error', error });
    }
};

// Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        // Generate token
        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin, isSeller: user.isSeller },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, userId: user._id, isAdmin: user.isAdmin, isSeller: user.isSeller });
    } catch (error) {
        res.status(500).json({ message: 'Login error', error });
    }
};

const getAllUsers = async (req, res) => {
  console.log("📥 getAllUsers API hit");
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

module.exports = { registerUser, loginUser, getAllUsers };



/*const User = require('../models/user');

// Register
const registerUser = async (req, res) => {
    res.send("Register User - logic pending");
};

// Login
const loginUser = async (req, res) => {
    res.send("Login User - logic pending");
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    res.send("All Users - logic pending");
};

module.exports = { registerUser, loginUser, getAllUsers };
*/