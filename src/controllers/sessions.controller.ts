import { Request, Response } from 'express';
import { SessionsRepository } from '../model/interfaces';

export class SessionsController {
  constructor(private readonly sessions: SessionsRepository) {}

  public getSessions = (req: Request, res: Response) => {
    const sessions = this.sessions.getAllSessions();
    res.render('sessions', {
      title: 'Sessions',
      sessions,
    });
  };
}