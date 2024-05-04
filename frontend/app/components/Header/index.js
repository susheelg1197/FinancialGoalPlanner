import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import { Link, useHistory } from 'react-router-dom';
import './nav.css';
import { AuthContext } from '../../contexts/AuthContext';


function Header() {
  const { authToken, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    history.push('/login');
  };


  return (
    <nav>
      <div class="logo">Finanacial Goal Planner</div>
      <div class="nav-items">
        {authToken ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/visualization">Visualise Spendings</Link>
            <Link to="/features">Help</Link>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '10px' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/features">Help</Link>
        )}
      </div>
    </nav>

  );
}

export default Header;
