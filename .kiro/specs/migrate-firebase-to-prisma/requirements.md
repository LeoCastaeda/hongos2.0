# Requirements Document

## Introduction

Este documento define los requisitos para migrar el e-commerce de hongos funcionales desde Firebase (Auth + Firestore) a un stack propio basado en Next.js 15, Prisma ORM, PostgreSQL y NextAuth.js. La migración busca eliminar la dependencia de servicios externos, mantener toda la funcionalidad actual y preparar la aplicación para escalabilidad futura.

El proyecto actual cuenta con ~8 productos en catálogo (tinturas, café adaptogénico, bundles), un carrito de compras almacenado en localStorage, y autenticación básica con Firebase. La nueva arquitectura implementará una base de datos relacional con Prisma, autenticación con NextAuth.js, y API Routes de Next.js para el backend.

## Glossary

- **System**: El e-commerce completo de hongos funcionales
- **Database**: PostgreSQL database gestionada con Prisma ORM
- **Auth_System**: NextAuth.js authentication system
- **API**: Next.js API Routes que manejan las operaciones del backend
- **User**: Usuario registrado en la plataforma
- **Guest**: Usuario no autenticado navegando el sitio
- **Order**: Pedido realizado por un usuario
- **Product**: Producto del catálogo (tintura, café, bundle)
- **Cart**: Carrito de compras del usuario
- **Session**: Sesión de autenticación del usuario
- **Migration_Script**: Script para migrar datos existentes de Firebase a PostgreSQL
- **Schema**: Prisma schema que define los modelos de datos

## Requirements

### Requirement 1: Database Setup and Schema Definition

**User Story:** Como desarrollador, quiero definir el schema de Prisma con todos los modelos necesarios, para que la base de datos refleje la estructura de datos del e-commerce.

#### Acceptance Criteria

1. THE System SHALL create a Prisma schema file with User, Product, Order, OrderItem, and Cart models
2. THE User model SHALL include fields for id, email, name, password hash, created timestamp, and updated timestamp
3. THE Product model SHALL include fields for id, name, slug, price, description, benefits array, category, type, image reference, and inventory count
4. THE Order model SHALL include fields for id, user reference, status, total amount, shipping address, created timestamp, and updated timestamp
5. THE OrderItem model SHALL include fields for id, order reference, product reference, quantity, and unit price
6. THE Cart model SHALL include fields for id, user reference (nullable for guests), session id, items JSON, and updated timestamp
7. THE Schema SHALL define proper relations between User-Order (one-to-many), Order-OrderItem (one-to-many), and Product-OrderItem (one-to-many)
8. THE Schema SHALL include appropriate indexes on email, slug, and user_id fields for query performance
9. THE System SHALL generate TypeScript types from the Prisma schema for type-safe database operations

### Requirement 2: Database Connection and Client Setup

**User Story:** Como desarrollador, quiero configurar la conexión a PostgreSQL con Prisma Client, para que la aplicación pueda realizar operaciones de base de datos de forma segura y eficiente.

#### Acceptance Criteria

1. THE System SHALL create a Prisma Client singleton instance to prevent connection pool exhaustion
2. THE System SHALL read database connection string from environment variables
3. WHEN the application starts in development mode, THE System SHALL enable Prisma query logging
4. THE System SHALL handle database connection errors gracefully and log appropriate error messages
5. THE System SHALL export the Prisma Client instance for use across the application
6. THE System SHALL include connection pooling configuration appropriate for serverless environments

### Requirement 3: NextAuth.js Authentication Setup

**User Story:** Como desarrollador, quiero implementar NextAuth.js para reemplazar Firebase Auth, para que los usuarios puedan autenticarse de forma segura sin depender de servicios externos.

#### Acceptance Criteria

1. THE Auth_System SHALL support email/password authentication using Credentials provider
2. THE Auth_System SHALL support OAuth authentication with Google provider
3. THE Auth_System SHALL hash passwords using bcrypt before storing them in the Database
4. WHEN a user logs in with valid credentials, THE Auth_System SHALL create a session and return a JWT token
5. WHEN a user logs in with invalid credentials, THE Auth_System SHALL return an authentication error
6. THE Auth_System SHALL store session data in the Database using Prisma adapter
7. THE Auth_System SHALL include session callbacks to add user id and email to the session object
8. THE Auth_System SHALL configure session strategy as JWT for serverless compatibility
9. THE Auth_System SHALL set appropriate session max age and update age values

### Requirement 4: User Registration API

**User Story:** Como usuario nuevo, quiero registrarme con email y contraseña, para que pueda crear una cuenta y realizar pedidos.

