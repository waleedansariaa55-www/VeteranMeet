import React, { useState } from 'react'
import { eventService } from '../services/api'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'PublicTalk',
    location: { city: '' },
    startDate: '',
    endDate: '',
    hobbiesRequired: [],
    maxStars: 1000,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.maxStars > 5000) {
      setError('Maximum stars cannot exceed 5000')
      return
    }

    setLoading(true)
    setError('')
    try {
      console.log('Creating event with data:', formData)
      const response = await eventService.createEvent(formData)
      console.log('Event created:', response.data)
      setSuccess('Event created successfully! Redirecting...')
      setFormData({
        title: '',
        description: '',
        eventType: 'PublicTalk',
        location: { city: '' },
        startDate: '',
        endDate: '',
        hobbiesRequired: [],
        maxStars: 1000,
      })
      setTimeout(() => navigate('/events'), 2000)
    } catch (err) {
      console.error('Error creating event:', err)
      setError(err.response?.data?.message || 'Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  const getEventTypeIcon = (type) => {
    const icons = {
      'PublicTalk': '🎤',
      'MotivationalTalk': '💪',
      'ProfessionalTalk': '💼',
      'ProfessionalTask': '⚙️',
      'PlantationDrive': '🌱',
      'OrphanageVisit': '🏠',
      'HospitalVisit': '🏥',
      'RecreationalVisit': '🎢',
      'OldHomeVisit': '👴',
      'BookReading': '📚'
    }
    return icons[type] || '📅'
  }

  return (
    <div className="page-wrapper" style={{background: 'var(--bg-light)'}}>
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card" style={{border: 'none', borderRadius: 'var(--radius-xl)'}}>
              <div className="card-body" style={{padding: '2.5rem'}}>
                <div className="text-center mb-4">
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'var(--primary-light)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    margin: '0 auto 1.5rem'
                  }}>
                    {getEventTypeIcon(formData.eventType)}
                  </div>
                  <h2 className="fw-bold mb-2">Create New Event</h2>
                  <p className="text-muted">Organize a community service event and invite veterans</p>
                </div>
                
                {error && (
                  <div className="alert alert-danger">
                    <span>⚠️</span>
                    <span>{error}</span>
                  </div>
                )}
                {success && (
                  <div className="alert alert-success">
                    <span>✅</span>
                    <span>{success}</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label">Event Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="Give your event a catchy title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="4"
                      placeholder="Describe what this event is about..."
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label className="form-label">Event Type *</label>
                      <select
                        className="form-control"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                      >
                        <option value="PublicTalk">🎤 Public Talk</option>
                        <option value="MotivationalTalk">💪 Motivational Talk</option>
                        <option value="ProfessionalTalk">💼 Professional Talk</option>
                        <option value="ProfessionalTask">⚙️ Professional Task</option>
                        <option value="PlantationDrive">🌱 Plantation Drive</option>
                        <option value="OrphanageVisit">🏠 Orphanage Visit</option>
                        <option value="HospitalVisit">🏥 Hospital Visit</option>
                        <option value="RecreationalVisit">🎢 Recreational Visit</option>
                        <option value="OldHomeVisit">👴 Old Home Visit</option>
                        <option value="BookReading">📚 Book Reading</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-4">
                      <label className="form-label">City / Location *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        placeholder="Where will this event take place?"
                        value={formData.location.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label className="form-label">Start Date & Time *</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label className="form-label">End Date & Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Maximum Stars (1-5000) *</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{background: 'white', border: '2px solid #e2e8f0', borderRight: 'none'}}>⭐</span>
                      <input
                        type="number"
                        className="form-control"
                        name="maxStars"
                        min="1"
                        max="5000"
                        placeholder="Stars attendees will earn"
                        value={formData.maxStars}
                        onChange={handleChange}
                        required
                        style={{borderLeft: 'none'}}
                      />
                    </div>
                    <small className="text-muted">Stars earned by attendees cannot be changed after creation</small>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-3"
                    disabled={loading}
                    style={{fontSize: '1rem'}}
                  >
                    {loading ? (
                      <span>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Event...
                      </span>
                    ) : (
                      <span>🎯 Create Event</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{marginTop: 'auto'}}>
        <div className="container">
          <div className="footer-bottom" style={{borderTop: 'none', paddingTop: '0'}}>
            <p>&copy; 2025 VeteranMeet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CreateEvent
