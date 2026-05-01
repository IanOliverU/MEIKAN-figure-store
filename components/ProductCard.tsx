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
};

type ProductCardProps = {
  product: Product;
  className?: string;
};

const statusLabel = {
  PREORDER: 'PRE-ORDER',
  INSTOCK: 'IN STOCK',
};

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const isPreorder = product.status === 'PREORDER';

  return (
    <Pressable className={`overflow-hidden rounded-2xl border border-[#222222] bg-[#121212] ${className}`}>
      <View className="relative h-44 items-center justify-center bg-[#1F1F1F]">
        <View className="absolute left-3 top-3 rounded-md border border-[#C6A96B] px-2 py-1">
          <Text className="text-[10px] font-semibold text-[#C6A96B]">{statusLabel[product.status]}</Text>
        </View>
        <View className="absolute right-3 top-3 h-8 w-8 items-center justify-center rounded-full bg-[#171717]">
          <Ionicons name={isPreorder ? 'heart-outline' : 'heart'} size={16} color={isPreorder ? '#A1A1A1' : '#C6A96B'} />
        </View>
        <Ionicons name="body-outline" size={62} color={isPreorder ? '#5A503A' : '#5F5F5F'} />
      </View>
      <View className="min-h-28 px-3 pb-4 pt-3">
        <Text className="text-[10px] font-semibold uppercase tracking-wide text-[#C6A96B]" numberOfLines={1}>
          {product.brand}
        </Text>
        <Text className="mt-1 min-h-10 text-sm font-semibold leading-5 text-white" numberOfLines={2}>
          {product.name}
        </Text>
        <Text className="mt-2 text-base font-semibold text-white">{product.price}</Text>
        {product.specs ? (
          <Text className="mt-1 text-[11px] text-[#777777]" numberOfLines={1}>
            {product.specs}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
