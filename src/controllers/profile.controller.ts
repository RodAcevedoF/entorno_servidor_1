import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UserRepository } from '../model/interfaces';

export class ProfileController {
  constructor(private readonly users: UserRepository) {}

  public getProfile = async (req: Request, res: Response) => {
    const user = await this.users.getUserById(req.session.user!.id);
    if (!user) return res.redirect('/login');
    res.render('profile', {
      title: 'My Profile',
      user,
    });
  };

  public editProfileForm = async (req: Request, res: Response) => {
    const user = await this.users.getUserById(req.session.user!.id);
    if (!user) return res.redirect('/login');
    res.render('edit-profile', {
      title: 'Edit Profile',
      user,
      errors: [],
    });
  };

  public updateProfile = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const user = await this.users.getUserById(req.session.user!.id);
      return res.render('edit-profile', {
        title: 'Edit Profile',
        user,
        errors: errors.array(),
      });
    }

    const { name, age, city, interests } = req.body;
    await this.users.update(req.session.user!.id, {
      name,
      age: parseInt(age, 10),
      city,
      interests: interests
        ? Array.isArray(interests)
          ? interests
          : [interests]
        : [],
    });
    res.redirect('/profile');
  };
}
