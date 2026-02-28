# Implementation Plan: Migrate Firebase to Prisma + PostgreSQL + NextAuth.js

## Overview

This implementation plan migrates the e-commerce application from Firebase (Auth + Firestore) to a self-hosted stack using Prisma ORM, PostgreSQL, and NextAuth.js. The migration maintains all existing functionality while eliminating external service dependencies. Tasks are organized to build incrementally, with early validation through testing.

## Tasks

- [ ] 1. Set up Prisma and database infrastructure
  - [x] 1.1 Install Prisma dependencies and initialize Prisma
    - Install `prisma`, `@prisma/client`, `bcrypt`, `@types/bcrypt`
    - Run `npx prisma init` to create initial structure
    - _Requirements: 1.1, 2.1_

  - [-] 1.2 Create Prisma schema with all data models
    - Define User model with id, email, name, password, timestamps
    - Define Product model with id, name, slug, price, description, benefits, category, type, image, inventory
    - Define Order model with id, userId, status, total, shippingAddress, timestamps
    - Define OrderItem model with id, orderId, productId, quantity, unitPrice
    - Define Cart model with id, userId (nullable), sessionId, items (JSON), updatedAt
    - Add NextAuth models: Account, Session, VerificationToken
    - Define relations: User-Order (1:many), Order-OrderItem (1:many), Product-OrderItem (1:many)
    - Add indexes on email, slug, userId fields
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_

  - [ ] 1.3 Create Prisma Client singleton
    - Create `src/lib/prisma.ts` with singleton pattern
    - Configure connection pooling for serverless
    - Enable query logging in development
    - Export Prisma Client instance
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [ ] 1.4 Set up environment variables
    - Update `.env.example` with DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
    - Add environment variable validation
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

- [ ] 2. Checkpoint - Verify database setup
  - Run `npx prisma generate` to generate TypeScript types
  - Run `npx prisma migrate dev` to create initial migration
  - Verify database connection works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Implement NextAuth.js authentication system
  - [ ] 3.1 Install NextAuth.js and configure auth options
    - Install `next-auth` and `@auth/prisma-adapter`
    - Create `src/lib/auth.ts` with NextAuth configuration
    - Configure Credentials provider for email/password
    - Configure Google OAuth provider
    - Set up Prisma adapter for session storage
    - Configure JWT session strategy
    - Add session callbacks to include user id and email
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.6, 3.7, 3.8, 3.9_

  - [ ] 3.2 Create NextAuth API route handler
    - Create `src/app/api/auth/[...nextauth]/route.ts`
    - Export GET and POST handlers using NextAuth
    - _Requirements: 3.1_

  - [ ] 3.3 Implement user registration API endpoint
    - Create `src/app/api/auth/register/route.ts`
    - Validate email format and password requirements (min 8 chars)
    - Check for existing email (return 409 if exists)
    - Hash password with bcrypt
    - Create user record in database
    - Return 201 with user data (exclude password)
    - Handle errors with appropriate status codes
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_

  - [ ]* 3.4 Write unit tests for registration endpoint
    - Test valid registration flow
    - Test duplicate email handling
    - Test password validation
    - Test email format validation
    - _Requirements: 4.2, 4.3, 4.4_

- [ ] 4. Checkpoint - Verify authentication works
  - Test user registration via API
  - Test login with credentials
  - Test Google OAuth flow
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement product catalog API endpoints
  - [ ] 5.1 Create GET /api/products endpoint
    - Create `src/app/api/products/route.ts`
    - Implement GET handler to fetch all products
    - Support query params for filtering by category and benefit
    - Sort by creation date descending
    - Return products with all fields
    - Handle errors with appropriate status codes
    - _Requirements: 6.1, 6.3, 6.6, 6.7, 6.8_

  - [ ] 5.2 Create GET /api/products/[slug] endpoint
    - Create `src/app/api/products/[slug]/route.ts`
    - Implement GET handler to fetch single product by slug
    - Return 404 if product not found
    - Return complete product details
    - _Requirements: 6.2, 6.4, 6.5, 6.8_

  - [ ]* 5.3 Write unit tests for product endpoints
    - Test fetching all products
    - Test filtering by category
    - Test fetching single product by slug
    - Test 404 for invalid slug
    - _Requirements: 6.3, 6.4, 6.5_

