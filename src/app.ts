import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import './types';
import routes from './routes';
import { rateLimiter } from './middlewares/rateLimiter';

const app = express();
const PORT = 3000;

// Config
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.set('layout', 'layout');
app.set('view cache', false);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(
  session({
    secret: 'valenti-dreams-secret-2025',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(rateLimiter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.theme = req.cookies.theme || 'light';
  res.locals.user = req.session.user || null;
  res.locals.cart = req.session.cart || [];
  next();
});

app.use(routes);

// Export the app for testing without starting the server.
// When the script is run directly (node dist/app.js), start listening.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Valenti Dreams running on http://localhost:${PORT}`);
  });
}

export default app;
