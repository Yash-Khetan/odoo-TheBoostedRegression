# 📦 StockMaster - Inventory Management System

<div align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</div>

<br>

A modern, full-stack **Inventory Management System** designed to streamline warehouse operations, stock tracking, and inventory analytics. Built with cutting-edge technologies for optimal performance and user experience.

## 🎥 Product Demo

📹 **[Watch Product Demo Video](https://drive.google.com/drive/folders/1xqXrq8NjQeHyp7iDaUgYtMoQxt4t-5QJ?usp=drive_link)**

---

## ✨ Features

### 📊 Dashboard & Analytics
- Real-time inventory overview with KPI metrics
- Interactive charts and visualizations
- Stock valuation and performance tracking
- Quick action widgets for common operations

### 📦 Stock Management
- Comprehensive stock level monitoring
- Low stock alerts and notifications
- Multi-warehouse inventory tracking
- Product categorization and SKU management
- Detailed and summary view modes

### 🏭 Warehouse Management
- Multi-location warehouse support
- Warehouse capacity tracking
- Location-based inventory distribution
- Warehouse performance metrics

### 📥 Receipts & Deliveries
- Create and manage incoming receipts
- Process outgoing deliveries
- Status tracking (Draft, Ready, Done)
- Vendor and customer management
- Reference number tracking

### 📜 Move History
- Complete audit trail of all stock movements
- Filter by movement type (Receipt, Delivery, Transfer, In Transit)
- Advanced search and filtering
- Detailed movement records with timestamps
- Export capabilities

### ⚙️ Settings & Configuration
- General settings (Company info, Currency, Timezone)
- User profile management
- Inventory settings (Reorder points, Low stock thresholds)
- Notification preferences (Email & In-app)
- Security settings (Password change, 2FA, Session timeout)

### 🔐 Authentication & Security
- Secure user registration and login
- OTP-based email verification
- JWT token-based authentication
- Session management
- Password encryption with bcrypt

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Toast notifications
- **Class Variance Authority** - Component variants

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web application framework
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service for OTP
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

---

## 📁 Project Structure

```
Local_odoo/
├── client/                      # Frontend React application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ui/             # Base UI components (Button, Card, Input, etc.)
│   │   │   ├── Layout.jsx      # Main layout with navigation
│   │   │   └── *Modal.jsx      # Modal components
│   │   ├── pages/              # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Stock.jsx
│   │   │   ├── Warehouses.jsx
│   │   │   ├── Receipts.jsx
│   │   │   ├── Deliveries.jsx
│   │   │   ├── MoveHistory.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/           # API service layer
│   │   ├── lib/                # Utility functions
│   │   └── App.jsx             # Root component
│   ├── public/
│   └── package.json
│
├── routes/                      # Backend API routes
│   ├── authroutes.js           # Authentication routes
│   ├── productRoutes.js        # Product management
│   ├── stockRoutes.js          # Stock operations
│   ├── warehouseRoutes.js      # Warehouse management
│   ├── receiptRoutes.js        # Receipt operations
│   ├── deliveryRoutes.js       # Delivery operations
│   ├── moveHistoryRoutes.js    # Movement tracking
│   ├── reportsRoutes.js        # Analytics & reports
│   └── settingsRoutes.js       # Settings management
│
├── controllers/                 # Business logic
│   └── reportsController.js    # Reports logic
│
├── config/                      # Configuration files
│   └── database.js             # Database connection
│
├── utils/                       # Utility functions
│
├── database/                    # Database scripts
│
├── server.js                    # Express server entry point
├── .env                         # Environment variables
└── package.json                 # Backend dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn**
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rishikesh831/Local_odoo.git
   cd Local_odoo
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   
   # Database Configuration
   DB_HOST=your_db_host
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   
   # JWT Secret
   JWT_SECRET=your_jwt_secret_key
   
   # Email Configuration (for OTP)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

5. **Set up the database**
   
   Create the PostgreSQL database and run migrations:
   ```bash
   # Create database tables
   node create-users-table.js
   node create-stock-moves-table.js
   ```

6. **Start the development servers**
   
   Terminal 1 (Backend):
   ```bash
   npm start
   # or
   node server.js
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd client
   npm run dev
   ```

7. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (sends OTP)
- `POST /api/auth/verify-otp` - Verify OTP and get JWT token

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Stock
- `GET /api/stock` - Get stock levels
- `GET /api/stock/detailed` - Get detailed stock by location
- `POST /api/stock` - Add stock

### Warehouses
- `GET /api/warehouses` - Get all warehouses
- `GET /api/warehouses/:id` - Get warehouse details
- `POST /api/warehouses` - Create warehouse
- `PUT /api/warehouses/:id` - Update warehouse

### Receipts
- `GET /api/receipts` - Get all receipts
- `POST /api/receipts` - Create receipt
- `PUT /api/receipts/:id` - Update receipt

### Deliveries
- `GET /api/deliveries` - Get all deliveries
- `POST /api/deliveries` - Create delivery
- `PUT /api/deliveries/:id` - Update delivery

### Move History
- `GET /api/moves` - Get all stock movements
- `GET /api/moves/:id` - Get movement details

### Reports
- `GET /api/reports/performance-metrics` - Get KPI metrics
- `GET /api/reports/top-moving-products` - Get top products
- `GET /api/reports/inventory-summary` - Get inventory summary
- `GET /api/reports/low-stock` - Get low stock items
- `GET /api/reports/warehouse-performance` - Get warehouse stats

### Settings
- `PUT /api/settings/general` - Update general settings
- `PUT /api/settings/profile` - Update user profile
- `PUT /api/settings/inventory` - Update inventory settings
- `PUT /api/settings/notifications` - Update notification preferences
- `PUT /api/settings/security` - Update security settings

---

## 🎨 UI Components

### Base Components
- **Button** - Variants: default, outline, ghost, destructive, link
- **Card** - Container with header, content, and footer sections
- **Input** - Text, number, date, email, password inputs
- **Select** - Dropdown selection
- **Badge** - Status indicators with color variants
- **Modal** - Overlay dialogs for forms

### Custom Components
- **Layout** - Top navigation with user menu and routing
- **CreateStockModal** - Add stock form
- **CreateWarehouseModal** - Add warehouse form
- **CreateReceiptModal** - Create receipt form
- **CreateDeliveryModal** - Create delivery form
- **StockMovementModal** - View movement details
- **StockAdjustmentModal** - Adjust stock quantities

---

## 🎯 Key Features Explained

### Real-time Stock Tracking
Monitor inventory levels across multiple warehouses with instant updates and low-stock alerts.

### Movement History & Audit Trail
Complete tracking of all stock movements with timestamps, references, and movement types for full accountability.

### Multi-warehouse Support
Manage inventory across multiple physical locations with warehouse-specific stock levels and performance metrics.

### Role-based Access (Coming Soon)
Control user permissions based on roles (Admin, Manager, Warehouse Staff).

### Advanced Reports & Analytics
Generate comprehensive reports on inventory valuation, product movements, and warehouse performance.

---

## 🔧 Configuration

### Database Schema

**Main Tables:**
- `users` - User authentication and profiles
- `products` - Product catalog
- `warehouses` - Warehouse locations
- `stock` - Current stock levels by location
- `receipts` - Incoming shipments
- `deliveries` - Outgoing shipments
- `stock_moves` - Complete movement history

### Customization

You can customize the application by:
- Modifying color variables in `client/src/index.css`
- Adjusting button styles in `client/src/components/ui/button.jsx`
- Configuring default settings in respective pages
- Adding custom validation rules in backend routes

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👥 Authors

- **Rishikesh831** - *Initial work* - [GitHub](https://github.com/Rishikesh831)
- **Deep** - *Development* - Contributor

---

## 🙏 Acknowledgments

- React and Vite teams for excellent development tools
- Lucide React for beautiful icons
- TailwindCSS for the utility-first CSS framework
- PostgreSQL community for robust database support

---

## 📞 Support

For support, email or open an issue in the GitHub repository.

---

## 🔮 Future Enhancements

- [ ] Mobile responsive design improvements
- [ ] Barcode/QR code scanning
- [ ] Advanced forecasting algorithms
- [ ] Integration with popular e-commerce platforms
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Export to Excel/PDF
- [ ] Role-based access control (RBAC)
- [ ] Automated reordering system
- [ ] Supplier management portal

---

<div align="center">
  <strong>Made with ❤️ by the StockMaster Team</strong>
  <br><br>
  ⭐ Star us on GitHub — it motivates us a lot!
</div>
