import { Router } from 'express';

import { celebrate } from 'celebrate';
import {
  createAppointSchema,
  getAvailableAppointSchema,
} from '../validations/appointValidation.js';
import {
  getAvailableAppointments,
  bookAppointment,
  rejectAppointment,
} from '../controllers/appointController.js';

import { authenticate } from '../middleware/authenticate.js';

const appointRouter = Router();

appointRouter.use('/appointments', authenticate);

appointRouter.get(
  '/appointments/available',
  celebrate(getAvailableAppointSchema),
  getAvailableAppointments,
);

// appointRouter.get('/appointments/client', getClientAppointments);
// appointRouter.get('/appointments/business', getBusinessAppointments);

appointRouter.post(
  '/bookAppointment',
  celebrate(createAppointSchema),
  bookAppointment,
);

appointRouter.delete('/appointments/:id', rejectAppointment);

export default appointRouter;
