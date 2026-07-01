import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { authService } from './services/api'

// Components
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import EventsList from './components/EventsList'
import CreateEvent from './components/CreateEvent'
import Profile from './components/Profile'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await authService.getCurrentUser()
          setUser(response.data)
        } catch (error) {
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        background: 'var(--bg-1)',
        color: 'var(--text-1)'
      }}>
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={setUser} />}
        />
        <Route
          path="/register"
          element={<Register onLoginSuccess={setUser} />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/events"
          element={user ? <EventsList /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-event"
          element={user ? <CreateEvent /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:userId"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={user ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App
