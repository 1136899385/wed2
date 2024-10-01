// src/components/FundraiserList.js 显示所有筹款活动组件
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FundraiserList.css'; // 确保 CSS 文件存在并正确导入

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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FundraiserList;