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

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
}

export const userService = {
  getProfile: (userId) => api.get(`/users/${userId}`),
  updateProfile: (userId, data) => api.put(`/users/${userId}`, data),
  followUser: (userId, followId) => api.post(`/users/${userId}/follow/${followId}`),
  unfollowUser: (userId, followId) => api.post(`/users/${userId}/unfollow/${followId}`),
  searchUsers: (params) => api.get('/users/search', { params }),
}

export const eventService = {
  createEvent: (data) => api.post('/events', data),
  getEvents: (params) => api.get('/events', { params }),
  getEventById: (eventId) => api.get(`/events/${eventId}`),
  markInterested: (eventId) => api.post(`/events/${eventId}/interested`),
  attendEvent: (eventId) => api.post(`/events/${eventId}/attend`),
  inviteVeterans: (eventId, veteranIds) => api.post(`/events/${eventId}/invite`, { veteranIds }),
}

export default api
