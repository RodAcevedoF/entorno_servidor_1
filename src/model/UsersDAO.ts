import fs from 'fs';
import path from 'path';
import { User } from '../types';
import { hashPassword, comparePassword } from '../utils/auth';
import { v4 as uuidv4 } from 'uuid';

const DATA_PATH = path.join(__dirname, '../../data/users.json');

function getUsers(): User[] {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, '[]', 'utf-8');
    return [];
  }
  const data = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(data);
}

function saveUsers(usuarios: User[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(usuarios, null, 2), 'utf-8');
}

export function getAllUsers(): User[] {
  return getUsers();
}

export function getUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  const users = getUsers();
  return users.find((u) => u.id === id);
}

export async function create(
  usuario: Omit<User, 'id' | 'createdAt'>
): Promise<User> {
  const users = getUsers();
  const hash = await hashPassword(usuario.password);
  usuario = { ...usuario, password: hash };
  const newUser: User = {
    ...usuario,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);
  return newUser;
}

export async function validateLogin(
  email: string,
  password: string
): Promise<User | null> {
  const usuario = getUserByEmail(email);
  if (usuario && (await comparePassword(password, usuario.password))) {
    return usuario;
  }
  return null;
}

export function update(
  id: string,
  data: Partial<Omit<User, 'id' | 'email' | 'password' | 'createdAt'>>
): User | null {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...data };
  saveUsers(users);
  return users[index];
}
