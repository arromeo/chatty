import React, { Component } from 'react';
import UserCounter from './UserCounter.jsx';

function Header(props) {
  return (
  <nav className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
    <UserCounter userCount={ props.userCount } />
  </nav>
  )
}

export default Header;