# InstaShop - E-commerce Platform

![Project Logo](frontend/public/logo/instashop-logo.png)

A full-stack e-commerce application with React frontend and Node.js/Express backend.

## Features

### Frontend
- User authentication (login/registration)
- Product browsing and search
- Shopping cart functionality
- Order history tracking
- Responsive UI with modern design

### Backend
- RESTful API with JWT authentication
- MongoDB database integration
- Product management
- Order processing system
- User profile management

## Technologies Used

### Frontend
- React.js
- Vite
- React Router
- Context API for state management
- Axios for API calls
- Bootstrap for styling

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Bcrypt for password hashing

## Installation

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or cloud instance)
- Git

### Setup

1. Clone the repository:
```bash
git clone https://github.com/cooldp201001/InstaShop.git
cd InstaShop
```

2. Backend setup:
```bash
cd backend
npm install
```

3. Frontend setup:
```bash
cd ../frontend
npm install
```

## Configuration

1. Create a `.env` file in the backend directory with:
```
CONNECTION_STRING=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
```

2. For development, you may want to create a `.env` file in frontend for any frontend-specific variables.

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server (in a separate terminal):
```bash
cd frontend
npm run dev
```

3. Access the application at `http://localhost:5173`

## Project Structure

```
InstaShop/
├── backend/              # Backend server code
│   ├── Controllers/      # Route controllers
│   ├── Routes/           # API routes
│   ├── models/           # MongoDB models
│   ├── middlewares/      # Express middlewares
│   ├── utils/            # Utility functions
│   └── server.js         # Main server file
│
├── frontend/             # Frontend React application
│   ├── public/           # Static assets
│   ├── src/              # React source code
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Context providers
│   │   └── App.jsx       # Main application component
│   └── vite.config.js    # Vite configuration
│
└── README.md             # This file
```

## API Documentation

Key API endpoints:

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/cart` - Add to cart
- `GET /api/cart` - Get cart items
- `POST /api/orders` - Place order
- `GET /api/orders` - Get order history
