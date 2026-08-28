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
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
      default: 'Todo',
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
