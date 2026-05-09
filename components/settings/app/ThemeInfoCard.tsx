import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type ThemeInfoCardProps = {
  themeLabel: string;
};

export function ThemeInfoCard({ themeLabel }: ThemeInfoCardProps) {
  return (
    <View className="rounded-2xl border border-[#222222] bg-[#121212] p-4">
      <View className="flex-row items-center">
        <View className="h-11 w-11 items-center justify-center rounded-xl border border-[#C6A96B]/40 bg-[#1A1710]">
          <Ionicons name="moon-outline" size={20} color="#C6A96B" />
        </View>
        <View className="ml-4 min-w-0 flex-1">
          <Text className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Current Theme</Text>
          <Text className="mt-1 text-base font-semibold text-white">{themeLabel}</Text>
          <Text className="mt-2 text-sm leading-5 text-[#A1A1A1]">Light mode may be added in a future update.</Text>
        </View>
      </View>
    </View>
  );
}
