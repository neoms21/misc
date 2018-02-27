import { SET_HEADER } from '../constants/action-types';

const initialState = {
  heading: '',
  toShow: true,
};

export default function header(state = initialState, action = '') {
  switch (action.type) {
    case SET_HEADER:
      return { ...state, heading: action.payload.heading, toShow: action.payload.toShow };

    default:
      return state;
  }
}
