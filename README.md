# Me-Playground

A full-stack personal portfolio showcasing my profile, skills, and projects, built with a modern React frontend and a robust Express.js backend.

## 📋 Project Overview

This project is a comprehensive personal portfolio system that allows me to showcase my professional information, technical skills, and projects through both a RESTful API and an interactive web interface. It serves as both my personal portfolio website and a publicly accessible API.

### Key Features

- **Personal Profile Management** - Displays my professional information, including education and social links.
- **Dynamic Skills Portfolio** - Showcases my technical skills with self-assessed proficiency levels.
- **Interactive Project Showcase** - Lists my development projects, detailing the technologies used.
- **Real-time Search & Filter** - Instantly search and filter projects by keywords as you type.
- **RESTful API** - Clean, documented API endpoints for external integration or headless use.
- **Responsive Design** - A mobile-first, modern UI built with Tailwind CSS for a great experience on any device.

## 🏗️ Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│   Frontend      │──────│     Backend     │──────│    Database     │
│    (React)      │      │    (Express)    │      │    (MongoDB)    │
│                 │      │                 │      │                 │
│ • Profile View  │      │ • RESTful API   │      │ • profiles      │
│ • Skills List   │      │ • CORS Config   │      │ • projects      │
│ • Project Grid  │      │ • Rate Limiting │      │                 │
│ • Real-time UI  │      │ • Mongoose ORM  │      │                 │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

### Technology Stack

- **Frontend**: React 18+ (with Hooks), Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB (via MongoDB Atlas)
- **Deployment**: Vercel

## 🚀 Setup and Installation

### Prerequisites

- Node.js v18+ and npm
- MongoDB (local instance or a free MongoDB Atlas cluster)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/vid0326/your-portfolio-repo.git
cd your-portfolio-repo
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create the environment file from the example
cp .env.example .env
```

Now, configure the variables in your new `/backend/.env` file with your MongoDB connection string and other settings.

```bash
# Start the backend server (runs on http://localhost:5000)
npm start
```

### 3. Frontend Setup

```bash
# Navigate to the frontend directory from the root
cd frontend

# Install dependencies
npm install

# Create the environment file
# This points the React app to your local backend server
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# Start the frontend development server (runs on http://localhost:3000)
npm start
```

### 4. Seed the Database

To populate the database with initial data (your profile, skills, and projects), run the seed script from the backend directory.

```bash
# Make sure you are in the /backend directory
npm run seed
```

Your application is now fully running locally!

## ☁️ Production Deployment (Vercel)

This project is optimized for deployment on Vercel.

### Backend Deployment:

1. Push your backend code (including `vercel.json`) to a GitHub repository.
2. Import the repository into Vercel.
3. Set the environment variables in the Vercel project settings (especially `MONGO_URI` and `FRONTEND_URL`).
4. Deploy.

### Frontend Deployment:

1. Push your frontend code to a separate GitHub repository.
2. Import the repository into Vercel. Vercel will auto-detect it as a Create React App.
3. Set the `REACT_APP_API_URL` environment variable to your live backend URL.
4. Deploy.

## 📡 API Endpoints

**Base URL:** https://me-playground.onrender.com

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | https://me-playground.onrender.com/api/health | Checks the health status of the API. |
| GET | https://me-playground.onrender.com/api/profile | Retrieves the main user profile data. |
| POST | https://me-playground.onrender.com/api/profile | Creates or updates the main profile (auth req). |
| GET | https://me-playground.onrender.com/api/projects | Gets a paginated list of all projects. |
| GET | https://me-playground.onrender.com/api/projects?skill=... | Filters projects by a specific skill. |
| GET | https://me-playground.onrender.com/api/skills/top | Gets the most frequently used skills. |
| GET | https://me-playground.onrender.com/api/skills/search?q=... | Searches for skills by name (for autocomplete). |

## 🔗 Links

- **Live Demo:** https://me-playground-28y3.vercel.app/
- **Live API:** https://me-playground.onrender.com/api/health

## 📞 Contact

**Vidhut Raushan**

- **Email:** vidhutraushan9@gmail.com
- **GitHub:** https://github.com/vid0326/Me-Playground

*Deployed on Vercel*
