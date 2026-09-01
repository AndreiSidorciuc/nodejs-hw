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
  getAllNotes, // Змінено з getNote
  getNoteById, //Поайді get запит
  createNote, // Змінено з addPostNotes
  updateNote, // Змінено з updateNoteById
  deleteNote, // Змінено з deleteNoteById
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

// 1. ВИПРАВЛЕНО: Змінну названо notesRouter замість studentRouter
const notesRouter = Router();

// 2. ВИПРАВЛЕНО: Маршрут GET для всіх нотаток (шлях /notes, функція getAllNotes)
notesRouter.get('/notes', celebrate(getAllNotesSchema), getAllNotes); //celebrate(getAllNotesSchema)

// 3. ВИПРАВЛЕНО: Маршрут GET для пошуку за id (шлях /notes/:noteId , функція getNoteById) також
// необхідно додати для виводу всіх помилок які будуть необхідно додати
// ще одне налаштування celebrate/{abortEarly:false} яке за замовчуванням має true тому ми змінили на false
// за замовчуванням обробляється тільки одна помилка яка перша була знайдена далі не шукає тому що
// після знайдення першоі перевірка далі призупиняється та вона виводиться тому ми
// змінюємо на false щоб перевірка продовжувалась та виявлялись усі помилки та виводились
notesRouter.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

// 4. ВИПРАВЛЕНО: Маршрут POST для створення нотатки (шлях /notes, функція createNote) також
// необхідно додати для виводу всіх помилок які будуть необхідно додати
// ще одне налаштування celebrate/{abortEarly:false} яке за замовчуванням має true тому ми змінили на false
// за замовчуванням обробляється тільки одна помилка яка перша була знайдена далі не шукає тому що
// після знайдення першоі перевірка далі призупиняється та вона виводиться тому ми
// змінюємо на false об перевірка продовжувалась та виявлялись усі помилки та виводились
notesRouter.post(
  '/notes',
  celebrate(createNoteSchema, { abortEarly: false }),
  createNote,
);

// 5. ВИПРАВЛЕНО: Маршрут PATCH (шлях /notes/:noteId, функція updateNote) також
// необхідно додати для виводу всіх помилок які будуть необхідно додати
// ще одне налаштування celebrate/{abortEarly:false} яке за замовчуванням має true тому ми змінили на false
// за замовчуванням обробляється тільки одна помилка яка перша була знайдена далі не шукає тому що
// після знайдення першоі перевірка далі призупиняється та вона виводиться тому ми
// змінюємо на false об перевірка продовжувалась та виявлялись усі помилки та виводились
notesRouter.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

// 6. ВИПРАВЛЕНО: Маршрут DELETE (шлях /notes/:noteId, funkція deleteNote) також
// необхідно додати для виводу всіх помилок які будуть необхідно додати
// ще одне налаштування celebrate/{abortEarly:false} за замовчуванням true тому ми змінили на false
// за замовчуванням обробляється тільки одна помилка яка перша була знайдена далі не шукає тому що
// після знайдення першоі перевірка далі призупиняється та вона виводиться тому ми
// змінюємо на false об перевірка продовжувалась та виявлялись усі помилки та виводились
notesRouter.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

// Експортуємо весь Router як дефолтний експорт
export default notesRouter;
