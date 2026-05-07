import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type HeaderIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  indicatorColor?: string;
  onPress?: () => void;
};

function HeaderIcon({ name, indicatorColor, onPress }: HeaderIconProps) {
  return (
    <Pressable
      className="h-10 w-10 items-center justify-center rounded-full border border-[#222222] bg-[#121212]"
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
    >
      <Ionicons name={name} size={18} color="#A1A1A1" />
      {indicatorColor ? (
        <View className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: indicatorColor }} />
      ) : null}
    </Pressable>
  );
}

type HeaderProps = {
  onNotificationsPress?: () => void;
  onCartPress?: () => void;
  hasUnreadNotifications?: boolean;
  hasCartItems?: boolean;
};

export function Header({
  onNotificationsPress,
  onCartPress,
  hasUnreadNotifications = false,
  hasCartItems = false,
}: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View>
        <View className="flex-row items-baseline">
          <Text className="text-2xl font-semibold tracking-wide text-white">MEIK</Text>
          <Text className="text-2xl font-semibold tracking-wide text-[#C6A96B]">A</Text>
          <Text className="text-2xl font-semibold tracking-wide text-white">N</Text>
        </View>
        <Text className="mt-0.5 text-xs tracking-wide text-[#A1A1A1]">Premium Figures</Text>
      </View>
      <View className="flex-row items-center gap-3">
        <HeaderIcon
          name="notifications-outline"
          indicatorColor={hasUnreadNotifications ? '#F06B3B' : undefined}
          onPress={onNotificationsPress}
        />
        <HeaderIcon name="cart-outline" indicatorColor={hasCartItems ? '#C6A96B' : undefined} onPress={onCartPress} />
      </View>
    </View>
  );
}
