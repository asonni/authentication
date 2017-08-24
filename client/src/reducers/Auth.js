import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from '../actions/Types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: payload };
    case FETCH_MESSAGE:
      return { ...state, message: payload.data.message };
    default:
      return state;
  }
};
