import createError from 'http-errors';
import { asyncHandler } from '../utils/shared.utils.js';

export const notFound = asyncHandler((req, res, next) => {
  throw new createError.BadRequest(
    `cannot find ${req.get('host')}${req.originalUrl} on the server`
  );
});
