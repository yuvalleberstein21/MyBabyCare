import request from 'supertest';
import app from '../src/server';

export const testUser = {
  fullName: 'Jest User',
  email: 'jest@example.com',
  password: '123456',
};

let authCookie: string;

export const getAuthCookie = async (): Promise<string> => {
  if (authCookie) return authCookie;

  // נסה להרשם (התעלם אם כבר קיים)
  await request(app)
    .post('/auth/signup')
    .send(testUser)
    .catch(() => {});

  const res = await request(app).post('/auth/login').send({
    email: testUser.email,
    password: testUser.password,
  });

  const rawCookie = res.headers['set-cookie'];

  if (Array.isArray(rawCookie)) {
    authCookie = rawCookie.join('; ');
  } else if (typeof rawCookie === 'string') {
    authCookie = rawCookie;
  } else {
    throw new Error('set-cookie header missing in response');
  }

  return authCookie;
};
