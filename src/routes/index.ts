import { Router } from 'express';
import { registerValidators, loginValidators } from '../validators/auth';
import { profileValidators } from '../validators/profile';
import { container } from '../container';
import { isAuthenticated, isGuest } from '../middlewares/auth';

const router = Router();

const {
  authController,
  homeController,
  profileController,
  sessionsController,
  cartController,
  bookingController,
} = container;

// Home
router.get('/', homeController.index);

// Auth
router.get('/login', isGuest, authController.loginForm);
router.post('/login', isGuest, loginValidators, authController.login);
router.get('/register', isGuest, authController.registerForm);
router.post('/register', isGuest, registerValidators, authController.register);
router.post('/logout', isAuthenticated, authController.logout);

// Profile
router.get('/profile', isAuthenticated, profileController.getProfile);
router.get('/profile/edit', isAuthenticated, profileController.editProfileForm);
router.post(
  '/profile/edit',
  isAuthenticated,
  profileValidators,
  profileController.updateProfile
);

// Sessions
router.get('/sessions', sessionsController.getSessions);

// Cart
router.get('/cart', isAuthenticated, cartController.getCart);
router.post('/cart', isAuthenticated, cartController.addToCart);
router.get(
  '/cart/remove/:sessionId',
  isAuthenticated,
  cartController.removeFromCart
);
router.post('/cart/checkout', isAuthenticated, cartController.checkout);

// Bookings
router.get('/bookings/history', isAuthenticated, bookingController.getBookings);
router.post(
  '/bookings/cancel/:id',
  isAuthenticated,
  bookingController.cancelBooking
);

export default router;
