const request = require('supertest');
const app = require('../server'); 
const axios = require('axios');

jest.mock('axios');

describe('Reservation API Gateway', () => {
  const mockReservation = { id: '1', status: 'pending', userId: '123' };
  const mockUser = { id: '123', name: 'Test User' };
  const token = 'Bearer fake-token';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/reservations - should create a reservation', async () => {
    axios.post.mockResolvedValue({ status: 201, data: mockReservation });

    const res = await request(app)
      .post('/api/reservations')
      .set('Authorization', token)
      .send({ tableId: 1, time: '2025-06-08T18:00' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockReservation);
  });

  test('GET /api/reservations - should return all reservations', async () => {
    axios.get.mockResolvedValue({ status: 200, data: [mockReservation] });

    const res = await request(app)
      .get('/api/reservations')
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockReservation]);
  });

  test('GET /api/reservations/:id - should return a reservation by ID', async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes('/auth/getUser')) {
        return Promise.resolve({ status: 200, data: { user: mockUser } });
      } else if (url.includes('/api/reservations/1')) {
        return Promise.resolve({ status: 200, data: mockReservation });
      }
    });

    const res = await request(app)
      .get('/api/reservations/1')
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockReservation);
  });

  test('GET /api/reservations/user - should return reservations for logged-in user', async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes('/auth/getUser')) {
        return Promise.resolve({ status: 200, data: { user: mockUser } });
      } else if (url.includes('/api/reservations/user')) {
        return Promise.resolve({ status: 200, data: [mockReservation] });
      }
    });

    const res = await request(app)
      .get('/api/reservations/user')
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockReservation]);
  });

  test('PATCH /api/reservations/:id/status - should update reservation status', async () => {
    const updatedReservation = { ...mockReservation, status: 'confirmed' };

    axios.patch.mockResolvedValue({ status: 200, data: updatedReservation });

    const res = await request(app)
      .patch('/api/reservations/1/status')
      .set('Authorization', token)
      .send({ status: 'confirmed' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedReservation);
  });

  test('DELETE /api/reservations/:id - should cancel a reservation', async () => {
    axios.delete.mockResolvedValue({ status: 200, data: { message: 'Reservation cancelled' } });

    const res = await request(app)
      .delete('/api/reservations/1')
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Reservation cancelled' });
  });

  test('GET /api/reservations/:id - should return 401 if user not valid', async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes('/auth/getUser')) {
        return Promise.resolve({ status: 200, data: { user: null } });
      }
    });

    const res = await request(app)
      .get('/api/reservations/1')
      .set('Authorization', token);

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: 'User tidak valid' });
  });
});
