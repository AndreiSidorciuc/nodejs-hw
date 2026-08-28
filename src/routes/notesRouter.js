import { Router } from 'express';
import {
  getNote,
  getNoteById,
  addPostNotes,
  updateNoteById,
  deleteNoteById,
} from '../controllers/notesController.js';

// створюємо сам роутер для підключення за маршрутом
const studentRouter = Router();

// створюємо ровтер та маршрут на головну сторінку та додаємо функцію сонтролера
studentRouter.get('/', getNote);

// створюємо маршрут з параметром id та додаємо контролер
studentRouter.get('/:noteId', getNoteById);

// створюємо маршрут на додавання нового посту
studentRouter.post('/', addPostNotes);

// Створюємо маршрут на зміну  поста по id томущо пост пожна змінювати тільки по id
studentRouter.patch('/:id', updateNoteById);

// Створюємо маршрут видалення для Student
studentRouter.delete('/:id', deleteNoteById);

// експортуємо весь Router
export default studentRouter;
