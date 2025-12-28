import request from 'supertest';
import app from '../../src/app';
import { test, expect, beforeEach } from '@jest/globals';
import prisma from '../../src/db/prisma';

beforeEach(async () => {
  await prisma.bookingItem.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.user.deleteMany();
  await prisma.session.deleteMany();
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
    password: 'securePassword123',
    age: '30',
    city: 'Barcelona',
  });

  expect(res.status).toBe(302);
  expect(res.headers.location).toBe('/profile');
});

test('login fails when missing email', async () => {
  const res = await request(app).post('/login').send({
    email: '',
    password: 'anything',
  });

  expect(res.status).toBe(200);
  expect(res.text).toMatch(/Invalid email/);
});
