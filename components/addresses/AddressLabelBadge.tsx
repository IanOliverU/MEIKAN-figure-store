import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export type AddressLabel = 'Home' | 'Office' | 'Other';

type AddressLabelBadgeProps = {
  label: AddressLabel;
};

const labelStyles = {
  Home: {
    icon: 'home-outline' as const,
    className: 'border-[#5F5131] bg-[#1A1710]',
    textClassName: 'text-[#C6A96B]',
    iconColor: '#C6A96B',
  },
  Office: {
    icon: 'business-outline' as const,
    className: 'border-blue-500/25 bg-blue-500/10',
    textClassName: 'text-blue-300',
    iconColor: '#60A5FA',
  },
  Other: {
    icon: 'location-outline' as const,
    className: 'border-[#333333] bg-[#1A1A1A]',
    textClassName: 'text-[#A1A1A1]',
    iconColor: '#A1A1A1',
  },
};

export function AddressLabelBadge({ label }: AddressLabelBadgeProps) {
  const style = labelStyles[label];

  return (
    <View className={`flex-row items-center rounded-full border px-2.5 py-1 ${style.className}`}>
      <Ionicons name={style.icon} size={12} color={style.iconColor} />
      <Text className={`ml-1.5 text-[10px] font-semibold ${style.textClassName}`}>{label}</Text>
    </View>
  );
}
