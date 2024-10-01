//Component for the navigation bar
import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  // Rendering the navigation bar component
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
      <h2 className="navbar-brand">CROWDFUNDING PLATFORM</h2> 
      
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

// Exporting the component so it can be used in other parts of the application
export default NavigationBar;