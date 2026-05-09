import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NotificationInfoCard } from '../../../components/settings/notifications/NotificationInfoCard';
import { NotificationSection } from '../../../components/settings/notifications/NotificationSection';
import { NotificationToggleRow } from '../../../components/settings/notifications/NotificationToggleRow';
import {
  NotificationPreferenceKey,
  NotificationPreferences,
  getNotificationPreferences,
  updateSingleNotificationPreference,
} from '../../../services/supabase/notificationPreferencesService';

const fallbackPreferences: NotificationPreferences = {
  id: 'mock-notification-preferences-id',
  user_id: 'mock-user-id',
  push_enabled: true,
  email_enabled: true,
  wishlist_restock: true,
  preorder_closing: true,
  flash_sales: false,
  order_updates: true,
  created_at: '2026-05-10T00:00:00.000Z',
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
        <Text className="text-xl font-semibold text-white">Notifications</Text>
        <Text className="mt-1 text-sm text-[#A1A1A1]">Choose what updates you want to receive</Text>
      </View>
    </View>
  );
}

export default function NotificationSettingsScreen() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(fallbackPreferences);
  const [saving, setSaving] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const confirmationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getNotificationPreferences().then(setPreferences);

    return () => {
      if (confirmationTimer.current) {
        clearTimeout(confirmationTimer.current);
      }
    };
  }, []);

  const showUpdatedConfirmation = () => {
    setShowConfirmation(true);

    if (confirmationTimer.current) {
      clearTimeout(confirmationTimer.current);
    }

    confirmationTimer.current = setTimeout(() => setShowConfirmation(false), 1800);
  };

  const handleToggle = async (key: NotificationPreferenceKey, value: boolean) => {
    const nextPreferences = {
      ...preferences,
      [key]: value,
    };

    setPreferences(nextPreferences);
    setSaving(true);

    try {
      const savedPreferences = await updateSingleNotificationPreference(key, value);
      setPreferences(savedPreferences);
      showUpdatedConfirmation();
    } finally {
      setSaving(false);
    }
  };

  const shoppingAlertsDisabled = !preferences.push_enabled;

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-28 pt-5" showsVerticalScrollIndicator={false}>
        <Header />

        <View className="mt-8 gap-7">
          <NotificationSection title="General Notifications">
            <NotificationToggleRow
              iconName="phone-portrait-outline"
              title="Push Notifications"
              subtitle="Receive updates on your device"
              value={preferences.push_enabled}
              showDivider
              onToggle={(value) => handleToggle('push_enabled', value)}
            />
            <NotificationToggleRow
              iconName="mail-outline"
              title="Email Notifications"
              subtitle="Receive updates through email"
              value={preferences.email_enabled}
              onToggle={(value) => handleToggle('email_enabled', value)}
            />
          </NotificationSection>

          <View>
            <NotificationSection title="Shopping Alerts">
              <NotificationToggleRow
                iconName="heart-outline"
                title="Wishlist Restock Alerts"
                subtitle="Notify me when saved figures are back in stock"
                value={preferences.wishlist_restock}
                disabled={shoppingAlertsDisabled}
                showDivider
                onToggle={(value) => handleToggle('wishlist_restock', value)}
              />
              <NotificationToggleRow
                iconName="timer-outline"
                title="Pre-order Closing Soon"
                subtitle="Remind me before pre-orders close"
                value={preferences.preorder_closing}
                disabled={shoppingAlertsDisabled}
                showDivider
                onToggle={(value) => handleToggle('preorder_closing', value)}
              />
              <NotificationToggleRow
                iconName="flash-outline"
                title="Flash Sale Alerts"
                subtitle="Notify me when limited deals go live"
                value={preferences.flash_sales}
                disabled={shoppingAlertsDisabled}
                onToggle={(value) => handleToggle('flash_sales', value)}
              />
            </NotificationSection>
            {shoppingAlertsDisabled ? (
              <View className="mt-3">
                <NotificationInfoCard message="Enable push notifications to receive instant alerts." />
              </View>
            ) : null}
          </View>

          <NotificationSection title="Order Alerts">
            <NotificationToggleRow
              iconName="cube-outline"
              title="Order Status Updates"
              subtitle="Get updates when your order is processed, shipped, or delivered"
              value={preferences.order_updates}
              onToggle={(value) => handleToggle('order_updates', value)}
            />
          </NotificationSection>
        </View>

        <View className="mt-6 min-h-10 justify-center">
          {showConfirmation || saving ? (
            <NotificationInfoCard
              tone="success"
              message={saving ? 'Saving notification preferences...' : 'Notification preferences updated'}
            />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
