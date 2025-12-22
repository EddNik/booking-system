import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  registerClientSchema,
  loginClientSchema,
} from '../validations/clientValidation.js';
import {
  registerClient,
  loginClient,
  logoutClient,
  refreshClientSession,
  deleteClient,
} from '../controllers/clientController.js';

// import { authenticate } from '../middleware/authenticate.js';

const clientRoutes = Router();

clientRoutes.post(
  '/client/register',
  celebrate(registerClientSchema),
  registerClient,
);

clientRoutes.post('/client/login', celebrate(loginClientSchema), loginClient);

// clientRoutes.use(authenticate);

clientRoutes.post('/client/logout', logoutClient);
clientRoutes.post('/client/refresh', refreshClientSession);
clientRoutes.delete('/client/delete', deleteClient);

export default clientRoutes;
