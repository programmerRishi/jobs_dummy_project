import { FB_LOGIN_SUCCESS, FB_LOGIN_FAILURE } from '../actions/types';

const INITIAL_STATE = { token: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FB_LOGIN_SUCCESS:
     return { token: action.payload };
    case FB_LOGIN_FAILURE:
     return { token: null };
    default:
      return state;
  }
};
