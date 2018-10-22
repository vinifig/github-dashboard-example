import React, {Component} from 'react';
import withRouter from 'react-router-dom/withRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Home from './scenes/home/Home';
import UserContainer from './scenes/user/UserContainer';

import Header from './components/header/Header';
import GitHubForm from './components/githubForm/GitHubForm';

import './App.scss';



class App extends Component {

  constructor (props) {
    super(props);
    let hasUserName = /\/user\/([a-zA-Z])*\w+/.test(props.location.pathname);
    let baseUsername = "";
    if (hasUserName) {
      baseUsername = props.location.pathname.split('/')[2];
    }
    this.state = {
      username: baseUsername
    }
  }

  onUserChange (username = "") {
    this.setState(Object.assign(
      {},
      this.state,
      {username}
    ))
    if (!!username) {
      this.props.history.push(`/user/${username}`);
    } else {
      this.props.history.push(`/`);
    }
  }

  render () {
    let wrappedUserChanged = this.onUserChange.bind(this);
    return (
      <div className="App">
        <Header className="App__Header"></Header>
        <GitHubForm onUserChange={wrappedUserChanged} baseValue={this.state.username} className="App__GitHubForm"></GitHubForm>
        <Switch>
          <Route className="App__Home" exact path="/" component={Home} />
          <Route className="App__User" path="/user/:user" component={UserContainer} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
