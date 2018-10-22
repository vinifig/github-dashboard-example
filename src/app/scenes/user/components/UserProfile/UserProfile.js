import React from 'react';
import './UserProfile.scss';

export default function UserProfile ({className = "", user = {}}) {
    return (
        <div className={`${className} UserProfile`}>
            <img alt={user.username} className="UserProfile__picture" src={user.image}/>
            <h2 className="UserProfile__title">
            <a className="UserProfile__title__link" href={user.profile} rel="noopener noreferrer" target="_blank">
                @{user.username}
            </a>
            </h2>
            <p className="UserProfile__text UserProfile__text--bold UserProfile__name">({user.name})</p>
            <a href={`mailto:${user.email}`} className="UserProfile__text UserProfile__email">{user.email}</a>
            <p className="UserProfile__text UserProfile__text--light UserProfile__bio">{user.bio}</p>
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