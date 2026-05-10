import 'react-native-gesture-handler';
import '../global.css';

import { Stack } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SplashScreen } from '../screens/SplashScreen';
import { AuthProvider } from '../services/supabase/authContext';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  useEffect(() => {
    StatusBar.setHidden(true, 'fade');
  }, []);

  return (
    <GestureHandlerRootView className="flex-1 bg-[#0A0A0A]">
      <SafeAreaProvider>
        <AuthProvider>
          <StatusBar barStyle="light-content" hidden translucent backgroundColor="transparent" />
          {showSplash ? (
            <SplashScreen onFinish={handleSplashFinish} />
          ) : (
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#0A0A0A' },
              }}
            />
          )}
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
