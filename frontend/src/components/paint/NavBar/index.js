import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Socket from '../../logic/Socket';
import Listener from '../../logic/Socket/Listener';

import './navbar.css';
import NavButton from './NavButton';

export default function NavBar () {
  const { pathname } = useLocation();
  const user = useSelector(state => state.session.user);

  const leftButtonDestination = user
    ? pathname === '/home'
      ? '/me'
      : '/home'
    : '/login';

  const leftButtonIcon = user
    ? pathname === '/home'
      ? 'account_circle'
      : 'home'
    : 'login';

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
