import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AccountActionButton,
  AccountHeader,
  AccountStatusMessage,
  AccountTextInput,
  getAccountErrorMessage,
} from '../../../components/settings/AccountSettingsUi';
import { updatePassword } from '../../../services/supabase/authService';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const currentPasswordError = submitted && !currentPassword ? 'Current password is required.' : undefined;
  const newPasswordError =
    submitted && newPassword.length < 8 ? 'Use at least 8 characters for the new password.' : undefined;
  const confirmPasswordError =
    submitted && confirmPassword !== newPassword ? 'Passwords do not match.' : undefined;

  const handleUpdatePassword = async () => {
    setSubmitted(true);
    setSuccess(null);
    setError(null);

    if (!currentPassword || newPassword.length < 8 || confirmPassword !== newPassword) {
      return;
    }

    setLoading(true);

    try {
      await updatePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSubmitted(false);
      setSuccess('Password updated.');
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
          <AccountHeader title="Change Password" subtitle="Re-enter your current password before updating it." onBack={() => router.back()} />

          <View className="mt-8 gap-5">
            <AccountTextInput
              label="Current Password"
              value={currentPassword}
              placeholder="Current password"
              iconName="lock-closed-outline"
              secureTextEntry
              error={currentPasswordError}
              onChangeText={setCurrentPassword}
            />
            <AccountTextInput
              label="New Password"
              value={newPassword}
              placeholder="New password"
              iconName="key-outline"
              secureTextEntry
              error={newPasswordError}
              onChangeText={setNewPassword}
            />
            <AccountTextInput
              label="Confirm Password"
              value={confirmPassword}
              placeholder="Confirm password"
              iconName="shield-checkmark-outline"
              secureTextEntry
              error={confirmPasswordError}
              onChangeText={setConfirmPassword}
            />
          </View>

          <View className="mt-6 gap-3">
            {success ? <AccountStatusMessage type="success" message={success} /> : null}
            {error ? <AccountStatusMessage type="error" message={error} /> : null}
            <AccountActionButton
              title="Update Password"
              loadingTitle="Updating password..."
              iconName="lock-open-outline"
              loading={loading}
              onPress={handleUpdatePassword}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
