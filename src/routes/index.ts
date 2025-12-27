import { Router } from 'express';
import { registerValidators, loginValidators } from '../validators/auth';
import { container } from '../container';

const router = Router();

const {
  authController,
  homeController,
  profileController,
  sessionsController,
  cartController,
  bookingController,
  preferencesController,
} = container;

// Home
router.get('/', homeController.index);

// Auth
router.get('/login', authController.loginForm);
router.post('/login', loginValidators, authController.login);
router.get('/register', authController.registerForm);
router.post('/register', registerValidators, authController.register);
router.post('/logout', authController.logout);

// Profile
router.get('/profile', profileController.getProfile);
router.get('/profile/edit', profileController.editProfileForm);
router.post('/profile/edit', profileController.updateProfile);

// Sessions
router.get('/sessions', sessionsController.getSessions);

// Cart
router.get('/cart', cartController.getCart);
router.post('/cart', cartController.addToCart);
router.get('/cart/remove/:sessionId', cartController.removeFromCart);
router.post('/cart/checkout', cartController.checkout);

// Bookings
router.get('/bookings/history', bookingController.getBookings);

// Preferences
router.get('/preferences', preferencesController.getPreferences);
router.post('/preferences', preferencesController.savePreferences);

export default router;