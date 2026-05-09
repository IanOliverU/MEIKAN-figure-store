import { Text, View } from 'react-native';

export function DefaultBadge() {
  return (
    <View className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1">
      <Text className="text-[10px] font-semibold text-emerald-300">Default</Text>
    </View>
  );
}
