import { GET_ERRORS } from '../actions/types';

const initialState = {};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_ERRORS:
      return actions.payload;
    default:
      return state;
  }
};
