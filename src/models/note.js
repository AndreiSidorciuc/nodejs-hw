// src/models/student.js

// import { Schema, model } from 'mongoose';

// const studentSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true, // обовязкове поле записувати коли воно є обовязкове!
//       trim: true, // прибирає пробіли на початку та в кінці
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//     gender: {
//       type: String,
//       required: true,
//       enum: ['male', 'female', 'other'], //Вказується масив можливих значень
//     },
//     avgMark: {
//       type: Number,
//       required: true,
//     },
//     onDuty: {
//       type: Boolean,
//       default: false,
//     },
//   },

//   {
//     // Додаємо час створення постів та оновлення в базі даних
//     timestamps: true,

//     // Додаємо заборону на додаванні в пості версіі
//     versionKey: false,
//   },
// );

// // назва модель має конкретно співпадати з базою даних на MongoBD
// // тобто Student також моє писатися з великоі літери
// const Student = model('Student', studentSchema);
// export default Student;

import { Schema, model } from 'mongoose';
import { notesTypList } from '../constants/tags.js';
// Створення схеми для нотатки
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: notesTypList,
      default: notesTypList[0],
    },
  },
  {
    // Автоматичне додавання полів createdAt та updatedAt
    timestamps: true,
    versionKey: false,
  },
);

// Створення та експорт моделі
// Mongoose автоматично створить колекцію з назвою "notes" (у множині)
const Note = model('Note', noteSchema);

export default Note;

// import { Schema, model } from 'mongoose';

// // Создание схемы для Пользователя
// const userSchema = new Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true, // КРИТИЧЕСКИ ВАЖНО: гарантирует, что один email нельзя зарегистрировать дважды
//       trim: true,
//       lowercase: true, // Автоматически переводит email в нижний регистр перед сохранением
//     },
//     password: {
//       type: String,
//       required: true,
//       // select: false // (Опционально) скрывает пароль из результатов запросов к БД для безопасности
//     },
//   },
//   {
//     // Автоматическое добавление полей createdAt и updatedAt
//     timestamps: true,
//     versionKey: false,
//   },
// );

// // Создание и экспорт модели
// // Mongoose автоматически создаст коллекцию "users"
// const User = model('User', userSchema);

// export default User;
