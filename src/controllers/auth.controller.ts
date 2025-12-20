import { Request, Response } from 'express';
import * as UsersDAO from '../model/UsersDAO';
import * as Logger from '../model/Logger';

export function showRegister(req: Request, res: Response) {
  res.render('register', { title: 'Register', errors: [], data: {} });
}

export function showLogin(req: Request, res: Response) {
  res.render('login', { title: 'Sign in', error: null });
}

export async function register(req: Request, res: Response) {
  const { name, email, password, age, city, interests } = req.body;
  const errors: string[] = [];

  if (!name || name.trim().length < 2) {
    errors.push('El name debe tener al menos 2 caracteres');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email inválido');
  }
  if (!password || password.length < 4) {
    errors.push('La contraseña debe tener al menos 4 caracteres');
  }
  if (!age || Number(age) <= 0) {
    errors.push('La edad debe ser mayor que 0');
  }
  if (UsersDAO.getUserByEmail(email)) {
    errors.push('Ya existe un usuario con ese email');
  }

  if (errors.length > 0) {
    return res.render('register', {
      title: 'Register',
      errors,
      data: req.body,
    });
  }

  const interestsArray = Array.isArray(interests)
    ? interests
    : interests
      ? [interests]
      : [];
  try {
    await UsersDAO.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      age: Number(age),
      city: city?.trim() || '',
      interests: interestsArray,
    });

    const user = UsersDAO.getUserByEmail(email);
    Logger.register('New register', email);
    res.redirect(`/login?registered=${user?.id}`);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    errors.push('Error interno al crear el usuario. Inténtalo de nuevo.');
    return res.render('register', {
      title: 'Register',
      errors,
      data: req.body,
    });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await UsersDAO.validateLogin(email, password);

  if (!user) {
    Logger.register('Intento de login fallido', email);
    return res.render('login', {
      title: 'Iniciar Sesión',
      error: 'Credenciales incorrectas',
    });
  }

  req.session.user = user;
  req.session.cart = [];
  Logger.register('Login exitoso', email);
  res.redirect('/profile');
}

export function logout(req: Request, res: Response) {
  const email = req.session.user?.email;
  req.session.destroy(() => {
    Logger.register('Logout', email);
    res.redirect('/');
  });
}
