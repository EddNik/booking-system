import { Joi, Segments } from 'celebrate';
import { BOOK_HOURS } from '../constants/bookHours.js';

export const createAppointSchema = {
  [Segments.BODY]: Joi.object({
    businessId: Joi.string().required(),
    clientId: Joi.string().required(),

    date: Joi.string()
      .required()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .messages({
        'string.base': 'Date must be in format YYYY-MM-DD',
      }),

    time: Joi.string()
      .valid(...BOOK_HOURS)
      .messages({
        'any.only': `Booking time must be one of: ${BOOK_HOURS.join(', ')}`,
      }),
  }),
};

export const updateAppointSchema = {
  [Segments.BODY]: Joi.object({
    date: Joi.string()
      .required()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .messages({
        'string.base': 'Date must be in format YYYY-MM-DD',
      }),
    time: Joi.string()
      .valid(...BOOK_HOURS)
      .messages({
        'any.only': `Booking time must be one of: ${BOOK_HOURS.join(', ')}`,
      }),
  }),
};

export const getAppointmentsSchema = {
  [Segments.QUERY]: Joi.object({
    state: Joi.string().valid('booked', 'available'),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
  }),
};

export const getAvailableAppointSchema = {
  [Segments.QUERY]: Joi.object({
    businessId: Joi.string().required(),
    date: Joi.string()
      .required()
      .pattern(/^\d{4}-\d{2}-\d{2}$/),
  }),
};
