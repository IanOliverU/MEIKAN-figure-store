import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccountAvatar, AccountCard, AccountHeader, InfoRow } from '../../../components/settings/AccountSettingsUi';
import {
  FUTURE_AVATAR_PATH_PATTERN,
  Profile,
  getAvatarStoragePath,
  getProfile,
} from '../../../services/supabase/profileService';

const EDIT_PROFILE_ROUTE = '/settings/account/edit-profile' as Href;
const CHANGE_EMAIL_ROUTE = '/settings/account/change-email' as Href;
const CHANGE_PASSWORD_ROUTE = '/settings/account/change-password' as Href;
const CONNECTED_ACCOUNTS_ROUTE = '/settings/account/connected-accounts' as Href;

function RouteRow({
  iconName,
  title,
  subtitle,
  href,
}: {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  href: Href;
}) {
  return (
    <Pressable
      className="border-b border-[#222222] py-4 last:border-b-0"
      onPress={() => router.push(href)}
      style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1 })}
    >
      <View className="flex-row items-center">
        <View className="h-10 w-10 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#171717]">
          <Ionicons name={iconName} size={18} color="#C6A96B" />
        </View>
        <View className="ml-3 min-w-0 flex-1">
          <Text className="text-base font-semibold text-white">{title}</Text>
          <Text className="mt-1 text-sm text-[#777777]" numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#555555" />
      </View>
    </Pressable>
  );
}

export default function AccountSettingsScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-28 pt-5" showsVerticalScrollIndicator={false}>
        <AccountHeader title="Account & Identity" subtitle="Local mock data shaped for Supabase later." onBack={() => router.back()} />

        {profile ? (
          <View className="mt-8">
            <AccountCard>
              <View className="flex-row items-center">
                <AccountAvatar profile={profile} />
                <View className="ml-4 min-w-0 flex-1">
                  <Text className="text-xl font-semibold text-white" numberOfLines={1}>
                    {profile.display_name}
                  </Text>
                  <Text className="mt-1 text-sm text-[#A1A1A1]" numberOfLines={1}>
                    @{profile.username}
                  </Text>
                  <Text className="mt-2 text-xs text-[#777777]" numberOfLines={2}>
                    {profile.bio}
                  </Text>
                </View>
              </View>

              <View className="mt-5 border-t border-[#222222] pt-2">
                <InfoRow label="Profile ID" value={profile.id} />
                <InfoRow label="User ID" value={profile.user_id} />
                <InfoRow label="Email" value={profile.email} />
              </View>
            </AccountCard>
          </View>
        ) : (
          <View className="mt-8 rounded-2xl border border-[#222222] bg-[#121212] p-5">
            <Text className="text-sm text-[#A1A1A1]">Loading account data...</Text>
          </View>
        )}

        <View className="mt-7">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Profile Data</Text>
          <AccountCard>
            <RouteRow
              iconName="person-outline"
              title="Edit Profile"
              subtitle="display_name, username, avatar_url, bio"
              href={EDIT_PROFILE_ROUTE}
            />
          </AccountCard>
        </View>

        <View className="mt-7">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Auth Data</Text>
          <AccountCard>
            <RouteRow iconName="mail-outline" title="Change Email" subtitle="Supabase Auth email later" href={CHANGE_EMAIL_ROUTE} />
            <RouteRow
              iconName="lock-closed-outline"
              title="Change Password"
              subtitle="Supabase Auth password later"
              href={CHANGE_PASSWORD_ROUTE}
            />
            <RouteRow
              iconName="link-outline"
              title="Connected Accounts"
              subtitle="OAuth providers only"
              href={CONNECTED_ACCOUNTS_ROUTE}
            />
          </AccountCard>
        </View>

        <View className="mt-7">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Avatar Storage</Text>
          <AccountCard>
            <InfoRow label="Future bucket" value="avatars" />
            <InfoRow label="Mock path" value={profile ? getAvatarStoragePath(profile.user_id) : FUTURE_AVATAR_PATH_PATTERN} />
          </AccountCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
