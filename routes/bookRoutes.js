const express = require('express');
const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  searchBooks
} = require('../controllers/bookController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// router.use(protect);

router.get('/',protect, getBooks);
router.get('/search',protect, searchBooks);
router.get('/:id',protect, getBookById);
router.post('/', protect,addBook);
router.put('/:id', protect ,updateBook);
router.delete('/:id', protect ,deleteBook);

module.exports = router;
