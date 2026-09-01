import { Segments, Joi } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { idValidation } from '../validations/idValidation.js';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
    search: Joi.string().allow('').optional(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'any.required': 'Поле є обовʼязковим для заповнення!',
      'string.empty': 'Нічого не знайдено! Назва не може бути порожньою.',
      'string.base': 'Десь ти помилився! Назва має бути текстом.',
    }),
    content: Joi.string().allow('').optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: idValidation.required(),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: idValidation.required(),
  }),

  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  }).min(1), // важливо: не дозволяємо порожнє тіло має бути це вказує що б хочаб одне щось перевірялось
};
