import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export type WishlistItem = {
  id: string;
  name: string;
  brand: string;
  price: string;
  originalPrice?: string;
  status: 'INSTOCK' | 'PREORDER';
  discount?: string;
  specs: string;
};

type WishlistItemCardProps = {
  item: WishlistItem;
  onRemove: (id: string) => void;
  onAddToCart: (item: WishlistItem) => void;
};

const statusCopy = {
  INSTOCK: 'In Stock',
  PREORDER: 'Pre-order',
};

export function WishlistItemCard({ item, onRemove, onAddToCart }: WishlistItemCardProps) {
  const isInStock = item.status === 'INSTOCK';

  return (
    <View className="rounded-2xl border border-[#222222] bg-[#171717] p-3">
      <View className="flex-row items-center">
        <View className="h-20 w-20 items-center justify-center rounded-xl bg-[#1F1F1F]">
          <Ionicons name="body-outline" size={42} color={isInStock ? '#5F5F5F' : '#4F4F4F'} />
        </View>

        <View className="ml-4 flex-1 pr-2">
          <Text className="text-[10px] font-semibold uppercase tracking-wide text-[#C6A96B]" numberOfLines={1}>
            {item.brand}
          </Text>
          <Text className="mt-1 text-base font-semibold leading-5 text-white" numberOfLines={2}>
            {item.name}
          </Text>
          <Text className="mt-1 text-xs text-[#777777]" numberOfLines={1}>
            {item.specs}
          </Text>

          <View className="mt-3 flex-row flex-wrap items-center gap-2">
            <Text className="text-base font-semibold text-white">{item.price}</Text>
            {item.originalPrice ? (
              <Text className="text-xs text-[#666666] line-through">{item.originalPrice}</Text>
            ) : null}
            {item.discount ? (
              <View className="rounded-md border border-[#963318] bg-[#2A120D] px-2 py-1">
                <Text className="text-[10px] font-semibold text-[#F06B3B]">{item.discount}</Text>
              </View>
            ) : null}
            <View
              className={`rounded-md border px-2 py-1 ${
                isInStock ? 'border-[#2B7145] bg-[#112316]' : 'border-[#6A460A] bg-[#211709]'
              }`}
            >
              <Text className={`text-[10px] font-semibold ${isInStock ? 'text-[#59C47A]' : 'text-[#D0A24E]'}`}>
                {statusCopy[item.status]}
              </Text>
            </View>
          </View>
        </View>

        <View className="gap-3">
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-xl bg-[#0F0F0F]"
            onPress={() => onRemove(item.id)}
            hitSlop={6}
          >
            <Ionicons name="trash-outline" size={17} color="#F05B4F" />
          </Pressable>
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-xl bg-[#C6A96B]"
            onPress={() => onAddToCart(item)}
            hitSlop={6}
          >
            <Ionicons name="cart-outline" size={18} color="#0A0A0A" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
