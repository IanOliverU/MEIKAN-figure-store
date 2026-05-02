import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OrderItem, OrderItemCard } from '../../components/OrderItemCard';
import { OrderStatusCard } from '../../components/OrderStatusCard';
import { TrackingTimeline } from '../../components/TrackingTimeline';
import { TrackingStep } from '../../components/TimelineItem';

const timeline: TrackingStep[] = [
  {
    id: 'placed',
    title: 'Order Placed',
    time: 'Apr 28 - 10:42 AM',
    state: 'completed',
  },
  {
    id: 'shipped',
    title: 'Shipped from Japan',
    time: 'Apr 29 - 2:15 PM - Tokyo, JP',
    state: 'completed',
  },
  {
    id: 'arrived',
    title: 'Arrived in Philippines',
    time: 'May 1 - 8:30 AM - NAIA Cargo',
    state: 'completed',
  },
  {
    id: 'delivery',
    title: 'Out for Delivery',
    time: 'May 2 - 9:00 AM - San Jose del Monte',
    state: 'current',
  },
  {
    id: 'delivered',
    title: 'Delivered',
    time: 'Pending',
    state: 'pending',
  },
];

const items: OrderItem[] = [
  {
    id: '1',
    brand: 'GSC',
    name: 'Rem - Winter Maid Ver.',
    price: 8900,
  },
  {
    id: '2',
    brand: 'Alter',
    name: 'Asuna - ALO Ver.',
    price: 12500,
  },
];

const order = {
  id: '#MKN-20481',
  date: 'Placed Apr 28, 2026',
  currentStatus: 'Out for Delivery',
  estimatedDelivery: 'Arriving today - ETA 3-6 PM',
  timeline,
  items,
};

export default function OrderTrackingScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-28 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="relative h-10 flex-row items-center justify-center">
          <Pressable
            className="absolute left-0 h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={18} color="#A1A1A1" />
          </Pressable>
          <Text className="text-base font-semibold text-white">Order Tracking</Text>
        </View>

        <View className="mt-7">
          <Text className="text-2xl font-semibold text-white">Order {order.id}</Text>
          <Text className="mt-1 text-sm text-[#A1A1A1]">{order.date}</Text>
        </View>

        <View className="mt-6">
          <OrderStatusCard title={order.currentStatus} subtitle={order.estimatedDelivery} />
        </View>

        <View className="mt-7">
          <Text className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#666666]">Tracking timeline</Text>
          <TrackingTimeline steps={order.timeline} />
        </View>

        <View className="mt-3">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Items in this order</Text>
          <View className="rounded-2xl border border-[#222222] bg-[#121212] p-4">
            {order.items.map((item, index) => (
              <OrderItemCard key={item.id} item={item} showDivider={index < order.items.length - 1} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
