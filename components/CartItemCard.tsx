import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { QuantityStepper } from './QuantityStepper';

export type CartLineItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  specs: string;
};

type CartItemCardProps = {
  item: CartLineItem;
  showDivider?: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
};

const formatPrice = (value: number) => `₱${value.toLocaleString('en-US')}`;

export function CartItemCard({ item, showDivider = false, onDecrease, onIncrease }: CartItemCardProps) {
  return (
    <View className={showDivider ? 'border-b border-[#222222] pb-4 mb-4' : ''}>
      <View className="flex-row gap-3">
        <View className="h-20 w-20 items-center justify-center rounded-xl border border-[#222222] bg-[#1A1A1A]">
          <Ionicons name="body-outline" size={34} color="#4F452F" />
        </View>

        <View className="min-w-0 flex-1 justify-center">
          <Text className="text-[11px] font-semibold uppercase tracking-wide text-[#C6A96B]" numberOfLines={1}>
            {item.brand}
          </Text>
          <Text className="mt-1 text-base font-semibold leading-5 text-white" numberOfLines={2}>
            {item.name}
          </Text>
          <Text className="mt-1 text-xs text-[#777777]" numberOfLines={1}>
            {item.specs}
          </Text>
        </View>

        <View className="items-end justify-between">
          <Text className="text-base font-semibold text-white">{formatPrice(item.price)}</Text>
          <QuantityStepper quantity={item.quantity} onDecrease={onDecrease} onIncrease={onIncrease} />
        </View>
      </View>
    </View>
  );
}
