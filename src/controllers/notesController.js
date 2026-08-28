// import createHttpError from 'http-errors';
// import Note from '../models/note.js';

// // Обробляємо запит на головну сторінку
// export const getNote = async (req, res) => {
//   const studentes = await Note.find();
//   res.status(200).json(studentes);
// };

// // Обробляємо запит за параметром ID
// export const getNoteById = async (req, res) => {
//   const { noteId } = req.params; //необхідно обовязково вказувати params для параметрів пошуку
//   const result = await Note.findById(noteId);

//   //робимо обробку помилки
//   if (!result) {
//     // return res.status(404).json({
//     //новий варіант покращений
//     // throw new Error(`Student with id = ${noteId} not fouden`);

//     // ще один найкращий варіант задопомогою бібліотеки http-error
//     throw createHttpError(404, `Student with id = ${noteId} not fouden`);

//     // message: `Student with id = ${noteId} not fouden`,
//     // });
//   }
//   res.status(200).json(result); //потрібно завжди вказувати  вкінці щоб відправити повторно відповідь
// };

// // Обробляємо запит на додавання нових даних в базі даних
// export const addPostNotes = async (req, res) => {
//   const newStudent = await Note.create(req.body);
//   if (!newStudent) {
//     throw createHttpError(404, `Student not create`);
//   }
//   res.status(201).json(newStudent);
// };

// // Обробка запиту на перезапис студента
// export const updateNoteById = async (req, res) => {
//   // Беремо обєкт
//   const { id } = req.params;
//   // Пробуємо оновити /передаємо id яке треба оновити/дані які треба оновити/обєкт налаштувань для повернення
//   // топто після оновлення повернути це потрібно обовязково додати якщо не додати не буде приходити оновлений документ
//   const updateStudent = await Note.findByIdAndUpdate(id, req.body, {
//     returnDocument: 'after',
//   });
//   // Якщо не має то даємо повідомлення про помилку
//   if (!updateStudent) {
//     throw createHttpError(404, `Student with id ${id} not found`);
//   }
//   // Якщо все ок повертаємо результат оновлення Student
//   res.status(200).json(updateStudent);
// };

// export const deleteNoteById = async (req, res) => {
//   const { id } = req.params;
//   const deleteStudent = await Note.findByIdAndDelete(id);
//   if (!deleteStudent) {
//     throw createHttpError(404, `Student with ${id} not found`);
//   }

//   res.status(200).json(deleteStudent);
//   // іноді потрібно відправляти 204 статус ta send()
//   // res.status(204).send();
// };

import createHttpError from 'http-errors';
import Note from '../models/note.js';

// 1. ВИПРАВЛЕНО: Функція перейменована на getAllNotes, змінні змінено на notes
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error); // Передаємо помилку далі в errorHandler middleware
  }
};

// 2. ВИПРАВЛЕНО: Повідомлення про помилку змінено зі Student на Note
export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const result = await Note.findById(noteId);

    if (!result) {
      // Використовуємо правильний об'єкт у повідомленні
      return next(createHttpError(404, `Note with id = ${noteId} not found`));
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// 3. ВИПРАВЛЕНО: Функція перейменована на createNote, змінні змінено на newNote та об'єкт на Note
export const createNote = async (req, res, next) => {
  try {
    const newNote = await Note.create(req.body);
    if (!newNote) {
      return next(createHttpError(404, `Note not created`));
    }
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// 4. ВИПРАВЛЕНО: Функція перейменована на updateNote, параметр змінено на noteId, повідомлення на Note
export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params; // Змінено з id на noteId

    const updateNoteData = await Note.findByIdAndUpdate(noteId, req.body, {
      returnDocument: 'after',
    });

    if (!updateNoteData) {
      return next(createHttpError(404, `Note with id ${noteId} not found`));
    }

    res.status(200).json(updateNoteData);
  } catch (error) {
    next(error);
  }
};

// 5. ВИПРАВЛЕНО: Функція перейменована на deleteNote, параметр змінено на noteId, повідомлення на Note
export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params; // Змінено з id на noteId
    const deleteNoteData = await Note.findByIdAndDelete(noteId);

    if (!deleteNoteData) {
      return next(createHttpError(404, `Note with id ${noteId} not found`));
    }

    res.status(200).json(deleteNoteData);
  } catch (error) {
    next(error);
  }
};
