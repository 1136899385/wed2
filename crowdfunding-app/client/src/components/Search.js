// src/components/Search.js Component for search functionality
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Search.css';

function Search() {
  // State variables for search inputs and results
  const [organizer, setOrganizer] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [results, setResults] = useState([]);

  // Function to handle the search action
  const handleSearch = async () => {
    try {
      // Sending the search request to the API
      const response = await axios.get(`/api/search?organizer=${encodeURIComponent(organizer)}&categoryId=${categoryId}`);
      // Updating the results state with the API response
      setResults(response.data);
    } catch (error) {
      // Logging any errors that occur during the search
      console.error('Search error:', error);
    }
  };

  // Function to clear the search fields and results
  const clearSearch = () => {
    setOrganizer('');
    setCategoryId('');
    setResults([]);
  };

  // Rendering the search form and results
  return (
    <div className="search-container">
      <div className="input-group">
        <input
          type="text"
          value={organizer}
          onChange={(e) => setOrganizer(e.target.value)}
          placeholder="Organizer"
          className="input-group-input"
        />
        <input
          type="text"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          placeholder="Category ID"
          className="input-group-input"
        />
        <button onClick={handleSearch} className="button">Search</button>
        <button onClick={clearSearch} className="button">Clear</button>
      </div>
      <div>
        {results.map((item) => (
          <div key={item.FUNDRAISER_ID} className="search-result">
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

// Exporting the component so it can be used in other parts of the application
export default Search;