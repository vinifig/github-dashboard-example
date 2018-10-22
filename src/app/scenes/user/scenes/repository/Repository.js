import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './Repository.scss';

class Repository extends Component {

  getRepositories (repositories = []) {
    return repositories.map((repository) => (
      <div>oi</div>   
    ));
  }

  render() {
    let {match, repositories = []} = this.props;
    return (
      <div className='Repository'>
        <div className="Repository__header">
          <h2 className="Repository__header__title">Repository Name</h2>
          <Link to={`/user/${match.params.user}`}>Voltar</Link>
        </div>
        <div className="UserRepositores__list">
          {this.getRepositories(repositories)}
        </div>
      </div>
    );
  }
}

Repository.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      stars: PropTypes.number,
      language: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
    })
  )
}

export default Repository;
