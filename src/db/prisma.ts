import { PrismaClient } from '../../generated/prisma';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const DATABASE_URL = process.env.DATABASE_URL ?? 'file:./dev.db';

const adapter = new PrismaBetterSqlite3({ url: DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;