#### Acceptance Criteria

1. THE API SHALL expose a POST endpoint at /api/auth/register
2. WHEN a registration request is received with email and password, THE API SHALL validate the email format
3. WHEN a registration request is received with email and password, THE API SHALL validate the password meets minimum requirements (8 characters minimum)
4. WHEN a registration request is received with an email that already exists, THE API SHALL return a 409 conflict error
5. WHEN a registration request is received with valid data, THE API SHALL hash the password using bcrypt
6. WHEN a registration request is received with valid data, THE API SHALL create a new User record in the Database
7. WHEN a User is successfully created, THE API SHALL return a 201 status with the user data (excluding password)
8. IF an error occurs during registration, THE API SHALL return an appropriate error status and message

### Requirement 5: User Authentication and Session Management

**User Story:** Como usuario registrado, quiero iniciar sesión con mi email y contraseña, para que pueda acceder a mi perfil y realizar pedidos.

#### Acceptance Criteria

1. WHEN a user submits valid credentials, THE Auth_System SHALL verify the password against the stored hash
2. WHEN a user submits valid credentials, THE Auth_System SHALL create a session with user id and email
3. WHEN a user submits invalid credentials, THE Auth_System SHALL return an error without revealing whether email or password was incorrect
4. THE Auth_System SHALL provide a useSession hook for client components to access session data
5. THE Auth_System SHALL provide getServerSession function for server components to access session data
6. WHEN a user logs out, THE Auth_System SHALL invalidate the session
7. THE Auth_System SHALL automatically refresh sessions before expiration

### Requirement 6: Product Catalog API

**User Story:** Como usuario, quiero ver el catálogo de productos actualizado desde la base de datos, para que pueda explorar y comprar hongos funcionales.

#### Acceptance Criteria

1. THE API SHALL expose a GET endpoint at /api/products to retrieve all products
2. THE API SHALL expose a GET endpoint at /api/products/[slug] to retrieve a single product by slug
3. WHEN a request for all products is received, THE API SHALL return products with id, name, slug, price, description, benefits, category, type, and image
4. WHEN a request for a single product is received with a valid slug, THE API SHALL return the complete product details
5. WHEN a request for a single product is received with an invalid slug, THE API SHALL return a 404 error
6. THE API SHALL support query parameters for filtering products by category and benefit category
7. THE API SHALL return products sorted by creation date descending by default
8. THE API SHALL include proper error handling and return appropriate HTTP status codes

### Requirement 7: Cart Management API

**User Story:** Como usuario, quiero que mi carrito se guarde en la base de datos, para que persista entre sesiones y dispositivos.

#### Acceptance Criteria

1. THE API SHALL expose a GET endpoint at /api/cart to retrieve the current user's cart
2. THE API SHALL expose a POST endpoint at /api/cart/items to add items to the cart
3. THE API SHALL expose a PATCH endpoint at /api/cart/items/[productId] to update item quantity
4. THE API SHALL expose a DELETE endpoint at /api/cart/items/[productId] to remove items from the cart
5. WHEN an authenticated user requests their cart, THE API SHALL return the cart associated with their user id
6. WHEN a guest user requests their cart, THE API SHALL return the cart associated with their session id
7. WHEN adding an item that already exists in the cart, THE API SHALL increment the quantity
8. WHEN updating an item quantity to zero, THE API SHALL remove the item from the cart
9. THE API SHALL validate that product ids exist before adding to cart
10. THE API SHALL calculate and return the cart total based on current product prices

### Requirement 8: Order Creation API

**User Story:** Como usuario autenticado, quiero crear un pedido desde mi carrito, para que pueda completar mi compra.

#### Acceptance Criteria

1. THE API SHALL expose a POST endpoint at /api/orders to create a new order
2. WHEN an order creation request is received, THE API SHALL verify the user is authenticated
3. WHEN an order creation request is received, THE API SHALL validate the shipping address fields are complete
4. WHEN an order creation request is received, THE API SHALL retrieve the user's current cart
5. WHEN an order creation request is received with an empty cart, THE API SHALL return a 400 error
6. WHEN an order creation request is received with a valid cart, THE API SHALL create an Order record with status "pending"
7. WHEN an order creation request is received with a valid cart, THE API SHALL create OrderItem records for each cart item
8. WHEN an order creation request is received with a valid cart, THE API SHALL calculate the total amount from cart items
9. WHEN an order is successfully created, THE API SHALL clear the user's cart
10. WHEN an order is successfully created, THE API SHALL return the order id and details
11. THE API SHALL wrap order creation in a database transaction to ensure data consistency

