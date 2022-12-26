import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { devlog } from '../../../utils/logging';
import { lockLoading, unlockLoading } from '../../../store/UX/loading';

export default function LoadingLock ({ name, item, children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const identifier = name ?? item;
    const uniqueIdentifier = Symbol(identifier);
    devlog('<LoadingLock /> for', uniqueIdentifier, 'mounting');
    dispatch(lockLoading(uniqueIdentifier, children));
    return () => {
      devlog('<LoadingLock /> for', uniqueIdentifier, 'unmounting');
      dispatch(unlockLoading(uniqueIdentifier));
    };
  }, [dispatch, item, children]);

  return null;
}
