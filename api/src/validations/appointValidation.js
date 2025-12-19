import { Joi, Segments } from 'celebrate';
import { BOOK_HOURS } from '../constants/book_hours.js';

export const getAppointSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    time: Joi.string()
      .valid(...BOOK_HOURS)
      .messages({
        'any.only': `Booking time must be one of: ${BOOK_HOURS.join(', ')}`,
      }),
    search: Joi.string().trim().allow(''),
  }),
};

export const createAppointSchema = {
  [Segments.BODY]: Joi.object({
    topic: Joi.string().min(1).max(30).required(),
    content: Joi.string().allow(''),
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

export const getAvailableSlotsSchema = {
  [Segments.QUERY]: Joi.object({
    businessId: Joi.string().length(24).hex().required(),
    date: Joi.string().required().messages({
      'string.base': 'Date must be in format YYYY-MM-DD',
    }),
  }),
};
