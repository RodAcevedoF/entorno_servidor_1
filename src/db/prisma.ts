import { PrismaClient } from '../../generated/prisma';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'dev.db');
const DATABASE_URL = process.env.DATABASE_URL ?? `file:${dbPath}`;

const adapter = new PrismaBetterSqlite3({ url: DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;
