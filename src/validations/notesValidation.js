// ------------------------------------ Загальна схема перевірки ---------------------
// import { Joi, Segments } from 'celebrate';
// import { isValidObjectId } from 'mongoose';
// import { notesTypList } from '../constants/tags.js';

// // value — це значення, яке перевіряється в даний момент. Наприклад,
// // рядок "64b5f1c2e4b0c1a23456789a" або помилковий текст "12345",
// // які користувач передав в URL-шляху (:noteId).
// // helpers — об'єкт-помічник
// // від бібліотеки Joi. Він потрібен для того, щоб у разі помилки красиво повернути
// // її опис назад у систему валідації.
// // isValidObjectId(value) — вбудована функція Mongoose.
// // У MongoDB є суворий стандарт для ID: це має бути 24-значний шістнадцятковий рядок
// // (цифри від 0 до 9 та літери від a до f). Функція перевіряє рядок на відповідність цьому
// // стандарту:Якщо рядок відповідає стандарту ID, повертається true.Якщо рядок пошкоджений або
// // це звичайний текст (наприклад, "hello"), повертається false.
// // !isValidObjectId(value) — знак ! означає «НЕ». Умова читається так: «Якщо це НЕ валідний ObjectId...».
// const objectIdValidator = (value, helpers) => {
//   return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
// };

// // УНИВЕРСАЛЬНА СХЕМА ДЛЯ ПЕРЕВІРКИ ID (для GET/:id і DELETE/:id)
// export const validateNoteId = {
//   [Segments.PARAMS]: Joi.object({
//     noteId: Joi.string().custom(objectIdValidator).required(),
//   }),
// };

// // СХЕМА ДЛЯ СТВОРЕННЯ (Використовується для POST)
// export const createNoteSchema = {
//   [Segments.BODY]: Joi.object({
//     //                 в messages() можемо вказати свій текст вимоги
//     title: Joi.string().required().messages({
//       // 1. Когда поле вообще не передали в JSON
//       'any.required': 'Поле є обовʼязковим для заповнення!',
//       // 2. ИСПРАВЛЕНО: Когда передали пустую строку ""
//       'string.empty': 'Нічого не знайдено! Назва не може бути порожньою.',
//       // 3. ИСПРАВЛЕНО: Когда передали не строку (например, число или boolean)
//       'string.base': 'Десь ти помилився! Назва має бути текстом.',
//     }), // Обовязкове поле
//     content: Joi.string().required(), // Обовязкове поле
//     tag: Joi.string()
//       .valid(...notesTypList)
//       .required(), // Обовязкове поле
//   }),
// };

// // СХЕМА ДЛЯ ОНОВЛЕННЯ (Використовується для PATCH або PUT)
// export const updateNotesSchema = {
//   [Segments.PARAMS]: Joi.object({
//     noteId: Joi.string().custom(objectIdValidator).required(), // Перевіряє ID в URL
//   }),
//   [Segments.BODY]: Joi.object({
//     title: Joi.string(), // При оновленні поля НЕобовязкові
//     content: Joi.string(),
//     tag: Joi.string().valid(...notesTypList),
//   }).min(1), // важливо: не дозволяємо порожнє тіло
// };

// ------------------------------------ нова потрібна СХЕМА для ДЗ-------------------------
// import { Joi, Segments } from 'celebrate';
// import { isValidObjectId } from 'mongoose';
// import { TAGS } from '../constants/tags.js';

// // Кастомный валидатор для ObjectId
// // // value — це значення, яке перевіряється в даний момент. Наприклад,
// // // рядок "64b5f1c2e4b0c1a23456789a" або помилковий текст "12345",
// // // які користувач передав в URL-шляху (:noteId).
// // // helpers — об'єкт-помічник
// // // від бібліотеки Joi. Він потрібен для того, щоб у разі помилки красиво повернути
// // // її опис назад у систему валідації.
// // // isValidObjectId(value) — вбудована функція Mongoose.
// // // У MongoDB є суворий стандарт для ID: це має бути 24-значний шістнадцятковий рядок
// // // (цифри від 0 до 9 та літери від a до f). Функція перевіряє рядок на відповідність цьому
// // // стандарту:Якщо рядок відповідає стандарту ID, повертається true.Якщо рядок пошкоджений або
// // // це звичайний текст (наприклад, "hello"), повертається false.
// const objectIdValidator = (value, helpers) => {
//   return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
// };

