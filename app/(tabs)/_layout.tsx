import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { AddressProvider } from '../../components/addresses/AddressContext';
import { PaymentMethodsProvider } from '../../components/payment/PaymentMethodsContext';

const ACCENT = '#C6A96B';
const MUTED = '#666666';

export default function TabsLayout() {
  return (
    <AddressProvider>
      <PaymentMethodsProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: ACCENT,
            tabBarInactiveTintColor: MUTED,
            tabBarStyle: {
              position: 'absolute',
              height: 72,
              paddingBottom: 18,
              paddingTop: 12,
              backgroundColor: '#0A0A0A',
              borderTopColor: '#222222',
              borderTopWidth: 1,
              elevation: 0,
              shadowOpacity: 0,
            },
            sceneStyle: {
              backgroundColor: '#0A0A0A',
            },
          }}
        >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="browse"
          options={{
            title: 'Browse',
            tabBarIcon: ({ color, size }) => <Ionicons name="search-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            title: 'Wishlist',
            tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color, size }) => <Ionicons name="bag-handle-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="product/[id]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="checkout"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="order-tracking"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="payment-methods"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="addresses"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            href: null,
          }}
        />
        </Tabs>
      </PaymentMethodsProvider>
    </AddressProvider>
  );
}
