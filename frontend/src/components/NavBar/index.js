import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import './navbar.css';

export default function NavBar () {
  const { pathname } = useLocation();
  const user = useSelector(state => state.session.user);

  const leftButtonDestination = pathname === '/home'
    ? user
      ? '/me'
      : '/login'
    : '/home';

  const leftButtonIcon = pathname === '/home'
    ? user
      ? 'account_circle'
      : 'login'
    : 'home';

  return (
    <nav>
      <Link
        to={leftButtonDestination}
        className='nav-button clickable first'
      >
        <span
          className='material-symbols-outlined'
        >
          {leftButtonIcon}
        </span>
      </Link>
      <Link
        to='/residences'
        className='nav-button clickable'
      >
        <span
          className='material-symbols-outlined'
        >
          people
        </span>
      </Link>
      <div
        className='nav-button clickable'
      >
        <span
          className='material-symbols-outlined'
        >
          add
        </span>
      </div>
      <Link
        to='/expenses'
        className='nav-button clickable'
      >
        <span
          className='material-symbols-outlined'
        >
          history
        </span>
      </Link>
      <Link
        to='settings'
        className='nav-button clickable last'
      >
        <span
          className='material-symbols-outlined'
        >
          settings
        </span>
      </Link>
    </nav>
  );
}