- [ ] 6. Implement cart management API endpoints
  - [ ] 6.1 Create GET /api/cart endpoint
    - Create `src/app/api/cart/route.ts`
    - Implement GET handler to fetch cart
    - For authenticated users, fetch by userId
    - For guests, fetch by sessionId
    - Calculate and return cart total
    - _Requirements: 7.1, 7.5, 7.6, 7.10_

  - [ ] 6.2 Create POST /api/cart/items endpoint
    - Implement POST handler in `src/app/api/cart/route.ts`
    - Validate product exists before adding
    - If item exists, increment quantity
    - Create or update cart record
    - _Requirements: 7.2, 7.7, 7.9_

  - [ ] 6.3 Create PATCH /api/cart/items/[productId] endpoint
    - Create `src/app/api/cart/items/[productId]/route.ts`
    - Implement PATCH handler to update quantity
    - If quantity is zero, remove item
    - _Requirements: 7.3, 7.8_

  - [ ] 6.4 Create DELETE /api/cart/items/[productId] endpoint
    - Implement DELETE handler in `src/app/api/cart/items/[productId]/route.ts`
    - Remove item from cart
    - _Requirements: 7.4_

  - [ ]* 6.5 Write unit tests for cart endpoints
    - Test adding items to cart
    - Test incrementing existing items
    - Test updating quantity
    - Test removing items
    - Test cart total calculation
    - _Requirements: 7.7, 7.8, 7.9, 7.10_

- [ ] 7. Checkpoint - Verify cart functionality
  - Test cart operations via API
  - Verify cart persists for authenticated users
  - Verify guest cart works with session
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement order management API endpoints
  - [ ] 8.1 Create POST /api/orders endpoint
    - Create `src/app/api/orders/route.ts`
    - Implement POST handler for order creation
    - Verify user is authenticated
    - Validate shipping address fields
    - Retrieve user's cart
    - Return 400 if cart is empty
    - Create Order record with status "pending"
    - Create OrderItem records for each cart item
    - Calculate total from cart items
    - Clear user's cart after order creation
    - Wrap in database transaction
    - Return order id and details
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 8.10, 8.11_

  - [ ] 8.2 Create GET /api/orders endpoint
    - Implement GET handler in `src/app/api/orders/route.ts`
    - Verify user is authenticated
    - Fetch all orders for authenticated user
    - Include order items with product details
    - Sort by creation date descending
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ] 8.3 Create GET /api/orders/[orderId] endpoint
    - Create `src/app/api/orders/[orderId]/route.ts`
    - Implement GET handler for single order
    - Verify order belongs to authenticated user
    - Return 403 if order doesn't belong to user
    - Include order items with product details
    - _Requirements: 9.6, 9.7, 9.8_

  - [ ]* 8.4 Write unit tests for order endpoints
    - Test order creation flow
    - Test empty cart validation
    - Test order history retrieval
    - Test single order retrieval
    - Test authorization checks
    - _Requirements: 8.5, 8.11, 9.7, 9.8_

- [ ] 9. Implement user profile API endpoints
  - [ ] 9.1 Create GET /api/user/profile endpoint
    - Create `src/app/api/user/profile/route.ts`
    - Implement GET handler to fetch user profile
    - Verify user is authenticated
    - Return user data excluding password
    - _Requirements: 10.1, 10.3, 10.4_

  - [ ] 9.2 Create PATCH /api/user/profile endpoint
    - Implement PATCH handler in `src/app/api/user/profile/route.ts`
    - Verify user is authenticated
    - Validate updated fields
    - Check email uniqueness if email is being changed
    - Hash new password if password is being changed
    - Update user record
    - Return updated user data
    - _Requirements: 10.2, 10.3, 10.5, 10.6, 10.7, 10.8_

  - [ ]* 9.3 Write unit tests for profile endpoints
    - Test profile retrieval
    - Test profile update
    - Test email uniqueness validation
    - Test password hashing
    - _Requirements: 10.5, 10.6, 10.7_

