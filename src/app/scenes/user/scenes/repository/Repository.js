import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './Repository.scss';

class Repository extends Component {

  getRepositories (repository = null) {
    if(repository === null) {
      return (
        <div>Repository not found</div>
      )
    }
    return (
      <div>oi</div>   
    );
  }

  render() {
    let {match, repository} = this.props;
    return (
      <div className='Repository'>
        <div className="Repository__header">
          <h2 className="Repository__header__title">Repository Name</h2>
          <Link to={`/user/${match.params.user}`}>Voltar</Link>
        </div>
        <div className="UserRepositores__list">
          {this.getRepositories(repository)}
        </div>
      </div>
    );
  }
}

Repository.propTypes = {
  repository: PropTypes.shape({
    name: PropTypes.string,
    stars: PropTypes.number,
    language: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
  }),
}

export default Repository;
