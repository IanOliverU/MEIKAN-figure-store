import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SplashLoader } from '../components/SplashLoader';
import { SplashLogo } from '../components/SplashLogo';
import { SplashTagline } from '../components/SplashTagline';

type SplashScreenProps = {
  onFinish: () => void;
};

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const screenOpacity = useRef(new Animated.Value(1)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentOffset = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 560,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(contentOffset, {
        toValue: 0,
        duration: 560,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 420,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          onFinish();
        }
      });
    }, 1900);

    return () => {
      clearTimeout(timer);
    };
  }, [contentOffset, contentOpacity, onFinish, screenOpacity]);

  return (
    <Animated.View style={[styles.screen, { opacity: screenOpacity }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topCorner} pointerEvents="none" />
        <View style={styles.bottomCorner} pointerEvents="none" />

        <Animated.View
          style={[
            styles.content,
            {
              opacity: contentOpacity,
              transform: [{ translateY: contentOffset }],
            },
          ]}
        >
          <SplashLogo />
          <View style={styles.loaderWrap}>
            <SplashLoader />
          </View>
        </Animated.View>

        <SplashTagline />
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#0A0A0A',
  },
  topCorner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 122,
    height: 122,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: '#1E1E1E',
    borderBottomColor: '#1E1E1E',
    borderBottomRightRadius: 82,
    opacity: 0.72,
  },
  bottomCorner: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 122,
    height: 122,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: '#1E1E1E',
    borderLeftColor: '#1E1E1E',
    borderTopLeftRadius: 82,
    opacity: 0.72,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  loaderWrap: {
    marginTop: 52,
  },
});
