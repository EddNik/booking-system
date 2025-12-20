import { Segments, Joi } from 'celebrate';

export const registerClientSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(20).trim(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

export const loginClientSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

// export const updateClientSchema = {
//   [Segments.BODY]: Joi.object({
//     name: Joi.string().min(2).max(20).trim(),
//     email: Joi.string().email(),
//   }).min(1),
// };
