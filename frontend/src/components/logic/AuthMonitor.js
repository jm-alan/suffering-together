import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearAfterAuth,
  disableAfterAuth
} from '../../store/afterAuth';
import { devlog } from '../../utils/logging';

export default function AuthMonitor () {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const enabled = useSelector(state => state.afterAuth.enabled);
  const onSuccess = useSelector(state => state.afterAuth.onSuccess);
  const onFailure = useSelector(state => state.afterAuth.onFailure);
  const onAny = useSelector(state => state.afterAuth.onAny);

  useEffect(() => {
    if (enabled) {
      devlog('<AuthMonitor /> enabled');
      dispatch(disableAfterAuth());
      if (user) {
        devlog('<AuthMonitor /> user detected; proceeding with onSuccess[]');
        dispatch(clearAfterAuth());
        for (let i = 0; i < onSuccess.length; i++) onSuccess[i]();
      } else {
        devlog('<AuthMonitor /> user not detected; proceeding with onFailure[]');
        for (let i = 0; i < onFailure.length; i++) onFailure[i]();
      }
      devlog('<AuthMonitor /> success/failure sweep complete; proceeding with onAny[]');
      for (let i = 0; i < onAny.length; i++) onAny[i]();
    }
  }, [dispatch, enabled, user]);

  return null;
}
