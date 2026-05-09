import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthButton, AuthError, AuthInput } from '../components/auth';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleReset = () => {
    console.log('Password reset placeholder pressed', { email });
    setShowSuccess(true);
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
              <View className="h-16 w-16 items-center justify-center rounded-2xl border border-[#222222] bg-[#1A1A1A]">
                <Ionicons name="key-outline" size={26} color="#C6A96B" />
              </View>

              <View className="mt-7">
                <Text className="text-2xl font-semibold text-white">Reset password</Text>
                <Text className="mt-2 text-sm leading-5 text-[#A1A1A1]">
                  Enter your collector email and we will prepare the reset flow.
                </Text>
              </View>

              <View className="mt-8 gap-4">
                {showSuccess ? (
                  <AuthError tone="success" message="Reset screen placeholder is ready for Supabase email delivery later." />
                ) : null}
                <AuthInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="juan@gmail.com"
                  iconName="mail-outline"
                  keyboardType="email-address"
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="done"
                  onSubmitEditing={handleReset}
                />
              </View>

              <View className="mt-7">
                <AuthButton title="Send Reset Link" iconName="send-outline" onPress={handleReset} />
              </View>

              <Pressable
                accessibilityRole="link"
                className="mt-6 items-center"
                onPress={() => router.replace('/login' as never)}
                style={({ pressed }) => ({ opacity: pressed ? 0.62 : 1 })}
              >
                <Text className="text-sm font-semibold text-[#C6A96B]">Back to sign in</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
