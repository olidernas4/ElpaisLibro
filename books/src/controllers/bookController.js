//bookController.js
const Book = require('../models/book');

exports.createBook = (req, res) => {
  const newBook = req.body;
  Book.create(newBook, (err, results) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ id: results.insertId, ...newBook });
  });
};

exports.getBooks = (req, res) => {
  Book.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    return res.json(results);
  });
};

exports.getBookById = (req, res) => {
  const { id } = req.params;
  Book.getById(id, (err, results) => {
    if (err) return res.status(500).json(err);
    return res.json(results[0]);
  });
};

exports.updateBook = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  Book.update(id, updatedData, (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ id, ...updatedData });
  });
};

exports.deleteBook = (req, res) => {
  const { id } = req.params;
  Book.delete(id, (err) => {
    if (err) return res.status(500).json(err);
    return res.status(204).send();
  });
};
