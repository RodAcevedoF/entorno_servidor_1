import fs from 'fs';
import path from 'path';

const LOG_PATH = path.join(__dirname, '../../data/access.log');

export function register(accion: string, user?: string): void {
  const timestamp = new Date().toISOString();
  const userInfo = user || 'Guest';
  const line = `[${timestamp}] User: ${userInfo} | Action: ${accion}\n`;

  fs.appendFileSync(LOG_PATH, line, 'utf-8');
}

export function getLogs(): string[] {
  if (!fs.existsSync(LOG_PATH)) {
    return [];
  }
  const content = fs.readFileSync(LOG_PATH, 'utf-8');
  return content.split('\n').filter((l) => l.trim() !== '');
}
