import React from 'react';
import logo from '../../assets/react.svg';
import './Header.scss';

export default function Header () {
    return (
        <div className="Header">
            <img src={logo} className="Header__logo" alt="logo" />
            <h2 className="Header__title" >Welcome to <br/>GitHub Dashboard</h2>
        </div>
    );
}