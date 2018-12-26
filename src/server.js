import express from 'express';
import timeout from 'connect-timeout';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from './routes';

const app = express();

app.use(
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  helmet(),
  timeout('30s'),
);

app.use('/api/v1', routes);

export default app;
