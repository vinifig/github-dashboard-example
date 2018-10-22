import React from 'react';
import { Link } from "react-router-dom";
import './UserRepositories.scss';

export default function UserRepositories ({match}) {
    return (
        
        <div className='UserRepositories'>
            <div className="UserRepositories__header">
                <h2 className="UserRepositories__header__title">Repositories</h2>
            </div>
            <div className="UserRepositores__list">
                <Link to={`${match.url}/repository/oi`}>goto oi</Link>
            </div>
        </div>
    );
}