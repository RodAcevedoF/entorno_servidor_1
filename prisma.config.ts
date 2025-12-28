import 'dotenv/config';
import { defineConfig } from 'prisma/config';
import path from 'path';

const dbPath = path.join(process.cwd(), 'dev.db');
const DATABASE_URL = process.env.DATABASE_URL ?? `file:${dbPath}`;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: DATABASE_URL,
  },
});
