# MEIKAN

MEIKAN is a premium anime figure ecommerce mobile application built with Expo React Native. It is designed for collectors shopping Japanese figures from makers and product lines such as Good Smile Company, Alter, Max Factory, Myethos, Apex, Nendoroids, Figma, and scale figures.

The project focuses on a modern mobile shopping experience: discovery, product browsing, pre-order style flows, wishlist management, cart and checkout interactions, collector rewards, profile tools, and a Supabase-ready architecture for future production backend integration.

## App Description

MEIKAN is a dark, minimal, luxury-inspired shopping platform for anime figure collectors. The app presents collectible products with a polished storefront, product detail pages, saved items, checkout, order tracking, account settings, and profile utilities.

The current version is a frontend-first mobile app. Most product, auth, order, payment, and settings flows are implemented with local or mocked state so the experience can be explored without a live backend. Supabase integration is prepared in the project structure and is planned as the next backend milestone.

## Main Features

- Premium dark-mode ecommerce UI
- Home storefront with featured figure discovery
- Browse/catalog experience for collectible figures
- Product details with gallery, specs, pricing, and cart actions
- Wishlist and saved-item interactions
- Cart, checkout, mock payment selection, and order summary
- Mock order processing and order confirmation flow
- Order tracking timeline
- Profile hub with customer tools
- Addresses and payment methods screens
- Rewards and points experience
- Help center, policies, and mock support interactions
- Settings for account, shopping preferences, notifications, privacy, security, app preferences, and about
- Supabase-ready service layer for future auth, profile, preferences, and security modules

## Tech Stack

### Frontend

- Expo
- React Native
- TypeScript
- Expo Router
- NativeWind
- Tailwind CSS
- Zustand
- TanStack Query
- React Native Reanimated
- Expo Image
- React Native SVG

### Backend Planned

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage

### Future Admin Dashboard

- Next.js
- Supabase

## Installation & Setup

### Prerequisites

- Node.js
- npm
- Expo CLI through `npx expo`
- iOS Simulator, Android Emulator, or Expo Go for device testing

### Install Dependencies

Install the project dependencies from `package.json`:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

Run directly on a platform:

```bash
npm run android
npm run ios
```

## Dependency Commands

These commands are useful when creating the project from a clean Expo app or when reinstalling key packages.

### Expo & Router

```bash
npx create-expo-app MEIKAN
npx expo install expo expo-router
```

### NativeWind & Tailwind CSS

```bash
npm install nativewind
npm install -D tailwindcss
```

### State & Server Cache

```bash
npm install zustand
npm install @tanstack/react-query
```

### Animation, Images & SVG

```bash
npx expo install react-native-reanimated
npx expo install expo-image
npx expo install react-native-svg
```

### Supabase Client

```bash
npm install @supabase/supabase-js
npx expo install react-native-url-polyfill
```

## Project Structure

```text
MEIKAN/
+-- app/
|   +-- (tabs)/
|   |   +-- index.tsx
|   |   +-- browse.tsx
|   |   +-- wishlist.tsx
|   |   +-- cart.tsx
|   |   +-- checkout.tsx
|   |   +-- profile.tsx
|   |   +-- orders.tsx
|   |   +-- order-tracking.tsx
|   |   +-- rewards.tsx
|   |   +-- addresses/
|   |   +-- help/
|   |   +-- payment-methods/
|   |   +-- product/[id].tsx
|   +-- settings/
|   |   +-- account/
|   |   +-- app/
|   |   +-- notifications/
|   |   +-- preferences/
|   |   +-- security/
|   |   +-- about/
|   +-- login.tsx
|   +-- register.tsx
|   +-- forgot-password.tsx
|   +-- order-processing.tsx
|   +-- order-confirmation.tsx
|   +-- _layout.tsx
+-- components/
|   +-- auth/
|   +-- checkout/
|   +-- addresses/
|   +-- help/
|   +-- order/
|   +-- orders/
|   +-- payment/
|   +-- rewards/
|   +-- settings/
+-- services/
|   +-- supabase/
+-- screens/
+-- assets/
|   +-- images/
+-- config/
+-- global.css
+-- tailwind.config.js
+-- metro.config.js
+-- app.json
+-- package.json
```

## Navigation Structure

MEIKAN uses Expo Router with file-based navigation.

### Root Routes

- `app/index.tsx` - app entry/splash routing
- `app/login.tsx` - login screen
- `app/register.tsx` - registration screen
- `app/forgot-password.tsx` - password recovery UI
- `app/order-processing.tsx` - mock processing state
- `app/order-confirmation.tsx` - order success screen

### Tab Routes

