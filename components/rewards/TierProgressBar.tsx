import { Text, View } from 'react-native';

type TierProgressBarProps = {
  progress: number;
  label: string;
};

export function TierProgressBar({ progress, label }: TierProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(progress, 1));

  return (
    <View>
      <View className="h-2 overflow-hidden rounded-full bg-[#2A2A2A]">
        <View className="h-full rounded-full bg-[#C6A96B]" style={{ width: `${clampedProgress * 100}%` }} />
      </View>
      <Text className="mt-2 text-xs text-[#A1A1A1]">{label}</Text>
    </View>
  );
}
