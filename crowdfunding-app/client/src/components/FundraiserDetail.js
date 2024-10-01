import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FundraiserDetail.css';

// Defining the component for displaying details of a specific fundraiser
function FundraiserDetail() {
  // State to hold the fundraiser data fetched from the API
  const [fundraiser, setFundraiser] = useState(null);
  // Extracting the ID parameter from the URL using react-router-dom's useParams hook
  const { id } = useParams();

  // Using useEffect to fetch the fundraiser data when the component mounts or the 'id' changes
  useEffect(() => {
    axios.get(`/api/fundraisers/${id}`) // Making an HTTP GET request to the API endpoint
      .then(response => {
        setFundraiser(response.data); // Setting the state with the fetched data
      })
      .catch(error => {
        console.error('Error fetching fundraiser:', error); // Logging any errors that occur during the fetch
      });
  }, [id]); // The dependency array includes only 'id', ensuring the effect runs only when it changes

  // If the fundraiser data is not yet available, display a loading message
  if (!fundraiser) {
    return <div>Loading...</div>;
  }

  // Once the data is available, render the component with the fundraiser details
  return (
    <div>
      <h2>{fundraiser.CAPTION}</h2> 
      <p>Organizer: {fundraiser.ORGANIZER}</p> 
      <p>Target Funding: {fundraiser.TARGET_FUNDING}</p> 
      <p>Current Funding: {fundraiser.CURRENT_FUNDING}</p> 
      <p>City: {fundraiser.CITY}</p> 
      <p>ID: {fundraiser.CATEGORY_ID}</p> 
    </div>
  );
}

// Exporting the component so it can be used in other parts of the application
export default FundraiserDetail;