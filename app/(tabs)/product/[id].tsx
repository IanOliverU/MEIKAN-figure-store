import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddToCartBar } from '../../../components/AddToCartBar';
import { PriceSection } from '../../../components/PriceSection';
import { ProductDescription } from '../../../components/ProductDescription';
import { ProductGallery } from '../../../components/ProductGallery';
import { ProductInfo, ProductStatus } from '../../../components/ProductInfo';
import { ProductSpecs } from '../../../components/ProductSpecs';

type ProductDetail = {
  id: string;
  name: string;
  brand: string;
  series: string;
  price: string;
  releaseDate: string;
  status: ProductStatus;
  description: string;
  specs: string[];
  images: string[];
};

const product: ProductDetail = {
  id: '1',
  name: 'Rem - Winter Maid Ver.',
  brand: 'Good Smile Company',
  series: 'Re:Zero - Starting Life in Another World',
  price: '₱8,900',
  releaseDate: 'Aug 2025',
  status: 'INSTOCK',
  description:
    'Rem is depicted in an elegant winter maid outfit with fine fabric and snow-like base detailing. Sculpted by Takahashi Tsuyoshi for GSC.',
  specs: ['1/7 Scale', 'PVC + ABS', '~24cm', 'W/ Base'],
  images: ['front', 'angle', 'detail', 'box'],
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleAddToCart = () => {
    console.log('Add to cart', id ?? product.id);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-28 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4 flex-row items-center justify-between">
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color="#A1A1A1" />
          </Pressable>
          <Text className="text-base font-medium text-white">Figure Detail</Text>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full border border-[#222222] bg-[#121212]">
            <Ionicons name="share-social-outline" size={18} color="#A1A1A1" />
          </Pressable>
        </View>

        <ProductGallery images={product.images} />

        <View className="mt-6">
          <ProductInfo brand={product.brand} name={product.name} series={product.series} status={product.status} />
        </View>

        <View className="mt-5">
          <ProductSpecs specs={product.specs} />
        </View>

        <View className="mt-5">
          <ProductDescription description={product.description} />
        </View>

        <View className="mt-6">
          <PriceSection price={product.price} releaseDate={product.releaseDate} />
        </View>

        <View className="mt-6">
          <AddToCartBar onAddToCart={handleAddToCart} />
        </View>

        <View className="mt-6 flex-row gap-3 rounded-2xl border border-[#222222] bg-[#121212] p-4">
          <Ionicons name="shield-checkmark-outline" size={18} color="#C6A96B" />
          <Text className="flex-1 text-xs leading-5 text-[#A1A1A1]">
            Authentic product. Shipped directly from Japan with tamper-proof seal.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
