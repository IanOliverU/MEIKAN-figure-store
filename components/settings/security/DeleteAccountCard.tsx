import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type DeleteAccountCardProps = {
  onPress: () => void;
};

export function DeleteAccountCard({ onPress }: DeleteAccountCardProps) {
  return (
    <View className="rounded-2xl border border-[#3A1F1F] bg-[#121212] p-4">
      <View className="flex-row items-start">
        <View className="h-11 w-11 items-center justify-center rounded-xl border border-[#7F2A2A]/40 bg-[#2A1212]">
          <Ionicons name="trash-outline" size={20} color="#F87171" />
        </View>
        <View className="ml-4 min-w-0 flex-1">
          <Text className="text-base font-semibold text-white">Delete Account</Text>
          <Text className="mt-1 text-sm leading-5 text-[#A1A1A1]">
            Permanently remove your account and all associated data.
          </Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        className="mt-4 h-11 flex-row items-center justify-center rounded-xl border border-[#7F2A2A] bg-[#2A1212] px-4"
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
      >
        <Ionicons name="trash-outline" size={16} color="#F87171" />
        <Text className="ml-2 text-sm font-semibold text-[#F87171]">Delete Account</Text>
      </Pressable>
    </View>
  );
}
