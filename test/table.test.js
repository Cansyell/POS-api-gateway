const request = require('supertest');
const app = require('../server'); 
const axios = require('axios');

jest.mock('axios');

describe('Reservation Table API', () => {
  const mockTable = { id: 1, name: 'Meja 1', status: 'available' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/tables - should return all tables', async () => {
    axios.get.mockResolvedValue({ status: 200, data: [mockTable] });

    const res = await request(app).get('/api/tables');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockTable]);
  });

  test('GET /api/tables/available - should return available tables', async () => {
    axios.get.mockResolvedValue({ status: 200, data: [mockTable] });

    const res = await request(app).get('/api/tables/available');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockTable]);
  });

  test('GET /api/tables/:id - should return a table by ID', async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockTable });

    const res = await request(app).get('/api/tables/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockTable);
  });

  test('POST /api/tables - should create a new table', async () => {
    axios.post.mockResolvedValue({ status: 201, data: mockTable });

    const res = await request(app).post('/api/tables').send(mockTable);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockTable);
  });

  test('PATCH /api/tables/:id/status - should update table status', async () => {
    const updatedTable = { ...mockTable, status: 'occupied' };
    axios.patch.mockResolvedValue({ status: 200, data: updatedTable });

    const res = await request(app)
      .patch('/api/tables/1/status')
      .send({ status: 'occupied' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedTable);
  });

  test('DELETE /api/tables/:id - should delete a table', async () => {
    axios.delete.mockResolvedValue({ status: 200, data: { message: 'Deleted' } });

    const res = await request(app).delete('/api/tables/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' });
  });

  test('GET /api/tables - should handle errors gracefully', async () => {
    axios.get.mockRejectedValue({
      response: { status: 500, data: { message: 'Error' } }
    });

    const res = await request(app).get('/api/tables');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Error' });
  });
});
