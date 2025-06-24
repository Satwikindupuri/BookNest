const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    genre: [String],
    description: String,
    price: Number,
    stock: Number,
    image: String, // optional
    rating: {
        type: Number,
        default: 0
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/80' // Default image URL if none provided
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
