import { Segments, Joi } from 'celebrate';

export const registerClientSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
};

export const loginClientSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};
