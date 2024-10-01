// src/Sapp.js Main component of the application
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route components
import HomePage from './components/HomePage';
import FundraiserList from './components/FundraiserList';
import FundraiserDetail from './components/FundraiserDetail';
import NavigationBar from './components/NavigationBar';
import Search from './components/Search';

function Sapp() {
  // Rendering the main application component with routing
  return (
    <Router>
      <div>
        <NavigationBar /> {/* Displaying the navigation bar */}
        <Routes> 
          <Route path="/" exact element={<HomePage />} /> {/* Home page route */}
          <Route path="/fundraisers" exact element={<FundraiserList />} /> {/* List of fundraisers route */}
          <Route path="/search" element={<Search />} /> {/* Search functionality route */}
          <Route path="/fundraisers/:id" element={<FundraiserDetail />} /> {/* Detail page for a single fundraiser */}
        </Routes>
      </div>
    </Router>
  );
}

// Exporting the component so it can be used in other parts of the application
export default Sapp;