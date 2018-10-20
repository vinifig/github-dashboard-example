import React from 'react';
import logo from '../../assets/react.svg';
import './Header.css';

export default function Header () {
    return (
        <div className="Header">
            <img src={logo} className="Header-logo" alt="logo" />
            <h2 className="Header-title" >Welcome to <br/>GitHub Dashboard</h2>
        </div>
    );
}