import request from 'supertest';
import app from '../src/app';
import { test, expect } from '@jest/globals';

test('security headers are present (Helmet)', async () => {
  const res = await request(app).get('/');

  expect(res.headers['x-dns-prefetch-control']).toBe('off');
  expect(res.headers['x-frame-options']).toBe('SAMEORIGIN');
  expect(res.headers['strict-transport-security']).toBeDefined();
  expect(res.headers['x-content-type-options']).toBe('nosniff');
  expect(res.headers['content-security-policy']).toBeDefined();
});

test('compression is active', async () => {
  const res = await request(app)
    .get('/')
    .set('Accept-Encoding', 'gzip, deflate, br');
  expect(res.headers['vary']).toMatch(/Accept-Encoding/);
});

test('CORS headers are present for cross-origin requests', async () => {
  const res = await request(app)
    .options('/')
    .set('Origin', 'http://example.com')
    .set('Access-Control-Request-Method', 'GET');
  expect(res.status).toBe(204);
  expect(res.headers['access-control-allow-origin']).toBe('*');
});
