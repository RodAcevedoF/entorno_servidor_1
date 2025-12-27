import { UserModel } from './model/User';
import { SessionsDAO } from './model/Session';
import { BookingModel } from './model/Booking';
import { LoggerModel } from './model/Logger';

import { AuthController } from './controllers/auth.controller';
import { HomeController } from './controllers/home.controller';
import { ProfileController } from './controllers/profile.controller';
import { SessionsController } from './controllers/sessions.controller';
import { CartController } from './controllers/cart.controller';
import { BookingController } from './controllers/booking.controller';
import { PreferencesController } from './controllers/preferences.controller';

const userModel = new UserModel();
const sessionModel = new SessionsDAO();
const bookingModel = new BookingModel();
const loggerModel = new LoggerModel();

const authController = new AuthController(userModel, loggerModel);
const homeController = new HomeController();
const profileController = new ProfileController(userModel);
const sessionsController = new SessionsController(sessionModel);
const cartController = new CartController(sessionModel);
const bookingController = new BookingController(bookingModel);
const preferencesController = new PreferencesController();

export const container = {
  userModel,
  sessionModel,
  bookingModel,
  loggerModel,
  authController,
  homeController,
  profileController,
  sessionsController,
  cartController,
  bookingController,
  preferencesController,
};