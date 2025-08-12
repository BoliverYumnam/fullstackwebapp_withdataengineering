import React, { useEffect, useState } from 'react';
import './App.css';
import BookCard from './components/BookCard';

function App() {
  const [books, setBooks] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://fullstackwebappwithdataengineering-production.up.railway.app';
  const backendEndPoint = `${backendUrl}/books`;
  useEffect(() => {
    fetch(backendEndPoint)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched books:", data);
        setBooks(data);
      })
      .catch(err => console.error(err));
  }, [backendEndPoint]);

  const handleClick = (e) => {
    e.target.style.backgroundColor = '#ffe58f'; // light yellow highlight
    setTimeout(() => {
      e.target.style.backgroundColor = '';
    }, 1000);
  };

  return (
    <div className="app">
      <h1>Book Store</h1>

      <p style={{ marginBottom: '2rem' }}>
        Go to this{' '}
        <a
          href={backendEndPoint}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          style={{
            color: '#0077cc',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          backend API endpoint
        </a>{' '}
        to see the backend API data.
      </p>

      <div className="book-grid">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book, i) => <BookCard key={i} book={book} />)
        ) : (
          <p>No books found or data is invalid.</p>
        )}
      </div>
    </div>
  );
}

export default App;
