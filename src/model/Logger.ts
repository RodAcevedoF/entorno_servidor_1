import fs from 'fs';
import path from 'path';
import { Logger } from './interfaces';

const LOG_DIR = path.join(process.cwd(), 'data');
const LOG_PATH = path.join(LOG_DIR, 'access.log');

export class LoggerModel implements Logger {
  private ensureDirectory() {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
  }

  register(accion: string, user?: string): void {
    this.ensureDirectory();
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
