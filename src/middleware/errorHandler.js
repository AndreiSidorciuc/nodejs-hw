import { HttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

// Спеціальний коментарь щоб не підкреслювало помилку next
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    const { status = 500 } = error;
    return res.status(status).json({
      message: error.message || error.name,
    });
  }

  // Кородший варіант обробки 2 помилок одночасно
  const isMongooseError =
    error instanceof MongooseError.ValidationError ||
    error instanceof MongooseError.CastError;

  if (isMongooseError) {
    return res.status(400).json({
      message: error.message,
    });
  }

  // Додаємо ще один вівід помилки від MongooseError з правельним статусом якщо було
  // видалено чи закоментовано celebrate(createNoteSchema, { abortEarly: false })
  // if (error instanceof MongooseError.ValidationError) {
  //   return res.status(400).json({
  //     message: error.message,
  //   });
  // }

  // Помилка яка показує що це не є айді CastError Вказує на те що
  // при веденні незрозумілого ID буде помилка із текстом що це неможе бути ID тобто ПЕРЕВІРКА
  // if (error instanceof MongooseError.CastError) {
  //   return res.status(400).json({
  //     message: error.message,
  //   });
  // }

  const isProd = process.env.NODE_ENV === 'production';
  const message = isProd ? 'Some error' : error.message;
  res.status(500).json({
    message,
  });
};

export { errorHandler };
