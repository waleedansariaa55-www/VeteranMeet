import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar({ user }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // We can either reload or just navigate. 
    // Reloading ensures App.jsx state is reset.
    navigate('/login')
    window.location.reload() 
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top glass-nav">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          <i className="fas fa-shield-alt me-2 text-primary"></i>
          VeteranMeet
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/dashboard')}`} to="/dashboard">
                <i className="fas fa-home me-1"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/events')}`} to="/events">
                <i className="fas fa-calendar-alt me-1"></i> Events
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/create-event')}`} to="/create-event">
                <i className="fas fa-plus-circle me-1"></i> Create Event
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/profile')}`} to="/profile">
                <i className="fas fa-user me-1"></i> Profile
              </Link>
            </li>
            <li className="nav-item ms-lg-3">
              <button 
                className="btn btn-outline-danger btn-sm rounded-pill px-3"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-1"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
