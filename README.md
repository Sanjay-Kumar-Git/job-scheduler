<div align="center">
<h1><b><u>🛠️ Job Scheduler Dashboard</u></b></h1>

A full-stack job scheduling and management system that allows users to create, run, update, delete, and monitor background jobs with real-time status tracking, filtering, and webhook notifications.

This project simulates how real-world background job systems work in production environments.
</div>

---

## 📌 Project Overview
- The Job Scheduler Dashboard is designed to manage asynchronous background jobs.

- Each job goes through a lifecycle: `pending → running → completed`
---
## 📁 Project Structure
```
job-scheduler/
│
├── backend/
│   ├── controllers/
│   │   └── jobController.js
│   │       # Handles request–response logic
│   │       # create, fetch, run, update, delete jobs
│   │
│   ├── services/
│   │   ├── jobService.js
│   │   │   # Database operations (CRUD)
│   │   │   # insertJob, fetchJobs, updateJobStatus, updateJobById, deleteJob
│   │   │
│   │   └── webhookService.js
│   │       # Sends webhook notification when job completes
│   │
│   ├── routes/
│   │   └── jobRoutes.js
│   │       # API routes mapping to controller methods
│   │
│   ├── database/
│   │   └── db.js
│   │       # SQLite database connection
│   │       # Table creation & schema definition
│   │
│   ├── app.js
│   │   # Express app configuration
│   │   # Middleware, routes setup
│   │
│   ├── server.js
│   │   # Server entry point
│   │   # Starts Express server
│   │
│   ├── jobs.db
│   │   # SQLite database file
│   │
│   ├── .env
│   │   # Environment variables
│   │   # WEBHOOK_URL
│   │
│   └── package.json
│       # Backend dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── animations/
│   │   │   └── motionPresets.js
│   │   │       # Shared Framer Motion animations
│   │   │
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Filters.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── JobForm.jsx
│   │   │   ├── JobTable.jsx
│   │   │   ├── SuccessMessage.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── HeroSection.jsx
│   │   │
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   │       # Dark / Light theme handling
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── MobileNavbar.jsx
│   │   │   ├── CapsuleTabs.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── CreateJobPage.jsx
│   │   │   └── JobsPage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── jobApi.js
│   │   │       # Axios API layer
│   │   │
│   │   ├── styles/
│   │   │   ├── GlobalStyles.js
│   │   │   ├── theme.js
│   │   │   ├── glass.js
│   │   │   └── GlassSelect.jsx
│   │   │
│   │   ├── App.jsx
│   │   │   # Routing setup
│   │   │
│   │   └── index.js
│   │       # React entry point
│   │
│   ├── package.json
│   │   # Frontend dependencies
│   │
│   └── vite.config.js / config files
│
├── README.md
│   # Project overview and setup instructions
│
└── documentation/
    └── Job_Scheduler_Dashboard_Documentation.pdf

```
---
### The system ensures:

  * Proper state tracking in the database

  * UI updates based on job status

  * Safe job execution rules

  * External notification using webhooks
---
## 🎯 Key Objectives of the Project
  * Build a realistic job processing system

* Maintain database as the source of truth

* Demonstrate backend–frontend synchronization

* Implement polling-based real-time updates

* Use webhooks to notify external systems

* Create a clean, responsive, professional UI
---
## ✨ Features Implemented<br/>
 ### 🧩 Job Management

+ Create a job with:

    * Task name

    * Priority (Low / Medium / High)

    * Optional payload

* Fetch all jobs

* Fetch a single job by ID

* Update job details (task name & priority)

* Delete jobs (only when not running)
---
## ⚙️ Job Lifecycle Control

* Jobs start in pending state

* Clicking Run:

  * Changes status to running

  * Prevents duplicate runs

  * Disables delete while running

* After execution delay:

  * Status changes to completed

  * Completion time is recorded

  * Webhook is triggered
---
## 🔁 Real-Time Status Updates

* Polling mechanism automatically refreshes job status

* Polling stops when no job is running

* UI updates without manual refresh
<p align="center"><img src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1767766412/Screenshot_2026-01-07_090406_xi0ld2.png" width="180"/>
<img src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1767766412/Screenshot_2026-01-07_090641_cuz9ef.png" width="180"/>
<img src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1767766418/Screenshot_2026-01-07_090742_ugxj5w.png" width="180"/>
</p>

