import { Request, Response } from 'express';
import * as Logger from '../model/Logger';

export function index(req: Request, res: Response) {
  Logger.register('Visita página inicio', req.session.user?.email);
  res.render('home', { title: 'Valenti Dreams' });
}
