import { Booking, CartItem, Session } from '../types';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../db/prisma';
import { BookingRepository } from './interfaces';

export class BookingModel implements BookingRepository {
  constructor() {}

  private resolveSession(item: {
    session: Session | null;
    sessionId: string;
    unitPrice: number;
    snapshot: string | null;
  }): Session {
    if (item.session) return item.session;
    if (item.snapshot) {
      try {
        return JSON.parse(item.snapshot) as Session;
      } catch (error) {
        console.error('Error parsing session snapshot:', error);
      }
    }
    return {
      id: item.sessionId,
      title: 'Unknown session',
      description: '',
      date: '',
      time: '',
      price: item.unitPrice ?? 0,
      places: 0,
    };
  }

  async create(
    userId: string,
    items: CartItem[],
    total: number
  ): Promise<Booking> {
    const newBookingId = uuidv4();
    const booking = await prisma.booking.create({
      data: {
        id: newBookingId,
        userId,
        total,
        items: {
          create: items.map((item) => ({
            sessionId: item.session.id,
            quantity: item.quantity,
            unitPrice: item.session.price,
            snapshot: JSON.stringify(item.session),
          })),
        },
      },
      include: {
        items: {
          include: {
            session: true,
          },
        },
      },
    });

    return {
      id: booking.id,
      userId: booking.userId,
      items: booking.items.map((item) => ({
        session: this.resolveSession(item),
        quantity: item.quantity,
      })),
      total: booking.total,
      createdAt: booking.createdAt.toISOString(),
    };
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            session: true,
          },
        },
      },
    });

    return bookings.map((b) => ({
      id: b.id,
      userId: b.userId,
      items: b.items.map((item) => ({
        session: this.resolveSession(item),
        quantity: item.quantity,
      })),
      total: b.total,
      createdAt: b.createdAt.toISOString(),
    }));
  }

  async getBookingById(id: string): Promise<Booking | null> {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            session: true,
          },
        },
      },
    });

    if (!booking) return null;

    return {
      id: booking.id,
      userId: booking.userId,
      items: booking.items.map((item) => ({
        session: this.resolveSession(item),
        quantity: item.quantity,
      })),
      total: booking.total,
      createdAt: booking.createdAt.toISOString(),
    };
  }

  async delete(id: string): Promise<void> {
    await prisma.booking.delete({
      where: { id },
    });
  }
}
