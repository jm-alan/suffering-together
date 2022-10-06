import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { joinHouse } from '../../../store/houses';

export default function Join () {
  const dispatch = useDispatch();

  const [joinCode, setJoinCode] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    dispatch(joinHouse({ joinCode, password }));
  };

  return (
    <form className='new-item-form' onSubmit={onSubmit}>
      <input
        className='new-item-input join-residence'
        type='text'
        placeholder='Join code'
        value={joinCode}
        onChange={({ target: { value } }) => setJoinCode(value)}
        required
      />
      <input
        className='new-item-input join-residence'
        type='password'
        placeholder='Password (optional)'
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <button id='join-residence-submit' type='submit'>
        Join
      </button>
    </form>
  );
}
