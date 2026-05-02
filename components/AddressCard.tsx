import { Pressable, Text, View } from 'react-native';

export type CheckoutAddress = {
  name: string;
  line1: string;
  city: string;
  country: string;
};

type AddressCardProps = {
  address: CheckoutAddress;
};

export function AddressCard({ address }: AddressCardProps) {
  return (
    <View className="rounded-2xl border border-[#222222] bg-[#121212] p-4">
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1">
          <Text className="text-base font-semibold text-white">{address.name}</Text>
          <Text className="mt-2 text-sm leading-5 text-[#A1A1A1]">{address.line1}</Text>
          <Text className="text-sm leading-5 text-[#A1A1A1]">{address.city}</Text>
          <Text className="text-sm leading-5 text-[#A1A1A1]">{address.country}</Text>
        </View>
        <Pressable>
          <Text className="text-xs font-semibold text-[#C6A96B]">Edit</Text>
        </Pressable>
      </View>
    </View>
  );
}
