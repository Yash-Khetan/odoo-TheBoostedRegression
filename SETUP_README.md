# Inventory Management System

A full-stack inventory management system built with Node.js, Express, React, and PostgreSQL.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Project Structure

```
Local_odoo/
├── server.js           # Express server entry point
├── client/            # React frontend application
├── config/            # Database configuration
├── controllers/       # Business logic
├── routes/            # API routes
├── utils/             # Utility functions
└── .env              # Environment variables
```

## Setup Instructions

### 1. Database Setup

1. Install PostgreSQL if you haven't already
2. Create a new database:
   ```sql
   CREATE DATABASE inventory_db;
   ```

3. Create necessary tables (you'll need to run your schema/migration scripts)

### 2. Environment Configuration

The `.env` file has been created in the root directory. Update the following values:

```env
# Database Configuration
DB_USER=postgres              # Your PostgreSQL username
DB_HOST=localhost
DB_NAME=inventory_db          # Your database name
DB_PASS=your_database_password # Your PostgreSQL password
DB_PORT=5432

# Server Configuration
PORT=5000

# JWT Secret (Change this to a random string)
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production

# Email Configuration (for OTP functionality)
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password_here  # Gmail App Password (not regular password)
```

**Important Notes:**
- For Gmail, you need to use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password
- Change the JWT_SECRET to a strong random string in production
- Never commit the `.env` file to version control

### 3. Install Dependencies

Dependencies have been installed for both backend and frontend:

```bash
# Backend dependencies (already installed)
npm install

# Frontend dependencies (already installed)
cd client
npm install
```

## Running the Application

### Development Mode

**Terminal 1 - Backend Server:**
```bash
npm start
```
The backend will run on `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:5173` (Vite default port)

### Production Build

Build the frontend for production:
```bash
cd client
npm run build
```

## API Endpoints

The backend provides the following API routes:

- `/api/products` - Product management
- `/api/receipts` - Receipt operations
- `/api/deliveries` - Delivery management
- `/api/transfers` - Transfer operations
- `/api/adjustments` - Inventory adjustments
- `/api/warehouses` - Warehouse management

## Features

- Product inventory management
- Receipt and delivery tracking
- Warehouse transfers
- Inventory adjustments
- Dashboard with analytics
- Responsive UI with Tailwind CSS
- User authentication (OTP-based)

## Technologies Used

### Backend
- Node.js & Express
- PostgreSQL
- JWT for authentication
- Nodemailer for email notifications
- bcryptjs for password hashing

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Axios for API calls
- Lucide React for icons
- Radix UI components

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_ctl status`
- Check database credentials in `.env`
- Ensure the database exists and is accessible

### Email/OTP Issues
- Verify Gmail App Password is correctly set
- Check that 2-factor authentication is enabled on your Gmail account
- Ensure MAIL_USER and MAIL_PASS are correctly configured

### Port Already in Use
- Change the PORT in `.env` if 5000 is occupied
- Change Vite port in `client/vite.config.js` if needed

## Development Notes

- The frontend uses modern React 19 features
- The backend uses ES modules (type: "module" in package.json)
- CORS is enabled for cross-origin requests during development
- All routes use JWT authentication (configure as needed)

## Next Steps

1. Update the `.env` file with your actual credentials
2. Create/run database migration scripts to set up tables
3. Start the backend and frontend servers
4. Access the application at the frontend URL

## License

ISC
