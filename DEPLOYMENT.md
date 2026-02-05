# Nexus - Deployment Guide for Render

## What's Been Fixed

### 1. **Render Compatibility**
- ✅ Added `package.json` with Node.js dependencies (Express, CORS)
- ✅ Added `server.js` - Express server to serve static files
- ✅ Added `render.yaml` - Render deployment configuration
- ✅ Added `.gitignore` for deployment

### 2. **Navigation & Redirections**
- ✅ Fixed `index.html` to redirect to `/Serendipity.html` (internal) instead of external GitHub URL
- ✅ Updated `global.js` navigation links to use absolute paths (`/` instead of relative paths)
- ✅ Fixed logout functionality in `auth.js` to redirect to `/` (home)
- ✅ Updated server to serve root (`/`) as `Serendipity.html`

## Deployment to Render

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Render deployment files"
git push origin main
```

### Step 2: Deploy to Render
1. Go to [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Select your GitHub repository
4. Configuration will auto-detect from `render.yaml`
5. Click "Create Web Service"

### Step 3: Verify Deployment
- The app will be deployed and available at your Render URL
- All navigation links will work properly
- Games will load correctly through the server

## How It Works

- **Express Server**: Serves all static files (HTML, CSS, JS, JSON)
- **Root Path**: `/` automatically serves `Serendipity.html` (main home page)
- **Navigation**: All links use absolute paths for consistency across subpages
- **Fallback**: 404 errors handled gracefully

## Local Testing

```bash
npm install
npm start
```

Then visit `http://localhost:3000` to test locally.

## Files Created/Modified

### New Files:
- `package.json` - Node.js project configuration
- `server.js` - Express server
- `render.yaml` - Render deployment config
- `.gitignore` - Git ignore rules

### Modified Files:
- `index.html` - Fixed external redirect to internal path
- `global.js` - Updated navigation paths to absolute URLs
- `auth.js` - Fixed logout redirection

## Notes

- Firebase authentication continues to work as before
- Chat and video call features work through the server
- Game loading from subdirectories is supported
- Environment variables can be added through Render dashboard
