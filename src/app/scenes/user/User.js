import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Repository from './scenes/repository/Repository';
import './User.css';

class User extends Component {
  render() {
    let { match } = this.props;
    return (
      <div>
        <h2>user</h2>
        {match.url}
        <Switch>
          <Route path={`${match.path}/repository/:repository`} component={Repository} />
        </Switch>
      </div>
    );
  }
}

export default User;
