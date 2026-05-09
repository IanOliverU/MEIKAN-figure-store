import { Ionicons } from '@expo/vector-icons';
import { Href, router, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { paymentBrandStyles } from '../../../components/payment/PaymentCard';
import { usePaymentMethods } from '../../../components/payment/PaymentMethodsContext';
import { PaymentSection } from '../../../components/payment/PaymentSection';
import { SecurityNotice } from '../../../components/payment/SecurityNotice';

const PAYMENT_METHODS_ROUTE = '/payment-methods' as Href;

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="border-b border-[#222222] py-3 last:border-b-0">
      <Text className="text-xs font-semibold uppercase tracking-wider text-[#666666]">{label}</Text>
      <Text className="mt-1 text-sm font-semibold leading-5 text-white">{value}</Text>
    </View>
  );
}

export default function PaymentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cards, removeCard, setDefaultCard } = usePaymentMethods();
  const card = cards.find((item) => item.id === id);

  const handleRemove = () => {
    if (!card) {
      return;
    }

    Alert.alert('Remove this payment method?', `${card.type} ending in ${card.last4} will be removed from this mock wallet.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          removeCard(card.id);
          router.replace(PAYMENT_METHODS_ROUTE);
        },
      },
    ]);
  };

  if (!card) {
    return (
      <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
        <View className="flex-1 items-center justify-center px-7">
          <View className="h-20 w-20 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#171717]">
            <Ionicons name="card-outline" size={34} color="#5F5F5F" />
          </View>
          <Text className="mt-6 text-xl font-semibold text-white">Payment method not found</Text>
          <Pressable
            className="mt-8 h-12 flex-row items-center justify-center rounded-xl bg-[#C6A96B] px-7"
            onPress={() => router.replace(PAYMENT_METHODS_ROUTE)}
          >
            <Text className="text-sm font-semibold text-[#0A0A0A]">Back to Payment Methods</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const brand = paymentBrandStyles[card.type];

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
          <Text className="ml-4 text-xl font-semibold text-white">Payment Details</Text>
        </View>

        <View className={`mt-8 rounded-2xl border bg-[#121212] p-5 ${card.isDefault ? 'border-[#5F5131]' : 'border-[#222222]'}`}>
          <View className="flex-row items-center">
            <View className={`h-12 w-16 items-center justify-center rounded-xl border ${brand.className}`}>
              <Text className={`text-sm font-bold ${brand.textClassName}`}>{brand.label}</Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-lg font-semibold text-white">
                {card.type} {'\u2022\u2022\u2022\u2022'} {card.last4}
              </Text>
              <Text className="mt-1 text-sm text-[#A1A1A1]">Expires {card.expiry}</Text>
            </View>
            {card.isDefault ? (
              <View className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1">
                <Text className="text-[10px] font-semibold text-emerald-300">Default</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View className="mt-7">
          <PaymentSection title="Billing Information">
            <View className="rounded-2xl border border-[#222222] bg-[#121212] px-4">
              <DetailRow label="Name" value={card.cardholderName} />
              <DetailRow label="Billing Address" value={card.billingAddress} />
              <DetailRow label="Country" value={card.country} />
            </View>
          </PaymentSection>
        </View>

        <View className="mt-7">
          <PaymentSection title="Card Settings">
            <Pressable
              className={`min-h-12 flex-row items-center rounded-2xl border px-4 py-4 ${
                card.isDefault ? 'border-[#5F5131] bg-[#1A1710]' : 'border-[#222222] bg-[#121212]'
              }`}
              onPress={() => setDefaultCard(card.id)}
              disabled={card.isDefault}
              style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
            >
              <Ionicons name="star-outline" size={18} color="#C6A96B" />
              <Text className="ml-3 flex-1 text-base font-semibold text-white">
                {card.isDefault ? 'Default payment method' : 'Set as Default'}
              </Text>
              {card.isDefault ? <Ionicons name="checkmark-circle" size={18} color="#4ADE80" /> : null}
            </Pressable>

            <Pressable
              className="min-h-12 flex-row items-center rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4"
              onPress={handleRemove}
              style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
            >
              <Ionicons name="trash-outline" size={18} color="#F87171" />
              <Text className="ml-3 flex-1 text-base font-semibold text-red-300">Remove Card</Text>
            </Pressable>
          </PaymentSection>
        </View>

        <View className="mt-5">
          <SecurityNotice />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
