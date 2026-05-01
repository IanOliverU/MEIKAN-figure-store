import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-5xl font-semibold tracking-wide text-white">MEIKAN</Text>
        <Text className="mt-3 text-base text-neutral-300">Premium Anime Figures</Text>
      </View>
    </SafeAreaView>
  );
}