- `app/(tabs)/index.tsx` - home storefront
- `app/(tabs)/browse.tsx` - browse/catalog
- `app/(tabs)/wishlist.tsx` - wishlist
- `app/(tabs)/cart.tsx` - cart
- `app/(tabs)/checkout.tsx` - checkout
- `app/(tabs)/profile.tsx` - profile hub
- `app/(tabs)/orders.tsx` - my orders
- `app/(tabs)/order-tracking.tsx` - tracking timeline
- `app/(tabs)/rewards.tsx` - rewards and points
- `app/(tabs)/notifications.tsx` - notifications
- `app/(tabs)/product/[id].tsx` - product details

### Nested Feature Routes

- `app/(tabs)/addresses/` - address book, address details, add, and edit flows
- `app/(tabs)/payment-methods/` - payment methods, details, add, and wallet routes
- `app/(tabs)/help/` - help center and policy details
- `app/settings/account/` - identity, profile, email, password, and connected accounts
- `app/settings/preferences/` - shopping preferences
- `app/settings/notifications/` - notification preferences
- `app/settings/security/` - privacy and security
- `app/settings/app/` - app preferences
- `app/settings/about/` - about and legal information

## Current Implemented Modules & Screens

### Authentication

- Login screen
- Register screen
- Forgot password screen
- Mock authentication flow
- Interactive auth UI components
- Supabase-ready auth structure

### Shopping

- Home screen
- Browse/catalog screen
- Product details screen
- Wishlist
- Cart
- Checkout
- Mock order flow
- Order processing
- Order confirmation
- Order tracking

### Profile System

- My Orders
- Payment Methods
- Addresses
- Rewards & Points
- Help Center

### Settings

- Account & Identity
- Shopping Preferences
- Notifications
- Privacy & Security
- App Preferences
- About

## Supabase-Ready Architecture Notes

The repository already includes a `services/supabase/` layer intended to keep backend access separate from UI screens and components.

Current Supabase-oriented modules include:

- `client.ts` - Supabase client setup
- `authService.ts` - authentication service boundary
- `authContext.tsx` - auth context structure
- `profileService.ts` - profile data service
- `preferencesService.ts` - shopping preferences service
- `notificationPreferencesService.ts` - notification settings service
- `appPreferencesService.ts` - app preference service
- `securityService.ts` - security/account service boundary
- `database.types.ts` - generated database type target

This keeps the app ready for a real Supabase backend without tightly coupling screens to database calls. The intended production flow is:

1. Connect Supabase environment variables.
2. Generate and sync database types.
3. Replace mock/local state with service calls.
4. Add TanStack Query hooks for server cache and mutations.
5. Connect Supabase Auth, PostgreSQL tables, Storage buckets, and row-level security policies.

## Screens & Features Currently Mocked

The app is currently frontend-first. These areas are intentionally mocked or local:

- Authentication session state
- Product catalog data
- Wishlist persistence
- Cart persistence
- Checkout state
- Payment method validation
- Payment processing
- Order creation
- Order status updates
- Rewards and points history
- Notification data
- Help center support chat

Planned payment integrations include Stripe or PayMongo. Supabase integration is prepared but not yet connected to a live backend in the current app state.

## Design Philosophy

MEIKAN follows a Minimal Dark Premium design direction.

Core design goals:

- Clean mobile UI with low visual noise
- Premium collector-focused presentation
- Smooth ecommerce flow from discovery to checkout
- Japanese-inspired luxury aesthetic
- Strong product imagery and polished detail screens
- Modular components that can scale into a production storefront
- Calm dark surfaces, precise spacing, and subtle accent treatments

The interface is designed to feel more like a specialty collector boutique than a generic marketplace.

## Development Status

MEIKAN is in active frontend prototype development.

Current status:

- Core mobile ecommerce screens are implemented
- Navigation structure is in place
- UI components are modularized by feature area
- Supabase service boundaries exist
- Most systems still use local/mock state
- Real backend integration is planned later
- Payment flow is mocked
- Stripe or PayMongo integration is planned later
- Automated test coverage is not configured yet

## Roadmap

- Connect Supabase project and environment variables
- Implement real Supabase Auth
- Add PostgreSQL-backed product catalog
- Persist wishlist, cart, addresses, and payment metadata
- Add real checkout and payment processing
- Integrate Stripe or PayMongo
- Add push notifications
- Add real-time order updates
- Add Supabase Storage image upload
- Build Next.js admin dashboard
- Add inventory and pre-order management
- Add localization for Japanese/English storefront support
- Add theme system
- Add analytics and conversion tracking
- Add automated tests and CI checks

## Credits

MEIKAN is a portfolio ecommerce mobile application for a premium anime figure shopping experience.

Built with:

- Expo and React Native
- TypeScript
- Expo Router
- NativeWind
- Supabase-ready architecture

Author: Project maintainer
