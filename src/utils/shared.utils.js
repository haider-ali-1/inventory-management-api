import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const __dirname = (fileURL) => {
  return dirname(fileURLToPath(fileURL));
};

export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};
