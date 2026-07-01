import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="page-wrapper">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light sticky-top glass-nav">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
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
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#events">Events</a>
              </li>
              <li className="nav-item ms-lg-3">
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="floating-shapes">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="hero-inner">
          <h1 className="display-4 fw-bold mb-4">
            Connect, Engage & Make a<br />
            <span style={{color: '#ffd700'}}>Difference Together</span>
          </h1>
          <p className="lead mb-4">
            VeteranMeet brings retired professionals together to share wisdom, 
            engage in community services, and create lasting impact through meaningful connections.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button
              className="btn btn-light btn-lg"
              onClick={() => navigate('/register')}
            >
              🚀 Join the Community
            </button>
            <button
              className="btn btn-outline-light btn-lg"
              onClick={() => navigate('/login')}
            >
              Already a Member?
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section section-light">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-value">10K+</div>
                <div className="stat-label">Active Veterans</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-value">500+</div>
                <div className="stat-label">Events Hosted</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-card">
                <div className="stat-icon">🏢</div>
                <div className="stat-value">200+</div>
                <div className="stat-label">Organizations</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-value">1M+</div>
                <div className="stat-label">Stars Earned</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section section-gradient">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title center" style={{display: 'inline-block'}}>Why Choose VeteranMeet?</h2>
            <p className="lead mt-4">Empowering retired professionals to stay connected and contribute to society</p>
          </div>
          <div className="row g-4 stagger-animation">
            <div className="col-md-4">
              <div className="feature-card h-100">
                <div className="icon">🤝</div>
                <h5>Connect & Network</h5>
                <p>
                  Build meaningful connections with fellow veterans and professionals. 
                  Follow others, share experiences, and grow your network.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card h-100">
                <div className="icon">🎯</div>
                <h5>Engage in Events</h5>
                <p>
                  Participate in community services based on your interests - 
                  from motivational talks to plantation drives and more.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card h-100">
                <div className="icon">⭐</div>
                <h5>Earn & Grow</h5>
                <p>
                  Collect stars by attending events and unlock prestigious veteran 
                  categories from Silver to Eternal Sage.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card h-100">
                <div className="icon">📍</div>
                <h5>Local Events</h5>
                <p>
                  Discover events happening near you. Filter by city, type, 
                  and interests to find the perfect opportunity.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card h-100">
                <div className="icon">📢</div>
                <h5>Create & Lead</h5>
                <p>
                  Organize your own community service events and invite 
                  followers to join your initiatives.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card h-100">
                <div className="icon">🏆</div>
                <h5>Recognition</h5>
                <p>
                  Get recognized for your contributions with badges, 
                  veteran categories, and community appreciation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Types Section */}
      <section id="events" className="section section-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title center" style={{display: 'inline-block'}}>Community Service Events</h2>
            <p className="lead mt-4">Diverse opportunities to make a difference</p>
          </div>
          <div className="row g-3">
            {[
              { icon: '🎤', title: 'Public Talks', desc: 'General meetups and discussions' },
              { icon: '💪', title: 'Motivational Talks', desc: 'Inspire students and employees' },
              { icon: '💼', title: 'Professional Talks', desc: 'Share industry expertise' },
              { icon: '🌱', title: 'Plantation Drives', desc: 'Environmental initiatives' },
              { icon: '🏠', title: 'Orphanage Visits', desc: 'Support children in need' },
              { icon: '🏥', title: 'Hospital Visits', desc: 'Comfort patients' },
              { icon: '🎢', title: 'Recreational Visits', desc: 'Fun trips and outings' },
              { icon: '👴', title: 'Old Home Visits', desc: 'Care for the elderly' },
              { icon: '📚', title: 'Book Reading', desc: 'Literary discussions' },
              { icon: '⚙️', title: 'Professional Tasks', desc: 'Mentoring and consulting' },
            ].map((event, idx) => (
              <div className="col-6 col-md-4 col-lg-3" key={idx}>
                <div className="card card-shadow h-100" style={{textAlign: 'center', padding: '1.5rem 1rem'}}>
                  <div style={{fontSize: '2.5rem', marginBottom: '0.75rem'}}>{event.icon}</div>
                  <h6 className="fw-bold mb-1">{event.title}</h6>
                  <small className="text-muted">{event.desc}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Veteran Categories Section */}
      <section className="section" style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white'}}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title center" style={{display: 'inline-block', color: 'white'}}>Veteran Categories</h2>
            <p className="lead mt-4" style={{color: 'rgba(255,255,255,0.7)'}}>Climb the ranks as you contribute to the community</p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { name: 'Silver Veteran', stars: '25,000', gradient: 'linear-gradient(135deg, #c0c0c0, #e8e8e8)' },
              { name: 'Ruby Veteran', stars: '40,000', gradient: 'linear-gradient(135deg, #e0115f, #ff6b6b)' },
              { name: 'Golden Veteran', stars: '50,000', gradient: 'linear-gradient(135deg, #ffd700, #ffed4e)' },
              { name: 'Diamond Veteran', stars: '60,000', gradient: 'linear-gradient(135deg, #b9f2ff, #00d4ff)' },
              { name: 'Sapphire Veteran', stars: '65,000', gradient: 'linear-gradient(135deg, #0f52ba, #5f9ea0)' },
              { name: 'Platinum Veteran', stars: '70,000', gradient: 'linear-gradient(135deg, #e5e4e2, #a8a8a8)' },
              { name: 'Eternal Sage', stars: '100,000', gradient: 'linear-gradient(135deg, #ff00ff, #00ffff)' },
            ].map((cat, idx) => (
              <div className="col-6 col-md-4 col-lg-3" key={idx}>
                <div className="card" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', padding: '1.5rem'}}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: cat.gradient,
                    borderRadius: '50%',
                    margin: '0 auto 1rem',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                  }}></div>
                  <h6 className="fw-bold mb-1" style={{color: 'white'}}>{cat.name}</h6>
                  <small style={{color: 'rgba(255,255,255,0.6)'}}>⭐ {cat.stars} stars</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gradient">
        <div className="container">
          <div className="text-center" style={{maxWidth: '700px', margin: '0 auto'}}>
            <h2 className="mb-4">Ready to Make a Difference?</h2>
            <p className="lead mb-4">
              Join thousands of veterans who are already connecting, 
              engaging, and creating positive impact in their communities.
            </p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/register')}
            >
              🎖️ Join VeteranMeet Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="footer-brand">🎖️ VeteranMeet</div>
              <p className="footer-text">
                Connecting retired professionals to engage in community services 
                and make a lasting impact together.
              </p>
              <div className="social-links">
                <a href="#"><span>📘</span></a>
                <a href="#"><span>🐦</span></a>
                <a href="#"><span>💼</span></a>
                <a href="#"><span>📸</span></a>
              </div>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="fw-bold mb-3">Platform</h6>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="/register">Join Now</a></li>
              </ul>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="fw-bold mb-3">Community</h6>
              <ul className="footer-links">
                <li><a href="#">Veterans</a></li>
                <li><a href="#">Organizations</a></li>
                <li><a href="#">NGOs</a></li>
              </ul>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="fw-bold mb-3">Support</h6>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="fw-bold mb-3">Legal</h6>
              <ul className="footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 VeteranMeet. All rights reserved. Made with ❤️ for veterans.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
