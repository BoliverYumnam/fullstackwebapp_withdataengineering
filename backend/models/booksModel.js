const pool = require('../db');

async function getBooks() {
  const res = await pool.query('SELECT * FROM books ORDER BY price ASC');
  return res.rows;
}

module.exports = { getBooks };
