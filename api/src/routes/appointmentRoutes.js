import { Router } from 'express';

import { celebrate } from 'celebrate';
import {
  createAppointSchema,
  // getAppointSchema,
} from '../validations/appointValidation.js';
import {
  getAppointments,
  bookAppointment,
} from '../controllers/appointController.js';

import { authenticate } from '../middleware/authenticate.js';

const appointRouter = Router();

appointRouter.use('/appointments', authenticate);

appointRouter.get(
  '/appointments/available',
  // celebrate(getAppointSchema),
  getAppointments,
);

// appointRouter.get('/appointments/client', getClientAppointments);
// appointRouter.get('/appointments/business', getBusinessAppointments);

appointRouter.post(
  '/bookAppointment',
  celebrate(createAppointSchema),
  bookAppointment,
);

// appointRouter.patch(
//   '/appointments/:id',
// celebrate(updateAppointmentSchema),
// updateAppointment,
// );

// appointRouter.delete('/appointments/:id', cancelAppointment);

export default appointRouter;
