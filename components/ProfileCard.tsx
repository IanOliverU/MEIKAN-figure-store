import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export type ProfileUser = {
  display_name: string;
  username: string;
  avatar_url: string | null;
  email: string;
  tier: string;
};

type ProfileCardProps = {
  user: ProfileUser;
  onPress?: () => void;
};

export function ProfileCard({ user, onPress }: ProfileCardProps) {
  const initial = user.display_name.trim().charAt(0).toUpperCase();

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.84 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
    >
      <View className="flex-row items-center rounded-2xl border border-[#222222] bg-[#121212] p-4">
        <View className="h-16 w-16 items-center justify-center rounded-full border border-[#C6A96B]/50 bg-[#3A2E14]">
          <Text className="text-2xl font-semibold text-[#C6A96B]">{initial}</Text>
        </View>
        <View className="ml-4 min-w-0 flex-1">
          <Text className="text-xl font-semibold text-white" numberOfLines={1}>
            {user.display_name}
          </Text>
          <Text className="mt-1 text-sm text-[#A1A1A1]" numberOfLines={1}>
            @{user.username} - {user.email}
          </Text>
          <View className="mt-2 self-start flex-row items-center rounded-md border border-[#C6A96B]/40 bg-[#C6A96B]/10 px-2.5 py-1">
            <Ionicons name="star-outline" size={12} color="#C6A96B" />
            <Text className="ml-1.5 text-xs font-semibold text-[#C6A96B]">{user.tier}</Text>
          </View>
        </View>
        {onPress ? <Ionicons name="chevron-forward" size={18} color="#444444" /> : null}
      </View>
    </Pressable>
  );
}
