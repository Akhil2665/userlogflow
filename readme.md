# Full-Stack User Authentication Flow

A full-stack authentication system built with React.js, Node.js, and SQLite3, featuring user registration, login, and protected routes.

## Features

- User Registration
- User Login
- Protected Dashboard
- Session Management
- Secure Password Hashing

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- SQLite3

## Setup Instructions

### Backend Setup

1. Navigate to backend and install dependencies:

```bash
cd backend
npm install express sqlite3 sqlite bcrypt cookie-parser express-session cors
npm install nodemon --save-dev
```

2. Create SQLite database and tables:

```bash
sqlite3 usersdata.db
```

3. In SQLite prompt, create users table:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```

4. Start the server:

```bash
npm run dev     # Development mode with nodemon
# or
npm start       # Production mode
```

Server runs at: http://localhost:4000

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

npx create-react-app frontend
cd frontend

````


2. Install dependencies:

```bash
npm install react-router-dom axios
````

3. Start the frontend development server:

```bash
npm start
```

The application will open in your browser at http://localhost:3000

## Project Structure

```
userflow/
├── backend/
│   ├── routes/
│   │   └── auth.js
│   ├── db.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   └── ProtectedRoute.js
    │   ├── App.js
    │   └── App.css
    └── package.json
```

## API Endpoints

- POST `/register` - Register new user
- POST `/login` - User login
- POST `/logout` - User logout

```

## Tech Stack

- Frontend: React.js, React Router, Axios
- Backend: Node.js, Express.js
- Database: SQLite3
- Authentication: Session-based authentication
```
