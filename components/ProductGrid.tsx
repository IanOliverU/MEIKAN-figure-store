import { Text, View } from 'react-native';

import { Product, ProductCard } from './ProductCard';

export type CatalogProduct = Product & {
  priceValue: number;
  scale: string;
  category: string;
};

type ProductGridProps = {
  products: CatalogProduct[];
  onProductPress: (id: string) => void;
};

export function ProductGrid({ products, onProductPress }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <View className="items-center justify-center rounded-2xl border border-[#222222] bg-[#121212] px-5 py-14">
        <Text className="text-lg font-semibold text-white">No figures found</Text>
        <Text className="mt-2 text-sm text-[#A1A1A1]">Try adjusting filters</Text>
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap justify-between gap-y-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} className="w-[48%]" onPress={() => onProductPress(product.id)} />
      ))}
    </View>
  );
}
