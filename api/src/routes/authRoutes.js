import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  registerClientSchema,
  loginClientSchema,
} from '../validations/authValidation.js';
import {
  registerClient,
  loginClient,
  logoutClient,
  refreshClientSession,
  deleteClient,
} from '../controllers/authController.js';

const authRoutes = Router();

authRoutes.post(
  '/auth/register',
  celebrate(registerClientSchema),
  registerClient,
);

authRoutes.post('/auth/login', celebrate(loginClientSchema), loginClient);
authRoutes.post('/auth/logout', logoutClient);
authRoutes.post('/auth/refresh', refreshClientSession);
authRoutes.delete('/auth/delete', deleteClient);
// authRoutes.patch('/auth/update', celebrate(updateClientSchema), updateClient);

export default authRoutes;
