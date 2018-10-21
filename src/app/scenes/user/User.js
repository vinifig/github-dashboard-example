import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import Repository from './scenes/repository/Repository';
import './User.scss';

class User extends Component {
  
  constructor (props) {
    super(Object.freeze(props));
    this.fetched = null;
  }

  parseValue (value) {
    return String.valueOf()(value)
  }

  get username () {
    return this.props.match.params.user;
  }

  updateUser () {
    this.props.fetchUser(this.username);
    this.fetched = this.username;
  }

  updateUserIfNeeded () {
    this.props.fetchUserIfNeeded(this.username);
    this.fetched = this.username;
  }

  componentDidMount () {
    if (this.fetched !== this.username) {
      this.updateUserIfNeeded();
    }
  }

  render() {
    let { match, gitHubUser } = this.props;
    let { parseValue, updateUser } = this;
    let { isFetching, hasFailed } = gitHubUser || {}; 

    let updateUserParam = updateUser.bind(this);

    return (
      <div>
        <h2>user</h2>
        <p>{match.url}</p>
        <p>Está baixando: {parseValue(isFetching)}</p>
        <p>deu erro: {parseValue(hasFailed)}</p>
        <button onClick={updateUserParam}>atualizar</button>
        <Switch>
          <Route path={`${match.path}/repository/:repository`} component={Repository} />
        </Switch>
      </div>
    );
  }
}

User.propTypes = {
  gitHubUser: PropTypes.shape({
    user: PropTypes.shape({

    }),
    isFetching: PropTypes.bool,
    hasFailed: PropTypes.bool
  }),
  fetchUser: PropTypes.func.isRequired
}

export default User;
