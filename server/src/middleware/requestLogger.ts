import morgan from 'morgan';
import { config } from '../config/index';

export const requestLogger = morgan('dev', {
  skip: () => config.isTest,
});
