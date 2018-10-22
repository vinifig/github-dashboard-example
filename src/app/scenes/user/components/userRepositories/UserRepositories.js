import React from 'react';
import { Link } from "react-router-dom";
import './UserRepositories.scss';

export default function UserRepositories ({match}) {
    return (
        <div className='UserRepositories'>
            <div className="UserRepositories__header">
                <p className="UserRepositories__header__title">Alo alo</p>
            </div>
            <div className="UserRepositories__header">
                <p className="UserRepositories__header__title">Alo alo</p>
            </div>
            <div className="UserRepositories__header">
                <p className="UserRepositories__header__title">Alo alo</p>
            </div>
            <div className="UserRepositories__header">
                <p className="UserRepositories__header__title">Alo alo</p>
            </div>
            <div className="UserRepositories__header">
                <p className="UserRepositories__header__title">Alo alo</p>
            </div>
            {/* <Link to={`${match.url}/repository/oi`}>goto oi</Link> */}
        </div>
    );
}