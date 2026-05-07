import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: string;
  status: 'PREORDER' | 'INSTOCK';
  image?: string;
  specs?: string;
  originalPrice?: string;
  discount?: string;
};

type ProductCardProps = {
  product: Product;
  className?: string;
  onPress?: () => void;
  showFavorite?: boolean;
};

const statusLabel = {
  PREORDER: 'Pre-order',
  INSTOCK: 'In Stock',
};

export function ProductCard({ product, className = '', onPress, showFavorite = true }: ProductCardProps) {
  const isPreorder = product.status === 'PREORDER';
  const hasDiscount = Boolean(product.discount);

  return (
    <Pressable
      className={`overflow-hidden rounded-2xl border border-[#222222] bg-[#121212] ${className}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.88 : 1, transform: [{ scale: pressed ? 0.985 : 1 }] })}
    >
      <View className="relative h-44 items-center justify-center bg-[#1F1F1F]">
        <View
          className={`absolute left-3 top-3 rounded-md border px-2 py-1 ${
            hasDiscount
              ? 'border-[#963318] bg-[#2A120D]'
              : isPreorder
                ? 'border-[#6A460A] bg-[#211709]'
                : 'border-[#2B7145] bg-[#112316]'
          }`}
        >
          <Text
            className={`text-[10px] font-semibold ${
              hasDiscount ? 'text-[#F06B3B]' : isPreorder ? 'text-[#D0A24E]' : 'text-[#59C47A]'
            }`}
          >
            {product.discount ?? statusLabel[product.status]}
          </Text>
        </View>
        {showFavorite ? (
          <View className="absolute right-3 top-3 h-8 w-8 items-center justify-center rounded-full bg-[#171717]">
            <Ionicons
              name={isPreorder ? 'heart-outline' : 'heart'}
              size={16}
              color={isPreorder ? '#A1A1A1' : '#C6A96B'}
            />
          </View>
        ) : null}
        <Ionicons name="body-outline" size={62} color={isPreorder ? '#5A503A' : '#5F5F5F'} />
      </View>
      <View className="min-h-28 px-3 pb-4 pt-3">
        <Text className="text-[10px] font-semibold uppercase tracking-wide text-[#C6A96B]" numberOfLines={1}>
          {product.brand}
        </Text>
        <Text className="mt-1 min-h-10 text-sm font-semibold leading-5 text-white" numberOfLines={2}>
          {product.name}
        </Text>
        <View className="mt-2 flex-row flex-wrap items-baseline gap-x-2">
          <Text className={`text-base font-semibold ${hasDiscount ? 'text-[#F06B3B]' : 'text-white'}`}>
            {product.price}
          </Text>
          {product.originalPrice ? (
            <Text className="text-xs text-[#646464] line-through">{product.originalPrice}</Text>
          ) : null}
        </View>
        {product.specs ? (
          <Text className="mt-1 text-[11px] text-[#777777]" numberOfLines={1}>
            {product.specs}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
