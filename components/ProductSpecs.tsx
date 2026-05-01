import { Text, View } from 'react-native';

type ProductSpecsProps = {
  specs: string[];
};

export function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {specs.map((spec) => (
        <View key={spec} className="rounded-lg border border-[#222222] bg-[#1A1A1A] px-3 py-2">
          <Text className="text-xs text-[#D4D4D4]">{spec}</Text>
        </View>
      ))}
    </View>
  );
}
