import request from 'supertest';
import path from 'path';
import app from '../src/server';
import { getAuthCookie } from './testUtilts';

describe('Babies API', () => {
  let cookie: string;
  let createdBabyId: string;

  beforeAll(async () => {
    cookie = await getAuthCookie();
  }, 15000);

  it('should create a new baby with image', async () => {
    const res = await request(app)
      .post('/babies')
      .set('Cookie', cookie)
      .field('name', 'Baby Test')
      .field('gender', 'זכר')
      .field('birthDate', '2020-01-01')
      .field('notes', 'This is a test baby')
      .attach(
        'image',
        path.join(
          __dirname,
          '..',
          'public',
          'uploads',
          'baby-1750851202310-211507348.webp'
        )
      );

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('baby');
    expect(res.body.baby).toHaveProperty('name', 'Baby Test');
    createdBabyId = res.body.baby._id;
  }, 15000);

  it('should create a new baby without image', async () => {
    const res = await request(app).post('/babies').set('Cookie', cookie).send({
      name: 'Baby No Image',
      gender: 'נקבה',
      birthDate: '2019-05-20',
      notes: 'No image provided',
    });

    expect(res.status).toBe(201);
    expect(res.body.baby).toHaveProperty('name', 'Baby No Image');
    expect(res.body.baby.image).toMatch(/default-baby\.png$/);
  });

  it('should fail to create baby with invalid data', async () => {
    const res = await request(app).post('/babies').set('Cookie', cookie).send({
      name: '', // שם ריק
      gender: 'אחר', // מין לא תקין
      birthDate: 'not-a-date',
      notes: 123, // לא מחרוזת
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should get list of babies', async () => {
    const res = await request(app).get('/babies').set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.babies)).toBe(true);
    expect(res.body.babies.length).toBeGreaterThan(0);
  });

  it('should get single baby by id', async () => {
    const res = await request(app)
      .get(`/babies/${createdBabyId}`)
      .set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(res.body.baby).toHaveProperty('_id', createdBabyId);
  });

  it('should update baby details', async () => {
    const res = await request(app)
      .put(`/babies/${createdBabyId}`)
      .set('Cookie', cookie)
      .send({
        name: 'Baby Updated',
        gender: 'זכר',
        birthDate: '2020-01-01',
        notes: 'Updated notes',
      });

    expect(res.status).toBe(200);
    expect(res.body.baby).toHaveProperty('name', 'Baby Updated');
  });

  it('should delete baby', async () => {
    const res = await request(app)
      .delete(`/babies/${createdBabyId}`)
      .set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'תינוק נמחק בהצלחה');
  });
});
