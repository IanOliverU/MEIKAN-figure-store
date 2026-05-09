import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type NotificationInfoCardProps = {
  message: string;
  tone?: 'neutral' | 'success';
};

export function NotificationInfoCard({ message, tone = 'neutral' }: NotificationInfoCardProps) {
  const isSuccess = tone === 'success';

  return (
    <View
      className={`flex-row items-center rounded-xl border px-3 py-2 ${
        isSuccess ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-[#2A2A2A] bg-[#121212]'
      }`}
    >
      <Ionicons
        name={isSuccess ? 'checkmark-circle-outline' : 'information-circle-outline'}
        size={15}
        color={isSuccess ? '#34D399' : '#C6A96B'}
      />
      <Text className={`ml-2 flex-1 text-xs ${isSuccess ? 'font-semibold text-emerald-300' : 'text-[#A1A1A1]'}`}>
        {message}
      </Text>
    </View>
  );
}
