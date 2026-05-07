import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type FlashSaleBannerProps = {
  title: string;
  countdown: string;
  onPress?: () => void;
};

export function FlashSaleBanner({ title, countdown, onPress }: FlashSaleBannerProps) {
  return (
    <Pressable
      className="min-h-[92px] flex-row items-center rounded-[24px] border border-[#963318] bg-[#240F0A] px-5"
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.86 : 1, transform: [{ scale: pressed ? 0.985 : 1 }] })}
    >
      <View className="h-12 w-12 items-center justify-center rounded-xl border border-[#963318] bg-[#2A120D]">
        <Ionicons name="flash-outline" size={24} color="#F06B3B" />
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold text-[#F06B3B]" numberOfLines={1}>
          {title}
        </Text>
        <Text className="mt-1 text-sm text-[#A86F5A]">{countdown}</Text>
      </View>
      <View className="ml-3 flex-row items-center">
        <Text className="text-base font-semibold text-[#F06B3B]">View</Text>
        <Ionicons name="chevron-forward" size={16} color="#F06B3B" style={{ marginLeft: 8 }} />
      </View>
    </Pressable>
  );
}
