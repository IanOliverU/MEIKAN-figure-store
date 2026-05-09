import { Ionicons } from '@expo/vector-icons';
import { Href, router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { policies } from '../../../../components/help/helpData';

const HELP_ROUTE = '/help' as Href;

export default function PolicyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const policy = policies.find((item) => item.id === id);

  if (!policy) {
    return (
      <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
        <View className="flex-1 items-center justify-center px-7">
          <View className="h-20 w-20 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#171717]">
            <Ionicons name="document-text-outline" size={34} color="#5F5F5F" />
          </View>
          <Text className="mt-6 text-xl font-semibold text-white">Policy not found</Text>
          <Pressable
            className="mt-8 h-12 flex-row items-center justify-center rounded-xl bg-[#C6A96B] px-7"
            onPress={() => router.replace(HELP_ROUTE)}
          >
            <Text className="text-sm font-semibold text-[#0A0A0A]">Back to Help Center</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

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
          <Text className="ml-4 flex-1 text-xl font-semibold text-white">{policy.title}</Text>
        </View>

        <View className="mt-8 rounded-2xl border border-[#222222] bg-[#121212] p-5">
          <Text className="text-xs font-semibold uppercase tracking-wider text-[#C6A96B]">Policy Detail</Text>
          <Text className="mt-3 text-2xl font-semibold text-white">{policy.title}</Text>
          <Text className="mt-2 text-sm text-[#777777]">Last updated {policy.updatedAt}</Text>

          <View className="mt-6 gap-4">
            {policy.content.map((paragraph) => (
              <Text key={paragraph} className="text-sm leading-6 text-[#A1A1A1]">
                {paragraph}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
