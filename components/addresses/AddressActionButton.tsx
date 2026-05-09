import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';

type AddressActionButtonProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  variant?: 'default' | 'accent' | 'danger';
  disabled?: boolean;
  onPress: () => void;
};

const variants = {
  default: {
    className: 'border-[#2A2A2A] bg-[#1A1A1A]',
    textClassName: 'text-[#A1A1A1]',
    iconColor: '#A1A1A1',
  },
  accent: {
    className: 'border-[#5F5131] bg-[#1A1710]',
    textClassName: 'text-[#C6A96B]',
    iconColor: '#C6A96B',
  },
  danger: {
    className: 'border-red-500/20 bg-red-500/10',
    textClassName: 'text-red-300',
    iconColor: '#F87171',
  },
};

export function AddressActionButton({
  label,
  icon,
  variant = 'default',
  disabled = false,
  onPress,
}: AddressActionButtonProps) {
  const style = variants[variant];

  return (
    <Pressable
      className={`min-h-9 flex-row items-center justify-center rounded-xl border px-3 py-2 ${style.className} ${
        disabled ? 'opacity-50' : ''
      }`}
      disabled={disabled}
      onPress={(event) => {
        event.stopPropagation();
        onPress();
      }}
      style={({ pressed }) => ({ opacity: pressed ? 0.72 : disabled ? 0.5 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] })}
    >
      <Ionicons name={icon} size={14} color={style.iconColor} />
      <Text className={`ml-1.5 text-xs font-semibold ${style.textClassName}`}>{label}</Text>
    </Pressable>
  );
}
