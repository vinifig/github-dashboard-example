import React from 'react';
import logo from '../../assets/github.png';
import './Header.scss';

export default function Header ({className = ""}) {
    return (
        <div className={`${className} Header`}>
            <img src={logo} className="Header__logo" alt="logo" />
            <h2 className="Header__text" >Welcome to <br/><span className="Header__title">GitHub Dashboard</span></h2>
        </div>
    );
}