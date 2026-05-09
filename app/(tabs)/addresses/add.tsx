import { Href, router } from 'expo-router';

import { AddressForm } from '../../../components/addresses/AddressForm';
import { useAddresses } from '../../../components/addresses/AddressContext';

const ADDRESSES_ROUTE = '/addresses' as Href;

export default function AddAddressScreen() {
  const { addAddress } = useAddresses();

  return (
    <AddressForm
      title="Add Address"
      onBack={() => router.back()}
      onSave={(input) => {
        addAddress(input);
        router.replace(ADDRESSES_ROUTE);
      }}
    />
  );
}
