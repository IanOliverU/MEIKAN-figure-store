import { ScrollView } from 'react-native';

import { FilterPill } from './FilterPill';

export type WishlistFilterValue = 'All' | 'In Stock' | 'Pre-order' | 'On Sale';

const filters: WishlistFilterValue[] = ['All', 'In Stock', 'Pre-order', 'On Sale'];

type WishlistFilterProps = {
  activeFilter: WishlistFilterValue;
  onChange: (filter: WishlistFilterValue) => void;
};

export function WishlistFilter({ activeFilter, onChange }: WishlistFilterProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pr-5">
      {filters.map((filter) => (
        <FilterPill
          key={filter}
          label={filter}
          active={activeFilter === filter}
          compact
          onPress={() => onChange(filter)}
        />
      ))}
    </ScrollView>
  );
}
