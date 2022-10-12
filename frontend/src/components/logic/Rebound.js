import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  setReboundDestination,
  setReboundOrigin
} from '../../store/rebound';
import { devlog } from '../../utils/logging';

export default function Rebound ({ from: startingLocation, to: finalLocation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    devlog(`<Rebound /> from ${startingLocation} to ${finalLocation} mounting`);
    dispatch(setReboundOrigin(startingLocation));
    dispatch(setReboundDestination(finalLocation));
  }, [dispatch, startingLocation, finalLocation]);

  return null;
}
