# ESSENTIAL — Boutique E-Commerce Platform

A minimalist, full-stack e-commerce web application built for a fashion boutique in Addis Ababa. Customers browse curated inventory, select product variants (size/color), and pay via **Chapa** — Ethiopia's local payment gateway. Successful payments automatically notify the boutique owner on **WhatsApp** with full order details.

---

## ✨ Features

- **Minimalist Storefront** — Monochrome design system inspired by luxury fashion houses, built mobile-first
- **Product Variant Logic** — Size and color selection with real-time stock validation; out-of-stock variants are visually disabled
- **Chapa Payments** — Full checkout flow with transaction initialization, hosted payment page, and secure webhook verification
- **WhatsApp Automation** — Instant order notifications to the owner via `whatsapp-web.js` (zero-cost, no API fees)
- **Admin Dashboard** — Password-protected panel to view orders, manage products, and edit variant stock inline
- **Prisma ORM** — Type-safe database access with PostgreSQL, UUID primary keys, and relational models

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Payments | Chapa API |
| Notifications | whatsapp-web.js (standalone Express service) |
| Language | TypeScript |

---

## 📁 Project Structure

```
app/
├── (storefront)/              # Public routes (Navbar + Footer)
│   ├── page.tsx               # Homepage
│   ├── products/page.tsx      # All products
│   ├── products/[id]/page.tsx # Product detail + variant selection
│   └── checkout/              # Checkout form + success page
├── admin/                     # Protected admin routes
│   ├── page.tsx               # Login
│   └── dashboard/page.tsx     # Orders, products, stock management
└── api/
    ├── checkout/              # Chapa payment initialization
    ├── webhooks/chapa/        # Webhook: verify → update DB → notify WhatsApp
    └── admin/                 # Login, logout, orders, products APIs

components/                    # Reusable UI and storefront components
lib/prisma.ts                  # Prisma client singleton
prisma/schema.prisma           # Database schema
middleware.ts                  # Admin route protection
whatsapp-service.js            # Standalone WhatsApp notification server
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (or use `npx prisma dev` for a local instance)

### Installation

```bash
# Clone the repo
git clone https://github.com/BaslielMesfin/Boutique-E-Commerce-Website.git
cd Boutique-E-Commerce-Website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials (see below)

# Generate Prisma client + run migrations
npx prisma generate
npx prisma migrate dev --name init

# Start the app
npm run dev

# Start WhatsApp service (separate terminal)
node whatsapp-service.js
```

### Environment Variables

Create a `.env` file in the root with:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/boutique"

CHAPA_SECRET_KEY="CHASECK_TEST-your-key"
CHAPA_WEBHOOK_SECRET=""

ADMIN_SECRET="your-admin-password"

WHATSAPP_SERVICE_URL="http://localhost:3001/send-notification"
OWNER_PHONE_NUMBER="251911XXXXXX@c.us"

NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

---

## 💳 Payment Flow

```
Customer submits checkout form
        ↓
POST /api/checkout → Creates PENDING order → Calls Chapa Initialize
        ↓
Customer redirected to Chapa hosted checkout
        ↓
Chapa sends POST to /api/webhooks/chapa
        ↓
Verify signature → Update order to PAID → Decrement stock → Send WhatsApp notification
```

---

## 🔐 Admin Access

Navigate to `/admin` and sign in with the password set in `ADMIN_SECRET`. The dashboard provides:

- **Overview** — Total orders, revenue, and stock counts
- **Products** — Expandable rows with inline variant stock editing (+ / −)
- **Orders** — Full order history with payment and fulfillment status

---

## 📸 Screenshots

### Storefront
The homepage features an editorial hero section with a curated product grid below.

### Product Detail
Gallery with clickable thumbnails, pill-shaped size/color selectors, and a disabled "Add to Cart" button until both variants are chosen.

### Admin Dashboard
Clean tabular layout for managing orders and inventory with real-time stock controls.

---

## 📄 License

This project is for educational and portfolio purposes.
