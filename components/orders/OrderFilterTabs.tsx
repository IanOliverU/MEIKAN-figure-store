import { Pressable, ScrollView, Text } from 'react-native';

export type OrderFilter = 'All' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

const filters: OrderFilter[] = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

type OrderFilterTabsProps = {
  activeFilter: OrderFilter;
  onChange: (filter: OrderFilter) => void;
};

export function OrderFilterTabs({ activeFilter, onChange }: OrderFilterTabsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pr-5">
      {filters.map((filter) => {
        const active = activeFilter === filter;

        return (
          <Pressable
            key={filter}
            className={`h-10 justify-center rounded-full border px-4 ${
              active ? 'border-[#C6A96B] bg-[#C6A96B]' : 'border-[#222222] bg-[#121212]'
            }`}
            onPress={() => onChange(filter)}
            style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] })}
          >
            <Text className={`text-sm font-semibold ${active ? 'text-[#0A0A0A]' : 'text-[#A1A1A1]'}`}>{filter}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
