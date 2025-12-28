import prisma from '../db/prisma';
import { Session, SessionDTO } from '../types';
import { SessionsRepository } from './interfaces';
export class SessionsModel implements SessionsRepository {
  async getAllSessions(): Promise<Session[]> {
    const sessions = (await prisma.session.findMany()) as SessionDTO[];
    return sessions.map((s: SessionDTO) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      date: s.date,
      time: s.time,
      price: s.price,
      places: s.places,
    }));
  }

  async getSessionById(id: string): Promise<Session | undefined> {
    const s = (await prisma.session.findUnique({
      where: { id },
    })) as SessionDTO | undefined;
    if (!s) return undefined;
    return {
      id: s.id,
      title: s.title,
      description: s.description,
      date: s.date,
      time: s.time,
      price: s.price,
      places: s.places,
    };
  }
}
