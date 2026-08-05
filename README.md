# GearUp Frontend 🏕️🏋️

A modern sports and outdoor gear rental platform built with Next.js.  
Users can browse available gear, rent equipment, manage rentals, and providers can manage rental orders.

---

# 🚀 Project Overview

GearUp allows customers to rent sports and outdoor equipment from providers.

The platform supports three main roles:

- Customer
  - Browse gears
  - View gear details
  - Create rental orders
  - Track rental history

- Provider
  - Manage listed gears
  - View rental orders
  - Update rental status

- Admin
  - Manage users
  - Monitor gears
  - Manage rentals

---

# 🛠️ Tech Stack

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack React Query
- Axios
- Sonner Toast
- Next Image

## Backend

Backend repository:

```

GearUp API

```

Technologies:

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

---

# 📂 Project Structure

Current structure:

```

app
│
├── (public)
│   └── gears
│       └── [id]
│           └── page.tsx
│
├── (auth)
│   └── login
│
└── (dashboard)
│
├── dashboard
│   ├── page.tsx
│   └── rentals
│       └── page.tsx
│
├── provider
│   └── ...
│
└── admin
└── ...

```

---

# ✅ Completed Features

## Public

### Gear Listing

Completed:

- View available gears
- Gear cards
- Category information
- Gear details page


### Gear Details Page

Completed:

- Gear image
- Name
- Category
- Price per day
- Description
- Availability
- Rental form integration


---

# Rental System

## Completed

### Types

Created:

```

types/rental.ts

```

Includes:

- RentalOrder
- RentalStatus
- Payment
- CreateRentalOrderPayload
- API response types


---

### Services

Created:

```

services/rental.service.ts

```

Implemented:

- createRentalOrder()
- getMyRentalOrders()
- getRentalOrderById()
- getProviderOrders()
- updateRentalStatus()


---

### React Query Hooks

Created:

```

hooks/useRentals.ts

```

Implemented:

Customer:

- useCreateRental()
- useMyRentals()
- useRentalById()


Provider:

- useProviderOrders()
- useUpdateRentalStatus()


---

### Customer Rental Form

Created:

```

components/rental/RentalForm.tsx

```

Features:

- Select start date
- Select end date
- Select quantity
- Calculate total price
- Create rental order
- Redirect to dashboard rentals page


---

### Customer My Rentals Page

Created:

```

app/(dashboard)/dashboard/rentals/page.tsx

```

Features:

- Display rental history
- Show gear image
- Show rental dates
- Show quantity
- Show total amount
- Show payment status
- Show rental status


---

# 🔄 Current Rental Flow

Current implementation:

```

Customer

Gear Details Page

```
    |
    ↓
```

RentalForm

```
    |
    ↓
```

POST /api/rentals

```
    |
    ↓
```

RentalOrder Created

```
    |
    ↓
```

/dashboard/rentals

```

---

# ⏳ Remaining Tasks

## Provider Side

Next implementation:

```

app/(dashboard)/provider/orders/page.tsx

```

Features:

- View rental requests
- View customer information
- View rented gear
- Update rental status

Status flow:

```

PLACED
|
↓
CONFIRMED
|
↓
PICKED_UP
|
↓
RETURNED

```


---

## Admin Side

Pending:

```

app/(dashboard)/admin/rentals/page.tsx

```

Features:

- View all rentals
- Search rentals
- Filter by status
- Pagination


---

## Payment System

Pending:

- Payment integration
- Payment status update
- Payment history


---

# 🔌 API Base URL

Axios configuration:

```

[http://localhost:5000/api](http://localhost:5000/api)

```

Environment:

```

NEXT_PUBLIC_API_URL=

````

---

# ▶️ Run Project Locally

Install dependencies:

```bash
npm install
````

Run development server:

```bash
npm run dev
```

Application:

```
http://localhost:3000
```

---

# 🧪 Testing Rental Flow

1. Login as CUSTOMER

2. Open:

```
/gears/[id]
```

3. Fill rental form:

* Start date
* End date
* Quantity

4. Confirm rental

5. Check:

```
/dashboard/rentals
```

---

# 📌 Current Development Status

Date:

```
August 6, 2026
```

Current milestone:

```
Rental System - Customer Side Completed
```

Next milestone:

```
Provider Rental Management
```

---

# Developer Notes

Important:

* `(dashboard)` is a Next.js route group and does not appear in URLs.
* Customer dashboard routes live under:

```
app/(dashboard)/dashboard
```

* Provider routes live under:

```
app/(dashboard)/provider
```

* Admin routes live under:

```
app/(dashboard)/admin
```

---

# 👨‍💻 Author

Sanjit Sarkar

Full Stack Developer

````

Tomorrow we can continue directly from:

```bash
app/(dashboard)/provider/orders/page.tsx
````

and build the provider rental management flow.
