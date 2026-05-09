import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { AddressLabel } from './AddressLabelBadge';

export type AddressInput = {
  label: AddressLabel;
  recipientName: string;
  phone: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export type SavedAddress = AddressInput & {
  id: string;
};

type AddressContextValue = {
  addresses: SavedAddress[];
  addAddress: (input: AddressInput) => SavedAddress;
  updateAddress: (addressId: string, input: AddressInput) => void;
  deleteAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
};

const AddressContext = createContext<AddressContextValue | null>(null);

const initialAddresses: SavedAddress[] = [
  {
    id: 'home-main',
    label: 'Home',
    recipientName: 'Juan dela Cruz',
    phone: '+63 917 123 4567',
    street: 'Blk 5 Lot 12 Sampaguita Street',
    barangay: 'Barangay Graceville',
    city: 'San Jose del Monte',
    province: 'Bulacan',
    postalCode: '3023',
    country: 'Philippines',
    isDefault: true,
  },
  {
    id: 'office-makati',
    label: 'Office',
    recipientName: 'Juan dela Cruz',
    phone: '+63 917 765 4321',
    street: 'Unit 4B Chino Roces Avenue',
    barangay: 'Pio del Pilar',
    city: 'Makati City',
    province: 'Metro Manila',
    postalCode: '1230',
    country: 'Philippines',
    isDefault: false,
  },
];

function withDefaultRule(addresses: SavedAddress[], defaultId?: string) {
  if (addresses.length === 0) {
    return addresses;
  }

  if (defaultId) {
    return addresses.map((address) => ({ ...address, isDefault: address.id === defaultId }));
  }

  if (addresses.some((address) => address.isDefault)) {
    return addresses;
  }

  return addresses.map((address, index) => ({ ...address, isDefault: index === 0 }));
}

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<SavedAddress[]>(initialAddresses);

  const value = useMemo<AddressContextValue>(
    () => ({
      addresses,
      addAddress: (input) => {
        const newAddress: SavedAddress = {
          ...input,
          id: `mock-address-${Date.now()}`,
        };

        setAddresses((currentAddresses) => {
          const nextAddresses = [...currentAddresses, newAddress];
          return withDefaultRule(nextAddresses, input.isDefault || currentAddresses.length === 0 ? newAddress.id : undefined);
        });

        return newAddress;
      },
      updateAddress: (addressId, input) => {
        setAddresses((currentAddresses) => {
          const nextAddresses = currentAddresses.map((address) =>
            address.id === addressId ? { ...address, ...input, id: address.id } : address,
          );

          return withDefaultRule(nextAddresses, input.isDefault ? addressId : undefined);
        });
      },
      deleteAddress: (addressId) => {
        setAddresses((currentAddresses) => {
          const removed = currentAddresses.find((address) => address.id === addressId);
          const remaining = currentAddresses.filter((address) => address.id !== addressId);

          if (!removed?.isDefault) {
            return remaining;
          }

          return withDefaultRule(remaining);
        });
      },
      setDefaultAddress: (addressId) => {
        setAddresses((currentAddresses) => withDefaultRule(currentAddresses, addressId));
      },
    }),
    [addresses],
  );

  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>;
}

export function useAddresses() {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error('useAddresses must be used within AddressProvider');
  }

  return context;
}
