import request from 'supertest';
import app from '../src/server';

describe('Auth API', () => {
  it('POST /auth/signup - should register a new user', async () => {
    const res = await request(app).post('/auth/signup').send({
      fullName: 'Jest User',
      email: 'Jest@example.com',
      password: '123456',
    });
    expect(res.status).toBe(201);
  });

  it('POST /auth/signup - should return 400 when fullName is missing', async () => {
    const res = await request(app).post('/auth/signup').send({
      email: 'Jest@example.com',
      password: '123456',
    });
    expect(res.status).toBe(400);
  });

  it('POST /auth/login - should login and return access token', async () => {
    await request(app).post('/auth/signup').send({
      fullName: 'Jest User',
      email: 'Jest@example.com',
      password: '123456',
    });

    const res = await request(app).post('/auth/login').send({
      email: 'Jest@example.com',
      password: '123456',
    });
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'התחברת בהצלחה');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', 'jest@example.com');
    expect(res.headers['set-cookie']).toBeDefined();
    expect(res.headers['set-cookie'][0]).toMatch(/accessToken/);
  });
});
