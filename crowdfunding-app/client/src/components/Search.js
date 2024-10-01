// src/components/Search.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Search.css';

function Search() {
  const [organizer, setOrganizer] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?organizer=${encodeURIComponent(organizer)}&categoryId=${categoryId}`);
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  // 定义 clearSearch 函数
  const clearSearch = () => {
    setOrganizer('');
    setCategoryId('');
    setResults([]);
  };

  return (
    <div>
      <input
        type="text"
        value={organizer}
        onChange={(e) => setOrganizer(e.target.value)}
        placeholder="Organizer"
      />
      <input
        type="text"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        placeholder="Category ID"
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={clearSearch}>Clear</button>
      <div>
        {results.map((item) => (
          <div key={item.FUNDRAISER_ID}>
            <Link to={`/fundraisers/${item.FUNDRAISER_ID}`}>
              <h3>{item.CAPTION}</h3>
            </Link>
            <p>Organizer: {item.ORGANIZER}</p>
            <p>Category ID: {item.CATEGORY_ID}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;