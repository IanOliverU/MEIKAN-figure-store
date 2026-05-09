import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export type OrderThumbnailItem = {
  id: string;
  image: keyof typeof Ionicons.glyphMap;
  name: string;
  brand: string;
  accent?: string;
};

type OrderThumbnailStackProps = {
  items: OrderThumbnailItem[];
};

export function OrderThumbnailStack({ items }: OrderThumbnailStackProps) {
  const visibleItems = items.slice(0, 3);
  const extraCount = Math.max(items.length - visibleItems.length, 0);

  return (
    <View className="h-[58px] w-[104px] flex-row items-center">
      {visibleItems.map((item, index) => (
        <View
          key={item.id}
          className="h-[54px] w-[54px] items-center justify-center rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A]"
          style={{
            marginLeft: index === 0 ? 0 : -25,
            zIndex: visibleItems.length - index,
          }}
        >
          <View className="absolute inset-0 rounded-2xl opacity-20" style={{ backgroundColor: item.accent ?? '#C6A96B' }} />
          <Ionicons name={item.image} size={24} color={item.accent ?? '#C6A96B'} />
        </View>
      ))}
      {extraCount > 0 ? (
        <View
          className="h-[54px] w-[54px] items-center justify-center rounded-2xl border border-[#2A2A2A] bg-[#161616]"
          style={{ marginLeft: -25, zIndex: 0 }}
        >
          <Text className="text-xs font-semibold text-[#C6A96B]">+{extraCount}</Text>
        </View>
      ) : null}
    </View>
  );
}
