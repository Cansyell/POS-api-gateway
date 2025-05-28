const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logging

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100 // limit setiap IP ke 100 request per windowMs
});
app.use(limiter);

// Middleware untuk verifikasi token
const verifyToken = async (req, res, next) => {
  // Skip auth untuk path tertentu (contoh: login, register)
  const publicPaths = ['/auth/login', '/auth/register'];
  if (publicPaths.includes(req.path)) return next();

  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak. Token diperlukan.' });
  }
  
  try {
    // Verifikasi token menggunakan secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid atau kedaluwarsa.' });
  }
};

// Middleware auth untuk semua request
app.use(verifyToken);

// Konfigurasi proxy untuk setiap service
const serviceProxies = {
//   auth: {
//     target: 'http://localhost:3001',
//     pathRewrite: { '^/auth': '' },
//   },
//   product: {
//     target: 'http://localhost:3002',
//     pathRewrite: { '^/product': '' },
//   },
//   category: {
//     target: 'http://localhost:3003',
//     pathRewrite: { '^/category': '' },
//   },
//   order: {
//     target: 'http://localhost:3004',
//     pathRewrite: { '^/order': '' },
//   },
//   payment: {
//     target: 'http://localhost:3005',
//     pathRewrite: { '^/payment': '' },
//   },
  reservation: {
    target: 'http://localhost:3006',
    pathRewrite: { '^/reservation': '/api' },
  },
//   employee: {
//     target: 'http://localhost:3007',
//     pathRewrite: { '^/employee': '' },
//   },
};

// Setup proxy middlewares
Object.entries(serviceProxies).forEach(([path, config]) => {
  app.use(`/${path}`, createProxyMiddleware({
    target: config.target,
    changeOrigin: true,
    pathRewrite: config.pathRewrite,
    onProxyReq: (proxyReq, req, res) => {
      // Meneruskan user info ke service jika ada
      if (req.user) {
        proxyReq.setHeader('X-User-Id', req.user.id);
        proxyReq.setHeader('X-User-Role', req.user.role);
      }
    }
  }));
});

// Route fallback
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan pada server' });
});

app.listen(PORT, () => {
  console.log(`API Gateway berjalan di port ${PORT}`);
});