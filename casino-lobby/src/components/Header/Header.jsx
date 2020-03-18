import React from 'react';
import logo from './logo.png';
import './Header.css';

const Header = () => (
  <header className="Header">
    <img src={logo} className="Header__logo" alt="logo" />
    <h2>Casino Lobby</h2>
  </header>
);

export default Header;
