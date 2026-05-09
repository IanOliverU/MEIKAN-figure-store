import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthButton, AuthInput } from '../components/auth';

export default function RegisterScreen() {
  const router = useRouter();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCreateAccount = () => {
    setIsCreating(true);
    timeoutRef.current = setTimeout(() => {
      setIsCreating(false);
      router.replace('/(tabs)' as never);
    }, 650);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow justify-center px-5 py-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mx-auto w-full" style={{ maxWidth: 380 }}>
            <Pressable
              accessibilityRole="button"
              className="mb-5 h-11 w-11 items-center justify-center rounded-2xl border border-[#222222] bg-[#121212]"
              onPress={() => router.back()}
              style={({ pressed }) => ({ opacity: pressed ? 0.66 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
            >
              <Ionicons name="chevron-back" size={20} color="#A1A1A1" />
            </Pressable>

            <View className="rounded-[32px] border border-[#222222] bg-[#121212] px-6 py-9">
              <View>
                <Text className="text-2xl font-semibold text-white">Create account</Text>
                <Text className="mt-2 text-sm text-[#A1A1A1]">Start your MEIKAN collector profile</Text>
              </View>

              <View className="mt-8 gap-4">
                <AuthInput
                  label="Name"
                  value={name}
                  onChangeText={setName}
                  placeholder="Juan Dela Cruz"
                  iconName="person-outline"
                  autoCapitalize="words"
                  textContentType="name"
                  returnKeyType="next"
                />
                <AuthInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="juan@gmail.com"
                  iconName="mail-outline"
                  keyboardType="email-address"
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="next"
                />
                <AuthInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create password"
                  iconName="lock-closed-outline"
                  secureTextEntry
                  autoComplete="new-password"
                  textContentType="newPassword"
                  returnKeyType="done"
                  onSubmitEditing={handleCreateAccount}
                />
              </View>

              <View className="mt-7">
                <AuthButton
                  title="Create Account"
                  iconName="sparkles-outline"
                  loading={isCreating}
                  loadingTitle="Creating account..."
                  onPress={handleCreateAccount}
                />
              </View>

              <View className="mt-7 flex-row flex-wrap items-center justify-center">
                <Text className="text-sm text-[#666666]">Already collecting? </Text>
                <Pressable
                  accessibilityRole="link"
                  onPress={() => router.replace('/login' as never)}
                  style={({ pressed }) => ({ opacity: pressed ? 0.62 : 1 })}
                >
                  <Text className="text-sm font-semibold text-[#C6A96B]">Sign in</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
