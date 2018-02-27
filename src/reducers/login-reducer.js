import { SET_LOGIN_INFO } from '../constants/action-types';

const initialState = {
  userId: '',
};

export default function login(state = initialState, action = '') {
  switch (action.type) {
    case SET_LOGIN_INFO:
      return { ...state, userId: action.payload ? action.payload : state.userId };
    default:
      return state;
  }
}
