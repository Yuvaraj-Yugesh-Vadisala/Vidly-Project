import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">Vidly</span>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink
              to="/movies"
              className="nav-item nav-link "
              aria-current="page"
            >
              Movies
            </NavLink>
            {/* <NavLink to="/customers" className="nav-item  nav-link">
              Customers
            </NavLink>
            <NavLink to="/rentals" className="nav-item  nav-link">
              Rentals
            </NavLink> */}
            <NavLink to="/loginForm" className="nav-item  nav-link">
              Login
            </NavLink>
            <NavLink to="/registerForm" className="nav-item  nav-link">
              Register
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
