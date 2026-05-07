import { Pressable, Text, View } from 'react-native';

type SectionHeaderProps = {
  title: string;
  badge?: string;
  showSeeAll?: boolean;
  onSeeAll?: () => void;
};

export function SectionHeader({ title, badge, showSeeAll = true, onSeeAll }: SectionHeaderProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <Text className="text-lg font-semibold text-white">{title}</Text>
        {badge ? (
          <View className="rounded-full border border-[#963318] bg-[#2A120D] px-2.5 py-1">
            <Text className="text-xs font-medium text-[#F06B3B]">{badge}</Text>
          </View>
        ) : null}
      </View>
      {showSeeAll ? (
        <Pressable
          onPress={onSeeAll}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] })}
        >
          <Text className="text-xs font-semibold text-[#C6A96B]">{'See all ->'}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
