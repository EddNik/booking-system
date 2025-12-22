# Appointment Booking System - Frontend

A modern React-based frontend application for an appointment booking system. Built with TypeScript, React 19, and Vite.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Key Components](#key-components)
- [API Integration](#api-integration)

## ✨ Features

- **Dual Role System**: Separate interfaces for clients and businesses
- **Client Features**:
  - Browse and search businesses
  - Book appointments with date/time selection
  - View and manage personal appointments
  - Cancel appointments
- **Business Features**:
  - View all incoming appointments
  - Manage appointment calendar
  - Real-time appointment updates
- **Authentication**: Secure login/registration for both user types
- **Real-time Updates**: Uses TanStack Query for efficient data fetching and caching
- **Responsive Design**: Mobile-friendly interface
- **Form Validation**: Client-side validation with Formik and Yup

## 🛠 Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router DOM v7
- **State Management**: TanStack Query (React Query) v5
- **HTTP Client**: Axios
- **Form Handling**: Formik
- **Validation**: Yup
- **Styling**: CSS Modules
- **UI Components**: 
  - React Paginate (pagination)
  - React Hot Toast (notifications)
  - React Spinners (loading states)
- **Code Quality**: ESLint, TypeScript ESLint

## 📦 Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Backend API running (see API README)

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/EddNik/booking-system.git

# Navigate to frontend directory
cd booking-system/frontend

# Install dependencies
npm install
```

## 🔐 Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000
```

### Environment Variables Description:

| Variable       | Description                    | Default               |
| -------------- | ------------------------------ | --------------------- |
| `VITE_API_URL` | Backend API base URL           | http://localhost:3000 |

## 🏃 Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

Application will start on `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons
│   ├── components/      # React components
│   │   ├── App/         # Main app component
│   │   ├── Header/      # Navigation header
│   │   ├── ClientDashboard/   # Client interface
│   │   ├── BusinessDashboard/ # Business interface
│   │   ├── Loader/      # Loading indicator
│   │   ├── ErrorMessage/# Error display
│   │   ├── Pagination/  # Pagination component
│   │   └── ...
│   ├── services/        # API service layer
│   │   └── appointService.ts
│   ├── types/           # TypeScript type definitions
│   │   └── appointTypes.ts
│   ├── global.css       # Global styles
│   ├── index.css        # Base styles
│   └── main.tsx         # App entry point
├── .env.example         # Environment variables template
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite configuration
```

## 📜 Available Scripts

| Script    | Description                                    |
| --------- | ---------------------------------------------- |
| `dev`     | Start development server with hot reload      |
| `build`   | Build for production                           |
| `lint`    | Run ESLint to check code quality              |
| `preview` | Preview production build locally               |
| `push`    | Git add, commit, and push (custom script)      |

## 🧩 Key Components

### App Component
Main application component that handles:
- Authentication state
- Role-based routing
- Login/Registration forms
- User session management

### ClientDashboard
Client interface featuring:
- Business search functionality
- Appointment booking form
- Personal appointments list
- Appointment cancellation

### BusinessDashboard
Business interface featuring:
- Incoming appointments calendar
- Client information display
- Appointment management

### Header
Navigation component with:
- Role-based menu items
- User authentication status
- Logout functionality

## 🔌 API Integration

The application communicates with the backend API through the `appointService.ts` service layer.

### Key API Functions

```typescript
// Authentication
clientRegisterLogin(clientProfile, path): Promise<ClientRegLoginResponse>
businessRegisterLogin(businessProfile, path): Promise<BusinessRegLoginResponse>

// Business Operations
fetchBusinesses(query, page): Promise<FetchBusinessResponse>

// Appointment Operations
bookAppointment(bookingData): Promise<BookAppointmentResponse>
fetchClientAppointments(params): Promise<FetchClientAppointmentsResponse>
fetchBusinessAppointments(params): Promise<FetchBusinessAppointmentsResponse>
cancelAppointment(appointmentId): Promise<Appointment>
fetchAvailableAppoint(businessId, date): Promise<string[]>
```

### Axios Configuration

The application uses Axios with the following configuration:
```typescript
{
  baseURL: process.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,  // Send cookies with requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
}
```

## 🎨 Styling

The application uses CSS Modules for component-level styling, providing:
- Scoped styles per component
- No global CSS conflicts
- Easy maintenance and organization

Global styles are defined in:
- `global.css`: CSS variables and design tokens
- `index.css`: Base styles and resets

## 🔄 State Management

TanStack Query (React Query) is used for:
- Server state management
- Data caching
- Automatic refetching
- Optimistic updates
- Request deduplication

Query configuration:
```typescript
{
  defaultOptions: {
    queries: {
      staleTime: 50000,           // Data fresh for 50 seconds
      refetchOnWindowFocus: false // Don't refetch on window focus
    }
  }
}
```

## 🎯 TypeScript Types

Key type definitions:

```typescript
interface Appointment {
  _id: string;
  clientId: { _id: string; name: string; email: string };
  businessId: { _id: string; name: string; email: string };
  date: string;
  time: string;
  state?: "booked" | "available";
}

interface Client {
  _id: string;
  name?: string;
  email: string;
  password?: string;
}

interface Business {
  _id: string;
  name?: string;
  email: string;
  password: string;
}
```

## 🔍 Search & Filtering

The client dashboard includes:
- Real-time business search
- Debounced search input (using `use-debounce`)
- Paginated results
- Search by business name or email

## 🚦 Error Handling

The application includes comprehensive error handling:
- Form validation errors
- API request errors
- Network errors
- User-friendly error messages via React Hot Toast

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

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

## 🎉 Acknowledgments

- React team for React 19
- TanStack for React Query
- Vite team for the amazing build tool
