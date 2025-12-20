import { Router } from 'express';

import { celebrate } from 'celebrate';
import {
  createAppointSchema,
  getAvailableAppointSchema,
  rejectAppointmentSchema,
  getAppointmentsSchema,
} from '../validations/appointValidation.js';
import {
  getAvailableAppointments,
  bookAppointment,
  rejectAppointment,
  getClientAppointments,
  getBusinessAppointments,
} from '../controllers/appointController.js';

import { authenticate } from '../middleware/authenticate.js';

const appointRouter = Router();

appointRouter.use(authenticate);

appointRouter.get(
  '/appointments/available',
  celebrate(getAvailableAppointSchema),
  getAvailableAppointments,
);

appointRouter.get(
  '/appointments/client',
  celebrate(getAppointmentsSchema),
  getClientAppointments,
);
appointRouter.get(
  '/appointments/business',
  celebrate(getAppointmentsSchema),
  getBusinessAppointments,
);

appointRouter.post(
  '/bookAppointment',
  celebrate(createAppointSchema),
  bookAppointment,
);

appointRouter.delete(
  '/appointments/:id',
  celebrate(rejectAppointmentSchema),
  rejectAppointment,
);

export default appointRouter;
