import passport from 'passport';

import { Router } from 'express';

import {
  forgotPassword,
  handleOAuthLogin,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmail,
  resetPassword,
  verifyEmail,
} from '../../controllers/auth.controllers.js';

import {
  forgotPasswordValidator,
  loginUserValidator,
  registerUserValidator,
  resetPasswordValidator,
} from '../../validations/auth.validations.js';

import { ensureAuthenticated } from '../../middlewares/auth.middlewares.js';

const router = Router();

router.post('/register', registerUserValidator, registerUser);
router.post('/resend-email-verification', ensureAuthenticated, resendEmail);
router.get('/verify-email/:token', verifyEmail);
router.post('/login', loginUserValidator, loginUser);
router.post('/logout', ensureAuthenticated, logoutUser);
router.post('/refresh-token', refreshAccessToken);
router.post('/forgot-password', forgotPasswordValidator, forgotPassword);
router.post('/reset-password/:token', resetPasswordValidator, resetPassword);

// Google
router.route('/google').get(
  passport.authenticate('google', {
    accessType: 'offline',
    prompt: 'consent',
    scope: ['email', 'profile'],
  })
);

router.route('/google/callback').get(
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  handleOAuthLogin
);

export { router };
