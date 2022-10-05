import csrfetch from '../utils/csrfetch';
import { clearModal, hideModal } from './UX';

const SET_ALL = 'houses/SET_ALL';
const SET_CURRENT = 'houses/SET_CURRENT';
const CLEAR_CURRENT = 'houses/CLEAR_CURRENT';
const SET_RESIDENTS = 'houses/SET_RESIDENTS';
const CLEAR_RESIDENTS = 'houses/CLEAR_RESIDENTS';
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

export const setCurrent = houseID => ({
  type: SET_CURRENT,
  houseID
});

export const clearCurrent = () => ({
  type: CLEAR_CURRENT
});

const setResidents = currentResidents => ({
  type: SET_RESIDENTS,
  currentResidents
});

export const clearResidents = () => ({
  type: CLEAR_RESIDENTS
});

export const getAllhouses = () => async dispatch => {
  const { houses } = await csrfetch.get('/api/houses');
  dispatch(setAll(houses));
};

export const addHouse = body => async dispatch => {
  const { house } = await csrfetch.post('/api/houses', body);
  dispatch(add(house));
  dispatch(clearModal());
  dispatch(hideModal());
};

export const removeHouse = houseID => async dispatch => {
  await csrfetch.delete(`/api/houses/${houseID}`);
  dispatch(remove(houseID));
};

export const editHouse = (houseID, body) => async dispatch => {
  const { house } = await csrfetch.patch(`/api/houses/${houseID}`, body);
  dispatch(edit(house));
};

export const joinHouse = ({ joinCode, password }) => async dispatch => {
  const { house } = await csrfetch.post(
    `/api/houses/${joinCode}/residents`,
    { password }
  );
  dispatch(add(house));
};

export const getAllResidents = houseID => async dispatch => {
  const { residents } = await csrfetch.get(`/api/houses/${houseID}/residents`);
  dispatch(setResidents(residents));
};

export default function reducer (
  state = {
    all: {},
    current: null,
    allLoaded: false,
    currentLoaded: false,
    currentResidents: {},
    residentsLoaded: false
  },
  {
    type,
    all,
    house,
    houseID,
    currentResidents
  }
) {
  switch (type) {
    case SET_ALL:
      return {
        ...state,
        all,
        allLoaded: true
      };
    case SET_CURRENT:
      return {
        ...state,
        current: state.all[houseID],
        currentLoaded: true
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        currentLoaded: false
      };
    case SET_RESIDENTS:
      return {
        ...state,
        currentResidents,
        residentsLoaded: true
      };
    case CLEAR_RESIDENTS:
      return {
        ...state,
        currentResidents: {},
        residentsLoaded: false
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
