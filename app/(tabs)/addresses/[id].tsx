import { Ionicons } from '@expo/vector-icons';
import { Href, router, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddressActionButton } from '../../../components/addresses/AddressActionButton';
import { formatAddress } from '../../../components/addresses/AddressCard';
import { useAddresses } from '../../../components/addresses/AddressContext';
import { AddressLabelBadge } from '../../../components/addresses/AddressLabelBadge';
import { DefaultBadge } from '../../../components/addresses/DefaultBadge';

const ADDRESSES_ROUTE = '/addresses' as Href;

function editAddressRoute(addressId: string) {
  return `/addresses/edit/${addressId}` as Href;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="border-b border-[#222222] py-4">
      <Text className="text-xs font-semibold uppercase tracking-wider text-[#666666]">{label}</Text>
      <Text className="mt-1 text-base font-semibold leading-5 text-white">{value}</Text>
    </View>
  );
}

export default function AddressDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addresses, deleteAddress, setDefaultAddress } = useAddresses();
  const address = addresses.find((item) => item.id === id);

  const handleDelete = () => {
    if (!address) {
      return;
    }

    Alert.alert('Delete this address?', `${address.label} address for ${address.recipientName} will be removed.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteAddress(address.id);
          router.replace(ADDRESSES_ROUTE);
        },
      },
    ]);
  };

  if (!address) {
    return (
      <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
        <View className="flex-1 items-center justify-center px-7">
          <View className="h-20 w-20 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#171717]">
            <Ionicons name="location-outline" size={34} color="#5F5F5F" />
          </View>
          <Text className="mt-6 text-xl font-semibold text-white">Address not found</Text>
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
          <Text className="ml-4 text-xl font-semibold text-white">Address Details</Text>
        </View>

        <View className={`mt-8 rounded-2xl border bg-[#121212] p-5 ${address.isDefault ? 'border-[#5F5131]' : 'border-[#222222]'}`}>
          <View className="flex-row flex-wrap items-center gap-2">
            <AddressLabelBadge label={address.label} />
            {address.isDefault ? <DefaultBadge /> : null}
          </View>
          <Text className="mt-5 text-xl font-semibold text-white">{address.recipientName}</Text>
          <Text className="mt-2 text-sm leading-5 text-[#A1A1A1]">{formatAddress(address)}</Text>
          <Text className="mt-3 text-sm font-semibold text-[#A1A1A1]">{address.phone}</Text>
        </View>

        <View className="mt-7">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Shipping Address</Text>
          <View className="rounded-2xl border border-[#222222] bg-[#121212] px-4">
            <DetailRow label="Recipient" value={address.recipientName} />
            <DetailRow label="Street Address" value={address.street} />
            <DetailRow label="Barangay / Area" value={address.barangay} />
            <DetailRow label="City / Province" value={`${address.city}, ${address.province}`} />
            <DetailRow label="Postal Code" value={address.postalCode} />
            <View className="py-4">
              <Text className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Country</Text>
              <Text className="mt-1 text-base font-semibold leading-5 text-white">{address.country}</Text>
            </View>
          </View>
        </View>

        <View className="mt-7">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Actions</Text>
          <View className="gap-3">
            <AddressActionButton
              label="Edit Address"
              icon="create-outline"
              variant="accent"
              onPress={() => router.push(editAddressRoute(address.id))}
            />
            <AddressActionButton
              label={address.isDefault ? 'Default Address' : 'Set as Default'}
              icon={address.isDefault ? 'checkmark-circle-outline' : 'star-outline'}
              disabled={address.isDefault}
              onPress={() => setDefaultAddress(address.id)}
            />
            <AddressActionButton label="Delete Address" icon="trash-outline" variant="danger" onPress={handleDelete} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
