//book model
const db = require('../config/db');

const Book = {
  create: (bookData, callback) => {
    const sql = 'INSERT INTO books (title, author, status, rating, genre) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [bookData.title, bookData.author, bookData.status, bookData.rating, bookData.genre], callback);
  },

  getAll: (callback) => {
    const sql = 'SELECT * FROM books';
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = 'SELECT * FROM books WHERE id = ?';
    db.query(sql, [id], callback);
  },

  update: (id, bookData, callback) => {
    const sql = 'UPDATE books SET title = ?, author = ?, status = ?, rating = ?, genre = ? WHERE id = ?';
    db.query(sql, [bookData.title, bookData.author, bookData.status, bookData.rating, bookData.genre, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM books WHERE id = ?';
    db.query(sql, [id], callback);
  },
};

module.exports = Book;
