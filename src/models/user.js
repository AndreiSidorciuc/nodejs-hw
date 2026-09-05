import { model, Schema } from 'mongoose';
import { emailRegex } from '../constants/authConstsants.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      minLength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      // Унікальний
      unique: true,
      trim: true,
      // передаємо Список перевірки на відповідність емеілу
      match: emailRegex,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// Підставляємо значення Імені на email якщо користувач не вів
userSchema.pre('save', function (next) {
  if (!this.username) {
    this.username = this.email;
  }
  next();
});

// Обовязково видаляємо повернення паролю на фронтенд
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = model('User', userSchema);

export default User;
