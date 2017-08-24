import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './Auth';
import fetch from './Fetch';

const rootReducer = combineReducers({
  form,
  auth,
  fetch
});

export default rootReducer;
