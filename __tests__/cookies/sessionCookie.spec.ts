import request from 'supertest';
import { test, expect } from '@jest/globals';
import app from '../../src/app';

test('session cookie has HttpOnly and SameSite=Lax', async () => {
  const res = await request(app).get('/');
  const setCookie = res.headers['set-cookie'];
  expect(setCookie).toBeDefined();
  const cookie = Array.isArray(setCookie)
    ? setCookie.join(';')
    : String(setCookie);
  expect(cookie).toMatch(/HttpOnly/);
  expect(cookie).toMatch(/SameSite=Lax/);
});

test('sessionCookieSecure config reflects FORCE_SECURE_COOKIE or NODE_ENV=production', () => {
  const isSecure = app.get('sessionCookieSecure');

  if (
    process.env.NODE_ENV === 'production' ||
    process.env.FORCE_SECURE_COOKIE === '1'
  ) {
    expect(isSecure).toBe(true);
  } else {
    expect(isSecure).toBe(false);
  }
});
