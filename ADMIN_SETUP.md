# Admin Account Setup & Features

## Admin Credentials

An admin account has been automatically created with the following credentials:

**Email:** `admin@veteranmeet.com`  
**Password:** `Admin@123456`  
**URL:** `http://localhost:3000/admin`

> ⚠️ **IMPORTANT:** Change the password immediately after first login for security!

## Admin Features

### 1. **Dashboard Statistics**
- View total number of users by type (Veterans, Organizations, NGOs)
- Monitor total events and active events
- Real-time statistics on system usage

### 2. **User Management**
- View all users in the system
- Edit user details:
  - Name
  - Email
  - User Type (Veteran/Organization/NGO)
  - Stars (reputation score)
  - Admin status (promote/demote users)
- Delete users (with confirmation)
- Search and filter users

### 3. **Event Management**
- View all events with their details
- Edit event information:
  - Title
  - Event Type
  - Active/Inactive status
- Delete events (with confirmation)
- View event creator information

### 4. **Admin Privileges**
- Full access to all system data
- Modify any user or event
- Promote other users to admin status
- Delete users and events that violate policies

## How to Use

### Login as Admin
1. Navigate to `http://localhost:3000/login`
2. Enter credentials:
   - Email: `admin@veteranmeet.com`
   - Password: `Admin@123456`
3. You will be automatically redirected to `/admin` dashboard

### Access Admin Dashboard
- Click on any of the tabs: Statistics, Users, or Events
- **Statistics Tab**: View system-wide metrics
- **Users Tab**: Manage all user accounts
- **Events Tab**: Manage all events

### Edit User
1. Go to Users tab
2. Click "Edit" button on the user you want to modify
3. Update fields as needed
4. Click "Save" to apply changes

### Delete User
1. Go to Users tab
2. Click "Delete" button (requires confirmation)
3. User will be permanently removed from the system

### Promote User to Admin
1. Go to Users tab
2. Click "Edit" on the user
3. Check the "Is Admin" checkbox
4. Click "Save"

### Edit Event
1. Go to Events tab
2. Click "Edit" button on the event
3. Update fields as needed
4. Click "Save" to apply changes

### Deactivate Event
1. Go to Events tab
2. Click "Edit" on the event
3. Uncheck "Is Active" checkbox
4. Click "Save"

## API Endpoints (Admin Only)

All admin endpoints require authentication and admin privileges.

```
GET    /api/admin/users          - List all users
GET    /api/admin/events         - List all events
GET    /api/admin/stats          - Get system statistics
PUT    /api/admin/users/:userId  - Update user
PUT    /api/admin/events/:eventId - Update event
DELETE /api/admin/users/:userId  - Delete user
DELETE /api/admin/events/:eventId - Delete event
```

## Security Notes

- Admin endpoints check both authentication and admin status
- All admin actions are logged (view in server console)
- Passwords are hashed with bcrypt
- JWT tokens expire after 7 days
- Only admins can access the admin panel

## Reset Admin Credentials

If you need to reset the admin account, run:

```bash
node setupAdmin.js
```

This will display the current admin credentials if the account exists.

## Create Additional Admins

1. Login as admin
2. Go to Users tab
3. Find the user you want to promote
4. Click Edit
5. Check "Is Admin" checkbox
6. Click Save
