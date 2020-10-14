import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './header.scss';

import { TokenService } from 'src/services';

const Header = ({ userName, logout }) => {
  // TODO - clear auth and name in app.js state
  const clearUser = () => {
    TokenService.clearAuthToken();
    logout();
  };

  const renderNav = (
    <nav className="nav-bar">
      <p className="nav-links">
        <Link to="/songs">Songs | </Link>
        <Link to="/sets">Set-Lists | </Link>
        <Link to="/gigs">Gigs </Link>
      </p>

      <div className="avatar-div">
        {/* <img src="#" alt="avatar" className="user-avatar" /> */}
        {userName} |
        <Link onClick={() => clearUser()} to="/login">
          | Logout
        </Link>
      </div>
    </nav>
  );

  return (
    <header className="main-header">
      {userName ? renderNav : <Link to="/login">Login</Link>}

      <Link to="/">
        <h1 className="headline">SET-LIST APP</h1>
      </Link>
    </header>
  );
};

export default Header;

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};
