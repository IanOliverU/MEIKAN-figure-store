import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Order, OrderCard } from '../../components/orders/OrderCard';
import { OrderFilter, OrderFilterTabs } from '../../components/orders/OrderFilterTabs';

const orders: Order[] = [
  {
    id: 'MKN-20481',
    date: 'May 2, 2026',
    status: 'delivered',
    total: 9650,
    items: [
      { id: 'rem-1', image: 'body-outline', name: 'Rem - Azure Maid Ver.', brand: 'FuRyu', price: 9650, accent: '#4ADE80' },
    ],
  },
  {
    id: 'MKN-20445',
    date: 'Apr 28, 2026',
    status: 'shipped',
    total: 16200,
    items: [
      { id: 'miku-1', image: 'musical-notes-outline', name: 'Hatsune Miku - Fantasy Ver.', brand: 'GSC', price: 16200, accent: '#60A5FA' },
    ],
  },
  {
    id: 'MKN-20390',
    date: 'Apr 14, 2026',
    status: 'preorder',
    total: 26700,
    estimatedDate: 'Est. release July 2026',
    items: [
      { id: 'fischl-1', image: 'flash-outline', name: 'Fischl - Astral DX', brand: 'Alter', price: 26700, accent: '#FDBA74' },
      { id: 'base-1', image: 'cube-outline', name: 'Display Base - Night Castle', brand: 'Alter', price: 0, accent: '#C6A96B' },
    ],
  },
  {
    id: 'MKN-20301',
    date: 'Mar 17, 2026',
    status: 'cancelled',
    total: 9200,
    items: [
      { id: 'zero-1', image: 'snow-outline', name: 'Rem - Summer Ver.', brand: 'Kadokawa', price: 9200, accent: '#F87171' },
    ],
  },
  {
    id: 'MKN-20278',
    date: 'Mar 8, 2026',
    status: 'delivered',
    total: 34800,
    items: [
      { id: 'asuna-1', image: 'shield-outline', name: 'Asuna - Starlight Bride', brand: 'Aniplex', price: 18400, accent: '#4ADE80' },
      { id: 'saber-1', image: 'sparkles-outline', name: 'Saber - Royal Dress', brand: 'GSC', price: 16400, accent: '#C6A96B' },
    ],
  },
  {
    id: 'MKN-20211',
    date: 'Feb 19, 2026',
    status: 'processing',
    total: 12450,
    estimatedDate: 'Est. shipping May 15, 2026',
    items: [
      { id: 'power-1', image: 'flame-outline', name: 'Power - Blood Hammer Ver.', brand: 'Kotobukiya', price: 12450, accent: '#FDBA74' },
    ],
  },
  {
    id: 'MKN-20184',
    date: 'Feb 7, 2026',
    status: 'delivered',
    total: 42300,
    items: [
      { id: 'makima-1', image: 'eye-outline', name: 'Makima - Public Safety Ver.', brand: 'Prime 1', price: 22600, accent: '#4ADE80' },
      { id: 'gojo-1', image: 'aperture-outline', name: 'Gojo Satoru - Hollow Purple', brand: 'MegaHouse', price: 19700, accent: '#60A5FA' },
    ],
  },
  {
    id: 'MKN-20119',
    date: 'Jan 22, 2026',
    status: 'shipped',
    total: 15600,
    items: [
      { id: 'marin-1', image: 'color-palette-outline', name: 'Marin Kitagawa - Studio Ver.', brand: 'Good Smile', price: 15600, accent: '#60A5FA' },
    ],
  },
  {
    id: 'MKN-20077',
    date: 'Jan 10, 2026',
    status: 'cancelled',
    total: 11800,
    items: [
      { id: 'anya-1', image: 'star-outline', name: 'Anya Forger - Eden Uniform', brand: 'FuRyu', price: 11800, accent: '#F87171' },
    ],
  },
  {
    id: 'MKN-20034',
    date: 'Dec 18, 2025',
    status: 'delivered',
    total: 28500,
    items: [
      { id: 'frieren-1', image: 'leaf-outline', name: 'Frieren - Journey Ver.', brand: 'Kotobukiya', price: 13200, accent: '#4ADE80' },
      { id: 'fern-1', image: 'flower-outline', name: 'Fern - Apprentice Mage', brand: 'Kotobukiya', price: 15300, accent: '#C6A96B' },
    ],
  },
  {
    id: 'MKN-19982',
    date: 'Nov 29, 2025',
    status: 'processing',
    total: 22100,
    estimatedDate: 'Est. shipping May 24, 2026',
    items: [
      { id: 'ryo-1', image: 'disc-outline', name: 'Ryo Yamada - Stage Ver.', brand: 'GSC', price: 10700, accent: '#FDBA74' },
      { id: 'bocchi-1', image: 'radio-outline', name: 'Hitori Gotoh - Practice Room', brand: 'GSC', price: 11400, accent: '#C6A96B' },
    ],
  },
  {
    id: 'MKN-19910',
    date: 'Oct 16, 2025',
    status: 'delivered',
    total: 30400,
    items: [
      { id: 'rei-1', image: 'moon-outline', name: 'Rei Ayanami - Plugsuit Ver.', brand: 'Alter', price: 14600, accent: '#4ADE80' },
      { id: 'asuka-1', image: 'planet-outline', name: 'Asuka - Test Type Ver.', brand: 'Alter', price: 15800, accent: '#F06B3B' },
    ],
  },
];

