## API(backend)

A RESTful API for an appointment booking system that allows clients to book appointments with businesses. Built with Node.js, Express, and MongoDB.

### 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Client Endpoints](#client-endpoints)
  - [Business Endpoints](#business-endpoints)
  - [Appointment Endpoints](#appointment-endpoints)
- [Available Booking Hours](#available-booking-hours)
- [Authentication](#authentication)
- [Error Responses](#error-responses)
- [Database Models](#database-models)

---

### ✨ Features

- **Client Management**: Register, login, logout, and delete client accounts
- **Business Management**: Register, login, logout, search, and delete business accounts
- **Appointment Booking**: Book, view, and cancel appointments
- **Session Management**: Secure cookie-based authentication with access and refresh tokens
- **Role-Based Access**: Separate endpoints for clients and businesses
- **Pagination**: All list endpoints support pagination
- **Search**: Full-text search for businesses

---

### 🛠 Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Cookie-based sessions with crypto tokens
- **Validation**: Celebrate (Joi wrapper)
- **Logging**: Pino with pino-pretty
- **Password Hashing**: bcrypt
- **Code Quality**: ESLint, Prettier

---

### 📦 Prerequisites

- Node.js >= 18.0.0
- MongoDB >= 7.0
- npm or yarn

---

### 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/EddNik/booking-system.git

# Navigate to api directory
cd booking-system/api

# Install dependencies
npm install
```

---

### 🔐 Environment Variables

Create a `.env` file in the `api` directory:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/booking-system
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
LOG_LEVEL=info
```

#### Environment Variables Description:

| Variable       | Description                          | Default     |
| -------------- | ------------------------------------ | ----------- |
| `PORT`         | Server port                          | 3000        |
| `MONGO_URL`    | MongoDB connection string            | Required    |
| `FRONTEND_URL` | Frontend URL for CORS                | Required    |
| `NODE_ENV`     | Environment (development/production) | development |
| `LOG_LEVEL`    | Logging level (info/debug/error)     | info        |

---

### 🏃 Running the Application

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start

# Commit and push changes (custom script)
npm run push
```

Server will start on `http://localhost:3000`

---

### 📚 API Documentation

Base URL: `http://localhost:3000`

---

### 👤 Client Endpoints

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

**Response (201 Created):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-12-20T12:00:00.000Z",
  "updatedAt": "2024-12-20T12:00:00.000Z"
}
```

---

#### Login Client

```http
POST /client/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-12-20T12:00:00.000Z",
  "updatedAt": "2024-12-20T12:00:00.000Z"
}
```

Sets cookies: `accessToken`, `refreshToken`, `sessionId`

---

#### Logout Client

```http
POST /client/logout
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
```

**Response (204 No Content)**

---

#### Refresh Client Session

```http
POST /client/refresh
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
```

**Response (200 OK):**

```json
{
  "message": "Session refreshed"
}
```

---

#### Delete Client Account

```http
DELETE /client/delete
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response (204 No Content)**

> ⚠️ This will also set all client's booked appointments to "available"

---

### 🏢 Business Endpoints

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

**Response (201 Created):**

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Tech Solutions Inc",
  "email": "contact@techsolutions.com",
  "createdAt": "2024-12-20T12:00:00.000Z",
  "updatedAt": "2024-12-20T12:00:00.000Z"
}
```

---

#### Login Business

```http
POST /business/login
Content-Type: application/json

{
  "email": "contact@techsolutions.com",
  "password": "securepass123"
}
```

**Response (200 OK):**

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Tech Solutions Inc",
  "email": "contact@techsolutions.com",
  "createdAt": "2024-12-20T12:00:00.000Z",
  "updatedAt": "2024-12-20T12:00:00.000Z"
}
```

---

#### Logout Business

```http
POST /business/logout
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
```

**Response (204 No Content)**

---

#### Get All Businesses

```http
GET /businesses?page=1&perPage=10&search=tech
```

**Query Parameters:**

| Parameter | Type   | Required | Default | Description             |
| --------- | ------ | -------- | ------- | ----------------------- |
| `page`    | number | No       | 1       | Page number             |
| `perPage` | number | No       | 10      | Items per page (5-20)   |
| `search`  | string | No       | -       | Search by name or email |

**Response (200 OK):**

```json
{
  "page": 1,
  "perPage": 10,
  "totalBusinesses": 25,
  "totalPages": 3,
  "businesses": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Tech Solutions Inc",
      "email": "contact@techsolutions.com",
      "createdAt": "2024-12-20T12:00:00.000Z",
      "updatedAt": "2024-12-20T12:00:00.000Z"
    }
  ]
}
```

---

#### Refresh Business Session

```http
POST /business/refresh
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
```

**Response (200 OK):**

```json
{
  "message": "Session refreshed"
}
```

---

#### Delete Business Account

```http
DELETE /business/delete
Content-Type: application/json

{
  "email": "contact@techsolutions.com"
}
```

**Response (204 No Content)**

> ⚠️ This will also set all business's booked appointments to "available"

---

### 📅 Appointment Endpoints

> 🔒 **All appointment endpoints require authentication**

---

#### Get Available Appointments

Get available time slots for a business on a specific date.

```http
GET /appointments/available?businessId=507f1f77bcf86cd799439012&date=2024-12-25
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
```

**Query Parameters:**

| Parameter    | Type   | Required | Description               |
| ------------ | ------ | -------- | ------------------------- |
| `businessId` | string | Yes      | Business MongoDB ObjectId |
| `date`       | string | Yes      | Date in YYYY-MM-DD format |

**Response (200 OK):**

```json
["09:00", "10:00", "11:00", "14:00", "15:00"]
```

---

#### Book Appointment

```http
POST /appointments/book
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
Content-Type: application/json

{
  "clientId": "507f1f77bcf86cd799439011",
  "businessId": "507f1f77bcf86cd799439012",
  "date": "2024-12-25",
  "time": "10:00"
}
```

**Response (201 Created):**

```json
{
  "_id": "507f1f77bcf86cd799439013",
  "clientId": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "businessId": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Tech Solutions Inc",
    "email": "contact@techsolutions.com"
  },
  "date": "2024-12-25",
  "time": "10:00",
  "state": "booked",
  "createdAt": "2024-12-20T12:00:00.000Z",
  "updatedAt": "2024-12-20T12:00:00.000Z"
}
```

---

#### Get Client's Appointments

Get all appointments for the authenticated client.

```http
GET /appointments/client?state=booked&page=1&perPage=10
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
```

**Query Parameters:**

| Parameter | Type   | Required | Default | Description                        |
| --------- | ------ | -------- | ------- | ---------------------------------- |
| `state`   | string | No       | booked  | Filter by state (booked/available) |
| `page`    | number | No       | 1       | Page number                        |
| `perPage` | number | No       | 10      | Items per page (5-20)              |

**Response (200 OK):**

```json
{
  "page": 1,
  "perPage": 10,
  "totalAppointments": 5,
  "totalPages": 1,
  "appointments": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "businessId": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Tech Solutions Inc",
        "email": "contact@techsolutions.com"
      },
      "date": "2024-12-25",
      "time": "10:00",
      "state": "booked",
      "createdAt": "2024-12-20T12:00:00.000Z",
      "updatedAt": "2024-12-20T12:00:00.000Z"
    }
  ]
}
```

---

#### Get Business's Appointments

Get all appointments for the authenticated business.

```http
GET /appointments/business?state=booked&page=1&perPage=10
Cookie: accessToken=xxx; refreshToken=xxx; sessionId=xxx
```

**Query Parameters:** Same as client appointments

**Response (200 OK):**

```json
{
  "page": 1,
  "perPage": 10,
  "totalAppointments": 15,
  "totalPages": 2,
  "appointments": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "clientId": {
        "_id": "507f1f77bcf86cd799439011",
```
