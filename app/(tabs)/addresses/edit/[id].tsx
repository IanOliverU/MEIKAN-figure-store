import { Href, router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddressForm } from '../../../../components/addresses/AddressForm';
import { useAddresses } from '../../../../components/addresses/AddressContext';

const ADDRESSES_ROUTE = '/addresses' as Href;

export default function EditAddressScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addresses, updateAddress } = useAddresses();
  const address = addresses.find((item) => item.id === id);

  if (!address) {
    return (
      <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
        <View className="flex-1 items-center justify-center px-7">
          <Text className="text-xl font-semibold text-white">Address not found</Text>
          <Pressable
            className="mt-8 h-12 flex-row items-center justify-center rounded-xl bg-[#C6A96B] px-7"
            onPress={() => router.replace(ADDRESSES_ROUTE)}
          >
            <Text className="text-sm font-semibold text-[#0A0A0A]">Back to Addresses</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <AddressForm
      title="Edit Address"
      initialAddress={address}
      onBack={() => router.back()}
      onSave={(input) => {
        updateAddress(address.id, input);
        router.replace(ADDRESSES_ROUTE);
      }}
    />
  );
}
