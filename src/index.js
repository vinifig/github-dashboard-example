import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';
import app from './server';
import utils from './utils';

let { getEnvironment, isDev } = utils;

if (isDev()) {
  try {
    let envList = dotenv.parse(fs.readFileSync('./.env'));
    for (let key in envList) {
      process.env[key] = envList[key];
    }
  } catch (e) {
  }
}

const server = http.createServer(app);


let currentApp = app;

server.listen(getEnvironment("PORT", 3000), error => {
  if (error) {
    console.log(error);
  }

  console.log('🚀 started');
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
