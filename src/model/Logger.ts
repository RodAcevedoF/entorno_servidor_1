import fs from 'fs';
import path from 'path';
import { Logger } from './interfaces';

const LOG_PATH = path.join(__dirname, '../../data/access.log');

export class LoggerModel implements Logger {
  register(accion: string, user?: string): void {
    const timestamp = new Date().toISOString();
    const userInfo = user || 'Guest';
    const line = `[${timestamp}] User: ${userInfo} | Action: ${accion}\n`;

    fs.appendFileSync(LOG_PATH, line, 'utf-8');
  }

  getLogs(): string[] {
    if (!fs.existsSync(LOG_PATH)) {
      return [];
    }
    const content = fs.readFileSync(LOG_PATH, 'utf-8');
    return content.split('\n').filter((l) => l.trim() !== '');
  }
}