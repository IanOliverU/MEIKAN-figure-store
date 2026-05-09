import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

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
  const borderColor = isPrimary ? '#C6A96B' : isGhost ? 'transparent' : '#222222';
  const contentColor = isPrimary ? '#0A0A0A' : '#F5F5F5';
  const hasLeadingIcon = loading || Boolean(iconName);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className="w-full"
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: isDisabled ? 0.62 : pressed ? 0.86 : 1,
        transform: [{ scale: pressed && !isDisabled ? 0.985 : 1 }],
      })}
    >
      <View
        className="w-full flex-row items-center justify-center px-5"
        style={{
          backgroundColor,
          borderColor,
          borderRadius: isPrimary ? 14 : 16,
          borderWidth: isPrimary || isGhost ? 0 : 1,
          height: 54,
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color={contentColor} />
        ) : iconName ? (
          <Ionicons name={iconName} size={18} color={contentColor} />
        ) : null}
        <Text
          className="text-base font-semibold"
          style={{ color: contentColor, marginLeft: hasLeadingIcon ? 9 : 0 }}
        >
          {loading ? loadingTitle : title}
        </Text>
      </View>
    </Pressable>
  );
}
