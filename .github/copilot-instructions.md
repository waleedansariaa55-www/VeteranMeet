# VeteranMeet Development Guidelines

This is a fullstack web application project for connecting retired professionals (veterans).

## Project Type
- **Architecture**: MERN-style (MongoDB, Express, React, Node.js)
- **Package Manager**: npm
- **Frontend**: React 18 with Vite
- **Backend**: Express.js with MongoDB/Mongoose

## Development Workflow

1. **Feature Development**: Create branches for each feature
   - Backend features: `feature/api-*`
   - Frontend features: `feature/ui-*`

2. **Code Standards**:
   - Use meaningful variable and function names
   - Add comments for complex logic
   - Keep functions small and focused
   - Test features locally before pushing

3. **Commit Messages**: Use clear, descriptive messages
   - `feat: add user authentication`
   - `fix: resolve event filtering bug`
   - `docs: update API documentation`

## Key Implementation Requirements

### Backend (Node.js/Express)
- **Authentication**: JWT-based with bcrypt password hashing
- **Database**: MongoDB with Mongoose schemas
- **API**: RESTful endpoints for all features
- **Validation**: Input validation on all endpoints
- **Error Handling**: Consistent error response format

### Frontend (React)
- **State Management**: React hooks (useState, useEffect)
- **Routing**: React Router v6 for navigation
- **Styling**: Bootstrap 5 for responsive UI
- **API Communication**: Axios with interceptors for JWT

### Features Priority
1. **Phase 1** (Essential):
   - User registration and login
   - Profile creation
   - Event CRUD operations
   - Basic event browsing

2. **Phase 2** (Core):
   - Follow/unfollow system
   - Event attendance and star tracking
   - Event filtering by location and hobbies
   - Veteran category levels

3. **Phase 3** (Enhancement):
   - Post creation and sharing
   - Advanced search
   - Notifications
   - Admin features

## Plagiarism Prevention

- ✅ Write code as a team
- ✅ Document external resources used
- ✅ Cite code snippets from Stack Overflow/GitHub
- ❌ Do NOT copy entire files from other sources
- ❌ Do NOT share code between groups

## Testing Checklist

Before pushing code:
- [ ] No console errors
- [ ] Feature works as expected
- [ ] API endpoints respond correctly
- [ ] Forms validate input
- [ ] Database changes persist
- [ ] No unused imports/variables

## Useful Commands

```bash
# Backend
cd server && npm install
npm run dev          # Start with nodemon
npm start            # Production start

# Frontend
cd client && npm install
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Ensure MongoDB is running; check MONGODB_URI in .env |
| CORS errors | Verify backend is on port 5000 and frontend proxies correctly |
| Token expires | User must login again; token expires in 7 days |
| Port conflicts | Change PORT in .env or use different port in npm run dev |

## File Organization

- **Models**: Database schemas in `server/models/`
- **Routes**: API endpoints in `server/routes/`
- **Middleware**: Auth and validation in `server/middleware/`
- **Components**: React components in `client/src/components/`
- **Services**: API calls in `client/src/services/`

## Important Reminders

1. **Environment Variables**: Never commit `.env` file
2. **Dependencies**: Update `package.json` when installing new packages
3. **Database**: Keep production and development databases separate
4. **Security**: Never expose JWT_SECRET or MongoDB credentials
5. **Git History**: Each team member must have meaningful commits (20 marks allocated)

## Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Docs](https://react.dev/)
- [Bootstrap Docs](https://getbootstrap.com/docs/)
- [Vite Docs](https://vitejs.dev/)

---

Last Updated: December 2025
