import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  badge?: string;
  danger?: boolean;
  showDivider?: boolean;
  onPress: () => void;
};

export function MenuItem({ icon, label, badge, danger = false, showDivider = false, onPress }: MenuItemProps) {
  return (
    <Pressable className={showDivider ? 'border-b border-[#222222]' : ''} onPress={onPress}>
      <View className="min-h-12 flex-row items-center py-3">
        <Ionicons name={icon} size={18} color={danger ? '#EF4444' : '#A1A1A1'} />
        <Text className={`ml-3 flex-1 text-base font-semibold ${danger ? 'text-[#EF4444]' : 'text-white'}`}>{label}</Text>
        {badge ? (
          <View className="mr-3 rounded-full bg-emerald-500/20 px-2.5 py-1">
            <Text className="text-xs font-semibold text-emerald-400">{badge}</Text>
          </View>
        ) : null}
        {!danger ? <Ionicons name="chevron-forward" size={16} color="#444444" /> : null}
      </View>
    </Pressable>
  );
}
