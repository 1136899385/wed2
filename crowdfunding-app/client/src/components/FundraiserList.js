// src/components/FundraiserList.js Component to display a list of all fundraising activities
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FundraiserList.css'; 

function FundraiserList() {
  // State to hold the list of fundraisers fetched from the API
  const [fundraisers, setFundraisers] = useState([]);

  // Fetch the list of fundraisers when the component mounts
  useEffect(() => {
    axios.get('/api/fundraisers')
      .then(response => {
        setFundraisers(response.data);
      })
      .catch(error => {
        console.error('Error fetching fundraisers:', error);
      });
  }, []); // Run this effect only once on mount due to empty dependency array

  // Function to display alert message when donation button is clicked
  const handleDonate = () => {
    alert('This feature is under construction.');
  };

  // Render the list of fundraisers
  return (
    <div className="fundraiser-list">
      <h2>Active Fundraisers</h2>
      <ul>
        {fundraisers.map(fundraiser => (
          <li key={fundraiser.FUNDRAISER_ID}>
            <Link to={`/fundraisers/${fundraiser.FUNDRAISER_ID}`}>
              {fundraiser.CAPTION}
            </Link>
            <div className="fundraiser-info">
              <p>Organizer: {fundraiser.ORGANIZER}</p>
              <p>Target Funding: {fundraiser.TARGET_FUNDING}</p>
              <p>Current Funding: {fundraiser.CURRENT_FUNDING}</p>
              <p>City: {fundraiser.CITY}</p>
            </div>
            {/* Donation button */}
            <button onClick={handleDonate} className="donate-button">Donate</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Exporting the component so it can be used in other parts of the application
export default FundraiserList;