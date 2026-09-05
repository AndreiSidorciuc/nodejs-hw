// src/middleware/authenticate.js

import createHttpError from 'http-errors';
import Session from '../models/session.js';
import User from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;

  // 1. ВИПРАВЛЕНО: Перевіряємо суворо наявність accessToken та повертаємо правильний текст за ТЗ
  if (!accessToken) {
    return next(createHttpError(401, 'Missing access token'));
  }

  // 2. ВИПРАВЛЕНО: Шукаємо сесію виключно за токеном, як вимагає ТЗ
  const session = await Session.findOne({ accessToken });

  // 3. Якщо сесію не знайдено — текст 'Session not found' (тут усе збіглося)
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  // 4. Перевіряємо термін дії access токена — текст 'Access token expired' (теж збіглося)
  if (session.accessTokenValidUntil < new Date()) {
    return next(createHttpError(401, 'Access token expired'));
  }

  // 5. Шукаємо користувача, пов’язаного з цією сесією
  const user = await User.findById(session.userId);

  // 6. ВИПРАВЛЕНО: Якщо користувача не знайдено — повертаємо 401 БЕЗ повідомлення за ТЗ
  if (!user) {
    return next(createHttpError(401));
  }

  // 7. Додаємо об’єкт знайденого користувача в req.user
  req.user = user;

  // 8. Передаємо управління далі
  next();
};
