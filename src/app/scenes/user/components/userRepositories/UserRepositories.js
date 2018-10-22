import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './UserRepositories.scss';

class UserRepositories extends Component {

  constructor (props) {
    super(props);
    this.state = {
      sortMethods: {
        "stars_up": (repA, repB) => repA.stars - repB.stars,
        "stars_down": (repA, repB) => repB.stars - repA.stars,
        "language_up": (repA, repB) => this.compareStrings(repA.language, repB.language, 1),
        "language_down": (repA, repB) => this.compareStrings(repA.language, repB.language, -1),
        "name_up": (repA, repB) => this.compareStrings(repA.name, repB.name, 1),
        "name_down": (repA, repB) => this.compareStrings(repA.name, repB.name, -1),
      },
      sortMethodName: "stars_down"
    }
  }

  compareStrings (stringA = "", stringB = "", multiplier = 1) {
    stringA = (stringA || "").toLowerCase();
    stringB = (stringB || "").toLowerCase();
    if (stringA < stringB)
      return -1 * multiplier;
    if ( stringA > stringB)
      return 1 * multiplier;
    return 0 * multiplier;
  }

  onChangeOrderMethod (e) {
    e.preventDefault();
    this.setState(Object.assign(
      {}, 
      this.state, 
      {
        sortMethodName: e.target.value
      }
    ));
  }

  getOrderMethodsSelect () {
    let {sortMethods, sortMethodName} = this.state;
    let changeHandler = this.onChangeOrderMethod.bind(this);
    let options = Object.keys(sortMethods)
      .map((value,i) => (
        <option key={i} name={value}>{value}</option>
      ));
    return (
      <select onChange={changeHandler} value={sortMethodName}>
        {options}
      </select>
    )
  }

  renderRepositoryItem (repository, i) {
    let { match } = this.props;
    return (
      <div key={i} className="UserRepositories__list__item">
        <h3 className="UserRepositories__list__item__title">
          {repository.name}
        </h3>
        <h4 className="UserRepositories__list__item__language">({repository.language})</h4>
        <h4 className="UserRepositories__list__item__stars">
          Stars: {repository.stars}
        </h4>
        <Link className="UserRepositories__list__item__link" to={`${match.url}/repository/${repository.name}`} >Details</Link> | <a className="UserRepositories__list__item__link" rel="noopener noreferrer" target="_blank" href={repository.url}>Link</a>
        <p className="UserRepositories__list__item__description">{repository.description || "No description for this repository."}</p>
      </div>   
    )
  };

  getRepositories (repositories = []) {
    let {sortMethods, sortMethodName} = this.state;
    let sortMethod = sortMethods[sortMethodName];
    let repositoryItemBuilder = this.renderRepositoryItem.bind(this);
    return repositories
      .sort(sortMethod)
      .map(repositoryItemBuilder);
  }

  render() {
    let { repositories = []} = this.props;
    
    return (
      <div className='UserRepositories'>
        <div className="UserRepositories__header">
          <h2 className="UserRepositories__header__title">Repositories</h2>
          Order by: {this.getOrderMethodsSelect()}
        </div>
        <div className="UserRepositories__list">
          {this.getRepositories(repositories)}
        </div>
      </div>
    );
  }
}

UserRepositories.propTypes = {
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

export default UserRepositories;
