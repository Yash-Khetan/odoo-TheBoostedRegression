# StockMaster React Frontend

Modern React application for inventory management built with Vite, React Router, Tailwind CSS, shadcn/ui, and Lucide React icons.

## 🚀 Features

- ✅ Modern React 18 with JSX
- ✅ React Router v6 for navigation
- ✅ Tailwind CSS for styling
- ✅ shadcn/ui component library
- ✅ Lucide React icons
- ✅ Fully responsive design
- ✅ Clean and modern UI
- ✅ Fast development with Vite

## 📦 Installation

```bash
cd client
npm install
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── select.jsx
│   │   │   └── badge.jsx
│   │   └── Layout.jsx       # Main layout with sidebar
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Receipts.jsx
│   │   ├── Deliveries.jsx
│   │   ├── CreateOrder.jsx
│   │   ├── Reports.jsx
│   │   └── Settings.jsx
│   ├── lib/
│   │   └── utils.js         # Utility functions
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── jsconfig.json
```

## 🎨 Design System

### Colors
- **Green (#73A97F)** - Primary actions, success states
- **Orange (#D98C73)** - Warnings, reorder alerts
- **Yellow (#EEDC82)** - Processing states
- **Blue (#6B9BD1)** - Info, draft states
- **Gray** - Neutral backgrounds and text

### Components
- Cards with shadows
- Buttons (primary, outline, ghost, icon)
- Tables with hover states
- Forms with validation styling
- Status badges
- Progress bars
- Responsive grid layouts

## 📄 Pages

### Dashboard (`/` or `/dashboard`)
- KPI cards showing key metrics
- Recent orders table
- Production schedule with progress bars
- Inventory alerts

### Products (`/products`)
- Product listing table
- Search and filters
- Status badges
- Pagination

### Product Details (`/products/:id`)
- Detailed product information
- Stock levels
- Location information

### Receipts (`/receipts`)
- Incoming shipments management
- Vendor information
- Status tracking
- Summary statistics

### Deliveries (`/deliveries`)
- Outgoing shipments management
- Customer information
- Delivery status tracking
- Summary statistics

### Create Order (`/create-order`)
- Order form with line items
- Product selection
- Quantity and pricing
- Order summary with totals

### Reports (`/reports`)
- Report categories (Inventory, Operations, Financial)
- Performance summary
- Top moving products
- Export functionality

### Settings (`/settings`)
- General settings
- User profile
- Inventory configuration
- Notification preferences
- Security settings

## 🔌 API Integration

To connect to the FastAPI backend:

1. Update the API base URL in your components
2. Use axios or fetch for HTTP requests
3. Backend API runs at `http://localhost:8000`

Example:
```jsx
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Fetch products
const products = await axios.get(`${API_BASE_URL}/products/`);
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **class-variance-authority** - Component variants
- **clsx + tailwind-merge** - Conditional classes

## 📝 Development Tips

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `App.jsx`
3. Update the sidebar navigation in `Layout.jsx`

### Using UI Components
```jsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>My Card</CardTitle>
  </CardHeader>
  <CardContent>
    <Button>Click Me</Button>
  </CardContent>
</Card>
```

### Status Badges
```jsx
import { Badge } from '@/components/ui/badge';

<Badge variant="success">Complete</Badge>
<Badge variant="warning">Low Stock</Badge>
<Badge variant="danger">Out of Stock</Badge>
<Badge variant="info">Shipped</Badge>
<Badge variant="draft">Draft</Badge>
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT

## 👥 Team

Built for **OdooXHack Hackathon 2025**
