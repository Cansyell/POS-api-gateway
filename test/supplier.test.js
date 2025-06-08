const request = require('supertest');
const app = require('../server');
const axios = require('axios');

jest.mock('axios');

describe('Inventori - Supplier Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/inventori/suppliers - success', async () => {
    const mockData = { data: [{ id: 1, name: 'PT ABC' }], total: 1 };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/suppliers');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('GET /api/inventori/suppliers/search - success', async () => {
    const mockData = { data: [{ id: 1, name: 'PT DEF' }] };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/suppliers/search?name=DEF');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('GET /api/inventori/suppliers/:id - success', async () => {
    const mockData = { id: 1, name: 'PT XYZ' };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/suppliers/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('POST /api/inventori/suppliers - success', async () => {
    const input = { name: 'PT Baru', contact: 'John' };
    const mockData = { id: 2, ...input };

    axios.post.mockResolvedValue({ status: 201, data: mockData });

    const res = await request(app)
      .post('/api/inventori/suppliers')
      .send(input);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(mockData);
  });

  test('PUT /api/inventori/suppliers/:id - success', async () => {
    const input = { name: 'PT Diupdate' };
    const mockData = { id: 1, ...input };

    axios.put.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app)
      .put('/api/inventori/suppliers/1')
      .send(input);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('DELETE /api/inventori/suppliers/:id - soft delete', async () => {
    axios.delete.mockResolvedValue({ status: 200, data: { message: 'Supplier deactivated' } });

    const res = await request(app).delete('/api/inventori/suppliers/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Supplier deactivated' });
  });

  test('DELETE /api/inventori/suppliers/:id/permanent - hard delete', async () => {
    axios.delete.mockResolvedValue({ status: 200, data: { message: 'Supplier deleted permanently' } });

    const res = await request(app).delete('/api/inventori/suppliers/1/permanent');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Supplier deleted permanently' });
  });
});
