import 'react-native-gesture-handler';
import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1 bg-[#0A0A0A]">
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0A0A0A' },
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
