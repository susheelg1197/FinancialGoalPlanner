import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import { Link } from 'react-router-dom';
import './nav.css';

function Header() {
  return (
    <nav>
    <div class="logo">Finanacial Goal Planner</div>
    <div class="nav-items">
    <Link to="/">Home</Link>
    <Link to="/visualization">Visualise Spendings</Link>
    <Link to="/features">Help</Link> {/* Assuming you have a route set up for help */}
    </div>
  </nav>
  
  );
}

export default Header;
