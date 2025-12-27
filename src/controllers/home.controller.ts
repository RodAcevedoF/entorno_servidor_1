import { Request, Response } from 'express';

export class HomeController {
  public index = (req: Request, res: Response) => {
    res.render('home', {
      title: 'Home',
    });
  };
}