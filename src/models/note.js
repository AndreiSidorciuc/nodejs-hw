import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';
// Створення схеми для нотатки
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: false,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Створення моделі
export const Note = model('Note', noteSchema);
