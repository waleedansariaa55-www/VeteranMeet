import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function Dashboard({ user }) {
  const navigate = useNavigate()

  const getVeteranCategory = (stars) => {
    if (stars >= 100000) return { name: 'Eternal Sage', class: 'eternal', icon: '👑' }
    if (stars >= 70000) return { name: 'Platinum Veteran', class: 'platinum', icon: '💎' }
    if (stars >= 65000) return { name: 'Sapphire Veteran', class: 'sapphire', icon: '💠' }
    if (stars >= 60000) return { name: 'Diamond Veteran', class: 'diamond', icon: '💍' }
    if (stars >= 50000) return { name: 'Golden Veteran', class: 'gold', icon: '🏆' }
    if (stars >= 40000) return { name: 'Ruby Veteran', class: 'ruby', icon: '❤️' }
    if (stars >= 25000) return { name: 'Silver Veteran', class: 'silver', icon: '🥈' }
    return { name: 'Rising Star', class: '', icon: '⭐' }
  }

  const category = getVeteranCategory(user?.stars || 0)

  return (
    <div className="page-wrapper" style={{background: 'var(--bg-light)'}}>
      <Navbar user={user} />

      {/* Dashboard Content */}
      <div className="container" style={{padding: '2rem 1rem'}}>
        {/* Welcome Card */}
        <div className="dashboard-welcome mb-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="mb-2">Welcome back, {user?.name}! 👋</h2>
              <p className="mb-0" style={{opacity: 0.9}}>
                You're logged in as <span className="badge bg-light text-dark">{user?.userType}</span>
                {user?.profession && <span> • {user.profession}</span>}
              </p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <div className="d-inline-block text-center" style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem 1.5rem'
              }}>
                <div style={{fontSize: '2.5rem', marginBottom: '0.25rem'}}>
                  {user?.stars || 0} ⭐
                </div>
                {user?.veteranCategory && (
                  <span className={`stars-badge ${category.class}`} style={{fontSize: '0.8rem'}}>
                    {category.icon} {user.veteranCategory}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">{user?.stars || 0}</div>
              <div className="stat-label">Total Stars</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-value">{user?.eventsAttended?.length || 0}</div>
              <div className="stat-label">Events Attended</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-value">{user?.eventsCreated?.length || 0}</div>
              <div className="stat-label">Events Created</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">{user?.followers?.length || 0}</div>
              <div className="stat-label">Followers</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h4 className="fw-bold mb-4">Quick Actions</h4>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="quick-action-card">
              <div className="icon">🔍</div>
              <h5>Browse Events</h5>
              <p>Find and join community service events near you</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/events')}
              >
                Explore Events
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="quick-action-card">
              <div className="icon">➕</div>
              <h5>Create Event</h5>
              <p>Organize a new community service and invite others</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/create-event')}
              >
                Create Now
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="quick-action-card">
              <div className="icon">👤</div>
              <h5>View Profile</h5>
              <p>Manage your profile, hobbies, and settings</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/profile/${user?._id}`)}
              >
                My Profile
              </button>
            </div>
          </div>
        </div>

        {/* Progress to Next Category */}
        {user?.stars < 100000 && (
          <div className="card mt-4" style={{border: 'none'}}>
            <div className="card-body" style={{padding: '2rem'}}>
              <h5 className="fw-bold mb-3">🎯 Progress to Next Category</h5>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Current: {category.name}</span>
                <span className="fw-600">{user?.stars || 0} stars</span>
              </div>
              <div style={{
                height: '12px',
                background: 'var(--bg-light-2)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(((user?.stars || 0) / 25000) * 100, 100)}%`,
                  background: 'var(--primary-gradient)',
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
              <p className="text-muted mt-2 mb-0" style={{fontSize: '0.9rem'}}>
                Keep attending events to earn more stars and unlock new categories!
              </p>
            </div>
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

export default Dashboard
