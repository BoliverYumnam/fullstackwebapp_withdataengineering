const booksModel = require('../models/booksModel');

async function fetchBooks(req, res) {
  try {
    const books = await booksModel.getBooks();
    console.log("Fetched books from DB:", books);  // Add this line
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}


module.exports = { fetchBooks };
