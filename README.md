# StockMaster - Inventory Management System

A comprehensive, real-time inventory management system built with React, Node.js, Express, and PostgreSQL. StockMaster helps businesses digitize and streamline all stock-related operations, replacing manual registers and Excel sheets with a centralized, easy-to-use application.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 👥 Team - TheBoostedRegression

- **Deep**
- **Abhishek** 
- **Rishikesh** 
- **Yash**

## 🚀 Features

### 📦 Product Management
- Create and manage product catalog (Name, SKU, Category, UoM)
- Set reordering rules and stock levels
- Track product categories
- Product search and filtering

### 🏪 Warehouse Management
- Multiple warehouse support
- Location-based inventory tracking
- Warehouse capacity management
- Manager and contact information

### 📊 Stock Operations
- **Receipts (Incoming Goods)**: Record vendor shipments
- **Deliveries (Outgoing Goods)**: Track customer orders
- **Internal Transfers**: Move stock between warehouses/locations
- **Stock Adjustments**: Fix inventory discrepancies
- **Move History**: Complete audit trail of all movements

### 📈 Dashboard & Analytics
- Real-time inventory statistics
- Low stock alerts
- Out of stock notifications
- Pending receipts and deliveries
- Stock value tracking

### 🔐 Authentication & Security
- User registration and login
- OTP-based verification
- JWT token authentication
- Protected routes
- Role-based access control

### 🎨 Modern UI/UX
- Clean, responsive design
- Dark/light mode support
- Toast notifications
- Modal-based workflows
- Real-time data updates

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI framework
- **React Router 7.9.6** - Client-side routing
- **Vite 7.2.5** - Build tool
- **Tailwind CSS 3.4.1** - Styling
- **Axios 1.13.2** - HTTP client
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **PostgreSQL** - Database
- **bcryptjs** - Password hashing
- **JWT** - Authentication tokens
- **dotenv** - Environment management
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Rishikesh831/Local_odoo.git
cd Local_odoo
```

### 2. Backend Setup

#### Install Dependencies
```bash
npm install
```

#### Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret_key
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
```

#### Database Setup
Create the database and run migrations:
```sql
CREATE DATABASE odoo_ims;
```

The application will automatically create the necessary tables on first run.

### 3. Frontend Setup

#### Navigate to Client Directory
```bash
cd client
```

#### Install Dependencies
```bash
npm install
```

#### Configure Environment (Optional)
Create a `.env` file in the `client` directory if needed:
```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Running the Application

### Development Mode

#### Start Backend Server
From the root directory:
```bash
npm start
```
Server runs on `http://localhost:5000`

#### Start Frontend Development Server
From the client directory:
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Mode

#### Build Frontend
```bash
cd client
npm run build
```

#### Serve Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
Local_odoo/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # Base UI components
│   │   │   ├── Layout.jsx    # Main layout wrapper
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── CreateProductModal.jsx
│   │   │   ├── CreateWarehouseModal.jsx
│   │   │   └── CreateStockModal.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Stock.jsx
│   │   │   ├── Warehouses.jsx
│   │   │   ├── Receipts.jsx
│   │   │   ├── Deliveries.jsx
│   │   │   ├── MoveHistory.jsx
│   │   │   └── Settings.jsx
│   │   ├── lib/              # Utility functions
│   │   ├── services/         # API services
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── public/               # Static assets
│   └── package.json
│
├── config/
│   └── db.js                 # Database configuration
│
├── controllers/              # Business logic
│   ├── authcontroller.js
│   ├── productController.js
│   ├── warehouseController.js
│   ├── inventoryController.js
│   ├── receiptController.js
│   ├── deliveryController.js
│   ├── transferController.js
│   ├── adjustmentController.js
│   ├── moveHistoryController.js
│   └── dashboardController.js
│
├── routes/                   # API routes
│   ├── authroutes.js
│   ├── productRoutes.js
│   ├── warehouseRoutes.js
│   ├── receiptRoutes.js
│   ├── deliveryRoutes.js
│   ├── transferRoutes.js
│   ├── adjustmentRoutes.js
│   └── moveHistoryRoutes.js
│
├── utils/                    # Utility functions
│   ├── generatetoken.js
│   ├── otpStore.js
│   └── send-otp.js
│
├── server.js                 # Express server setup
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (sends OTP)
- `POST /api/auth/verify-otp` - Verify OTP and get token

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Warehouses
- `GET /api/warehouses` - Get all warehouses
- `POST /api/warehouses` - Create new warehouse
- `GET /api/warehouses/:id` - Get warehouse by ID
- `PUT /api/warehouses/:id` - Update warehouse
- `DELETE /api/warehouses/:id` - Delete warehouse

