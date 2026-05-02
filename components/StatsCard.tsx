import { Text, View } from 'react-native';

type StatsCardProps = {
  value: string;
  label: string;
  accent?: boolean;
};

export function StatsCard({ value, label, accent = false }: StatsCardProps) {
  return (
    <View className="h-20 flex-1 items-center justify-center rounded-xl border border-[#222222] bg-[#121212] px-2">
      <Text className={`text-xl font-semibold ${accent ? 'text-[#C6A96B]' : 'text-white'}`}>{value}</Text>
      <Text className="mt-1 text-xs text-[#777777]">{label}</Text>
    </View>
  );
}
