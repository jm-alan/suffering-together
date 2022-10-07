import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { devlog } from '../../../utils/logging';
import { lockLoading, unlockLoading } from '../../../store/UX';

export default function LoadingLock ({ name, children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    devlog('Loading lock added by', name);
    dispatch(lockLoading(name, children));
    return () => {
      devlog('Loading lock released by', name);
      dispatch(unlockLoading(name));
    };
  }, [dispatch, name, children]);

  return null;
}
