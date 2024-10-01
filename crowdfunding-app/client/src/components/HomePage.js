//Component for the home page of the crowdfunding platform
import React from 'react';
import './HomePage.css';

function HomePage() {
  // Logging a message when rendering the HomePage component
  console.log("Rendering HomePage");
  
  // Returning the JSX for the home page
  return (
    <div className="container">
      <h1>Welcome to the Crowdfunding Platform</h1>
      <p>Please login or register to get started.</p>
    </div>
  );
}

// Exporting the component so it can be used in other parts of the application
export default HomePage;