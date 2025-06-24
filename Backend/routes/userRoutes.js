const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', verifyToken, isAdmin, getAllUsers); // For admin - list all users

module.exports = router;
