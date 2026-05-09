import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ConfirmationModal } from '../../../components/settings/security/ConfirmationModal';
import { DeleteAccountCard } from '../../../components/settings/security/DeleteAccountCard';
import { SecurityToggleCard } from '../../../components/settings/security/SecurityToggleCard';
import { SessionCard } from '../../../components/settings/security/SessionCard';
import {
  ActiveSession,
  SecuritySettings,
  disableTwoFactor,
  enableTwoFactor,
  getSecuritySettings,
  requestAccountDeletion,
  revokeSession,
} from '../../../services/supabase/securityService';

type TwoFactorMethod = 'authenticator' | 'sms';

const fallbackSettings: SecuritySettings = {
  user_id: 'mock-user-id',
  two_factor_enabled: false,
  last_login_at: '2026-05-10T00:00:00.000Z',
  active_sessions: [],
};

function Header() {
  return (
    <View className="flex-row items-center">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        className="h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
        onPress={() => router.back()}
        style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
      >
        <Ionicons name="chevron-back" size={18} color="#A1A1A1" />
      </Pressable>
      <View className="ml-4 min-w-0 flex-1">
        <Text className="text-xl font-semibold text-white">Privacy & Security</Text>
        <Text className="mt-1 text-sm text-[#A1A1A1]">Manage your account security</Text>
      </View>
    </View>
  );
}

function StatusPill({ message, tone = 'success' }: { message: string; tone?: 'success' | 'warning' }) {
  const success = tone === 'success';

  return (
    <View
      className={`self-start flex-row items-center rounded-full border px-3 py-2 ${
        success ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-orange-500/20 bg-orange-500/10'
      }`}
    >
      <Ionicons name={success ? 'checkmark-circle-outline' : 'alert-circle-outline'} size={14} color={success ? '#34D399' : '#F59E0B'} />
      <Text className={`ml-2 text-xs font-semibold ${success ? 'text-emerald-300' : 'text-orange-300'}`}>{message}</Text>
    </View>
  );
}

