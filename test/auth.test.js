const request = require('supertest');
const app = require('../server');
const axios = require('axios');

jest.mock('axios');

describe('Auth Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /auth/login - success', async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { token: 'abc123' },
    });

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ token: 'abc123' });
  });

  test('POST /auth/register - user exists', async () => {
    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { message: 'User already exists' },
      },
    });

    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'exist@example.com', password: 'password' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: 'User already exists' });
  });

  test('GET /auth/getUser - success', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: { id: 1, email: 'user@example.com' },
    });

    const res = await request(app)
      .get('/auth/getUser')
      .set('Authorization', 'Bearer token123');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, email: 'user@example.com' });
  });
});