### Inventory
- `GET /api/inventory` - Get all stock levels
- `GET /api/inventory/statistics` - Get inventory statistics
- `GET /api/inventory/alerts` - Get low stock alerts
- `POST /api/inventory/adjustment` - Create stock adjustment

### Receipts
- `GET /api/receipts` - Get all receipts
- `POST /api/receipts` - Create new receipt
- `GET /api/receipts/:id` - Get receipt by ID
- `PUT /api/receipts/:id` - Update receipt
- `DELETE /api/receipts/:id` - Delete receipt

### Deliveries
- `GET /api/deliveries` - Get all deliveries
- `POST /api/deliveries` - Create new delivery
- `GET /api/deliveries/:id` - Get delivery by ID
- `PUT /api/deliveries/:id` - Update delivery
- `DELETE /api/deliveries/:id` - Delete delivery

### Transfers
- `GET /api/transfers` - Get all transfers
- `POST /api/transfers` - Create new transfer
- `GET /api/transfers/:id` - Get transfer by ID
- `PUT /api/transfers/:id` - Update transfer
- `DELETE /api/transfers/:id` - Delete transfer

### Move History
- `GET /api/moves` - Get all moves (combined receipts, deliveries, transfers)
- `GET /api/moves/statistics` - Get move statistics
- `GET /api/moves/:type/:id` - Get specific move details
- `PUT /api/moves/:type/:id/status` - Update move status

## 🎯 Key Features Explained

### Move History
The Move History feature provides a unified view of all inventory movements:
- **Color Coding**: Green for receipts (IN), Red for deliveries (OUT), Blue for transfers
- **List View**: Table format with all move details
- **Kanban View**: Visual board organized by status (Draft, Ready, In Transit, Completed)
- **Filters**: Search by reference, contact, status, move type, date range
- **Export**: Download move history as CSV

### Stock Management
- **Real-time tracking** across multiple warehouses
- **Location-based** inventory (warehouse → location → product)
- **Automatic stock updates** on receipts, deliveries, and transfers
- **Stock alerts** for low stock and out-of-stock items

### Authentication Flow
1. User registers with email and password
2. User logs in with credentials
3. System sends 6-digit OTP to email
4. User verifies OTP
5. System issues JWT token
6. Token used for all authenticated requests

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- OTP verification for login
- Protected API routes
- Environment variable protection
- Input validation and sanitization

## 📱 Responsive Design

StockMaster is fully responsive and works seamlessly on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🧪 Testing

### Backend Testing
```bash
# Run backend tests
npm test
```

### Frontend Testing
```bash
cd client
npm run test
```

## 🚢 Deployment

### Backend Deployment (Render/Heroku)
1. Set environment variables in hosting platform
2. Push code to repository
3. Platform will auto-deploy

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables

### Database (Render PostgreSQL)
- Current database hosted on Render
- Connection string in `.env` file
- Ensure SSL is enabled for production

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
 

## 📧 Support

For support, email support@stockmaster.com or open an issue in the repository.

## 🙏 Acknowledgments

- React team for the amazing framework
- Express team for the robust backend framework
- PostgreSQL team for the reliable database
- All contributors and testers

## 📊 Project Status

Current Version: **1.0.0**
Status: **Active Development**

### Roadmap
- [ ] Multi-language support
- [ ] Advanced reporting and analytics
- [ ] Barcode scanning integration
- [ ] Mobile app (React Native)
- [ ] Batch and serial number tracking
- [ ] Purchase order management
- [ ] Vendor management
- [ ] Integration with accounting software

---

Made with ❤️ by the StockMaster Team
