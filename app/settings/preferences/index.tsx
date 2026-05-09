import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PreferenceCard } from '../../../components/settings/preferences/PreferenceCard';
import { PreferenceOption } from '../../../components/settings/preferences/PreferenceOption';
import { RegionSelector } from '../../../components/settings/preferences/RegionSelector';
import { ScalePreferenceChip } from '../../../components/settings/preferences/ScalePreferenceChip';
import {
  PreferredCurrency,
  PreferredScale,
  PreferredShippingMethod,
  ShippingRegion,
  ShoppingPreferences,
  getPreferences,
  updatePreferences,
} from '../../../services/supabase/preferencesService';

const currencyOptions: Array<{ value: PreferredCurrency; label: string; symbol: string; subtitle: string }> = [
  { value: 'PHP', label: 'PHP', symbol: '₱', subtitle: 'Show prices in Philippine Peso.' },
  { value: 'JPY', label: 'JPY', symbol: '¥', subtitle: 'Show prices in Japanese Yen.' },
];

const shippingOptions: Array<{
  value: PreferredShippingMethod;
  title: string;
  estimate: string;
  description: string;
}> = [
  {
    value: 'standard',
    title: 'Standard Shipping',
    estimate: '5-10 days',
    description: 'Best for pre-orders, bundled hauls, and lower delivery costs.',
  },
  {
    value: 'express',
    title: 'Express Shipping',
    estimate: '2-4 days',
    description: 'Prioritize faster delivery for limited drops and in-stock figures.',
  },
];

const scaleOptions: PreferredScale[] = ['1/4 Scale', '1/6 Scale', '1/7 Scale', '1/8 Scale', 'Nendoroid', 'Figma'];
const regionOptions: ShippingRegion[] = ['Philippines', 'Japan', 'Singapore', 'United States'];

const fallbackPreferences: ShoppingPreferences = {
  preferred_currency: 'PHP',
  preferred_shipping_method: 'standard',
  preferred_scales: [],
  shipping_region: 'Philippines',
  updated_at: '2026-05-10T00:00:00.000Z',
};

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
        <Text className="text-xl font-semibold text-white">Shopping Preferences</Text>
        <Text className="mt-1 text-sm text-[#A1A1A1]">Customize your collector experience</Text>
      </View>
    </View>
  );
}

export default function ShoppingPreferencesScreen() {
  const [preferences, setPreferences] = useState<ShoppingPreferences>(fallbackPreferences);
  const [regionExpanded, setRegionExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmation, setConfirmation] = useState('Preferences updated');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const confirmationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getPreferences().then(setPreferences);

    return () => {
      if (confirmationTimer.current) {
        clearTimeout(confirmationTimer.current);
      }
    };
  }, []);

  const preferredScaleSet = useMemo(() => new Set(preferences.preferred_scales), [preferences.preferred_scales]);

  const showSavedConfirmation = (message = 'Preferences updated') => {
    setConfirmation(message);
    setShowConfirmation(true);

    if (confirmationTimer.current) {
      clearTimeout(confirmationTimer.current);
    }

    confirmationTimer.current = setTimeout(() => setShowConfirmation(false), 1800);
  };

  const savePreferences = async (nextPreferences: ShoppingPreferences, message?: string) => {
    setPreferences(nextPreferences);
    setSaving(true);

    try {
      const savedPreferences = await updatePreferences({
        preferred_currency: nextPreferences.preferred_currency,
        preferred_shipping_method: nextPreferences.preferred_shipping_method,
        preferred_scales: nextPreferences.preferred_scales,
        shipping_region: nextPreferences.shipping_region,
      });

      setPreferences(savedPreferences);
      showSavedConfirmation(message);
    } finally {
      setSaving(false);
    }
  };

  const handleCurrencySelect = (preferredCurrency: PreferredCurrency) => {
    savePreferences({ ...preferences, preferred_currency: preferredCurrency }, 'Currency preference updated');
  };

  const handleShippingSelect = (preferredShippingMethod: PreferredShippingMethod) => {
    savePreferences({ ...preferences, preferred_shipping_method: preferredShippingMethod }, 'Shipping preference updated');
  };

  const handleScaleToggle = (scale: PreferredScale) => {
    const preferredScales = preferredScaleSet.has(scale)
      ? preferences.preferred_scales.filter((preferredScale) => preferredScale !== scale)
      : [...preferences.preferred_scales, scale];

    savePreferences({ ...preferences, preferred_scales: preferredScales }, 'Scale preferences updated');
  };

  const handleRegionSelect = (shippingRegion: ShippingRegion) => {
    setRegionExpanded(false);
    savePreferences({ ...preferences, shipping_region: shippingRegion }, 'Shipping country updated');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-28 pt-5" showsVerticalScrollIndicator={false}>
        <Header />

        <View className="mt-8 gap-7">
          <PreferenceCard title="Currency Preference" subtitle="Choose how product prices should display.">
            <View className="gap-3">
              {currencyOptions.map((currency) => (
                <PreferenceOption
                  key={currency.value}
                  title={currency.label}
                  subtitle={currency.subtitle}
                  meta={currency.symbol}
                  active={preferences.preferred_currency === currency.value}
                  onPress={() => handleCurrencySelect(currency.value)}
                />
              ))}
            </View>
          </PreferenceCard>

          <PreferenceCard title="Shipping Preference" subtitle="Set the default option for checkout estimates.">
            <View className="gap-3">
              {shippingOptions.map((shippingOption) => (
                <PreferenceOption
                  key={shippingOption.value}
                  title={shippingOption.title}
                  subtitle={shippingOption.description}
                  meta={shippingOption.estimate}
                  active={preferences.preferred_shipping_method === shippingOption.value}
                  onPress={() => handleShippingSelect(shippingOption.value)}
                />
              ))}
            </View>
          </PreferenceCard>

          <PreferenceCard title="Scale Preferences" subtitle="Personalize recommendations and future browse defaults.">
            <View className="flex-row flex-wrap gap-3">
              {scaleOptions.map((scale) => (
                <ScalePreferenceChip
                  key={scale}
                  label={scale}
                  selected={preferredScaleSet.has(scale)}
                  onPress={() => handleScaleToggle(scale)}
                />
              ))}
            </View>
          </PreferenceCard>

          <PreferenceCard title="Region / Shipping Country" subtitle="Prepare shipping estimates and regional notices.">
            <RegionSelector
              regions={regionOptions}
              selectedRegion={preferences.shipping_region}
              expanded={regionExpanded}
              onToggle={() => setRegionExpanded((expanded) => !expanded)}
              onSelect={handleRegionSelect}
            />
          </PreferenceCard>
        </View>

        <View className="mt-6 min-h-10 justify-center">
          {showConfirmation || saving ? (
            <View className="self-start flex-row items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
              <Ionicons name={saving ? 'sync-outline' : 'checkmark-circle-outline'} size={14} color="#34D399" />
              <Text className="ml-2 text-xs font-semibold text-emerald-300">{saving ? 'Saving preferences...' : confirmation}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
