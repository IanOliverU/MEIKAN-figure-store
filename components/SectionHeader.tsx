import { Pressable, Text, View } from 'react-native';

type SectionHeaderProps = {
  title: string;
};

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-lg font-semibold text-white">{title}</Text>
      <Pressable>
        <Text className="text-xs font-semibold text-[#C6A96B]">See all →</Text>
      </Pressable>
    </View>
  );
}
