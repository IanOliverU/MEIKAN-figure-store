import { ReactNode } from 'react';
import { Text, View } from 'react-native';

type MenuSectionProps = {
  title: string;
  children: ReactNode;
};

export function MenuSection({ title, children }: MenuSectionProps) {
  return (
    <View>
      <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">{title}</Text>
      <View className="overflow-hidden rounded-2xl border border-[#222222] bg-[#121212] px-4">{children}</View>
    </View>
  );
}
