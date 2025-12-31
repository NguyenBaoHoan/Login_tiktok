import LoginPage from './page/LoginPage';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './page/DashBoard';
import React from 'react';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;