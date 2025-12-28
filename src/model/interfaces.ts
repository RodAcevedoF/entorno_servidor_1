import { Booking, CartItem, Session, User } from '../types';

export interface BookingRepository {
  create(userId: string, items: CartItem[], total: number): Promise<Booking>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  getBookingById(id: string): Promise<Booking | null>;
  delete(id: string): Promise<void>;
}

export interface UserRepository {
  getAllUsers(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
  validateLogin(email: string, password: string): Promise<User | null>;
  update(
    id: string,
    data: Partial<Omit<User, 'id' | 'email' | 'password' | 'createdAt'>>
  ): Promise<User | null>;
}

export interface SessionsRepository {
  getAllSessions(): Promise<Session[]>;
  getSessionById(id: string): Promise<Session | undefined>;
}

export interface Logger {
  register(action: string, user?: string): void;
  getLogs(): string[];
}
