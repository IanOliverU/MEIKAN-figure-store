import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MenuItem } from '../../components/MenuItem';
import { MenuSection } from '../../components/MenuSection';
import { ProfileCard, ProfileUser } from '../../components/ProfileCard';
import { StatsCard } from '../../components/StatsCard';

const user: ProfileUser = {
  name: 'Juan dela Cruz',
  email: 'juan.delacruz@gmail.com',
  tier: 'Collector Tier',
};

const stats = {
  orders: 12,
  wishlist: 7,
  points: 4820,
};

const logMenuPress = (label: string) => {
  console.log(label);
};

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-28 pt-7"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-semibold text-white">My Profile</Text>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full border border-[#222222] bg-[#121212]">
            <Ionicons name="settings-outline" size={18} color="#A1A1A1" />
          </Pressable>
        </View>

        <View className="mt-6">
          <ProfileCard user={user} />
        </View>

        <View className="mt-5 flex-row gap-3">
          <StatsCard value={String(stats.orders)} label="Orders" />
          <StatsCard value={String(stats.wishlist)} label="Wishlist" />
          <StatsCard value={stats.points.toLocaleString('en-US')} label="Points" accent />
        </View>

        <View className="mt-7">
          <MenuSection title="Account">
            <MenuItem icon="receipt-outline" label="My Orders" showDivider onPress={() => logMenuPress('My Orders')} />
            <MenuItem
              icon="heart-outline"
              label="Wishlist"
              badge={`${stats.wishlist} items`}
              showDivider
              onPress={() => logMenuPress('Wishlist')}
            />
            <MenuItem
              icon="card-outline"
              label="Payment Methods"
              showDivider
              onPress={() => logMenuPress('Payment Methods')}
            />
            <MenuItem icon="location-outline" label="Addresses" showDivider onPress={() => logMenuPress('Addresses')} />
            <MenuItem
              icon="star-outline"
              label="Rewards & Points"
              badge={`${stats.points.toLocaleString('en-US')} pts`}
              onPress={() => logMenuPress('Rewards & Points')}
            />
          </MenuSection>
        </View>

        <View className="mt-6">
          <MenuSection title="Support">
            <MenuItem icon="chatbox-outline" label="Help Center" showDivider onPress={() => logMenuPress('Help Center')} />
            <MenuItem icon="log-out-outline" label="Sign Out" danger onPress={() => logMenuPress('Sign Out')} />
          </MenuSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
