import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export type OrderStatus = 'delivered' | 'shipped' | 'processing' | 'preorder' | 'cancelled';

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

const badgeStyles = {
  delivered: {
    label: 'Delivered',
    icon: 'checkmark-circle' as const,
    className: 'border-emerald-500/35 bg-emerald-500/10',
    textClassName: 'text-emerald-300',
    iconColor: '#4ADE80',
  },
  shipped: {
    label: 'Shipped',
    icon: 'car' as const,
    className: 'border-blue-500/35 bg-blue-500/10',
    textClassName: 'text-blue-300',
    iconColor: '#60A5FA',
  },
  processing: {
    label: 'Processing',
    icon: 'time' as const,
    className: 'border-orange-500/35 bg-orange-500/10',
    textClassName: 'text-orange-300',
    iconColor: '#FDBA74',
  },
  preorder: {
    label: 'Pre-order',
    icon: 'calendar' as const,
    className: 'border-orange-500/35 bg-orange-500/10',
    textClassName: 'text-orange-300',
    iconColor: '#FDBA74',
  },
  cancelled: {
    label: 'Cancelled',
    icon: 'close-circle' as const,
    className: 'border-red-500/25 bg-red-500/10',
    textClassName: 'text-red-300',
    iconColor: '#F87171',
  },
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const style = badgeStyles[status];

  return (
    <View className={`h-8 flex-row items-center rounded-full border px-3 ${style.className}`}>
      <Ionicons name={style.icon} size={13} color={style.iconColor} />
      <Text className={`ml-1.5 text-[11px] font-semibold ${style.textClassName}`}>{style.label}</Text>
    </View>
  );
}
