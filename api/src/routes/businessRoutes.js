import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  createBusinessSchema,
  getBusinessSchema,
  // updateBusinessSchema,
} from '../validations/businessValidation.js';

import {
  registerBusiness,
  loginBusiness,
  getAllBusinesses,
  deleteBusiness,
} from '../controllers/businessController.js';

const businessRouter = Router();

businessRouter.post(
  '/business/register',
  celebrate(createBusinessSchema),
  registerBusiness,
);

businessRouter.post(
  '/business/login',
  celebrate(createBusinessSchema),
  loginBusiness,
);

businessRouter.get(
  '/businesses',
  celebrate(getBusinessSchema),
  getAllBusinesses,
);

// businessRouter.patch(
//   '/businesses/:id',
//   celebrate(updateBusinessSchema),
//   // updateBusiness,
// );

businessRouter.delete('/business/:id', deleteBusiness);

export default businessRouter;
