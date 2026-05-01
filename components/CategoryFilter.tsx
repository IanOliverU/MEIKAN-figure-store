import { Pressable, ScrollView, Text } from 'react-native';

type CategoryFilterProps = {
  categories: string[];
  activeCategory: string;
};

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pr-5">
      {categories.map((category) => {
        const isActive = category === activeCategory;

        return (
          <Pressable
            key={category}
            className={`rounded-full border px-5 py-2 ${
              isActive ? 'border-[#C6A96B] bg-[#C6A96B]' : 'border-[#222222] bg-[#121212]'
            }`}
          >
            <Text className={`text-xs font-medium ${isActive ? 'text-[#0A0A0A]' : 'text-[#A1A1A1]'}`}>
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
