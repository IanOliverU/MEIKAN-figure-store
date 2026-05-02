import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';

export type SortOption = 'featured' | 'priceAsc' | 'priceDesc';

type SortDropdownProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

const sortLabels: Record<SortOption, string> = {
  featured: 'Featured',
  priceAsc: 'Price: Low-High',
  priceDesc: 'Price: High-Low',
};

const sortOrder: SortOption[] = ['featured', 'priceAsc', 'priceDesc'];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const cycleSort = () => {
    const currentIndex = sortOrder.indexOf(value);
    onChange(sortOrder[(currentIndex + 1) % sortOrder.length]);
  };

  return (
    <Pressable
      className="h-8 flex-row items-center gap-2 rounded-full border border-[#222222] bg-[#121212] px-3"
      onPress={cycleSort}
    >
      <Ionicons name="funnel-outline" size={13} color="#A1A1A1" />
      <Text className="text-[11px] font-semibold text-[#D4D4D4]">{sortLabels[value]}</Text>
    </Pressable>
  );
}
