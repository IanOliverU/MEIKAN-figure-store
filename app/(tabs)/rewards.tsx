import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PointsHeroCard } from '../../components/rewards/PointsHeroCard';
import { PointsHistoryItem, PointsHistoryTransaction } from '../../components/rewards/PointsHistoryItem';
import { RedeemOption, RedeemPointsModal } from '../../components/rewards/RedeemPointsModal';
import { RewardTier, TierCard } from '../../components/rewards/TierCard';

const tiers: Array<RewardTier & { min: number; max: number | null }> = [
  {
    name: 'Starter',
    range: '0 - 1,999 pts',
    min: 0,
    max: 1999,
    benefits: ['Earn 1 point per ₱100 spent', 'Basic order rewards', 'Standard preorder alerts'],
  },
  {
    name: 'Collector',
    range: '2,000 - 5,999 pts',
    min: 2000,
    max: 5999,
    benefits: ['Earn 1.25x points on orders', 'Early preorder access', 'Birthday reward credit'],
  },
  {
    name: 'Elite',
    range: '6,000+ pts',
    min: 6000,
    max: null,
    benefits: ['Earn 1.5x points on orders', 'Priority stock alerts', 'VIP support queue'],
  },
];

const redeemOptions: RedeemOption[] = [
  { id: '50-off', points: 500, credit: 50 },
  { id: '100-off', points: 1000, credit: 100 },
  { id: '200-off', points: 2000, credit: 200 },
];

const initialHistory: PointsHistoryTransaction[] = [
  {
    id: 'mkn-20481',
    title: 'Order #MKN-20481',
    date: 'May 2, 2026',
    points: 594,
    type: 'earn',
    detail: 'Points earned from a delivered figure order.',
  },
  {
    id: 'mkn-20445',
    title: 'Order #MKN-20445',
    date: 'Apr 28, 2026',
    points: 243,
    type: 'earn',
    detail: 'Points earned from a shipped figure order.',
  },
  {
    id: 'redeem-500',
    title: 'Redeemed for discount',
    date: 'Apr 8, 2026',
    points: -500,
    type: 'redeem',
    detail: 'Mock redemption for ₱50 off a future order.',
  },
];

function getTierState(points: number) {
  const currentTier = [...tiers].reverse().find((tier) => points >= tier.min) ?? tiers[0];
  const currentIndex = tiers.findIndex((tier) => tier.name === currentTier.name);
  const nextTier = tiers[currentIndex + 1];

  if (!nextTier) {
    return {
      currentTier,
      nextTierName: 'Elite',
      pointsToNextTier: 0,
      progress: 1,
    };
  }

  const currentFloor = currentTier.min;
  const nextFloor = nextTier.min;

  return {
    currentTier,
    nextTierName: nextTier.name,
    pointsToNextTier: Math.max(nextFloor - points, 0),
    progress: (points - currentFloor) / (nextFloor - currentFloor),
  };
}

