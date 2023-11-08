import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import mongoose from 'mongoose';

import { config } from '../configs/config.js';

export const errorHandler = (err, req, res, next) => {
  const { HttpError: expressVlidatorError } = createError;
  const { TokenExpiredError, JsonWebTokenError } = jwt;
  const { CastError, ValidationError } = mongoose.Error;

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = getReasonPhrase(statusCode);
  let errors; // array[]

  // Express Validator Errors
  if (err instanceof expressVlidatorError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  }

  // JWT Errors
  else if (err instanceof TokenExpiredError) {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'token expired';
  }
  //
  else if (err instanceof JsonWebTokenError) {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'invalid token please login';
  }

  // Mongoose Errors

  // Invalid ObjectId Error
  else if (err instanceof CastError) {
    // prettier-ignore
    const {path, value: { _id }} = err
    statusCode = StatusCodes.BAD_REQUEST;
    message = `invalid ${path}`;
    errors = [{ field: path, message: `invalid ${path}`, value: _id }];
  }

  //
  else if (err instanceof ValidationError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Validation Errors';
    errors = Object.values(err.errors).map((err) => {
      const { path, message, value, properties } = err;

      let customMessage = message;

      if (properties.type === 'required') customMessage = `${path} is required`;
      return { field: path, message: customMessage, value: value || '' };
    });
  }

  // Duplicate Value Error
  else if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    const value = err.keyValue[key];
    statusCode = StatusCodes.CONFLICT;
    message = `${key} already exists`;
    errors = [{ field: key, message: `${key} already exists`, value }];
  }

  const inDevEnv = config.NODE_ENV === 'development';

  // Final Error Response
  res.status(statusCode).json({
    status: 'fail',
    message,
    errors,
    stack: inDevEnv ? err.stack : undefined,
  });
};
