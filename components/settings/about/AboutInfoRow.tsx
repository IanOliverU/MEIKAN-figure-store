import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type AboutInfoRowProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  meta?: string;
  showDivider?: boolean;
  onPress?: () => void;
};

export function AboutInfoRow({ iconName, title, subtitle, meta, showDivider = false, onPress }: AboutInfoRowProps) {
  const content = (
    <View className={`flex-row items-center px-4 py-4 ${showDivider ? 'border-b border-[#222222]' : ''}`}>
      <View className="h-10 w-10 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]">
        <Ionicons name={iconName} size={18} color="#C6A96B" />
      </View>
      <View className="ml-3 min-w-0 flex-1">
        <Text className="text-base font-semibold text-white">{title}</Text>
        <Text className="mt-1 text-sm text-[#A1A1A1]" numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      {meta ? <Text className="ml-3 text-sm font-semibold text-[#777777]">{meta}</Text> : null}
      {onPress ? <Ionicons name="chevron-forward" size={16} color="#444444" /> : null}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1 })}>
      {content}
    </Pressable>
  );
}
