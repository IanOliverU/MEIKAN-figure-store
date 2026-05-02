import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddressCard, CheckoutAddress } from '../../components/AddressCard';
import { CheckoutSummary } from '../../components/CheckoutSummary';
import { PaymentMethod, PaymentOption } from '../../components/PaymentOption';
import { StepIndicator } from '../../components/StepIndicator';

const paymentMethods: PaymentMethod[] = [
  {
    id: 'visa-4291',
    label: 'Visa **** 4291',
    subtitle: 'Expires 09/27',
    type: 'visa',
  },
  {
    id: 'gcash',
    label: 'GCash',
    type: 'gcash',
  },
  {
    id: 'new-card',
    label: 'Add new card',
    type: 'new',
  },
];

const address: CheckoutAddress = {
  name: 'Juan dela Cruz',
  line1: 'Blk 5 Lot 1 Sampaguita St.',
  city: 'San Jose del Monte, Bulacan 3023',
  country: 'Philippines',
};

const checkoutTotals = {
  itemCount: 3,
  itemsTotal: 37600,
  shipping: 850,
  importFee: 1200,
};

export default function CheckoutScreen() {
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const total = checkoutTotals.itemsTotal + checkoutTotals.shipping + checkoutTotals.importFee;

  const handlePlaceOrder = () => {
    console.log('Order placed');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-28 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center">
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={18} color="#A1A1A1" />
          </Pressable>
          <Text className="ml-4 text-xl font-semibold text-white">Checkout</Text>
        </View>

        <View className="mt-6">
          <StepIndicator currentStep={2} />
        </View>

        <View className="mt-7">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Payment method</Text>
          <View className="gap-2.5">
            {paymentMethods.map((method) => (
              <PaymentOption
                key={method.id}
                method={method}
                selected={selectedPayment === method.id}
                onSelect={() => setSelectedPayment(method.id)}
              />
            ))}
          </View>
        </View>

        <View className="mt-6">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Shipping address</Text>
          <AddressCard address={address} />
        </View>

        <View className="mt-6">
          <CheckoutSummary
            itemCount={checkoutTotals.itemCount}
            itemsTotal={checkoutTotals.itemsTotal}
            shipping={checkoutTotals.shipping}
            importFee={checkoutTotals.importFee}
            total={total}
          />
        </View>

        <Pressable
          className="mt-4 h-14 flex-row items-center justify-center gap-2 rounded-2xl bg-[#C6A96B]"
          onPress={handlePlaceOrder}
        >
          <Ionicons name="shield-checkmark-outline" size={18} color="#0A0A0A" />
          <Text className="text-base font-semibold text-[#0A0A0A]">Place Order</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

