import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export type OrderItem = {
  id: string;
  brand: string;
  name: string;
  price: number;
};

type OrderItemCardProps = {
  item: OrderItem;
  showDivider?: boolean;
};

const PESO = '\u20b1';
const formatPrice = (value: number) => `${PESO}${value.toLocaleString('en-US')}`;

export function OrderItemCard({ item, showDivider = false }: OrderItemCardProps) {
  return (
    <View className={showDivider ? 'border-b border-[#222222] pb-4 mb-4' : ''}>
      <View className="flex-row items-center gap-3">
        <View className="h-14 w-14 items-center justify-center rounded-xl bg-[#1A1A1A]">
          <Ionicons name="body-outline" size={25} color="#4F452F" />
        </View>
        <View className="min-w-0 flex-1">
          <Text className="text-[10px] font-semibold uppercase tracking-wide text-[#C6A96B]" numberOfLines={1}>
            {item.brand}
          </Text>
          <Text className="mt-1 text-sm font-semibold leading-5 text-white" numberOfLines={2}>
            {item.name}
          </Text>
        </View>
        <Text className="text-base font-semibold text-white">{formatPrice(item.price)}</Text>
      </View>
    </View>
  );
}
