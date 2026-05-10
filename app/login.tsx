import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthButton, AuthDivider, AuthError, AuthInput } from '../components/auth';
import { signInWithEmail, signInWithGoogle } from '../services/supabase/authService';
import { useAuth } from '../services/supabase/authContext';

function BrandMark() {
  return (
    <View className="items-center">
      <View className="h-16 w-16 items-center justify-center rounded-2xl border border-[#222222] bg-[#1A1A1A]">
        <Ionicons name="cube" size={25} color="#C6A96B" />
      </View>
      <View className="mt-4 flex-row items-baseline">
        <Text className="text-2xl font-semibold tracking-[4px] text-white">MEIK</Text>
        <Text className="text-2xl font-semibold tracking-[4px] text-[#C6A96B]">A</Text>
        <Text className="text-2xl font-semibold tracking-[4px] text-white">N</Text>
      </View>
      <Text className="mt-1 text-sm text-[#666666]">Premium Anime Figures</Text>
    </View>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ state?: string }>();
  const { session } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningInWithGoogle, setIsSigningInWithGoogle] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showInvalidError = params.state === 'error';
  const showAttemptsError = params.state === 'attempts';

  useEffect(() => {
    if (session) {
      router.replace('/(tabs)' as never);
    }
  }, [router, session]);

  const handleSignIn = async () => {
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Enter your email and password to continue.');
      return;
    }

    setIsSigningIn(true);

    try {
      await signInWithEmail(email, password);
      router.replace('/(tabs)' as never);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Unable to sign in right now. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    setIsSigningInWithGoogle(true);

    try {
      await signInWithGoogle();
      router.replace('/(tabs)' as never);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Unable to sign in with Google right now. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsSigningInWithGoogle(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow justify-center px-5 py-10"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mx-auto w-full" style={{ maxWidth: 390 }}>
            <View className="rounded-[32px] border border-[#222222] bg-[#121212] px-7 py-10">
              <BrandMark />

              <View className="mt-12">
                <Text className="text-[26px] font-semibold text-white">Welcome back</Text>
                <Text className="mt-1.5 text-sm text-[#A1A1A1]">Sign in to your collector account</Text>
              </View>

              <View className="mt-7 gap-5">
                {showInvalidError ? <AuthError message="Invalid email or password. Please try again." /> : null}
                {errorMessage ? <AuthError message={errorMessage} /> : null}
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
                  error={showInvalidError ? 'Check the email used for this account.' : undefined}
                />
                <AuthInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter password"
                  iconName="lock-closed-outline"
                  secureTextEntry
                  autoComplete="password"
                  textContentType="password"
                  returnKeyType="done"
                  onSubmitEditing={handleSignIn}
                  error={showInvalidError ? 'Incorrect password.' : undefined}
                />
              </View>

              <Pressable
                accessibilityRole="button"
                className="mt-4 self-end py-1.5"
                onPress={() => router.push('/forgot-password' as never)}
                style={({ pressed }) => ({ opacity: pressed ? 0.62 : 1 })}
              >
                <Text className="text-xs font-medium text-[#C6A96B]">Forgot password?</Text>
              </Pressable>

              <View className="mt-5">
                <AuthButton
                  title="Sign In"
                  iconName="log-in-outline"
                  loading={isSigningIn}
                  onPress={handleSignIn}
                />
              </View>

              <View className="my-6">
                <AuthDivider />
              </View>

              <AuthButton
                title="Continue with Google"
                variant="outline"
                iconName="logo-google"
                loading={isSigningInWithGoogle}
                loadingTitle="Opening Google..."
                onPress={handleGoogleLogin}
              />

              {showAttemptsError ? (
                <View className="mt-6">
                  <AuthError
                    tone="warning"
                    message="Too many attempts. Try again in 30s or reset your password."
                  />
                </View>
              ) : null}

              <View className="mt-8 flex-row flex-wrap items-center justify-center">
                <Text className="text-sm text-[#666666]">New collector? </Text>
                <Pressable
                  accessibilityRole="link"
                  onPress={() => router.push('/register' as never)}
                  style={({ pressed }) => ({ opacity: pressed ? 0.62 : 1 })}
                >
                  <Text className="text-sm font-semibold text-[#C6A96B]">Create an account</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
