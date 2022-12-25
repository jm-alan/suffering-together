import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  setInterimURL,
  setFinalURL,
  enableInterim
} from '../../store/rebound';
import { devlog } from '../../utils/logging';

export default function Rebound ({ interimURL, finalURL }) {
  const dispatch = useDispatch();

  useEffect(() => {
    devlog(`<Rebound /> interim: ${interimURL} final: ${finalURL}`);
    dispatch(setInterimURL(interimURL));
    dispatch(setFinalURL(finalURL));
    dispatch(enableInterim());
  }, [dispatch, interimURL, finalURL]);

  return null;
}
