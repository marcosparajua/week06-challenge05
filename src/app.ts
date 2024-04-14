import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { mothRouter } from './routers/moth.router.js';
export const app = express();

const debug = createDebug('W6E:app');

debug('Starting app');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));

app.use('/moth', mothRouter);
