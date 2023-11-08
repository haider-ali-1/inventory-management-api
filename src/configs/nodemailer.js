import nodemailer from 'nodemailer';
import { config } from './config.js';

export const transporter = nodemailer.createTransport({
  host: config.NODEMAILER_HOST,
  port: config.NODEMAILER_PORT,
  secure: config.NODE_ENV === 'production',
  auth: {
    user: config.NODEMAILER_USERNAME,
    pass: config.NODEMAILER_PASSWORD,
  },
});
