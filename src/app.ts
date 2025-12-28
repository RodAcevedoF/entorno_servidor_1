import './env';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { container } from './container';
import './types';
import { rateLimiter } from './middlewares/rateLimiter';
import { formatDate, formatDateTime, formatTime } from './utils/time-format';

const app = express();
const PORT = process.env.PORT || 3000;

const IS_SECURE_COOKIE =
  process.env.NODE_ENV === 'production' ||
  process.env.FORCE_SECURE_COOKIE === '1';

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  if (!process.env.SESSION_SECRET) {
    console.warn('WARNING: SESSION_SECRET is not set in production!');
  }
}

app.set('sessionCookieSecure', IS_SECURE_COOKIE);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com',
          'https://cdnjs.cloudflare.com',
        ],
        'font-src': [
          "'self'",
          'https://fonts.gstatic.com',
          'https://cdnjs.cloudflare.com',
        ],
        'img-src': ["'self'", 'data:'],
        'connect-src': ["'self'"],
      },
    },
  })
);
app.use(compression());
app.use(cors());

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.set('layout', 'layout');
app.set('view cache', false);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
      secure: IS_SECURE_COOKIE,
    },
  })
);
app.use(rateLimiter);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    const freshUser = await container.userModel.getUserById(
      req.session.user.id
    );
    if (freshUser) {
      req.session.user = {
        id: freshUser.id,
        name: freshUser.name,
        email: freshUser.email,
        theme: freshUser.theme,
      };
    } else {
      req.session.user = undefined;
    }
  }

  const userTheme = req.session.user?.theme;
  const cookieTheme = req.cookies.theme;

  res.locals.theme = userTheme || cookieTheme || 'light';
  res.locals.user = req.session.user || null;
  res.locals.cart = req.session.cart || [];
  res.locals.formatDate = formatDate;
  res.locals.formatDateTime = formatDateTime;
  res.locals.formatTime = formatTime;
  next();
});

app.use(routes);

app.post('/api/theme', async (req: Request, res: Response) => {
  const { theme } = req.body;
  if (theme === 'light' || theme === 'dark') {
    res.cookie('theme', theme, { maxAge: 31536000, httpOnly: false });
    if (req.session.user) {
      req.session.user.theme = theme;
      await container.userModel.update(req.session.user.id, { theme });
    }
    return res.json({ success: true });
  }
  res.status(400).json({ success: false });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Valenti Dreams running on http://localhost:${PORT}`);
  });
}

export default app;
