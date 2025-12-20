import { Request, Response } from 'express';
import * as SessionsDAO from '../model/SessionsDAO';
import * as Logger from '../model/Logger';

export function index(req: Request, res: Response) {
  const sessions = SessionsDAO.getAllSessions();
  Logger.register('See available sessions', req.session.user?.email);
  res.render('sessions', { title: 'Sessions', sessions });
}
