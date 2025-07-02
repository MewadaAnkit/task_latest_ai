const request = require('supertest');
const app = require('../server');
const fs = require('fs').promises;

describe('Auth API', () => {
  beforeAll(async () => {
    await fs.writeFile('./data/users.json', '[]');
  },5000);

  const user = {
    email: 'test@example.com',
    password: 'password123'
  };

  test('should register a user', async () => {
    const res = await request(app).post('/api/register').send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/registered/i);
  });

  test('should not allow duplicate registration', async () => {
    const res = await request(app).post('/api/register').send(user);
    expect(res.statusCode).toBe(400);
  });

  test('should login and return a token', async () => {
    const res = await request(app).post('/api/login').send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
