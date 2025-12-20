import { Request, Response } from 'express';
import * as SessionsDAO from '../model/SessionsDAO';
import * as Logger from '../model/Logger';
import { CartItem } from '../types';

export function show(req: Request, res: Response) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const cart = req.session.cart || [];
  const total = cart.reduce(
    (sum: number, item: CartItem) => sum + item.session.price * item.quantity,
    0
  );
  res.render('cart', { title: 'Cart Espiritual', total });
}

export function add(req: Request, res: Response) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const { sesionId } = req.body;
  const session = SessionsDAO.getSessionById(sesionId);

  if (!session) {
    return res.redirect('/sessions');
  }

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existente = req.session.cart.find(
    (item: CartItem) => item.session.id === sesionId
  );
  if (existente) {
    existente.quantity++;
  } else {
    req.session.cart.push({ session, quantity: 1 });
  }

  Logger.register(`Added to cart: ${session.title}`, req.session.user.email);
  res.redirect('/cart');
}

export function deleteItem(req: Request, res: Response) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const { sessionId } = req.body;
  if (req.session.cart) {
    const item = req.session.cart.find(
      (item: CartItem) => item.session.id === sessionId
    );
    if (item) {
      Logger.register(
        `Removed from cart: ${item.session.title}`,
        req.session.user.email
      );
    }
    req.session.cart = req.session.cart.filter(
      (item: CartItem) => item.session.id !== sessionId
    );
  }
  res.redirect('/cart');
}

export function empty(req: Request, res: Response) {
  if (req.session.user) {
    Logger.register('Empty cart', req.session.user.email);
  }
  req.session.cart = [];
  res.redirect('/cart');
}
