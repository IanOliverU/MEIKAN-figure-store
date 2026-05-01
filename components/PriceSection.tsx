import { Text, View } from 'react-native';

type PriceSectionProps = {
  price: string;
  releaseDate: string;
};

export function PriceSection({ price, releaseDate }: PriceSectionProps) {
  return (
    <View className="flex-row items-end justify-between">
      <View>
        <Text className="text-3xl font-semibold text-white">{price}</Text>
        <Text className="mt-1 text-xs text-[#A1A1A1]">Free shipping · Ships from JP</Text>
      </View>
      <View className="items-end">
        <Text className="text-xs text-[#A1A1A1]">Release</Text>
        <Text className="mt-1 text-sm font-semibold text-white">{releaseDate}</Text>
      </View>
    </View>
  );
}
