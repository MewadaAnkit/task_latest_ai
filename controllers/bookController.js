const { getBooks, saveBooks } = require('../models/book.model');
const { v4: uuidv4 } = require('uuid');

exports.getBooks = async (req, res) => {
  const books = await getBooks();
  res.status(200).json(books);
};

exports.getBookById = async (req, res) => {
  const books = await getBooks();
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json(book);
};

exports.addBook = async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  const books = await getBooks();
  const newBook = {
    id: uuidv4(),
    title,
    author,
    genre,
    publishedYear,
    userId: req.user.id
  };
  books.push(newBook);
  await saveBooks(books);
  res.status(201).json(newBook);
};

exports.updateBook = async (req, res) => {
  const books = await getBooks();
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  // console.log(req.user , "user")
  if (books[index].userId !== req.user.id)
    return res.status(403).json({ message: 'Not authorized' });

  books[index] = { ...books[index], ...req.body };
  await saveBooks(books);
  res.status(200).json(books[index]);
};

exports.deleteBook = async (req, res) => {
  const books = await getBooks();
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  if (books[index].userId !== req.user.id)
    return res.status(403).json({ message: 'Not authorized' });

  books.splice(index, 1);
  await saveBooks(books);
  res.status(200).json({ message: 'Book deleted successfully' });
};

exports.searchBooks = async (req, res) => {
  const books = await getBooks();
  const { genre } = req.query;
  const filtered = books.filter(b => b.genre === genre);
  res.status(200).json(filtered);
};
