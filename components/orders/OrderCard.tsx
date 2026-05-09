import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { OrderStatus, OrderStatusBadge } from './OrderStatusBadge';
import { OrderThumbnailItem, OrderThumbnailStack } from './OrderThumbnailStack';

export type OrderItem = OrderThumbnailItem & {
  price: number;
};

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  estimatedDate?: string;
};

type OrderCardProps = {
  order: Order;
  onPress?: () => void;
  onTrack?: () => void;
  onReorder?: () => void;
};

const PESO = '\u20b1';
const formatPrice = (value: number) => `${PESO}${value.toLocaleString('en-US')}`;

function getSummary(items: OrderItem[]) {
  const [first, second] = items;

  if (!first) {
    return 'No figures in this order';
  }

  if (!second) {
    return first.name;
  }

  return `${first.name} + ${items.length - 1} more`;
}

function ActionButton({
  label,
  icon,
  variant = 'secondary',
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
}) {
  const primary = variant === 'primary';

  return (
    <Pressable
      className={`h-10 flex-row items-center justify-center rounded-xl px-3 ${
        primary ? 'bg-[#C6A96B]' : 'border border-[#2A2A2A] bg-[#1A1A1A]'
      }`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] })}
    >
      <Ionicons name={icon} size={15} color={primary ? '#0A0A0A' : '#C6A96B'} />
      <Text className={`ml-1.5 text-xs font-semibold ${primary ? 'text-[#0A0A0A]' : 'text-[#C6A96B]'}`}>{label}</Text>
    </Pressable>
  );
}

export function OrderCard({ order, onPress, onTrack, onReorder }: OrderCardProps) {
  const cancelled = order.status === 'cancelled';
  const showTrack = order.status === 'delivered' || order.status === 'shipped';
  const showReorder = order.status === 'delivered' || order.status === 'cancelled';
  const showEstimate = order.status === 'processing' || order.status === 'preorder';

  return (
    <Pressable
      className="overflow-hidden rounded-2xl border border-[#222222] bg-[#121212] p-4"
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: cancelled ? (pressed ? 0.62 : 0.7) : pressed ? 0.88 : 1,
        transform: [{ scale: pressed ? 0.99 : 1 }],
      })}
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="min-w-0 flex-1">
          <Text className="text-base font-semibold text-white">{order.id}</Text>
          <Text className="mt-1 text-xs text-[#777777]">{order.date}</Text>
        </View>
        <View className="rounded-full border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-1">
          <Text className="text-[11px] font-semibold text-[#A1A1A1]">
            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row items-center gap-4">
        <OrderThumbnailStack items={order.items} />
        <View className="min-w-0 flex-1">
          <Text className="text-[10px] font-semibold uppercase tracking-wide text-[#C6A96B]" numberOfLines={1}>
            {order.items[0]?.brand ?? 'MEIKAN'}
          </Text>
          <Text className="mt-1 text-sm font-semibold leading-5 text-white" numberOfLines={2}>
            {getSummary(order.items)}
          </Text>
          {showEstimate && order.estimatedDate ? (
            <View className="mt-2 flex-row items-center">
              <Ionicons name="calendar-outline" size={13} color="#FDBA74" />
              <Text className="ml-1.5 text-xs text-orange-300" numberOfLines={1}>
                {order.estimatedDate}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <View className="mt-5 flex-row items-end justify-between gap-3">
        <View>
          <Text className="text-xs text-[#777777]">Total</Text>
          <Text className="mt-1 text-lg font-semibold text-white">{formatPrice(order.total)}</Text>
        </View>
        <View className="items-end gap-3">
          <OrderStatusBadge status={order.status} />
          {(showTrack || showReorder) && (
            <View className="flex-row gap-2">
              {showTrack ? <ActionButton label="Track" icon="navigate-outline" onPress={onTrack} /> : null}
              {showReorder ? (
                <ActionButton label="Reorder" icon="refresh-outline" variant={showTrack ? 'secondary' : 'primary'} onPress={onReorder} />
              ) : null}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
