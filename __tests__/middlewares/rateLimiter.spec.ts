process.env.RATE_LIMIT_WINDOW_MS = '60000';
process.env.RATE_LIMIT_MAX = '3';

import request from 'supertest';
import app from '../../src/app';
import { test, expect } from '@jest/globals';

test('rate limiter returns 429 after exceeding limit', async () => {
  const agent = request.agent(app);

  await agent.get('/');
  await agent.get('/');
  await agent.get('/');
  const res = await agent.get('/');
  expect(res.status).toBe(429);
  expect(res.body.error).toMatch(/Too many requests/);
});