function filterOrders(filter: OrderFilter) {
  if (filter === 'All') {
    return orders;
  }

  return orders.filter((order) => {
    if (filter === 'Processing') {
      return order.status === 'processing' || order.status === 'preorder';
    }

    return order.status === filter.toLowerCase();
  });
}

export default function OrdersScreen() {
  const [activeFilter, setActiveFilter] = useState<OrderFilter>('All');
  const filteredOrders = useMemo(() => filterOrders(activeFilter), [activeFilter]);

  const handleTrack = (orderId: string) => {
    console.log(`Track order ${orderId}`);
    router.push('/order-tracking');
  };

  const handleReorder = (orderId: string) => {
    console.log(`Reorder ${orderId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="pb-28 pt-5" showsVerticalScrollIndicator={false}>
        <View className="px-5">
          <View className="flex-row items-center">
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
              onPress={() => router.back()}
              style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
            >
              <Ionicons name="chevron-back" size={18} color="#A1A1A1" />
            </Pressable>
            <View className="ml-4">
              <Text className="text-xl font-semibold text-white">My Orders</Text>
              <Text className="mt-1 text-sm text-[#A1A1A1]">{orders.length} orders total</Text>
            </View>
          </View>
        </View>

        <View className="mt-6 pl-5">
          <OrderFilterTabs activeFilter={activeFilter} onChange={setActiveFilter} />
        </View>

        {filteredOrders.length > 0 ? (
          <View className="mt-5 gap-4 px-5">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onPress={() => console.log(`Open order ${order.id}`)}
                onTrack={() => handleTrack(order.id)}
                onReorder={() => handleReorder(order.id)}
              />
            ))}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center px-7 py-24">
            <View className="h-20 w-20 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#171717]">
              <Ionicons name="cube-outline" size={34} color="#5F5F5F" />
            </View>
            <Text className="mt-6 text-xl font-semibold text-white">No orders yet</Text>
            <Pressable
              className="mt-8 h-12 flex-row items-center justify-center rounded-xl bg-[#C6A96B] px-7"
              onPress={() => router.push('/browse')}
              style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}
            >
              <Ionicons name="search-outline" size={17} color="#0A0A0A" />
              <Text className="ml-2 text-sm font-semibold text-[#0A0A0A]">Browse Figures</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
