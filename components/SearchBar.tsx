import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

type SearchBarProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search figures, series, brands...',
}: SearchBarProps) {
  return (
    <View className="h-12 flex-row items-center rounded-2xl border border-[#222222] bg-[#1A1A1A] px-4">
      <Ionicons name="search-outline" size={18} color="#666666" />
      <TextInput
        className="ml-3 flex-1 text-sm text-white"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666666"
        selectionColor="#C6A96B"
      />
    </View>
  );
}
