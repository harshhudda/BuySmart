# BuySmart – AI-Powered E-Commerce Platform 🛒

An AI-enhanced e-commerce platform built with the MERN stack. Offers OpenAI-powered product suggestions, secure payments with Stripe, and a complete admin dashboard.

🔗 [Live Demo](https://buysmart-2uox.onrender.com)
---
## 🚀 Tech Stack
- **Frontend**: React.js, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express, MongoDB, JWT, Zustand
- **Third-party**: Stripe, OpenAI API, Cloudinary
---
## ✅ Features
- Product catalog with search, filters & AI suggestions
- Secure authentication (JWT) with role-based access
- Admin dashboard: add/edit/delete products
- Stripe integration for real-time payments
- Responsive & accessible UI
---
## Setup .env file
```bash
PORT=5000
MONGO_URI=your_mongo_uri

UPSTASH_REDIS_URL=your_redis_url

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
---
## 🧪 Setup Instructions

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
