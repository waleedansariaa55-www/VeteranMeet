# VeteranMeet - Fullstack Web Application

A comprehensive web platform connecting retired professionals (veterans) and organizations to participate in community services based on shared interests.

## Project Overview

VeteranMeet is a fullstack application built with modern technologies:
- **Backend**: Node.js, Express, MongoDB (Mongoose ODM)
- **Frontend**: React, Vite, Bootstrap 5
- **Authentication**: JWT-based token authentication

## Features

### Veteran Module (200 Marks)
- ✅ Profile creation based on profession
- ✅ Add and edit hobbies
- ✅ Post text/multimedia on home page
- ✅ Follow other veterans and organizations
- ✅ View posts from followed users
- ✅ Create or mark interest in community events
- ✅ View upcoming events by hobbies
- ✅ Invite followers to events
- ✅ Location-based event search
- ✅ Star-based ranking system
- ✅ Veteran category levels (Silver, Ruby, Golden, Diamond, Sapphire, Platinum, Eternal Sage)

### Community Module (80 Marks)
- ✅ Organization/NGO profile creation
- ✅ Create community service events
- ✅ Invite veterans with matching hobbies
- ✅ Star system for event attraction (max 5000)
- ✅ Permanent star count (cannot edit after creation)

### Community Service Events
- Public Talks
- Motivational Talks
- Professional Talks
- Professional Tasks
- Plantation Drives
- Orphanage Visits
- Hospital Visits
- Recreational Visits
- Old Home Visits
- Book Reading/Discussion

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone or extract the project**
```bash
cd Web_Project
```

2. **Setup Backend**
```bash
cd server
npm install
```

3. **Setup Frontend**
```bash
cd ../client
npm install
```

### Configuration

1. **Backend Environment Variables**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```
MONGODB_URI=mongodb://localhost:27017/veteranmeet
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

### Running the Application

**Terminal 1 - Start MongoDB**
```bash
# If MongoDB is installed locally
mongod
```

**Terminal 2 - Start Backend Server**
```bash
cd server
npm run dev
```

Backend will run on `http://localhost:5000`

**Terminal 3 - Start Frontend**
```bash
cd client
npm run dev
```

Frontend will run on `http://localhost:3000`

### Build for Production

**Frontend**
```bash
cd client
npm run build
```

This creates an optimized build in the `dist` folder.

## Project Structure

```
Web_Project/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── events.js
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   ├── package.json
│   └── .env.example
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EventsList.jsx
│   │   │   └── CreateEvent.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires auth)

### Users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update profile (requires auth)
- `POST /api/users/:userId/follow/:followId` - Follow user (requires auth)
- `POST /api/users/:userId/unfollow/:followId` - Unfollow user (requires auth)
- `GET /api/users/search` - Search users by city/hobby

### Events
- `POST /api/events` - Create event (requires auth)
- `GET /api/events` - Get all events
- `GET /api/events/:eventId` - Get event details
- `POST /api/events/:eventId/interested` - Mark as interested (requires auth)
- `POST /api/events/:eventId/attend` - Mark attendance & earn stars (requires auth)
- `POST /api/events/:eventId/invite` - Invite veterans (requires auth)

## Team Roles

This is a group project. Suggested task distribution:

1. **Backend Developer**: Database schema, API routes, authentication
2. **Frontend Developer**: React components, UI/UX, routing
3. **DevOps/Database**: MongoDB setup, deployment, testing
4. **QA/Documentation**: Testing, documentation, GitHub management

## Git Workflow

Each team member should:
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make commits with clear messages
3. Push to remote: `git push origin feature/your-feature`
4. Create a pull request for review
5. Merge after approval

## Important Notes

**Plagiarism Policy**
- At least 70% of the code must be written by the group
- Maximum 30% can be taken from external sources (GitHub, tutorials, etc.)
- Always cite the source in comments if using external code
- Violation results in zero marks for the entire group

**Evaluation Criteria**
- Backend API Implementation: 100 marks
- Frontend UI/UX: 100 marks
- Community Module: 80 marks
- GitHub Check-in History: 20 marks
- **Total: 300 marks**

## Future Enhancements

- [ ] User profiles with profile pictures
- [ ] Real-time notifications
- [ ] Star-based recommendation algorithm
- [ ] Advanced geolocation search with maps
- [ ] Social media integration
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics and reporting

## Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcrypt**: Password hashing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend
- **react**: UI library
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **bootstrap**: CSS framework
- **vite**: Build tool

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- Verify connection string format

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Use `npm run dev -- --port 3001`

### CORS Errors
- Ensure backend is running on `http://localhost:5000`
- Check frontend API_URL in `client/src/services/api.js`

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Consult the MongoDB/Express documentation
4. Ask your team lead

---

**Created**: December 2025
**Version**: 0.1.0
