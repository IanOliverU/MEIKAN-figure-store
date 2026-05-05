import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type InfoStripProps = {
  message: string;
};

export function InfoStrip({ message }: InfoStripProps) {
  return (
    <View className="flex-row items-center rounded-2xl border border-[#222222] bg-[#121212] px-5 py-4">
      <Ionicons name="information-circle-outline" size={18} color="#C6A96B" />
      <Text className="ml-4 flex-1 text-sm leading-5 text-[#7D7D7D]">{message}</Text>
    </View>
  );
}
