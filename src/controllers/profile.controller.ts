import { Request, Response } from 'express';
import { UserRepository } from '../model/interfaces';

export class ProfileController {
  constructor(private readonly users: UserRepository) {}

  public getProfile = async (req: Request, res: Response) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    const user = await this.users.getUserById(req.session.user.id);
    res.render('profile', {
      title: 'My Profile',
      user,
    });
  };

  public editProfileForm = async (req: Request, res: Response) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    const user = await this.users.getUserById(req.session.user.id);
    res.render('edit-profile', {
      title: 'Edit Profile',
      user,
    });
  };

  public updateProfile = async (req: Request, res: Response) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    const { name, age, city, interests } = req.body;
    await this.users.update(req.session.user.id, {
      name,
      age: parseInt(age, 10),
      city,
      interests: interests ? (Array.isArray(interests) ? interests : [interests]) : [],
    });
    res.redirect('/profile');
  };
}