import axios from "axios";
import { setAlert } from "./alert";
import { Navigate } from 'react-router-dom';

import { GET_PROFILE,PROFILE_ERROR, UPDATE_PROFILE } from "./types";

export const getCurrentProfile = () => async dispatch => {
    try {

        const res = await axios.get("/api/profile/me");
        console.log(res);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
       
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
export const createProfile=(FormData,history,edit=false)=> async dispatch => {
    console.log('formData', FormData);
try {
    const config={
        headers:{
            'Content-Type':'aplication/json'
        }
    }

    const res =await axios.post("/api/profile/",FormData);

    dispatch({
        type: GET_PROFILE,
        payload: res.data
    });
    dispatch(setAlert(edit? "Profile Updated" : "Profile Created", "success"));

    // if(!edit){
    //     history.push("/dashboard");
    // }
    Navigate('/dashboard')
} catch (err) {
    console.log('err', err)
    const errors = err.response?.data.error;
    if (errors) {
    
      errors.forEach(error => { dispatch(setAlert(error.msg, 'danger')) });
    }
    dispatch({
        type: PROFILE_ERROR,
        payload: { msg: "error de perfil" }
    });
}
}
export const addExperience = (formData) => async (dispatch) => {
    try {
      const res = await axios.post('/experience', formData);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Experience Added', 'success'));
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  export const addEducation = (formData) => async (dispatch) => {
    try {
      const res = await axios.put('/profile/education', formData);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Education Added', 'success'));
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };