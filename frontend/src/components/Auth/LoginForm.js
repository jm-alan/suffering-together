
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../../store/session/sessionActionCreators';
import { useNavigate } from 'react-router-dom';

import './auth.css';

export default function LoginForm () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

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
        onClick={() => navigate('/signup')}
      >
        Dont' have an account? Sign up here
      </button>
    </form>
  );
}
