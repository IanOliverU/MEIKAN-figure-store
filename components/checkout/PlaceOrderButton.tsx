import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';

type PlaceOrderButtonProps = {
  loading: boolean;
  onPress: () => void;
};

export function PlaceOrderButton({ loading, onPress }: PlaceOrderButtonProps) {
  return (
    <Pressable
      className={`mt-4 h-14 flex-row items-center justify-center gap-2 rounded-2xl ${
        loading ? 'bg-[#8F7A4E]' : 'bg-[#C6A96B]'
      }`}
      disabled={loading}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.84 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
    >
      <Ionicons name={loading ? 'hourglass-outline' : 'shield-checkmark-outline'} size={18} color="#0A0A0A" />
      <Text className="text-base font-semibold text-[#0A0A0A]">{loading ? 'Placing order...' : 'Place Order'}</Text>
    </Pressable>
  );
}
