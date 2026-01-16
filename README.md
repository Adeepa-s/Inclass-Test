# Login App - Google & GitHub Authentication

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Google OAuth (Required)
1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 Client ID
5. Add `http://localhost:3000` to Authorized JavaScript origins
6. Copy your Client ID
7. Replace in `src/App.js`:
```javascript
<GoogleOAuthProvider clientId="YOUR_CLIENT_ID_HERE">
```

### 3. Setup GitHub OAuth (Required)
1. Add your GitHub Client Secret to `server.js` (line 9)
2. Get it from: https://github.com/settings/developers

### 4. Run the Application

**Terminal 1 - Frontend:**
```bash
npm start
```

**Terminal 2 - Backend:**
```bash
node server.js
```

### 5. Test
- Open http://localhost:3000
- Click "Sign in with Google" or "Login with GitHub"
- Your profile will display after login

## Features
- Google OAuth 2.0 login
- GitHub OAuth 2.0 login
- Display user name, email, and profile picture
- Session persistence with localStorage
- Logout functionality
- Error handling

## Tech Stack
- React 18
- @react-oauth/google
- Express.js backend
- jwt-decode
