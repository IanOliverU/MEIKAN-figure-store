import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type AuthErrorProps = {
  message: string;
  tone?: 'error' | 'warning' | 'success';
};

const toneStyles = {
  error: {
    icon: 'alert-circle-outline',
    border: '#7F2A2A',
    background: '#2A1010',
    text: '#E08780',
  },
  warning: {
    icon: 'information-circle-outline',
    border: '#59510F',
    background: '#1F1D09',
    text: '#D0C777',
  },
  success: {
    icon: 'checkmark-circle-outline',
    border: '#275D3A',
    background: '#0E2417',
    text: '#76C796',
  },
} as const;

export function AuthError({ message, tone = 'error' }: AuthErrorProps) {
  const style = toneStyles[tone];

  return (
    <View
      className="flex-row items-start rounded-2xl px-4 py-3"
      style={{ backgroundColor: style.background, borderColor: style.border, borderWidth: 1 }}
    >
      <Ionicons name={style.icon} size={18} color={style.text} />
      <Text className="ml-3 min-w-0 flex-1 text-sm leading-5" style={{ color: style.text }}>
        {message}
      </Text>
    </View>
  );
}
