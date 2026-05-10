import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export type CheckoutShippingAddress = {
  name: string;
  line1: string;
  line2: string;
  country: string;
  phone?: string;
};

type CheckoutAddressCardProps = {
  address: CheckoutShippingAddress | null;
  onEdit: () => void;
};

export function CheckoutAddressCard({ address, onEdit }: CheckoutAddressCardProps) {
  if (!address) {
    return (
      <Pressable
        className="min-h-24 rounded-2xl border border-dashed border-[#333333] bg-[#121212] p-4"
        onPress={onEdit}
        style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
      >
        <View className="flex-row items-center">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1A]">
            <Ionicons name="location-outline" size={20} color="#C6A96B" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-base font-semibold text-white">Add shipping address</Text>
            <Text className="mt-1 text-sm text-[#777777]">Choose where this order should be delivered.</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#777777" />
        </View>
      </Pressable>
    );
  }

  return (
    <View className="rounded-2xl border border-[#222222] bg-[#121212] p-4">
      <View className="flex-row items-start justify-between gap-4">
        <View className="min-w-0 flex-1">
          <Text className="text-base font-semibold text-white">{address.name}</Text>
          <Text className="mt-2 text-sm leading-5 text-[#A1A1A1]">{address.line1}</Text>
          <Text className="text-sm leading-5 text-[#A1A1A1]">{address.line2}</Text>
          <Text className="text-sm leading-5 text-[#A1A1A1]">{address.country}</Text>
          {address.phone ? <Text className="mt-2 text-xs text-[#777777]">{address.phone}</Text> : null}
        </View>
        <Pressable
          className="rounded-lg px-2 py-1"
          onPress={onEdit}
          style={({ pressed }) => ({ opacity: pressed ? 0.68 : 1 })}
        >
          <Text className="text-xs font-semibold text-[#C6A96B]">Edit</Text>
        </Pressable>
      </View>
    </View>
  );
}
