import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setReboundDestination, setReboundOrigin } from '../../../store/rebound';

import { login } from '../../../store/session';
import {
  enableRebound,
  lockLoading,
  setAfterAuth,
  unlockLoading
} from '../../../store/UX';

import './auth.css';

export default function LoginForm () {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const reboundOrigin = useSelector(state => state.rebound.originalDestination);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(lockLoading('login request'));
    dispatch(setAfterAuth(() => {
      dispatch(unlockLoading('login request'));
    }));
    dispatch(login({ email, password }));
  };

  const handleSignupNavigate = () => {
    dispatch(setReboundDestination('/signup', true));
  };

  useEffect(() => {
    if (!reboundOrigin) dispatch(setReboundOrigin('/home'));
  }, [dispatch, reboundOrigin]);

  useEffect(() => {
    if (reboundOrigin) dispatch(setAfterAuth, enableRebound());
  }, [dispatch, reboundOrigin]);

  return (
    <form
      className='auth-form login'
      onSubmit={handleSubmit}
    >
      <input
        required
        name='login-form-email'
        className='auth-input email'
        type='email'
        placeholder='email@website.com'
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <input
        required
        name='login-form-password'
        className='auth-input password'
        type='password'
        placeholder='password'
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <button
        className='auth-submit login'
        type='submit'
      >
        Log In
      </button>
      <button
        className='auth-submit switch'
        type='button'
        onClick={handleSignupNavigate}
      >
        Dont' have an account?<br />Sign up here
      </button>
    </form>
  );
}
