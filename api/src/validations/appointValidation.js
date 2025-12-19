import { Joi, Segments } from 'celebrate';
import { BOOK_HOURS } from '../constants/bookHours.js';

export const createAppointSchema = {
  [Segments.BODY]: Joi.object({
    // page: Joi.number().integer().min(1).default(1),
    // perPage: Joi.number().integer().min(5).max(20).default(10),
    businessId: Joi.string(),
    clientId: Joi.string(),

    date: Joi.string().required().messages({
      'string.base': 'Date must be in format YYYY-MM-DD',
    }),

    time: Joi.string()
      .valid(...BOOK_HOURS)
      .messages({
        'any.only': `Booking time must be one of: ${BOOK_HOURS.join(', ')}`,
      }),

    // search: Joi.string().trim().allow(''),
  }),
};

export const updateAppointSchema = {
  [Segments.BODY]: Joi.object({
    date: Joi.string().required().messages({
      'string.base': 'Date must be in format YYYY-MM-DD',
    }),
    time: Joi.string()
      .valid(...BOOK_HOURS)
      .messages({
        'any.only': `Booking time must be one of: ${BOOK_HOURS.join(', ')}`,
      }),
  }),
};

export const getAvailableAppointSchema = {
  [Segments.QUERY]: Joi.object({
    businessId: Joi.string().length(24).hex().required(),
    date: Joi.string().required().messages({
      'string.base': 'Date must be in format YYYY-MM-DD',
    }),
  }),
};
