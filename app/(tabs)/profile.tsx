import { Ionicons } from '@expo/vector-icons';
import { Href, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MenuItem } from '../../components/MenuItem';
import { MenuSection } from '../../components/MenuSection';
import { ProfileCard, ProfileUser } from '../../components/ProfileCard';
import { StatsCard } from '../../components/StatsCard';
import { signOut } from '../../services/supabase/authService';
import { getProfile } from '../../services/supabase/profileService';

const stats = {
  orders: 12,
  wishlist: 7,
  points: 4820,
};

const PAYMENT_METHODS_ROUTE = '/payment-methods' as Href;
const ADDRESSES_ROUTE = '/addresses' as Href;
const REWARDS_ROUTE = '/rewards' as Href;
const HELP_ROUTE = '/help' as Href;
const ABOUT_ROUTE = '/settings/about' as Href;
const WISHLIST_ROUTE = '/wishlist' as Href;
const ACCOUNT_SETTINGS_ROUTE = '/settings/account' as Href;
const EDIT_PROFILE_ROUTE = '/settings/account/edit-profile' as Href;
const SHOPPING_PREFERENCES_ROUTE = '/settings/preferences' as Href;
const NOTIFICATION_SETTINGS_ROUTE = '/settings/notifications' as Href;
const SECURITY_SETTINGS_ROUTE = '/settings/security' as Href;
const APP_PREFERENCES_ROUTE = '/settings/app' as Href;

const fallbackUser: ProfileUser = {
  display_name: 'Juan dela Cruz',
  username: 'juan_collector',
  avatar_url: null,
  email: 'juan@example.com',
  tier: 'Collector Tier',
};

export default function ProfileScreen() {
  const [user, setUser] = useState<ProfileUser>(fallbackUser);

  const handleSignOut = async () => {
    try {
      await signOut();
    } finally {
      router.replace('/login' as never);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProfile()
        .then((profile) => {
          setUser({
            display_name: profile.display_name,
            username: profile.username,
            avatar_url: profile.avatar_url,
            email: profile.email,
            tier: 'Collector Tier',
          });
        })
        .catch(() => {
          setUser(fallbackUser);
        });
    }, []),
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-28 pt-7"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-semibold text-white">My Profile</Text>
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-full border border-[#222222] bg-[#121212]"
            hitSlop={10}
            onPress={() => router.push(ACCOUNT_SETTINGS_ROUTE)}
            style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
          >
            <Ionicons name="settings-outline" size={18} color="#A1A1A1" />
          </Pressable>
        </View>

        <View className="mt-6">
          <ProfileCard user={user} onPress={() => router.push(EDIT_PROFILE_ROUTE)} />
        </View>

        <View className="mt-5 flex-row gap-3">
          <StatsCard value={String(stats.orders)} label="Orders" />
          <StatsCard value={String(stats.wishlist)} label="Wishlist" />
          <StatsCard value={stats.points.toLocaleString('en-US')} label="Points" accent />
        </View>

        <View className="mt-7">
          <MenuSection title="Account">
            <MenuItem
              icon="person-circle-outline"
              label="Account & Identity"
              showDivider
              onPress={() => router.push(ACCOUNT_SETTINGS_ROUTE)}
            />
            <MenuItem
              icon="options-outline"
              label="Shopping Preferences"
              showDivider
              onPress={() => router.push(SHOPPING_PREFERENCES_ROUTE)}
            />
            <MenuItem
              icon="notifications-outline"
              label="Notifications"
              showDivider
              onPress={() => router.push(NOTIFICATION_SETTINGS_ROUTE)}
            />
            <MenuItem
              icon="shield-checkmark-outline"
              label="Privacy & Security"
              showDivider
              onPress={() => router.push(SECURITY_SETTINGS_ROUTE)}
            />
            <MenuItem
              icon="phone-portrait-outline"
              label="App Preferences"
              showDivider
              onPress={() => router.push(APP_PREFERENCES_ROUTE)}
            />
            <MenuItem icon="receipt-outline" label="My Orders" showDivider onPress={() => router.push('/orders')} />
            <MenuItem
              icon="heart-outline"
              label="Wishlist"
              badge={`${stats.wishlist} items`}
              showDivider
              onPress={() => router.push(WISHLIST_ROUTE)}
            />
            <MenuItem
              icon="card-outline"
              label="Payment Methods"
              showDivider
              onPress={() => router.push(PAYMENT_METHODS_ROUTE)}
            />
            <MenuItem icon="location-outline" label="Addresses" showDivider onPress={() => router.push(ADDRESSES_ROUTE)} />
            <MenuItem
              icon="star-outline"
              label="Rewards & Points"
              badge={`${stats.points.toLocaleString('en-US')} pts`}
              onPress={() => router.push(REWARDS_ROUTE)}
            />
          </MenuSection>
        </View>

        <View className="mt-6">
          <MenuSection title="Support">
            <MenuItem icon="chatbox-outline" label="Help Center" showDivider onPress={() => router.push(HELP_ROUTE)} />
            <MenuItem icon="information-circle-outline" label="About MEIKAN" showDivider onPress={() => router.push(ABOUT_ROUTE)} />
            <MenuItem icon="log-out-outline" label="Sign Out" danger onPress={handleSignOut} />
          </MenuSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
