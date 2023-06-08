import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL ,USER_LOADED,AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL} from './types';
import { setAlert } from './alert';
import Noty from 'noty';
import {setAuthToken} from '../Utils/setAuthToken';
export const pruebaL = ({ name }) => {
  console.log(name);
};
export const loadUser = () => async dispatch => {
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:5000/api/auth');
    dispatch({
          type: USER_LOADED,
          payload: res.data
        });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}
export const registerUser = ({ name, email, password }) => async dispatch => {


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('http://localhost:5000/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      let message = '';
      errors.forEach(error => { dispatch(setAlert(error.msg, 'danger')) });
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
//login user
export const loginUser = (  email, password ) => async dispatch => {


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('http://localhost:5000/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
    
      errors.forEach(error => { dispatch(setAlert(error.msg, 'danger')) });
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }};