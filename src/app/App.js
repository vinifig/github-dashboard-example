import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Home from './scenes/home/Home';
import User from './scenes/user/User';

import Header from './components';

import './App.css';

const App = () => (
  <div className="App">
    <Header className="App-Header"></Header>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/user/:user" component={User} />
    </Switch>
  </div>
);

export default App;
