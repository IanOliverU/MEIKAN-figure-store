import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type AddToCartBarProps = {
  onAddToCart: () => void;
};

export function AddToCartBar({ onAddToCart }: AddToCartBarProps) {
  return (
    <View className="flex-row items-center gap-3">
      <Pressable className="h-14 w-14 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]">
        <Ionicons name="heart-outline" size={22} color="#A1A1A1" />
      </Pressable>
      <Pressable className="h-14 flex-1 items-center justify-center rounded-xl bg-[#C6A96B]" onPress={onAddToCart}>
        <Text className="text-base font-semibold text-[#0A0A0A]">Add to Cart</Text>
      </Pressable>
    </View>
  );
}
