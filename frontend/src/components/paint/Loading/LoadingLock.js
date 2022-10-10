import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { devlog } from '../../../utils/logging';
import { lockLoading, unlockLoading } from '../../../store/UX/loading';

export default function LoadingLock ({ name, children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    devlog(`<LoadingLock /> for ${name} mounting`);
    dispatch(lockLoading(name, children));
    return () => {
      devlog(`<LoadingLock /> for ${name} unmounting`);
      dispatch(unlockLoading(name));
    };
  }, [dispatch, name, children]);

  return null;
}
