import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import './User.scss';
import UserProfile from './components/userProfile/UserProfile';
import UserRepositories from './components/userRepositories/UserRepositoriesContainer';
import Repository from './scenes/repository/RepositoryContainer';

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
      <div>
        <div className="User__row">
          <div className="User__column User__row--divider">
            <UserProfile className="User__column User__profile" user={user}></UserProfile>
          </div>
        </div>
        <div className="User__row">
          <div className="User__repositories_container User__column">
            <Switch>
              <Route exact path={`${match.path}/`} repositories={user.repositories} component={UserRepositories} />
              <Route path={`${match.path}/repository/:repository`} component={Repository} />
            </Switch>
          </div>
        </div>

      </div>
    );
  }

  render() {
    let { gitHubUser = {} } = this.props;

    return (
      <div className="User">
        {this.getUserProfile(gitHubUser)}
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
  fetchUserIfNeeded: PropTypes.func.isRequired
}

export default User;
