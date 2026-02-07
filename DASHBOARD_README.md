# Waynex Logistics - User Dashboard Documentation

## Overview

A complete, production-ready user dashboard for the Waynex Logistics system, built with Next.js 16, featuring the elegant gold/dark theme from the main website and inspired by the Quantum dashboard template structure.

---

## Features

### ✅ **Dashboard Pages**

1. **Main Dashboard** (`/dashboard`)
   - 4 stat cards (Total, In Transit, Delivered, Pending)
   - Recent shipments table (last 5 shipments)
   - Quick action cards (New Booking, Track Shipment, Get Quote)
   - Real-time data from backend API

2. **My Shipments** (`/dashboard/my-shipments`)
   - Tabbed interface (Ongoing, Delivered, Pending)
   - Advanced search functionality
   - Shipment tracking integration
   - Filterable by status
   - Responsive table design

3. **Payments** (`/dashboard/payments`)
   - Payment history table
   - Payment status indicators (Approved, Pending, Rejected)
   - Summary cards (Total, Approved, Pending)
   - UTR reference display

4. **Address Book** (`/dashboard/address-book`)
   - Separate tabs for Sender and Receiver addresses
   - Add/Edit/Delete functionality
   - Card-based address display
   - Quick access for booking

5. **Documents** (`/dashboard/documents`)
   - Invoice downloads
   - AWB label viewing
   - Document management
   - Organized by shipment

---

## Design System

### Theme Colors
```css
--gold: #C5A059        /* Primary brand color */
--dark: #121212        /* Background */
--darker: #1a1a1a      /* Secondary background */
--gray: #2A2A2A        /* Cards/surfaces */
--light: #F5F5F0       /* Text */
```

### Typography
- **Headings**: Cormorant Garamond (Serif)
- **Body**: Montserrat (Sans-serif)

### Design Features
- Glassmorphism effects
- Gradient backgrounds
- Smooth transitions (300ms)
- Hover states with scale/glow
- Border accents with gold
- Responsive design (mobile-first)

---

## File Structure

```
app/dashboard/
├── layout.tsx                 # Dashboard layout with sidebar
├── page.tsx                   # Main dashboard page
├── my-shipments/
│   └── page.tsx              # Shipments management
├── payments/
│   └── page.tsx              # Payment history
├── address-book/
│   └── page.tsx              # Saved addresses
└── documents/
    └── page.tsx              # Documents & invoices
```

---

## Component Breakdown

### Dashboard Layout (`layout.tsx`)

**Features:**
- Fixed sidebar navigation
- Responsive mobile menu
- User profile section
- Logout functionality
- Theme toggle (dark/light)
- Notification indicator
- Active route highlighting

**Navigation Items:**
```typescript
- Dashboard      (LayoutDashboard icon)
- My Shipments   (Package icon)
- Payments       (CreditCard icon)
- Address Book   (BookUser icon)
- Documents      (FileText icon)
```

### Stat Cards

**Format:**
- Icon (top right)
- Label (uppercase, small)
- Value (large, serif font)
- Hover effect with glow
- Gradient background

**Example:**
```tsx
<div className="stat-card">
  <Package className="icon" />
  <p className="label">Total Shipments</p>
  <p className="value">{stats.total}</p>
</div>
```

### Data Tables

**Features:**
- Sticky header
- Hover row highlighting
- Status badges with colors
- Action buttons
- Responsive overflow
- Loading states

