import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type PolicyRowProps = {
  title: string;
  onPress: () => void;
};

export function PolicyRow({ title, onPress }: PolicyRowProps) {
  return (
    <Pressable
      className="flex-row items-center border-b border-[#222222] py-4 last:border-b-0"
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.72 : 1 })}
    >
      <View className="h-9 w-9 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]">
        <Ionicons name="document-text-outline" size={17} color="#C6A96B" />
      </View>
      <Text className="ml-3 flex-1 text-base font-semibold text-white">{title}</Text>
      <Ionicons name="chevron-forward" size={16} color="#4A4A4A" />
    </Pressable>
  );
}