function DetailModal({
  visible,
  title,
  subtitle,
  lines,
  onClose,
}: {
  visible: boolean;
  title: string;
  subtitle: string;
  lines: string[];
  onClose: () => void;
}) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View className="flex-1 justify-center bg-black/70 px-5">
        <View className="rounded-2xl border border-[#222222] bg-[#121212] p-5">
          <View className="flex-row items-start justify-between gap-4">
            <View className="min-w-0 flex-1">
              <Text className="text-xl font-semibold text-white">{title}</Text>
              <Text className="mt-1 text-sm text-[#A1A1A1]">{subtitle}</Text>
            </View>
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full border border-[#222222] bg-[#1A1A1A]"
              onPress={onClose}
              style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1 })}
            >
              <Ionicons name="close" size={18} color="#A1A1A1" />
            </Pressable>
          </View>
          <View className="mt-5 gap-3">
            {lines.map((line) => (
              <View key={line} className="flex-row items-start">
                <Ionicons name="checkmark-circle-outline" size={16} color="#C6A96B" />
                <Text className="ml-2 flex-1 text-sm leading-5 text-[#A1A1A1]">{line}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function RewardsScreen() {
  const [points, setPoints] = useState(4820);
  const [history, setHistory] = useState<PointsHistoryTransaction[]>(initialHistory);
  const [redeemVisible, setRedeemVisible] = useState(false);
  const [selectedTier, setSelectedTier] = useState<RewardTier | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<PointsHistoryTransaction | null>(null);

  const tierState = useMemo(() => getTierState(points), [points]);
  const storeCredit = Math.floor(points / 10);

  const handleRedeem = (option: RedeemOption) => {
    setPoints((currentPoints) => currentPoints - option.points);
    setHistory((currentHistory) => [
      {
        id: `redeem-${option.id}-${Date.now()}`,
        title: `Redeemed ₱${option.credit} reward`,
        date: 'May 9, 2026',
        points: -option.points,
        type: 'redeem',
        detail: `Mock redemption for ₱${option.credit} off. No checkout coupon was created.`,
      },
      ...currentHistory,
    ]);
    setRedeemVisible(false);
    Alert.alert('Reward redeemed', `Your mock ₱${option.credit} reward has been added to points history.`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-28 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center">
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
            onPress={() => router.back()}
            style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
          >
            <Ionicons name="chevron-back" size={18} color="#A1A1A1" />
          </Pressable>
          <View className="ml-4">
            <Text className="text-xl font-semibold text-white">Rewards & Points</Text>
            <Text className="mt-1 text-sm text-[#A1A1A1]">Collector Program</Text>
          </View>
        </View>

        <View className="mt-8">
          <PointsHeroCard
            points={points}
            storeCredit={storeCredit}
            currentTier={tierState.currentTier.name}
            nextTier={tierState.nextTierName}
            pointsToNextTier={tierState.pointsToNextTier}
            progress={tierState.progress}
          />
        </View>

        <Pressable
          className="mt-5 h-12 flex-row items-center justify-center rounded-xl bg-[#C6A96B] px-5"
          onPress={() => setRedeemVisible(true)}
          style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}
        >
          <Ionicons name="ticket-outline" size={18} color="#0A0A0A" />
          <Text className="ml-2 text-base font-semibold text-[#0A0A0A]">Redeem Points</Text>
        </Pressable>

        <View className="mt-8">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Tier Benefits</Text>
          <View className="gap-3">
            {tiers.map((tier) => (
              <TierCard
                key={tier.name}
                tier={tier}
                current={tierState.currentTier.name === tier.name}
                locked={points < tier.min}
                onPress={() => setSelectedTier(tier)}
              />
            ))}
          </View>
        </View>

        <View className="mt-8">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Points History</Text>
          {history.length > 0 ? (
            <View className="gap-3">
              {history.map((transaction) => (
                <PointsHistoryItem
                  key={transaction.id}
                  transaction={transaction}
                  onPress={() => setSelectedTransaction(transaction)}
                />
              ))}
            </View>
          ) : (
            <View className="items-center rounded-2xl border border-[#222222] bg-[#121212] px-5 py-10">
              <Ionicons name="time-outline" size={32} color="#5F5F5F" />
              <Text className="mt-4 text-lg font-semibold text-white">No points activity yet</Text>
              <Text className="mt-2 text-center text-sm text-[#777777]">Earn points by placing orders.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <RedeemPointsModal
        visible={redeemVisible}
        availablePoints={points}
        options={redeemOptions}
        onClose={() => setRedeemVisible(false)}
        onRedeem={handleRedeem}
      />

      <DetailModal
        visible={Boolean(selectedTier)}
        title={selectedTier?.name ?? ''}
        subtitle={selectedTier?.range ?? ''}
        lines={selectedTier?.benefits ?? []}
        onClose={() => setSelectedTier(null)}
      />

      <DetailModal
        visible={Boolean(selectedTransaction)}
        title={selectedTransaction?.title ?? ''}
        subtitle={selectedTransaction ? `${selectedTransaction.date} • ${selectedTransaction.points.toLocaleString('en-US')} pts` : ''}
        lines={selectedTransaction ? [selectedTransaction.detail] : []}
        onClose={() => setSelectedTransaction(null)}
      />
    </SafeAreaView>
  );
}
