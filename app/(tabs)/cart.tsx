import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CartItemCard, CartLineItem } from '../../components/CartItemCard';
import { CartSummary } from '../../components/CartSummary';
import { EmptyCart } from '../../components/EmptyCart';

const SHIPPING_FEE = 850;
const IMPORT_FEE = 1200;

const initialItems: CartLineItem[] = [
  {
    id: '1',
    name: 'Rem - Winter Maid Ver.',
    brand: 'GSC',
    price: 8900,
    quantity: 1,
    specs: '1/7 Scale',
  },
  {
    id: '2',
    name: 'Asuna - ALO Ver.',
    brand: 'Alter',
    price: 12500,
    quantity: 1,
    specs: '1/8 Scale',
  },
  {
    id: '3',
    name: 'Hu Tao - Fantasy Ver.',
    brand: 'Myethos',
    price: 16200,
    quantity: 1,
    specs: '1/7 Scale',
  },
];

export default function CartScreen() {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items]);
  const total = items.length > 0 ? subtotal + SHIPPING_FEE + IMPORT_FEE : 0;

  const updateQuantity = (id: string, nextQuantity: number) => {
    setItems((currentItems) => {
      if (nextQuantity <= 0) {
        return currentItems.filter((item) => item.id !== id);
      }

      return currentItems.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item));
    });
  };

  const handleCheckout = () => {
    router.push('./checkout' as `./${string}`);
  };

  const handleBrowse = () => {
    router.push('/browse');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      {items.length === 0 ? (
        <EmptyCart onBrowse={handleBrowse} />
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pb-28 pt-7"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text className="text-3xl font-semibold text-white">My Cart</Text>
            <Text className="mt-2 text-sm text-[#A1A1A1]">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </Text>
          </View>

          <View className="mt-8">
            {items.map((item, index) => (
              <CartItemCard
                key={item.id}
                item={item}
                showDivider={index < items.length - 1}
                onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
              />
            ))}
          </View>

          <View className="mt-6">
            <CartSummary subtotal={subtotal} shipping={SHIPPING_FEE} importFee={IMPORT_FEE} total={total} />
          </View>

          <Pressable className="mt-4 h-14 flex-row items-center justify-center gap-2 rounded-2xl bg-[#C6A96B]" onPress={handleCheckout}>
            <Ionicons name="card-outline" size={18} color="#0A0A0A" />
            <Text className="text-base font-semibold text-[#0A0A0A]">Proceed to Checkout</Text>
          </Pressable>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
