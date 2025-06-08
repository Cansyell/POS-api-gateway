const request = require('supertest');
const app = require('../server');
const axios = require('axios');

jest.mock('axios');

describe('Inventori - Resep Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/inventori/resep - get all resep', async () => {
    const mockData = { data: [{ id: 1, nama: 'Resep A' }] };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/resep');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('GET /api/inventori/resep/kategori - get kategori', async () => {
    const mockData = { data: ['Minuman', 'Makanan'] };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/resep/kategori');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('GET /api/inventori/resep/search - search resep', async () => {
    const mockData = { data: [{ id: 2, nama: 'Es Teh' }] };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/resep/search?nama=es');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('GET /api/inventori/resep/:id - get by ID', async () => {
    const mockData = { id: 3, nama: 'Nasi Goreng' };
    axios.get.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).get('/api/inventori/resep/3');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('POST /api/inventori/resep - create resep', async () => {
    const input = { nama: 'Kopi Susu', kategori: 'Minuman' };
    const mockData = { id: 4, ...input };
    axios.post.mockResolvedValue({ status: 201, data: mockData });

    const res = await request(app).post('/api/inventori/resep').send(input);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(mockData);
  });

  test('PUT /api/inventori/resep/:id - update resep', async () => {
    const input = { nama: 'Kopi Susu Kental' };
    const mockData = { id: 4, ...input };
    axios.put.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).put('/api/inventori/resep/4').send(input);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('PATCH /api/inventori/resep/:id/status - update status', async () => {
    const input = { status: 'tidak_aktif' };
    const mockData = { id: 4, status: 'tidak_aktif' };
    axios.patch.mockResolvedValue({ status: 200, data: mockData });

    const res = await request(app).patch('/api/inventori/resep/4/status').send(input);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('DELETE /api/inventori/resep/:id - delete resep', async () => {
    axios.delete.mockResolvedValue({ status: 200, data: { message: 'Resep deleted' } });

    const res = await request(app).delete('/api/inventori/resep/4');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Resep deleted' });
  });
});