- [ ] 10. Checkpoint - Verify all API endpoints work
  - Test complete user flow: register → login → browse → add to cart → checkout → view orders
  - Verify all endpoints return correct status codes
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Create data migration script from Firebase
  - [ ] 11.1 Create migration script file
    - Create `scripts/migrate-firebase-to-postgres.ts`
    - Set up Firebase Admin SDK connection
    - Set up Prisma Client connection
    - _Requirements: 11.1_

  - [ ] 11.2 Implement user migration
    - Export users from Firebase Auth
    - Generate temporary passwords for migrated users
    - Create User records in PostgreSQL
    - Log migration progress
    - _Requirements: 11.2, 11.3, 11.8_

  - [ ] 11.3 Implement product migration
    - Export products from Firestore
    - Create Product records in PostgreSQL
    - Maintain all product fields
    - Log migration progress
    - _Requirements: 11.4, 11.5, 11.8_

  - [ ] 11.4 Implement order migration
    - Export orders from Firestore if they exist
    - Create Order and OrderItem records in PostgreSQL
    - Log migration progress
    - Generate migration report with record counts
    - Handle errors gracefully
    - _Requirements: 11.6, 11.7, 11.8, 11.9, 11.10_

- [ ] 12. Update frontend authentication integration
  - [ ] 12.1 Replace Firebase auth with NextAuth in components
    - Update `src/app/layout.tsx` to use NextAuth SessionProvider
    - Remove Firebase auth provider
    - _Requirements: 13.1, 13.5_

  - [ ] 12.2 Update login page
    - Update `src/app/login/page.tsx` to use NextAuth signIn
    - Remove Firebase signIn calls
    - Maintain same UI/UX
    - _Requirements: 13.2, 13.6_

  - [ ] 12.3 Update profile page
    - Update `src/app/profile/page.tsx` to use NextAuth session
    - Fetch user data from session
    - Remove Firebase user hooks
    - _Requirements: 13.3, 13.6_

  - [ ] 12.4 Update header component
    - Update header to show user status from NextAuth session
    - Use `useSession` hook
    - Remove Firebase auth references
    - _Requirements: 13.4, 13.5_

  - [ ] 12.5 Add authentication guards to protected routes
    - Redirect to login if user not authenticated
    - Apply to profile, checkout, and order pages
    - _Requirements: 13.7_

- [ ] 13. Update frontend cart integration
  - [ ] 13.1 Update CartContext to use API
    - Update `src/context/CartContext.tsx`
    - Fetch cart from `/api/cart` on mount
    - Update addToCart to call POST `/api/cart/items`
    - Update updateQuantity to call PATCH `/api/cart/items/[productId]`
    - Update removeFromCart to call DELETE `/api/cart/items/[productId]`
    - Implement optimistic UI updates
    - Revert on API failure with error message
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6_

  - [ ] 13.2 Migrate localStorage cart to database
    - On first login after migration, check for localStorage cart
    - If exists, migrate items to database cart
    - Clear localStorage after migration
    - _Requirements: 14.7, 14.8_

- [ ] 14. Update frontend product catalog integration
  - [ ] 14.1 Update product listing pages
    - Update product pages to fetch from `/api/products`
    - Implement loading states
    - Display error messages on fetch failure
    - Implement client-side caching
    - _Requirements: 15.1, 15.4, 15.5, 15.6_

  - [ ] 14.2 Update product detail pages
    - Update product detail to fetch from `/api/products/[slug]`
    - Implement loading states
    - Display error messages on fetch failure
    - _Requirements: 15.2, 15.4, 15.5_

  - [ ] 14.3 Remove hardcoded product data
    - Remove product data from `src/lib/data.tsx`
    - Maintain same UI components
    - _Requirements: 15.3, 15.7_

