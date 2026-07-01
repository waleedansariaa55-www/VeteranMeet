import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userService } from '../services/api'
import Navbar from './Navbar'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const { userId } = useParams()
  const navigate = useNavigate()
  const currentUserId = localStorage.getItem('userId')
  const isOwnProfile = !userId || userId === currentUserId

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = userId || currentUserId
        console.log('Fetching profile for ID:', id)
        const response = await userService.getProfile(id)
        console.log('Profile fetched:', response.data)
        setProfile(response.data)
        
        // Check if current user is following this user
        if (!isOwnProfile && response.data.followers) {
          setIsFollowing(
            response.data.followers.some((f) => f._id === currentUserId)
          )
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError(err.response?.data?.message || err.message || 'Failed to load profile')
      }
      setLoading(false)
    }

    fetchProfile()
  }, [userId, currentUserId, isOwnProfile])

  const handleFollowToggle = async () => {
    if (isOwnProfile || !profile) return

    setActionLoading(true)
    try {
      if (isFollowing) {
        await userService.unfollowUser(currentUserId, profile._id)
        setIsFollowing(false)
        setProfile({
          ...profile,
          followers: profile.followers.filter((f) => f._id !== currentUserId),
        })
      } else {
        await userService.followUser(currentUserId, profile._id)
        setIsFollowing(true)
        setProfile({
          ...profile,
          followers: [...profile.followers, { _id: currentUserId }],
        })
      }
    } catch (err) {
      console.error('Error toggling follow:', err)
      alert(err.response?.data?.message || 'Failed to toggle follow')
    }
    setActionLoading(false)
  }

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

  if (loading) return (
    <div className="page-wrapper" style={{background: 'var(--bg-light)'}}>
      <div className="loading-spinner" style={{minHeight: '100vh'}}>
        <span>Loading profile...</span>
      </div>
    </div>
  )
  
  if (error) return (
    <div className="page-wrapper" style={{background: 'var(--bg-light)'}}>
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    </div>
  )
  
  if (!profile) return (
    <div className="page-wrapper" style={{background: 'var(--bg-light)'}}>
      <div className="container py-5 text-center">
        <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🔍</div>
        <h4>Profile not found</h4>
      </div>
    </div>
  )

  const category = getVeteranCategory(profile.stars || 0)

  return (
    <div className="page-wrapper" style={{background: 'var(--bg-light)'}}>
      <Navbar />

      {/* Profile Header */}
      <div className="profile-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="profile-avatar">
                {profile.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="col">
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <h2 className="mb-0" style={{color: 'white'}}>{profile.name}</h2>
                {!isOwnProfile && (
                  <button
                    className={`btn ${isFollowing ? 'btn-outline-light' : 'btn-light'}`}
                    onClick={handleFollowToggle}
                    disabled={actionLoading}
                  >
                    {actionLoading ? 'Loading...' : isFollowing ? 'Unfollow' : '+ Follow'}
                  </button>
                )}
              </div>
              <p className="mb-2" style={{color: 'rgba(255,255,255,0.8)'}}>
                @{profile.username || profile.name?.toLowerCase().replace(/\s/g, '')} • {profile.userType}
              </p>
              {profile.profession && (
                <p className="mb-0" style={{color: 'rgba(255,255,255,0.9)'}}>
                  💼 {profile.profession}
                </p>
              )}
            </div>
          </div>
          
          {/* Profile Stats */}
          <div className="profile-stats">
            <div className="profile-stat-item">
              <span className="value">⭐ {profile.stars || 0}</span>
              <span className="label">Stars</span>
            </div>
            <div className="profile-stat-item">
              <span className="value">{profile.followers?.length || 0}</span>
              <span className="label">Followers</span>
            </div>
            <div className="profile-stat-item">
              <span className="value">{profile.following?.length || 0}</span>
              <span className="label">Following</span>
            </div>
            <div className="profile-stat-item">
              <span className="value">{profile.eventsAttended?.length || 0}</span>
              <span className="label">Events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Main Info */}
          <div className="col-lg-8">
            <div className="card" style={{border: 'none'}}>
              <div className="card-body" style={{padding: '2rem'}}>
                <h5 className="fw-bold mb-4">👤 Profile Information</h5>
                
                <div className="row mb-4">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="text-muted" style={{fontSize: '0.85rem'}}>Email</label>
                    <p className="mb-0 fw-500">{profile.email}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted" style={{fontSize: '0.85rem'}}>Location</label>
                    <p className="mb-0 fw-500">📍 {profile.location?.city || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="row mb-4">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="text-muted" style={{fontSize: '0.85rem'}}>User Type</label>
                    <p className="mb-0 fw-500 text-capitalize">{profile.userType}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted" style={{fontSize: '0.85rem'}}>Veteran Category</label>
                    <p className="mb-0">
                      {profile.veteranCategory ? (
                        <span className={`stars-badge ${category.class}`}>
                          {category.icon} {profile.veteranCategory}
                        </span>
                      ) : (
                        <span className="text-muted">Not yet categorized</span>
                      )}
                    </p>
                  </div>
                </div>

                {profile.bio && (
                  <div className="mb-4">
                    <label className="text-muted" style={{fontSize: '0.85rem'}}>Bio</label>
                    <p className="mb-0">{profile.bio}</p>
                  </div>
                )}

                <div>
                  <label className="text-muted mb-2 d-block" style={{fontSize: '0.85rem'}}>Hobbies & Interests</label>
                  <div className="d-flex flex-wrap gap-2">
                    {profile.hobbies && profile.hobbies.length > 0 ? (
                      profile.hobbies.map((hobby, idx) => (
                        <span key={idx} className="hobby-tag">
                          {hobby}
                        </span>
                      ))
                    ) : (
                      <p className="text-muted mb-0">No hobbies added yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Stats Card */}
            <div className="card mb-4" style={{border: 'none'}}>
              <div className="card-body" style={{padding: '2rem'}}>
                <h5 className="fw-bold mb-4">📊 Activity Stats</h5>
                
                <div className="d-flex justify-content-between align-items-center py-3" style={{borderBottom: '1px solid rgba(0,0,0,0.05)'}}>
                  <span className="text-muted">Events Created</span>
                  <span className="fw-bold">{profile.eventsCreated?.length || 0}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center py-3" style={{borderBottom: '1px solid rgba(0,0,0,0.05)'}}>
                  <span className="text-muted">Events Attended</span>
                  <span className="fw-bold">{profile.eventsAttended?.length || 0}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center py-3" style={{borderBottom: '1px solid rgba(0,0,0,0.05)'}}>
                  <span className="text-muted">Total Stars</span>
                  <span className="fw-bold" style={{color: 'var(--warning)'}}>⭐ {profile.stars || 0}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center py-3">
                  <span className="text-muted">Member Since</span>
                  <span className="fw-bold">
                    {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {isOwnProfile && (
              <div className="card" style={{border: 'none'}}>
                <div className="card-body" style={{padding: '2rem'}}>
                  <h5 className="fw-bold mb-4">⚡ Quick Actions</h5>
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate('/events')}
                    >
                      🔍 Browse Events
                    </button>
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => navigate('/create-event')}
                    >
                      ➕ Create Event
                    </button>
                  </div>
                </div>
              </div>
            )}
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

export default Profile
