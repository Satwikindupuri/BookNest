const express = require('express');
const router = express.Router();
const { getAllBooks, addBook, getSellerBooks, deleteBook,updateBook } = require('../controllers/bookController');
const { verifyToken } = require('../middleware/auth');

router.get('/', getAllBooks);
router.post('/', verifyToken, addBook); // Only logged-in users can post books
router.get('/seller/:sellerId', verifyToken, getSellerBooks);
router.delete('/:id', verifyToken, deleteBook);
router.put('/:id', verifyToken, updateBook);


module.exports = router;
