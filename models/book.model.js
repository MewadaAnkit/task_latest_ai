const fs = require('fs').promises;
const path = './data/books.json';

exports.getBooks = async () => {
  try {
    const data = await fs.readFile(path, 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
};

exports.saveBooks = async (books) => {
  await fs.writeFile(path, JSON.stringify(books, null, 2));
};
