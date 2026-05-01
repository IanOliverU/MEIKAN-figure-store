import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BrowseScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <View className="flex-1 items-center justify-center px-5">
        <Text className="text-lg font-semibold text-white">Browse</Text>
        <Text className="mt-2 text-sm text-[#A1A1A1]">Catalog discovery arrives next.</Text>
      </View>
    </SafeAreaView>
  );
}
