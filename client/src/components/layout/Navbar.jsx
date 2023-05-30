import React from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/' >
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
         < Link to=''>Developers
         </Link>
        </li>
        <li>
          <Link to='' href="register.html">Register
          </Link>
        </li>
        <li>
          <Link to='' >Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};
