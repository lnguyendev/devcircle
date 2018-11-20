import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(actions.payload),
        user: actions.payload
      };
    default:
      return state;
  }
};
