//bookroute
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/books', /*authMiddleware*/ bookController.createBook);
router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', /*authMiddleware*/ bookController.updateBook);
router.delete('/books/:id',/* authMiddleware*/ bookController.deleteBook);

module.exports = router;
