import App from './app/App';
import basePath from './app/config';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import buildStore from './app/store/builder';

import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';


const store = buildStore();


hydrate(
  <Provider store = {store}>
    <BrowserRouter basename={basePath} >
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
