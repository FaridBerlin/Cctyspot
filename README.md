# Cctyspot - City Management Application

Full-stack application for managing cities with images using React, Node.js, MongoDB, and Cloudinary.

## 🚀 Deployment on Render.com

### Prerequisites

- GitHub account with this repository
- Render.com account
- MongoDB Atlas account (for production database)
- Cloudinary account

### Backend Deployment

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `FaridBerlin/Cctyspot`
4. Configure the service:

   - **Name**: `cctyspot-backend` (or your preferred name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):

   ```
   PORT=3000
   MONGO_URL=<your-mongodb-atlas-url>
   DATABASE=citySpot
   CLOUDINARY_CLOUD_NAME=dz4g4061j
   CLOUDINARY_API_KEY=546891348596299
   CLOUDINARY_API_SECRET=QjS2hWUNWgiWh16G23IF6I7FlrM
   FRONTEND_URL=<will-add-after-frontend-deployment>
   ```

6. Click **"Create Web Service"**
7. Copy your backend URL (e.g., `https://cctyspot-backend.onrender.com`)

### Frontend Deployment

1. **Go to Render Dashboard** again
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository: `FaridBerlin/Cctyspot`
4. Configure the site:

   - **Name**: `cctyspot-frontend` (or your preferred name)
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

5. **Add Environment Variable**:

   ```
   VITE_API_URL=<your-backend-url>/cities
   ```

   Example: `https://cctyspot-backend.onrender.com/cities`

6. Click **"Create Static Site"**

### Final Steps

1. Go back to your **backend service** settings
2. Update the `FRONTEND_URL` environment variable with your frontend URL
3. Both services will automatically redeploy

### MongoDB Atlas Setup (if needed)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string and add to backend environment variables

## 🛠️ Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📝 Environment Variables

### Backend (.env)

- `PORT` - Server port
- `MONGO_URL` - MongoDB connection string
- `DATABASE` - Database name
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env)

- `VITE_API_URL` - Backend API URL
