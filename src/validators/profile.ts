import { body } from 'express-validator';

export const profileValidators = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('age')
    .isInt({ min: 1, max: 120 })
    .withMessage('Age must be between 1 and 120')
    .toInt(),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('interests').optional(),
];
