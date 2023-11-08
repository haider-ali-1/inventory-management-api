import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import { asyncHandler } from '../utils/shared.utils.js';
import { config } from '../configs/config.js';

export const ensureAuthenticated = asyncHandler(async (req, res, next) => {
  const authHeader =
    req.headers['authorization'] || req.headers['Authorization'];

  const token = authHeader?.startsWith('Bearer ') && authHeader?.split(' ')[1];

  if (!token || token === 'null')
    throw new createError.Unauthorized('please login');

  // token expired error will be fire from here
  const user = jwt.verify(token, config.JWT_ACCESS_TOKEN_SECRET);

  req.user = user;
  next();
});

export const ensureAuthorized = (roles) => {
  return asyncHandler(async (req, res, next) => {
    const authorized = roles.some((role) => req.user.role.includes(role));
    if (!authorized)
      throw new createError.Forbidden(
        `you do not have permission to perform this action`
      );
    next();
  });
};
