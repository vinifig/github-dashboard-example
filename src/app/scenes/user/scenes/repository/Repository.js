import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './Repository.scss';

class Repository extends Component {

  getStarsCount (repository = null) {
    if (repository === null) {
      return "";
    }
    return ` - ${repository.stars} stars`;
  }

  renderRepository (repository = null) {
    if(repository === null) {
      return (
        <div className="Repository__data__message">Repository not found</div>
      )
    }
    return (
      <div>
        <p className="Repository__data__description">{repository.description}</p>
        <p className="Repository__data__language">Built in {repository.language}</p>
        <p className="Repository__data__reference">
          Available in:  
          <a rel="noopener noreferrer" target="_blank" href={repository.url} className="Repository__data__reference__link">
            GitHub
          </a>
        </p>
      </div>
    );
  }

  render() {
    let {match, repository} = this.props;
    return (
      <div className='Repository'>
        <div className="Repository__header">
          <Link to={`/user/${match.params.user}`}>Voltar</Link>
          <h2 className="Repository__header__title">{match.params.repository}{this.getStarsCount(repository)}</h2>
        </div>
        <div className="Repository__data">
          {this.renderRepository(repository)}
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
