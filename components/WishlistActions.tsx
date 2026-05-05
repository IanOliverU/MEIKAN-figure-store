import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';

type WishlistActionsProps = {
  disabled?: boolean;
  onAddAllInStock: () => void;
};

export function WishlistActions({ disabled = false, onAddAllInStock }: WishlistActionsProps) {
  return (
    <Pressable
      className={`h-14 flex-row items-center justify-center rounded-2xl border ${
        disabled ? 'border-[#222222] bg-[#101010]' : 'border-[#5F5132] bg-[#15130F]'
      }`}
      disabled={disabled}
      onPress={onAddAllInStock}
    >
      <Ionicons name="cart-outline" size={18} color={disabled ? '#555555' : '#C6A96B'} />
      <Text className={`ml-3 text-sm font-semibold ${disabled ? 'text-[#555555]' : 'text-[#C6A96B]'}`}>
        Add all in-stock to cart
      </Text>
    </Pressable>
  );
}
