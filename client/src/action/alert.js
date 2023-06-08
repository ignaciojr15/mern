import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';
import Noty from 'noty';
export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  const id = uuidv4();
  new Noty({
    theme: 'sunset',
    type: alertType,
    text: msg,
    timeout: 3000,
  }).show();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};