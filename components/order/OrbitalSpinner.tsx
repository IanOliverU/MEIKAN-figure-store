import Svg, { Circle } from 'react-native-svg';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

import { COLORS } from './OrderConfirmationCard';

export function OrbitalSpinner() {
  const ring1Scale = useSharedValue(1);
  const ring2Scale = useSharedValue(1);
  const ring3Scale = useSharedValue(1);
  const ring1Opacity = useSharedValue(0.6);
  const ring2Opacity = useSharedValue(0.6);
  const ring3Opacity = useSharedValue(0.6);
  const outerRotation = useSharedValue(0);
  const innerRotation = useSharedValue(360);
  const logoY = useSharedValue(0);
  const dot1Opacity = useSharedValue(0.3);
  const dot2Opacity = useSharedValue(0.3);
  const dot3Opacity = useSharedValue(0.3);

  useEffect(() => {
    const animateRing = (scale: typeof ring1Scale, opacity: typeof ring1Opacity, delay = 0) => {
      scale.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(2.4, { duration: 2000, easing: Easing.out(Easing.ease) }),
            withTiming(1, { duration: 0 })
          ),
          -1,
          false
        )
      );
      opacity.value = withDelay(
        delay,
        withRepeat(
          withSequence(withTiming(0, { duration: 2000 }), withTiming(0.6, { duration: 0 })),
          -1,
          false
        )
      );
    };

    animateRing(ring1Scale, ring1Opacity);
    animateRing(ring2Scale, ring2Opacity, 600);
    animateRing(ring3Scale, ring3Opacity, 1200);

    outerRotation.value = withRepeat(
      withTiming(360, { duration: 2400, easing: Easing.linear }),
      -1,
      false
    );
    innerRotation.value = withRepeat(withTiming(0, { duration: 1600, easing: Easing.linear }), -1, false);
    logoY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    const animateDot = (opacity: typeof dot1Opacity, delay = 0) => {
      opacity.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
            withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          false
        )
      );
    };

    animateDot(dot1Opacity);
    animateDot(dot2Opacity, 200);
    animateDot(dot3Opacity, 400);
  }, [
    dot1Opacity,
    dot2Opacity,
    dot3Opacity,
    innerRotation,
    logoY,
    outerRotation,
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
  const outerStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${outerRotation.value}deg` }] }));
  const innerStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${innerRotation.value}deg` }] }));
  const logoStyle = useAnimatedStyle(() => ({ transform: [{ translateX: -18 }, { translateY: -18 + logoY.value }] }));
  const dot1Style = useAnimatedStyle(() => ({ opacity: dot1Opacity.value }));
  const dot2Style = useAnimatedStyle(() => ({ opacity: dot2Opacity.value }));
  const dot3Style = useAnimatedStyle(() => ({ opacity: dot3Opacity.value }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.rippleRing, ring1Style]} />
      <Animated.View style={[styles.rippleRing, ring2Style]} />
      <Animated.View style={[styles.rippleRing, ring3Style]} />

      <View style={styles.orbitalContainer}>
        <Animated.View style={[StyleSheet.absoluteFill, outerStyle]}>
          <Svg width={88} height={88} viewBox="0 0 88 88">
            <Circle cx={44} cy={44} r={40} stroke="#1e1e1e" strokeWidth={2} fill="none" />
            <Circle
              cx={44}
              cy={44}
              r={40}
              stroke={COLORS.gold}
              strokeWidth={2}
              strokeDasharray="60 200"
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
        </Animated.View>

        <Animated.View style={[styles.innerRing, innerStyle]}>
          <Svg width={68} height={68} viewBox="0 0 68 68">
            <Circle cx={34} cy={34} r={30} stroke="#1e1e1e" strokeWidth={1.5} fill="none" />
            <Circle
              cx={34}
              cy={34}
              r={30}
              stroke={`${COLORS.gold}55`}
              strokeWidth={1.5}
              strokeDasharray="30 160"
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
        </Animated.View>

        <Animated.View style={[styles.centerLogo, logoStyle]}>
          <View style={styles.logoBg}>
            <Ionicons name="body" size={16} color={COLORS.gold} />
          </View>
        </Animated.View>
      </View>

      <Animated.Text entering={FadeIn.delay(200)} style={styles.heading}>
        Placing your order
      </Animated.Text>
      <Animated.Text entering={FadeIn.delay(300)} style={styles.subtext}>
        Please don't close the app...
      </Animated.Text>

      <View style={styles.dots}>
        <Animated.View style={[styles.dot, dot1Style]} />
        <Animated.View style={[styles.dot, dot2Style]} />
        <Animated.View style={[styles.dot, dot3Style]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  rippleRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 0.5,
    borderColor: `${COLORS.gold}22`,
  },
  orbitalContainer: { width: 88, height: 88, marginBottom: 28, position: 'relative' },
  innerRing: { position: 'absolute', top: 10, left: 10 },
  centerLogo: { position: 'absolute', top: '50%', left: '50%' },
  logoBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: { fontSize: 19, fontWeight: '500', color: COLORS.text, marginBottom: 6 },
  subtext: { fontSize: 13, color: COLORS.textDim, marginBottom: 20 },
  dots: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.gold },
});
