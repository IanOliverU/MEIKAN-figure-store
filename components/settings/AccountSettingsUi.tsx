import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import {
  ActivityIndicator,
  KeyboardTypeOptions,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { AuthServiceErrorCode } from '../../services/supabase/authService';
import { Profile, ProfileServiceErrorCode } from '../../services/supabase/profileService';

type AccountHeaderProps = {
  title: string;
  subtitle?: string;
  onBack: () => void;
};

type StatusMessageProps = {
  type: 'error' | 'success';
  message: string;
};

type AccountActionButtonProps = {
  title: string;
  loadingTitle: string;
  iconName: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'danger';
  onPress: () => void;
};

type AccountTextInputProps = {
  label: string;
  value: string;
  placeholder: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  error?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  onChangeText: (value: string) => void;
};

type AccountCardProps = {
  children: ReactNode;
};

export const accountErrorMessages: Record<AuthServiceErrorCode | ProfileServiceErrorCode, string> = {
  email_exists: 'Email already exists.',
  email_not_confirmed: 'Please confirm your email before continuing.',
  invalid_credentials: 'Invalid email or password.',
  invalid_password: 'Invalid password.',
  missing_config: 'Supabase is missing its publishable key.',
  network_error: 'Network error. Please try again.',
  oauth_cancelled: 'Sign-in was cancelled.',
  session_expired: 'Session expired. Please sign in again.',
  username_taken: 'Username already taken.',
};

export function getAccountErrorMessage(error: unknown) {
  if (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    typeof error.code === 'string' &&
    error.code in accountErrorMessages
  ) {
    return accountErrorMessages[error.code as keyof typeof accountErrorMessages];
  }

  return 'Something went wrong. Please try again.';
}

export function AccountHeader({ title, subtitle, onBack }: AccountHeaderProps) {
  return (
    <View className="flex-row items-center">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        className="h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
        onPress={onBack}
        style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
      >
        <Ionicons name="chevron-back" size={18} color="#A1A1A1" />
      </Pressable>
      <View className="ml-4 min-w-0 flex-1">
        <Text className="text-xl font-semibold text-white" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-1 text-sm text-[#A1A1A1]" numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export function AccountCard({ children }: AccountCardProps) {
  return <View className="rounded-2xl border border-[#222222] bg-[#121212] p-4">{children}</View>;
}

export function AccountStatusMessage({ type, message }: StatusMessageProps) {
  const isSuccess = type === 'success';

  return (
    <View
      className={`flex-row items-center rounded-xl border px-3 py-2 ${
        isSuccess ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-red-500/20 bg-red-500/10'
      }`}
    >
      <Ionicons
        name={isSuccess ? 'checkmark-circle-outline' : 'alert-circle-outline'}
        size={15}
        color={isSuccess ? '#34D399' : '#F87171'}
      />
      <Text className={`ml-2 flex-1 text-xs ${isSuccess ? 'text-emerald-300' : 'text-red-300'}`}>{message}</Text>
    </View>
  );
}

export function AccountActionButton({
  title,
  loadingTitle,
  iconName,
  loading = false,
  disabled = false,
  variant = 'primary',
  onPress,
}: AccountActionButtonProps) {
  const isDisabled = disabled || loading;
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';
  const backgroundColor = isPrimary ? '#C6A96B' : '#121212';
  const borderColor = isDanger ? '#7F2A2A' : isPrimary ? '#C6A96B' : '#2A2A2A';
  const contentColor = isPrimary ? '#0A0A0A' : isDanger ? '#F87171' : '#F5F5F5';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: isDisabled ? 0.6 : pressed ? 0.82 : 1,
        transform: [{ scale: pressed && !isDisabled ? 0.985 : 1 }],
      })}
    >
      <View
        className="h-12 flex-row items-center justify-center rounded-xl px-5"
        style={{ backgroundColor, borderColor, borderWidth: isPrimary ? 0 : 1 }}
      >
        {loading ? <ActivityIndicator size="small" color={contentColor} /> : <Ionicons name={iconName} size={18} color={contentColor} />}
        <Text className="ml-2 text-sm font-semibold" style={{ color: contentColor }}>
          {loading ? loadingTitle : title}
        </Text>
      </View>
    </Pressable>
  );
}

export function AccountTextInput({
  label,
  value,
  placeholder,
  iconName,
  error,
  multiline = false,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  onChangeText,
}: AccountTextInputProps) {
  return (
    <View>
      <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#666666]">{label}</Text>
      <View
        className={`flex-row rounded-xl border bg-[#171717] px-4 ${
          error ? 'border-red-500/40' : 'border-[#242424]'
        } ${multiline ? 'min-h-28 items-start py-3' : 'h-12 items-center'}`}
      >
        {iconName ? <Ionicons name={iconName} size={18} color={error ? '#F87171' : '#777777'} /> : null}
        <TextInput
          className={`min-w-0 flex-1 text-base text-white ${iconName ? 'ml-3' : ''} ${multiline ? 'min-h-24 py-0' : 'h-full py-0'}`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#555555"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          selectionColor="#C6A96B"
          cursorColor="#C6A96B"
          onChangeText={onChangeText}
        />
      </View>
      {error ? <Text className="mt-2 text-xs text-red-300">{error}</Text> : null}
    </View>
  );
}

export function AccountAvatar({ profile }: { profile: Profile }) {
  const initial = profile.display_name.trim().charAt(0).toUpperCase() || profile.username.charAt(0).toUpperCase();

  return (
    <View className="h-20 w-20 items-center justify-center rounded-full border border-[#C6A96B]/50 bg-[#3A2E14]">
      <Text className="text-3xl font-semibold text-[#C6A96B]">{initial}</Text>
    </View>
  );
}

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between gap-4 py-3">
      <Text className="text-sm text-[#777777]">{label}</Text>
      <Text className="min-w-0 flex-1 text-right text-sm font-semibold text-white" numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}