### Requirement 9: Order History API

**User Story:** Como usuario autenticado, quiero ver mi historial de pedidos, para que pueda revisar mis compras anteriores.

#### Acceptance Criteria

1. THE API SHALL expose a GET endpoint at /api/orders to retrieve the authenticated user's orders
2. WHEN an order history request is received, THE API SHALL verify the user is authenticated
3. WHEN an order history request is received from an authenticated user, THE API SHALL return all orders for that user
4. THE API SHALL return orders sorted by creation date descending (most recent first)
5. THE API SHALL include order items with product details for each order
6. THE API SHALL expose a GET endpoint at /api/orders/[orderId] to retrieve a single order
7. WHEN a single order request is received, THE API SHALL verify the order belongs to the authenticated user
8. WHEN a single order request is received for an order that doesn't belong to the user, THE API SHALL return a 403 forbidden error

### Requirement 10: User Profile API

**User Story:** Como usuario autenticado, quiero ver y actualizar mi perfil, para que pueda mantener mi información actualizada.

#### Acceptance Criteria

1. THE API SHALL expose a GET endpoint at /api/user/profile to retrieve the authenticated user's profile
2. THE API SHALL expose a PATCH endpoint at /api/user/profile to update the authenticated user's profile
3. WHEN a profile request is received, THE API SHALL verify the user is authenticated
4. WHEN a profile request is received from an authenticated user, THE API SHALL return user data excluding password hash
5. WHEN a profile update request is received, THE API SHALL validate the updated fields
6. WHEN a profile update request includes email change, THE API SHALL verify the new email is not already in use
7. WHEN a profile update request includes password change, THE API SHALL hash the new password before storing
8. WHEN a profile is successfully updated, THE API SHALL return the updated user data

### Requirement 11: Data Migration from Firebase

**User Story:** Como desarrollador, quiero migrar los datos existentes de Firebase a PostgreSQL, para que no se pierda información durante la transición.

#### Acceptance Criteria

1. THE Migration_Script SHALL connect to both Firebase and PostgreSQL databases
2. THE Migration_Script SHALL export all existing users from Firebase Auth
3. THE Migration_Script SHALL create corresponding User records in PostgreSQL with generated passwords
4. THE Migration_Script SHALL export all products from Firestore
5. THE Migration_Script SHALL create corresponding Product records in PostgreSQL maintaining all fields
6. THE Migration_Script SHALL export all orders from Firestore if they exist
7. THE Migration_Script SHALL create corresponding Order and OrderItem records in PostgreSQL
8. THE Migration_Script SHALL log migration progress and any errors encountered
9. THE Migration_Script SHALL generate a report of migrated records counts
10. THE Migration_Script SHALL handle migration errors gracefully without stopping the entire process

### Requirement 12: Environment Configuration

**User Story:** Como desarrollador, quiero configurar las variables de entorno necesarias, para que la aplicación funcione correctamente en todos los ambientes.

#### Acceptance Criteria

1. THE System SHALL require DATABASE_URL environment variable for PostgreSQL connection
2. THE System SHALL require NEXTAUTH_URL environment variable for NextAuth.js configuration
3. THE System SHALL require NEXTAUTH_SECRET environment variable for session encryption
4. THE System SHALL require GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET for OAuth authentication
5. THE System SHALL provide an .env.example file documenting all required environment variables
6. WHEN a required environment variable is missing, THE System SHALL log a clear error message
7. THE System SHALL validate environment variables at application startup

### Requirement 13: Frontend Authentication Integration

**User Story:** Como usuario, quiero que la interfaz se actualice para usar NextAuth.js, para que pueda iniciar sesión sin cambios visibles en la experiencia.

#### Acceptance Criteria

1. THE System SHALL replace Firebase useUser hook with NextAuth useSession hook
2. THE System SHALL update the login page to use NextAuth signIn function
3. THE System SHALL update the profile page to use NextAuth session data
4. THE System SHALL update the header component to show user status from NextAuth session
5. THE System SHALL remove all Firebase client SDK imports from frontend components
6. THE System SHALL maintain the same UI/UX for login, logout, and profile pages
7. WHEN a user is not authenticated and tries to access protected pages, THE System SHALL redirect to login page

### Requirement 14: Frontend Cart Integration

**User Story:** Como usuario, quiero que mi carrito se sincronice con el backend, para que mis productos persistan entre sesiones.

#### Acceptance Criteria

