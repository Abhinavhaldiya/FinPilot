🚀 FinPilot Folder Structure Guide

Welcome to the FinPilot codebase! This guide helps contributors understand the folder structure and where to place different parts of the code to keep the project clean, modular, and scalable.

---

📑 Table of Contents

Project Structure Overview

Frontend - client/

Backend - server/

Prisma ORM - prisma/

Documentation - docs/

Naming Conventions

Tips for Contributors

---

🛠️ Project Structure Overview

FinPilot/
├── client/ # React Frontend
├── server/ # Express Backend
├── docs/ # Architecture diagrams, DB schema
├── prisma/ # Prisma ORM setup
├── README.md
└── STRUCTURE_GUIDE.md

---

🖥️ Frontend - client/

client/
├── public/ # Static assets
├── src/
│ ├── assets/ # Images, logos, icons
│ ├── components/ # Reusable UI components
│ ├── context/ # Global context (AuthContext, RoleContext)
│ ├── hooks/ # Custom hooks (useForm, useAuth)
│ ├── layouts/ # Shared page layouts (DashboardLayout, AuthLayout)
│ ├── pages/ # Route-based pages (Login.jsx, ClaimForm.jsx)
│ ├── routes/ # Route definitions for React Router
│ ├── services/ # Axios-based API calls
│ ├── utils/ # Utility functions (formatDate, validators)
│ ├── App.jsx # App entry point
│ └── main.jsx # ReactDOM render logic

🗂️ Where to Place Things:

New page? ➔ pages/

Reusable UI block? ➔ components/

Global state logic? ➔ context/

API call logic? ➔ services/

Styling? ➔ Use Tailwind classes directly in components.

---

🖧 Backend - server/

server/
├── config/ # DB connection, JWT secret, environment config
├── controllers/ # Route logic (e.g., claimController.js)
├── middlewares/ # JWT auth, error handling, role checking
├── models/ # Prisma or ORM models (user, claim, etc.)
├── routes/ # Express routers (e.g., /api/claims.js)
├── utils/ # Helper logic (mailer.js, fileHandler.js)
├── uploads/ # Uploaded receipts (optional)
└── index.js # App entry point

🗂️ Where to Place Things:

New endpoint logic? ➔ controllers/

New route file? ➔ routes/

Need to validate auth/role? ➔ middlewares/

File upload handler? ➔ utils/ or middlewares/

---

🗃️ Prisma ORM - prisma/

prisma/
├── schema.prisma # Database schema
└── seed.js # Seed data for roles/users

---

📚 Documentation - docs/

docs/
├── architecture.png # Architecture diagram
├── db-schema.png # Database schema
└── api-spec.md # API specs

Add:

ER diagrams

API specifications

Screenshots of the UI

Contribution flowcharts

---

🗒️ Naming Conventions

Follow these conventions for consistency:

Type Format Example

Components PascalCase LoginForm.jsx
Functions camelCase handleSubmit()
Files kebab-case user-routes.js
Variables camelCase userEmail
Constants UPPER_SNAKE MAX_CLAIM_AMOUNT

---

💡 Tips for Contributors

✅ Keep each feature modular. ✅ Don’t mix business logic into routes (use controllers/). ✅ Use context/ and hooks/ for global frontend state. ✅ Validate all user input on client and server sides. ✅ Write clear, meaningful commit messages. ✅ Ask in discussions or issues if unsure where to place your code.

> Happy contributing! 🚀

---

For detailed steps on contribution workflows, please check CONTRIBUTING.md.
