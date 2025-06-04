const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const services = {
  auth: 'http://localhost:3001',
  order: 'http://localhost:3003',
  payment: 'http://localhost:3004',
  inventori: 'http://localhost:3005',
  reservation: 'http://localhost:3006',
};

// Log setiap request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// === AUTH ===
// Login
app.post('/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${services.auth}/api/auth/login`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Register
app.post('/auth/register', async (req, res) => {
  try {
    const response = await axios.post(`${services.auth}/api/auth/register`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Get user
app.get('/auth/getUser', async (req, res) => {
  try {
    const response = await axios.get(`${services.auth}/api/auth/getUser`, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// === ORDER ===
// Get all orders
app.get('/orders', async (req, res) => {
  try {
    const response = await axios.get(`${services.order}/orders`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Get order by ID
app.get('/orders/:id', async (req, res) => {
  try {
    const response = await axios.get(`${services.order}/orders/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Create order
app.post('/orders', async (req, res) => {
  try {
    const response = await axios.post(`${services.order}/orders`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// === PAYMENT ===
// Get payments
app.get('/payments', async (req, res) => {
  try {
    const response = await axios.get(`${services.payment}/payments`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Create payment
app.post('/payments', async (req, res) => {
  try {
    const response = await axios.post(`${services.payment}/payments`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// === INVENTORI ===
// Get inventori items
app.get('/inventori/items', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/inventori/items`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Create inventori item
app.post('/inventori/items', async (req, res) => {
  try {
    const response = await axios.post(`${services.inventori}/inventori/items`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// === RESERVATION ===
// Get tables
app.get('/api/tables', async (req, res) => {
  try {
    const response = await axios.get(`${services.reservation}/api/tables`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Create reservation
app.post('/api/reservations', async (req, res) => {
  try {
    const response = await axios.post(`${services.reservation}/api/reservations`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));