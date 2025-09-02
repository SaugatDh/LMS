# Learning Management System (LMS)

This is a full-stack Learning Management System application, featuring a Node.js backend with Express and Prisma, and a React frontend.

## Technologies Used

### Backend
- Node.js
- Express.js
- Prisma (ORM)
- PostgreSQL (or other compatible database)
- bcryptjs
- jsonwebtoken
- nodemailer
- cloudinary

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Redux Toolkit

## Setup Instructions

To set up the project, follow these steps:

### 1. Clone the repository

```bash
git clone <repository_url>
cd LMS
```

### 2. Backend Setup

Navigate to the `Backend` directory, install dependencies, and set up the environment variables.

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory and add the following environment variables:

```
DATABASE_URL="postgresql://user:password@localhost:5432/lms_db"
JWT_SECRET="your_jwt_secret_key"
REFRESH_TOKEN_SECRET="your_refresh_token_secret_key"
OTP_SECRET="your_otp_secret_key"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
GMAIL_USER="your_gmail_email"
GMAIL_PASS="your_gmail_app_password"
```

Run Prisma migrations to set up your database schema:

```bash
npx prisma migrate dev
```

Seed the database with initial data (e.g., admin user):

```bash
npm run seed
```

### 3. Frontend Setup

Navigate to the `Frontend` directory and install dependencies.

```bash
cd ../Frontend
npm install
```

### 4. Running the Application

#### Start the Backend Server

From the `Backend` directory:

```bash
npm start
```

#### Start the Frontend Development Server

From the `Frontend` directory:

```bash
npm run dev
```

The frontend application will typically be available at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

```
LMS/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── helpers/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── seeders/
│   │   ├── server/
│   │   └── utils/
│   ├── prisma/
│   └── package.json
└── Frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── slices/
    │   └── store/
    └── package.json
```
