import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export type PaymentCardBrand = 'Visa' | 'Mastercard';

export type SavedPaymentCard = {
  id: string;
  type: PaymentCardBrand;
  last4: string;
  expiry: string;
  isDefault: boolean;
  expired?: boolean;
};

type PaymentCardProps = {
  card: SavedPaymentCard;
  onPress?: () => void;
};

const brandStyles = {
  Visa: {
    label: 'VISA',
    className: 'bg-blue-500/20 border-blue-400/30',
    textClassName: 'text-blue-200',
  },
  Mastercard: {
    label: 'MC',
    className: 'bg-orange-500/20 border-orange-400/30',
    textClassName: 'text-orange-200',
  },
};

export function PaymentCard({ card, onPress }: PaymentCardProps) {
  const brand = brandStyles[card.type];

  return (
    <Pressable
      className={`rounded-2xl border bg-[#121212] p-4 ${
        card.isDefault ? 'border-[#5F5131]' : 'border-[#222222]'
      } ${card.expired ? 'opacity-70' : ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.82 : card.expired ? 0.7 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
    >
      <View className="flex-row items-center">
        <View className={`h-11 w-14 items-center justify-center rounded-xl border ${brand.className}`}>
          <Text className={`text-xs font-bold ${brand.textClassName}`}>{brand.label}</Text>
        </View>

        <View className="ml-4 min-w-0 flex-1">
          <View className="flex-row flex-wrap items-center gap-2">
            <Text className="text-base font-semibold text-white">
              {card.type} {'\u2022\u2022\u2022\u2022'} {card.last4}
            </Text>
            {card.isDefault ? (
              <View className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1">
                <Text className="text-[10px] font-semibold text-emerald-300">Default</Text>
              </View>
            ) : null}
            {card.expired ? (
              <View className="rounded-full border border-red-500/25 bg-red-500/10 px-2.5 py-1">
                <Text className="text-[10px] font-semibold text-red-300">Expired</Text>
              </View>
            ) : null}
          </View>
          <Text className="mt-1 text-sm text-[#A1A1A1]">Expires {card.expiry}</Text>
        </View>

        <Ionicons name="chevron-forward" size={17} color="#4A4A4A" />
      </View>
    </Pressable>
  );
}
