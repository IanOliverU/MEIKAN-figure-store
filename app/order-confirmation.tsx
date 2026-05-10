import { Ionicons } from '@expo/vector-icons';
import { Href, router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ConfirmationOrder = {
  orderId: string;
  date: string;
  total: number;
  paymentMethod: {
    label: string;
  };
  shippingAddress: {
    name: string;
    line1: string;
    line2: string;
    country: string;
  };
  status: string;
};

const TRACKING_ROUTE = '/order-tracking' as Href;
const HOME_ROUTE = '/(tabs)' as Href;
const PESO = '\u20b1';

const fallbackOrder: ConfirmationOrder = {
  orderId: 'MKN-20481',
  date: new Date().toISOString(),
  total: 39650,
  paymentMethod: {
    label: 'Visa **** 4291',
  },
  shippingAddress: {
    name: 'Juan dela Cruz',
    line1: 'Blk 5 Lot 12 Sampaguita Street, Barangay Graceville',
    line2: 'San Jose del Monte, Bulacan 3023',
    country: 'Philippines',
  },
  status: 'Processing',
};

function formatPrice(value: number) {
  return `${PESO}${value.toLocaleString('en-US')}`;
}

function parseOrder(orderParam?: string | string[]): ConfirmationOrder {
  const rawOrder = Array.isArray(orderParam) ? orderParam[0] : orderParam;

  if (!rawOrder) {
    return fallbackOrder;
  }

  try {
    return JSON.parse(decodeURIComponent(rawOrder)) as ConfirmationOrder;
  } catch {
    return fallbackOrder;
  }
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between gap-4">
      <Text className="text-sm text-[#777777]">{label}</Text>
      <Text className="flex-1 text-right text-sm font-semibold text-white">{value}</Text>
    </View>
  );
}

export default function OrderConfirmationScreen() {
  const params = useLocalSearchParams<{ order?: string }>();
  const order = useMemo(() => parseOrder(params.order), [params.order]);

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-28 pt-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center">
          <View className="h-20 w-20 items-center justify-center rounded-full border border-[#5F5131] bg-[#1A1710]">
            <Ionicons name="checkmark-circle" size={46} color="#C6A96B" />
          </View>
          <Text className="mt-6 text-center text-2xl font-semibold text-white">Order placed successfully</Text>
          <Text className="mt-3 text-center text-sm leading-5 text-[#A1A1A1]">
            Your MEIKAN order has been received.
          </Text>
        </View>

        <View className="mt-8 rounded-2xl border border-[#222222] bg-[#121212] p-4">
          <Text className="text-base font-semibold text-white">Order details</Text>
          <View className="mt-4 gap-3">
            <DetailRow label="Order ID" value={order.orderId} />
            <DetailRow label="Status" value={order.status} />
            <DetailRow label="Total" value={formatPrice(order.total)} />
            <DetailRow label="Payment" value={order.paymentMethod.label} />
            <DetailRow label="Estimated delivery" value="7-14 business days" />
          </View>
        </View>

        <View className="mt-4 rounded-2xl border border-[#222222] bg-[#121212] p-4">
          <Text className="text-base font-semibold text-white">Shipping to</Text>
          <Text className="mt-3 text-sm font-semibold text-white">{order.shippingAddress.name}</Text>
          <Text className="mt-2 text-sm leading-5 text-[#A1A1A1]">{order.shippingAddress.line1}</Text>
          <Text className="text-sm leading-5 text-[#A1A1A1]">{order.shippingAddress.line2}</Text>
          <Text className="text-sm leading-5 text-[#A1A1A1]">{order.shippingAddress.country}</Text>
        </View>

        <Pressable
          className="mt-8 h-14 flex-row items-center justify-center rounded-2xl bg-[#C6A96B]"
          onPress={() => router.push(TRACKING_ROUTE)}
          style={({ pressed }) => ({ opacity: pressed ? 0.84 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
        >
          <Ionicons name="navigate-outline" size={18} color="#0A0A0A" />
          <Text className="ml-2 text-base font-semibold text-[#0A0A0A]">Track Order</Text>
        </Pressable>

        <Pressable
          className="mt-3 h-14 flex-row items-center justify-center rounded-2xl border border-[#2A2A2A] bg-[#121212]"
          onPress={() => router.replace(HOME_ROUTE)}
          style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
        >
          <Ionicons name="home-outline" size={18} color="#C6A96B" />
          <Text className="ml-2 text-base font-semibold text-[#C6A96B]">Back to Home</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
