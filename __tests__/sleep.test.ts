import request from 'supertest';
import app from '../src/server';
import { getAuthCookie } from './testUtilts';

describe('Sleeping API', () => {
  let cookie: string;
  let babyId: string;
  let sleepId: string;

  beforeAll(async () => {
    cookie = await getAuthCookie();

    const babyRes = await request(app)
      .post('/babies')
      .set('Cookie', cookie)
      .send({
        name: 'Test Baby Sleep',
        gender: 'זכר',
        birthDate: '2023-03-01',
        notes: 'Baby for sleeping tests',
      });

    babyId = babyRes.body.baby._id;
  }, 15000);

  it('should start a new sleep session', async () => {
    const res = await request(app)
      .post(`/sleep/${babyId}/start`)
      .set('Cookie', cookie)
      .send({
        startTime: new Date().toISOString(),
        notes: 'שינה ראשונית',
      });

    expect(res.status).toBe(201);
    expect(res.body.sleeping).toHaveProperty('_id');
    sleepId = res.body.sleeping._id;
  });

  it('should fail to start a second sleep without ending the first', async () => {
    const res = await request(app)
      .post(`/sleep/${babyId}/start`)
      .set('Cookie', cookie)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should end the sleep session', async () => {
    const res = await request(app)
      .post(`/sleep/${babyId}/end`)
      .set('Cookie', cookie)
      .send({
        endTime: new Date().toISOString(),
      });

    expect(res.status).toBe(200);
    expect(res.body.sleeping).toHaveProperty('endTime');
  });

  it('should fail to end a non-existent sleep session', async () => {
    const res = await request(app)
      .post(`/sleep/${babyId}/end`)
      .set('Cookie', cookie)
      .send({});

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should return sleepings with pagination', async () => {
    const res = await request(app)
      .get(`/sleep/${babyId}?page=1&limit=10`)
      .set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.sleeping)).toBe(true);
    expect(res.body.pagination).toHaveProperty('total');
  });

  it('should update a sleeping record', async () => {
    const res = await request(app)
      .put(`/sleep/${sleepId}`)
      .set('Cookie', cookie)
      .send({
        notes: 'עודכן שינה',
      });

    expect(res.status).toBe(200);
    expect(res.body.sleeping.notes).toBe('עודכן שינה');
  });

  it('should fail to update with invalid data', async () => {
    const res = await request(app)
      .put(`/sleep/${sleepId}`)
      .set('Cookie', cookie)
      .send({
        startTime: 'invalid-date',
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should delete the sleeping record', async () => {
    const res = await request(app)
      .delete(`/sleep/${sleepId}`)
      .set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('השינה נמחקה בהצלחה');
  });
});
