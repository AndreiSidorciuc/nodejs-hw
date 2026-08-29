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
import {
  getAllNotes, // Змінено з getNote
  getNoteById, //Поайді get запит
  createNote, // Змінено з addPostNotes
  updateNote, // Змінено з updateNoteById
  deleteNote, // Змінено з deleteNoteById
} from '../controllers/notesController.js';

// 1. ВИПРАВЛЕНО: Змінну названо notesRouter замість studentRouter
const notesRouter = Router();

// 2. ВИПРАВЛЕНО: Маршрут GET для всіх нотаток (шлях /notes, функція getAllNotes)
notesRouter.get('/notes', getAllNotes);

// 3. ВИПРАВЛЕНО: Маршрут GET для пошуку за id (шлях /notes/:noteId , функція getNoteById)
notesRouter.get('/notes/:noteId', getNoteById);

// 4. ВИПРАВЛЕНО: Маршрут POST для створення нотатки (шлях /notes, функція createNote)
notesRouter.post('/notes', createNote);

// 5. ВИПРАВЛЕНО: Маршрут PATCH (шлях /notes/:noteId, функція updateNote)
notesRouter.patch('/notes/:noteId', updateNote);

// 6. ВИПРАВЛЕНО: Маршрут DELETE (шлях /notes/:noteId, funkція deleteNote)
notesRouter.delete('/notes/:noteId', deleteNote);

// Експортуємо весь Router як дефолтний експорт
export default notesRouter;
