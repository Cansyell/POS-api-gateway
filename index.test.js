// index.test.js
const request = require('supertest');
const express = require('express');

// Mock dotenv config supaya process.env terbaca
require('dotenv').config();

// Mock proxy middleware
jest.mock('http-proxy-middleware', () => {
  return {
    createProxyMiddleware: jest.fn((opts) => {
      // Middleware dummy yang hanya respon dengan fixed message
      return (req, res) => {
        res.json({ proxiedTo: opts.target, path: req.path });
      };
    }),
  };
});

const setupProxy = require('./proxy/proxy');

describe('API Gateway proxy', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    setupProxy(app);
    // fallback 404
    app.use((req, res) => {
      res.status(404).json({ error: 'Route not found' });
    });
  });

  test('should proxy /auth route', async () => {
    const res = await request(app).get('/auth/login');
    expect(res.statusCode).toBe(200);
    expect(res.body.proxiedTo).toBe(process.env.AUTH_SERVICE_URL);
    expect(res.body.path).toBe('/login');
  });

  test('should return 404 for unknown route', async () => {
    const res = await request(app).get('/unknownroute');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Route not found');
  });
});
