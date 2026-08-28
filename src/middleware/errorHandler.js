import { HttpError } from 'http-errors';

// Спеціальний коментарь щоб не підкреслювало помилку next
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    const { status = 500 } = error;
    return res.status(status).json({
      message: error.message || error.name,
    });
  }
  const isProd = process.env.NODE_ENV === 'production';
  const message = isProd ? 'Some error' : error.message;
  res.status(500).json({
    message,
  });
};

export { errorHandler };
