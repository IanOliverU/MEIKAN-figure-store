import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand, BrandScroller } from '../../components/BrandScroller';
import { FlashSaleBanner } from '../../components/FlashSaleBanner';
import { Header } from '../../components/Header';
import { HeroCarousel, HeroSlide } from '../../components/HeroCarousel';
import { InfoStrip } from '../../components/InfoStrip';
import { Product, ProductCard } from '../../components/ProductCard';
import { PromoBanner } from '../../components/PromoBanner';
import { SectionHeader } from '../../components/SectionHeader';

const heroSlides: HeroSlide[] = [
  {
    id: 'hero-rem',
    label: 'New Arrival',
    name: 'Rem Winter Maid',
    brandScale: 'Good Smile Co. · 1/7 Scale',
    productId: '1',
    tint: '#5A503A',
  },
  {
    id: 'hero-hutao',
    label: 'Limited Drop',
    name: 'Hu Tao Fantasy',
    brandScale: 'Myethos · 1/7 Scale',
    productId: '3',
    tint: '#6A4636',
  },
  {
    id: 'hero-fischl',
    label: 'Collector Pick',
    name: 'Fischl Prinzessin',
    brandScale: 'Apex · 1/7 Scale',
    productId: '5',
    tint: '#4B4536',
  },
];

const brands: Brand[] = [
  { id: 'gsc', name: 'GSC', icon: 'star-outline', active: true },
  { id: 'alter', name: 'Alter', icon: 'add-circle-outline' },
  { id: 'max-factory', name: 'Max Factory', icon: 'cube-outline' },
  { id: 'myethos', name: 'Myethos', icon: 'layers-outline' },
  { id: 'apex', name: 'Apex', icon: 'sparkles-outline' },
];

const saleProducts: Product[] = [
  {
    id: '2',
    name: 'Asuna ALO Ver.',
    brand: 'Alter',
    price: '₱10,000',
    originalPrice: '₱12,500',
    discount: '-20%',
    status: 'PREORDER',
    specs: '1/8 Scale · ABS/PVC',
  },
  {
    id: '4',
    name: 'Mikasa Ackerman',
    brand: 'Max Factory',
    price: '₱8,330',
    originalPrice: '₱9,800',
    discount: '-15%',
    status: 'INSTOCK',
    specs: '1/7 Scale · PVC',
  },
  {
    id: '5',
    name: 'Fischl Prinzessin',
    brand: 'Apex',
    price: '₱10,150',
    originalPrice: '₱14,500',
    discount: '-30%',
    status: 'INSTOCK',
    specs: '1/7 Scale · PVC',
  },
];

const newArrivals: Product[] = [
  {
    id: '1',
    name: 'Rem Winter Maid',
    brand: 'GSC',
    price: '₱8,900',
    status: 'INSTOCK',
    specs: '1/7 Scale · PVC',
  },
  {
    id: '3',
    name: 'Hu Tao Fantasy',
    brand: 'Myethos',
    price: '₱16,200',
    status: 'PREORDER',
    specs: '1/7 Scale · PVC',
  },
  {
    id: '5',
    name: 'Fischl Prinzessin',
    brand: 'Apex',
    price: '₱14,500',
    status: 'INSTOCK',
    specs: '1/7 Scale · PVC',
  },
  {
    id: '6',
    name: 'Saber Alter Kimono Ver.',
    brand: 'Aniplex',
    price: '₱18,900',
    status: 'INSTOCK',
    specs: '1/8 Scale · PVC',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const openProduct = (id: string) => {
    router.push(`./product/${id}` as `./${string}`);
  };

  const logBrandFilter = (brand: Brand) => {
    console.log('Browse brand filter', brand.id);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-28 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <View className="mt-7">
          <HeroCarousel slides={heroSlides} onShopNow={openProduct} />
        </View>

        <View className="mt-6">
          <FlashSaleBanner
            title="Flash Sale — Up to 30% off"
            countdown="Ends in 05:42:18"
            onPress={() => console.log('View flash sale')}
          />
        </View>

        <View className="mt-7">
          <BrandScroller brands={brands} onBrandPress={logBrandFilter} />
        </View>

        <View className="mt-8">
          <SectionHeader
            title="On Sale"
            badge={`${saleProducts.length} deals`}
            onSeeAll={() => console.log('See all sale products')}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-4 pr-5">
            {saleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="w-44"
                showFavorite={false}
                onPress={() => openProduct(product.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View className="mt-7">
          <PromoBanner
            title="GSC Summer 2025 Pre-order Lineup"
            subtitle="Closes Jun 30 · 8 figures"
            onPress={() => console.log('Open preorder lineup')}
          />
        </View>

        <View className="mt-8">
          <SectionHeader title="New Arrivals" onSeeAll={() => console.log('See all new arrivals')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-4 pr-5">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="w-44"
                showFavorite={false}
                onPress={() => openProduct(product.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View className="mt-7">
          <InfoStrip message="Free JP shipping on orders over ₱5,000. Estimated PH delivery 7–14 days." />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
