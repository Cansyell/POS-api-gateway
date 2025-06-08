const request = require('supertest');
const app = require('../server');
const axios = require('axios');

jest.mock('axios');

describe('Inventori Bahan Baku Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/inventori/bahan-baku - success', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: [{ id: 1, nama: 'Tepung', stok: 10 }],
    });

    const res = await request(app).get('/api/inventori/bahan-baku');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, nama: 'Tepung', stok: 10 }]);
  });

  test('POST /api/inventori/bahan-baku - success', async () => {
    const newBahan = { nama: 'Gula', stok: 20 };

    axios.post.mockResolvedValue({
      status: 201,
      data: { id: 2, ...newBahan },
    });

    const res = await request(app)
      .post('/api/inventori/bahan-baku')
      .send(newBahan);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 2, nama: 'Gula', stok: 20 });
  });

  test('GET /api/inventori/bahan-baku/:id - success', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: { id: 1, nama: 'Tepung', stok: 10 },
    });

    const res = await request(app).get('/api/inventori/bahan-baku/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, nama: 'Tepung', stok: 10 });
  });

  test('GET /api/inventori/bahan-baku/low-stock - success', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: [{ id: 3, nama: 'Mentega', stok: 2 }],
    });

    const res = await request(app).get('/api/inventori/bahan-baku/low-stock');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 3, nama: 'Mentega', stok: 2 }]);
  });

  test('PUT /api/inventori/bahan-baku/:id - success', async () => {
    const updateData = { nama: 'Tepung Terigu', stok: 50 };

    axios.put.mockResolvedValue({
      status: 200,
      data: { id: 1, ...updateData },
    });

    const res = await request(app)
      .put('/api/inventori/bahan-baku/1')
      .send(updateData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, nama: 'Tepung Terigu', stok: 50 });
  });

  test('PATCH /api/inventori/bahan-baku/:id/status - success', async () => {
    const statusUpdate = { status: 'nonaktif' };

    axios.patch.mockResolvedValue({
      status: 200,
      data: { id: 1, status: 'nonaktif' },
    });

    const res = await request(app)
      .patch('/api/inventori/bahan-baku/1/status')
      .send(statusUpdate);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, status: 'nonaktif' });
  });

  test('PATCH /api/inventori/bahan-baku/:id/stock - success', async () => {
    const stockUpdate = { stok: 100 };

    axios.patch.mockResolvedValue({
      status: 200,
      data: { id: 1, stok: 100 },
    });

    const res = await request(app)
      .patch('/api/inventori/bahan-baku/1/stock')
      .send(stockUpdate);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, stok: 100 });
  });

  test('DELETE /api/inventori/bahan-baku/:id - success', async () => {
    axios.delete.mockResolvedValue({
      status: 200,
      data: { message: 'Bahan baku deleted' },
    });

    const res = await request(app).delete('/api/inventori/bahan-baku/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Bahan baku deleted' });
  });
});
