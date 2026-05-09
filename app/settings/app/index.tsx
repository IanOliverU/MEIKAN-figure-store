import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ClearCacheCard } from '../../../components/settings/app/ClearCacheCard';
import { LanguageOptionCard } from '../../../components/settings/app/LanguageOptionCard';
import { PreferenceConfirmModal } from '../../../components/settings/app/PreferenceConfirmModal';
import { ThemeInfoCard } from '../../../components/settings/app/ThemeInfoCard';
import {
  AppLanguage,
  AppPreferences,
  clearAppCache,
  getAppPreferences,
  updateAppPreferences,
} from '../../../services/supabase/appPreferencesService';

const fallbackPreferences: AppPreferences = {
  preferred_language: 'en',
  theme: 'dark',
  cache_size: '128 MB',
  updated_at: '2026-05-10T00:00:00.000Z',
};

const languageOptions: Array<{ value: AppLanguage; label: string; subtitle: string }> = [
  { value: 'en', label: 'English', subtitle: 'Use English labels and app copy later.' },
  { value: 'fil', label: 'Filipino', subtitle: 'Save Filipino as your future language preference.' },
  { value: 'ja', label: 'Japanese', subtitle: 'Save Japanese as your future language preference.' },
];

function Header() {
  return (
    <View className="flex-row items-center">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        className="h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
        onPress={() => router.back()}
        style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
      >
        <Ionicons name="chevron-back" size={18} color="#A1A1A1" />
      </Pressable>
      <View className="ml-4 min-w-0 flex-1">
        <Text className="text-xl font-semibold text-white">App Preferences</Text>
        <Text className="mt-1 text-sm text-[#A1A1A1]">Customize your app experience</Text>
      </View>
    </View>
  );
}

function StatusBanner({ message }: { message: string }) {
  return (
    <View className="self-start flex-row items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
      <Ionicons name="checkmark-circle-outline" size={14} color="#34D399" />
      <Text className="ml-2 text-xs font-semibold text-emerald-300">{message}</Text>
    </View>
  );
}

export default function AppPreferencesScreen() {
  const [preferences, setPreferences] = useState<AppPreferences>(fallbackPreferences);
  const [cacheModalVisible, setCacheModalVisible] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getAppPreferences().then(setPreferences);

    return () => {
      if (statusTimer.current) {
        clearTimeout(statusTimer.current);
      }
    };
  }, []);

  const showStatus = (message: string) => {
    setStatusMessage(message);

    if (statusTimer.current) {
      clearTimeout(statusTimer.current);
    }

    statusTimer.current = setTimeout(() => setStatusMessage(null), 1800);
  };

  const handleLanguageSelect = async (preferredLanguage: AppLanguage) => {
    const nextPreferences = {
      ...preferences,
      preferred_language: preferredLanguage,
    };

    setPreferences(nextPreferences);
    const savedPreferences = await updateAppPreferences({ preferred_language: preferredLanguage });
    setPreferences(savedPreferences);
    showStatus('Language preference updated');
  };

  const handleClearCache = async () => {
    setClearingCache(true);

    try {
      const result = await clearAppCache();
      setPreferences((currentPreferences) => ({ ...currentPreferences, cache_size: result.cache_size }));
      setCacheModalVisible(false);
      showStatus('Cache cleared successfully');
    } finally {
      setClearingCache(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-28 pt-5" showsVerticalScrollIndicator={false}>
        <Header />

        <View className="mt-8 gap-7">
          <View>
            <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Language Section</Text>
            <View className="rounded-2xl border border-[#222222] bg-[#121212] p-3">
              <View className="gap-3">
                {languageOptions.map((language) => (
                  <LanguageOptionCard
                    key={language.value}
                    label={language.label}
                    subtitle={language.subtitle}
                    active={preferences.preferred_language === language.value}
                    onPress={() => handleLanguageSelect(language.value)}
                  />
                ))}
              </View>
            </View>
          </View>

          <View>
            <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Theme Section</Text>
            <ThemeInfoCard themeLabel="Dark" />
          </View>

          <View>
            <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Storage / Cache Section</Text>
            <ClearCacheCard
              cacheSize={preferences.cache_size}
              loading={clearingCache}
              onPress={() => setCacheModalVisible(true)}
            />
          </View>
        </View>

        <View className="mt-6 min-h-10 justify-center">
          {statusMessage ? <StatusBanner message={statusMessage} /> : null}
        </View>
      </ScrollView>

      <PreferenceConfirmModal
        visible={cacheModalVisible}
        title="Clear cached app data?"
        message="This mock action simulates removing temporary images and app data. No persisted storage will be changed yet."
        confirmLabel="Clear Cache"
        loading={clearingCache}
        onCancel={() => setCacheModalVisible(false)}
        onConfirm={handleClearCache}
      />
    </SafeAreaView>
  );
}
