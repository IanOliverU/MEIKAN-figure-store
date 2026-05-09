import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { TierProgressBar } from './TierProgressBar';

type PointsHeroCardProps = {
  points: number;
  storeCredit: number;
  currentTier: string;
  nextTier: string;
  pointsToNextTier: number;
  progress: number;
};

export function PointsHeroCard({
  points,
  storeCredit,
  currentTier,
  nextTier,
  pointsToNextTier,
  progress,
}: PointsHeroCardProps) {
  const progressLabel =
    pointsToNextTier > 0 ? `${pointsToNextTier.toLocaleString('en-US')} pts to ${nextTier}` : 'Elite tier unlocked';

  return (
    <View className="rounded-2xl border border-[#5F5131] bg-[#121212] p-5">
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-xs font-semibold uppercase tracking-wider text-[#C6A96B]">Available Points</Text>
          <Text className="mt-2 text-4xl font-semibold text-white">{points.toLocaleString('en-US')}</Text>
          <Text className="mt-1 text-sm text-[#A1A1A1]">≈ ₱{storeCredit.toLocaleString('en-US')} in store credit</Text>
        </View>
        <View className="h-12 w-12 items-center justify-center rounded-full border border-[#5F5131] bg-[#1A1710]">
          <Ionicons name="star-outline" size={22} color="#C6A96B" />
        </View>
      </View>

      <View className="mt-6 rounded-2xl border border-[#222222] bg-[#1A1A1A] p-4">
        <View className="mb-3 flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-[#777777]">Current tier</Text>
            <Text className="mt-1 text-lg font-semibold text-white">{currentTier}</Text>
          </View>
          <Text className="text-xs font-semibold text-[#C6A96B]">{nextTier}</Text>
        </View>
        <TierProgressBar progress={progress} label={progressLabel} />
      </View>
    </View>
  );
}
