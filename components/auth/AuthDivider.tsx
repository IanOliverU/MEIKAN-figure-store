import { Text, View } from 'react-native';

type AuthDividerProps = {
  label?: string;
};

export function AuthDivider({ label = 'or continue with' }: AuthDividerProps) {
  return (
    <View className="flex-row items-center">
      <View className="h-px flex-1 bg-[#222222]" />
      <Text className="mx-4 text-xs text-[#666666]">{label}</Text>
      <View className="h-px flex-1 bg-[#222222]" />
    </View>
  );
}
