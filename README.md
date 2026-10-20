
```markdown
# 💼 Job Application Tracker

A full-stack **MERN Job Application Tracker** that helps users organize, monitor, and manage their job applications from a single dashboard.

Users can securely register and log in, add, edit, delete, search, filter, sort, and view detailed job applications while tracking their progress through different application stages.

🚀 **Live Demo:**  
https://job-application-tracker-react-ptam-nine.vercel.app/

---

## ✨ Features

### 🔐 Authentication

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected application routes
- User-specific application data
- Authorization for application operations

### 📋 Application Management

- Add new job applications
- Edit existing applications
- Delete applications
- View detailed application information
- Track application status and progress
- Add job links and notes

### 🔎 Search, Filter & Sort

- Search applications by:
  - Company name
  - Job role
  - Location
- Filter applications by status
- Sort applications by:
  - Newest
  - Oldest
  - Company A-Z
  - Company Z-A

### 📊 Dashboard

- Total applications count
- Applications by status
- Interview tracking
- Offer tracking
- Rejected application count
- Visual application progress tracking

### 🎨 User Experience

- Responsive design for desktop and mobile
- Dark and light mode
- Form validation
- Empty states
- Error handling
- Missing application handling
- Missing job link handling
- Interactive application cards
- Detailed application view

### 💾 Persistent Data

Application data is stored in **MongoDB Atlas** through the backend API.

This means application data is associated with the authenticated user and persists across:

- Page refreshes
- Browser sessions
- Different pages
- Backend restarts

---

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **React** | Building the user interface |
| **Vite** | Frontend development and production build |
| **JavaScript** | Application logic |
| **React Router** | Client-side routing |
| **CSS** | Styling and responsive layouts |
| **Node.js** | Backend runtime |
| **Express.js** | Backend API |
| **MongoDB Atlas** | Database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **Vercel** | Frontend deployment |
| **Render** | Backend deployment |

---

## 📸 Screenshots

### 📊 Dashboard

![Dashboard](./public/screenshots/dashboard.png)

### 📋 Applications

![Applications](./public/screenshots/applications.png)

### ➕ Add Job

![Add Job](./public/screenshots/addjob.png)

### 🔎 Job Details

![Job Details](./public/screenshots/jobdetails%20.png)

---

## 📂 Project Structure

```text
job-tracker/
│
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── JobApplication.js
│   │   └── User.js
│   ├── routes/
│   │   ├── applications.js
│   │   └── auth.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── public/
│   ├── screenshots/
│   └── job-bg.png
│
├── src/
│   ├── components/
│   │   ├── JobCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── StatusBadge.jsx
│   │   └── StatusProgress.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Applications.jsx
│   │   ├── AddJob.jsx
│   │   ├── JobDetails.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vercel.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/tejeswi-ni/job-application-tracker-react-.git
```

### 2. Navigate to the project

```bash
cd job-application-tracker-react-
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Install backend dependencies

```bash
cd backend
npm install
```

---

## 🔐 Environment Variables

### Frontend

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000
```

### Backend

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Never commit `.env` files or database credentials to GitHub.**

---

## ▶️ Running the Project Locally

### Start the backend

From the `backend` directory:

```bash
npm start
```

The backend runs on:

```text
http://localhost:3000
```

### Start the frontend

From the project root:

```bash
npm run dev
```

The frontend will run on the local URL displayed by Vite.

---

## 🧭 Application Routes

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/login` | User login |
| `/register` | User registration |
| `/home` | Dashboard |
| `/applications` | View all applications |
| `/applications/:id` | View application details |
| `/add-job` | Add or edit an application |

Protected routes require user authentication.

---

## 🔄 Application Flow

```text
User
  ↓
Register / Login
  ↓
JWT Authentication
  ↓
React Frontend
  ↓
Express REST API
  ↓
MongoDB Atlas
```

Each authenticated user can access and manage their own job applications.

---

## 🎯 Project Goals

This project was built to practice and demonstrate:

- React component development
- React Hooks and state management
- Form handling and validation
- React Router
- Dynamic routes
- CRUD operations
- REST API integration
- Express.js backend development
- MongoDB and Mongoose
- JWT authentication
- Password hashing
- Protected routes
- User-specific data
- Searching, filtering, and sorting
- Responsive UI development
- Dark and light themes
- Error and empty-state handling
- Full-stack deployment

---

## 🚀 Deployment

### Frontend

The React frontend is deployed using **Vercel**.

**Live Application:**  
https://job-application-tracker-react-ptam-nine.vercel.app/

### Backend

The Express backend is deployed using **Render**.

**Backend API:**  
https://job-application-tracker-react.onrender.com/

### Database

Application data is stored using **MongoDB Atlas**.

The deployed architecture is:

```text
Vercel
   ↓
Render
   ↓
MongoDB Atlas
```

---

## 🔮 Future Improvements

Potential improvements include:

- 📈 Advanced application analytics
- ⏰ Application deadline reminders
- 📤 Export applications to CSV
- 📄 Pagination for large application lists
- 🔔 Notifications and reminders
- 📱 Further mobile UI optimization
- 📊 Application activity timeline
- 🔗 Automatic job-board integration

---

⭐ **If you found this project useful, feel free to explore the code and try the live demo.**
```


