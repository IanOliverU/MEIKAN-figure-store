import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAddresses } from '../../components/addresses/AddressContext';
import { CartLineItem } from '../../components/CartItemCard';
import { CheckoutAddressCard, CheckoutShippingAddress } from '../../components/checkout/CheckoutAddressCard';
import { CheckoutSummary } from '../../components/checkout/CheckoutSummary';
import { CheckoutPaymentMethod, PaymentMethodOption } from '../../components/checkout/PaymentMethodOption';
import { PlaceOrderButton } from '../../components/checkout/PlaceOrderButton';
import { StepIndicator } from '../../components/StepIndicator';

const PAYMENT_METHODS_ROUTE = '/payment-methods/add' as Href;
const ADDRESSES_ROUTE = '/addresses' as Href;
const ORDER_CONFIRMATION_ROUTE = '/order-confirmation' as Href;

const paymentMethods: CheckoutPaymentMethod[] = [
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

const checkoutItems: CartLineItem[] = [
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

const checkoutTotals = {
  shipping: 850,
  importFee: 1200,
};

function formatCheckoutAddress(address: ReturnType<typeof useAddresses>['addresses'][number]): CheckoutShippingAddress {
  return {
    name: address.recipientName,
    line1: `${address.street}, ${address.barangay}`,
    line2: `${address.city}, ${address.province} ${address.postalCode}`,
    country: address.country,
    phone: address.phone,
  };
}

function createOrderId() {
  return `MKN-${Math.floor(10000 + Math.random() * 90000)}`;
}

export default function CheckoutScreen() {
  const { addresses } = useAddresses();
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemCount = checkoutItems.reduce((total, item) => total + item.quantity, 0);
  const itemsTotal = useMemo(() => checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0), []);
  const total = itemsTotal + checkoutTotals.shipping + checkoutTotals.importFee;
  const defaultAddress = addresses.find((item) => item.isDefault) ?? addresses[0] ?? null;
  const shippingAddress = defaultAddress ? formatCheckoutAddress(defaultAddress) : null;
  const selectedPayment = paymentMethods.find((method) => method.id === selectedPaymentId) ?? null;

  const handlePaymentSelect = (method: CheckoutPaymentMethod) => {
    if (method.type === 'new') {
      router.push(PAYMENT_METHODS_ROUTE);
      return;
    }

    setSelectedPaymentId(method.id);
    setError(null);
  };

  const handlePlaceOrder = () => {
    if (placingOrder) {
      return;
    }

    if (checkoutItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    if (!selectedPayment) {
      setError('Please select a payment method.');
      return;
    }

    if (!shippingAddress) {
      setError('Please add a shipping address.');
      return;
    }

    setError(null);
    setPlacingOrder(true);

    setTimeout(() => {
      const order = {
        orderId: createOrderId(),
        date: new Date().toISOString(),
        items: checkoutItems,
        itemCount,
        subtotal: itemsTotal,
        shipping: checkoutTotals.shipping,
        importFee: checkoutTotals.importFee,
        total,
        paymentMethod: {
          id: selectedPayment.id,
          label: selectedPayment.label,
          type: selectedPayment.type,
        },
        shippingAddress,
        status: 'Processing',
      };

      console.log('Mock order generated', order);
      setPlacingOrder(false);
      router.replace({
        pathname: ORDER_CONFIRMATION_ROUTE,
        params: { order: encodeURIComponent(JSON.stringify(order)) },
      } as never);
    }, 1200);
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
            style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
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
              <PaymentMethodOption
                key={method.id}
                method={method}
                selected={selectedPaymentId === method.id}
                onSelect={() => handlePaymentSelect(method)}
              />
            ))}
          </View>
        </View>

        <View className="mt-6">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Shipping address</Text>
          <CheckoutAddressCard address={shippingAddress} onEdit={() => router.push(ADDRESSES_ROUTE)} />
        </View>

        <View className="mt-6">
          <CheckoutSummary
            itemCount={itemCount}
            itemsTotal={itemsTotal}
            shipping={checkoutTotals.shipping}
            importFee={checkoutTotals.importFee}
            total={total}
          />
        </View>

        {error ? (
          <View className="mt-4 flex-row items-center rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <Ionicons name="alert-circle-outline" size={18} color="#FCA5A5" />
            <Text className="ml-2 flex-1 text-sm text-red-200">{error}</Text>
          </View>
        ) : null}

        <PlaceOrderButton loading={placingOrder} onPress={handlePlaceOrder} />
      </ScrollView>
    </SafeAreaView>
  );
}
