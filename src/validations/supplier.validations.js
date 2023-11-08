import createError from 'http-errors';
import { body } from 'express-validator';
import { validate } from '../middlewares/validation.middleware.js';

const createSupplierValidator = validate([
  body('name').trim().notEmpty().withMessage('name is required'),
  body('address.street').optional(),
  body('address.city').trim().notEmpty().withMessage('city is required'),
  body('address.country').trim().notEmpty().withMessage('country is required'),
  body('phoneNumbers')
    .isArray({ min: 1 })
    .withMessage('phone number is required')
    .custom((phoneNumbers) => {
      for (let num of phoneNumbers) {
        const match = /^03d{9}$/.test(num); // check phone number format
        if (!match) throw new createError('invalid phone number');
      }
      return true;
    }),
]);

export { createSupplierValidator };
