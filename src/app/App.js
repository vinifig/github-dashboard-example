import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './scenes/home/Home';
import User from './scenes/user/User';
import logo from './assets/react.svg';
import './App.css';

const App = () => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to Razzle</h2>
    </div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/user/:user" component={User} />
    </Switch>
  </div>
);

export default App;
