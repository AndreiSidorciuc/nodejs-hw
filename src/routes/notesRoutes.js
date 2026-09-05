// import { Router } from 'express';
// import {
//   getNote,
//   getNoteById,
//   addPostNotes,
//   updateNoteById,
//   deleteNoteById,
// } from '../controllers/notesController.js';

// // створюємо сам роутер для підключення за маршрутом
// const studentRouter = Router();

// // створюємо ровтер та маршрут на головну сторінку та додаємо функцію сонтролера
// studentRouter.get('/', getNote);

// // створюємо маршрут з параметром id та додаємо контролер
// studentRouter.get('/:noteId', getNoteById);

// // створюємо маршрут на додавання нового посту
// studentRouter.post('/', addPostNotes);

// // Створюємо маршрут на зміну  поста по id томущо пост пожна змінювати тільки по id
// studentRouter.patch('/:id', updateNoteById);

// // Створюємо маршрут видалення для Student
// studentRouter.delete('/:id', deleteNoteById);

// // експортуємо весь Router
// export default studentRouter;

import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const notesRouter = Router();

// ВИПРАВЛЕНО: Глобально застосовуємо мідлвару до абсолютно всіх маршрутів цього роутера
notesRouter.use(authenticate);

// Маршрут GET для всіх нотаток
notesRouter.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

// Маршрут GET для пошуку за id
notesRouter.get(
  '/notes/:noteId',
  celebrate(noteIdSchema, { abortEarly: false }),
  getNoteById,
);

// Маршрут POST для створення нотатки
notesRouter.post(
  '/notes',
  celebrate(createNoteSchema, { abortEarly: false }),
  createNote,
);

// Маршрут PATCH для оновлення нотатки
notesRouter.patch(
  '/notes/:noteId',
  celebrate(updateNoteSchema, { abortEarly: false }),
  updateNote,
);

// Маршрут DELETE для видалення нотатки
notesRouter.delete(
  '/notes/:noteId',
  celebrate(noteIdSchema, { abortEarly: false }),
  deleteNote,
);

export default notesRouter;
