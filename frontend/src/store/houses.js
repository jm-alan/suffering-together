import csrfetch from '../utils/csrfetch';
import $ from '../utils/silcenceErrors';
import { clearModal, hideModal } from './UX';

const SET_ALL = 'houses/SET_ALL';
const SET_CURRENT = 'houses/SET_CURRENT';
const CLEAR_CURRENT = 'houses/CLEAR_CURRENT';
const ADD_HOUSE = 'houses/ADD';
const REMOVE_HOUSE = 'houses/REMOVE';
const EDIT_HOUSE = 'houses/EDIT';

const setAll = all => ({
  type: SET_ALL,
  all
});

const add = house => ({
  type: ADD_HOUSE,
  house
});

const remove = houseID => ({
  type: REMOVE_HOUSE,
  houseID
});

const edit = house => ({
  type: EDIT_HOUSE,
  house
});

export const setCurrentHouse = houseID => ({
  type: SET_CURRENT,
  houseID
});

export const clearCurrentHouse = () => ({
  type: CLEAR_CURRENT
});

export const getAllhouses = () => async dispatch => {
  await $(async () => {
    const { data: { houses } } = await csrfetch.get('/api/houses');
    dispatch(setAll(houses));
  });
};

export const addHouse = body => async dispatch => {
  await $(async () => {
    const { data: { house } } = await csrfetch.post('/api/houses', { body });
    dispatch(add(house));
    dispatch(clearModal());
    dispatch(hideModal());
  });
};

export const removeHouse = houseID => async dispatch => {
  await $(async () => {
    await csrfetch.delete(`/api/houses/${houseID}`);
    dispatch(remove(houseID));
  });
};

export const editHouse = (houseID, body) => async dispatch => {
  await $(async () => {
    const { data: { house } } = await csrfetch.patch(`/api/houses/${houseID}`, { body });
    dispatch(edit(house));
  });
};

export const joinHouse = ({ joinCode, password }) => async dispatch => {
  await $(async () => {
    const { data: { house } } = await csrfetch.post(
      `/api/houses/${joinCode}/residents`,
      {
        body: {
          password
        }
      }
    );
    dispatch(add(house));
  });
};

export default function reducer (
  state = { all: {}, current: null, loaded: false },
  { type, all, house, houseID }
) {
  switch (type) {
    case SET_ALL:
      return {
        ...state,
        all,
        loaded: true
      };
    case SET_CURRENT:
      return {
        ...state,
        current: state.all[houseID]
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case ADD_HOUSE:
      return {
        ...state,
        all: {
          ...state.all,
          [house.id]: house
        }
      };
    case REMOVE_HOUSE:
      return {
        ...state,
        all: {
          ...state.all,
          [houseID]: null
        }
      };
    case EDIT_HOUSE:
      return {
        ...state,
        all: {
          ...state.all,
          [house.id]: house
        }
      };
    default:
      return state;
  }
}
