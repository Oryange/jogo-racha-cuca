import { REQUEST_GAME, RECEIVE_GAME } from '../actions/index';

const INITIAL_STATE = {
  results: [],
  isFetching: true,
};

export default function reducerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_GAME:
    return ({
      ...state,
      isFetching: true,
    });
  case RECEIVE_GAME:
    return ({
      ...state,
      isFetching: false,
      results: action.data,
    });
  default:
    return state;
  }
}
