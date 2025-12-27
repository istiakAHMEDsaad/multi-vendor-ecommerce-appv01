# 🛒 Multi-Vendor AI E-Commerce Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blue?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)
![Stripe](https://img.shields.io/badge/Stripe-Payments-008CDD?style=for-the-badge&logo=stripe)

A high-performance, full-stack multi-vendor e-commerce application built with **Next.js 15**. This platform features an AI-driven product management system, a robust multi-role dashboard architecture, and a premium subscription model for vendors.

🔗 **Live Demo:** [multi-vendor-ecommerce-appv01.vercel.app](https://multi-vendor-ecommerce-appv01.vercel.app/)

---

## ✨ Key Features

### 🤖 AI-Powered Product Management
* **Automated Listing:** Leverages **OpenAI/Gemini API** to analyze uploaded product images and automatically generate professional titles, categories, and SEO-friendly descriptions.
* **Smart Content Generation:** Reduces vendor effort by suggesting the best attributes for product listings based on visual data.

### 🏪 Multi-Vendor Ecosystem
* **Vendor Dashboards:** Dedicated portal for sellers to track total earnings, manage active orders, and monitor product performance.
* **Store Approval Workflow:** An integrated system for admins to review, approve, or deactivate stores to maintain marketplace quality.
* **Real-time Inventory:** Instant updates on stock levels and the ability for vendors to toggle product visibility.

### 💎 Premium Subscription Model
* **Tiered Memberships:** Integrated **Stripe** for monthly and annual premium "Plus" plans.
* **Trial System:** Support for 7-day free trials for new vendors to test platform features.
* **Exclusive Benefits:** Automatic "Plus" badges for products, site-wide coupon creation, and priority listing.

### 🛡️ Admin & Analytics
* **Centralized Control:** Admin panel to manage users, stores, and global site settings.
* **Dynamic Coupons:** Create and manage discount codes with custom expiry dates and usage limits.
* **Advanced Analytics:** Visualize sales trends using **Recharts** for both admins and vendors.

### 🛍️ Customer Experience
* **Secure Auth:** Multi-session support powered by **Clerk**, allowing users to switch between buyer and seller roles seamlessly.
* **Flexible Checkout:** Support for **Stripe Online Payments** and **Cash on Delivery (COD)** workflows.
* **Image Optimization:** Lightning-fast image delivery and transformations via **ImageKit**.

---

## 🛠️ Tech Stack

| Technology | Usage |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **Database** | PostgreSQL via **Neon DB** (Serverless) |
| **ORM** | Prisma |
| **Authentication** | Clerk |
| **Payments** | Stripe (Subscriptions & Connect) |
| **AI Engine** | OpenAI API / Google Gemini |
| **Media** | ImageKit.io |
| **Background Jobs** | Inngest (Event-driven architecture) |
| **Styling** | Tailwind CSS 4.0 & Lucide Icons |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/istiakAHMEDsaad/multi-vendor-ecommerce-appv01
```
### 2. Install dependencies
```
cd multi-vendor-ecommerce-appv01
pnpm install
```
### 3. Environment Setup
```
NEXT_PUBLIC_CURRENCY_SYMBOL 
ADMIN_EMAIL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
DATABASE_URL=
DIRECT_URL=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_ULR_ENDPOINT=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
OPENAI_API_KEY=
OPENAI_BASE_URL=
OPENAI_MODEL=
```

### 4. Database Sync & Start
```
pnpm prisma generate
pnpm prisma db push
pnpm dev
```

### 5. Important Docs
[NeonsDB Docs](https://neon.com/docs/guides/prisma)<br/>
[Clerk Docs](https://clerk.com/docs/nextjs/guides/development/custom-sign-up-page)<br/>
[Inngest Docs](https://www.inngest.com/docs/getting-started/nextjs-quick-start)<br/>
[ImageKit Docs](https://www.npmjs.com/package/imagekit#file-upload)<br/>
[Stripe Session Docs](https://docs.stripe.com/api/checkout/sessions/create?lang=node)<br/>
[Gemini OpenAI Docs](https://ai.google.dev/gemini-api/docs/openai?hl=en)<br/>
