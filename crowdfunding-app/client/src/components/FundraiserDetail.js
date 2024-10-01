// src/components/FundraiserDetail.js 显示单个筹款活动详情的组件
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FundraiserDetail.css';

function FundraiserDetail() {
  const [fundraiser, setFundraiser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/fundraisers/${id}`)
      .then(response => {
        setFundraiser(response.data);
      })
      .catch(error => {
        console.error('Error fetching fundraiser:', error);
      });
  }, [id]);

  if (!fundraiser) {
    return <div>Loading...</div>;
  }

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

export default FundraiserDetail;