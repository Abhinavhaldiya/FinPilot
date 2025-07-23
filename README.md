# FinPilot
**FinPilot** is an open-source, enterprise-grade expense approval system that streamlines reimbursements with secure workflows. Employees submit claims, managers approve, and finance teams validate and settle—all with transparency, control, and efficiency.

## Tech Stack

### Frontend
- **React** - Modern JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Chart.js** - Beautiful, responsive charts and graphs
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework
- **PostgreSQL** - Robust, open-source relational database
- **Prisma ORM** - Next-generation database toolkit

### Security & Utilities
- **JWT** - JSON Web Tokens for secure authentication
- **bcrypt** - Password hashing for enhanced security
- **Multer** - Middleware for handling file uploads
- **Nodemailer** - Email sending functionality

# Instructions for Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Abhinavhaldiya/FinPilot.git
cd FinPilot
```

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

### 4. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 5. Environment Configuration

Create environment files using the provided templates:

**Backend Environment (`/server/.env`):**
```bash
cp server/.env.example server/.env
```

**Frontend Environment (`/client/.env`):**
```bash
cp client/.env.example client/.env
```

### 6. Configure Environment Variables

**Edit `/server/.env`:**
```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/finpilot"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Email Configuration
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# Server Configuration
PORT=5000
NODE_ENV="development"
```

**Edit `/client/.env`:**
```env
VITE_API_URL="http://localhost:5000/api"
VITE_APP_NAME="FinPilot"
```

### 7. Database Setup

```bash
cd server
npx prisma migrate dev
npx prisma generate
cd ..
```

### 8. Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 9. Access the Application

Open your browser and navigate to: **http://localhost:5173**

