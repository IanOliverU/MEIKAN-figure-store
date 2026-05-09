import { Ionicons } from '@expo/vector-icons';
import { Switch, Text, View } from 'react-native';

type SecurityToggleCardProps = {
  title: string;
  subtitle: string;
  value: boolean;
  loading?: boolean;
  onToggle: (value: boolean) => void;
};

export function SecurityToggleCard({ title, subtitle, value, loading = false, onToggle }: SecurityToggleCardProps) {
  return (
    <View className="rounded-2xl border border-[#222222] bg-[#121212] p-4">
      <View className="flex-row items-center">
        <View className={`h-12 w-12 items-center justify-center rounded-xl border ${value ? 'border-[#C6A96B]/40 bg-[#1A1710]' : 'border-[#2A2A2A] bg-[#1A1A1A]'}`}>
          <Ionicons name="shield-checkmark-outline" size={22} color={value ? '#C6A96B' : '#777777'} />
        </View>
        <View className="ml-4 min-w-0 flex-1">
          <Text className="text-base font-semibold text-white">{title}</Text>
          <Text className="mt-1 text-sm leading-5 text-[#A1A1A1]">{subtitle}</Text>
        </View>
        <Switch
          value={value}
          disabled={loading}
          onValueChange={onToggle}
          trackColor={{ false: '#2A2A2A', true: '#6F5D36' }}
          thumbColor={value ? '#C6A96B' : '#777777'}
          ios_backgroundColor="#2A2A2A"
        />
      </View>
    </View>
  );
}
