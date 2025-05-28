const { createProxyMiddleware } = require('http-proxy-middleware');

const authProxy = createProxyMiddleware({
  target: 'http://localhost:3001/',
  changeOrigin: true,
  pathRewrite: {
    '^/auth': '/api/auth', // dari /auth ke /api/auth
  },
});

const inventoriProxy = createProxyMiddleware({
  target: 'http://localhost:3005/',
  changeOrigin: true,
  pathRewrite: {
    '^/inventori': '/api', // dari /inventori ke /api
  },
});

const reservationProxy = createProxyMiddleware({
  target: 'http://localhost:3006/',
  changeOrigin: true,
  pathRewrite: {
    '^/reservations': '/api/reservations', // dari /reservations ke /api/reservations
  },
});

const tableProxy = createProxyMiddleware({
  target: 'http://localhost:3006/',
  changeOrigin: true,
  pathRewrite: {
    '^/tables': '/api/tables', // dari /reservations ke /api/reservations
  },
});

module.exports = {
  authProxy,
  inventoriProxy,
  reservationProxy,
  tableProxy,
};
