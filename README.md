# Navrasi - Premium E-commerce Platform

![Navrasi Logo](./public/assets/logo.png)

A modern, full-stack e-commerce platform built with React, TypeScript, Node.js, Express, and PostgreSQL.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Customer Features
- 🛍️ Browse products with advanced filtering and search
- 🛒 Shopping cart with session persistence
- 💳 Secure checkout process
- 📦 Order tracking and history
- 👤 User profile management
- 🔐 Secure authentication (Local & Google OAuth)
- 📱 Fully responsive design

### Admin Features
- 📊 Comprehensive dashboard with statistics
- 📦 Product management (CRUD operations)
- 🛒 Order management and status updates
- 📷 Image upload to Cloudinary
- 👥 User management

### Technical Features
- 🔒 Session-based authentication (expires on browser close)
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast and optimized with Vite
- 🔍 SEO-friendly with meta tags
- 🛡️ Security best practices (helmet, CORS, rate limiting)
- 📝 Comprehensive error handling
- 🧪 Unit and integration tests

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Form Validation:** React Hook Form (optional)

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL 14+
- **ORM:** Sequelize
- **Authentication:** JWT + Passport.js
- **File Upload:** Multer + Cloudinary
- **Security:** Helmet, CORS, Express Rate Limit
- **Validation:** Express Validator

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 or **yarn** >= 1.22.0
- **PostgreSQL** >= 14.0
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/navrasi.git
cd navrasi
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. Set Up Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE navrasi;
CREATE USER navrasi_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE navrasi TO navrasi_user;

# Exit PostgreSQL
\q
```

### 5. Run Database Migrations

```bash
cd backend
npm run db:migrate
```

### 6. Seed Database (Optional)

```bash
npm run db:seed
```

## 🔧 Environment Variables

### Frontend Environment Variables

Create `.env` file in `/frontend` directory:

```env
VITE_API_URL=http://localhost:5001
VITE_APP_NAME=Navrasi
```

### Backend Environment Variables

Create `.env` file in `/backend` directory:

```env
# Server
NODE_ENV=development
PORT=5001
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://navrasi_user:your_password@localhost:5432/navrasi

# OR (Alternative format)
DB_NAME=navrasi
DB_USER=navrasi_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_EXPIRES_IN=7d
SESSION_SECRET=your-session-secret-change-this-in-production
COOKIE_SECRET=your-cookie-secret-change-this-in-production

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🏃 Running the Application

### Development Mode

#### Option 1: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

#### Option 2: Run Concurrently (Recommended)

From root directory:
```bash
npm install
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5001
- **API Health Check:** http://localhost:5001/health

### Production Mode

```bash
# Build frontend
cd frontend
npm run build

# Start backend
cd ../backend
NODE_ENV=production npm start
```

## 📁 Project Structure

```
navrasi/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── products/
│   │   │   └── admin/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tests/
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── tests/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── DEPLOYMENT.md
│   └── ARCHITECTURE.md
│
├── .gitignore
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── LICENSE
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?page=1&limit=12&search=shirt&category=t-shirts
```

#### Get Product by ID
```http
GET /api/products/:id
```

#### Create Product (Admin)
```http
POST /api/products
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data

{
  "title": "Classic T-Shirt",
  "description": "Comfortable cotton t-shirt",
  "price": 29.99,
  "stock": 50,
  "category": "T-Shirts",
  "sizeOptions": ["S", "M", "L", "XL"],
  "colorOptions": ["White", "Black"],
  "images": [file1, file2]
}
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "uuid",
      "quantity": 2,
      "size": "M",
      "color": "Blue"
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "pincode": "10001"
  },
  "paymentMethod": "cod",
  "notes": "Please deliver in the evening"
}
```

#### Get User Orders
```http
GET /api/orders/my-orders?page=1&limit=10
Authorization: Bearer <token>
```

For complete API documentation, see [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)

## 🧪 Testing

### Run Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test

# Run all tests
npm run test:all

# Test coverage
npm run test:coverage
```

### Manual Testing Checklist

#### Authentication Flow
- [ ] User can register with email/password
- [ ] User can login with credentials
- [ ] User can login with Google OAuth
- [ ] Session persists on page refresh
- [ ] Session expires when browser closes
- [ ] User can logout successfully

#### Product Management
- [ ] Browse products with pagination
- [ ] Search products
- [ ] Filter by category
- [ ] View product details
- [ ] Admin can create products
- [ ] Admin can edit products
- [ ] Admin can delete products

#### Shopping Cart
- [ ] Add items to cart
- [ ] Update item quantity
- [ ] Remove items from cart
- [ ] Cart persists across sessions

#### Checkout & Orders
- [ ] Complete checkout process
- [ ] View order history
- [ ] Cancel pending orders
- [ ] Admin can update order status

## 🚢 Deployment

### Frontend Deployment (Vercel)

```bash
cd frontend
vercel --prod
```

### Backend Deployment (Heroku)

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create navrasi-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
# ... set all other env vars

# Push to Heroku
git push heroku main

# Run migrations
heroku run npm run db:migrate
```

### Database Deployment (Railway/Render)

1. Create PostgreSQL database on Railway/Render
2. Get connection string
3. Update `DATABASE_URL` in backend `.env`

For detailed deployment guides, see [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## 👥 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on:
- Code of Conduct
- Development process
- Submitting pull requests
- Coding standards
- Commit message conventions

### Quick Start for Contributors

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/your-username/navrasi.git

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes
# Commit with conventional commits
git commit -m "feat: add new feature"

# Push to your fork
git push origin feature/your-feature-name

# Open a Pull Request
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🤝 Support

For support, email support@navrasi.com or open an issue on GitHub.

## 👨‍💻 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

See also the list of [contributors](https://github.com/yourusername/navrasi/contributors) who participated in this project.

## 🙏 Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Express.js community
- All contributors and supporters

---

**Made with ❤️ by the Navrasi Team**