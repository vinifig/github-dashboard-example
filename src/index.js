import app from './server';
import http from 'http';

const server = http.createServer(app);

let currentApp = app;
let port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  port = 443;
}

server.listen(port, error => {
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
