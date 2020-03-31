import express from 'express';
import bodyParser from 'body-parser';
import { config } from './config';
import router from './routes';

const app = express();

const PORT = config.port || 8000;

// middleware
app.use(bodyParser.json());

//routes
app.use(router);

// listen port
app.listen(PORT, err => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${PORT}`);
});
