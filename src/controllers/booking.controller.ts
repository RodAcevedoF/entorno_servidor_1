import { Request, Response } from 'express';
import { BookingRepository } from '../model/interfaces';

export class BookingController {
  constructor(private readonly bookings: BookingRepository) {}

  public getBookings = async (req: Request, res: Response) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    const bookings = await this.bookings.getBookingsByUser(req.session.user.id);
    res.render('history', {
      title: 'My Bookings',
      bookings,
    });
  };
}
