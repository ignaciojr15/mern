import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import Noty from 'noty';

export const pruebaL = ({ name }) => {
  console.log(name);
};

export const registerUser = ({ name, email, password }) => async (dispatch) => {
  console.log("hola");
  const newUser = {
    name,
    email,
    password,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('http://localhost:5000/api/users', newUser, config);
    console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      let message = '';
      errors.forEach((error) => {
        message += error.msg + ' '; // Concatenar los mensajes de error
      });
      new Noty({
        theme: 'sunset',
        type: 'error',
        text: message,
        timeout: 3000,
      }).show();
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
