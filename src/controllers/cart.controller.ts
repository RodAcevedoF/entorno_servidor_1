import { Request, Response } from 'express';
import { SessionsRepository } from '../model/interfaces';

export class CartController {
  constructor(private readonly sessions: SessionsRepository) {}

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

  public addToCart = (req: Request, res: Response) => {
    const { sessionId } = req.body;
    const session = this.sessions.getSessionById(sessionId);

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

    // This is where the booking would be created
    // For now, we just clear the cart

    req.session.cart = [];
    res.redirect('/history');
  };
}