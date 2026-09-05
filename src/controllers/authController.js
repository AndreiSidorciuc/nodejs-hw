import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import { createSession, setSessionCookies } from '../services/auth.js';

// Хешування паролю викликаємо бібліотеку обовязково з await тому що це асенхрона операція
// ПЕРЕДАЄМО/пароль і другим аргументом скільки символів буде в хеші паролю тобто складність
// const hashPassword = await bcrypt.hash('12345678', 10);
// console.log(hashPassword);

// для порівнняня паролю необхідно викликати bcrypt.compare та передати два аргументи
// викликаємо функцію передаємо пароль та наш хеш для порівнняня
// const hashCompare = await bcrypt.compare('12345678', hashPassword);
// console.log(hashCompare);

// ---------------------------------------------------------------------------------------------------
export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  //  робимо перевірку емеілу на унікальність
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    //              409 є помилкою унікальності тобто якщо є такий користувач буде ця помилка!
    throw createHttpError(400, 'Email in use');
  }

  // Хешуємо пароль
  //                      передаємо завжди 2 аргументи
  const hashPassword = await bcrypt.hash(password, 10);

  // Створюємо користувача та зберігаємо в базі
  //                              зберігаємо в базі захешований пароль
  const newUser = await User.create({ ...req.body, password: hashPassword });

  // Створюємо нову сесію з КУКІ
  const newSession = await createSession(newUser._id);
  setSessionCookies(res, newSession);

  // повертаємо нового юзера
  res.status(201).json(newUser);
};

// -------------------------------------------------------------------------------------------------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //первіряємо чи є такий користувач
  const user = await User.findOne({ email });
  if (!user) {
    //    401 завжди помилка Неавторизовано тобто користувач відсутній
    throw createHttpError(401, 'Invalid credentials');
  }

  // перевіряємо пароль щоб співпадав з захешованим
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  // Потрібно видаляти старі сесіі
  // Створюємо видалення сессіі
  await Session.deleteMany({ userId: user._id });

  // Створюємо нову сесію
  const newSession = await createSession(user._id);

  // Створюємо кукі за допомогою HttpOnly COOKIE
  // 3. Викликаємо, передаємо об'єкт відповіді та сесію
  setSessionCookies(res, newSession);

  // повертаємо юзера
  res.status(200).json(user);
};

// --------------------------------------------------------------------------------------------------
export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  // перевіряємо чи є сесія в даного користувача
  const session = await Session.findOne({ _id: sessionId, refreshToken });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  //Якщо сесія є Перевіряємо чи токен не прострочений
  if (session.refreshTokenValidUntil < new Date()) {
    // Якщо токен застарів
    // видаляємо стару
    // Створюємо видалення сессіі
    await Session.deleteOne({ _id: sessionId });

    // очищаємо всі три куки у клієнта
    res.clearCookie('sessionId');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    throw createHttpError(401, 'Session token expired');
  }

  // 3. Якщо токен валідний — видаляємо стару успішну сесію
  await Session.deleteOne({ _id: sessionId });

  // 4. Створюємо нову сесію та нові кукі
  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({
    message: 'Session refreshed',
  });
};
// Створюємо кукі за допомогою HttpOnly COOKIE
// 3. Викликаємо, передаємо об'єкт відповіді та сесію
// setSessionCookies(res, newSession);

// повертаємо юзера
//   res.status(200).json({
//     message: 'Session refreshed',
//   });
// };;

// -------------------------------------------------------------------------------------------------
export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;
  const session = await Session.findOne({ _id: sessionId });
  if (session) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
