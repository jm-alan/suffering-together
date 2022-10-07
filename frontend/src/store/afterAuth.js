const ON_SUCCESS = 'afterAuth/ON_SUCCESS';
const CALL_SUCCESS = 'afterAuth/CALL_SUCCESS';
const ON_FAILURE = 'afterAuth/ON_FAILURE';
const CALL_FAILURE = 'afterAuth/CALL_FALIURE';
const ON_ANY = 'afterAuth/ON_ANY';
const ENABLE = 'afterAuth/ENABLE';
const DISABLE = 'afterAuth/DISABLE';

export const onSuccess = (onSuccess, ...args) => ({
  type: ON_SUCCESS,
  onSuccess,
  args
});

export const callSuccess = () => ({
  type: CALL_SUCCESS
});

export const onFailure = (onFailure, ...args) => ({
  type: ON_FAILURE,
  onFailure,
  args
});

export const callFailure = () => ({
  type: CALL_FAILURE
});

export const onAny = (onAny, ...args) => ({
  type: ON_ANY,
  onAny,
  args
});

export default function reducer (
  state = { onSuccess: [], onFailure: [], enabled: false },
  { type, onSuccess, onFailure, args }
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
        onSuccess: state.onSuccess.concat(() => onSuccess(...args))
      };
    case CALL_SUCCESS:
      for (let i = 0; i < state.onSuccess.length; i++) {
        state.onSuccess[i]();
      }
      return {
        onSuccess: [],
        onFailure: []
      };
    case ON_FAILURE:
      return {
        ...state,
        onFailure: state.onFailure.concat(() => onFailure(...args))
      };
    case CALL_FAILURE:
      for (let i = 0; i < state.onFailure.length; i++) {
        state.onFailure[i]();
      }
      return {
        onSuccess: [],
        onFailure: []
      };
    case ON_ANY:
      return {
        ...state,
        onSuccess: state.onSuccess.concat(() => onAny(...args)),
        onFailure: state.onFailure.concat(() => onAny(...args))
      };
    default:
      return state;
  }
}