- [ ] 15. Update frontend checkout and order history
  - [ ] 15.1 Update checkout form
    - Update checkout to call POST `/api/orders`
    - Verify user is authenticated before checkout
    - Redirect to login if not authenticated
    - Redirect to order confirmation on success
    - Display error message on failure without clearing form
    - Clear cart UI after successful order
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7_

  - [ ] 15.2 Update order history page
    - Update profile to fetch orders from `/api/orders`
    - Display orders with id, date, total, status
    - Implement order detail view
    - Display "no orders" message when empty
    - Implement loading states
    - Display error messages on fetch failure
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6_

- [ ] 16. Implement error handling and logging
  - [ ] 16.1 Create consistent error response format
    - Create `src/lib/api-error.ts` with error response utilities
    - Define standard error format with status, message, error code
    - _Requirements: 18.1_

  - [ ] 16.2 Add error logging to API routes
    - Add logging to all API endpoints
    - Log errors with context (userId, endpoint, timestamp)
    - Return generic 500 errors for database errors
    - Return specific 400 errors for validation errors
    - Return 401 for authentication errors
    - Return 403 for authorization errors
    - _Requirements: 18.2, 18.3, 18.4, 18.5, 18.6_

  - [ ] 16.3 Add React error boundaries
    - Create error boundary component
    - Wrap main app sections with error boundaries
    - _Requirements: 18.7_

- [ ] 17. Remove Firebase dependencies
  - [ ] 17.1 Remove Firebase packages and configuration
    - Uninstall `firebase` and `firebase-admin` packages
    - Remove `src/firebase/` directory
    - Remove Firebase configuration files
    - Remove Firebase imports from all components
    - _Requirements: 13.5, 19.8, 20.7_

  - [ ] 17.2 Clean up environment variables
    - Remove Firebase environment variables
    - Update `.env.example` to remove Firebase vars
    - _Requirements: 20.7_

- [ ] 18. Final validation and testing
  - [ ] 18.1 Run end-to-end validation
    - Test user registration and login
    - Test product catalog display
    - Test cart operations
    - Test order creation
    - Test order history
    - Test profile management
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6_

  - [ ] 18.2 Verify data migration
    - Compare migrated data with Firebase data
    - Verify all users migrated correctly
    - Verify all products migrated correctly
    - Verify all orders migrated correctly
    - _Requirements: 19.7_

  - [ ] 18.3 Verify no Firebase dependencies remain
    - Search codebase for Firebase imports
    - Verify no Firebase SDK calls remain
    - _Requirements: 19.8_

- [ ] 19. Configure deployment
  - [ ] 19.1 Set up production database
    - Configure Vercel Postgres or Neon database
    - Set DATABASE_URL in Vercel environment variables
    - _Requirements: 20.1, 20.3_

  - [ ] 19.2 Configure Prisma migrations for deployment
    - Add migration script to package.json
    - Configure Vercel to run migrations on deploy
    - _Requirements: 20.2_

  - [ ] 19.3 Configure environment variables in Vercel
    - Set NEXTAUTH_URL, NEXTAUTH_SECRET
    - Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
    - Set DATABASE_URL
    - _Requirements: 20.3_

  - [ ] 19.4 Verify production deployment
    - Test database connection in production
    - Verify connection pooling configuration
    - Test all API endpoints in production
    - _Requirements: 20.4, 20.5_

  - [ ] 19.5 Update documentation
    - Document deployment process in README
    - Document environment variables
    - Document migration process
    - _Requirements: 20.6_

- [ ] 20. Final checkpoint - Production ready
  - Verify all functionality works in production
  - Verify performance is acceptable
  - Verify error handling works correctly
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks that can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation throughout the migration
- The migration maintains backward compatibility during transition
- All API endpoints follow RESTful conventions
- Database operations use transactions where appropriate for data consistency
- Authentication uses industry-standard JWT tokens with NextAuth.js
- The frontend maintains the same UI/UX throughout the migration
