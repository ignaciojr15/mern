import axios from 'axios';

import { REGISTER_SUCCESS, REGISTER_FAIL ,USER_LOADED,AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT} from './types';
import { setAlert } from './alert';
import {setAuthToken} from '../Utils/setAuthToken';
import { Navigate } from 'react-router-dom';

export const pruebaL = ({ name }) => {
  console.log(name);
};
export const loadUser = () => async dispatch => {
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
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
    const res = await axios.post('/api/users', body, config);
    console.Console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
   
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      errors.forEach(error => { dispatch(setAlert(error.msg, 'danger')) });
    }
    dispatch({
      type: REGISTER_FAIL,
    });
   
  }
};

//login user
export const login = (  email, password ) => async dispatch => {


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
   
    window.location.replace('http://localhost:3000/dashboard');
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
    
      errors.forEach(error => { dispatch(setAlert(error.msg, 'danger')) });
      setAlert('credenciales incorrectas', 'error');
      
    }
    dispatch({
      type: LOGIN_FAIL,
    });
   
  }};
  export const logout = () => dispatch => {
    dispatch({type:LOGOUT})
  }