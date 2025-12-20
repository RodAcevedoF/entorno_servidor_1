import fs from 'fs';
import path from 'path';
import { Booking, CartItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

const DATA_PATH = path.join(__dirname, '../../data/reservas.json');

function getBookings(): Booking[] {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, '[]', 'utf-8');
    return [];
  }
  const data = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(data);
}

function guardarReservas(reservas: Booking[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(reservas, null, 2), 'utf-8');
}

export function create(
  userId: string,
  items: CartItem[],
  total: number
): Booking {
  const bookings = getBookings();
  const newBooking: Booking = {
    id: uuidv4(),
    userId,
    items,
    total,
    createdAt: new Date().toISOString(),
  };
  const updated = [...bookings, newBooking];
  guardarReservas(updated);
  return newBooking;
}

export function getBookingByUser(usuarioId: string): Booking[] {
  const bookings = getBookings();
  return bookings
    .filter((r) => r.userId === usuarioId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}
