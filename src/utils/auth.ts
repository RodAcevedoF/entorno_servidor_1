import bcrypt from 'bcrypt';

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
const SECRET = process.env.PASS_SECRET || '';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password + SECRET, SALT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password + SECRET, hash);
}
