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
  table: 'http://localhost:3006',
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
// app.get('/orders', async (req, res) => {
//   try {
//     const response = await axios.get(`${services.order}/orders`);
//     res.status(response.status).json(response.data);
//   } catch (error) {
//     const status = error.response?.status || 500;
//     const data = error.response?.data || { message: 'Internal Server Error' };
//     res.status(status).json(data);
//   }
// });

// // Get order by ID
// app.get('/orders/:id', async (req, res) => {
//   try {
//     const response = await axios.get(`${services.order}/orders/${req.params.id}`);
//     res.status(response.status).json(response.data);
//   } catch (error) {
//     const status = error.response?.status || 500;
//     const data = error.response?.data || { message: 'Internal Server Error' };
//     res.status(status).json(data);
//   }
// });

// // Create order
// app.post('/orders', async (req, res) => {
//   try {
//     const response = await axios.post(`${services.order}/orders`, req.body);
//     res.status(response.status).json(response.data);
//   } catch (error) {
//     const status = error.response?.status || 500;
//     const data = error.response?.data || { message: 'Internal Server Error' };
//     res.status(status).json(data);
//   }
// });

// === PAYMENT ===
// Get payments
// app.get('/payments', async (req, res) => {
//   try {
//     const response = await axios.get(`${services.payment}/payments`);
//     res.status(response.status).json(response.data);
//   } catch (error) {
//     const status = error.response?.status || 500;
//     const data = error.response?.data || { message: 'Internal Server Error' };
//     res.status(status).json(data);
//   }
// });

// // Create payment
// app.post('/payments', async (req, res) => {
//   try {
//     const response = await axios.post(`${services.payment}/payments`, req.body);
//     res.status(response.status).json(response.data);
//   } catch (error) {
//     const status = error.response?.status || 500;
//     const data = error.response?.data || { message: 'Internal Server Error' };
//     res.status(status).json(data);
//   }
// });

// === INVENTORI ===

