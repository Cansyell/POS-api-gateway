const request = require('supertest');
const app = require('../server');
const axios = require('axios');

jest.mock('axios');

describe('Inventori - Purchase Order Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/inventori/purchase-orders - get all purchase orders', async () => {
    const mockData = { data: [{ id: 1, kode: 'PO001' }] };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/purchase-orders');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('GET /api/inventori/purchase-orders/search - search purchase orders', async () => {
    const mockData = { data: [{ id: 2, kode: 'PO002' }] };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/purchase-orders/search?q=PO002');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('GET /api/inventori/purchase-orders/supplier/:supplierId - get by supplier ID', async () => {
    const mockData = { data: [{ id: 3, supplierId: 1 }] };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/purchase-orders/supplier/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('GET /api/inventori/purchase-orders/:id - get by ID', async () => {
    const mockData = { id: 4, kode: 'PO004' };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/purchase-orders/4');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('POST /api/inventori/purchase-orders - create purchase order', async () => {
    const input = { kode: 'PO005', supplierId: 2 };
    const mockData = { id: 5, ...input };
    axios.post.mockResolvedValue({ status: 201, data: mockData });

    const res = await request(app).post('/api/inventori/purchase-orders').send(input);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(mockData);
  });

  test('PUT /api/inventori/purchase-orders/:id - update purchase order', async () => {
    const input = { kode: 'PO005-UPDATED' };
    const mockData = { id: 5, ...input };
    axios.put.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).put('/api/inventori/purchase-orders/5').send(input);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('PATCH /api/inventori/purchase-orders/:id/status - update status', async () => {
    const input = { status: 'diterima' };
    const mockData = { id: 5, status: 'diterima' };
    axios.patch.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).patch('/api/inventori/purchase-orders/5/status').send(input);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('PATCH /api/inventori/purchase-orders/:id/cancel - cancel purchase order', async () => {
    const mockData = { id: 5, status: 'dibatalkan' };
    axios.patch.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).patch('/api/inventori/purchase-orders/5/cancel');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('DELETE /api/inventori/purchase-orders/:id - delete purchase order', async () => {
    axios.delete.mockResolvedValue({ status: 200, data: { message: 'Purchase order deleted' } });

    const res = await request(app).delete('/api/inventori/purchase-orders/5');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Purchase order deleted' });
  });
});
