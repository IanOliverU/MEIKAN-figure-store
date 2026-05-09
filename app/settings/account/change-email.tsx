import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AccountActionButton,
  AccountHeader,
  AccountStatusMessage,
  AccountTextInput,
  getAccountErrorMessage,
} from '../../../components/settings/AccountSettingsUi';
import { updateEmail } from '../../../services/supabase/authService';
import { getProfile } from '../../../services/supabase/profileService';

export default function ChangeEmailScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getProfile().then((profile) => setEmail(profile.email));
  }, []);

  const emailError =
    submitted && !/^\S+@\S+\.\S+$/.test(email.trim()) ? 'Enter a valid email address.' : undefined;

  const handleUpdateEmail = async () => {
    setSubmitted(true);
    setSuccess(null);
    setError(null);

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      return;
    }

    setLoading(true);

    try {
      await updateEmail(email);
      setSuccess('Email updated locally.');
    } catch (updateError) {
      setError(getAccountErrorMessage(updateError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pb-28 pt-5"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AccountHeader title="Change Email" subtitle="Auth email mock, ready for Supabase Auth." onBack={() => router.back()} />

          <View className="mt-8">
            <AccountTextInput
              label="Email"
              value={email}
              placeholder="juan@example.com"
              iconName="mail-outline"
              keyboardType="email-address"
              error={emailError}
              onChangeText={setEmail}
            />
          </View>

          <View className="mt-6 gap-3">
            {success ? <AccountStatusMessage type="success" message={success} /> : null}
            {error ? <AccountStatusMessage type="error" message={error} /> : null}
            <AccountActionButton
              title="Update Email"
              loadingTitle="Updating email..."
              iconName="mail-unread-outline"
              loading={loading}
              onPress={handleUpdateEmail}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
