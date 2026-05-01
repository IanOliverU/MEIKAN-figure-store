import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type QuantityStepperProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function QuantityStepper({ quantity, onDecrease, onIncrease }: QuantityStepperProps) {
  return (
    <View className="h-8 flex-row items-center overflow-hidden rounded-lg border border-[#222222] bg-[#1A1A1A]">
      <Pressable className="h-8 w-8 items-center justify-center" onPress={onDecrease}>
        <Ionicons name="remove" size={14} color="#A1A1A1" />
      </Pressable>
      <View className="w-8 items-center">
        <Text className="text-sm font-semibold text-white">{quantity}</Text>
      </View>
      <Pressable className="h-8 w-8 items-center justify-center" onPress={onIncrease}>
        <Ionicons name="add" size={14} color="#A1A1A1" />
      </Pressable>
    </View>
  );
}
