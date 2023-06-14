import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../action/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isAuthenticatedLocal, setIsAuthenticatedLocal] = useState(false);
/*
  useEffect(() => {
    setIsAuthenticatedLocal(isAuthenticated);
   
  }, []);
  */
  useEffect(() => {
    setIsAuthenticatedLocal(isAuthenticated);
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  const salida = (e) => {
    e.preventDefault();
    console.log("me ejecut"); 
    logout();
    setIsAuthenticatedLocal(false);
    console.log("isAuthenticated:", isAuthenticated);
  }

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"/>{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#!" onClick={(e) => salida(e)}>
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Logout</span>
        </a>
      </li>

    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li>
        <a href="!#">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
     
      </h1>
      {!loading && (
        <Fragment>{isAuthenticatedLocal ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = { 
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
