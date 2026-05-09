import { ReactNode } from 'react';
import { Text, View } from 'react-native';

type PreferenceCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function PreferenceCard({ title, subtitle, children }: PreferenceCardProps) {
  return (
    <View>
      <View className="mb-3">
        <Text className="text-base font-semibold text-white">{title}</Text>
        {subtitle ? <Text className="mt-1 text-sm text-[#A1A1A1]">{subtitle}</Text> : null}
      </View>
      <View className="rounded-2xl border border-[#222222] bg-[#121212] p-3">{children}</View>
    </View>
  );
}
