import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errors } from 'celebrate';
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import clientRoutes from './routes/clientRoutes.js';
import appointRouter from './routes/appointmentRoutes.js';
import businessRouter from './routes/businessRoutes.js';

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5174',
      'http://localhost:3000',
      process.env.FRONTEND_DOMEN,
    ].filter(Boolean),
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(logger);

app.use(clientRoutes);
app.use(appointRouter);
app.use(businessRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
