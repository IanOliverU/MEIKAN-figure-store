import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  Easing,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { COLORS } from './OrderConfirmationCard';

type SuccessBurstProps = {
  orderId: string;
  total: string;
  payment: string;
};

const PESO = '\u20b1';

export function SuccessBurst({ orderId, total, payment }: SuccessBurstProps) {
  const ring1Scale = useSharedValue(1);
  const ring2Scale = useSharedValue(1);
  const ring3Scale = useSharedValue(1);
  const ring1Opacity = useSharedValue(0.6);
  const ring2Opacity = useSharedValue(0.6);
  const ring3Opacity = useSharedValue(0.6);
  const circleScale = useSharedValue(0);
  const checkScale = useSharedValue(0);

  useEffect(() => {
    const animateRing = (scale: typeof ring1Scale, opacity: typeof ring1Opacity, delay = 0) => {
      scale.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(2.4, { duration: 1800, easing: Easing.out(Easing.ease) }),
            withTiming(1, { duration: 0 })
          ),
          -1,
          false
        )
      );
      opacity.value = withDelay(
        delay,
        withRepeat(
          withSequence(withTiming(0, { duration: 1800 }), withTiming(0.6, { duration: 0 })),
          -1,
          false
        )
      );
    };

    animateRing(ring1Scale, ring1Opacity);
    animateRing(ring2Scale, ring2Opacity, 500);
    animateRing(ring3Scale, ring3Opacity, 1000);
    circleScale.value = withSpring(1, { damping: 10, stiffness: 100 });
    checkScale.value = withDelay(200, withSpring(1, { damping: 12, stiffness: 180 }));
  }, [
    checkScale,
    circleScale,
    ring1Opacity,
    ring1Scale,
    ring2Opacity,
    ring2Scale,
    ring3Opacity,
    ring3Scale,
  ]);

  const ring1Style = useAnimatedStyle(() => ({ opacity: ring1Opacity.value, transform: [{ scale: ring1Scale.value }] }));
  const ring2Style = useAnimatedStyle(() => ({ opacity: ring2Opacity.value, transform: [{ scale: ring2Scale.value }] }));
  const ring3Style = useAnimatedStyle(() => ({ opacity: ring3Opacity.value, transform: [{ scale: ring3Scale.value }] }));
  const circleStyle = useAnimatedStyle(() => ({ transform: [{ scale: circleScale.value }] }));
  const checkStyle = useAnimatedStyle(() => ({ transform: [{ scale: checkScale.value }] }));
  const totalValue = Number(total);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.rippleRing, ring1Style]} />
      <Animated.View style={[styles.rippleRing, ring2Style]} />
      <Animated.View style={[styles.rippleRing, ring3Style]} />

      <Animated.View style={[styles.outerCircle, circleStyle]}>
        <Svg width={90} height={90} viewBox="0 0 90 90">
          <Circle cx={45} cy={45} r={42} stroke="#1e1e1e" strokeWidth={2} fill="none" />
          <Circle
            cx={45}
            cy={45}
            r={42}
            stroke={COLORS.green}
            strokeWidth={2}
            strokeDasharray="170 264"
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
        <Animated.View style={[styles.checkBg, checkStyle]}>
          <Ionicons name="checkmark" size={28} color={COLORS.green} />
        </Animated.View>
      </Animated.View>

      <Animated.Text entering={FadeInUp.delay(300).duration(400)} style={styles.heading}>
        Order placed!
      </Animated.Text>
      <Animated.Text entering={FadeInUp.delay(400).duration(400)} style={styles.orderId}>
        {orderId}
      </Animated.Text>
      <Animated.Text entering={FadeInUp.delay(500).duration(400)} style={styles.subtext}>
        Taking you to your confirmation...
      </Animated.Text>

      <Animated.View entering={FadeInUp.delay(600).duration(400)} style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Order total</Text>
          <Text style={styles.summaryValue}>{PESO}{Number.isFinite(totalValue) ? totalValue.toLocaleString('en-US') : total}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Payment</Text>
          <Text style={styles.summaryValue}>{payment}</Text>
        </View>
        <View style={[styles.summaryRow, styles.summaryRowLast]}>
          <Text style={styles.summaryLabel}>Est. delivery</Text>
          <Text style={styles.summaryValue}>7-14 days</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  rippleRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#5ec98a18',
  },
  outerCircle: { width: 90, height: 90, position: 'relative', marginBottom: 24 },
  checkBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.greenBg,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 15,
    left: 15,
  },
  heading: { fontSize: 21, fontWeight: '500', color: COLORS.text, marginBottom: 6 },
  orderId: { fontSize: 13, color: COLORS.green, marginBottom: 4 },
  subtext: { fontSize: 12, color: COLORS.textDim, marginBottom: 28 },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    width: 280,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, gap: 12 },
  summaryRowLast: { marginBottom: 0 },
  summaryLabel: { fontSize: 12, color: COLORS.textMuted },
  summaryValue: { fontSize: 12, color: COLORS.text, fontWeight: '500', flexShrink: 1, textAlign: 'right' },
});
