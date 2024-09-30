// src/components/FundraiserList.js 显示所有筹款活动组件
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FundraiserList.css';

function FundraiserList() {
  const [fundraisers, setFundraisers] = useState([]);

  useEffect(() => {
    axios.get('/api/fundraisers')
      .then(response => {
        setFundraisers(response.data);
      })
      .catch(error => {
        console.error('Error fetching fundraisers:', error);
      });
  }, []);

  return (
    <div>
      <h2>Active Fundraisers</h2>
      <ul>
        {fundraisers.map(fundraiser => (
          <li key={fundraiser.FUNDRAISER_ID}>
            {fundraiser.CAPTION} - {fundraiser.ORGANIZER}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FundraiserList;