import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  registerUserSchema,
  loginUserSchema,
  // requestResetEmailSchema,
} from '../validations/authValidation.js';
import {
  registerClient,
  loginClient,
  logoutClient,
  // refreshUserSession,
} from '../controllers/authController.js';

const authRoutes = Router();

authRoutes.post(
  '/auth/register',
  celebrate(registerUserSchema),
  registerClient,
);

authRoutes.post('/auth/login', celebrate(loginUserSchema), loginClient);
authRoutes.post('/auth/logout', logoutClient);
// authRoutes.post('/auth/refresh', refreshUserSession);
// authRoutes.post(
//   '/auth/request-reset-email',
//   celebrate(requestResetEmailSchema),
// );

export default authRoutes;
