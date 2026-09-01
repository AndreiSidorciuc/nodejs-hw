import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

//основна сторінка
export const getAllNotes = async (req, res) => {
  // Отримуємо параметри пагінації та фільтрації з req.query
  const { page = 1, perPage = 10, tag, search } = req.query;

  // Перетворюємо рядки на числа для математичних розрахунків
  const pageNumber = parseInt(page, 10);
  const perPageNumber = parseInt(perPage, 10);
  const skip = (pageNumber - 1) * perPageNumber;

  //Ініціалізуємо базовий запит Mongoose для нотаток
  const notesQuery = Note.find();

  // ФІЛЬТРАЦІЯ: Якщо передано тег — додаємо його у фільтр
  if (tag) {
    notesQuery.where({ tag });
  }

  // ФІЛЬТРАЦІЯ: Якщо передано текст для пошуку — використовуємо $regex та $or
  if (search) {
    notesQuery.where({
      $or: [
        { title: { $regex: search, $options: 'i' } }, // 'i' — регістронезалежно
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  // ПАГІНАЦІЯ ТА ПІДРАХУНОК: Виконуємо запити паралельно
  // clone() потрібен, щоб виконати підрахунок кількості без урахування skip та limit
  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPageNumber),
  ]);

  // Розраховуємо загальну кількість сторінок
  const totalPages = Math.ceil(totalNotes / perPageNumber);

  //  ВІДПОВІДЬ СЕРВЕРА: Повертаємо об'єкт із пагінацією та масивом нотаток
  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalNotes,
    totalPages,
    notes,
  });
};

// пошук за ID
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const result = await Note.findById(noteId); // якщо
  if (!result) {
    // Використовуємо правильний об'єкт у повідомленні
    throw createHttpError(404, `Note with id = ${noteId} not found`);
  }
  res.status(200).json(result);
};

// Post обробка створення новоі нотатки
export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);
  if (!newNote) {
    throw createHttpError(404, `Note not created`);
  }
  res.status(201).json(newNote);
};

// Оновлення нотатки за допомогою PATCH
export const updateNote = async (req, res) => {
  const { noteId } = req.params; // Змінено з id на noteId
  const updateNoteData = await Note.findByIdAndUpdate(noteId, req.body, {
    returnDocument: 'after',
    // Необхідно додавати обовязково для перевірки якщо буде відсутня celebrate(updateNoteSchema)
    // якщо не додати цю перевірку та відсутності celebrate(updateNoteSchema)
    // можна вносити зміни з неправильними даними це дуже погано дя безпеки серверу!!!!
    runValidators: true,
  });
  if (!updateNoteData) {
    throw createHttpError(404, `Note with id ${noteId} not found`);
  }
  res.status(200).json(updateNoteData);
};

// Видалення нотатки DELETE
export const deleteNote = async (req, res) => {
  const { noteId } = req.params; // Змінено з id на noteId
  const deleteNoteData = await Note.findByIdAndDelete(noteId);
  if (!deleteNoteData) {
    throw createHttpError(404, `Note with id ${noteId} not found`);
  }
  res.status(200).json(deleteNoteData);
};
