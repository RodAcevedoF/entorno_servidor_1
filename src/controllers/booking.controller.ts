import { Request, Response } from 'express';
import { BookingRepository } from '../model/interfaces';
import { Booking } from '../types';

export class BookingController {
  constructor(private readonly bookings: BookingRepository) {}

  private isCancellable(booking: Booking): boolean {
    const now = new Date();
    const minDiff = 5 * 60 * 60 * 1000;

    return booking.items.every((item) => {
      const sessionDateStr = item.session.date;
      const sessionTimeStr = item.session.time;

      const sessionDateTime = new Date(
        `${sessionDateStr}T${sessionTimeStr}:00`
      );

      if (isNaN(sessionDateTime.getTime())) return false;

      const diff = sessionDateTime.getTime() - now.getTime();
      return diff > minDiff;
    });
  }

  public getBookings = async (req: Request, res: Response) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    const bookings = await this.bookings.getBookingsByUser(req.session.user.id);

    const bookingsWithStatus = bookings.map((b) => ({
      ...b,
      canCancel: this.isCancellable(b),
    }));

    res.render('history', {
      title: 'My Bookings',
      bookings: bookingsWithStatus,
    });
  };

  public cancelBooking = async (req: Request, res: Response) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    const { id } = req.params;
    const booking = await this.bookings.getBookingById(id);

    if (!booking) {
      return res.redirect('/bookings/history');
    }

    if (booking.userId !== req.session.user.id) {
      return res.status(403).send('Forbidden');
    }

    if (this.isCancellable(booking)) {
      await this.bookings.delete(id);
    }

    res.redirect('/bookings/history');
  };
}
