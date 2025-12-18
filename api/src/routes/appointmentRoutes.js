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

appointRouter.use('/appointment', authenticate);

appointRouter.get('/appointment', celebrate(getAppointSchema), getAppointments);

appointRouter.post(
  '/appointment',
  celebrate(createAppointSchema),
  bookAppointment,
);

export default appointRouter;
