import React, { useState } from 'react'
import { authService } from '../services/api'
import { useNavigate } from 'react-router-dom'

function Register({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    username: '',
    userType: 'veteran',
    profession: '',
    hobbies: [],
    location: { city: '' },
  })
  const [hobbyInput, setHobbyInput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'city') {
      setFormData({
        ...formData,
        location: { ...formData.location, city: value },
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const addHobby = () => {
    if (hobbyInput.trim() && !formData.hobbies.includes(hobbyInput.trim())) {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, hobbyInput.trim()],
      })
      setHobbyInput('')
    }
  }

  const removeHobby = (hobby) => {
    setFormData({
      ...formData,
      hobbies: formData.hobbies.filter((h) => h !== hobby),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await authService.register(formData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.user._id)
      localStorage.setItem('userName', response.data.user.name)
      onLoginSuccess(response.data.user)
      // Redirect after a short delay to ensure state updates
      setTimeout(() => {
        navigate('/dashboard')
      }, 100)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
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
      
      <div className="auth-card wide animate-slideUp">
        <div className="auth-header">
          <div className="logo">🎖️ VeteranMeet</div>
          <h2>Create Your Account</h2>
          <p>Join our community of veterans and professionals</p>
        </div>
        
        {error && (
          <div className="alert alert-danger">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Username *</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                minLength="3"
                required
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Email Address *</label>
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
            <div className="col-md-6 mb-3">
              <label className="form-label">Account Type *</label>
              <select
                className="form-control"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="veteran">👤 Veteran</option>
                <option value="organization">🏢 Organization</option>
                <option value="ngo">🤝 NGO</option>
              </select>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Password *</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{minWidth: '80px'}}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Profession</label>
              <input
                type="text"
                className="form-control"
                name="profession"
                placeholder="e.g., Retired Engineer"
                value={formData.profession}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">City / Location</label>
              <input
                type="text"
                className="form-control"
                name="city"
                placeholder="Enter your city"
                value={formData.location.city}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="form-label">Hobbies & Interests</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Add a hobby (e.g., Book Reading, Gardening)"
                value={hobbyInput}
                onChange={(e) => setHobbyInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addHobby()
                  }
                }}
              />
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={addHobby}
              >
                + Add
              </button>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {formData.hobbies.map((hobby, idx) => (
                <span key={idx} className="hobby-tag">
                  {hobby}
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeHobby(hobby)}
                  >
                    ✕
                  </button>
                </span>
              ))}
              {formData.hobbies.length === 0 && (
                <span className="text-muted" style={{fontSize: '0.9rem'}}>
                  No hobbies added yet. Add some to find relevant events!
                </span>
              )}
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
                Creating account...
              </span>
            ) : (
              <span>🎖️ Create Account</span>
            )}
          </button>
        </form>
        
        <div className="divider"></div>
        
        <p className="text-center text-muted mb-0">
          Already have an account?{' '}
          <a 
            href="/login" 
            className="fw-600"
            style={{color: 'var(--primary-1)', textDecoration: 'none'}}
          >
            Sign in here →
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

export default Register
