import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryFilter } from '../../components/CategoryFilter';
import { Header } from '../../components/Header';
import { ProductCard, Product } from '../../components/ProductCard';
import { SearchBar } from '../../components/SearchBar';
import { SectionHeader } from '../../components/SectionHeader';

const categories = ['All', 'GSC', 'Alter', 'Max Factory', 'Myethos'];

const products: Product[] = [
  {
    id: '1',
    name: 'Rem - Winter Maid',
    brand: 'Good Smile Co.',
    price: '₱8,900',
    status: 'PREORDER',
    specs: '1/7 Scale · PVC',
  },
  {
    id: '2',
    name: 'Asuna - ALO Ver.',
    brand: 'Alter',
    price: '₱12,500',
    status: 'PREORDER',
    specs: '1/8 Scale · ABS/PVC',
  },
  {
    id: '3',
    name: 'Hu Tao - Fragrance in Thaw',
    brand: 'Myethos',
    price: '₱16,200',
    status: 'PREORDER',
    specs: '1/7 Scale · PVC',
  },
  {
    id: '4',
    name: 'Miku Nakano',
    brand: 'Max Factory',
    price: '₱9,800',
    status: 'INSTOCK',
    specs: '1/7 Scale · PVC',
  },
  {
    id: '5',
    name: 'Fischl - Prinzessin',
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

const newArrivals = products.filter((product) => product.status === 'PREORDER');
const inStock = products.filter((product) => product.status === 'INSTOCK');

export default function HomeScreen() {
  const router = useRouter();

  const openProduct = (id: string) => {
    router.push(`./product/${id}` as `./${string}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-28 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <View className="mt-5">
          <SearchBar />
        </View>
        <View className="mt-5">
          <CategoryFilter categories={categories} activeCategory="All" />
        </View>

        <View className="mt-7">
          <SectionHeader title="New Arrivals" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-3 pr-5"
          >
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} className="w-40" onPress={() => openProduct(product.id)} />
            ))}
          </ScrollView>
        </View>

        <View className="mt-8">
          <SectionHeader title="In Stock" />
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {inStock.map((product) => (
              <ProductCard key={product.id} product={product} className="w-[48%]" onPress={() => openProduct(product.id)} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
