import { Ionicons } from '@expo/vector-icons';
import { Href, router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { COLORS, OrderConfirmationCard } from '../components/order/OrderConfirmationCard';

type ConfirmationItem = {
  brand?: string;
  name?: string;
  scale?: string;
  specs?: string;
  price?: number;
  quantity?: number;
};

type LegacyOrder = {
  orderId: string;
  total: number;
  paymentMethod: { label: string };
  shippingAddress: {
    name: string;
    line1: string;
    line2: string;
    country: string;
  };
  items?: ConfirmationItem[];
};

type ConfirmationParams = {
  order?: string;
  orderId?: string;
  total?: string;
  payment?: string;
  address?: string;
  items?: string;
};

const HOME_ROUTE = '/(tabs)' as Href;
const PESO = '\u20b1';

const fallbackItems: ConfirmationItem[] = [
  { brand: 'GSC', name: 'Rem - Winter Maid Ver.', scale: '1/7 Scale', price: 8900, quantity: 1 },
  { brand: 'Alter', name: 'Asuna - ALO Ver.', scale: '1/8 Scale', price: 12500, quantity: 1 },
  { brand: 'Myethos', name: 'Hu Tao - Fantasy Ver.', scale: '1/7 Scale', price: 16200, quantity: 1 },
];

function getParam(value: string | string[] | undefined, fallback = '') {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  return value ?? fallback;
}

function formatPrice(value: number | string | undefined) {
  const numeric = typeof value === 'number' ? value : Number(value);

  if (!Number.isFinite(numeric)) {
    return `${PESO}${value ?? 0}`;
  }

  return `${PESO}${numeric.toLocaleString('en-US')}`;
}

function parseItems(itemsParam?: string | string[]) {
  const rawItems = getParam(itemsParam, '');

  if (!rawItems) {
    return fallbackItems;
  }

  try {
    const parsed = JSON.parse(rawItems) as ConfirmationItem[];
    return parsed.length > 0 ? parsed : fallbackItems;
  } catch {
    return fallbackItems;
  }
}

function parseAddress(addressParam?: string | string[]) {
  const rawAddress = getParam(
    addressParam,
    'Juan dela Cruz\nBlk 5 Lot 12 Sampaguita Street, Barangay Graceville\nSan Jose del Monte, Bulacan 3023\nPhilippines'
  );
  const lines = rawAddress
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return { name: 'Juan dela Cruz', address: rawAddress };
  }

  return { name: lines[0], address: lines.slice(1).join('\n') };
}

function parseLegacyOrder(orderParam?: string | string[]) {
  const rawOrder = getParam(orderParam, '');

  if (!rawOrder) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(rawOrder)) as LegacyOrder;
  } catch {
    return null;
  }
}

