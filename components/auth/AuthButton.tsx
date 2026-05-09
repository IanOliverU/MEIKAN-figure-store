import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, Text } from 'react-native';

type AuthButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  iconName?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  loadingTitle?: string;
  disabled?: boolean;
};

export function AuthButton({
  title,
  onPress,
  variant = 'primary',
  iconName,
  loading = false,
  loadingTitle = 'Signing in...',
  disabled = false,
}: AuthButtonProps) {
  const isDisabled = disabled || loading;
  const isPrimary = variant === 'primary';
  const isGhost = variant === 'ghost';
  const backgroundColor = isPrimary ? '#C6A96B' : isGhost ? 'transparent' : '#121212';
  const borderColor = isPrimary ? '#C6A96B' : isGhost ? 'transparent' : '#2A2A2A';
  const contentColor = isPrimary ? '#0A0A0A' : '#FFFFFF';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className="flex-row items-center justify-center"
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor,
        borderColor,
        borderWidth: isPrimary || isGhost ? 0 : 1,
        borderRadius: isPrimary ? 14 : 16,
        height: isPrimary ? 52 : 56,
        opacity: isDisabled ? 0.62 : pressed ? 0.82 : 1,
        transform: [{ scale: pressed && !isDisabled ? 0.98 : 1 }],
      })}
    >
      {loading ? (
        <ActivityIndicator size="small" color={contentColor} />
      ) : iconName ? (
        <Ionicons name={iconName} size={18} color={contentColor} />
      ) : null}
      <Text className="ml-2 text-base font-medium" style={{ color: contentColor }}>
        {loading ? loadingTitle : title}
      </Text>
    </Pressable>
  );
}
