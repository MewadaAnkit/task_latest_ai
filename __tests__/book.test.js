const request = require('supertest');
const app = require('../server');
const fs = require('fs').promises;

let token = '';
let bookId = '';

beforeAll(async () => {
  // Reset data files
  await fs.writeFile('./data/users.json', '[]');
  await fs.writeFile('./data/books.json', '[]');

  // Register and login user
  const user = { email: 'book@test.com', password: '123456' };
  await request(app).post('/api/register').send(user);
  const loginRes = await request(app).post('/api/login').send(user);
  token = loginRes.body.token;
},8000);

describe('Books API', () => {
  test('should add a book', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Book',
        author: 'Author X',
        genre: 'Fiction',
        publishedYear: 2022
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Book');
    bookId = res.body.id;
  });

  test('should get all books', async () => {
    const res = await request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should get book by ID', async () => {
    const res = await request(app)
      .get(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(bookId);
  });

  test('should update book', async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Book' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Book');
  });

  test('should delete book', async () => {
    const res = await request(app)
      .delete(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});
