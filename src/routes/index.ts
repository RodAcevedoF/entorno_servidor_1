import { Router } from 'express';
import * as homeController from '../controllers/home.controller';
import { AuthController } from '../controllers/auth.controller';
import * as perfilController from '../controllers/profile.controller';
import * as sessionsController from '../controllers/sessions.controller';
import { CartController } from '../controllers/cart.controller';
import * as preferencesController from '../controllers/preferences.controller';
import { BookingController } from '../controllers/booking.controller';

const router = Router();

// Home
router.get('/', homeController.index);

// Auth
router.get('/register', AuthController.showRegister);
import { registerValidators, loginValidators } from '../validators/auth';

router.post('/register', registerValidators, AuthController.register);
router.get('/login', AuthController.showLogin);
router.post('/login', loginValidators, AuthController.login);
router.post('/logout', AuthController.logout);

// Profile
router.get('/profile', perfilController.show);
router.get('/profile/edit', perfilController.showEdit);
router.post('/profile/edit', perfilController.editar);

// Sessions
router.get('/sessions', sessionsController.index);

// Cart
router.get('/cart', CartController.show);
router.post('/cart/add', CartController.add);
router.post('/cart/delete', CartController.deleteItem);
router.post('/cart/empty', CartController.empty);

// Preferences
router.get('/preferences', preferencesController.show);
router.post('/preferences', preferencesController.update);

// Bookings
router.post('/bookings/confirm', BookingController.confirm);
router.get('/bookings/history', BookingController.history);

router.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

export default router;
