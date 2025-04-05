require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const coreBase = require('../base/functions/coreBase');
const promiseRetry = require('promise-retry');

const app = express();
const port = process.env.PORT_EXPRESS || 3032;
const portSocket = process.env.PORT_SOCKET || 3033;

const server = require('http').createServer(app);

app.use(morgan('[:date[web]] [:response-time ms] [:status] :method :url'));
app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(
  cors({
    origin: '*',
  }),
);

app.use(function (_, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});


app.use(async (req, res, next) => {
  req.locals = {
    ...req.locals,
    api: 'delivery_api',
  };
  next();
});

// Recupera todas as rotas
app.use(require('./routes'));

// Start do Servidor
app.listen(port, async (err) => {
  promiseRetry(
    {
      retries: 1000,
    },
    async (retry, number) => {
      console.log(`Trying to connect to database (attempt ${number})...`);
      return await coreBase.connectionBase().catch((err) => {
        console.log(`Error: ${err}`);
        retry(err);
      });
    },
  ).then(
    () => {
      console.log('Connected to database. ' + process.env.NODE_ENV);
    },
    (err) => {
      console.log(`Error: ${err}`);
    },
  );
  console.log('Server is up on port ' + port);
});

global.$logger = console;

server.listen(portSocket, (err) => {
  console.log('Server Socket is up on port ' + portSocket);
});