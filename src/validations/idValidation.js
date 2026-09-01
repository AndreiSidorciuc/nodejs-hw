import { Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
};

export const idValidation = Joi.string().custom(objectIdValidator);
