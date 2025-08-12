const express = require('express');
const cors = require('cors');
require('dotenv').config();

const booksRouter = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());

//the below three linew were the lines that was required for the url/books.
app.get('/', (req, res) => {
  res.send('Backend server is up and running!');
});

app.use('/books', booksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
