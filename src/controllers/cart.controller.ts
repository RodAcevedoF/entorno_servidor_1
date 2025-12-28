import { Request, Response } from 'express';
import { SessionsRepository, BookingRepository } from '../model/interfaces';

export class CartController {
  constructor(
    private readonly sessions: SessionsRepository,
    private readonly bookings: BookingRepository
  ) {}

  public getCart = (req: Request, res: Response) => {
    const cart = req.session.cart || [];
    const total = cart.reduce(
      (acc, item) => acc + item.session.price * item.quantity,
      0
    );
    res.render('cart', {
      title: 'Cart',
      cart,
      total,
    });
  };

  public addToCart = async (req: Request, res: Response) => {
    const { sessionId } = req.body;
    const session = await this.sessions.getSessionById(sessionId);

    if (session) {
      const cart = req.session.cart || [];
      const existingItem = cart.find((item) => item.session.id === sessionId);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ session, quantity: 1 });
      }
      req.session.cart = cart;
    }
    res.redirect('/cart');
  };

  public removeFromCart = (req: Request, res: Response) => {
    const { sessionId } = req.params;
    let cart = req.session.cart || [];
    cart = cart.filter((item) => item.session.id !== sessionId);
    req.session.cart = cart;
    res.redirect('/cart');
  };

  public checkout = async (req: Request, res: Response) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const cart = req.session.cart || [];
    if (cart.length === 0) {
      return res.redirect('/cart');
    }

    const total = cart.reduce(
      (acc, item) => acc + item.session.price * item.quantity,
      0
    );

    await this.bookings.create(req.session.user.id, cart, total);

    req.session.cart = [];
    res.redirect('/bookings/history');
  };
}