1. THE System SHALL update CartContext to fetch cart data from /api/cart on mount
2. THE System SHALL update addToCart function to call POST /api/cart/items
3. THE System SHALL update updateQuantity function to call PATCH /api/cart/items/[productId]
4. THE System SHALL update removeFromCart function to call DELETE /api/cart/items/[productId]
5. THE System SHALL maintain optimistic UI updates while API calls are in progress
6. WHEN an API call fails, THE System SHALL revert the optimistic update and show an error message
7. THE System SHALL remove localStorage cart logic after migration is complete
8. FOR authenticated users, THE System SHALL migrate localStorage cart to database on first login after migration

### Requirement 15: Frontend Product Catalog Integration

**User Story:** Como usuario, quiero que los productos se carguen desde la base de datos, para que vea información actualizada en tiempo real.

#### Acceptance Criteria

1. THE System SHALL update product listing pages to fetch from /api/products
2. THE System SHALL update product detail pages to fetch from /api/products/[slug]
3. THE System SHALL remove hardcoded product data from lib/data.tsx
4. THE System SHALL implement loading states while products are being fetched
5. WHEN product fetch fails, THE System SHALL display an error message to the user
6. THE System SHALL implement client-side caching for product data to reduce API calls
7. THE System SHALL maintain the same product card and detail UI components

### Requirement 16: Frontend Checkout Integration

**User Story:** Como usuario, quiero completar el checkout creando un pedido en la base de datos, para que mi compra quede registrada.

#### Acceptance Criteria

1. THE System SHALL update CheckoutForm to call POST /api/orders on submission
2. WHEN checkout is successful, THE System SHALL redirect to an order confirmation page
3. WHEN checkout is successful, THE System SHALL display the order id and details
4. WHEN checkout fails, THE System SHALL display an error message without clearing the form
5. THE System SHALL verify user is authenticated before allowing checkout
6. WHEN a guest user attempts checkout, THE System SHALL redirect to login page
7. THE System SHALL clear the cart UI after successful order creation

### Requirement 17: Frontend Order History Integration

**User Story:** Como usuario autenticado, quiero ver mi historial de pedidos en mi perfil, para que pueda revisar mis compras.

#### Acceptance Criteria

1. THE System SHALL update profile page to fetch orders from /api/orders
2. THE System SHALL display orders in a list with order id, date, total, and status
3. THE System SHALL implement a detail view for each order showing all items
4. WHEN no orders exist, THE System SHALL display a message indicating no orders found
5. THE System SHALL implement loading states while orders are being fetched
6. WHEN order fetch fails, THE System SHALL display an error message

### Requirement 18: Error Handling and Logging

**User Story:** Como desarrollador, quiero implementar manejo de errores consistente, para que pueda diagnosticar problemas en producción.

#### Acceptance Criteria

1. THE API SHALL return consistent error response format with status code, message, and error code
2. THE API SHALL log all errors with appropriate context (user id, endpoint, timestamp)
3. WHEN a database error occurs, THE API SHALL log the error and return a generic 500 error to the client
4. WHEN a validation error occurs, THE API SHALL return a 400 error with specific field errors
5. WHEN an authentication error occurs, THE API SHALL return a 401 error
6. WHEN an authorization error occurs, THE API SHALL return a 403 error
7. THE System SHALL implement error boundaries in React components to catch rendering errors

### Requirement 19: Testing and Validation

**User Story:** Como desarrollador, quiero validar que la migración fue exitosa, para que pueda desplegar con confianza.

#### Acceptance Criteria

1. THE System SHALL verify all API endpoints return expected responses for valid inputs
2. THE System SHALL verify all API endpoints return appropriate errors for invalid inputs
3. THE System SHALL verify user registration, login, and logout flows work correctly
4. THE System SHALL verify cart operations (add, update, remove) work correctly
5. THE System SHALL verify order creation and retrieval work correctly
6. THE System SHALL verify product catalog displays correctly
7. THE System SHALL verify migrated data matches Firebase data
8. THE System SHALL verify no Firebase dependencies remain in the codebase

### Requirement 20: Deployment Configuration

**User Story:** Como desarrollador, quiero configurar el despliegue en Vercel con PostgreSQL, para que la aplicación esté disponible en producción.

#### Acceptance Criteria

1. THE System SHALL configure Vercel Postgres or Neon database for production
2. THE System SHALL run Prisma migrations as part of the deployment process
3. THE System SHALL configure environment variables in Vercel dashboard
4. THE System SHALL verify database connection works in production environment
5. THE System SHALL configure appropriate database connection pooling for serverless
6. THE System SHALL document the deployment process in README
7. THE System SHALL remove Firebase configuration from production build
