import { Request, Response } from 'express';
import * as Logger from '../model/Logger';

export function show(req: Request, res: Response) {
  res.render('preferences', { title: 'Preferences' });
}

export function update(req: Request, res: Response) {
  const { theme } = req.body;
  res.cookie('theme', theme, { maxAge: 365 * 24 * 60 * 60 * 1000 });
  Logger.register(`Theme change to: ${theme}`, req.session.user?.email);
  res.redirect('/preferences');
}
