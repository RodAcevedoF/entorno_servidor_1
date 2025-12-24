import { Request, Response } from 'express';
import * as BookingsDAO from '../model/BookingsDAO';
import * as Logger from '../model/Logger';
import { CartItem } from '@/types/index';

export const BookingController = {
  confirm(req: Request, res: Response) {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const cart = req.session.cart || [];
    if (cart.length === 0) {
      return res.redirect('/cart');
    }

    const total = cart.reduce(
      (sum: number, item: CartItem) => sum + item.session.price * item.quantity,
      0
    );

    const booking = BookingsDAO.create(req.session.user.id, cart, total);

    Logger.register(
      `Confirmed booking: ${booking.id} (${total}€)`,
      req.session.user.email
    );

    req.session.cart = [];
    res.redirect('/bookings/history');
  },
  history(req: Request, res: Response) {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const bookings = BookingsDAO.getBookingsByUser(req.session.user.id);
    Logger.register('Accessing booking history', req.session.user.email);
    res.render('history', { title: 'My Reservations', bookings });
  },
};
