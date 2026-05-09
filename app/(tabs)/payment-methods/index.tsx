import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PaymentCard } from '../../../components/payment/PaymentCard';
import { usePaymentMethods } from '../../../components/payment/PaymentMethodsContext';
import { PaymentSection } from '../../../components/payment/PaymentSection';
import { SecurityNotice } from '../../../components/payment/SecurityNotice';
import { WalletCard, WalletProvider } from '../../../components/payment/WalletCard';

const ADD_CARD_ROUTE = '/payment-methods/add' as Href;

function cardDetailRoute(cardId: string) {
  return `/payment-methods/${cardId}` as Href;
}

function walletRoute(provider: WalletProvider) {
  return `/payment-methods/wallet/${provider.toLowerCase()}` as Href;
}

export default function PaymentMethodsScreen() {
  const { cards, wallets } = usePaymentMethods();

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
          <Text className="ml-4 text-xl font-semibold text-white">Payment Methods</Text>
        </View>

        <View className="mt-8">
          <PaymentSection title="Saved Cards">
            {cards.map((card) => (
              <PaymentCard key={card.id} card={card} onPress={() => router.push(cardDetailRoute(card.id))} />
            ))}
          </PaymentSection>
        </View>

        <View className="mt-7">
          <PaymentSection title="E-Wallets">
            {wallets.map((wallet) => (
              <WalletCard
                key={wallet.id}
                wallet={wallet}
                onPress={() => router.push(walletRoute(wallet.provider))}
                onLink={() => router.push(walletRoute(wallet.provider))}
              />
            ))}
          </PaymentSection>
        </View>

        <Pressable
          className="mt-8 h-12 flex-row items-center justify-center rounded-xl bg-[#C6A96B] px-5"
          onPress={() => router.push(ADD_CARD_ROUTE)}
          style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}
        >
          <Ionicons name="add" size={18} color="#0A0A0A" />
          <Text className="ml-2 text-base font-semibold text-[#0A0A0A]">Add new card</Text>
        </Pressable>

        <View className="mt-4">
          <SecurityNotice />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
