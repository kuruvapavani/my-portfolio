import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import AdminDashboard from './components/admin/AdminDashBoard';
import AddTestimonial from './components/testimonial/TestimonialForm';
import NotFound from './components/error/ErrorPage';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Router>
  <Routes>
          {/* Define the routes */}
          <Route path="/" element={<App />} />       {/* Home Page */}
          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/addtestimonial' element={<AddTestimonial />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
  </Router>
  </React.StrictMode>,
)
