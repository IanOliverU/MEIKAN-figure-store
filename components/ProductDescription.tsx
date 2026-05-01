import { Text } from 'react-native';

type ProductDescriptionProps = {
  description: string;
};

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <Text className="text-sm leading-6 text-[#A1A1A1]" numberOfLines={4}>
      {description}
    </Text>
  );
}
