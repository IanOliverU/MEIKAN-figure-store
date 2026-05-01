import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

function HeaderIcon({ name }: { name: keyof typeof Ionicons.glyphMap }) {
  return (
    <Pressable className="h-10 w-10 items-center justify-center rounded-full border border-[#222222] bg-[#121212]">
      <Ionicons name={name} size={18} color="#A1A1A1" />
      {name === 'cart-outline' ? <View className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-[#C6A96B]" /> : null}
    </Pressable>
  );
}

export function Header() {
  return (
    <View className="flex-row items-center justify-between">
      <View>
        <Text className="text-2xl font-semibold tracking-wide text-white">MEIKAN</Text>
        <Text className="mt-0.5 text-xs tracking-wide text-[#A1A1A1]">Premium Figures</Text>
      </View>
      <View className="flex-row items-center gap-3">
        <HeaderIcon name="notifications-outline" />
        <HeaderIcon name="cart-outline" />
      </View>
    </View>
  );
}
