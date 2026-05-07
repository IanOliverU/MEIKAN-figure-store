import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

export type HeroSlide = {
  id: string;
  label: string;
  name: string;
  brandScale: string;
  productId: string;
  tint: string;
};

type HeroCarouselProps = {
  slides: HeroSlide[];
  onShopNow: (productId: string) => void;
};

export function HeroCarousel({ slides, onShopNow }: HeroCarouselProps) {
  const { width } = useWindowDimensions();
  const cardWidth = width - 40;
  const [activeIndex, setActiveIndex] = useState(0);
  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
    setActiveIndex(Math.max(0, Math.min(nextIndex, slides.length - 1)));
  };

  return (
    <View className="overflow-hidden rounded-[28px] border border-[#2A2A2A] bg-[#171717]">
      <ScrollView
        horizontal
        pagingEnabled
        snapToInterval={cardWidth}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      >
        {slides.map((slide) => (
          <Pressable
            key={slide.id}
            style={({ pressed }) => ({
              width: cardWidth,
              opacity: pressed ? 0.92 : 1,
              transform: [{ scale: pressed ? 0.992 : 1 }],
            })}
            className="min-h-[274px] px-7 pb-7 pt-8"
            onPress={() => onShopNow(slide.productId)}
          >
            <View className="flex-1 flex-row items-center justify-between gap-5">
              <View className="max-w-[58%] flex-1">
                <Text className="text-xs font-semibold uppercase tracking-[2px] text-[#C6A96B]">{slide.label}</Text>
                <Text className="mt-4 text-[30px] font-semibold leading-9 text-white" numberOfLines={3}>
                  {slide.name}
                </Text>
                <Text className="mt-3 text-sm leading-5 text-[#A1A1A1]" numberOfLines={2}>
                  {slide.brandScale}
                </Text>
                <Pressable
                  className="mt-6 h-12 flex-row items-center self-start rounded-xl bg-[#D4B775] px-5"
                  onPress={() => onShopNow(slide.productId)}
                >
                  <Text className="text-base font-semibold text-[#0A0A0A]">Shop Now</Text>
                  <Ionicons name="chevron-forward" size={17} color="#0A0A0A" style={{ marginLeft: 10 }} />
                </Pressable>
              </View>

              <View className="flex-1 items-center justify-center">
                <View className="h-32 w-32 items-center justify-center rounded-full bg-[#222222]">
                  <Ionicons name="body" size={104} color={slide.tint} />
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View className="absolute bottom-5 left-0 right-0 flex-row justify-center gap-2">
        {slides.map((slide, index) => (
          <View
            key={slide.id}
            className={`h-1.5 rounded-full ${index === activeIndex ? 'w-7 bg-[#D4B775]' : 'w-1.5 bg-[#3A3A3A]'}`}
          />
        ))}
      </View>
    </View>
  );
}
