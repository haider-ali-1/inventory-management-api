import { Router } from 'express';
import {
  ensureAuthenticated,
  ensureAuthorized,
} from '../../middlewares/auth.middlewares.js';
import {
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  updateUser,
  updateUserRole,
} from '../../controllers/user.controllers.js';
import {
  updateUserRoleValidator,
  updateUserValidator,
} from '../../validations/user.validations.js';

import { USER_ROLES } from '../../constants/user.constants.js';

const router = Router();

// @ /api/v1/users

router
  .route('/')
  .get(ensureAuthenticated, ensureAuthorized([USER_ROLES.ADMIN]), getAllUsers);

router
  .route('/profile')
  .get(ensureAuthenticated, getCurrentUser)
  .patch(ensureAuthenticated, updateUserValidator, updateUser);

router
  .route('/:userId')
  .get(ensureAuthenticated, ensureAuthorized([USER_ROLES.ADMIN]), getSingleUser)
  .delete(
    ensureAuthenticated,
    ensureAuthorized([USER_ROLES.ADMIN]),
    deleteUser
  );

router
  .route('/:userId/update-role')
  .patch(
    ensureAuthenticated,
    ensureAuthorized(['admin']),
    updateUserRoleValidator,
    updateUserRole
  );

export { router };
