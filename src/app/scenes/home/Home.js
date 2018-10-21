import React, { Component } from 'react';

import './Home.scss';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <p className="Home__message">Type a user to start...</p>
      </div>
    );
  }
}

export default Home;
