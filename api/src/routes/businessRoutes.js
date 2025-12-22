import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  createBusinessSchema,
  getBusinessSchema,
  // updateBusinessSchema,
  loginBusinessSchema,
} from '../validations/businessValidation.js';

// import { authenticate } from '../middleware/authenticate.js';

import {
  registerBusiness,
  loginBusiness,
  logoutBusiness,
  getAllBusinesses,
  deleteBusiness,
  refreshBusinessSession,
} from '../controllers/businessController.js';

const businessRouter = Router();

businessRouter.post(
  '/business/register',
  celebrate(createBusinessSchema),
  registerBusiness,
);

businessRouter.post(
  '/business/login',
  celebrate(loginBusinessSchema),
  loginBusiness,
);

// businessRouter.use(authenticate);

businessRouter.post('/business/logout', logoutBusiness);

businessRouter.get(
  '/businesses',
  celebrate(getBusinessSchema),
  getAllBusinesses,
);

businessRouter.post('/business/refresh', refreshBusinessSession);

businessRouter.delete('/business/delete', deleteBusiness);

export default businessRouter;
