import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UserRepository, Logger } from '../model/interfaces';

export class AuthController {
  constructor(
    private readonly users: UserRepository,
    private readonly logger: Logger
  ) {}

  public loginForm = (req: Request, res: Response) => {
    res.render('auth', {
      title: 'Sign In',
      activeTab: 'login',
      errors: [],
      data: {},
    });
  };

  public login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('auth', {
        title: 'Sign In',
        activeTab: 'login',
        errors: errors.array(),
        data: req.body,
      });
    }

    const { email, password } = req.body;
    const user = await this.users.validateLogin(email, password);

    if (user) {
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        theme: user.theme,
      };
      res.cookie('theme', user.theme, { maxAge: 31536000, httpOnly: false });
      this.logger.register('LOGIN_SUCCESS', user.id);
      res.redirect('/profile');
    } else {
      this.logger.register('LOGIN_FAIL', email);
      res.render('auth', {
        title: 'Sign In',
        activeTab: 'login',
        errors: [{ msg: 'Invalid credentials' }],
        data: { email },
      });
    }
  };

  public registerForm = (req: Request, res: Response) => {
    res.render('auth', {
      title: 'Register',
      activeTab: 'register',
      errors: [],
      data: {},
    });
  };

  public register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('auth', {
        title: 'Register',
        activeTab: 'register',
        errors: errors.array(),
        data: req.body,
      });
    }

    const { name, email, password, age, city, interests } = req.body;
    const existingUser = await this.users.getUserByEmail(email);

    if (existingUser) {
      return res.render('auth', {
        title: 'Register',
        activeTab: 'register',
        errors: [{ msg: 'Email already in use' }],
        data: req.body,
      });
    }

    const newUser = await this.users.create({
      name,
      email,
      password,
      age: parseInt(age, 10),
      city,
      interests: interests
        ? Array.isArray(interests)
          ? interests
          : [interests]
        : [],
      theme: req.cookies.theme || 'light',
    });

    req.session.user = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      theme: newUser.theme,
    };
    this.logger.register('REGISTER_SUCCESS', newUser.id);
    res.redirect('/profile');
  };

  public logout = (req: Request, res: Response) => {
    this.logger.register('LOGOUT', req.session.user?.id);
    req.session.destroy(() => {
      res.redirect('/');
    });
  };
}
