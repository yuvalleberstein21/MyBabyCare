import request from 'supertest';
import express from 'express';

const app = express();
app.use(express.json());

// dummy route for testing
app.post('/test-health', validateHealth, (req, res) => {
  res.status(200).json({ ok: true });
});

describe('validateHealth Middleware', () => {
  const basePayload = {
    babyId: '12345',
    type: 'temperature',
    value: 37.5,
    time: '2025-11-16T10:00',
    notes: '',
  };

  test('Should pass with valid temperature data', async () => {
    const res = await request(app).post('/test-health').send(basePayload);
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  test('Should fail if babyId is missing', async () => {
    const res = await request(app)
      .post('/test-health')
      .send({ ...basePayload, babyId: undefined });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/babyId/);
  });

  test('Should fail on invalid type', async () => {
    const res = await request(app)
      .post('/test-health')
      .send({ ...basePayload, type: 'invalidType' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/סוג רשומה/);
  });

  test('Should fail when temperature value is missing', async () => {
    const res = await request(app)
      .post('/test-health')
      .send({ ...basePayload, value: undefined });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/חום גוף/);
  });

  test('Should validate medicine but require notes', async () => {
    const res = await request(app)
      .post('/test-health')
      .send({ ...basePayload, type: 'medicine', notes: '' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/תרופה/);
  });

  test('Should validate vaccine but require notes', async () => {
    const res = await request(app)
      .post('/test-health')
      .send({ ...basePayload, type: 'vaccine', notes: '' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/חיסון/);
  });

  test('Should validate checkup but require notes', async () => {
    const res = await request(app)
      .post('/test-health')
      .send({ ...basePayload, type: 'checkup', notes: '' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/בדיקה/);
  });

  test('Should validate symptom but require notes', async () => {
    const res = await request(app)
      .post('/test-health')
      .send({ ...basePayload, type: 'symptom', notes: '' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/תסמין/);
  });

  test('Should fail on invalid date', async () => {
    const res = await request(app)
      .post('/test-health')
      .send({ ...basePayload, time: 'NOT_A_DATE' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/תאריך/);
  });
});
