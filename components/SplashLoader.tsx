import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const DOTS = [0, 180, 360];

export function SplashLoader() {
  const opacities = useRef(DOTS.map(() => new Animated.Value(0.35))).current;
  const scales = useRef(DOTS.map(() => new Animated.Value(0.85))).current;

  useEffect(() => {
    const animations = DOTS.map((delay, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(opacities[index], {
              toValue: 1,
              duration: 360,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(scales[index], {
              toValue: 1,
              duration: 360,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacities[index], {
              toValue: 0.35,
              duration: 520,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(scales[index], {
              toValue: 0.85,
              duration: 520,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
          Animated.delay(360 - delay),
        ]),
      ),
    );

    animations.forEach((animation) => animation.start());

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, [opacities, scales]);

  return (
    <View style={styles.container} accessibilityLabel="Loading">
      {DOTS.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              opacity: opacities[index],
              transform: [{ scale: scales[index] }],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#C6A96B',
  },
});
