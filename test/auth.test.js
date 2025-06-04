require('dotenv').config();
const request = require('supertest');
const nock = require('nock');
const express = require('express');
const { proxyRequest } = require('./proxy/proxy');

// Setup Express app for testing (mirip index.js tapi minimal)
const app = express();
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  // skip actual console.log biar test output gak berantakan
  next();
});

app.use('/auth', (req, res) => proxyRequest(req, res, 'auth', '/auth'));

describe('API Gateway - Auth Service', () => {
  const authBaseUrl = process.env.AUTH_SERVICE_URL.replace(/\/$/, '');

  afterEach(() => {
    nock.cleanAll();
  });

  test('POST /auth/login - success', async () => {
    // Mock response dari auth service
    nock(authBaseUrl)
      .post('/login', { username: 'testuser', password: 'pass123' })
      .reply(200, {
        token: 'fake-jwt-token',
        user: { id: 1, username: 'testuser' },
      });

    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'pass123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', 'fake-jwt-token');
    expect(response.body.user).toMatchObject({ id: 1, username: 'testuser' });
  });

  test('POST /auth/login - invalid credentials', async () => {
    nock(authBaseUrl)
      .post('/login')
      .reply(401, { message: 'Invalid credentials' });

    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'wrong', password: 'wrongpass' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

  test('GET /auth/getUser - success', async () => {
    nock(authBaseUrl)
      .get('/getUser')
      .reply(200, { id: 1, username: 'testuser', email: 'test@example.com' });

    const response = await request(app).get('/auth/getUser');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  test('Service down - should return 500', async () => {
    nock(authBaseUrl)
      .post('/login')
      .replyWithError('Service unavailable');

    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'pass123' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Proxy request failed');
  });
});