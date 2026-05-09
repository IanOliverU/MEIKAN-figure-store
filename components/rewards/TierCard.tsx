import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export type RewardTier = {
  name: 'Starter' | 'Collector' | 'Elite';
  range: string;
  benefits: string[];
};

type TierCardProps = {
  tier: RewardTier;
  current: boolean;
  locked: boolean;
  onPress: () => void;
};

export function TierCard({ tier, current, locked, onPress }: TierCardProps) {
  return (
    <Pressable
      className={`rounded-2xl border bg-[#121212] p-4 ${
        current ? 'border-[#5F5131]' : locked ? 'border-[#222222] opacity-60' : 'border-[#222222]'
      }`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.78 : locked ? 0.6 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="min-w-0 flex-1">
          <View className="flex-row flex-wrap items-center gap-2">
            <Text className="text-base font-semibold text-white">{tier.name}</Text>
            {current ? (
              <View className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1">
                <Text className="text-[10px] font-semibold text-emerald-300">Current</Text>
              </View>
            ) : null}
          </View>
          <Text className="mt-1 text-xs text-[#777777]">{tier.range}</Text>
        </View>
        <Ionicons name={locked ? 'lock-closed-outline' : 'chevron-forward'} size={17} color={locked ? '#666666' : '#4A4A4A'} />
      </View>

      <View className="mt-4 gap-2">
        {tier.benefits.slice(0, 2).map((benefit) => (
          <View key={benefit} className="flex-row items-center">
            <Ionicons name="checkmark-circle-outline" size={14} color={locked ? '#666666' : '#C6A96B'} />
            <Text className="ml-2 flex-1 text-xs leading-4 text-[#A1A1A1]">{benefit}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}
