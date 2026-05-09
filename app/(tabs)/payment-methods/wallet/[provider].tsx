import { Ionicons } from '@expo/vector-icons';
import { Href, router, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePaymentMethods } from '../../../../components/payment/PaymentMethodsContext';
import { PaymentSection } from '../../../../components/payment/PaymentSection';
import { SecurityNotice } from '../../../../components/payment/SecurityNotice';
import { WalletProvider } from '../../../../components/payment/WalletCard';

const PAYMENT_METHODS_ROUTE = '/payment-methods' as Href;

const providerNames: Record<string, WalletProvider> = {
  gcash: 'GCash',
  maya: 'Maya',
};

const providerStyles = {
  GCash: {
    icon: 'phone-portrait-outline' as const,
    className: 'bg-blue-500/20 border-blue-400/30',
    iconColor: '#60A5FA',
  },
  Maya: {
    icon: 'wallet-outline' as const,
    className: 'bg-violet-500/20 border-violet-400/30',
    iconColor: '#A78BFA',
  },
};

export default function WalletDetailScreen() {
  const { provider } = useLocalSearchParams<{ provider: string }>();
  const normalizedProvider = providerNames[(provider ?? '').toLowerCase()];
  const { wallets, linkWallet, unlinkWallet } = usePaymentMethods();
  const wallet = wallets.find((item) => item.provider === normalizedProvider);

  const handleConnect = () => {
    if (!normalizedProvider) {
      return;
    }

    linkWallet(normalizedProvider);
    router.replace(PAYMENT_METHODS_ROUTE);
  };

  const handleUnlink = () => {
    if (!wallet) {
      return;
    }

    Alert.alert(`Unlink ${wallet.provider}?`, 'This mock wallet can be linked again anytime from Payment Methods.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Unlink',
        style: 'destructive',
        onPress: () => {
          unlinkWallet(wallet.provider);
          router.replace(PAYMENT_METHODS_ROUTE);
        },
      },
    ]);
  };

  if (!wallet || !normalizedProvider) {
    return (
      <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
        <View className="flex-1 items-center justify-center px-7">
          <View className="h-20 w-20 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#171717]">
            <Ionicons name="wallet-outline" size={34} color="#5F5F5F" />
          </View>
          <Text className="mt-6 text-xl font-semibold text-white">Wallet not found</Text>
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

  const style = providerStyles[wallet.provider];

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
          <Text className="ml-4 text-xl font-semibold text-white">{wallet.linked ? 'Wallet Details' : 'Connect Wallet'}</Text>
        </View>

        <View className="mt-8 rounded-2xl border border-[#222222] bg-[#121212] p-5">
          <View className="flex-row items-center">
            <View className={`h-12 w-12 items-center justify-center rounded-xl border ${style.className}`}>
              <Ionicons name={style.icon} size={22} color={style.iconColor} />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-lg font-semibold text-white">{wallet.provider}</Text>
              <Text className="mt-1 text-sm text-[#A1A1A1]">{wallet.linked ? wallet.number : 'Ready to link'}</Text>
            </View>
            <View
              className={`rounded-full border px-2.5 py-1 ${
                wallet.linked ? 'border-emerald-500/25 bg-emerald-500/10' : 'border-[#333333] bg-[#1A1A1A]'
              }`}
            >
              <Text className={`text-[10px] font-semibold ${wallet.linked ? 'text-emerald-300' : 'text-[#A1A1A1]'}`}>
                {wallet.linked ? 'Linked' : 'Unlinked'}
              </Text>
            </View>
          </View>
        </View>

        {wallet.linked ? (
          <View className="mt-7">
            <PaymentSection title="Wallet Settings">
              <View className="rounded-2xl border border-[#222222] bg-[#121212] px-4 py-4">
                <Text className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Linked Number</Text>
                <Text className="mt-1 text-base font-semibold text-white">{wallet.number}</Text>
              </View>
              <Pressable
                className="h-12 flex-row items-center rounded-2xl border border-red-500/20 bg-red-500/10 px-4"
                onPress={handleUnlink}
                style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
              >
                <Ionicons name="unlink-outline" size={18} color="#F87171" />
                <Text className="ml-3 flex-1 text-base font-semibold text-red-300">Unlink Wallet</Text>
              </Pressable>
            </PaymentSection>
          </View>
        ) : (
          <View className="mt-7">
            <PaymentSection title="Mock Connect Flow">
              <View className="rounded-2xl border border-[#222222] bg-[#121212] p-4">
                <Text className="text-base font-semibold text-white">Connect {wallet.provider}</Text>
                <Text className="mt-2 text-sm leading-5 text-[#A1A1A1]">
                  This placeholder simulates opening a wallet authorization screen. No real wallet SDK is used.
                </Text>
              </View>
              <Pressable
                className="h-12 flex-row items-center justify-center rounded-xl bg-[#C6A96B] px-5"
                onPress={handleConnect}
                style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}
              >
                <Ionicons name="link-outline" size={18} color="#0A0A0A" />
                <Text className="ml-2 text-base font-semibold text-[#0A0A0A]">Connect {wallet.provider}</Text>
              </Pressable>
            </PaymentSection>
          </View>
        )}

        <View className="mt-5">
          <SecurityNotice />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
