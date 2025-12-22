# Appointment Booking System - Backend API

A RESTful API for an appointment booking system that allows clients to book appointments with businesses. Built with Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Error Handling](#error-handling)

## ✨ Features

- **Client Management**: Register, login, logout, and delete client accounts
- **Business Management**: Register, login, logout, search, and delete business accounts
- **Appointment Booking**: Book, view, and cancel appointments
- **Session Management**: Secure cookie-based authentication with access and refresh tokens
- **Role-Based Access**: Separate endpoints for clients and businesses
- **Pagination**: All list endpoints support pagination
- **Search**: Full-text search for businesses

## 🛠 Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Cookie-based sessions with crypto tokens
- **Validation**: Celebrate (Joi wrapper)
- **Logging**: Pino with pino-pretty
- **Password Hashing**: bcrypt
- **Code Quality**: ESLint, Prettier

## 📦 Prerequisites

- Node.js >= 18.0.0
- MongoDB >= 7.0
- npm or yarn

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/EddNik/booking-system.git

# Navigate to api directory
cd booking-system/api

# Install dependencies
npm install
```

## 🔐 Environment Variables

Create a `.env` file in the `api` directory:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/booking-system
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
LOG_LEVEL=info
```

### Environment Variables Description:

| Variable       | Description                          | Default     |
| -------------- | ------------------------------------ | ----------- |
| `PORT`         | Server port                          | 3000        |
| `MONGO_URL`    | MongoDB connection string            | Required    |
| `FRONTEND_URL` | Frontend URL for CORS                | Required    |
| `NODE_ENV`     | Environment (development/production) | development |
| `LOG_LEVEL`    | Logging level (info/debug/error)     | info        |

## 🏃 Running the Application

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:3000`

## 📚 API Endpoints

### Client Endpoints

#### Register Client
```http
POST /client/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login Client
```http
POST /client/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Logout Client
```http
POST /client/logout
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
```

#### Refresh Client Session
```http
POST /client/refresh
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
```

#### Delete Client Account
```http
DELETE /client/delete
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### Business Endpoints

#### Register Business
```http
POST /business/register
Content-Type: application/json

{
  "name": "Tech Solutions Inc",
  "email": "contact@techsolutions.com",
  "password": "securepass123"
}
```

#### Login Business
```http
POST /business/login
Content-Type: application/json

{
  "email": "contact@techsolutions.com",
  "password": "securepass123"
}
```

#### Get All Businesses
```http
GET /businesses?page=1&perPage=10&search=tech
```

Query Parameters:
- `page` (number, default: 1): Page number
- `perPage` (number, default: 10, range: 5-20): Items per page
- `search` (string, optional): Search by name or email

### Appointment Endpoints

> 🔒 All appointment endpoints require authentication

#### Get Available Appointments
```http
GET /appointments/available?businessId=507f1f77bcf86cd799439012&date=2024-12-25
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
```

#### Book Appointment
```http
POST /bookAppointment
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
Content-Type: application/json

{
  "clientId": "507f1f77bcf86cd799439011",
  "businessId": "507f1f77bcf86cd799439012",
  "date": "2024-12-25",
  "time": "10:00"
}
```

#### Get Client's Appointments
```http
GET /appointments/client?state=booked&page=1&perPage=10
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
```

#### Get Business's Appointments
```http
GET /appointments/business?state=booked&page=1&perPage=10
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
```

#### Cancel Appointment
```http
PATCH /appointments/reject/:appointmentId
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
```

## 🗄️ Database Models

### Client Schema
```javascript
{
  name: String,
  email: String (unique, required),
  password: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Business Schema
```javascript
{
  name: String,
  email: String (unique, required),
  password: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Schema
```javascript
{
  clientId: ObjectId (ref: Client),
  businessId: ObjectId (ref: Business),
  date: String (required),
  time: String (required, enum: BOOK_HOURS),
  state: String (enum: ['booked', 'available']),
  createdAt: Date,
  updatedAt: Date
}
```

### Session Schema
```javascript
{
  client: ObjectId (ref: Client),
  business: ObjectId (ref: Business),
  accessToken: String (required),
  refreshToken: String (required),
  accessTokenValidUntil: Date (required),
  refreshTokenValidUntil: Date (required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔑 Authentication

The API uses cookie-based session authentication:

- **Access Token**: Valid for 15 minutes
- **Refresh Token**: Valid for 1 day
- **Session ID**: Used to identify the session

All tokens are stored in HTTP-only, secure cookies with SameSite=None attribute for cross-origin requests.

## ⚠️ Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `204`: No Content
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

## 📝 Available Booking Hours

Appointments can be booked during the following hours:
```javascript
['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Eduard Vyskrebtsov**
- Email: evyskrebtsov@gmail.com
- GitHub: [@EddNik](https://github.com/EddNik)

## 🐛 Issues

Found a bug? Please open an issue at [GitHub Issues](https://github.com/EddNik/booking-system/issues)
