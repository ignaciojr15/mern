import axios from "axios";
import { setAlert } from "./alert";
import { Navigate } from 'react-router-dom';

import { GET_PROFILE,PROFILE_ERROR, UPDATE_PROFILE,CLEAR_PROFILE,ACCOUNT_DELETED,GET_PROFILES,GET_REPOS,NO_REPOS } from "./types";

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
// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

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
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS
    });
  }
};


export const createProfile=(FormData,history,edit=false)=> async dispatch => {
    console.log('formData', FormData);
try {
    

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
      const res = await axios.put('/api/profile/experience', formData);
  
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
      const res = await axios.put('/api/profile/education', formData);
  
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
  // Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};