import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import {
  registerClient,
  loginClient,
  logoutClient,
  refreshClientSession,
} from '../controllers/authController.js';

const authRoutes = Router();

authRoutes.post(
  '/auth/register',
  celebrate(registerUserSchema),
  registerClient,
);

authRoutes.post('/auth/login', celebrate(loginUserSchema), loginClient);
authRoutes.post('/auth/logout', logoutClient);
authRoutes.post('/auth/refresh', refreshClientSession);

export default authRoutes;
