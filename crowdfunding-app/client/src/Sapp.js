// src/Sapp.js 主组件
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 导入 Routes 和 Route
import HomePage from './components/HomePage';
import FundraiserList from './components/FundraiserList';
import FundraiserDetail from './components/FundraiserDetail';
import NavigationBar from './components/NavigationBar';
import Search from './components/Search';
function Sapp() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes> 
          <Route path="/" exact element={<HomePage />} />
          <Route path="/fundraisers" exact element={<FundraiserList />} /> 
          <Route path="/search" element={<Search />} />
          <Route path="/fundraisers/:id" element={<FundraiserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Sapp;