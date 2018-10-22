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

  getUserProfile (user = null) {
    if (user == null || user.username == null) {
      return (
        <h2 className="User__title">Loading...</h2>
      )
    }
    return (
      <div class="User__profile Profile">
        <h2 className="Profile__title">
          <a className="Profile__link" href={user.profile} rel="noopener noreferrer" target="_blank">@{user.username}</a>
        </h2>

      </div>
    );
  }

  render() {
    let { className, match, gitHubUser } = this.props;
    let { parseValue, updateUser } = this; 
    let { isFetching, hasFailed, user = null } = gitHubUser || {}; 

    let updateUserParam = updateUser.bind(this);

    return (
      <div className={`${className} User`} >
        {this.getUserProfile(user)}
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
      username: PropTypes.string,
      profile: PropTypes.string,
    }),
    isFetching: PropTypes.bool,
    hasFailed: PropTypes.bool
  }),
  fetchUser: PropTypes.func.isRequired
}

export default User;
