const LOCK = 'loading/LOCK';
const UNLOCK = 'loading/UNLOCK';

export const lockLoading = (unlockKey, onUnlock = () => {}) => ({
  type: LOCK,
  unlockKey,
  onUnlock
});

export const unlockLoading = unlockKey => ({
  type: UNLOCK,
  unlockKey
});

export default function reducer (
  state = { lock: 0, onUnlock: {} },
  { type, unlockKey, onUnlock }
) {
  switch (type) {
    case LOCK:
      return {
        ...state,
        onUnlock: {
          ...state.onUnlock,
          [unlockKey]: onUnlock
        },
        lock: state.lock + 1
      };
    case UNLOCK:
      if (!state.lock || !state.onUnlock[unlockKey]) {
        throw new Error(
          'Loading praxis disrespected; incorrect semaphore disengagement by',
          unlockKey
        );
      }
      state.onUnlock[unlockKey]();
      return {
        ...state,
        onUnlock: {
          ...state.onUnlock,
          [unlockKey]: null
        },
        lock: state.lock - 1
      };
    default:
      return state;
  }
}
