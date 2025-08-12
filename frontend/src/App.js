import React, { useEffect, useState } from 'react';
import './App.css';
import BookCard from './components/BookCard';

function App() {
  const [books, setBooks] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  useEffect(() => {
    fetch(`${backendUrl}/books`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched books:", data);
        setBooks(data);
      })
      .catch(err => console.error(err));
  }, [backendUrl]);


  return (
    <div className="app">
      <h1>Book Store</h1>
      
      <div className="book-grid">
      {Array.isArray(books) ? (
        books.map((book, i) => <BookCard key={i} book={book} />)
      ) : (
        <p>No books found or data is invalid.</p>
      )}
    </div>
    </div>
  );
}

export default App;
