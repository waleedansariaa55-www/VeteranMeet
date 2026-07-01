import React, { useState, useEffect } from 'react'
import { eventService, userService } from '../services/api'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function EventsList() {
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState({ city: '', eventType: '' })
  const [loading, setLoading] = useState(false)
  const [followingUsers, setFollowingUsers] = useState(new Set())
  const navigate = useNavigate()
  const currentUserId = localStorage.getItem('userId')

  useEffect(() => {
    fetchEvents()
  }, [filter])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const response = await eventService.getEvents(filter)
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
    setLoading(false)
  }

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const handleMarkInterested = async (eventId) => {
    try {
      await eventService.markInterested(eventId)
      alert('Marked as interested!')
      fetchEvents()
    } catch (error) {
      alert('Error marking as interested')
    }
  }

  const handleAttendEvent = async (eventId) => {
    try {
      const response = await eventService.attendEvent(eventId)
      alert(`You attended! Stars earned: ${response.data.userStars}`)
      fetchEvents()
    } catch (error) {
      alert('Error attending event')
    }
  }

  const handleFollowCreator = async (creatorId) => {
    try {
      if (followingUsers.has(creatorId)) {
        await userService.unfollowUser(currentUserId, creatorId)
        setFollowingUsers((prev) => {
          const newSet = new Set(prev)
          newSet.delete(creatorId)
          return newSet
        })
      } else {
        await userService.followUser(currentUserId, creatorId)
        setFollowingUsers((prev) => new Set(prev).add(creatorId))
      }
    } catch (error) {
      console.error('Error toggling follow:', error)
      alert(error.response?.data?.message || 'Failed to toggle follow')
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
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold mb-1">📅 Community Events</h2>
            <p className="text-muted mb-0">Discover and join events near you</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/create-event')}
          >
            ➕ Create Event
          </button>
        </div>

        {/* Filters */}
        <div className="card mb-4" style={{border: 'none'}}>
          <div className="card-body" style={{padding: '1.5rem'}}>
            <h6 className="fw-bold mb-3">🔍 Filter Events</h6>
            <div className="row g-3">
              <div className="col-md-5">
                <div className="input-group">
                  <span className="input-group-text" style={{background: 'white', border: '2px solid #e2e8f0', borderRight: 'none'}}>📍</span>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder="Filter by city..."
                    value={filter.city}
                    onChange={handleFilterChange}
                    style={{borderLeft: 'none'}}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <select
                  className="form-control"
                  name="eventType"
                  value={filter.eventType}
                  onChange={handleFilterChange}
                >
                  <option value="">🎯 All Event Types</option>
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
              <div className="col-md-2">
                <button 
                  className="btn btn-outline-secondary w-100"
                  onClick={() => setFilter({ city: '', eventType: '' })}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="loading-spinner">
            <span>Loading events...</span>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-5">
            <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📭</div>
            <h4 className="fw-bold mb-2">No Events Found</h4>
            <p className="text-muted mb-4">Try adjusting your filters or create a new event</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/create-event')}
            >
              Create an Event
            </button>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div className="event-card card-shadow" key={event._id}>
                <div className="card-body">
                  {/* Event Type Badge */}
                  <span className="event-type-badge">
                    {getEventTypeIcon(event.eventType)} {event.eventType}
                  </span>
                  
                  <h5 className="card-title">{event.title}</h5>
                  
                  {/* Creator Info */}
                  {event.createdBy && (
                    <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{borderBottom: '1px solid rgba(0,0,0,0.05)'}}>
                      <div>
                        <a 
                          href={`/profile/${event.createdBy._id}`}
                          className="text-decoration-none fw-600"
                          style={{color: 'var(--primary-1)'}}
                        >
                          {event.createdBy.name}
                        </a>
                        <p className="text-muted mb-0" style={{fontSize: '0.85rem'}}>
                          {event.createdBy.profession || 'Veteran'}
                        </p>
                      </div>
                      {event.createdBy._id !== currentUserId && (
                        <button
                          className={`btn btn-sm ${
                            followingUsers.has(event.createdBy._id)
                              ? 'btn-outline-danger'
                              : 'btn-outline-primary'
                          }`}
                          onClick={() => handleFollowCreator(event.createdBy._id)}
                        >
                          {followingUsers.has(event.createdBy._id) ? 'Unfollow' : '+ Follow'}
                        </button>
                      )}
                    </div>
                  )}
                  
                  <p className="card-text text-muted" style={{fontSize: '0.95rem'}}>
                    {event.description?.substring(0, 120)}{event.description?.length > 120 ? '...' : ''}
                  </p>
                  
                  {/* Event Meta */}
                  <div className="event-meta">
                    <span className="event-meta-item">
                      📍 {event.location?.city || 'N/A'}
                    </span>
                    <span className="event-meta-item">
                      📅 {new Date(event.startDate).toLocaleDateString()}
                    </span>
                    <span className="event-meta-item">
                      ⭐ {event.currentStars || 0}/{event.maxStars}
                    </span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="d-flex gap-2 mt-4">
                    <button
                      className="btn btn-outline-primary flex-grow-1"
                      onClick={() => handleMarkInterested(event._id)}
                    >
                      ❤️ Interested
                    </button>
                    <button
                      className="btn btn-primary flex-grow-1"
                      onClick={() => handleAttendEvent(event._id)}
                    >
                      ✅ Attend
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default EventsList
