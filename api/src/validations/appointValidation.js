import { Joi, Segments } from 'celebrate';
// import { isValidObjectId } from 'mongoose';
import { BOOK_HOURS } from '../constants/tags.js';

// const objectIdValidator = (value, helpers) => {
//   return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
// };

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
    time: Joi.string()
      .valid(...BOOK_HOURS)
      .messages({
        'any.only': `Booking time must be one of: ${BOOK_HOURS.join(', ')}`,
      }),
  }),
};
