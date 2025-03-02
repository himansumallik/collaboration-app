import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Dashboard from './components/Dashboard';
import ProjectDetailsPage from "./components/ProjectDetailsPage";
import TaskDetailsPage from './components/TaskDetailsPage'; // Import the TaskDetailsPage



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('auth') === 'true' // Checking auth from localStorage
  );

  useEffect(() => {
    const authStatus = localStorage.getItem('auth') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('auth', 'true'); // Set authentication status in localStorage
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth'); // Remove authentication status from localStorage
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Default Route - Always go to Dashboard */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/project/:projectName" element={<ProjectDetailsPage />} />
        <Route path="/tasks/:taskId" element={<TaskDetailsPage />} /> {/* Add this route */}
  
        {/* Dashboard Route (No authentication check) */}
        <Route path="/dashboard" element={<Dashboard handleLogout={handleLogout} />} />
  
        {/* Login and Signup Routes (Optional, but not required now) */}
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
  
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}  

export default App;