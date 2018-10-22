import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import Repository from './scenes/repository/Repository';
import './User.scss';
import UserProfile from './components/UserProfile/UserProfile';

class User extends Component {

  //#region Logic
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
  
  componentDidUpdate () {
    if (this.fetched !== this.username) {
      this.updateUserIfNeeded();
    }
  }
  //#endregion constructor
  
  //#region UI
  
  getUserProfile ({user = null, isFetching = false, hasFailed = false}) {
    if (user == null || isFetching || hasFailed) {
      let message = hasFailed ? `We can't retrieve data for ${this.username}` : "Loading...";
      return (
        <p className="User__message">{message}</p>
      )
    }
    return (
      <UserProfile className="User__profile" user={user}></UserProfile>
    );
  }

  render() {
    let { className = "", match, gitHubUser = {} } = this.props;
    let { updateUser } = this; 
    let updateUserParam = updateUser.bind(this);

    // i don't know what's happening:/
    let parentClass = className === undefined || className === 'undefined' ? "" : className; 

    return (
      <div className={`${parentClass} User`} >
        {this.getUserProfile(gitHubUser)}
        <button onClick={updateUserParam}>atualizar</button>
        <Switch>
          <Route path={`${match.path}/repository/:repository`} component={Repository} />
        </Switch>
      </div>
    );
  }
  //#endregion

}

User.propTypes = {
  gitHubUser: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      profile: PropTypes.string,
      image: PropTypes.string,
      email: PropTypes.string,
      bio: PropTypes.string,
      followers: PropTypes.number,
      following: PropTypes.number,
    }),
    isFetching: PropTypes.bool,
    hasFailed: PropTypes.bool
  }),
  fetchUser: PropTypes.func.isRequired
}

export default User;
