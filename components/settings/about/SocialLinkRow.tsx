import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type SocialLinkRowProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  platform: string;
  handle: string;
  showDivider?: boolean;
  onPress: () => void;
};

export function SocialLinkRow({ iconName, platform, handle, showDivider = false, onPress }: SocialLinkRowProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1 })}>
      <View className={`flex-row items-center px-4 py-4 ${showDivider ? 'border-b border-[#222222]' : ''}`}>
        <View className="h-10 w-10 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]">
          <Ionicons name={iconName} size={18} color="#C6A96B" />
        </View>
        <View className="ml-3 min-w-0 flex-1">
          <Text className="text-base font-semibold text-white">{platform}</Text>
          <Text className="mt-1 text-sm text-[#A1A1A1]">{handle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#444444" />
      </View>
    </Pressable>
  );
}
