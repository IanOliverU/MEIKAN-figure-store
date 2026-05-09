import { Image, Text, View } from 'react-native';

import { appInfo } from '../../../config/appInfo';

export function AboutBrandCard() {
  return (
    <View className="items-center rounded-2xl border border-[#222222] bg-[#121212] p-6">
      <View className="h-20 w-20 items-center justify-center rounded-2xl border border-[#C6A96B]/30 bg-[#1A1710]">
        <Image source={require('../../../assets/images/icon.png')} className="h-14 w-14 rounded-xl" resizeMode="contain" />
      </View>
      <View className="mt-5 h-1 w-12 rounded-full bg-[#C6A96B]" />
      <Text className="mt-4 text-2xl font-semibold text-white">{appInfo.name}</Text>
      <Text className="mt-3 text-center text-sm leading-6 text-[#A1A1A1]">
        Premium anime figures, pre-orders, and collector-focused shopping.
      </Text>
    </View>
  );
}
