import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export function SecurityNotice() {
  return (
    <View className="flex-row rounded-2xl border border-[#222222] bg-[#121212] p-4">
      <View className="h-9 w-9 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#1A1A1A]">
        <Ionicons name="shield-checkmark-outline" size={17} color="#C6A96B" />
      </View>
      <Text className="ml-3 flex-1 text-xs leading-5 text-[#777777]">
        Your payment info is encrypted and secured. MEIKAN never stores full card numbers.
      </Text>
    </View>
  );
}
