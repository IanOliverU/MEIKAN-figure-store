import { Pressable, Text } from 'react-native';

type ScalePreferenceChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function ScalePreferenceChip({ label, selected, onPress }: ScalePreferenceChipProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      className={`min-h-11 rounded-full border px-4 py-3 ${
        selected ? 'border-[#C6A96B] bg-[#C6A96B]' : 'border-[#2A2A2A] bg-[#1A1A1A]'
      }`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] })}
    >
      <Text className={`text-sm font-semibold ${selected ? 'text-[#0A0A0A]' : 'text-white'}`}>{label}</Text>
    </Pressable>
  );
}
