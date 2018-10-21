import app from './server';
import http from 'http';
import utils from './utils';
const server = http.createServer(app);

let { getEnvironment } = utils;

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