// Endpoint: Get all bahan baku
app.get('/api/inventori/bahan-baku', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/bahan-baku`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Endpoint: Create new bahan baku
app.post('/api/inventori/bahan-baku', async (req, res) => {
  try {
    const response = await axios.post(`${services.inventori}/api/bahan-baku`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Endpoint: Get bahan baku by ID
app.get('/api/inventori/bahan-baku/:id', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/bahan-baku/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Endpoint: Get bahan baku with low stock
app.get('/api/inventori/bahan-baku/low-stock', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/bahan-baku/low-stock`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Endpoint: Update bahan baku by ID
app.put('/api/inventori/bahan-baku/:id', async (req, res) => {
  try {
    const response = await axios.put(`${services.inventori}/api/bahan-baku/${req.params.id}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Endpoint: Update status bahan baku
app.patch('/api/inventori/bahan-baku/:id/status', async (req, res) => {
  try {
    const response = await axios.patch(`${services.inventori}/api/bahan-baku/${req.params.id}/status`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Endpoint: Update stok bahan baku
app.patch('/api/inventori/bahan-baku/:id/stock', async (req, res) => {
  try {
    const response = await axios.patch(`${services.inventori}/api/bahan-baku/${req.params.id}/stock`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Endpoint: Delete bahan baku
app.delete('/api/inventori/bahan-baku/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${services.inventori}/api/bahan-baku/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

//Supplier
// Get all suppliers (with pagination, filter, search)
app.get('/api/inventori/suppliers', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/suppliers`, { params: req.query });
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Search suppliers by name, contact person, or email
app.get('/api/inventori/suppliers/search', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/suppliers/search`, { params: req.query });
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Get supplier by ID
app.get('/api/inventori/suppliers/:id', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/suppliers/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Create a new supplier
app.post('/api/inventori/suppliers', async (req, res) => {
  try {
    const response = await axios.post(`${services.inventori}/api/suppliers`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Update a supplier by ID
app.put('/api/inventori/suppliers/:id', async (req, res) => {
  try {
    const response = await axios.put(`${services.inventori}/api/suppliers/${req.params.id}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Soft delete a supplier (update status to tidak_aktif)
app.delete('/api/inventori/suppliers/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${services.inventori}/api/suppliers/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Permanently delete a supplier
app.delete('/api/inventori/suppliers/:id/permanent', async (req, res) => {
  try {
    const response = await axios.delete(`${services.inventori}/api/suppliers/${req.params.id}/permanent`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

//RESEP
// Get all resep
app.get('/api/inventori/resep', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/resep`, { params: req.query });
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Get kategori resep
app.get('/api/inventori/resep/kategori', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/resep/kategori`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Search resep
app.get('/api/inventori/resep/search', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/resep/search`, { params: req.query });
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Get resep by ID
app.get('/api/inventori/resep/:id', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/resep/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Create resep
app.post('/api/inventori/resep', async (req, res) => {
  try {
    const response = await axios.post(`${services.inventori}/api/resep`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Update resep
app.put('/api/inventori/resep/:id', async (req, res) => {
  try {
    const response = await axios.put(`${services.inventori}/api/resep/${req.params.id}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Update status resep
app.patch('/api/inventori/resep/:id/status', async (req, res) => {
  try {
    const response = await axios.patch(`${services.inventori}/api/resep/${req.params.id}/status`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Delete resep
app.delete('/api/inventori/resep/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${services.inventori}/api/resep/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

//Resep-detail
// Get all resep details (with pagination/filter)
app.get('/api/inventori/resep-details', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/resep-details`, {
      params: req.query
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Get resep detail by ID
app.get('/api/inventori/resep-details/:id', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/resep-details/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Get all ingredients for a specific recipe
app.get('/api/inventori/resep-details/resep/:id_resep', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/resep-details/resep/${req.params.id_resep}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Create a new resep detail
app.post('/api/inventori/resep-details', async (req, res) => {
  try {
    const response = await axios.post(`${services.inventori}/api/resep-details`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Batch create resep details
app.post('/api/inventori/resep-details/batch', async (req, res) => {
  try {
    const response = await axios.post(`${services.inventori}/api/resep-details/batch`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Update resep detail (quantity/unit)
app.patch('/api/inventori/resep-details/:id', async (req, res) => {
  try {
    const response = await axios.patch(`${services.inventori}/api/resep-details/${req.params.id}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Batch update resep details
app.put('/api/inventori/resep-details/resep/:id_resep/batch', async (req, res) => {
  try {
    const response = await axios.put(`${services.inventori}/api/resep-details/resep/${req.params.id_resep}/batch`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Delete resep detail
app.delete('/api/inventori/resep-details/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${services.inventori}/api/resep-details/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

//Purchase Order
// Get all purchase orders (dengan filter & pagination)
app.get('/api/inventori/purchase-orders', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/purchase-orders`, {
      params: req.query
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Search purchase orders
app.get('/api/inventori/purchase-orders/search', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/purchase-orders/search`, {
      params: req.query
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Get purchase orders by supplier ID
app.get('/api/inventori/purchase-orders/supplier/:supplierId', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/purchase-orders/supplier/${req.params.supplierId}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Get a single purchase order by ID
app.get('/api/inventori/purchase-orders/:id', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/purchase-orders/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Create a new purchase order
app.post('/api/inventori/purchase-orders', async (req, res) => {
  try {
    const response = await axios.post(`${services.inventori}/api/purchase-orders`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Update a purchase order
app.put('/api/inventori/purchase-orders/:id', async (req, res) => {
  try {
    const response = await axios.put(`${services.inventori}/api/purchase-orders/${req.params.id}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Update purchase order status
app.patch('/api/inventori/purchase-orders/:id/status', async (req, res) => {
  try {
    const response = await axios.patch(`${services.inventori}/api/purchase-orders/${req.params.id}/status`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Cancel a purchase order
app.patch('/api/inventori/purchase-orders/:id/cancel', async (req, res) => {
  try {
    const response = await axios.patch(`${services.inventori}/api/purchase-orders/${req.params.id}/cancel`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Delete a purchase order
app.delete('/api/inventori/purchase-orders/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${services.inventori}/api/purchase-orders/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

//PO-Detail
// Get all PO details
app.get('/api/inventori/po-details', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/po-details`, {
      params: req.query
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Get PO detail by ID
app.get('/api/inventori/po-details/:id', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/po-details/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Get all details for specific PO
app.get('/api/inventori/po-details/po/:poId', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/po-details/po/${req.params.poId}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Get PO details summary by status
app.get('/api/inventori/po-details/po/:poId/summary', async (req, res) => {
  try {
    const response = await axios.get(`${services.inventori}/api/po-details/po/${req.params.poId}/summary`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Create a single PO detail
app.post('/api/inventori/po-details', async (req, res) => {
  try {
    const response = await axios.post(`${services.inventori}/api/po-details`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Bulk create PO details
app.post('/api/inventori/po-details/bulk', async (req, res) => {
  try {
    const response = await axios.post(`${services.inventori}/api/po-details/bulk`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Update PO detail
app.put('/api/inventori/po-details/:id', async (req, res) => {
  try {
    const response = await axios.put(`${services.inventori}/api/po-details/${req.params.id}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Update PO detail status (status + jumlah_diterima)
app.patch('/api/inventori/po-details/:id/status', async (req, res) => {
  try {
    const response = await axios.patch(`${services.inventori}/api/po-details/${req.params.id}/status`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});


// === RESERVATION TABLE ===
// Get all tables
app.get('/api/tables', async (req, res) => {
  try {
    const response = await axios.get(`${services.table}/api/tables`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Get available tables
app.get('/api/tables/available', async (req, res) => {
  try {
    const response = await axios.get(`${services.table}/api/tables/available`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Get table by ID
app.get('/api/tables/:id', async (req, res) => {
  try {
    const response = await axios.get(`${services.table}/api/tables/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Create new table (admin only)
app.post('/api/tables', async (req, res) => {
  try {
    const response = await axios.post(`${services.table}/api/tables`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Update table status (admin only)
app.patch('/api/tables/:id/status', async (req, res) => {
  try {
    const response = await axios.patch(`${services.table}/api/tables/${req.params.id}/status`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Delete table (admin only)
app.delete('/api/tables/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${services.table}/api/tables/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// RESERVATION
// Create reservation di API Gateway dengan logging
app.post('/api/reservations', async (req, res) => {
  try {
    console.log('=== API GATEWAY DEBUG ===');
    console.log('Received headers:', req.headers);
    console.log('Authorization header:', req.headers.authorization);
    console.log('Request body:', req.body);
    
    const response = await axios.post(`${services.reservation}/api/reservations`, req.body, {
      headers: {
        Authorization: req.headers.authorization,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response from reservation service:', response.status);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('API Gateway Error:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Get all reservations
app.get('/api/reservations', async (req, res) => {
  try {
    const response = await axios.get(`${services.reservation}/api/reservations`, {
      headers: req.headers
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Get reservation by ID
app.get('/api/reservations/:id', async (req, res) => {
  try {
    console.log('=== API GATEWAY DEBUG ===');
    console.log('Received headers:', req.headers);
    console.log('Authorization header:', req.headers.authorization);

    // Minta user dari Auth Service
    const userResponse = await axios.get('http://localhost:3000/auth/getUser', {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    const user = userResponse.data.user;
    if (!user) {
      return res.status(401).json({ message: 'User tidak valid' });
    }

    // Kirim permintaan ke Reservation Service untuk ID tertentu, sertakan user ID di header
    const response = await axios.get(`${services.reservation}/api/reservations/${req.params.id}`, {
      headers: {
        'x-user-id': user.id, // Kirim ID user via header
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});


// Get user reservations
app.get('/api/reservations/user', async (req, res) => {
  try {
    console.log('=== API GATEWAY DEBUG ===');
    console.log('Received headers:', req.headers);
    console.log('Authorization header:', req.headers.authorization);

    // Minta user dari Auth Service
    const userResponse = await axios.get('http://localhost:3000/auth/getUser', {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    const user = userResponse.data.user;

    if (!user) {
      return res.status(401).json({ message: 'User tidak valid' });
    }

    // Kirim permintaan ke Reservation Service, sertakan user ID di header
    const response = await axios.get(`${services.reservation}/api/reservations/user`, {
      headers: {
        'x-user-id': user.id,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response from reservation service:', response.status);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('API Gateway Error:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Update reservation status
app.patch('/api/reservations/:id/status', async (req, res) => {
  try {
    console.log('=== API GATEWAY PATCH /api/reservations/:id/status ===');
    console.log('Received headers:', req.headers);
    console.log('Authorization header:', req.headers.authorization);
    console.log('Request body:', req.body);

    const response = await axios.patch(
      `${services.reservation}/api/reservations/${req.params.id}/status`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Response from reservation service:', response.status);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('API Gateway PATCH Error:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});

// Cancel reservation
app.delete('/api/reservations/:id', async (req, res) => {
  try {
    console.log('=== API GATEWAY DELETE /api/reservations/:id ===');
    console.log('Received headers:', req.headers);
    console.log('Authorization header:', req.headers.authorization);

    const response = await axios.delete(
      `${services.reservation}/api/reservations/${req.params.id}`,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    console.log('Response from reservation service:', response.status);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('API Gateway DELETE Error:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    res.status(status).json(data);
  }
});


const PORT = 3000;
// app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
module.exports=app;