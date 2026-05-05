import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WishlistActions } from '../../components/WishlistActions';
import { WishlistEmpty } from '../../components/WishlistEmpty';
import { WishlistFilter, WishlistFilterValue } from '../../components/WishlistFilter';
import { WishlistItem, WishlistItemCard } from '../../components/WishlistItemCard';

const mockWishlist: WishlistItem[] = [
  {
    id: '1',
    name: 'Rem — Winter Maid Ver.',
    brand: 'GSC',
    price: '₱8,900',
    status: 'INSTOCK',
    specs: '1/7 Scale · PVC',
  },
  {
    id: '3',
    name: 'Hu Tao — Fantasy Ver.',
    brand: 'Myethos',
    price: '₱16,200',
    status: 'PREORDER',
    specs: '1/7 Scale · PVC',
  },
  {
    id: '2',
    name: 'Asuna — ALO Ver.',
    brand: 'Alter',
    price: '₱10,000',
    originalPrice: '₱12,500',
    discount: '-20%',
    status: 'INSTOCK',
    specs: '1/8 Scale · PVC',
  },
  {
    id: '5',
    name: 'Fischl — Prinzessin Ver.',
    brand: 'Apex',
    price: '₱10,150',
    originalPrice: '₱14,500',
    discount: '-30%',
    status: 'INSTOCK',
    specs: '1/7 Scale · PVC',
  },
  {
    id: '6',
    name: 'Saber Alter Kimono Ver.',
    brand: 'Aniplex',
    price: '₱18,900',
    status: 'PREORDER',
    specs: '1/8 Scale · PVC',
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
    id: '7',
    name: 'Miku Nakano Date Style',
    brand: 'GSC',
    price: '₱7,900',
    status: 'INSTOCK',
    specs: '1/7 Scale · PVC',
  },
];

export default function WishlistScreen() {
  const router = useRouter();
  const [items, setItems] = useState(mockWishlist);
  const [activeFilter, setActiveFilter] = useState<WishlistFilterValue>('All');

  const savedLabel = items.length === 0 ? '0 saved' : `${items.length} saved figures`;
  const inStockItems = items.filter((item) => item.status === 'INSTOCK');

  const filteredItems = useMemo(() => {
    if (activeFilter === 'In Stock') {
      return items.filter((item) => item.status === 'INSTOCK');
    }

    if (activeFilter === 'Pre-order') {
      return items.filter((item) => item.status === 'PREORDER');
    }

    if (activeFilter === 'On Sale') {
      return items.filter((item) => Boolean(item.discount));
    }

    return items;
  }, [activeFilter, items]);

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const addToCart = (item: WishlistItem) => {
    console.log('Add wishlist item to cart', item.id);
  };

  const addAllInStock = () => {
    inStockItems.forEach((item) => console.log('Add in-stock wishlist item to cart', item.id));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <View className="flex-1 px-5 pt-6">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-2xl font-semibold text-white">Wishlist</Text>
            {items.length > 0 ? <Text className="mt-1 text-xs text-[#777777]">{savedLabel}</Text> : null}
          </View>

          {items.length > 0 ? (
            <Pressable className="h-10 flex-row items-center rounded-xl border border-[#2A2A2A] bg-[#151515] px-4">
              <Ionicons name="filter-outline" size={14} color="#777777" />
              <Text className="ml-2 text-sm font-medium text-[#A1A1A1]">Sort</Text>
            </Pressable>
          ) : (
            <Text className="mt-1 text-xs text-[#666666]">{savedLabel}</Text>
          )}
        </View>

        {items.length === 0 ? (
          <WishlistEmpty onBrowse={() => router.push('./browse')} />
        ) : (
          <ScrollView
            className="mt-5 flex-1"
            contentContainerClassName="pb-28"
            showsVerticalScrollIndicator={false}
          >
            <WishlistFilter activeFilter={activeFilter} onChange={setActiveFilter} />

            <View className="mt-4 gap-3">
              {filteredItems.map((item) => (
                <WishlistItemCard key={item.id} item={item} onRemove={removeItem} onAddToCart={addToCart} />
              ))}
            </View>

            <View className="mt-4">
              <WishlistActions disabled={inStockItems.length === 0} onAddAllInStock={addAllInStock} />
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