---
## 🔍 Filtering & Search

* Filter jobs by:

  * Status

  * Priority

* Search job by ID:

  * Updates URL query parameter

  * Fetches job directly from API

* URL-based search supports page refresh & sharing
<p align="center"><img src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1767766423/Screenshot_2026-01-07_091610_r0u3na.png" width="400"/>
</p>

---
## 🧠 Smart UX Rules

* Cannot run an already running or completed job

* Cannot delete a running job

* Delete button appears only after job completion

* Run button appears only when job is pending
---
## 🖼️ Empty State Handling

* When no jobs exist:

  * Displays a friendly illustration

  * Shows a helpful message

* Prevents blank or confusing UI

* Image adapts to light/dark theme
---
## 🌗 Dark / Light Theme

* Theme toggle with smooth transitions

* Theme preference saved in localStorage

* Entire app responds to theme change
---
## 📱 Responsive Design

* Desktop:

  * Job table view

* Mobile:

  * Card-based job layout

* Adaptive navigation:

  * Top navbar (desktop)

  * Bottom navigation (mobile)
---
## 🎨 UI & Animations

* Glassmorphism design

* Smooth animations using Framer Motion

* Radix UI select for accessible dropdowns

* Styled-components for scoped styling

<p align="center"><img src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1767766411/Screenshot_2026-01-07_085822_mtg4oe.png" width="250"/>
<img src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1767766412/Screenshot_2026-01-07_090641_cuz9ef.png" width="250"/>
</p>

---
## 🔔 Webhook Integration
### What the webhook does:

* Triggers only when a job is completed

* Sends job details to an external system

### Data sent:

  * Job ID

  * Task name

  * Status

  * Priority

  * Payload (if any)

  * Completion timestamp

### Why webhook is used:

  * Simulates enterprise job systems

  * Demonstrates event-driven architecture

  * Allows integration with external services

>Webhooks are notifications, not state managers
Database remains the source of truth

<p align="center"><img src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1767766419/Screenshot_2026-01-07_090946_uaviml.png" width="400"/>
</p>

---
## 🗄️ Backend Architecture
### Technology

* Node.js

* Express.js

* SQLite (via sqlite3 + sqlite)

* Axios (for webhook calls)
### Database Schema
```jobs (
  id INTEGER PRIMARY KEY,
  taskName TEXT,
  payload TEXT,
  priority TEXT,
  status TEXT,
  createdAt DATETIME,
  updatedAt DATETIME,
  completedAt DATETIME
)
```
---
### API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/jobs` | Create a job |
| **GET** | `/jobs` | Get all jobs |
| **GET** | `/jobs/:id` | Get job by ID |
| **POST** | `/jobs/:id/run` | Run a job |
| **PATCH** | `/jobs/:id` | Update job |
| **DELETE** | `/jobs/:id` | Delete job |
---
## Backend Rules Enforced

* Validation for required fields

* Prevent running non-pending jobs

* Prevent deleting running jobs

* Proper HTTP status codes

* Error handling for all cases
---
## 🧠 Frontend Architecture
### Technology

* React

* React Router

* Styled-components

* Framer Motion

* Radix UI

* Axios
---
## Component Structure

* Reusable UI components

* Page-level containers

* Context-based theme management

* API abstraction via jobApi.js
---
## State Management

* Local component state

* Parent-driven updates

* Polling via setInterval

* URL state via useSearchParams
---
## 🧪 Reliability & Safety

* Database updates before webhook

* UI reflects database state only

* Background execution wrapped in try-catch

* Graceful failure handling
---
## 🚀 How to Run Locally
### Backend
```
cd backend
npm install
npm start
```
### Frontend
```
cd frontend
npm install
npm run dev
```
---
<div align="center">
<h1>👨‍💻 Author</h1>

<b>Sanjay Kumar<br/>
Full-Stack Developer<br/></b>
<i>Focused on building scalable, production-ready applications</i>
</div>

---
## ✅ Summary

### This project demonstrates:

  * Full-stack development skills

  * Real-world job lifecycle handling

  * Clean architecture and UX thinking

  * Backend validation & safety

  * Frontend state synchronization

  * Event-based notifications using webhooks
---
  # Note:
<i>This project uses SQLite as per the assignment requirement.
When deployed on Render Free tier, the SQLite database is stored in ephemeral storage, so data may reset when the service restarts.