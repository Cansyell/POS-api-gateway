const request = require('supertest');
const app = require('../server'); 

jest.mock('axios');
const axios = require('axios');

describe('PO Detail Endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockData = { data: 'mocked response' };

  test('GET /api/inventori/po-details', async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockData });
    const res = await request(app).get('/api/inventori/po-details');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('GET /api/inventori/po-details/:id', async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockData });
    const res = await request(app).get('/api/inventori/po-details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('GET /api/inventori/po-details/po/:poId', async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockData });
    const res = await request(app).get('/api/inventori/po-details/po/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('GET /api/inventori/po-details/po/:poId/summary', async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockData });
    const res = await request(app).get('/api/inventori/po-details/po/1/summary');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('POST /api/inventori/po-details', async () => {
    axios.post.mockResolvedValue({ status: 201, data: mockData });
    const res = await request(app).post('/api/inventori/po-details').send({});
    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockData);
  });

  test('POST /api/inventori/po-details/bulk', async () => {
    axios.post.mockResolvedValue({ status: 201, data: mockData });
    const res = await request(app).post('/api/inventori/po-details/bulk').send([]);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockData);
  });

  test('PUT /api/inventori/po-details/:id', async () => {
    axios.put.mockResolvedValue({ status: 200, data: mockData });
    const res = await request(app).put('/api/inventori/po-details/1').send({});
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('PATCH /api/inventori/po-details/:id/status', async () => {
    axios.patch.mockResolvedValue({ status: 200, data: mockData });
    const res = await request(app).patch('/api/inventori/po-details/1/status').send({ status: 'diterima', jumlah_diterima: 10 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });
});
