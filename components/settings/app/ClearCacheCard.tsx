import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

type ClearCacheCardProps = {
  cacheSize: string;
  loading?: boolean;
  onPress: () => void;
};

export function ClearCacheCard({ cacheSize, loading = false, onPress }: ClearCacheCardProps) {
  return (
    <View className="rounded-2xl border border-[#222222] bg-[#121212] p-4">
      <View className="flex-row items-start">
        <View className="h-11 w-11 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10">
          <Ionicons name="layers-outline" size={20} color="#F59E0B" />
        </View>
        <View className="ml-4 min-w-0 flex-1">
          <Text className="text-base font-semibold text-white">Clear Cache</Text>
          <Text className="mt-1 text-sm leading-5 text-[#A1A1A1]">
            Remove temporary images and app data to free up space.
          </Text>
          <Text className="mt-2 text-xs font-semibold text-[#777777]">Estimated cache: {cacheSize}</Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        className="mt-4 h-11 flex-row items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4"
        disabled={loading}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: loading ? 0.6 : pressed ? 0.78 : 1, transform: [{ scale: pressed && !loading ? 0.99 : 1 }] })}
      >
        {loading ? <ActivityIndicator size="small" color="#C6A96B" /> : <Ionicons name="trash-outline" size={16} color="#C6A96B" />}
        <Text className="ml-2 text-sm font-semibold text-[#C6A96B]">{loading ? 'Clearing...' : 'Clear Cache'}</Text>
      </Pressable>
    </View>
  );
}
