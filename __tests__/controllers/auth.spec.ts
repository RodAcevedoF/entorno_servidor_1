import request from 'supertest';
import app from '../../src/app';
import { test, expect, beforeEach } from '@jest/globals';
import fs from 'fs';
import path from 'path';

const USERS_PATH = path.join(__dirname, '../../data/users.json');

beforeEach(() => {
  if (fs.existsSync(USERS_PATH)) {
    fs.writeFileSync(USERS_PATH, '[]', 'utf-8');
  }
});

test('register fails with invalid email and short name', async () => {
  const res = await request(app).post('/register').type('form').send({
    name: 'A',
    email: 'not-an-email',
    password: '1234',
    age: '25',
  });

  expect(res.status).toBe(200);
  expect(res.text).toMatch(/Name must be at least 2 characters/);
  expect(res.text).toMatch(/Invalid email/);
});

test('register succeeds with valid data', async () => {
  const res = await request(app).post('/register').type('form').send({
    name: 'Alice',
    email: 'alice@example.com',
    password: 'secure',
    age: '30',
  });

  expect(res.status).toBe(302);
  expect(res.headers.location).toMatch(/\/login\?registered=/);
});

test('login fails when missing email', async () => {
  const res = await request(app).post('/login').send({
    email: '',
    password: 'anything',
  });

  expect(res.status).toBe(200);
  expect(res.text).toMatch(/Invalid email/);
});
