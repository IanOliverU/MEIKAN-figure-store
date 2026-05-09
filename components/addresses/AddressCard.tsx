import { Alert, Pressable, Text, View } from 'react-native';

import { AddressActionButton } from './AddressActionButton';
import { SavedAddress } from './AddressContext';
import { AddressLabelBadge } from './AddressLabelBadge';
import { DefaultBadge } from './DefaultBadge';

type AddressCardProps = {
  address: SavedAddress;
  onPress: () => void;
  onEdit: () => void;
  onSetDefault: () => void;
  onDelete: () => void;
};

export function formatAddress(address: SavedAddress) {
  return `${address.street}, ${address.barangay}, ${address.city}, ${address.province} ${address.postalCode}, ${address.country}`;
}

export function AddressCard({ address, onPress, onEdit, onSetDefault, onDelete }: AddressCardProps) {
  const confirmDelete = () => {
    Alert.alert('Delete this address?', `${address.label} address for ${address.recipientName} will be removed.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: onDelete },
    ]);
  };

  return (
    <Pressable
      className={`rounded-2xl border bg-[#121212] p-4 ${address.isDefault ? 'border-[#5F5131]' : 'border-[#222222]'}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.86 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
    >
      <View className="flex-row flex-wrap items-center gap-2">
        <AddressLabelBadge label={address.label} />
        {address.isDefault ? <DefaultBadge /> : null}
      </View>

      <Text className="mt-4 text-base font-semibold text-white">{address.recipientName}</Text>
      <Text className="mt-2 text-sm leading-5 text-[#A1A1A1]">{formatAddress(address)}</Text>
      <Text className="mt-2 text-sm font-semibold text-[#A1A1A1]">{address.phone}</Text>

      <View className="mt-4 flex-row flex-wrap gap-2">
        <AddressActionButton label="Edit" icon="create-outline" onPress={onEdit} />
        <AddressActionButton
          label={address.isDefault ? 'Default' : 'Set Default'}
          icon={address.isDefault ? 'checkmark-circle-outline' : 'star-outline'}
          variant={address.isDefault ? 'accent' : 'default'}
          disabled={address.isDefault}
          onPress={onSetDefault}
        />
        <AddressActionButton label="Delete" icon="trash-outline" variant="danger" onPress={confirmDelete} />
      </View>
    </Pressable>
  );
}
