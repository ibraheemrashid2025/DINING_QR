import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { corsOptions } from './config/cors';
import { env } from './config/env';
import { apiRateLimiter } from './middleware/rate-limiter';
import { errorHandler } from './middleware/error-handler';
import { notFoundHandler } from './middleware/not-found';
import { apiRouter } from './routes';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(apiRateLimiter);

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

