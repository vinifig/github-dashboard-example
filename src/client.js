import App from './app/App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';

import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import users from './app/services/reducers/users';


const store = createStore(
  combineReducers({
    users
  }),
  applyMiddleware (
    thunkMiddleware,
    loggerMiddleware
  )
);


hydrate(
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
