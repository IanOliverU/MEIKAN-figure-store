import { ReactNode } from 'react';
import { Text, View } from 'react-native';

type PaymentSectionProps = {
  title: string;
  children: ReactNode;
};

export function PaymentSection({ title, children }: PaymentSectionProps) {
  return (
    <View>
      <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  );
}
