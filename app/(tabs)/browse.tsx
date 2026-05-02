import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FilterPill } from '../../components/FilterPill';
import { CatalogProduct, ProductGrid } from '../../components/ProductGrid';
import { SearchBar } from '../../components/SearchBar';
import { SortDropdown, SortOption } from '../../components/SortDropdown';

const categories = ['All', '1/7 Scale', '1/8 Scale', 'Nendoroid', 'Figma'];
const brands = ['GSC', 'Alter', 'Max Factory', 'Myethos'];

type AvailabilityFilter = 'INSTOCK' | 'PREORDER' | null;

const products: CatalogProduct[] = [
  {
    id: '1',
    name: 'Rem - Winter Maid',
    brand: 'GSC',
    price: '₱8,900',
    priceValue: 8900,
    status: 'INSTOCK',
    scale: '1/7 Scale',
    category: '1/7 Scale',
    specs: '1/7 Scale · PVC',
  },
  {
    id: '2',
    name: 'Asuna - ALO Ver.',
    brand: 'Alter',
    price: '₱12,500',
    priceValue: 12500,
    status: 'PREORDER',
    scale: '1/8 Scale',
    category: '1/8 Scale',
    specs: '1/8 Scale · PVC',
  },
  {
    id: '3',
    name: 'Mikasa Ackerman',
    brand: 'Max Factory',
    price: '₱9,800',
    priceValue: 9800,
    status: 'INSTOCK',
    scale: '1/7 Scale',
    category: 'Figma',
    specs: 'Figma · ABS/PVC',
  },
  {
    id: '4',
    name: 'Hu Tao - Fantasy Ver.',
    brand: 'Myethos',
    price: '₱16,200',
    priceValue: 16200,
    status: 'PREORDER',
    scale: '1/7 Scale',
    category: '1/7 Scale',
    specs: '1/7 Scale · PVC',
  },
  {
    id: '5',
    name: 'Miku Nakano',
    brand: 'GSC',
    price: '₱7,400',
    priceValue: 7400,
    status: 'INSTOCK',
    scale: 'Nendoroid',
    category: 'Nendoroid',
    specs: 'Nendoroid · ABS/PVC',
  },
  {
    id: '6',
    name: 'Saber Alter Kimono Ver.',
    brand: 'Alter',
    price: '₱18,900',
    priceValue: 18900,
    status: 'PREORDER',
    scale: '1/8 Scale',
    category: '1/8 Scale',
    specs: '1/8 Scale · PVC',
  },
  {
    id: '7',
    name: 'Fischl - Prinzessin',
    brand: 'Myethos',
    price: '₱14,500',
    priceValue: 14500,
    status: 'INSTOCK',
    scale: '1/7 Scale',
    category: '1/7 Scale',
    specs: '1/7 Scale · PVC',
  },
  {
    id: '8',
    name: 'Racing Miku 2025',
    brand: 'Max Factory',
    price: '₱11,200',
    priceValue: 11200,
    status: 'PREORDER',
    scale: 'Figma',
    category: 'Figma',
    specs: 'Figma · Painted ABS',
  },
];

const availabilityLabels: Record<Exclude<AvailabilityFilter, null>, string> = {
  INSTOCK: 'In Stock',
  PREORDER: 'Pre-order',
};

export default function BrowseScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [availability, setAvailability] = useState<AvailabilityFilter>(null);
  const [sort, setSort] = useState<SortOption>('featured');

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const nextProducts = products.filter((product) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [product.name, product.brand, product.scale, product.category].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        );
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesBrand = activeBrand === null || product.brand === activeBrand;
      const matchesAvailability = availability === null || product.status === availability;

      return matchesQuery && matchesCategory && matchesBrand && matchesAvailability;
    });

    if (sort === 'priceAsc') {
      return [...nextProducts].sort((a, b) => a.priceValue - b.priceValue);
    }

    if (sort === 'priceDesc') {
      return [...nextProducts].sort((a, b) => b.priceValue - a.priceValue);
    }

    return nextProducts;
  }, [activeBrand, activeCategory, availability, query, sort]);

  const openProduct = (id: string) => {
    router.push(`./product/${id}` as `./${string}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-28 pt-7"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-semibold text-white">Browse</Text>
          <View className="flex-row items-center gap-3">
            <Pressable className="h-10 w-10 items-center justify-center rounded-full border border-[#222222] bg-[#121212]">
              <Ionicons name="filter-outline" size={18} color="#A1A1A1" />
            </Pressable>
            <Pressable className="h-10 w-10 items-center justify-center rounded-full border border-[#222222] bg-[#121212]">
              <Ionicons name="grid-outline" size={18} color="#A1A1A1" />
            </Pressable>
          </View>
        </View>

        <View className="mt-5">
          <SearchBar value={query} onChangeText={setQuery} placeholder="Search figures, series..." />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4" contentContainerClassName="gap-2 pr-5">
          {categories.map((category) => (
            <FilterPill
              key={category}
              label={category}
              active={activeCategory === category}
              onPress={() => setActiveCategory(category)}
            />
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4" contentContainerClassName="gap-2 pr-5">
          {brands.map((brand) => (
            <FilterPill
              key={brand}
              label={brand}
              active={activeBrand === brand}
              compact
              onPress={() => setActiveBrand(activeBrand === brand ? null : brand)}
            />
          ))}
          <FilterPill
            label="In Stock"
            active={availability === 'INSTOCK'}
            compact
            onPress={() => setAvailability(availability === 'INSTOCK' ? null : 'INSTOCK')}
          />
          <FilterPill
            label="Pre-order"
            active={availability === 'PREORDER'}
            compact
            onPress={() => setAvailability(availability === 'PREORDER' ? null : 'PREORDER')}
          />
          <SortDropdown value={sort} onChange={setSort} />
        </ScrollView>

        <View className="mt-4 flex-row flex-wrap items-center gap-2">
          <Text className="text-xs text-[#777777]">Active filters:</Text>
          {activeBrand ? (
            <FilterPill label={activeBrand} active compact removable onPress={() => setActiveBrand(null)} />
          ) : null}
          {availability ? (
            <FilterPill
              label={availabilityLabels[availability]}
              active
              compact
              removable
              onPress={() => setAvailability(null)}
            />
          ) : null}
          {activeBrand === null && availability === null ? <Text className="text-xs text-[#777777]">None</Text> : null}
        </View>

        <View className="mt-5 flex-row items-center justify-between">
          <Text className="text-sm text-[#A1A1A1]">{filteredProducts.length} results</Text>
          <Text className="text-xs text-[#A1A1A1]">Tap sort to change order</Text>
        </View>

        <View className="mt-4">
          <ProductGrid products={filteredProducts} onProductPress={openProduct} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
