import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type WishlistEmptyProps = {
  onBrowse: () => void;
};

export function WishlistEmpty({ onBrowse }: WishlistEmptyProps) {
  return (
    <View className="flex-1 items-center justify-center px-7 pb-24">
      <View className="h-20 w-20 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#171717]">
        <Ionicons name="heart-outline" size={34} color="#5F5F5F" />
      </View>
      <Text className="mt-6 text-xl font-semibold text-white">No saved figures yet</Text>
      <Text className="mt-3 max-w-[280px] text-center text-sm leading-5 text-[#666666]">
        Tap the heart icon on any figure to save it here for later.
      </Text>
      <Pressable className="mt-8 h-12 flex-row items-center justify-center rounded-xl bg-[#C6A96B] px-7" onPress={onBrowse}>
        <Ionicons name="search-outline" size={17} color="#0A0A0A" />
        <Text className="ml-2 text-sm font-semibold text-[#0A0A0A]">Browse Figures</Text>
      </Pressable>
    </View>
  );
}
