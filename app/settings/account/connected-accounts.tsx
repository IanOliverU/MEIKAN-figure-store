import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AccountActionButton,
  AccountCard,
  AccountHeader,
  AccountStatusMessage,
  getAccountErrorMessage,
} from '../../../components/settings/AccountSettingsUi';
import { OAuthProvider, linkOAuthProvider, unlinkOAuthProvider } from '../../../services/supabase/authService';

type ProviderItem = {
  id: OAuthProvider;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  linked: boolean;
};

const initialProviders: ProviderItem[] = [
  { id: 'google', label: 'Google', iconName: 'logo-google', linked: true },
  { id: 'apple', label: 'Apple', iconName: 'logo-apple', linked: false },
  { id: 'facebook', label: 'Facebook', iconName: 'logo-facebook', linked: false },
];

export default function ConnectedAccountsScreen() {
  const [providers, setProviders] = useState<ProviderItem[]>(initialProviders);
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProviderAction = async (provider: ProviderItem) => {
    setLoadingProvider(provider.id);
    setSuccess(null);
    setError(null);

    try {
      if (provider.linked) {
        await unlinkOAuthProvider(provider.id);
      } else {
        await linkOAuthProvider(provider.id);
      }

      setProviders((currentProviders) =>
        currentProviders.map((currentProvider) =>
          currentProvider.id === provider.id ? { ...currentProvider, linked: !provider.linked } : currentProvider,
        ),
      );
      setSuccess(`${provider.label} ${provider.linked ? 'disconnected' : 'connected'} locally.`);
    } catch (providerError) {
      setError(getAccountErrorMessage(providerError));
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-28 pt-5" showsVerticalScrollIndicator={false}>
        <AccountHeader title="Connected Accounts" subtitle="OAuth provider mock state, separate from profile data." onBack={() => router.back()} />

        <View className="mt-8 gap-4">
          {providers.map((provider) => (
            <AccountCard key={provider.id}>
              <View className="flex-row items-center">
                <View className="h-12 w-12 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#171717]">
                  <Ionicons name={provider.iconName} size={22} color="#C6A96B" />
                </View>
                <View className="ml-4 min-w-0 flex-1">
                  <Text className="text-base font-semibold text-white">{provider.label}</Text>
                  <Text className="mt-1 text-sm text-[#777777]">{provider.linked ? 'Connected' : 'Not connected'}</Text>
                </View>
                <View className="rounded-full border border-[#2A2A2A] bg-[#171717] px-2.5 py-1">
                  <Text className={`text-[10px] font-semibold ${provider.linked ? 'text-emerald-300' : 'text-[#777777]'}`}>
                    {provider.linked ? 'Linked' : 'Off'}
                  </Text>
                </View>
              </View>

              <View className="mt-4">
                <AccountActionButton
                  title={provider.linked ? 'Disconnect Account' : 'Connect Account'}
                  loadingTitle={provider.linked ? 'Disconnecting...' : 'Connecting...'}
                  iconName={provider.linked ? 'unlink-outline' : 'link-outline'}
                  loading={loadingProvider === provider.id}
                  disabled={Boolean(loadingProvider && loadingProvider !== provider.id)}
                  variant={provider.linked ? 'danger' : 'outline'}
                  onPress={() => handleProviderAction(provider)}
                />
              </View>
            </AccountCard>
          ))}
        </View>

        <View className="mt-6 gap-3">
          {success ? <AccountStatusMessage type="success" message={success} /> : null}
          {error ? <AccountStatusMessage type="error" message={error} /> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
