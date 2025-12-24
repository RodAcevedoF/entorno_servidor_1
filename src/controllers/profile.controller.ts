import { Request, Response } from 'express';
import * as UsersDAO from '../model/UsersPrismaDAO';
import * as Logger from '../model/Logger';

export function show(req: Request, res: Response) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  Logger.register('Profile accessed', req.session.user.email);
  res.render('profile', { title: 'My Profile' });
}

export function showEdit(req: Request, res: Response) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('edit-profile', { title: 'Edit profile', errors: [] });
}

export async function editar(req: Request, res: Response) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const { name, age, city, interests } = req.body;
  const errors: string[] = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (!age || Number(age) <= 0) {
    errors.push('Age must be greater than 0');
  }

  if (errors.length > 0) {
    return res.render('edit-profile', {
      title: 'Edit Profile',
      errors,
    });
  }

  const interestsArray = Array.isArray(interests)
    ? interests
    : interests
      ? [interests]
      : [];

  const updated = await UsersDAO.update(req.session.user.id, {
    name: name.trim(),
    age: Number(age),
    city: city?.trim() || '',
    interests: interestsArray,
  });

  if (updated) {
    req.session.user = updated;
    Logger.register('Updated profile', updated.email);
  }

  res.redirect('/profile');
}
