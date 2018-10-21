import express from 'express';

import basePath from './app/config';

import userController from './api/controllers/userController';
import appController from './api/controllers/appController';

const server = express();

const appRoute = basePath;
const apiRoute = '/api';

server.disable('x-powered-by');
server.use('/static', express.static(`${process.env.RAZZLE_PUBLIC_DIR}\\static`))
server.use(`${apiRoute}/user`, userController);
server.use(`${appRoute}`, appController);

server.get('/', (req, res) => {
  res.redirect(`${appRoute}`);
})

export default server;
