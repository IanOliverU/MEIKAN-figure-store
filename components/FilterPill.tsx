import { Pressable, Text, View } from 'react-native';

type FilterPillProps = {
  label: string;
  active?: boolean;
  compact?: boolean;
  removable?: boolean;
  onPress: () => void;
};

export function FilterPill({ label, active = false, compact = false, removable = false, onPress }: FilterPillProps) {
  return (
    <Pressable
      className={`flex-row items-center rounded-full border ${compact ? 'px-3 py-1.5' : 'px-5 py-2'} ${
        active ? 'border-[#C6A96B] bg-[#C6A96B]' : 'border-[#222222] bg-[#121212]'
      }`}
      onPress={onPress}
    >
      <Text className={`${compact ? 'text-[11px]' : 'text-xs'} font-semibold ${active ? 'text-[#0A0A0A]' : 'text-[#A1A1A1]'}`}>
        {label}
      </Text>
      {removable ? (
        <View className="ml-1.5">
          <Text className={`${compact ? 'text-[11px]' : 'text-xs'} font-semibold ${active ? 'text-[#0A0A0A]' : 'text-[#A1A1A1]'}`}>
            x
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}
