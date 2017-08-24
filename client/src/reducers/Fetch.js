import { FETCH_MESSAGE } from '../actions/Types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_MESSAGE:
      const { data: { message } } = payload;
      return { ...state, message };
    default:
      return state;
  }
};
