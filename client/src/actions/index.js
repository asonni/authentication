import axios from 'axios';
import { reset } from 'redux-form';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './Types';

const ROOT_URL = 'http://localhost:3090';

export const signinUser = ({ email, password }, callback) => dispatch => {
  // Submit email/password to the server
  axios
    .post(`${ROOT_URL}/signin`, { email, password })
    .then(response => {
      // If request is good...
      // - Update state to indicate user is authenticated
      dispatch({ type: AUTH_USER });
      // - Save the JWT token
      localStorage.setItem('token', response.data.token);
      // - redirect to the route '/feature'
      callback();
    })
    .catch(() => {
      // If request is bad...
      // - Show an error to the user
      dispatch(authError('Bad Login Info'));
      dispatch(reset('signin'));
    });
};

export const signupUser = ({ email, password }, callback) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        callback(true);
      })
      .catch(({ response }) => {
        dispatch(authError(response.data.error));
        dispatch(reset('signup'));
        callback(false);
      });
  };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export const signoutUser = () => {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
};

// export const fetchMessage = () => {
//   return dispatch => {
//     axios.get(ROOT_URL, {
//       headers: { authorization: localStorage.getItem('token') }
//     }).then(response => {
//       dispatch({
//         type: FETCH_MESSAGE,
//         payload: response.data.message
//       });
//     });
//   }
// }

// This code how can we using redux promise instead of redux thunk
export const fetchMessage = () => {
  const request = axios.get(`${ROOT_URL}/secret`, {
    headers: { authorization: localStorage.getItem('token') }
  });
  return {
    type: FETCH_MESSAGE,
    payload: request
  };
};
