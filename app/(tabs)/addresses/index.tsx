import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddressCard } from '../../../components/addresses/AddressCard';
import { useAddresses } from '../../../components/addresses/AddressContext';

const ADD_ADDRESS_ROUTE = '/addresses/add' as Href;

function addressDetailRoute(addressId: string) {
  return `/addresses/${addressId}` as Href;
}

function editAddressRoute(addressId: string) {
  return `/addresses/edit/${addressId}` as Href;
}

export default function AddressesScreen() {
  const { addresses, deleteAddress, setDefaultAddress } = useAddresses();

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-28 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center">
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
            onPress={() => router.back()}
            style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
          >
            <Ionicons name="chevron-back" size={18} color="#A1A1A1" />
          </Pressable>
          <View className="ml-4">
            <Text className="text-xl font-semibold text-white">Addresses</Text>
            <Text className="mt-1 text-sm text-[#A1A1A1]">{addresses.length} saved addresses</Text>
          </View>
        </View>

        {addresses.length > 0 ? (
          <View className="mt-8">
            <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Saved Addresses</Text>
            <View className="gap-4">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onPress={() => router.push(addressDetailRoute(address.id))}
                  onEdit={() => router.push(editAddressRoute(address.id))}
                  onSetDefault={() => setDefaultAddress(address.id)}
                  onDelete={() => deleteAddress(address.id)}
                />
              ))}
            </View>
          </View>
        ) : (
          <View className="items-center justify-center px-7 py-24">
            <View className="h-20 w-20 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#171717]">
              <Ionicons name="location-outline" size={34} color="#5F5F5F" />
            </View>
            <Text className="mt-6 text-xl font-semibold text-white">No saved addresses yet</Text>
            <Text className="mt-3 text-center text-sm leading-5 text-[#777777]">
              Add a delivery address for faster checkout later.
            </Text>
            <Pressable
              className="mt-8 h-12 flex-row items-center justify-center rounded-xl bg-[#C6A96B] px-7"
              onPress={() => router.push(ADD_ADDRESS_ROUTE)}
              style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}
            >
              <Ionicons name="add" size={18} color="#0A0A0A" />
              <Text className="ml-2 text-sm font-semibold text-[#0A0A0A]">Add new address</Text>
            </Pressable>
          </View>
        )}

        {addresses.length > 0 ? (
          <Pressable
            className="mt-6 min-h-14 flex-row items-center justify-center rounded-2xl border border-dashed border-[#333333] bg-[#121212] px-5 py-4"
            onPress={() => router.push(ADD_ADDRESS_ROUTE)}
            style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
          >
            <Ionicons name="add" size={18} color="#C6A96B" />
            <Text className="ml-2 text-sm font-semibold text-[#C6A96B]">Add new address</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
