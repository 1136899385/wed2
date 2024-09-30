// src/Sapp.js 主组件
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 导入 Routes 和 Route
import HomePage from './components/HomePage';
import FundraiserList from './components/FundraiserList';
import Login from './components/Login';
import Register from './components/Register';
import FundraiserDetail from './components/FundraiserDetail';
import NavigationBar from './components/NavigationBar';

function Sapp() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes> 
          <Route path="/" exact element={<HomePage />} />
          <Route path="/fundraisers" exact element={<FundraiserList />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/fundraisers/:id" element={<FundraiserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Sapp;