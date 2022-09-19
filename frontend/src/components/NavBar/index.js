import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Socket from '../Socket';
import Listener from '../Socket/Listener';

import './navbar.css';
import NavButton from './NavButton';

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
    <>
      <nav>
        <NavButton icon={leftButtonIcon} destination={leftButtonDestination} first />
        <NavButton icon='people' destination='/residences' />
        <NavButton icon='add' onClick={() => {}} />
        <NavButton icon='history' destination='/expenses' />
        <NavButton icon='settings' destination='/settings' last />
      </nav>
      <Socket>
        <Listener eventName='something'>
          {(data, socket) => {

          }}
        </Listener>
      </Socket>
    </>
  );
}
