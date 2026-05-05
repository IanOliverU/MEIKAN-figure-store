import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type PromoBannerProps = {
  label?: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export function PromoBanner({ label = 'PRE-ORDER OPEN', title, subtitle, onPress }: PromoBannerProps) {
  return (
    <Pressable
      className="min-h-[132px] flex-row items-center rounded-[24px] border border-[#1D4F85] bg-[#0C2138] px-6 py-5"
      onPress={onPress}
    >
      <View className="flex-1 pr-4">
        <Text className="text-xs font-semibold uppercase tracking-[2px] text-[#5FB2F0]">{label}</Text>
        <Text className="mt-4 text-xl font-semibold leading-7 text-[#D5E9FF]" numberOfLines={2}>
          {title}
        </Text>
        <Text className="mt-2 text-sm text-[#5C93BE]">{subtitle}</Text>
      </View>
      <View className="h-16 w-16 items-center justify-center rounded-2xl border border-[#1D5C93] bg-[#123A5B]">
        <Ionicons name="calendar-outline" size={28} color="#75BDF0" />
      </View>
    </Pressable>
  );
}
