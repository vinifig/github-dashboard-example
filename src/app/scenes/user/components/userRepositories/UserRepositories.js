import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from "react-router-dom";
import './UserRepositories.scss';

class UserRepositories extends Component {

  constructor (props) {
    super(props);
    this.state = {
      sortMethods: {
        "stars_asc": (repA, repB) => repA.stars - repB.stars,
        "stars_desc": (repA, repB) => repB.stars - repA.stars,
        "language_asc": (repA, repB) => this.compareStrings(repA.language, repB.language, 1),
        "language_desc": (repA, repB) => this.compareStrings(repA.language, repB.language, -1),
        "name_asc": (repA, repB) => this.compareStrings(repA.name, repB.name, 1),
        "name_desc": (repA, repB) => this.compareStrings(repA.name, repB.name, -1),
      },
      sortMethodName: "stars_desc"
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

  getRepositories (repositories = []) {
    let {sortMethods, sortMethodName} = this.state;
    let sortMethod = sortMethods[sortMethodName];
    return repositories
      .sort(sortMethod)
      .map((repository, i) => (
        <div key={i} className="UserRepositories__list__item">
          <h3 className="UserRepositories__list__item__title">
            {repository.name}
            <span>({repository.language})</span>
          </h3>
          <h4 className="UserRepositories__list__item__stars">
            Stars: {repository.stars}
          </h4>
          <a className="UserRepositories__list__item__link" rel="noopener noreferrer" target="_blank" href={repository.url}>Link</a>
          <p className="UserRepositories__list__item__description">{repository.description || "No description for this repository."}</p>
        </div>   
      ));
  }

  render() {
    let { repositories = []} = this.props;
    let {sortMethods, sortMethodName} = this.state;
    return (
      <div className='UserRepositories'>
        <div className="UserRepositories__header">
          <h2 className="UserRepositories__header__title">Repositories</h2>
          {this.getOrderMethodsSelect()}
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
