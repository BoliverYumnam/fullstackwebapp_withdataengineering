const express = require('express');
const router = express.Router();
const { fetchBooks } = require('../controllers/booksControllers');

router.get('/', fetchBooks);

module.exports = router;
