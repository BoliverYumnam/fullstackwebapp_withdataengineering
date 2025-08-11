import React from 'react';
import './BookCard.css';

function BookCard({ book }) {
  return (
    <div className="book-card">
      <h2>{book.title}</h2>
      <p>Price: ${book.price}</p>
      <p>Rating: {book.rating}</p>
      <p>{book.availability}</p>
    </div>
  );
}

export default BookCard;
