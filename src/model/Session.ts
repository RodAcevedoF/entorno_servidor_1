import fs from 'fs';
import path from 'path';
import { Session } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { SessionsRepository } from './interfaces';

const DATA_PATH = path.join(__dirname, '../../data/sessions.json');

const SESSIONS_DEFAULT: Session[] = [
  {
    id: uuidv4(),
    title: 'Connection with Your Higher Self',
    description:
      'Group session to connect with your higher essence through guided meditation.',
    date: '2025-01-15',
    time: '18:00',
    price: 45,
    places: 12,
  },
  {
    id: uuidv4(),
    title: 'Inner Child Healing',
    description:
      'Deep work to heal emotional wounds from the past and release blockages.',
    date: '2025-01-22',
    time: '17:30',
    price: 55,
    places: 8,
  },
  {
    id: uuidv4(),
    title: 'Guided Astral Journey',
    description:
      'Experience of consciousness expansion and exploration of other dimensions.',
    date: '2025-01-29',
    time: '19:00',
    price: 60,
    places: 10,
  },
  {
    id: uuidv4(),
    title: 'Chakra Activation',
    description:
      'Intensive session to balance and activate your energy centers.',
    date: '2025-02-05',
    time: '18:30',
    price: 50,
    places: 15,
  },
];

function init(): void {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(
      DATA_PATH,
      JSON.stringify(SESSIONS_DEFAULT, null, 2),
      'utf-8'
    );
  }
}

export class SessionsDAO implements SessionsRepository {
  getAllSessions(): Session[] {
    init();
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    const sessions = JSON.parse(data) as Array<Record<string, unknown>>;
    return sessions.map((session) => ({
      id: String(session.id),
      title: String(session.title ?? session.titulo ?? ''),
      description: String(session.description ?? session.descripcion ?? ''),
      date: String(session.date ?? session.fecha ?? ''),
      time: String(session.time ?? session.hora ?? ''),
      price: Number(session.price ?? session.precio ?? 0),
      places: Number(session.places ?? session.plazas ?? 0),
    }));
  }

  getSessionById(id: string): Session | undefined {
    const sessions = this.getAllSessions();
    return sessions.find((s) => s.id === id);
  }
}