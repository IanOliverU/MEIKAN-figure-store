import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { ShippingRegion } from '../../../services/supabase/preferencesService';

type RegionSelectorProps = {
  regions: ShippingRegion[];
  selectedRegion: ShippingRegion;
  expanded: boolean;
  onToggle: () => void;
  onSelect: (region: ShippingRegion) => void;
};

export function RegionSelector({ regions, selectedRegion, expanded, onToggle, onSelect }: RegionSelectorProps) {
  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        className={`rounded-xl border bg-[#1A1A1A] px-4 py-4 ${expanded ? 'border-[#C6A96B]' : 'border-[#222222]'}`}
        onPress={onToggle}
        style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1 })}
      >
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={18} color={expanded ? '#C6A96B' : '#A1A1A1'} />
          <View className="ml-3 flex-1">
            <Text className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Shipping Country</Text>
            <Text className="mt-1 text-base font-semibold text-white">{selectedRegion}</Text>
          </View>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color="#A1A1A1" />
        </View>
      </Pressable>

      {expanded ? (
        <View className="mt-2 overflow-hidden rounded-xl border border-[#222222] bg-[#1A1A1A]">
          {regions.map((region, index) => {
            const selected = region === selectedRegion;

            return (
              <Pressable
                key={region}
                className={`flex-row items-center px-4 py-4 ${index === regions.length - 1 ? '' : 'border-b border-[#222222]'}`}
                onPress={() => onSelect(region)}
                style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1 })}
              >
                <Text className={`flex-1 text-base font-semibold ${selected ? 'text-[#C6A96B]' : 'text-white'}`}>{region}</Text>
                {selected ? <Ionicons name="checkmark-circle" size={18} color="#C6A96B" /> : null}
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
