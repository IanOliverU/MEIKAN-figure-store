import { StyleSheet, Text, View } from 'react-native';

const GOLD = '#C6A96B';

function BrandIcon() {
  return (
    <View style={styles.iconCanvas} pointerEvents="none">
      <View style={[styles.iconShape, styles.head]} />
      <View style={[styles.iconShape, styles.body]} />
      <View style={[styles.iconShape, styles.leftArm]} />
      <View style={[styles.iconShape, styles.rightArm]} />
      <View style={[styles.iconShape, styles.leftLeg]} />
      <View style={[styles.iconShape, styles.rightLeg]} />
    </View>
  );
}

export function SplashLogo() {
  return (
    <View style={styles.container}>
      <View style={styles.mark}>
        <BrandIcon />
      </View>

      <View style={styles.wordmark} accessibilityLabel="MEIKAN">
        <Text style={styles.wordmarkText}>MEIK</Text>
        <Text style={[styles.wordmarkText, styles.wordmarkAccent]}>A</Text>
        <Text style={styles.wordmarkText}>N</Text>
      </View>

      <Text style={styles.subtitle}>PREMIUM ANIME FIGURES</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  mark: {
    width: 82,
    height: 82,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
  },
  iconCanvas: {
    width: 44,
    height: 44,
    position: 'relative',
  },
  iconShape: {
    position: 'absolute',
    backgroundColor: GOLD,
  },
  head: {
    top: 0,
    left: 14,
    width: 16,
    height: 16,
    opacity: 0.9,
    borderRadius: 8,
  },
  body: {
    top: 17,
    left: 12,
    width: 21,
    height: 19,
    opacity: 0.9,
    borderRadius: 5,
  },
  leftArm: {
    top: 18,
    left: 4,
    width: 9,
    height: 16,
    opacity: 0.72,
    borderRadius: 4,
  },
  rightArm: {
    top: 18,
    right: 4,
    width: 9,
    height: 16,
    opacity: 0.72,
    borderRadius: 4,
  },
  leftLeg: {
    bottom: 0,
    left: 13,
    width: 8,
    height: 11,
    opacity: 0.62,
    borderRadius: 4,
  },
  rightLeg: {
    bottom: 0,
    right: 13,
    width: 8,
    height: 11,
    opacity: 0.62,
    borderRadius: 4,
  },
  wordmark: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  wordmarkText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '500',
    letterSpacing: 4.5,
  },
  wordmarkAccent: {
    color: GOLD,
  },
  subtitle: {
    color: '#444444',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1.4,
  },
});
