# MEIKAN

MEIKAN is a dark-mode luxury shopping prototype built with Expo, React Native, Expo Router, and NativeWind.

The app currently covers the core storefront flow: home discovery, browsing, product detail, wishlist, cart, checkout, order tracking, and profile screens.

## Getting Started

Install dependencies:

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

## App Routes

- `app/(tabs)/index.tsx` - Home storefront
- `app/(tabs)/browse.tsx` - Product browsing
- `app/(tabs)/wishlist.tsx` - Saved items
- `app/(tabs)/cart.tsx` - Shopping cart
- `app/(tabs)/profile.tsx` - Customer profile
- `app/(tabs)/product/[id].tsx` - Product detail
- `app/(tabs)/checkout.tsx` - Checkout flow
- `app/(tabs)/order-tracking.tsx` - Order status and timeline

## Project Structure

- `app/` - Expo Router layouts and routes
- `components/` - Shared app UI components
- `screens/` - Screen-level components used outside the tab routes
- `assets/` - App icons, splash assets, logos, and image resources
- `global.css` - NativeWind global stylesheet
- `tailwind.config.js` - Tailwind and NativeWind configuration

## Tech Stack

- Expo 55
- React 19
- React Native 0.83
- Expo Router with typed routes
- NativeWind and Tailwind CSS
- React Native Gesture Handler, Reanimated, Safe Area Context, and Screens
- Supabase client dependency for backend integration

## Notes

- The app is configured for portrait orientation and dark UI in `app.json`.
- Tab navigation is defined in `app/(tabs)/_layout.tsx`.
- There is no automated test script configured yet.
