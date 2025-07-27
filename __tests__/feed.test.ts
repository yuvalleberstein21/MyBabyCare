import request from 'supertest';
import app from '../src/server';
import { getAuthCookie } from './testUtilts';

describe('Feedings API', () => {
  let cookie: string;
  let babyId: string;
  let feedingId: string;

  beforeAll(async () => {
    cookie = await getAuthCookie();

    // צור תינוק לפני ההאכלה
    const babyRes = await request(app)
      .post('/babies')
      .set('Cookie', cookie)
      .send({
        name: 'Test Baby',
        gender: 'זכר',
        birthDate: '2022-05-01',
        notes: 'Test baby notes',
      });

    babyId = babyRes.body.baby._id;
  }, 15000);

  it('should create a new feeding entry', async () => {
    const res = await request(app)
      .post(`/feed/${babyId}`)
      .set('Cookie', cookie)
      .send({
        type: 'bottle',
        amount: 120,
        time: new Date().toISOString(),
        notes: 'ההאכלה הראשונה',
      });

    expect(res.status).toBe(201);
    expect(res.body.feeding).toHaveProperty('_id');
    feedingId = res.body.feeding._id;
  });

  it('should fail to create feeding with invalid data', async () => {
    const res = await request(app)
      .post(`/feed/${babyId}`)
      .set('Cookie', cookie)
      .send({
        type: '', // לא חוקי
        amount: 'לא מספר', // לא חוקי
        time: 'תאריך לא תקין',
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should get feedings with pagination', async () => {
    const res = await request(app)
      .get(`/feed/${babyId}?page=1&limit=5`)
      .set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.feedings)).toBe(true);
    expect(res.body.pagination).toHaveProperty('total');
  });

  it('should update a feeding entry', async () => {
    const res = await request(app)
      .put(`/feed/${feedingId}`)
      .set('Cookie', cookie)
      .send({
        type: 'breast',
        amount: 100,
        notes: 'עודכן להנקה',
      });

    expect(res.status).toBe(200);
    expect(res.body.feeding.type).toBe('breast');
  });

  it('should fail to update feeding with invalid data', async () => {
    const res = await request(app)
      .put(`/feed/${feedingId}`)
      .set('Cookie', cookie)
      .send({
        amount: 'לא מספר', // טעות
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should delete the feeding entry', async () => {
    const res = await request(app)
      .delete(`/feed/${feedingId}`)
      .set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'האכלה נמחקה בהצלחה');
  });
});
