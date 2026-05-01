import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, useWindowDimensions } from 'react-native';

type ProductGalleryProps = {
  images: string[];
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const { width } = useWindowDimensions();
  const galleryWidth = width - 40;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / galleryWidth);
    setActiveIndex(nextIndex);
  };

  return (
    <View className="overflow-hidden rounded-2xl border border-[#222222] bg-[#1A1A1A]">
      <ScrollView
        horizontal
        pagingEnabled
        snapToInterval={galleryWidth}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {images.map((image, index) => (
          <View key={`${image}-${index}`} className="h-72 items-center justify-center" style={{ width: galleryWidth }}>
            <Ionicons name="body-outline" size={104} color={index === 0 ? '#4F452F' : '#5F5F5F'} />
          </View>
        ))}
      </ScrollView>

      <View className="absolute bottom-4 left-0 right-0 flex-row items-center justify-center gap-1.5">
        {images.map((image, index) => (
          <View
            key={`${image}-dot-${index}`}
            className={`h-1.5 rounded-full ${index === activeIndex ? 'w-4 bg-[#C6A96B]' : 'w-1.5 bg-[#333333]'}`}
          />
        ))}
      </View>
    </View>
  );
}
