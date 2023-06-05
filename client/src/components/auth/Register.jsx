import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { registerUser , pruebaL } from '../../action/auth';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/sunset.css';
import { setAlert } from '../../action/alert';

export const Register = ({setAlert}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      new Noty({
        theme: 'sunset',
        type: 'error',
        text: 'las contraseñas no coinciden',
        timeout: 3000,
      }).show();
      
     setAlert('password do not match','danger')
    } else {
      let hola='hello'
    //  pruebaL({name:hola})
     registerUser({ name, email, password });
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onChange(e)}
           
            name="email"
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
       
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            minLength="6"
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default connect(null, { registerUser, setAlert,pruebaL })(Register);