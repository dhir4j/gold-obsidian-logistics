# API Routes Verification Report

## Backend Server Configuration
**Base URL:** `https://www.server.waynexshipping.com`

## Changes Made

### 1. Environment Configuration
**File:** `.env.local`
- ✅ Updated `NEXT_PUBLIC_API_URL` from `https://server.waynexshipping.com/api` to `https://www.server.waynexshipping.com`
- Reason: The `/api` prefix is already included in backend route definitions

### 2. Tracking Route Fix
**File:** `app/dashboard/tracking/page.tsx`
- ✅ Changed from `/api/track/{id}` to `/api/shipments/{id}`
- Backend route: `GET /api/shipments/<shipment_id_str>`

### 3. Employee Shipment Creation Fix
**File:** `app/employee/shipments/new/page.tsx`
- ✅ Changed from `/api/employee/create-shipment` to `/api/shipments/domestic` or `/api/shipments/international`
- Backend routes:
  - `POST /api/shipments/domestic`
  - `POST /api/shipments/international`
- Updated payload mapping to match backend schema (snake_case fields)

### 4. Booking Page Shipment Routes Fix
**File:** `app/booking/page.tsx`
- ✅ Changed from `/api/domestic/shipment` to `/api/shipments/domestic`
- ✅ Changed from `/api/international/shipment` to `/api/shipments/international`
- Backend routes:
  - `POST /api/shipments/domestic`
  - `POST /api/shipments/international`

### 5. Employee Shipments List Fix
**File:** `app/employee/shipments/page.tsx`
- ✅ Changed from `/api/employee/shipments` to `/api/shipments?email={email}`
- Backend route: `GET /api/shipments?email={email}`
- Note: Employees use the same shipments endpoint as customers

### 6. Booking Payload Fix
**File:** `app/booking/page.tsx`
- ✅ Changed `customer_email` to `user_email`
- ✅ Changed `goods_details` to `goods`
- ✅ Added required field `final_total_price_with_tax` from calculated price
- Backend expects: `user_email`, `goods` (array), and `final_total_price_with_tax`

## Verified Routes

### Authentication Routes ✅
| Frontend Usage | Backend Route | Status |
|---------------|---------------|--------|
| Login page | `POST /api/auth/login` | ✅ Correct |
| Signup | `POST /api/auth/signup` | ✅ Correct |
| OTP verification | `POST /api/auth/verify-otp` | ✅ Correct |
| Send OTP | `POST /api/auth/send-otp` | ✅ Correct |
| Verify token | `POST /api/auth/verify-token` | ✅ Correct |
| Logout | `POST /api/auth/logout` | ✅ Correct |

### User Dashboard Routes ✅
| Frontend Usage | Backend Route | Status |
|---------------|---------------|--------|
| Get shipments | `GET /api/shipments?email={email}` | ✅ Correct |
| Get shipment details | `GET /api/shipments/{id}` | ✅ Fixed |
| Get payments | `GET /api/user/payments?email={email}` | ✅ Correct |
| Address book (GET) | `GET /api/customer/addresses` | ✅ Correct |
| Address book (POST) | `POST /api/customer/addresses` | ✅ Correct |
| Address book (DELETE) | `DELETE /api/customer/addresses/{id}` | ✅ Correct |

### Employee Dashboard Routes ✅
| Frontend Usage | Backend Route | Status |
|---------------|---------------|--------|
| Create domestic shipment | `POST /api/shipments/domestic` | ✅ Fixed |
| Create international shipment | `POST /api/shipments/international` | ✅ Fixed |
| Redeem balance code | `POST /api/employee/redeem-code` | ✅ Correct |
| Get day-end stats | `GET /api/employee/day-end-stats` | ✅ Correct |
| Employee addresses (GET) | `GET /api/employee/addresses` | ✅ Correct |
| Employee addresses (POST) | `POST /api/employee/addresses` | ✅ Correct |
| Employee addresses (DELETE) | `DELETE /api/employee/addresses/{id}` | ✅ Correct |

### Booking & Pricing Routes ✅
| Frontend Usage | Backend Route | Status |
|---------------|---------------|--------|
| Domestic pricing | `POST /api/domestic/price` | ✅ Correct |
| International pricing | `POST /api/international/price` | ✅ Correct |
| Create domestic shipment | `POST /api/shipments/domestic` | ✅ Correct |
| Create international shipment | `POST /api/shipments/international` | ✅ Correct |
| Submit payment | `POST /api/payments` | ✅ Correct |

### Admin Routes (External Admin Panel)
Admin routes are handled by the separate admin panel at `https://admin.waynexshipping.com`

## Backend API Structure

### Available Blueprints
1. **auth_bp** - `/api/auth/*` - Authentication & user management
2. **shipments_bp** - `/api/*` - Shipment operations, payments, addresses
3. **admin_bp** - `/api/admin/*` - Admin operations
4. **domestic_bp** - `/api/domestic/*` - Domestic pricing
5. **international_bp** - `/api/international/*` - International pricing
6. **reconciliation_bp** - `/api/reconciliation/*` - Payment reconciliation

## Login Flow Verification

### Customer Login
1. User enters credentials on Customer tab
2. POST to `/api/auth/login`
3. If `requiresOtp: true`, redirect to OTP verification
4. POST to `/api/auth/verify-otp`
5. On success, redirect to `/dashboard`

### Employee Login
1. User enters credentials on Employee tab
2. POST to `/api/auth/login`
3. Backend checks `isEmployee` or `isAdmin` flag
4. If admin: redirect to `https://admin.waynexshipping.com`
5. If employee: redirect to `/employee/dashboard`
6. If regular user: show error message

## Testing Checklist

- [ ] Test customer login flow
- [ ] Test employee login flow
- [ ] Test admin login redirect
- [ ] Test shipment tracking with valid ID
- [ ] Test employee shipment creation (domestic)
- [ ] Test employee shipment creation (international)
- [ ] Test customer shipment booking
- [ ] Test address book operations
- [ ] Test payment submission
- [ ] Test balance code redemption

## Notes

1. All API calls now use `process.env.NEXT_PUBLIC_API_URL` with fallback to `http://localhost:5000`
2. The `.env.local` file correctly sets the production URL
3. Employee shipment creation now properly maps frontend form data to backend schema
4. Tracking route now uses the correct shipment detail endpoint
5. All routes verified against backend implementation in `/home/dhir4j/Documents/Dhillon/Waynex/Template/waynex-logistics-backend`
