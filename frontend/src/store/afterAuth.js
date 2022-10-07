const ON_SUCCESS = 'afterAuth/ON_SUCCESS';
const ON_FAILURE = 'afterAuth/ON_FAILURE';
const CLEAR = 'afterAuth/CLEAR';
const ON_ANY = 'afterAuth/ON_ANY';
const ENABLE = 'afterAuth/ENABLE';
const DISABLE = 'afterAuth/DISABLE';

export const onSuccess = fn => ({
  type: ON_SUCCESS,
  fn
});

export const onFailure = fn => ({
  type: ON_FAILURE,
  fn
});

export const onAny = fn => ({
  type: ON_ANY,
  fn
});

export const clearAfterAuth = () => ({
  type: CLEAR
});

export const enableAfterAuth = () => ({
  type: ENABLE
});

export const disableAfterAuth = () => ({
  type: DISABLE
});

export default function reducer (
  state = {
    onSuccess: [],
    onFailure: [],
    onAny: [],
    enabled: false
  },
  { type, fn, success }
) {
  switch (type) {
    case ENABLE:
      return {
        ...state,
        enabled: true
      };
    case DISABLE:
      return {
        ...state,
        enabled: false
      };
    case ON_SUCCESS:
      return {
        ...state,
        onSuccess: state.onSuccess.concat(fn)
      };
    case ON_FAILURE:
      return {
        ...state,
        onFailure: state.onFailure.concat(fn)
      };
    case ON_ANY:
      return {
        ...state,
        onAny: state.onAny.concat(fn)
      };
    case CLEAR:
      return {
        onSuccess: [],
        onFailure: [],
        onAny: []
      };
    default:
      return state;
  }
}
