import fs from 'fs';
import path from 'path';
import { Session } from '../types';
import { v4 as uuidv4 } from 'uuid';

const DATA_PATH = path.join(__dirname, '../../data/sessions.json');

const SESIONES_DEFAULT: Session[] = [
  {
    id: uuidv4(),
    title: 'Conexión con tu Ser Superior',
    description:
      'Sesión grupal para conectar con tu esencia más elevada a través de meditación guiada.',
    date: '2025-01-15',
    time: '18:00',
    price: 45,
    places: 12,
  },
  {
    id: uuidv4(),
    title: 'Sanación del Niño Interior',
    description:
      'Trabajo profundo para sanar heridas emocionales del pasado y liberar bloqueos.',
    date: '2025-01-22',
    time: '17:30',
    price: 55,
    places: 8,
  },
  {
    id: uuidv4(),
    title: 'Viaje Astral Guiado',
    description:
      'Experiencia de expansión de conciencia y exploración de otras dimensiones.',
    date: '2025-01-29',
    time: '19:00',
    price: 60,
    places: 10,
  },
  {
    id: uuidv4(),
    title: 'Activación de Chakras',
    description:
      'Sesión intensiva para equilibrar y activar tus centros energéticos.',
    date: '2025-02-05',
    time: '18:30',
    places: 15,
    price: 85,
  },
];

function init(): void {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(
      DATA_PATH,
      JSON.stringify(SESIONES_DEFAULT, null, 2),
      'utf-8'
    );
  }
}

export function getAllSessions(): Session[] {
  init();
  const data = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(data) as Session[];
}

export function getSessionById(id: string): Session | undefined {
  const sessions = getAllSessions();
  return sessions.find((s) => s.id === id);
}
