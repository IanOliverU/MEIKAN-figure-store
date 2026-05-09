import { Ionicons } from '@expo/vector-icons';
import { Pressable, Switch, Text, View } from 'react-native';

type NotificationToggleRowProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  value: boolean;
  disabled?: boolean;
  showDivider?: boolean;
  onToggle: (value: boolean) => void;
};

export function NotificationToggleRow({
  iconName,
  title,
  subtitle,
  value,
  disabled = false,
  showDivider = false,
  onToggle,
}: NotificationToggleRowProps) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      className={`px-4 py-4 ${showDivider ? 'border-b border-[#222222]' : ''} ${disabled ? 'opacity-50' : ''}`}
      disabled={disabled}
      onPress={() => onToggle(!value)}
      style={({ pressed }) => ({ opacity: disabled ? 0.5 : pressed ? 0.78 : 1 })}
    >
      <View className="flex-row items-center">
        <View className={`h-11 w-11 items-center justify-center rounded-xl border ${value ? 'border-[#C6A96B]/40 bg-[#1A1710]' : 'border-[#2A2A2A] bg-[#1A1A1A]'}`}>
          <Ionicons name={iconName} size={20} color={value ? '#C6A96B' : '#777777'} />
        </View>
        <View className="ml-4 min-w-0 flex-1">
          <Text className="text-base font-semibold text-white">{title}</Text>
          <Text className="mt-1 text-sm leading-5 text-[#A1A1A1]">{subtitle}</Text>
        </View>
        <Switch
          value={value}
          disabled={disabled}
          onValueChange={onToggle}
          trackColor={{ false: '#2A2A2A', true: '#6F5D36' }}
          thumbColor={value ? '#C6A96B' : '#777777'}
          ios_backgroundColor="#2A2A2A"
        />
      </View>
    </Pressable>
  );
}
