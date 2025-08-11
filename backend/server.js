const express = require('express');
const cors = require('cors');
require('dotenv').config();

const booksRouter = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/books', booksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
