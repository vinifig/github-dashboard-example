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
            <p className="UserProfile__name">({user.name})</p>
        </div>
    );
}