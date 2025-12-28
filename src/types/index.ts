import 'express-session';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  city: string;
  interests: string[];
  theme: string;
  createdAt: string;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price: number;
  places: number;
}

export interface CartItem {
  session: Session;
  quantity: number;
}

export interface Booking {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}

declare module 'express-session' {
  interface SessionData {
    user: SessionUser | null;
    cart: CartItem[];
  }
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  theme: string;
}
export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  city: string;
  interests: string;
  theme: string;
  createdAt: Date;
}

export interface SessionDTO {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price: number;
  places: number;
}

export interface BookingItemDTO {
  id: string;
  bookingId: string;
  sessionId: string;
  quantity: number;
  unitPrice: number;
  snapshot: string | null;
  session?: Session;
}

export interface BookingDTO {
  id: string;
  userId: string;
  total: number;
  createdAt: Date;
  items: BookingItemDTO[];
}
