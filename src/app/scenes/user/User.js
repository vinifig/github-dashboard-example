import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import Repository from './scenes/repository/Repository';
import './User.scss';
import UserProfile from './components/userProfile/UserProfile';
import UserRepositories from './components/userRepositories/UserRepositories';

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

    let { match } = this.props;

    return (
      <div className="User__row">
        <UserProfile className="User__column User__profile" user={user}></UserProfile>
        <div className="User__repositories_container User__column">
          <Switch>
            <Route exact path={`${match.path}/`} repositories={user.repositories} component={UserRepositories} />
            <Route path={`${match.path}/repository/:repository`} component={Repository} />
          </Switch>

        </div>
      </div>
    );
  }

  render() {
    let { className = "", gitHubUser = {} } = this.props;
    let { updateUser } = this; 
    let updateUserParam = updateUser.bind(this);

    // i don't know what's happening:/
    let parentClass = className === undefined || className === 'undefined' ? "" : className; 

    return (
      <div className={`${parentClass} User`} >
        {this.getUserProfile(gitHubUser)}
        <button onClick={updateUserParam}>atualizar</button>
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
      repositories: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          stars: PropTypes.number,
          language: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string,
        })
      )
    }),
    isFetching: PropTypes.bool,
    hasFailed: PropTypes.bool
  }),
  fetchUser: PropTypes.func.isRequired
}

export default User;
