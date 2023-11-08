import { body } from 'express-validator';
import { USER_ROLES } from '../constants/user.constants.js';
import { validate } from '../middlewares/validation.middleware.js';

export const updateUserValidator = validate([
  body('email')
    .if(body('email').notEmpty())
    .isEmail()
    .withMessage('invalid email format'),
]);

export const updateUserRoleValidator = validate([
  body('role')
    .isIn([USER_ROLES.USER, USER_ROLES.ADMIN])
    .withMessage('invalid role type'),
]);
