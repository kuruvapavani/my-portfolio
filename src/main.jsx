import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import AddSkill from './components/skills/AddSkill';
import AddExperience from './components/experience/AddExperience';
import AddProject from './components/projects/AddProject';
import AdminDashboard from './components/admin/AdminDashBoard';
import AddTestimonial from './components/testimonial/TestimonialForm';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Router>
  <Routes>
          {/* Define the routes */}
          <Route path="/" element={<App />} />       {/* Home Page */}
          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path='/addskill' element={<AddSkill />} />
          <Route path='/addproject' element={<AddProject />} />
          <Route path='/addexperience' element={<AddExperience />} />
          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path='addtestimonial' element={<AddTestimonial />} />
        </Routes>
  </Router>
  </React.StrictMode>,
)
