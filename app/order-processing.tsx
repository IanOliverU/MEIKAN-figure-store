import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { COLORS } from '../components/order/OrderConfirmationCard';
import { OrbitalSpinner } from '../components/order/OrbitalSpinner';
import { ProgressSteps } from '../components/order/ProgressSteps';
import { SuccessBurst } from '../components/order/SuccessBurst';

type Phase = 'orbital' | 'steps' | 'success';

type OrderProcessingParams = {
  orderId?: string;
  total?: string;
  payment?: string;
  address?: string;
  items?: string;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getParam(value: string | string[] | undefined, fallback: string) {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  return value ?? fallback;
}

export default function OrderProcessingScreen() {
  const params = useLocalSearchParams<OrderProcessingParams>();
  const [phase, setPhase] = useState<Phase>('orbital');
  const orderId = getParam(params.orderId, 'MKN-65527');
  const total = getParam(params.total, '39650');
  const payment = getParam(params.payment, 'Visa **** 4291');
  const address = getParam(params.address, 'Juan dela Cruz\nBlk 5 Lot 12 Sampaguita Street\nSan Jose del Monte, Bulacan 3023\nPhilippines');
  const items = getParam(params.items, '[]');

  useEffect(() => {
    let active = true;

    const run = async () => {
      await delay(1500);
      if (!active) {
        return;
      }

      setPhase('steps');
      await delay(2000);
      if (!active) {
        return;
      }

      setPhase('success');
      await delay(1000);
      if (!active) {
        return;
      }

      router.replace({
        pathname: '/order-confirmation',
        params: { orderId, total, payment, address, items },
      });
    };

    run();

    return () => {
      active = false;
    };
  }, [address, items, orderId, payment, total]);

  return (
    <View style={styles.screen}>
      <StatusBar hidden />

      {phase === 'orbital' ? (
        <Animated.View key="orbital" entering={FadeIn.duration(400)} exiting={FadeOut.duration(300)} style={styles.phase}>
          <OrbitalSpinner />
        </Animated.View>
      ) : null}
      {phase === 'steps' ? (
        <Animated.View key="steps" entering={FadeIn.duration(400)} exiting={FadeOut.duration(300)} style={styles.phase}>
          <ProgressSteps />
        </Animated.View>
      ) : null}
      {phase === 'success' ? (
        <Animated.View key="success" entering={FadeIn.duration(400)} exiting={FadeOut.duration(300)} style={styles.phase}>
          <SuccessBurst orderId={orderId} total={total} payment={payment} />
        </Animated.View>
      ) : null}

      <View style={styles.tagline}>
        <Text style={styles.taglineText}>Authentic · Direct from Japan</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  phase: { ...StyleSheet.absoluteFillObject },
  tagline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    alignItems: 'center',
  },
  taglineText: { fontSize: 11, color: COLORS.textGhost, letterSpacing: 0.6 },
});