export default function OrderConfirmationScreen() {
  const params = useLocalSearchParams<ConfirmationParams>();
  const legacyOrder = useMemo(() => parseLegacyOrder(params.order), [params.order]);
  const parsedAddress = useMemo(() => parseAddress(params.address), [params.address]);
  const parsedItems = useMemo(() => parseItems(params.items), [params.items]);

  const orderId = getParam(params.orderId, legacyOrder?.orderId ?? 'MKN-65527');
  const total = getParam(params.total, String(legacyOrder?.total ?? 39650));
  const payment = getParam(params.payment, legacyOrder?.paymentMethod.label ?? 'Visa **** 4291');
  const recipientName = legacyOrder?.shippingAddress.name ?? parsedAddress.name;
  const address =
    legacyOrder
      ? `${legacyOrder.shippingAddress.line1}\n${legacyOrder.shippingAddress.line2}\n${legacyOrder.shippingAddress.country}`
      : parsedAddress.address;
  const items = legacyOrder?.items && legacyOrder.items.length > 0 ? legacyOrder.items : parsedItems;
  const rewardPoints = Math.floor((Number(total) / 10) * 1.5);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar hidden />

      <View style={styles.iconWrap}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={28} color={COLORS.green} />
        </View>
      </View>

      <Animated.Text entering={FadeInUp.delay(100)} style={styles.heading}>
        Order placed successfully
      </Animated.Text>
      <Animated.Text entering={FadeInUp.delay(150)} style={styles.subtext}>
        Your MEIKAN order has been received.
      </Animated.Text>

      <Animated.View entering={FadeInUp.delay(200)}>
        <OrderConfirmationCard title="Order details">
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order ID</Text>
            <Text style={styles.detailValue}>{orderId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <Text style={[styles.detailValue, styles.processing]}>Processing</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total</Text>
            <Text style={styles.detailValue}>{formatPrice(total)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment</Text>
            <Text style={styles.detailValue}>{payment}</Text>
          </View>
          <View style={[styles.detailRow, styles.detailRowLast]}>
            <Text style={styles.detailLabel}>Estimated delivery</Text>
            <Text style={styles.detailValue}>7-14 business days</Text>
          </View>
        </OrderConfirmationCard>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(300)}>
        <OrderConfirmationCard title="Shipping to">
          <Text style={[styles.detailValue, styles.recipient]}>{recipientName}</Text>
          <Text style={styles.addressText}>{address}</Text>
        </OrderConfirmationCard>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(350)}>
        <OrderConfirmationCard title="Items ordered">
          {items.map((item, index) => {
            const quantity = item.quantity ?? 1;
            const itemTotal = (item.price ?? 0) * quantity;

            return (
              <View key={`${item.name ?? 'item'}-${index}`} style={[styles.itemRow, index === items.length - 1 && styles.itemRowLast]}>
                <View style={styles.itemThumb}>
                  <Ionicons name="body-outline" size={22} color={COLORS.gold} />
                </View>
                <View style={styles.itemCopy}>
                  <Text style={styles.itemBrand}>{item.brand ?? 'MEIKAN'}</Text>
                  <Text style={styles.itemName}>{item.name ?? 'Collectible figure'}</Text>
                  <Text style={styles.itemScale}>{item.scale ?? item.specs ?? 'Scale figure'}{quantity > 1 ? ` · Qty ${quantity}` : ''}</Text>
                </View>
                <Text style={styles.itemPrice}>{formatPrice(itemTotal)}</Text>
              </View>
            );
          })}
        </OrderConfirmationCard>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400)} style={styles.rewardsStrip}>
        <Ionicons name="star" size={14} color={COLORS.gold} />
        <Text style={styles.rewardsText}>
          You earned <Text style={styles.rewardsValue}>+{Number.isFinite(rewardPoints) ? rewardPoints : 0} pts</Text> from this order
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(450)} style={styles.buttons}>
        <TouchableOpacity
          style={styles.btnPrimary}
          activeOpacity={0.84}
          onPress={() => router.push({ pathname: '/order-tracking', params: { orderId } })}
        >
          <Ionicons name="navigate" size={15} color={COLORS.bg} />
          <Text style={styles.btnPrimaryText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnGhost} activeOpacity={0.78} onPress={() => router.replace(HOME_ROUTE)}>
          <Ionicons name="home-outline" size={15} color={COLORS.gold} />
          <Text style={styles.btnGhostText}>Back to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 24, paddingTop: 64, paddingBottom: 48 },
  iconWrap: { alignItems: 'center', marginBottom: 20 },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.greenBg,
    borderWidth: 0.5,
    borderColor: COLORS.greenBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: { fontSize: 22, fontWeight: '500', color: COLORS.text, textAlign: 'center', marginBottom: 6 },
  subtext: { fontSize: 13, color: COLORS.textDim, textAlign: 'center', marginBottom: 24 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.borderInner,
  },
  detailRowLast: { borderBottomWidth: 0 },
  detailLabel: { fontSize: 13, color: COLORS.textDim },
  detailValue: { fontSize: 13, color: COLORS.text, fontWeight: '500', flexShrink: 1, textAlign: 'right' },
  processing: { color: COLORS.gold },
  recipient: { marginBottom: 4, textAlign: 'left' },
  addressText: { fontSize: 12, color: COLORS.textDim, lineHeight: 20 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.borderInner,
  },
  itemRowLast: { borderBottomWidth: 0 },
  itemThumb: {
    width: 40,
    height: 48,
    backgroundColor: '#222',
    borderRadius: 8,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemCopy: { flex: 1 },
  itemBrand: { fontSize: 9, color: COLORS.gold, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 2 },
  itemName: { fontSize: 12, color: COLORS.text, marginBottom: 2 },
  itemScale: { fontSize: 11, color: COLORS.textDim },
  itemPrice: { fontSize: 13, fontWeight: '500', color: COLORS.text },
  rewardsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.goldBg,
    borderWidth: 0.5,
    borderColor: `${COLORS.gold}33`,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  rewardsText: { fontSize: 12, color: COLORS.textMuted, flex: 1 },
  rewardsValue: { color: COLORS.gold, fontWeight: '500' },
  buttons: { gap: 10 },
  btnPrimary: {
    height: 50,
    backgroundColor: COLORS.gold,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnPrimaryText: { fontSize: 15, fontWeight: '500', color: COLORS.bg },
  btnGhost: {
    height: 46,
    backgroundColor: '#161616',
    borderWidth: 0.5,
    borderColor: `${COLORS.gold}33`,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnGhostText: { fontSize: 14, color: COLORS.gold },
});
