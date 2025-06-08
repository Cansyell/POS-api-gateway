const request = require('supertest');
const app = require('../server');
const axios = require('axios');

jest.mock('axios');

describe('Inventori - Resep Detail Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/inventori/resep-details - get all resep details', async () => {
    const mockData = { data: [{ id: 1, bahan: 'Gula', jumlah: 2 }] };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/resep-details');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('GET /api/inventori/resep-details/:id - get resep detail by ID', async () => {
    const mockData = { id: 2, bahan: 'Susu', jumlah: 1 };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/resep-details/2');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('GET /api/inventori/resep-details/resep/:id_resep - get all ingredients for a specific recipe', async () => {
    const mockData = { data: [{ id: 1, bahan: 'Gula' }, { id: 2, bahan: 'Susu' }] };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/resep-details/resep/10');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('POST /api/inventori/resep-details - create resep detail', async () => {
    const input = { id_resep: 10, id_bahan: 5, jumlah: 2, satuan: 'gram' };
    const mockData = { id: 3, ...input };
    axios.post.mockResolvedValue({ status: 201, data: mockData });

    const res = await request(app).post('/api/inventori/resep-details').send(input);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(mockData);
  });

  test('POST /api/inventori/resep-details/batch - batch create resep details', async () => {
    const input = [
      { id_resep: 10, id_bahan: 5, jumlah: 2, satuan: 'gram' },
      { id_resep: 10, id_bahan: 6, jumlah: 1, satuan: 'ml' },
    ];
    const mockData = { message: 'Batch created', count: 2 };
    axios.post.mockResolvedValue({ status: 201, data: mockData });

    const res = await request(app).post('/api/inventori/resep-details/batch').send(input);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(mockData);
  });

  test('PATCH /api/inventori/resep-details/:id - update resep detail', async () => {
    const input = { jumlah: 3, satuan: 'kg' };
    const mockData = { id: 3, id_resep: 10, id_bahan: 5, jumlah: 3, satuan: 'kg' };
    axios.patch.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).patch('/api/inventori/resep-details/3').send(input);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('PUT /api/inventori/resep-details/resep/:id_resep/batch - batch update resep details', async () => {
    const input = [
      { id: 3, jumlah: 4 },
      { id: 4, jumlah: 2 },
    ];
    const mockData = { message: 'Batch updated', count: 2 };
    axios.put.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).put('/api/inventori/resep-details/resep/10/batch').send(input);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('DELETE /api/inventori/resep-details/:id - delete resep detail', async () => {
    axios.delete.mockResolvedValue({ status: 200, data: { message: 'Detail deleted' } });

    const res = await request(app).delete('/api/inventori/resep-details/3');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Detail deleted' });
  });
});
