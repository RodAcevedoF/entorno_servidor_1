import { Request, Response } from 'express';
import * as UsersDAO from '../model/UsersDAO';
import * as Logger from '../model/Logger';

export function show(req: Request, res: Response) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  Logger.register('Acceso a perfil', req.session.user.email);
  res.render('profile', { title: 'My Profile' });
}

export function showEdit(req: Request, res: Response) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('edit-profile', { title: 'Edit profile', errors: [] });
}

export function editar(req: Request, res: Response) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const { name, age, city, interests } = req.body;
  const errors: string[] = [];

  if (!name || name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }
  if (!age || Number(age) <= 0) {
    errors.push('La edad debe ser mayor que 0');
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

  const updated = UsersDAO.update(req.session.user.id, {
    name: name.trim(),
    age: Number(age),
    city: city?.trim() || '',
    interests: interestsArray,
  });

  if (updated) {
    req.session.user = updated;
    Logger.register('Updated profile', req.session.user.email);
  }

  res.redirect('/profile');
}
