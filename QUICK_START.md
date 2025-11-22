# 🚀 Quick Start - Stocks Page

## Step-by-Step Setup (5 minutes)

### 1️⃣ Setup Database (1 minute)
Open PowerShell and run:
```powershell
cd "c:\Users\Dell\OneDrive\Desktop\DS LAB ESE\Local_odoo"
psql -U postgres -d odoo-ims -f database/schema.sql
```

**Expected output:** `Database schema created successfully!`

### 2️⃣ Verify Servers are Running
Your servers should already be running. If not:

**Backend (Terminal 1):**
```powershell
npm start
```
Should show: `Server running on port 5000`

**Frontend (Terminal 2):**
```powershell
cd client
npm run dev
```
Should show: `Local: http://localhost:5173/`

### 3️⃣ Add Stocks Route to Your App

Open `client/src/App.jsx` and add the Stocks route:

```jsx
import Stocks from './pages/Stocks';

// In your routes:
<Route path="/stocks" element={<Stocks />} />
```

### 4️⃣ Access the Stocks Page
Open browser: `http://localhost:5173/stocks`

---

## ✅ What You Should See

### Dashboard Cards (Top)
- 📊 Total Stock Value: ₹XXX,XXX
- 🟢 In Stock: X products
- 🟡 Low Stock: X products  
- 🔴 Out of Stock: X products

### Filters (Middle)
- Search bar
- Warehouse dropdown
- Category dropdown
- Status dropdown
- Export button

### Stock Table (Bottom)
24 rows of inventory data across 4 warehouses

---

## 🎮 Try These Actions

1. **Search** - Type "Widget" in search box
2. **Filter** - Select "Main Warehouse" from dropdown
3. **Adjust Stock** - Click "Adjust" button on any row
   - Enter quantity change (e.g., +10 or -5)
   - Select reason
   - Click "Confirm Adjustment"
4. **View History** - Click history icon on any row
   - See all past movements
   - Filter by type (Receipts/Deliveries/Adjustments)

---

## 🐛 Troubleshooting

### Database Error?
```powershell
# Check if database exists
psql -U postgres -l | Select-String "odoo-ims"

# If not found, create it:
psql -U postgres -c "CREATE DATABASE \"odoo-ims\";"
```

### Backend Not Responding?
Check if server is running on port 5000:
```powershell
Get-NetTCPConnection -LocalPort 5000
```

### Frontend Error?
Check browser console (F12) for errors

---

## 📁 Files Created

### Database
- ✅ `database/schema.sql` - Complete database schema
- ✅ `database/README.md` - Setup instructions

### Backend
- ✅ `controllers/inventoryController.js` - 9 API endpoints
- ✅ `routes/inventoryRoutes.js` - Route definitions
- ✅ `server.js` - Updated with inventory routes

### Frontend
- ✅ `client/src/pages/Stocks.jsx` - Main stocks page
- ✅ `client/src/components/StockAdjustmentModal.jsx` - Adjustment modal
- ✅ `client/src/components/StockMovementModal.jsx` - History modal

### Documentation
- ✅ `STOCKS_PAGE_COMPLETE.md` - Full implementation details

---

## 🎯 Success Criteria

You'll know it's working when you can:
- [x] See 24 inventory records in the table
- [x] See 4 KPI cards with real data
- [x] Filter by warehouse (4 options)
- [x] Search products by name/SKU
- [x] Open adjustment modal
- [x] Create a stock adjustment
- [x] View movement history

---

## 🎓 Next Steps

Now that stocks page is complete, you can:
1. Add navigation link to stocks page in your sidebar/menu
2. Integrate with other pages (Products, Receipts, Deliveries)
3. Add authentication (currently using placeholder user_id: 1)
4. Customize styling to match your theme
5. Add export functionality (CSV/Excel)
6. Implement real-time notifications

---

## 📊 API Testing (Optional)

Test APIs directly using PowerShell:

```powershell
# Get all stock
Invoke-WebRequest -Uri "http://localhost:5000/api/inventory" -Method GET | Select-Object -ExpandProperty Content

# Get statistics
Invoke-WebRequest -Uri "http://localhost:5000/api/inventory/statistics" -Method GET | Select-Object -ExpandProperty Content

# Get stock alerts
Invoke-WebRequest -Uri "http://localhost:5000/api/inventory/alerts" -Method GET | Select-Object -ExpandProperty Content
```

Or use tools like:
- Postman
- Thunder Client (VS Code extension)
- curl

---

**You're all set! The Stocks page is ready to use! 🎉**

Need help? Check `STOCKS_PAGE_COMPLETE.md` for detailed documentation.
