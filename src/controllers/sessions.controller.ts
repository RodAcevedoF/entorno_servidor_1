import { Request, Response } from 'express';
import { SessionsRepository } from '../model/interfaces';

export class SessionsController {
  constructor(private readonly sessions: SessionsRepository) {}

  public getSessions = async (req: Request, res: Response) => {
    const sessions = await this.sessions.getAllSessions();
    res.render('sessions', {
      title: 'Sessions',
      sessions,
    });
  };
}
