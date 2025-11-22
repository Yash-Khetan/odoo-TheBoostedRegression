# Database Setup Guide

## Prerequisites
- PostgreSQL 12 or higher installed
- Database `odoo-ims` created (as per your .env file)
- psql command-line tool or pgAdmin

## Step 1: Connect to PostgreSQL

### Using psql (Command Line):
```bash
psql -U postgres -d odoo-ims
```

### Using pgAdmin:
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Navigate to the `odoo-ims` database
4. Open Query Tool

## Step 2: Run the Schema Script

### Option A: Using psql
```bash
psql -U postgres -d odoo-ims -f database/schema.sql
```

### Option B: Using pgAdmin
1. Open Query Tool for `odoo-ims` database
2. Open the file `database/schema.sql`
3. Click Execute (F5)

## Step 3: Verify Installation

Run this query to check if tables were created:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see these tables:
- users
- products
- warehouses
- inventory
- receipts
- deliveries
- transfers
- adjustments

## Step 4: Verify Sample Data

Check if sample data was inserted:
```sql
-- Check products
SELECT COUNT(*) FROM products;  -- Should return 8

-- Check warehouses
SELECT COUNT(*) FROM warehouses;  -- Should return 4

-- Check inventory
SELECT COUNT(*) FROM inventory;  -- Should return 24

-- View current stock levels
SELECT * FROM v_current_stock LIMIT 10;
```

## Database Schema Overview

### Core Tables:

1. **users** - User accounts with roles
2. **products** - Product catalog with SKU, pricing, reorder levels
3. **warehouses** - Warehouse/location master data
4. **inventory** - Current stock levels (product × warehouse)
5. **receipts** - Incoming stock transactions
6. **deliveries** - Outgoing stock transactions
7. **transfers** - Inter-warehouse movements
8. **adjustments** - Stock corrections and adjustments

### Views:

1. **v_current_stock** - Denormalized view of current stock with all details
2. **v_stock_movements** - Unified view of all stock movements (receipts, deliveries, adjustments)

## Troubleshooting

### Error: Database does not exist
Create the database first:
```sql
CREATE DATABASE "odoo-ims";
```

### Error: Permission denied
Grant necessary permissions:
```sql
GRANT ALL PRIVILEGES ON DATABASE "odoo-ims" TO postgres;
```

### Reset Database (Caution: This will delete all data)
```sql
-- Drop all tables
DROP TABLE IF EXISTS adjustments CASCADE;
DROP TABLE IF EXISTS transfers CASCADE;
DROP TABLE IF EXISTS deliveries CASCADE;
DROP TABLE IF EXISTS receipts CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS warehouses CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Then re-run the schema.sql file
```

## Sample Data Included

The schema includes sample data for testing:
- 3 users (admin, manager, user)
- 4 warehouses (Main, North, South, Distribution Center)
- 8 products across various categories
- 24 inventory records (stock levels)
- Sample transactions (receipts, deliveries, transfers, adjustments)

## Next Steps

After database setup:
1. Update `.env` file with correct database credentials
2. Start the backend server: `npm start`
3. Start the frontend: `cd client && npm run dev`
4. Navigate to Stocks page to see the data

## API Endpoints Available

Once the server is running, these endpoints will be available:

- `GET /api/inventory` - Get all stock levels
- `GET /api/inventory/summary` - Get stock summary
- `GET /api/inventory/statistics` - Get stock statistics
- `GET /api/inventory/alerts` - Get low/out of stock alerts
- `GET /api/inventory/movements` - Get stock movement history
- `GET /api/inventory/product/:id` - Get stock by product
- `GET /api/inventory/warehouse/:id` - Get stock by warehouse
- `POST /api/inventory/adjustment` - Create stock adjustment
- `PUT /api/inventory/reserved` - Update reserved quantity
