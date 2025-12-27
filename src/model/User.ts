import prisma from '../db/prisma';
import { User } from '../types';
import { hashPassword, comparePassword } from '../utils/auth';
import { UserRepository } from './interfaces';

export class UserModel implements UserRepository {
  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      password: u.password,
      age: u.age,
      city: u.city,
      interests: u.interests ? JSON.parse(u.interests) : [],
      createdAt: u.createdAt.toISOString(),
    }));
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const u = await prisma.user.findUnique({ where: { email } });
    if (!u) return undefined;
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      password: u.password,
      age: u.age,
      city: u.city,
      interests: u.interests ? JSON.parse(u.interests) : [],
      createdAt: u.createdAt.toISOString(),
    };
  }

  async getUserById(id: string): Promise<User | undefined> {
    const u = await prisma.user.findUnique({ where: { id } });
    if (!u) return undefined;
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      password: u.password,
      age: u.age,
      city: u.city,
      interests: u.interests ? JSON.parse(u.interests) : [],
      createdAt: u.createdAt.toISOString(),
    };
  }

  async create(usuario: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const hash = await hashPassword(usuario.password);
    const u = await prisma.user.create({
      data: {
        name: usuario.name,
        email: usuario.email,
        password: hash,
        age: usuario.age,
        city: usuario.city,
        interests: JSON.stringify(usuario.interests || []),
      },
    });
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      password: u.password,
      age: u.age,
      city: u.city,
      interests: u.interests ? JSON.parse(u.interests) : [],
      createdAt: u.createdAt.toISOString(),
    };
  }

  async validateLogin(email: string, password: string): Promise<User | null> {
    const u = await prisma.user.findUnique({ where: { email } });
    if (!u) return null;
    if (await comparePassword(password, u.password)) {
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password,
        age: u.age,
        city: u.city,
        interests: u.interests ? JSON.parse(u.interests) : [],
        createdAt: u.createdAt.toISOString(),
      };
    }
    return null;
  }

  async update(
    id: string,
    data: Partial<Omit<User, 'id' | 'email' | 'password' | 'createdAt'>>
  ): Promise<User | null> {
    try {
      const u = await prisma.user.update({
        where: { id },
        data: {
          name: data.name,
          age: data.age,
          city: data.city,
          interests: data.interests
            ? JSON.stringify(data.interests)
            : undefined,
        },
      });
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password,
        age: u.age,
        city: u.city,
        interests: Array.isArray(u.interests) ? u.interests : [],
        createdAt: u.createdAt.toISOString(),
      };
    } catch {
      return null;
    }
  }
}

const users = new UserModel();

export function getUserByEmail(email: string): Promise<User | undefined> {
  return users.getUserByEmail(email);
}