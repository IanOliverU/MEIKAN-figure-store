import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PaymentCard, SavedPaymentCard } from '../../components/payment/PaymentCard';
import { PaymentSection } from '../../components/payment/PaymentSection';
import { SecurityNotice } from '../../components/payment/SecurityNotice';
import { SavedWallet, WalletCard } from '../../components/payment/WalletCard';

const savedCards: SavedPaymentCard[] = [
  {
    id: 'visa-4291',
    type: 'Visa',
    last4: '4291',
    expiry: '09/27',
    isDefault: true,
  },
  {
    id: 'mastercard-8414',
    type: 'Mastercard',
    last4: '8414',
    expiry: '03/26',
    isDefault: false,
  },
];

const wallets: SavedWallet[] = [
  {
    id: 'gcash',
    provider: 'GCash',
    linked: true,
    number: '+63 917 ••• 3427',
  },
  {
    id: 'maya',
    provider: 'Maya',
    linked: false,
  },
];

export default function PaymentMethodsScreen() {
  const handleCardPress = (cardId: string) => {
    console.log(`Open payment detail placeholder: ${cardId}`);
  };

  const handleWalletPress = (walletId: string) => {
    console.log(`Open wallet placeholder: ${walletId}`);
  };

  const handleLinkWallet = (walletId: string) => {
    console.log(`Link wallet: ${walletId}`);
  };

  const handleAddCard = () => {
    console.log('Navigate to add card placeholder');
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
          <Text className="ml-4 text-xl font-semibold text-white">Payment Methods</Text>
        </View>

        <View className="mt-8">
          <PaymentSection title="Saved Cards">
            {savedCards.map((card) => (
              <PaymentCard key={card.id} card={card} onPress={() => handleCardPress(card.id)} />
            ))}
          </PaymentSection>
        </View>

        <View className="mt-7">
          <PaymentSection title="E-Wallets">
            {wallets.map((wallet) => (
              <WalletCard
                key={wallet.id}
                wallet={wallet}
                onPress={() => handleWalletPress(wallet.id)}
                onLink={() => handleLinkWallet(wallet.id)}
              />
            ))}
          </PaymentSection>
        </View>

        <Pressable
          className="mt-8 h-12 flex-row items-center justify-center rounded-xl bg-[#C6A96B] px-5"
          onPress={handleAddCard}
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
