import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type EmptyCartProps = {
  onBrowse: () => void;
};

export function EmptyCart({ onBrowse }: EmptyCartProps) {
  return (
    <View className="flex-1 items-center justify-center px-6 pb-20">
      <View className="h-20 w-20 items-center justify-center rounded-2xl border border-[#222222] bg-[#121212]">
        <Ionicons name="bag-handle-outline" size={34} color="#C6A96B" />
      </View>
      <Text className="mt-5 text-xl font-semibold text-white">Your cart is empty</Text>
      <Text className="mt-2 text-center text-sm leading-5 text-[#A1A1A1]">
        Browse premium figures and add your next centerpiece.
      </Text>
      <Pressable className="mt-6 h-12 items-center justify-center rounded-xl bg-[#C6A96B] px-8" onPress={onBrowse}>
        <Text className="text-sm font-semibold text-[#0A0A0A]">Browse Figures</Text>
      </Pressable>
    </View>
  );
}
