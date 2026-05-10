import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { COLORS } from './OrderConfirmationCard';

type StepStatus = 'done' | 'active' | 'pending';

type Step = {
  id: number;
  label: string;
  sublabel: string;
};

const STEPS: Step[] = [
  { id: 1, label: 'Order validated', sublabel: 'Cart & pricing confirmed' },
  { id: 2, label: 'Confirming payment', sublabel: 'Verifying Visa **** 4291' },
  { id: 3, label: 'Notifying warehouse', sublabel: 'Sending to JP fulfillment' },
  { id: 4, label: 'Order confirmed', sublabel: "You'll get a notification" },
];

function StepIcon({ status, id }: { status: StepStatus; id: number }) {
  const spin = useSharedValue(0);

  useEffect(() => {
    if (status === 'active') {
      spin.value = withRepeat(withTiming(360, { duration: 900, easing: Easing.linear }), -1, false);
    } else {
      spin.value = 0;
    }
  }, [spin, status]);

  const spinStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${spin.value}deg` }] }));

  if (status === 'done') {
    return (
      <View style={styles.iconDone}>
        <Ionicons name="checkmark" size={13} color={COLORS.green} />
      </View>
    );
  }

  if (status === 'active') {
    return (
      <Animated.View style={[styles.iconActive, spinStyle]}>
        <Ionicons name="reload" size={13} color={COLORS.gold} />
      </Animated.View>
    );
  }

  return (
    <View style={styles.iconPending}>
      <Text style={styles.pendingNumber}>{id}</Text>
    </View>
  );
}

function StepRow({ step, status }: { step: Step; status: StepStatus }) {
  const isDone = status === 'done';
  const isActive = status === 'active';
  const isPending = status === 'pending';

  return (
    <Animated.View entering={FadeIn.duration(300)} style={[styles.stepRow, isPending && styles.stepRowPending]}>
      <StepIcon status={status} id={step.id} />
      <View style={styles.stepCopy}>
        <Text
          style={[
            styles.stepLabel,
            isDone && { color: COLORS.green },
            isActive && { color: COLORS.gold },
            isPending && { color: COLORS.textDim },
          ]}
        >
          {step.label}
        </Text>
        <Text style={[styles.stepSub, isDone && { color: COLORS.greenDim }, isActive && { color: '#7a6030' }]}>
          {step.sublabel}
        </Text>
      </View>
      {isDone ? <Ionicons name="checkmark" size={13} color={COLORS.greenDim} /> : null}
    </Animated.View>
  );
}

export function ProgressSteps() {
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(['done', 'active', 'pending', 'pending']);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withTiming(100, {
      duration: 1900,
      easing: Easing.inOut(Easing.ease),
    });

    const t1 = setTimeout(() => {
      setStepStatuses(['done', 'done', 'active', 'pending']);
    }, 600);
    const t2 = setTimeout(() => {
      setStepStatuses(['done', 'done', 'done', 'active']);
    }, 1300);
    const t3 = setTimeout(() => {
      setStepStatuses(['done', 'done', 'done', 'done']);
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [progressWidth]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn} style={styles.logoWrap}>
        <Ionicons name="body" size={30} color={COLORS.gold} />
      </Animated.View>
      <Text style={styles.heading}>Processing order</Text>
      <Text style={styles.subtext}>This will only take a moment</Text>

      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, progressStyle]} />
      </View>

      <View style={styles.stepsContainer}>
        {STEPS.map((step, i) => (
          <StepRow key={step.id} step={step} status={stepStatuses[i]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  logoWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  heading: { fontSize: 19, fontWeight: '500', color: COLORS.text, marginBottom: 4 },
  subtext: { fontSize: 13, color: COLORS.textDim, marginBottom: 32 },
  progressTrack: {
    width: '100%',
    height: 3,
    backgroundColor: '#1e1e1e',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 28,
  },
  progressFill: { height: '100%', backgroundColor: COLORS.gold, borderRadius: 2 },
  stepsContainer: { width: '100%' },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.borderInner,
  },
  stepRowPending: { opacity: 0.35 },
  stepCopy: { flex: 1 },
  stepLabel: { fontSize: 13, fontWeight: '500', color: COLORS.text },
  stepSub: { fontSize: 11, color: COLORS.textDim, marginTop: 1 },
  pendingNumber: { fontSize: 11, color: '#444', fontWeight: '500' },
  iconDone: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.greenBg,
    borderWidth: 0.5,
    borderColor: COLORS.greenBorder,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconActive: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.goldBg,
    borderWidth: 0.5,
    borderColor: `${COLORS.gold}44`,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconPending: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
