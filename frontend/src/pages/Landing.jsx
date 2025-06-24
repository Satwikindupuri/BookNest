import React from 'react';
import Layout from '../components/Layout';
import '../styles/Landing.css';

const landingBooks = [
  {
    title: "It Ends with Us",
    image: "https://m.media-amazon.com/images/I/51LCO+afezL._SY445_SX342_.jpg"
  },
  {
    title: "Game of Thrones: The Complete Seventh Season",
    image: "https://m.media-amazon.com/images/I/911qiNXkPLL._SX679_.jpg"
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    image: "https://m.media-amazon.com/images/I/81NQA1BDlnL._SY342_.jpg"
  },
  {
    title: "The Secret Garden: The Story of the Movie",
    image: "https://m.media-amazon.com/images/I/510EmnKhUYL._SY445_SX342_.jpg"
  },
  {
    title: "The Complete Novels of Sherlock Holmes",
    image: "https://m.media-amazon.com/images/I/71FnvvhcaTL._SY342_.jpg"
  },
  {
    title: "The Merry Adventures of Robin Hood",
    image: "https://m.media-amazon.com/images/I/71VmNm-a7iL._SY342_.jpg"
  },
];

const Landing = () => {
  return (
    <Layout>
      <div className="landing-container">
        <h2 className="landing-title">🔥 Best Sellers</h2>
        <div className="book-grid">
          {landingBooks.map((book, idx) => (
            <div className="book-card" key={idx}>
              <img src={book.image} alt={book.title} />
              <p className="book-title">{book.title}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
