import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type PreferenceOptionProps = {
  title: string;
  subtitle?: string;
  meta?: string;
  active: boolean;
  onPress: () => void;
};

export function PreferenceOption({ title, subtitle, meta, active, onPress }: PreferenceOptionProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: active }}
      className={`rounded-xl border px-4 py-4 ${active ? 'border-[#C6A96B] bg-[#1A1710]' : 'border-[#222222] bg-[#1A1A1A]'}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
    >
      <View className="flex-row items-center">
        <View
          className={`h-5 w-5 items-center justify-center rounded-full border ${
            active ? 'border-[#C6A96B] bg-[#C6A96B]' : 'border-[#555555]'
          }`}
        >
          {active ? <Ionicons name="checkmark" size={13} color="#0A0A0A" /> : null}
        </View>
        <View className="ml-3 min-w-0 flex-1">
          <Text className="text-base font-semibold text-white">{title}</Text>
          {subtitle ? (
            <Text className="mt-1 text-sm leading-5 text-[#A1A1A1]" numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {meta ? <Text className={`ml-3 text-sm font-semibold ${active ? 'text-[#C6A96B]' : 'text-[#777777]'}`}>{meta}</Text> : null}
      </View>
    </Pressable>
  );
}
