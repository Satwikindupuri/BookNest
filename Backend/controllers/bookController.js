const Book = require('../models/Book');

// GET /api/books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error });
  }
};

// POST /api/books
const addBook = async (req, res) => {
  try {
    const newBook = new Book({
      ...req.body,
      sellerId: req.user.userId
    });

    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add book', error });
  }
};

const getSellerBooks = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const books = await Book.find({ sellerId });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seller books', error });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book', error });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updated = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book', error });
  }
};


module.exports = {
  getAllBooks,
  addBook,
  getSellerBooks,
  deleteBook,
  updateBook
};
