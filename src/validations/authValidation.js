import { Segments, Joi } from 'celebrate';
// import { emailRegex } from '../constants/authConstants.js';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    // username: Joi.string().min(3),
    //                 додаємо свою перевірку
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    //                 додаємо свою перевірку
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
