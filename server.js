const express = require('express');
const {
  authProxy,
  inventoriProxy,
  reservationProxy,
  tableProxy,
} = require('./proxy/ProxyHandler');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

  if (req.headers['content-type']) {
    console.log(`Content-Type: ${req.headers['content-type']}`);
  }

  if (['POST', 'PUT', 'PATCH'].includes(method) && req.body) {
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
  }

  if (Object.keys(req.query).length > 0) {
    console.log('Query Params:', req.query);
  }

  const originalSend = res.send;
  res.send = function (data) {
    const endTime = new Date().toISOString();
    console.log(`[${endTime}] Response ${res.statusCode} for ${method} ${url}`);

    if (data && typeof data === 'string' && data.length < 1000) {
      console.log('Response Body:', data);
    } else if (data) {
      console.log(`Response Size: ${data.length} chars`);
    }

    console.log('--------------------------------------------------');
    return originalSend.call(this, data);
  };

  next();
});

// Proxy logging middleware
const logProxy = (serviceName) => (req, res, next) => {
  console.log(`Proxying to ${serviceName} service: ${req.method} ${req.url}`);
  next();
};

// Setup proxy routes
app.use('/auth', logProxy('AUTH'), authProxy);
app.use('/inventori', logProxy('INVENTORI'), inventoriProxy);
app.use('/reservations', logProxy('RESERVATION'), reservationProxy);
app.use('/tables', logProxy('TABLES'), tableProxy);

// 404 handler
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    url: req.url,
    availableRoutes: ['/auth', '/inventori', '/reservations', '/tables'],
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(`ERROR on ${req.method} ${req.url}:`, err.message);
  console.error('Stack trace:', err.stack);

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(3000, () => {
  console.log('API Gateway is running on port 3000');
  console.log('Available proxy routes:');
  console.log('   /auth         -> http://localhost:3001/api/auth/*');
  console.log('   /inventori    -> http://localhost:3005/api/*');
  console.log('   /reservations -> http://localhost:3006/api/reservations/*');
  console.log('   /tables       -> http://localhost:3006/api/tables/tables/*');
  console.log('------------------------------------------------------------');
});
