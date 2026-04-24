# Project Architecture: Boutique E-Commerce Platform

## 1. System Overview
A B2C fashion e-commerce web application for a local boutique in Addis Ababa. The platform allows customers to browse inventory, select specific product variants (size/color), and purchase items using local payment gateways via Chapa. The system includes a secure admin dashboard for inventory management and automated order notifications sent to the owner via WhatsApp. Physical delivery logistics are handled off-platform by the boutique owner.

## 2. Tech Stack Definition
* **Frontend & Backend:** Next.js (App Router)
* **Styling:** Tailwind CSS (integrate with provided UI assets)
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Payment Gateway:** Chapa API
* **Notifications:** `whatsapp-web.js` (Running as a background service/API route for zero-cost automated messaging to the owner)

## 3. Database Schema (Prisma Models)

### Model: Product
* `id`: UUID (Primary Key)
* `name`: String
* `description`: Text
* `basePrice`: Float
* `images`: String[] (Array of image URLs)
* `category`: String
* `createdAt`: DateTime
* `updatedAt`: DateTime
* **Relations:** One-to-Many with `Variant`

### Model: Variant
* `id`: UUID (Primary Key)
* `productId`: UUID (Foreign Key)
* `size`: String (e.g., S, M, L, XL)
* `color`: String
* `stockQuantity`: Int
* **Relations:** Many-to-One with `Product`

### Model: Order
* `id`: UUID (Primary Key)
* `customerName`: String
* `customerPhone`: String
* `deliverySubCity`: String
* `deliveryWoreda`: String
* `deliveryLandmark`: Text
* `totalAmount`: Float
* `chapaReference`: String (Unique, used for webhook verification)
* `paymentStatus`: Enum (PENDING, PAID, FAILED)
* `fulfillmentStatus`: Enum (UNFULFILLED, DELIVERED)
* `createdAt`: DateTime
* **Relations:** One-to-Many with `OrderItem`

### Model: OrderItem
* `id`: UUID (Primary Key)
* `orderId`: UUID (Foreign Key)
* `variantId`: UUID (Foreign Key)
* `quantity`: Int
* `priceAtPurchase`: Float

## 4. Payment & Notification Flow (Strict Logic)
1.  **Checkout Initiation:** User submits the checkout form. System creates an `Order` with `paymentStatus: PENDING` and generates a unique `chapaReference`.
2.  **Chapa Redirect:** System calls Chapa's `Initialize Transaction` API, passing the `chapaReference` and order total. User is redirected to the Chapa hosted checkout.
3.  **Webhook Verification:** Upon payment, Chapa sends a POST request to our `/api/webhooks/chapa` endpoint.
4.  **Database Update:** System verifies the webhook signature/reference. If successful:
    * Updates `Order.paymentStatus` to `PAID`.
    * Decrements the `stockQuantity` for the purchased `Variant`s.
5.  **WhatsApp Automation:** System triggers the internal `whatsapp-web.js` service to send a formatted text message to the *Boutique Owner's* registered WhatsApp number.
    * *Message Payload:* Order ID, Customer Name, Customer Phone, Delivery Landmark, and a list of purchased Variants (Name, Size, Color, Qty).

## 5. Development Constraints & Guidelines
* **Mobile-First:** The storefront UI must be highly responsive, prioritizing the mobile experience as the primary use case.
* **Variant Logic:** Users must not be able to add an item to the cart without explicitly selecting a Size and Color variant. Out-of-stock variants must be visually disabled in the UI.
* **Admin Authentication:** The admin routes (`/admin/*`) must be protected by a simple, secure authentication layer (e.g., NextAuth/Auth.js with a single hardcoded owner credential or magic link).