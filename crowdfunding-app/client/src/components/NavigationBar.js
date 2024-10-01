// src/components/NavigationBar.js 导航栏组件
import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
       CROWDFUNDING PLATFORM
      
      <div>
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/fundraisers">
         Fundraiser
        </Link>
        <Link className="nav-link" to="/search">
         Search
        </Link>
      </div>
    </nav>
  );
}

export default NavigationBar;