import { Router } from 'express';
import * as homeController from '../controllers/home.controller';
import * as authController from '../controllers/auth.controller';
import * as perfilController from '../controllers/profile.controller';
import * as sessionsController from '../controllers/sessions.controller';
import * as carritoController from '../controllers/cart.controller';
import * as preferencesController from '../controllers/preferences.controller';
import * as reservasController from '../controllers/booking.controller';

const router = Router();

// Home
router.get('/', homeController.index);

// Auth
router.get('/register', authController.showRegister);
router.post('/register', authController.register);
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Profile
router.get('/profile', perfilController.show);
router.get('/profile/edit', perfilController.showEdit);
router.post('/profile/edit', perfilController.editar);

// Sessions
router.get('/sessions', sessionsController.index);

// Cart
router.post('/cart/add', carritoController.add);
router.post('/cart/delete', carritoController.deleteItem);
router.post('/cart/empty', carritoController.empty);

// Preferences
router.get('/preferences', preferencesController.show);
router.post('/preferences', preferencesController.update);

// Bookings
router.post('/bookings/confirm', reservasController.confirm);
router.get('/bookings/history', reservasController.history);

router.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

export default router;
