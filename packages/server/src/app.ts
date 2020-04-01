import express from 'express';
import bodyParser from 'body-parser';
import { config } from './config';
import { connect } from 'mongoose';
import router from './routes';
import { handleRouteError, handleError } from './middlewares/error.middleware';

const app = express();

// middleware
app.use(bodyParser.json());

//routes
app.use(router);

// Errors
app.use(handleRouteError);
app.use(handleError);

// connect database
connect(config.mongoURL, {
  bufferCommands: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: false,
})
  .then(() => {
    const PORT = config.port || 3001;

    // listen port
    app.listen(PORT, err => {
      if (err) return console.error(err);
      return console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch(err => {
    console.log('Database connection failed:', err);
  });