// // 1. Схема для GET /notes (Параметры строки запроса)
// export const getAllNotesSchema = {
//   [Segments.QUERY]: Joi.object({
//     page: Joi.number().integer().min(1).default(1),
//     perPage: Joi.number().integer().min(5).max(20).default(10),
//     tag: Joi.string()
//       .valid(...TAGS)
//       .optional(),
//     search: Joi.string().allow('').optional(), // Дозволяємо порожню сторінку
//   }),
// };

// // 2. // УНИВЕРСАЛЬНА СХЕМА ДЛЯ ПЕРЕВІРКИ ID (для GET/:id і DELETE/:id)
// export const noteIdSchema = {
//   [Segments.PARAMS]: Joi.object({
//     noteId: Joi.string().custom(objectIdValidator).required(),
//   }),
// };

// // 3. Схема для POST /notes
// export const createNoteSchema = {
//   [Segments.BODY]: Joi.object({
//     title: Joi.string().min(1).required(),
//     content: Joi.string().allow('').optional(), // Может бути порожнім, необовязкове
//     tag: Joi.string()
//       .valid(...TAGS)
//       .optional(),
//   }),
// };

// // 4. Схема для PATCH /notes/:noteId (Комбінована)
// export const updateNoteSchema = {
//   // Перевикористовуємо валидацию параметрів із noteIdSchema
//   [Segments.PARAMS]: noteIdSchema[Segments.PARAMS],

//   [Segments.BODY]: Joi.object({
//     title: Joi.string().min(1).optional(),
//     content: Joi.string().allow('').optional(),
//     tag: Joi.string()
//       .valid(...TAGS)
//       .optional(),
//   }).min(1), // важливо: не дозволяємо порожнє тіло
// };

//  ---------------------------------------- ще одна СХЕМА попрактикувати ДЗ ---------------------
import { Segments, Joi } from 'celebrate';
// import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';
import { idValidation } from '../validations/idValidation.js';

// const objectIdValidator = (value, helpers) => {
//   return isValidObjectId(value) ? value : helpers.message('Invalid id format');
// };

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow(''),
  }),
};

//  Схема для POST /notes
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().required().messages({
      // 1. Когда поле вообще не передали в JSON
      'any.required': 'Поле є обовʼязковим для заповнення!',
      // 2. ИСПРАВЛЕНО: Когда передали пустую строку ""
      'string.empty': 'Нічого не знайдено! Назва не може бути порожньою.',
      // 3. ИСПРАВЛЕНО: Когда передали не строку (например, число или boolean)
      'string.base': 'Десь ти помилився! Назва має бути текстом.',
    }), // Обовязкове поле
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  }),
};

// Для валідаціі ID для DELETE / GET:ID
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: idValidation.required(),
  }),
};

// Схема для PATCH /notes/:noteId (Комбінована)
export const updateNoteSchema = {
  // Перевикористовуємо валидацию параметрів із noteIdSchema
  [Segments.PARAMS]: Joi.object({
    noteId: noteIdSchema,
  }),

  // Тепер створюємо  Схему для PATCH
  [Segments.BODY]: Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    tag: Joi.string().valid(...TAGS),
  }).min(1), // важливо: не дозволяємо порожнє тіло має бути це вказує що б хочаб одне щось перевірялось
};

// // --------------------------------СХЕМА ДЛЯ АВТОРИЗАЦИИ / РЕГИСТРАЦИИ
// export const authSchema = {
//   [Segments.BODY]: Joi.object({
//     // Проверяем email: он должен быть строкой, валидным имейлом и обязателен
//     email: Joi.string()
//       .email()
//       .required()
//       .messages({
//         'string.email': 'Введіть коректний email адресу!',
//         'any.required': 'Email є обовʼязковим полем!'
//       }),

//     // Проверяем пароль: строка, минимум 6 символов (или больше), обязателен
//     password: Joi.string()
//       .min(6)
//       .max(30)
//       .required()
//       .messages({
//         'string.min': 'Пароль має бути не менше 6 символів!',
//         'string.max': 'Пароль має бути не більше 30 символів!',
//         'any.required': 'Пароль є обовʼязковим полем!'
//       })
//   })
// };
