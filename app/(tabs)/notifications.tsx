import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <View className="flex-1 px-5 pt-5">
        <View className="flex-row items-center justify-between">
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
            onPress={() => router.back()}
            style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
          >
            <Ionicons name="chevron-back" size={20} color="#A1A1A1" />
          </Pressable>
          <Text className="text-base font-semibold text-white">Notifications</Text>
          <View className="h-10 w-10" />
        </View>

        <View className="mt-8 rounded-2xl border border-[#222222] bg-[#121212] p-5">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#1A1A1A]">
            <Ionicons name="notifications-outline" size={24} color="#C6A96B" />
          </View>
          <Text className="mt-5 text-xl font-semibold text-white">Notifications are coming soon</Text>
          <Text className="mt-2 text-sm leading-5 text-[#A1A1A1]">
            This placeholder keeps the Home header connected while real alerts are added later.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
