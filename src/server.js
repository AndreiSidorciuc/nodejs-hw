import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import logger from './middleware/logger.js';
import connectDatabase from './db/connectMongoDB.js';
import notesRouter from './routes/notesRouter.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import errorHandler from './middleware/errorHandler.js';
// import { readFile } from 'node:fs/promises';
// import { resolve } from 'node:path';

// створюємо Сервер
const app = express();

//працюємо коли читаємо з фаела!
// const postPath = resolve('src', 'db', 'students.json');
// const getStudent = async () => {
//   const data = await readFile(postPath, 'utf-8');
//   if (!data.trim()) return [];

//   return JSON.parse(data);
// };

// Запускаємо сервер та читаємо тіло цього запиту
app.use(express.json());

// Показуємо логі в терміналі через функцію PinoHttp бібліотеку pino-http
app.use(logger);

// Дозволяє робити запити до сервера з інших айпі адрес
app.use(cors());

//викликаємо запити які ми винесли в окремий фаел studentRouter
// при створенні інших посилань на сервер не виносяться та створюються тільки в роутері!
// Запит на основну сторінку на сервер більше не пишуться!
app.use('/notes', notesRouter);

// Запит через параметри по id
app.use('/notes/:noteId', notesRouter);

//тут винесли обробник помилки по ід
app.use(notFoundHandler);

//тут був обробник помилок який ми винесли загальний
app.use(errorHandler);

// Підключення до баси
await connectDatabase();

// Запуск сервера
const PORT = Number(process.env.PORT) || 3030;

// Логінимо запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
