import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export type PointsHistoryTransaction = {
  id: string;
  title: string;
  date: string;
  points: number;
  type: 'earn' | 'redeem';
  detail: string;
};

type PointsHistoryItemProps = {
  transaction: PointsHistoryTransaction;
  onPress: () => void;
};

export function PointsHistoryItem({ transaction, onPress }: PointsHistoryItemProps) {
  const positive = transaction.points > 0;

  return (
    <Pressable
      className="flex-row items-center rounded-2xl border border-[#222222] bg-[#121212] p-4"
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
    >
      <View
        className={`h-11 w-11 items-center justify-center rounded-xl border ${
          positive ? 'border-emerald-500/25 bg-emerald-500/10' : 'border-red-500/20 bg-red-500/10'
        }`}
      >
        <Ionicons name={positive ? 'bag-check-outline' : 'ticket-outline'} size={19} color={positive ? '#4ADE80' : '#F87171'} />
      </View>
      <View className="ml-4 min-w-0 flex-1">
        <Text className="text-sm font-semibold text-white" numberOfLines={1}>
          {transaction.title}
        </Text>
        <Text className="mt-1 text-xs text-[#777777]">{transaction.date}</Text>
      </View>
      <Text className={`text-sm font-semibold ${positive ? 'text-emerald-300' : 'text-red-300'}`}>
        {positive ? '+' : ''}
        {transaction.points.toLocaleString('en-US')} pts
      </Text>
    </Pressable>
  );
}
