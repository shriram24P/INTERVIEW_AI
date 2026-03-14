# 🚀 Interview AI – MERN Stack Application

An AI-powered interview analysis platform that evaluates technical interviews, analyzes responses, and generates structured reports including technical feedback, skill gaps, and improvement suggestions.

Built using the **MERN Stack** with modern deployment and CI/CD practices.

---

## 🌐 Live Demo

Frontend: http://interview-ai-bice-tau.vercel.app/
Backend API: https://interview-ai-p018.onrender.com

---

## 🧠 Features

- AI-powered interview analysis
- Technical question evaluation
- Skill gap identification
- Structured interview report generation
- Resume PDF generation
- Clean and responsive UI
- Secure authentication with JWT
- API-based architecture

---

## 🛠 Tech Stack

### Frontend

- React (Vite)
- Redux Toolkit
- Axios
- Tailwind CSS
- DaisyUI

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication

### AI Integration

- GROQ API

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

```
INTERVIEW_AI
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── package.json
```

---

## ⚙️ Environment Variables

Create `.env` file inside **backend**:

```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GROQ_API=your_groq_api_key
```

Create `.env` inside **frontend**:

```
VITE_API_URL=http://localhost:3000/api
```

---

## 💻 Local Development Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/INTERVIEW_AI.git
cd INTERVIEW_AI
```

---

### 2️⃣ Install Backend Dependencies

```
cd backend
npm install
```

Run backend:

```
npm start
```

---

### 3️⃣ Install Frontend Dependencies

```
cd frontend
npm install
```

Run frontend:

```
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:3000
```

---

## 🚀 Deployment

### Backend

Hosted on **Render**

### Frontend

Hosted on **Vercel**

### Database

MongoDB Atlas

---

## 🔄 CI/CD

Continuous deployment is enabled using **GitHub automatic deployments**.

- Push code to GitHub
- Vercel deploys frontend automatically
- Render deploys backend automatically

---

## 📊 System Architecture

```
User
 │
 ▼
Frontend (React - Vercel)
 │
 ▼
Backend API (Node.js - Render)
 │
 ▼
MongoDB Atlas
```

---

## 📌 Future Improvements

- Add interview audio/video analysis
- Improve AI response accuracy
- Add user dashboard analytics
- Add interview scheduling system

---

## 👨‍💻 Author

Shriram Patil

React Native / MERN Stack Developer

LinkedIn: www.linkedin.com/in/shriram-patil-03baa6141
GitHub: https://github.com/shriram24P

---

⭐ If you like this project, consider giving it a star!