export default function PrivacySecurityScreen() {
  const [settings, setSettings] = useState<SecuritySettings>(fallbackSettings);
  const [twoFactorModalVisible, setTwoFactorModalVisible] = useState(false);
  const [twoFactorMethod, setTwoFactorMethod] = useState<TwoFactorMethod>('authenticator');
  const [verificationCode, setVerificationCode] = useState('');
  const [disableTwoFactorVisible, setDisableTwoFactorVisible] = useState(false);
  const [sessionToRevoke, setSessionToRevoke] = useState<ActiveSession | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteSuccessVisible, setDeleteSuccessVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getSecuritySettings().then(setSettings);

    return () => {
      if (statusTimer.current) {
        clearTimeout(statusTimer.current);
      }
    };
  }, []);

  const activeSessions = useMemo(() => settings.active_sessions, [settings.active_sessions]);
  const deleteReady = deleteConfirmation.trim() === 'DELETE';

  const showStatus = (message: string) => {
    setStatusMessage(message);

    if (statusTimer.current) {
      clearTimeout(statusTimer.current);
    }

    statusTimer.current = setTimeout(() => setStatusMessage(null), 2200);
  };

  const handleTwoFactorToggle = (value: boolean) => {
    if (value) {
      setTwoFactorModalVisible(true);
      return;
    }

    setDisableTwoFactorVisible(true);
  };

  const handleEnableTwoFactor = async () => {
    if (!verificationCode.trim()) {
      return;
    }

    setLoadingAction('enable-2fa');

    try {
      await enableTwoFactor(twoFactorMethod, verificationCode);
      setSettings((currentSettings) => ({ ...currentSettings, two_factor_enabled: true }));
      setTwoFactorModalVisible(false);
      setVerificationCode('');
      showStatus('Two-factor authentication enabled');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDisableTwoFactor = async () => {
    setLoadingAction('disable-2fa');

    try {
      await disableTwoFactor();
      setSettings((currentSettings) => ({ ...currentSettings, two_factor_enabled: false }));
      setDisableTwoFactorVisible(false);
      showStatus('Two-factor authentication disabled');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRevokeSession = async () => {
    if (!sessionToRevoke) {
      return;
    }

    setLoadingAction(`revoke-${sessionToRevoke.id}`);

    try {
      await revokeSession(sessionToRevoke.id);
      setSettings((currentSettings) => ({
        ...currentSettings,
        active_sessions: currentSettings.active_sessions.filter((session) => session.id !== sessionToRevoke.id),
      }));
      setSessionToRevoke(null);
      showStatus('Session revoked locally');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeleteRequest = async () => {
    if (!deleteReady) {
      return;
    }

    setLoadingAction('delete-account');

    try {
      await requestAccountDeletion(deleteConfirmation.trim());
      setDeleteModalVisible(false);
      setDeleteConfirmation('');
      setDeleteSuccessVisible(true);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-28 pt-5" showsVerticalScrollIndicator={false}>
        <Header />

        <View className="mt-8">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Two-Factor Authentication</Text>
          <SecurityToggleCard
            title="Two-Factor Authentication"
            subtitle="Add an extra layer of protection to your account"
            value={settings.two_factor_enabled}
            loading={Boolean(loadingAction)}
            onToggle={handleTwoFactorToggle}
          />
        </View>

        <View className="mt-7">
          <View className="mb-3 flex-row items-end justify-between">
            <Text className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Active Sessions / Devices</Text>
            <Text className="text-xs text-[#777777]">{activeSessions.length} active</Text>
          </View>
          <View className="gap-4">
            {activeSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                loading={loadingAction === `revoke-${session.id}`}
                onRevoke={() => setSessionToRevoke(session)}
              />
            ))}
          </View>
        </View>

        <View className="mt-7">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Delete Account Section</Text>
          <DeleteAccountCard onPress={() => setDeleteModalVisible(true)} />
        </View>

        <View className="mt-6 min-h-10 justify-center">
          {statusMessage ? <StatusPill message={statusMessage} /> : null}
        </View>
      </ScrollView>

      <ConfirmationModal
        visible={twoFactorModalVisible}
        title="Set Up Two-Factor Authentication"
        message="Choose a mock verification method and enter any code to simulate setup."
        confirmLabel="Enable 2FA"
        tone="success"
        loading={loadingAction === 'enable-2fa'}
        onCancel={() => {
          setTwoFactorModalVisible(false);
          setVerificationCode('');
        }}
        onConfirm={handleEnableTwoFactor}
      >
        <View className="gap-3">
          <View className="flex-row gap-3">
            {[
              { value: 'authenticator' as const, label: 'Authenticator App' },
              { value: 'sms' as const, label: 'SMS' },
            ].map((method) => {
              const active = twoFactorMethod === method.value;

              return (
                <Pressable
                  key={method.value}
                  className={`min-h-12 flex-1 items-center justify-center rounded-xl border px-3 ${
                    active ? 'border-[#C6A96B] bg-[#1A1710]' : 'border-[#2A2A2A] bg-[#1A1A1A]'
                  }`}
                  onPress={() => setTwoFactorMethod(method.value)}
                  style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1 })}
                >
                  <Text className={`text-center text-xs font-semibold ${active ? 'text-[#C6A96B]' : 'text-white'}`}>
                    {method.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View>
            <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#666666]">Verification Code</Text>
            <TextInput
              className="h-12 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 text-base text-white"
              value={verificationCode}
              placeholder="123456"
              placeholderTextColor="#555555"
              keyboardType="number-pad"
              maxLength={6}
              selectionColor="#C6A96B"
              cursorColor="#C6A96B"
              onChangeText={(value) => setVerificationCode(value.replace(/\D/g, '').slice(0, 6))}
            />
          </View>
        </View>
      </ConfirmationModal>

      <ConfirmationModal
        visible={disableTwoFactorVisible}
        title="Disable two-factor authentication?"
        message="Your account will no longer require a second verification step when this mock setting is off."
        confirmLabel="Disable 2FA"
        tone="warning"
        loading={loadingAction === 'disable-2fa'}
        onCancel={() => setDisableTwoFactorVisible(false)}
        onConfirm={handleDisableTwoFactor}
      />

      <ConfirmationModal
        visible={Boolean(sessionToRevoke)}
        title="Revoke session?"
        message={
          sessionToRevoke
            ? `${sessionToRevoke.device_name} will be removed from the local active sessions list.`
            : 'This session will be removed.'
        }
        confirmLabel="Revoke Session"
        tone="danger"
        loading={sessionToRevoke ? loadingAction === `revoke-${sessionToRevoke.id}` : false}
        onCancel={() => setSessionToRevoke(null)}
        onConfirm={handleRevokeSession}
      />

      <ConfirmationModal
        visible={deleteModalVisible}
        title="Are you sure?"
        message="This action cannot be undone. Type DELETE to simulate an account deletion request."
        confirmLabel="Delete Account"
        tone="danger"
        loading={loadingAction === 'delete-account'}
        onCancel={() => {
          setDeleteModalVisible(false);
          setDeleteConfirmation('');
        }}
        onConfirm={handleDeleteRequest}
      >
        <View>
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#666666]">Confirmation</Text>
          <TextInput
            className={`h-12 rounded-xl border bg-[#1A1A1A] px-4 text-base text-white ${
              deleteConfirmation && !deleteReady ? 'border-[#7F2A2A]' : 'border-[#2A2A2A]'
            }`}
            value={deleteConfirmation}
            placeholder="Type DELETE"
            placeholderTextColor="#555555"
            autoCapitalize="characters"
            selectionColor="#C6A96B"
            cursorColor="#C6A96B"
            onChangeText={setDeleteConfirmation}
          />
          {deleteConfirmation && !deleteReady ? <Text className="mt-2 text-xs text-[#F87171]">Type DELETE exactly to continue.</Text> : null}
        </View>
      </ConfirmationModal>

      <ConfirmationModal
        visible={deleteSuccessVisible}
        title="Mock deletion requested"
        message="No account was deleted. This screen only confirms the local mock flow."
        confirmLabel="Done"
        cancelLabel="Close"
        tone="success"
        onCancel={() => setDeleteSuccessVisible(false)}
        onConfirm={() => setDeleteSuccessVisible(false)}
      />
    </SafeAreaView>
  );
}
