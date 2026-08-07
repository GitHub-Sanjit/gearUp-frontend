# GearUp Frontend 🏕️🏋️

A modern sports and outdoor gear rental platform built with **Next.js App Router**.

Users can browse available sports/outdoor equipment, rent gears, manage rentals, and providers can manage equipment, rental requests, and their profiles.

---

# 🚀 Project Overview

GearUp connects customers with equipment providers.

The platform supports three roles:

## Customer

Features:

- Browse available gears
- View gear details
- Create rental orders
- Track rental history
- View rental status

---

## Provider

Features:

- Provider dashboard
- Manage equipment
- Add new equipment
- Edit equipment
- Delete equipment
- View rental orders
- Update rental status
- Manage provider profile

---

## Admin

Planned features:

- Manage users
- Monitor gears
- Manage rentals
- Platform analytics

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
- React Hook Form
- Zod Validation
- Sonner Toast
- Lucide Icons

---

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

Important application structure:

```
app

├── (authgroup)
│   ├── login
│   └── register
│
├── (public)
│   ├── gears
│   │   └── [id]
│   └── about
│
└── (dashboard)
    │
    ├── dashboard
    │   └── rentals
    │
    ├── provider
    │   ├── equipment
    │   ├── orders
    │   └── profile
    │
    └── admin
```

---

# ✅ Completed Features

# Public Features

## Gear Listing

Completed:

- Display available gears
- Gear cards
- Category information
- Gear filtering
- Gear details navigation

---

## Gear Details Page

Completed:

Route:

```
/gears/[id]
```

Features:

- Gear image
- Name
- Category
- Price per day
- Description
- Availability
- Rental form

---

# 🔄 Rental System

## Completed

Customer rental workflow is completed.

---

## Rental Types

Created:

```
types/rental.ts
```

Includes:

- RentalOrder
- RentalStatus
- Payment information
- Create rental payload
- API response types

---

## Rental Services

Created:

```
services/rental.service.ts
```

Implemented:

- Create rental order
- Get customer rentals
- Get rental by ID
- Get provider orders
- Update rental status

---

## React Query Hooks

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

# Customer Rental Flow

Current flow:

```
Customer

   ↓

Gear Details Page

   ↓

RentalForm

   ↓

POST /rentals

   ↓

RentalOrder Created

   ↓

Dashboard Rentals Page
```

---

# Customer Dashboard

Route:

```
app/(dashboard)/dashboard/rentals/page.tsx
```

Completed:

- Rental history
- Gear information
- Rental dates
- Quantity
- Total amount
- Payment status
- Rental status

---

# Provider Dashboard

Provider dashboard foundation completed.

Route:

```
app/(dashboard)/provider
```

---

## Provider Dashboard Components

Created:

```
components/provider/dashboard
```

Includes:

- Dashboard statistics
- Equipment availability
- Revenue card
- Recent rental requests
- Rental status overview
- Quick actions

---

# Provider Equipment Management

Completed.

Route:

```
/provider/equipment
```

Features:

✅ View provider equipment

✅ Add equipment

✅ Edit equipment

✅ Delete equipment

Components:

```
components/provider/equipment
```

Includes:

- Equipment table
- Add dialog
- Edit dialog
- Delete confirmation
- Loading state
- Empty state

---

# Provider Orders

Structure created.

Route:

```
/provider/orders
```

Components:

```
components/provider/orders
```

Created:

- ProviderOrdersTable
- ProviderOrderRow
- ProviderStatusBadge
- UpdateRentalStatusDialog
- EmptyOrders
- LoadingSkeleton

Status flow:

```
PLACED

↓

CONFIRMED

↓

PICKED_UP

↓

RETURNED
```

---

# Provider Profile

Profile development started.

Route:

```
/provider/profile
```

Current components:

```
components/provider/profile
```

Files:

```
ProfileHeader.tsx

ProfileInformation.tsx

ProfileSkeleton.tsx

ProfileForm.tsx
```

---

## Completed Profile Features

Implemented:

- Provider profile header
- Avatar display
- Name display
- Email display
- Role badge
- Profile information card
- Edit profile form UI
- Name editing
- Bio editing
- Profile photo URL
- Email locked/read-only

---

## Profile Update Architecture

Added:

```
services/auth.service.ts
```

New method:

```ts
updateProfile();
```

Endpoint:

```
PATCH /users/me
```

Payload:

```json
{
  "name": "Provider Name",
  "bio": "Provider description",
  "profilePhoto": "image-url"
}
```

Important:

Email is not editable.

---

Created:

```
hooks/auth/useUpdateProfile.ts
```

Handles:

- Profile mutation
- Toast notifications
- Refreshing authenticated user

---

# Current Profile Issue

Latest work introduced edit mode switching.

Expected behavior:

Default:

```
Profile View
```

Click:

```
Edit Profile Button
```

Then:

```
Edit Profile Form
```

Current state:

- Profile page needs debugging
- Edit mode integration is not fully completed yet

Next task:

Fix profile view/edit switching.

---

# Authentication

Current authentication architecture:

```
AuthProvider

      ↓

useAuth()

      ↓

Dashboard Components
```

Important files:

```
providers/AuthProvider.tsx

hooks/useAuth.ts

hooks/auth/useCurrentUser.ts
```

---

# API Configuration

Axios:

```
lib/axios.ts
```

Environment:

```
NEXT_PUBLIC_API_URL=
```

Backend example:

```
http://localhost:5000/api
```

---

# ▶️ Running Project

Install:

```bash
npm install
```

Development:

```bash
npm run dev
```

Application:

```
http://localhost:3000
```

---

# 🧪 Testing Checklist

## Customer Rental

1. Login as CUSTOMER

2. Open:

```
/gears/[id]
```

3. Create rental

4. Check:

```
/dashboard/rentals
```

---

## Provider Equipment

1. Login as PROVIDER

2. Open:

```
/provider/equipment
```

3. Test:

- Add equipment
- Edit equipment
- Delete equipment

---

## Provider Profile

Currently testing:

```
/provider/profile
```

Pending:

- Fix edit mode
- Verify update flow
- Improve layout

---

# 📌 Current Development Status

Date:

```
August 8, 2026
```

Current milestone:

```
Customer Rental System Completed

Provider Equipment Management Completed

Provider Dashboard In Progress

Provider Profile In Progress
```

---

# Next Development Steps

Priority order:

## 1. Fix Provider Profile

Complete:

- View mode
- Edit mode
- Save flow
- Cancel button
- Account information card

---

## 2. Complete Provider Orders

Implement:

- Rental request table
- Status updates
- Customer information
- Rental details

---

## 3. Admin Dashboard

Implement:

- User management
- Gear monitoring
- Rental monitoring

---

## 4. Payment System

Future:

- Payment gateway
- Payment history
- Payment status handling

---

# Developer Notes

Important:

- `(dashboard)` is a Next.js route group and does not appear in URLs.
- Customer routes:

```
app/(dashboard)/dashboard
```

- Provider routes:

```
app/(dashboard)/provider
```

- Admin routes:

```
app/(dashboard)/admin
```

---

# Author

Sanjit Sarkar

Full Stack Developer
