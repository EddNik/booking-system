import { Router } from 'express';

import { celebrate } from 'celebrate';
import {
  createAppointSchema,
  getAppointSchema,
} from '../validations/appointValidation.js';
import {
  getAppointments,
  bookAppointment,
} from '../controllers/appointController.js';

import { authenticate } from '../middleware/authenticate.js';

const appointRouter = Router();

appointRouter.use('/appointments', authenticate);

appointRouter.get(
  '/appointments',
  celebrate(getAppointSchema),
  getAppointments,
);

// appointRouter.get('/appointments/business', getBusinessAppointments);

appointRouter.post(
  '/appointments',
  celebrate(createAppointSchema),
  bookAppointment,
);

// appointRouter.delete('/appointments/:id', cancelAppointment);

export default appointRouter;
