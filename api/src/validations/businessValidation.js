import { Segments, Joi } from 'celebrate';

export const getBusinessesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    search: Joi.string().trim().allow(''),
  }),
};

export const createBusinessSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

export const updateBusinessSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(20),
    email: Joi.string().email(),
  }).min(1),
};