**Status Colors:**
- Delivered: Green (#22c55e)
- In Transit: Blue (#3b82f6)
- Booked: Gold (#C5A059)
- Pending: Orange (#f97316)
- Rejected: Red (#ef4444)

---

## API Integration

### Endpoints Used

1. **Get Shipments**
   ```
   GET /api/shipments?email={userEmail}
   ```
   - Used in: Dashboard, My Shipments, Documents
   - Returns: Array of shipment objects

2. **Get Payments**
   ```
   GET /api/user/payments?email={userEmail}
   ```
   - Used in: Payments page
   - Returns: Array of payment objects

3. **Get Addresses**
   ```
   GET /api/customer/addresses
   Headers: X-User-Email: {userEmail}
   ```
   - Used in: Address Book
   - Returns: Array of saved addresses

4. **Delete Address**
   ```
   DELETE /api/customer/addresses/{id}
   Headers: X-User-Email: {userEmail}
   ```
   - Used in: Address Book
   - Returns: Success message

### Data Models

**Shipment Interface:**
```typescript
interface Shipment {
  id: number;
  shipment_id_str: string;
  receiver_name: string;
  receiver_address_city: string;
  sender_name: string;
  service_type: string;
  booking_date: string;
  status: string;
  total_with_tax_18_percent: number;
}
```

**Payment Interface:**
```typescript
interface Payment {
  id: number;
  shipment_id_str: string;
  amount: number;
  utr: string;
  status: string;  // Approved, Pending, Rejected
  created_at: string;
}
```

**Address Interface:**
```typescript
interface SavedAddress {
  id: number;
  nickname: string;
  name: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_pincode: string;
  address_country: string;
  phone: string;
  address_type: "sender" | "receiver";
}
```

---

## Authentication

### Storage
- User email stored in `localStorage.userEmail`
- Token stored in `localStorage.userToken` (if using JWT)

### Protected Routes
All dashboard pages check for authentication:
```typescript
useEffect(() => {
  const email = localStorage.getItem("userEmail");
  if (!email) {
    router.push("/login");
  }
}, []);
```

### Logout
```typescript
const handleLogout = () => {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userToken");
  router.push("/");
};
```

---

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Hamburger menu for sidebar
- Overlay backdrop
- Stacked stat cards
- Horizontal scroll for tables
- Collapsible sections

---

## Loading States

All pages implement loading states:

```tsx
{isLoading ? (
  <div className="loader">
    <div className="spinner" />
    <p>Loading...</p>
  </div>
) : (
  // Content
)}
```

---

## Empty States

Each page has custom empty states:

**Example:**
```tsx
<div className="empty-state">
  <Package className="icon" />
  <p className="title">No shipments yet</p>
  <p className="description">Create your first shipment to get started</p>
  <Link href="/booking">
    <button>Create Shipment</button>
  </Link>
</div>
```

---

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Usage in code:**
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
```

---

## Installation & Setup

### 1. Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running on port 5000

### 2. Install Dependencies
```bash
cd waynex-logistics
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env.local
# Edit .env.local with your API URL
```

### 4. Run Development Server
```bash
npm run dev
```

Dashboard available at: `http://localhost:3000/dashboard`

---

## Features Summary

### ✅ Implemented
- [x] Responsive dashboard layout
- [x] Sidebar navigation with icons
- [x] User profile section
- [x] Stat cards with animations
- [x] Recent shipments table
- [x] My Shipments with tabs and search
- [x] Payment history with status
- [x] Address book CRUD
- [x] Documents listing
- [x] Loading states
- [x] Empty states
- [x] Mobile responsive
- [x] Theme toggle
- [x] Logout functionality

### 🔄 Future Enhancements
- [ ] Real-time notifications
- [ ] Chart visualizations (revenue, shipment trends)
- [ ] Export to CSV functionality
- [ ] Advanced filters
- [ ] Bulk operations
- [ ] Dark mode persistence
- [ ] Profile settings page
- [ ] Download all invoices (ZIP)

---

## Customization

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --gold: #YOUR_COLOR;
  --bg: #YOUR_BG;
}
```

### Add New Page
1. Create directory: `app/dashboard/new-page/`
2. Add `page.tsx`
3. Update navigation in `layout.tsx`:
```typescript
const navigation = [
  // ... existing items
  { name: "New Page", href: "/dashboard/new-page", icon: YourIcon },
];
```

### Modify Stat Cards
In `dashboard/page.tsx`:
```typescript
const stats = {
  total: shipments.length,
  // Add your custom stat
  custom: calculateCustomStat(shipments),
};
```

---

## Performance Optimization

### Implemented:
- Client-side rendering for dashboard
- Memoized computations (`useMemo`)
- Conditional data fetching
- Optimized images (Next.js Image)
- Code splitting (automatic with Next.js)

### Recommendations:
- Implement pagination for large datasets
- Add caching with SWR or React Query
- Use virtual scrolling for long lists
- Lazy load heavy components

---

## Accessibility

### Features:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus visible states
- Color contrast (WCAG AA)
- Screen reader friendly

---

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome

---

## Troubleshooting

### Issue: "Failed to fetch shipments"
**Solution**: Check if backend API is running on port 5000

### Issue: Redirects to login immediately
**Solution**: Ensure `userEmail` is set in localStorage after login

### Issue: Styles not loading
**Solution**: Clear `.next` cache and rebuild:
```bash
rm -rf .next
npm run dev
```

---

## Code Examples

### Fetch Data with Error Handling
```typescript
const fetchShipments = async (email: string) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/shipments?email=${email}`
    );
    if (response.ok) {
      const data = await response.json();
      setShipments(data);
    } else {
      console.error("API Error:", response.status);
    }
  } catch (error) {
    console.error("Network Error:", error);
  } finally {
    setIsLoading(false);
  }
};
```

### Status Badge Component
```typescript
const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-500/20 text-green-300 border-green-500/30";
    case "In Transit":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

<span className={`badge ${getStatusColor(status)}`}>
  {status}
</span>
```

---

## Testing

### Manual Testing Checklist

Dashboard:
- [ ] Stats display correctly
- [ ] Recent shipments load
- [ ] Quick actions navigate properly

My Shipments:
- [ ] Tabs switch correctly
- [ ] Search filters results
- [ ] Track button works

Payments:
- [ ] Payment history displays
- [ ] Status badges show correct colors
- [ ] Summary cards calculate correctly

Address Book:
- [ ] Can add new address
- [ ] Can edit address
- [ ] Can delete address
- [ ] Tabs switch between sender/receiver

Documents:
- [ ] Documents list loads
- [ ] AWB link opens in new tab
- [ ] Invoice link works

---

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables (Production)
```env
NEXT_PUBLIC_API_URL=https://api.waynex.com
```

### Hosting Recommendations
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Custom server with PM2

---

## Support

For issues or questions:
1. Check this documentation
2. Review code comments
3. Check backend API documentation
4. Contact development team

---

## License

Proprietary - Waynex Logistics

---

**Last Updated**: January 25, 2026
**Version**: 1.0.0
**Built with**: Next.js 16, TypeScript, Tailwind CSS
