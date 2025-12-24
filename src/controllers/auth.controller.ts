import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import * as UsersDAO from '../model/UsersPrismaDAO';
import * as Logger from '../model/Logger';

export const AuthController = {
  showRegister(req: Request, res: Response) {
    res.render('register', { title: 'Register', errors: [], data: {} });
  },

  showLogin(req: Request, res: Response) {
    res.render('login', { title: 'Sign in', error: null });
  },

  async register(req: Request, res: Response) {
    const errors = validationResult(req);
    const errorMessages: string[] = [];

    if (!errors.isEmpty()) {
      errors.array().forEach((e) => errorMessages.push(e.msg));
      return res.render('register', {
        title: 'Register',
        errors: errorMessages,
        data: req.body,
      });
    }

    const { name, email, password, age, city, interests } = req.body;

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

      const user = await UsersDAO.getUserByEmail(email);
      Logger.register('New register', email);
      res.redirect(`/login?registered=${user?.id}`);
    } catch (error) {
      console.error('Error creating user:', error);
      errorMessages.push('Error creating user, Try again.');
      return res.render('register', {
        title: 'Register',
        errors: errorMessages,
        data: req.body,
      });
    }
  },

  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('login', {
        title: 'Sign In',
        error: errors
          .array()
          .map((e) => e.msg)
          .join(', '),
      });
    }

    const { email, password } = req.body;
    const user = await UsersDAO.validateLogin(email, password);

    if (!user) {
      Logger.register('Failed login attempt', email);
      return res.render('login', {
        title: 'Sign in',
        error: 'Invalid credentials',
      });
    }

    req.session.user = user;
    req.session.cart = [];
    Logger.register('Successful login', email);
    res.redirect('/profile');
  },

  logout(req: Request, res: Response) {
    const email = req.session.user?.email;
    req.session.destroy(() => {
      Logger.register('Logout', email);
      res.redirect('/');
    });
  },
};
