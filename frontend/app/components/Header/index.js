import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';



function Header() {
  return (
    
    <div style={{ backgroundColor: '#f0f0f0' }}>
      <div style={{ backgroundColor: '#333', color: 'white', padding: '10px' }} className="topnav">
          <a style={{ padding: '14px 16px', textDecoration: 'none', color:'white' }} className="active" href="#home">Home</a>
          <a style={{ padding: '14px 16px', textDecoration: 'none', color:'white' }} href="#news">Visualise</a>
          <a style={{ padding: '14px 16px', textDecoration: 'none', color:'white' }} href="#about">Help</a>
      </div>
      <a href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </a>
      <NavBar>
        {/* NavBar content */}
      </NavBar>
    </div>
  );
}

export default Header;
