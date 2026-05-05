import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';

export type Brand = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  active?: boolean;
};

type BrandScrollerProps = {
  brands: Brand[];
  onBrandPress: (brand: Brand) => void;
};

export function BrandScroller({ brands, onBrandPress }: BrandScrollerProps) {
  return (
    <View>
      <Text className="mb-3 text-lg font-semibold text-white">Shop by Brand</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-5">
        {brands.map((brand) => {
          const active = Boolean(brand.active);

          return (
            <Pressable
              key={brand.id}
              className={`h-28 w-28 items-center justify-center rounded-2xl border ${
                active ? 'border-[#5F5132] bg-[#1B1914]' : 'border-[#292929] bg-[#151515]'
              }`}
              onPress={() => onBrandPress(brand)}
            >
              <View
                className={`h-11 w-11 items-center justify-center rounded-full border ${
                  active ? 'border-[#5F5132] bg-[#2A2111]' : 'border-[#383838] bg-[#1A1A1A]'
                }`}
              >
                <Ionicons name={brand.icon} size={21} color={active ? '#C6A96B' : '#777777'} />
              </View>
              <Text
                className={`mt-3 text-sm font-semibold ${active ? 'text-[#C6A96B]' : 'text-[#8A8A8A]'}`}
                numberOfLines={1}
              >
                {brand.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
