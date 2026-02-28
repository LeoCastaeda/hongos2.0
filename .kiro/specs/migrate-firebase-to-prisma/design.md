# Design Document: Migrate Firebase to Prisma

## Overview

This design document outlines the technical architecture for migrating a functional mushroom e-commerce application from Firebase (Auth + Firestore) to a self-hosted stack using Next.js 15, Prisma ORM, PostgreSQL, and NextAuth.js. The migration maintains all existing functionality while eliminating external service dependencies and preparing for future scalability.

## Architecture

### Technology Stack

- **Frontend**: Next.js 15 (React 18+)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5
- **Password Hashing**: bcrypt
- **Deployment**: Vercel with Vercel Postgres or Neon

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Application                      │
├─────────────────────────────────────────────────────────────┤
│  Client Components                                           │
│  - Product Catalog UI                                        │
│  - Cart Management UI                                        │
│  - Checkout Form                                             │
│  - User Profile UI                                           │
│  - Order History UI                                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    API Routes (Backend)                      │
├─────────────────────────────────────────────────────────────┤
│  /api/auth/*          - NextAuth.js endpoints                │
│  /api/auth/register   - User registration                    │
│  /api/products        - Product catalog                      │
│  /api/cart            - Cart management                      │
│  /api/orders          - Order creation & history             │
│  /api/user/profile    - User profile management              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Prisma Client                           │
├─────────────────────────────────────────────────────────────┤
│  - Type-safe database queries                                │
│  - Connection pooling                                        │
│  - Transaction management                                    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
├─────────────────────────────────────────────────────────────┤
│  Tables: User, Product, Order, OrderItem, Cart,              │
│          Account, Session, VerificationToken                 │
└─────────────────────────────────────────────────────────────┘
```

## Data Models

### Prisma Schema

