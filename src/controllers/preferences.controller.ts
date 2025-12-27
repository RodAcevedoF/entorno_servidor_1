import { Request, Response } from 'express';

export class PreferencesController {
  public getPreferences = (req: Request, res: Response) => {
    res.render('preferences', {
      title: 'Preferences',
    });
  };

  public savePreferences = (req: Request, res: Response) => {
    const { theme } = req.body;
    res.cookie('theme', theme, { maxAge: 900000, httpOnly: true });
    res.redirect('/preferences');
  };
}