import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { lockLoading, unlockLoading } from '../../store/UX/uxActionCreators';

export default function LoadingLock ({ name }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Loading lock added by', name);
    }
    dispatch(lockLoading());
    return () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Loading lock released by', name);
      }
      dispatch(unlockLoading());
    };
  }, []);

  return null;
}
