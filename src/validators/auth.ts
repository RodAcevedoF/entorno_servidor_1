import { body } from 'express-validator';
import * as UsersDAO from '../model/UsersPrismaDAO';

export const registerValidators = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email')
    .custom(async (email) => {
      if (await UsersDAO.getUserByEmail(email)) {
        throw new Error('A user with that email already exists');
      }
      return true;
    })
    .normalizeEmail(),
  body('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters'),
  body('age')
    .isInt({ min: 1 })
    .withMessage('Age must be greater than 0')
    .toInt(),
  body('city').optional({ checkFalsy: true }).trim(),
  body('interests').optional(),
];

export const loginValidators = [
  body('email').trim().isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password').isLength({ min: 1 }).withMessage('Password is required'),
];
