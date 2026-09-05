import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

// 1. ОТРИМАННЯ ВСІХ НОТАТОК (ТІЛЬКИ ПОТОЧНОГО КОРИСТУВАЧА)
export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search } = req.query;

    const pageNumber = parseInt(page, 10);
    const perPageNumber = parseInt(perPage, 10);
    const skip = (pageNumber - 1) * perPageNumber;

    // ВИПРАВЛЕНО: Базовий фільтр шукає тільки нотатки поточного користувача
    const filter = { userId: req.user._id };

    if (tag) {
      filter.tag = tag;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const notesQuery = Note.find(filter);

    const [totalNotes, notes] = await Promise.all([
      Note.countDocuments(filter), // Рахуємо тільки нотатки цього юзера
      notesQuery.skip(skip).limit(perPageNumber),
    ]);

    const totalPages = Math.ceil(totalNotes / perPageNumber);

    return res.status(200).json({
      page: pageNumber,
      perPage: perPageNumber,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

// 2. ПОШУК ЗА ID (ТІЛЬКИ СВОЄЇ НОТАТКИ)
export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    // ВИПРАВЛЕНО: Шукаємо за ID нотатки ТА ID користувача через findOne
    const result = await Note.findOne({ _id: noteId, userId: req.user._id });

    if (!result) {
      // ВИПРАВЛЕНО: Повідомлення суворо 'Note not found' за ТЗ
      return next(createHttpError(404, 'Note not found'));
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// 3. СТВОРЕННЯ НОТАТКИ
export const createNote = async (req, res, next) => {
  try {
    // Тут у тебе все було чудово прив'язано до userId з req.user._id
    const newNote = await Note.create({ ...req.body, userId: req.user._id });

    return res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// 4. ОНОВЛЕННЯ НОТАТКИ (ТІЛЬКИ СВОЄЇ)
export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    // ВИПРАВЛЕНО: Використовуємо findOneAndUpdate для ізоляції користувачів
    const updateNoteData = await Note.findOneAndUpdate(
      { _id: noteId, userId: req.user._id },
      req.body,
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );

    if (!updateNoteData) {
      return next(createHttpError(404, 'Note not found'));
    }

    return res.status(200).json(updateNoteData);
  } catch (error) {
    next(error);
  }
};

// 5. ВИДАЛЕННЯ НОТАТКИ (ТІЛЬКИ СВОЄЇ)
export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    // ВИПРАВЛЕНО: Використовуємо findOneAndDelete для безпеки даних
    const deleteNoteData = await Note.findOneAndDelete({
      _id: noteId,
      userId: req.user._id,
    });

    if (!deleteNoteData) {
      return next(createHttpError(404, 'Note not found'));
    }

    return res.status(200).json(deleteNoteData);
  } catch (error) {
    next(error);
  }
};
