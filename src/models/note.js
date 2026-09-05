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
    },
    // Нова властивість
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

noteSchema.index({ userId: 1, tag: 1 });

// Створення моделі
const Note = model('Note', noteSchema);

export default Note;
