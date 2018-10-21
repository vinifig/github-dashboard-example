import express from 'express';
import morgan from 'morgan';

import basePath from './app/config';
import getEnvironment from './utils';

import userController from './api/controllers/userController';
import appController from './api/controllers/appController';

const server = express();

const appRoute = basePath;
const apiRoute = '/api';

server.use(morgan('tiny'));
server.disable('x-powered-by');
server.use('/static', express.static(`${getEnvironment("RAZZLE_PUBLIC_DIR", "build/public")}/static`))
server.use(`${apiRoute}/user`, userController);
server.use(`${appRoute}`, appController);

server.get('/', (req, res) => {
  console.log('redirecting');
  res.redirect(`${appRoute}`);
})

export default server;
