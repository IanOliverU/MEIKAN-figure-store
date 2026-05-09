import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export type SupportOptionKind = 'chat' | 'email' | 'orders';

type SupportOptionCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  badge?: string;
  onPress: () => void;
};

export function SupportOptionCard({ icon, title, subtitle, badge, onPress }: SupportOptionCardProps) {
  return (
    <Pressable
      className="flex-row items-center rounded-2xl border border-[#222222] bg-[#121212] p-4"
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
    >
      <View className="h-11 w-11 items-center justify-center rounded-xl border border-[#5F5131] bg-[#1A1710]">
        <Ionicons name={icon} size={20} color="#C6A96B" />
      </View>
      <View className="ml-4 min-w-0 flex-1">
        <View className="flex-row flex-wrap items-center gap-2">
          <Text className="text-base font-semibold text-white">{title}</Text>
          {badge ? (
            <View className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1">
              <Text className="text-[10px] font-semibold text-emerald-300">{badge}</Text>
            </View>
          ) : null}
        </View>
        <Text className="mt-1 text-sm text-[#A1A1A1]" numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={17} color="#4A4A4A" />
    </Pressable>
  );
}
