import { Stack } from 'expo-router';

export default function AddressesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0A0A0A' },
      }}
    />
  );
}
