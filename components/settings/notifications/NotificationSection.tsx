import { ReactNode } from 'react';
import { Text, View } from 'react-native';

type NotificationSectionProps = {
  title: string;
  children: ReactNode;
};

export function NotificationSection({ title, children }: NotificationSectionProps) {
  return (
    <View>
      <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">{title}</Text>
      <View className="overflow-hidden rounded-2xl border border-[#222222] bg-[#121212]">{children}</View>
    </View>
  );
}
