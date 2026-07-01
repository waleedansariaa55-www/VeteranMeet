import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats')
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [editingEvent, setEditingEvent] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchAdminData()
  }, [activeTab])

  const fetchAdminData = async () => {
    setLoading(true)
    setError('')
    try {
      if (activeTab === 'stats') {
        const response = await api.get('/admin/stats')
        setStats(response.data)
      } else if (activeTab === 'users') {
        const response = await api.get('/admin/users')
        setUsers(response.data)
      } else if (activeTab === 'events') {
        const response = await api.get('/admin/events')
        setEvents(response.data)
      }
    } catch (err) {
      console.error('Error fetching admin data:', err)
      setError(err.response?.data?.message || 'Failed to fetch data')
      if (err.response?.status === 403) {
        alert('You do not have admin access')
        navigate('/dashboard')
      }
    }
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/login')
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${userId}`)
        alert('User deleted successfully')
        fetchAdminData()
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting user')
      }
    }
  }

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/admin/events/${eventId}`)
        alert('Event deleted successfully')
        fetchAdminData()
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting event')
      }
    }
  }

  const handleSaveUser = async () => {
    if (!editingUser) return
    try {
      await api.put(`/admin/users/${editingUser._id}`, editingUser)
      alert('User updated successfully')
      setEditingUser(null)
      fetchAdminData()
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating user')
    }
  }

  const handleSaveEvent = async () => {
    if (!editingEvent) return
    try {
      await api.put(`/admin/events/${editingEvent._id}`, editingEvent)
      alert('Event updated successfully')
      setEditingEvent(null)
      fetchAdminData()
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating event')
    }
  }

  return (
    <div className="page-wrapper" style={{background: 'var(--bg-light)', minHeight: '100vh'}}>
      {/* Admin Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top" style={{ 
        background: 'rgba(15, 23, 42, 0.85)', 
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div className="container-fluid" style={{maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem'}}>
          <Link className="navbar-brand" to="/admin" style={{color: 'white', fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.5rem'}}>
            🛡️ VeteranMeet Admin
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={{borderColor: 'rgba(255,255,255,0.3)'}}
          >
            <span className="navbar-toggler-icon" style={{filter: 'invert(1)'}}></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard" style={{color: 'rgba(255,255,255,0.7)'}}>
                  <i className="fas fa-arrow-left me-1"></i> Back to App
                </Link>
              </li>
              <li className="nav-item ms-3">
                <button
                  className="btn btn-outline-danger btn-sm rounded-pill px-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <div className="container-fluid py-4" style={{maxWidth: '1400px', margin: '0 auto'}}>
        {error && (
          <div className="alert alert-danger">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="card mb-4" style={{border: 'none', borderRadius: 'var(--radius-lg)'}}>
          <div className="card-body" style={{padding: '1rem'}}>
            <div className="d-flex gap-2 flex-wrap">
              <button
                className={`btn ${activeTab === 'stats' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('stats')}
                style={{borderRadius: 'var(--radius-md)'}}
              >
                📊 Statistics
              </button>
              <button
                className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('users')}
                style={{borderRadius: 'var(--radius-md)'}}
              >
                👥 Users
              </button>
              <button
                className={`btn ${activeTab === 'events' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('events')}
                style={{borderRadius: 'var(--radius-md)'}}
              >
                📅 Events
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <span>Loading data...</span>
          </div>
        ) : (
          <>
            {/* Statistics Tab */}
            {activeTab === 'stats' && stats && (
              <div className="row g-4">
                <div className="col-6 col-lg-3">
                  <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-value">{stats.totalUsers}</div>
                    <div className="stat-label">Total Users</div>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="stat-card">
                    <div className="stat-icon">🎖️</div>
                    <div className="stat-value">{stats.totalVeterans}</div>
                    <div className="stat-label">Veterans</div>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="stat-card">
                    <div className="stat-icon">🏢</div>
                    <div className="stat-value">{stats.totalOrganizations}</div>
                    <div className="stat-label">Organizations</div>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="stat-card">
                    <div className="stat-icon">🤝</div>
                    <div className="stat-value">{stats.totalNGOs}</div>
                    <div className="stat-label">NGOs</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-value">{stats.totalEvents}</div>
                    <div className="stat-label">Total Events</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-value">{stats.activeEvents}</div>
                    <div className="stat-label">Active Events</div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="card" style={{border: 'none', borderRadius: 'var(--radius-lg)'}}>
                <div className="card-body" style={{padding: '2rem'}}>
                  <h4 className="fw-bold mb-4">👥 User Management</h4>
                  <div className="table-responsive">
                    <table className="table table-hover" style={{borderCollapse: 'separate', borderSpacing: '0 0.5rem'}}>
                      <thead>
                        <tr style={{background: 'var(--bg-light-2)'}}>
                          <th style={{border: 'none', padding: '1rem', borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)'}}>Name</th>
                          <th style={{border: 'none', padding: '1rem'}}>Email</th>
                          <th style={{border: 'none', padding: '1rem'}}>Type</th>
                          <th style={{border: 'none', padding: '1rem'}}>Stars</th>
                          <th style={{border: 'none', padding: '1rem'}}>Admin</th>
                          <th style={{border: 'none', padding: '1rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0'}}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id} style={{background: 'white', boxShadow: 'var(--shadow-sm)'}}>
                            <td style={{border: 'none', padding: '1rem', borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)'}}>
                              <span className="fw-600">{user.name}</span>
                            </td>
                            <td style={{border: 'none', padding: '1rem'}} className="text-muted">{user.email}</td>
                            <td style={{border: 'none', padding: '1rem'}}>
                              <span className="badge bg-primary" style={{textTransform: 'capitalize'}}>
                                {user.userType}
                              </span>
                            </td>
                            <td style={{border: 'none', padding: '1rem'}}>
                              <span style={{color: 'var(--warning)'}}>⭐ {user.stars || 0}</span>
                            </td>
                            <td style={{border: 'none', padding: '1rem'}}>
                              <span className={`badge ${user.isAdmin ? 'bg-danger' : 'bg-secondary'}`}>
                                {user.isAdmin ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td style={{border: 'none', padding: '1rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0'}}>
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => setEditingUser(user)}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteUser(user._id)}
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="card" style={{border: 'none', borderRadius: 'var(--radius-lg)'}}>
                <div className="card-body" style={{padding: '2rem'}}>
                  <h4 className="fw-bold mb-4">📅 Event Management</h4>
                  <div className="table-responsive">
                    <table className="table table-hover" style={{borderCollapse: 'separate', borderSpacing: '0 0.5rem'}}>
                      <thead>
                        <tr style={{background: 'var(--bg-light-2)'}}>
                          <th style={{border: 'none', padding: '1rem', borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)'}}>Title</th>
                          <th style={{border: 'none', padding: '1rem'}}>Type</th>
                          <th style={{border: 'none', padding: '1rem'}}>Created By</th>
                          <th style={{border: 'none', padding: '1rem'}}>City</th>
                          <th style={{border: 'none', padding: '1rem'}}>Status</th>
                          <th style={{border: 'none', padding: '1rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0'}}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event) => (
                          <tr key={event._id} style={{background: 'white', boxShadow: 'var(--shadow-sm)'}}>
                            <td style={{border: 'none', padding: '1rem', borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)'}}>
                              <span className="fw-600">{event.title}</span>
                            </td>
                            <td style={{border: 'none', padding: '1rem'}}>
                              <span className="badge bg-info">{event.eventType}</span>
                            </td>
                            <td style={{border: 'none', padding: '1rem'}} className="text-muted">
                              {event.createdBy?.name || 'Unknown'}
                            </td>
                            <td style={{border: 'none', padding: '1rem'}}>📍 {event.location?.city || 'N/A'}</td>
                            <td style={{border: 'none', padding: '1rem'}}>
                              <span className={`badge ${event.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                {event.isActive ? '✅ Active' : '❌ Inactive'}
                              </span>
                            </td>
                            <td style={{border: 'none', padding: '1rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0'}}>
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => setEditingEvent(event)}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteEvent(event._id)}
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{borderRadius: 'var(--radius-xl)', border: 'none'}}>
              <div className="modal-header" style={{borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '1.5rem'}}>
                <h5 className="modal-title fw-bold">✏️ Edit User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingUser(null)}
                ></button>
              </div>
              <div className="modal-body" style={{padding: '1.5rem'}}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">User Type</label>
                  <select
                    className="form-control"
                    value={editingUser.userType}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        userType: e.target.value,
                      })
                    }
                  >
                    <option value="veteran">👤 Veteran</option>
                    <option value="organization">🏢 Organization</option>
                    <option value="ngo">🤝 NGO</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Stars</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editingUser.stars || 0}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        stars: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="form-check" style={{
                  background: editingUser.isAdmin ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-light-2)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isAdmin"
                    checked={editingUser.isAdmin}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        isAdmin: e.target.checked,
                      })
                    }
                  />
                  <label className="form-check-label fw-600" htmlFor="isAdmin">
                    🛡️ Administrator Access
                  </label>
                </div>
              </div>
              <div className="modal-footer" style={{borderTop: '1px solid rgba(0,0,0,0.05)', padding: '1.5rem'}}>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveUser}
                >
                  💾 Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{borderRadius: 'var(--radius-xl)', border: 'none'}}>
              <div className="modal-header" style={{borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '1.5rem'}}>
                <h5 className="modal-title fw-bold">✏️ Edit Event</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingEvent(null)}
                ></button>
              </div>
              <div className="modal-body" style={{padding: '1.5rem'}}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingEvent.title}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Event Type</label>
                  <select
                    className="form-control"
                    value={editingEvent.eventType}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        eventType: e.target.value,
                      })
                    }
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
                <div className="form-check" style={{
                  background: editingEvent.isActive ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-light-2)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isActive"
                    checked={editingEvent.isActive}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        isActive: e.target.checked,
                      })
                    }
                  />
                  <label className="form-check-label fw-600" htmlFor="isActive">
                    ✅ Event is Active
                  </label>
                </div>
              </div>
              <div className="modal-footer" style={{borderTop: '1px solid rgba(0,0,0,0.05)', padding: '1.5rem'}}>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setEditingEvent(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveEvent}
                >
                  💾 Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
