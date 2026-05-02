import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type OrderStatusCardProps = {
  title: string;
  subtitle: string;
};

export function OrderStatusCard({ title, subtitle }: OrderStatusCardProps) {
  return (
    <View className="flex-row items-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4">
      <View className="h-12 w-12 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
        <Ionicons name="car-outline" size={23} color="#4ADE80" />
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold text-emerald-300">{title}</Text>
        <Text className="mt-1 text-sm text-emerald-400/80">{subtitle}</Text>
      </View>
    </View>
  );
}
