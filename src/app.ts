import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';

if (process.env.SKIP_DOTENV !== '1') {
  dotenv.config();
}

import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import './types';
import { rateLimiter } from './middlewares/rateLimiter';

const app = express();
const PORT = 3000;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

function formatDate(value: string | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return dateFormatter.format(date);
}

function formatDateTime(value: string | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return dateTimeFormatter.format(date);
}

function formatTime(value: string): string {
  if (!value) return '';
  const [hours, minutes] = String(value).split(':');
  if (!hours) return String(value);
  return `${hours.padStart(2, '0')}:${(minutes ?? '00').padStart(2, '0')}`;
}

const IS_SECURE_COOKIE =
  process.env.NODE_ENV === 'production' ||
  process.env.FORCE_SECURE_COOKIE === '1';

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.set('sessionCookieSecure', IS_SECURE_COOKIE);

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
    secret: process.env.SESSION_SECRET || 'valenti-dreams-secret-2025',
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

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.theme = req.cookies.theme || 'light';
  res.locals.user = req.session.user || null;
  res.locals.cart = req.session.cart || [];
  res.locals.formatDate = formatDate;
  res.locals.formatDateTime = formatDateTime;
  res.locals.formatTime = formatTime;
  next();
});

app.use(routes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Valenti Dreams running on http://localhost:${PORT}`);
  });
}

export default app;
