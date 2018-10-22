import React from 'react';
import './UserProfile.scss';

export default function UserProfile ({className = "", user = {}}) {
    return (
        <div className={`${className} UserProfile`}>
            <img alt={user.username} className="UserProfile__picture" src={user.image}/>
            <br></br>
            <h2 className="UserProfile__title">
                <a className="UserProfile__title__link UserProfile__text UserProfile__text--link" href={user.profile} rel="noopener noreferrer" target="_blank">
                    @{user.username}
                </a>
            </h2>
            <p className="UserProfile__name">
                <span className="UserProfile__text UserProfile__text--bold">
                    {user.name}
                </span>
            </p>
            <p className="UserProfile_email">
                <a href={`mailto:${user.email}`} className="UserProfile__text UserProfile__text--link">{user.email}</a>
            </p>
            <p className="UserProfile__text UserProfile__text--light UserProfile__bio">About: {user.bio}</p>
            <div className="UserProfile__follow__list">
                <div className="UserProfile__follow__list__item UserProfile__followers">
                    {user.followers}
                    <br/>
                    Followers
                </div>
                <div className="UserProfile__follow__list__item UserProfile__following">
                    {user.following}
                    <br/>
                    Following
                </div>
            </div>
        </div>
    );
}