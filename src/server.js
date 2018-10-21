import express from 'express';
import morgan from 'morgan';

import basePath from './app/config';
import utils from './utils';

import userController from './api/controllers/userController';
import appController from './api/controllers/appController';

const server = express();

const { getEnvironment, isDev } = utils;

const appRoute = basePath;
const apiRoute = '/api';

const publicPath = getEnvironment("RAZZLE_PUBLIC_DIR", "build/public");

if (isDev()) {
  server.use(morgan('tiny'));
}

server.disable('x-powered-by');
server.use('/static', express.static(`${publicPath}/static`))
server.use(`${apiRoute}/user`, userController);
server.use(`${appRoute}`, appController);

server.get('/', (req, res) => {
  console.log('redirecting');
  res.redirect(`${appRoute}`);
})

server.get('/favicon.ico', (req,res) => {
  try {
    res.sendFile(`${publicPath}/favicon.ico`);
  } catch (e) {
    res.sendFile(`${__dirname}/public/favicon.ico`);
    
  }
})

export default server;
