import React, { useState } from 'react'
import { authService } from '../services/api'
import { useNavigate } from 'react-router-dom'

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await authService.login(formData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.user._id)
      localStorage.setItem('userName', response.data.user.name)
      localStorage.setItem('isAdmin', response.data.user.isAdmin || false)
      onLoginSuccess(response.data.user)
      // Redirect after a short delay to ensure state updates
      setTimeout(() => {
        if (response.data.user.isAdmin) {
          navigate('/admin')
        } else {
          navigate('/dashboard')
        }
      }, 100)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="floating-shapes">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <div className="auth-card animate-slideUp">
        <div className="auth-header">
          <div className="logo">🎖️ VeteranMeet</div>
          <h2>Welcome Back!</h2>
          <p>Sign in to continue your journey</p>
        </div>
        
        {error && (
          <div className="alert alert-danger">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={togglePasswordVisibility}
                style={{minWidth: '90px'}}
              >
                {showPassword ? '🙈 Hide' : '👁️ Show'}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-100 py-3 fw-600"
            disabled={loading}
            style={{fontSize: '1rem'}}
          >
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing in...
              </span>
            ) : (
              <span>🚀 Sign In</span>
            )}
          </button>
        </form>
        
        <div className="divider"></div>
        
        <p className="text-center text-muted mb-0">
          Don't have an account?{' '}
          <a 
            href="/register" 
            className="fw-600"
            style={{color: 'var(--primary-1)', textDecoration: 'none'}}
          >
            Create one now →
          </a>
        </p>
        
        <p className="text-center mt-3">
          <a 
            href="/" 
            className="text-muted"
            style={{fontSize: '0.9rem', textDecoration: 'none'}}
          >
            ← Back to Home
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
