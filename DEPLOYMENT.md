# Deployment Guide - RentItNow

This guide explains how to deploy the **RentItNow** application.
Because this is a full-stack application with a React frontend and a Node.js/Express backend, we recommend a **Split Hosting Strategy**:
1.  **Frontend**: Deployed on **Netlify** (Best for React/Vite/Static sites).
2.  **Backend & Database**: Deployed on **Railway** or **Render** (Best for Node.js servers and Databases).

---

## 🚀 Part 1: Backend Deployment (Railway/Render)
> **Goal**: Get your API running on a public URL (e.g., `https://rentitnow-api.up.railway.app`) so the frontend can talk to it.

### Prerequisites (Production Database)
Local development uses SQLite. For production, you need a PostgreSQL or MySQL database.
**Railway** is easiest because it provides both the Server hosting and the Database in one project.

### Instructions (Railway)
1.  **Sign Up/Login** to [Railway.app](https://railway.app/).
2.  **New Project** -> **Deploy from GitHub repo**.
3.  Select your repository.
4.  **Add Database**:
    - Right-click on the project canvas -> **New** -> **Database** -> **MySQL** (or PostgreSQL).
5.  **Connect Server to Database**:
    - Click on your *Server* service -> **Variables**.
    - Add `DATABASE_URL`.
    - Value: Copy the `DATABASE_URL` from the *Database* service (under "Connect" tab).
    - **Important**: Ensure your `prisma/schema.prisma` file has `provider = "mysql"` (or `postgresql`) instead of `sqlite` for production. You can use an environment variable for this or just change it before pushing.
6.  **Build & Start Commands**:
    - Railway usually detects these automatically from `package.json`, but verify:
    - **Build Command**: `npm install && npx prisma generate`
    - **Start Command**: `npm start`
7.  **Deploy**: Railway will deploy your server. once done, copy the **Public URL** (e.g., `https://...railway.app`).

### Instructions (Render)
If you prefer **Render**, follow these steps:

1.  **Create Database (PostgreSQL)**:
    - Go to [dashboard.render.com](https://dashboard.render.com/) -> **New** -> **PostgreSQL**.
    - Configure it (Name: `rentitnow-db`, Region: Closest to you).
    - Create. Wait for it to initialize.
    - Copy the **Internal Database URL**.

2.  **Update Code (Crucial)**:
    - Render uses PostgreSQL by default.
    - Open `server/prisma/schema.prisma`.
    - Change `provider = "sqlite"` to `provider = "postgresql"`.
    - Commit and Push this change to GitHub.

3.  **Create Web Service**:
    - Dashboard -> **New** -> **Web Service**.
    - Connect your GitHub repo.
    - **Root Directory**: `server`
    - **Build Command**: `npm install && npx prisma generate`
    - **Start Command**: `npm start`
    - **Environment Variables**:
      - `DATABASE_URL`: Paste the **Internal Database URL** from step 1.
    - Click **Create Web Service**.

4.  **Database Setup**:
    - Once the service is live, it might fail initially because tables aren't created.
    - In the Render Dashboard, go to your Web Service -> **Shell**.
    - Run: `npx prisma db push`
    - Run: `npm run prisma:seed` (to get the products and correct images).

5.  **Done**: Copy the service URL (e.g., `https://rentitnow-server.onrender.com`). Use this for your Frontend's `VITE_API_URL`.

---

## 🌐 Part 2: Frontend Deployment (Netlify)
> **Goal**: Host your React website on Netlify.

### 1. Prepare for Deployment
- Ensure you have the `netlify.toml` file in your `client` folder (Already created).
- Ensure your `package.json` has a `build` script (`vite build`).

### 2. Connect to Netlify
1.  **Log in** to [Netlify](https://www.netlify.com/).
2.  Click **"Add new site"** -> **"Import from existing project"**.
3.  Select **GitHub**.
4.  Authorize Netlify and choose your **RentItNow** repository.

### 3. Configure Build Settings
Netlify will try to detect settings, but force these to be sure:
- **Base directory**: `client`  *(Crucial! Your react app is in this subfolder)*
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 4. Environment Variables
This is how your Frontend knows where your Backend is.
1.  Click **"Show advanced"** or go to **Site Settings** -> **Environment variables** after creation.
2.  Add a new variable:
    - **Key**: `VITE_API_URL`
    - **Value**: The Public URL of your Backend from Part 1 (e.g., `https://rentitnow-api.up.railway.app`).
    - *Note: Do not add a trailing slash (e.g., use `.../app`, not `.../app/`).*

### 5. Deploy
- Click **"Deploy site"**.
- Netlify will build your site. Once green, click the link to see your live app!

---

## 🛠 Troubleshooting

### Database Errors
- **Error**: `P1003: Database does not exist`
- **Fix**: Ensure you ran the migration command in your build step or via the Railway/Render console (`npx prisma db push`).

### Generic "Page Not Found" on Refresh
- **Fix**: This is an SPA routing issue. The `netlify.toml` file in `client/` handles this. Ensure it is committed and pushed.
  ```toml
  [[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  ```

### CORS Errors
- If your frontend says "Network Error" or "CORS", you need to update your Backend's CORS settings.
- In `server/server.js`, ensure `cors` is configured to accept requests from your Netlify domain.

## ❓ FAQ
### Can I deploy the backend to Streamlit?
**No.** Streamlit Community Cloud is designed exclusively for **Python** applications.
- Our backend is built with **Node.js**, so it cannot run on Streamlit.
- You must use a host that supports Node.js, such as **Railway**, **Render**, **Heroku**, or **DigitalOcean**.

### Can I deploy the backend to Vercel/Netlify?
**Yes, but with modifications.**
- Vercel/Netlify support Node.js via **Serverless Functions**.
- You would need to wrap the Express app in a serverless handler (e.g., `serverless-http`).
- However, for a standard Express API with a persistent database connection, **Railway/Render** is much easier and recommended for this project.
