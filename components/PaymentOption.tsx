import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export type PaymentMethod = {
  id: string;
  label: string;
  subtitle?: string;
  type: 'visa' | 'gcash' | 'new';
};

type PaymentOptionProps = {
  method: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
};

function PaymentIcon({ type }: { type: PaymentMethod['type'] }) {
  if (type === 'visa') {
    return (
      <View className="h-9 w-11 items-center justify-center rounded-lg bg-[#172554]">
        <Ionicons name="card" size={18} color="#C6A96B" />
      </View>
    );
  }

  if (type === 'gcash') {
    return (
      <View className="h-9 w-11 items-center justify-center rounded-lg bg-[#0077E6]">
        <Text className="text-[10px] font-bold text-white">GCash</Text>
      </View>
    );
  }

  return (
    <View className="h-9 w-11 items-center justify-center rounded-lg border border-[#333333] bg-[#1A1A1A]">
      <Ionicons name="add" size={18} color="#777777" />
    </View>
  );
}

export function PaymentOption({ method, selected, onSelect }: PaymentOptionProps) {
  return (
    <Pressable
      className={`min-h-14 flex-row items-center rounded-xl border px-4 py-3 ${
        selected ? 'border-[#C6A96B] bg-[#1A1A1A]' : 'border-[#222222] bg-[#121212]'
      }`}
      onPress={onSelect}
    >
      <PaymentIcon type={method.type} />
      <View className="ml-3 flex-1">
        <Text className={`text-base font-semibold ${method.type === 'new' ? 'text-[#666666]' : 'text-white'}`}>
          {method.label}
        </Text>
        {method.subtitle ? <Text className="mt-0.5 text-xs text-[#777777]">{method.subtitle}</Text> : null}
      </View>
      <View
        className={`h-5 w-5 items-center justify-center rounded-full border ${
          selected ? 'border-[#C6A96B] bg-[#C6A96B]' : 'border-[#333333]'
        }`}
      >
        {selected ? <Ionicons name="checkmark" size={12} color="#0A0A0A" /> : null}
      </View>
    </Pressable>
  );
}
